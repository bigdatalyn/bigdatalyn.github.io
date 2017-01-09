#!/bin/ksh
#
# startMonget.ksh -d <dbname> [-s <interval sec>] [-c <count>] [-o <output directory>] [-f <SQL file>] 
#
###############################################################################
###############################################################
### Set Environment                                         ###
###############################################################
unset LC_ALL
export LANG=C

typeset BASE_NAME=$(basename $0)                                          # Baseame of this script
typeset BASE_PATH=$(cd $(dirname $0);pwd)                                 # Full pathname of this script
typeset EXEC_DATE=$(date +%Y%m%d_%H%M%S)                                  # Current time (YYYYmmddHHMMSS)
typeset LOG_FNAME=${EXEC_DATE}.$(uname -n).$(whoami).${BASE_NAME%ksh}log  # script log file (without path)

typeset -u DB_NAME                                                        # Database name (upper case)
typeset INTERVAL                                                          # Interval (sec)
typeset MAX_COUNT                                                         # Repeat counter
typeset SQL_FILE                                                          # File which contains monitor SQLs
typeset OUTPUT_DIR                                                        # Output directoty of CSV file

###############################################################
### Local Function                                          ###
###############################################################
# Function Name : USAGE
# Syntax        : $0
# Return Code   : 255
# Purpose       : Show usage and exit this script with non-zero return code.
function USAGE {
    echo "usage : $BASE_NAME -d <dbname> [-s <interval sec>] [-c <count>] [-o <output directory>] [-f <SQL file>]"
    echo ""
    exit 255
}

# Function Name : EXIT_SH
# Syntax        : N/A (automatically called by EXIT trap) 
# Return Code   : N/A
# Purpose       : Remove temporary file if defined and exit this script.
function EXIT_SH {
    for file in $SQL_TMP $EXP_TMP ; do
        if [[ -f "${SQL_TMP}" ]];then
            WRITE_LOG -- $(ls -l $file)
            WRITE_LOG rm -f $file
        fi
        rm -f $file
    done
  # for file in ${OUTPUT_DIR}/*$EXEC_DATE* ; do
  #     ls -lL $file
  # done 
    if [[ -n "$LOG_FILE" ]];then
        WRITE_LOG -v "===== $BASE_NAME called by '$(whoami)' with args '$ARGS_ORG' terminate [PID:$$] ====="
    fi
    exit 
}

# Function Name : ERROR_CHK
# Syntax        : $0 return_code "Message ..."
# Return Code   : normal:0, abnormal:4
function ERROR_CHK {
    RC=$1
    shift 1
    MSG="$@"

    if [[ ${RC} -ne 0 ]]
    then
        WRITE_LOG -v "[!!! ERROR !!!] ${MSG}"
        return 4
    fi
}

# Function Name : WRITE_LOG
# Syntax        : $0 [-v] [-f <LogFile>] "Message ..."
# Return Code   : normal:0, abnormal:4
# Purpose       : Write timestamp and messages to $LOG_FILE (and display to stdout if "-v" specified).
function WRITE_LOG {
    typeset VERBOSE
    typeset ENABLE_BS
    while getopts :vf: ARG ; do
      case $ARG in 
          v) VERBOSE=true     ;;
          f) TGT_FILE=$OPTARG ;;
          *) echo $0 "'$@'" : invalid option. ; return 1 ;;
      esac
    done
    shift $((OPTIND-1))
    MSG="$(date +%Y/%m/%d' '%H:%M:%S) $@"
    case $(uname) in
        Linux) ENABLE_BS="-e"
    esac

    TGT_FILE=${TGT_FILE:-$LOG_FILE}         # default output file is same to LOG_FILE variable
    echo $ENABLE_BS "$MSG" >> $TGT_FILE     # If $TGT_FILE is null, write message to stdout only
    if [[ "$VERBOSE" = "true" ]];then
        echo $ENABLE_BS "$MSG"
    fi
}

###############################################################
### main                                                    ###
###############################################################
trap "EXIT_SH" EXIT
# trap "" HUP TERM

ARGS_ORG="$@"

### command line option handling
while getopts :d:s:c:o:f: ARG ;do
    case $ARG in
        d) DB_NAME=$OPTARG                           ;;
        s) INTERVAL=$OPTARG                          ;;
        c) MAX_COUNT=$OPTARG                         ;;
        o) OUTPUT_DIR=$OPTARG                        ;;
        f) SQL_FILE=$OPTARG                          ;;
        *) echo "illegal option -- '$OPTARG'"; USAGE ;;
    esac
done
shift $((OPTIND-1))

### Check if mandatory option is specified
if [[ -z "$DB_NAME" ]];then
    echo "Specify target database name."
    USAGE
fi

### Set default values
INTERVAL=${INTERVAL:-300}                           # 5 minutes
MAX_COUNT=${MAX_COUNT:-60}                          # 60 times
OUTPUT_DIR=${OUTPUT_DIR:-$BASE_PATH/log}/$EXEC_DATE # <MyDir>/log/<ExecuteDate> 
SQL_FILE=${SQL_FILE:-$BASE_PATH/monitor.sql}        # target sql definition

### Check if interval and count parameter are specified as numeric value
if [[ -n "$MAX_COUNT" ]];then
    if ! expr $MAX_COUNT - 0 >/dev/null 2>&1 ; then
        echo "Max count '$MAX_COUNT' : invalid parameter. Specify numeric value."
        USAGE
    fi
fi

if [[ -n "$INTERVAL" ]];then
    if ! expr $INTERVAL - 0 >/dev/null 2>&1 ; then
        echo "Interval '$INTERVAL' : invalid parameter. Specify numeric value."
        USAGE
    fi
fi

### Check if specified SQL file exits
if [[ ! -f "$SQL_FILE" ]];then
    echo "SQL file '$SQL_FILE' : not found."
    exit 1
fi

### Check output directory (It can by SymLink)
ls -ldL "${OUTPUT_DIR?}" 2>&1 | grep '^d' >/dev/null 2>&1
if [[ $? -ne 0 ]];then
    mkdir -pm 0777 $OUTPUT_DIR
    if [[ $?  -ne 0 ]];then
        echo "Create log directory failed."
        exit 2
    fi
elif ! touch $OUTPUT_DIR/$TMP_FNAME ;then  # never redirect stderr
    echo "$OUTPUT_DIR/$TMP_FAME' : failed to create temporary file. Confirm '$OUTPUT_DIR'."
    exit 3
fi

### Check DB2 access and terminate anyway
db2 terminate >/dev/null 2>&1
if [[ $? -ne 0 ]]
then
    echo "This script requires DB2 access environment."
    exit 4
fi

### Check perl availability
PERL_OUTPUT=$(perl -MTime::HiRes=sleep -e 'sleep(0.1)' 2>&1)
if [ $? -ne 0 -o -n "$PERL_OUTPUT" ];then
    SEC_SLEEP=1
fi

### Start message
LOG_FILE=$OUTPUT_DIR/$LOG_FNAME
WRITE_LOG -v "===== $BASE_NAME called by '$(whoami)' with args '$ARGS_ORG' [PID:$$] start ====="

echo
WRITE_LOG -v "DB_NAME    : $DB_NAME"
WRITE_LOG -v "INTERVAL   : $INTERVAL"
WRITE_LOG -v "MAX_COUNT  : $MAX_COUNT"
WRITE_LOG -v "SQL_FILE   : $SQL_FILE"
WRITE_LOG -v "EXEC_USER  : $(whoami)"
WRITE_LOG -v "EXEC_DATE  : $EXEC_DATE"
WRITE_LOG -v "BASE_PATH  : $BASE_PATH"
WRITE_LOG -v "OUTPUT_DIR : $OUTPUT_DIR"
echo

### Create temporary file with format "<CSV_File(full path)>@<SQL(modified)>"
SQL_TMP=${OUTPUT_DIR}/$BASE_NAME.$(whoami).$$.sql.tmp    # Temporary file for SQL (full path)
EXP_TMP=${OUTPUT_DIR}/$BASE_NAME.$(whoami).$$.exp.tmp    # Temporary file for tmp (full path)

grep -vE '^#|^[[:blank:]]*$' $SQL_FILE | while IFS=@ read PREFIX MONITOR_SQL HEX_COLS EXCL_COLS ; do
    echo "$PREFIX" | sed "s/ //g" | read PREFIX
    WRITE_LOG -- "-- PREFIX '$PREFIX' --"

    if [ -n "$HEX_COLS" -o -n "$EXCL_COLS" ];then
        ALL_COLS=$(DB2DBDFT=$DB_NAME db2 "DESCRIBE $MONITOR_SQL")
        if [[ $? -ne 0 ]];then
            WRITE_LOG -v "[ERROR] Describe command failed! '$MONITOR_SQL' : \n"$ALL_COLS
            continue
        fi
        ALL_COLS=$(echo "$ALL_COLS" | awk '/^[- ][- ]*$/ {while(getline){print $4}}')

        if [ -n "$HEX_COLS" ];then
            WRITE_LOG "   HEX_COLS : '$HEX_COLS'"
            for HEX_COL in $(echo $HEX_COLS|sed "s/,/ /g") ; do
                ALL_COLS=$(echo "$ALL_COLS" | 
                           awk '{ if ( $0 ~ /^'$HEX_COL'$/ ) {print "HEX(" $0 ")@AS@" $0 } else {print} }')
            done
        fi
        if [ -n "$EXCL_COLS" ];then
            WRITE_LOG "   EXCL_COLS : '$EXCL_COLS'"
            for EXCL_COL in $(echo $EXCL_COLS|sed "s/,/ /g") ; do
                ALL_COLS=$(echo "$ALL_COLS" | awk '$0 !~ /^'$EXCL_COL'$/')
            done
        fi
        ALL_COLS=$(echo $ALL_COLS | sed -e"s/^TIMESTAMP //" -e"s/ /,/g" -e"s/@/ /g")
        MONITOR_SQL=$(echo "$MONITOR_SQL" | sed "s/.\.\*/$ALL_COLS/")
    fi
    echo "${OUTPUT_DIR}/${EXEC_DATE}.$(uname -n).$(whoami).${DB_NAME}.${PREFIX}.csv"@"${MONITOR_SQL}" >> $SQL_TMP
done 2>>$LOG_FILE
echo "$SQL_TMP -------->" >> $LOG_FILE
cat -n $SQL_TMP           >> $LOG_FILE
echo "$SQL_TMP <--------" >> $LOG_FILE

# Get initial baseline timestamp
if [[ $SEC_SLEEP -eq 1 ]];then
    # Get initial baseline timestamp formatted as "second" (since January 1, 1970)
    base_time=$(date +%s)
else
    # Get initial baseline timestamp formatted as "sec.millisec" (since January 1, 1970)
    base_time=$(perl -e 'use strict; use warnings; use Time::HiRes qw(gettimeofday); my($usec,$msec)=gettimeofday; printf "%d.%d\n",$usec,$msec;')
fi
WRITE_LOG "base_time : $base_time"

### Execute Monitor SQL
I=1 ; while :; do
    WRITE_LOG -v "Monitor start ( $I of $MAX_COUNT ) ..."
    cat $SQL_TMP | while IFS=@ read CSV_FILE MONITOR_SQL ; do
        # Export to temporary file
        cp /dev/null $EXP_TMP
        WRITE_LOG -- "--- [ $I / $MAX_COUNT ] $(basename $CSV_FILE) ---"
        EXP_CMD="export to $EXP_TMP of del modified by timestampformat=\"YYYY-MM-DD HH:MM:SS.UUUUUU\" $MONITOR_SQL"
        if [[ $I -eq 1 ]];then
            DB2DBDFT=$DB_NAME db2 -v "$EXP_CMD" >>$LOG_FILE 2>&1
            EXP_RC=$?
        else
            DB2DBDFT=$DB_NAME db2 "$EXP_CMD" >>$LOG_FILE 2>&1
            EXP_RC=$?
        fi
        WRITE_LOG -- "--- $CSV_FILE : export command terminate with RC='$EXP_RC'"

        # Generate primary output file with column header if the file does not exist
        if [[ ! -f $CSV_FILE ]];then
            ALL_COLS=$(DB2DBDFT=$DB_NAME db2 "DESCRIBE $MONITOR_SQL")
            if [[ $? -ne 0 ]];then
                WRITE_LOG -v "[ERROR] Describe command failed! '$MONITOR_SQL' : \n"$ALL_COLS
                touch $CSV_FILE
                continue
            fi
            echo "$ALL_COLS" | awk '/^[- ][- ]*$/{while(getline){cols=cols","$4}} END{gsub(/^,|,$/,"",cols);print cols}' >$CSV_FILE
        fi

        if [[ -s $EXP_TMP ]];then
            cat $EXP_TMP >> $CSV_FILE 2>> $LOG_FILE
        else
            date +%Y-%m-%d" "%H:%M:%S >> $CSV_FILE 2>> $LOG_FILE
            WRITE_LOG "$CSV_FILE : No rows exported. Timestamp only."
        fi
        ERROR_CHK $? "[ERROR] Export file could not merge! ($CSV_FILE)"
    done

    I=$((I+1))
    if [[ $I -le $MAX_COUNT ]];then
        if [[ $SEC_SLEEP -eq 1 ]];then
            # Sleep until next interval
            sleep $((INTERVAL - ( $(date +%s) - $base_time) ))
            # new baseline timestamp
            base_time=$(date +%s)
        else
            # Sleep until next interval and output new baseline timestamp
            perl -e 'use strict; use warnings;
                     use Time::HiRes qw(gettimeofday);
                     my($c_usec,$c_msec)=gettimeofday;
            
                     my $sleep_ms = $ARGV[0] + $ARGV[1] - ( $c_usec + ($c_msec / 1000000) );
                     Time::HiRes::sleep($sleep_ms);
            
                     my($b_usec,$b_msec)=gettimeofday;
                     printf "%d.%06d\n",$b_usec,$b_msec;
            ' $base_time $INTERVAL | read base_time
        fi
    else
        break
    fi
done 2>>$LOG_FILE
