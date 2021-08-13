__version__   = '21.0.0'
__notebook__  = 'awr_miner_plot.py'

#
# Version History
#
# 2021-05-26    21.0.0 tmf     Bug fixes & 21.0.0
# 2021-05-23    1.16   tmf     Various fixes to labels & sorting
# 2021-04-22    1.15   tmf     Added sizegb
# 2021-04-19    1.14   tmf     Various bug fixes
# 2021-04-18    1.13   tmf     Re-factored to be notebook friendly
# 2021-04-15    1.12   tmf     Added per-instance summary table
# 2021-04-15    1.11   tmf     Bug fixes
# 2021-04-14    1.10   tmf     Directory name change
# 2021-04-14    1.9    tmf     Re-factored to run over list of files in directory
# 2021-04-13    1.8    tmf     Added utilization in cores
# 2021-04-10    1.7    tmf     Added sub-milliseconds for I/O histogram

# ---
#

"""
#
# Sample first cell
#
import os

os.environ['AWR_MINER_PATH']='/Users/tfrazier/Pycharm_NetworkTopology/results/cust-working-dir'
os.environ['AWR_MINER_PATH']='/Users/tfrazier/Pycharm_NetworkTopology/sizing/AWR_Miner_Examples/craft.01'

SHOW=True

TEMPLATE='ggplot2'
TEMPLATE='seaborn'
"""

import os

if 'AWR_MINER_PATH' in os.environ:
    AWR_MINER_PATH=os.environ['AWR_MINER_PATH']
else:
    AWR_MINER_PATH = os.getcwd()

# ---

try:
    if SHOW != '': pass

except:
    try:
        shell = get_ipython().__class__.__name__
        if shell == 'ZMQInteractiveShell':
            SHOW = True  # Jupyter notebook or qtconsole
        elif shell == 'TerminalInteractiveShell':
            SHOW = False  # Terminal running IPython
        else:
            SHOW = False  # Other type (?)
    except NameError:
        SHOW = False  # Probably standard Python interpreter

# ---

try:
    if TEMPLATE != '': pass
except:
    TEMPLATE = 'seaborn'

# ---

import datetime
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
import time

"""

Type the following into cell before exporting as .html
po.init_notebook_mode() 

"""

# ---

HEIGHT = 2200
WIDTH  = 1920

DATA_TYPES  = [
               'AVERAGE-ACTIVE-SESSIONS'
              ,'DATABASE-PARAMETERS', 'DATABASE-PARAMETERS2'
              ,'IO-OBJECT-TYPE'
              ,'IO-WAIT-HISTOGRAM'
              ,'IOSTAT-BY-FUNCTION'
              ,'MAIN-METRICS'
              ,'MEMORY', 'MEMORY-PGA-ADVICE', 'MEMORY-SGA-ADVICE'
              ,'MODULE'
              ,'OS-INFORMATION', 'OS-INFORMATION2'
              ,'OSSTAT'
              ,'PATCH-HISTORY'
              ,'SIZE-ON-DISK'
              ,'SNAP-HISTORY'
              ,'SQLNET-METRICS'
              ,'SYSSTAT'
              ,'TOP-N-TIMED-EVENTS'
              ,'TOP-SQL-BY-SNAPID'
              ,'TOP-SQL-SUMMARY']


OBJECT_TYPE_COLORS = {
 'INDEX'          : 'navy',
 'LOB'            : 'limegreen',
 'LOB PARTITION'  : 'dodgerblue',
 'TABLE'          : 'coral'
                     }

WAIT_CLASS_COLORS  = {
 'Administrative' : 'rgb(251, 205,  74)', # from OMC
 'Application'    : 'rgb(237, 102,  71)', # from OMC
 'Cluster'        : 'gray',
 'Commit'         : 'rgb(255, 181,  77)', # from OMC
 'Concurrency'    : 'rgb(185,  97, 203)', # from OMC
 'Configuration'  : 'rgb(247, 243, 123)', # from OMC
 'CPU'            : 'rgb(104, 193, 130)', # from OMC
 'Network'        : 'rgb( 71, 189, 239)', # from OMC
 'Other'          : 'rgb(227, 113, 178)', # from OMC
 'Queueing'       : 'rgb(162, 191,  57)', # from OMC (Wait for CPU)
 'Scheduler'      : 'rgb(209, 231, 204)', # from OMC
 'System I/O'     : 'rgb(109, 219, 219)', # from OMC
 'User I/O'       : 'rgb(  5, 112, 202)', # from OMC
                     }

# ---

dataDf, figs        = {}, []
instancesDf, snapDf = [], []

now                 = datetime.datetime.utcnow()
tb                  = time.time()
ts                  = now.strftime("%Y-%m-%d_%H-%M-%S") + '_UTC'
tsDisplay           = now.strftime("%Y/%m/%d %H:%M:%S") + ' UTC'

# ----------------------------------------------------------------------------------------------------------------------

def lg(t):
    print(t)

# ---

def parseForFigure7(s):
    f=s['variable'].split(' ')

    event_name = ''
    for c in range(len(f) -1):
        event_name += f[c] + ' '
    event_name=event_name.strip()

    wait_time_milli = f[len(f) -1]

    return event_name, wait_time_milli

# ---

dataDf, ignoredFiles, whichDB, whichDBs = {}, [], '', []
parser = lambda date: datetime.datetime.strptime(date, '%y/%m/%d %H:%M')

# ---

if not os.path.exists(AWR_MINER_PATH + os.sep + 'awr_miner_parsed'):
    lg('\n\nDirectory ' + AWR_MINER_PATH + os.sep + 'awr_miner_parsed does not exist; cannot continue')

    assert (False)

# ---

def loadCSV(filePath, whichDB, whichType):
    global dataDf

    tb = time.time()

    try:
        if whichType == 'MAIN-METRICS':
            df = pd.read_csv(filePath, parse_dates=['end'], date_parser=parser)
        else:
            df = pd.read_csv(filePath)
    except Exception as fc:
        lg('\n     Loading ' + filePath + ' resulted in exception ' + str(fc) + '\n')
        return

    df.columns = [c.strip() for c in df.columns]
    df.drop_duplicates(inplace=True)

    df['WHICH_DB'] = whichDB

    if len(dataDf) == 0 or whichType not in dataDf:
        dataDf[whichType] = df

    else:
        dataDf[whichType] = pd.concat([dataDf[whichType], df], ignore_index=True)
        dataDf[whichType].drop_duplicates(inplace=True)

    lg('     Loaded ' + str(len(df)) + ' rows in ' + str(round(time.time() - tb, 3)) + ' s from ' + filePath)

# ---

db = ''

for subdir, dirs, files in os.walk(AWR_MINER_PATH + os.sep + 'awr_miner_parsed'):
    pieces = subdir.split(os.sep)

    if pieces[len(pieces) - 1].startswith('db_'):
        db = pieces[len(pieces) - 1]
        lg('Found DB ' + db + '...')

        continue

    if pieces[len(pieces) - 1].startswith('awr-hist-'):
        if db == '':
            lg('Unexpected directory structure error; continuing until next DB directory')
            continue

        snap_range = pieces[len(pieces) - 1].split('-')
        whichDB    = db + '-' + snap_range[len(snap_range) - 2] + '-' + snap_range[len(snap_range) - 1]

        #print('snap_range: ' + str(snap_range))
        #print('whichDB   : ' + str(whichDB))

        lg('   Loading files for snap range' + whichDB + '...')

    if len(files) == 0:
        #lg('Ignoring non-file directory ' + subdir)
        continue

    elif whichDB == '':
        lg('whichDB not established; ignoring directory ' + subdir)
        continue

    #lg('whichDB: ' + whichDB + ', files: ' + str(files))

    ctr = 0
    for file in files:
        whichType = file.replace('.csv', '')

        if whichType in DATA_TYPES:
            loadCSV(os.path.join(subdir, file), whichDB, whichType)
            ctr += 1
        else:
            ignoredFiles.append(file)

    if ctr > 0:
        whichDBs.append(whichDB)

# ---

dbDf = dataDf['OS-INFORMATION'][dataDf['OS-INFORMATION']['STAT_NAME'] == 'DB_NAME'][['WHICH_DB', 'STAT_VALUE']]
dbDf.rename(columns={'STAT_VALUE' : 'DB_NAME'}, inplace=True)

# ---

summaryDf = []
for k in dataDf:
    df           = dataDf[k].copy()
    df['SOURCE'] = k
    df['rows']   = 1
    df           = df.groupby(['WHICH_DB', 'SOURCE'], as_index=False)[['rows']].count()
    df           = pd.merge(left=df, right=dbDf, how='left', left_on=['WHICH_DB'], right_on=['WHICH_DB'])

    summaryDf    = df if len(summaryDf) == 0 else pd.concat([summaryDf, df], ignore_index=True)

summaryDf = summaryDf[['DB_NAME', 'SOURCE', 'rows']]

os.makedirs(AWR_MINER_PATH + os.sep + 'awr_miner_plots' + os.sep + ts + os.sep + 'html', exist_ok=True)
os.makedirs(AWR_MINER_PATH + os.sep + 'awr_miner_plots' + os.sep + ts + os.sep + 'csv',  exist_ok=True)

filename =  AWR_MINER_PATH + os.sep + 'awr_miner_plots' + os.sep + ts + os.sep + 'csv' + os.sep + '00_source_row_counts_' + ts + '.csv'
summaryDf.to_csv(filename, index=False)
lg('\nWrote row counts to file ' + filename)

# ----------------------------------------------------------------------------------------------------------------------

u        = set(whichDBs)
whichDBs = list(u)
whichDBs = sorted(whichDBs)

instancesDf = []

for whichDB in whichDBs:
    df = [] if 'OS-INFORMATION2' not in dataDf else dataDf['OS-INFORMATION2'][dataDf['OS-INFORMATION2']['WHICH_DB'] == whichDB]

    if len(df) > 0:
        instDf = df[df['INSTANCE'] > 0].copy()
        instDf.drop_duplicates(inplace=True)

        try:
            instDf = pd.pivot(instDf, index=['INSTANCE'], columns=['STAT_NAME'], values='STAT_VALUE').reset_index()
        except Exception as fc:
            filename = AWR_MINER_PATH + os.sep + 'awr_miner_plots' + os.sep + ts + os.sep + 'duplicates_' + ts + '.csv'
            lg('\n\n' + str(fc) + ' was raised; writing file to ' + filename)
            instDf.to_csv(filename, index=False)

            assert(False)

        cols = ['INSTANCE']
        if 'HOSTS'              in instDf: cols.append('HOSTS')
        if 'NUM_CPUS'           in instDf: cols.append('NUM_CPUS')
        if 'NUM_CPU_CORES'      in instDf: cols.append('NUM_CPU_CORES')
        if 'NUM_CPU_SOCKETS'    in instDf: cols.append('NUM_CPU_SOCKETS')
        if 'PHYSICAL_MEMORY_GB' in instDf: cols.append('PHYSICAL_MEMORY_GB')

        instDf                    = instDf[cols]
        instDf['NUM_CPUS']        = instDf['NUM_CPUS'].astype(int)
        instDf['NUM_CPU_CORES']   = instDf['NUM_CPU_CORES'].astype(int)
        instDf['NUM_CPU_SOCKETS'] = instDf['NUM_CPU_CORES'].astype(int)

    else:
        df = dataDf['OS-INFORMATION'][dataDf['OS-INFORMATION']['WHICH_DB'] == whichDB]

        try:
            instances = int(df[df['STAT_NAME'] == 'INSTANCES']['STAT_VALUE'].values[0])
        except Exception as fc:
            lg(str(fc) + ' raised reading INSTANCES count; cannot continue')
            assert(False)

# ---

        try:
            numCPUs    = int(df[df['STAT_NAME'] == 'NUM_CPUS']       ['STAT_VALUE'].values[0])
            numCores   = int(df[df['STAT_NAME'] == 'NUM_CPU_CORES']  ['STAT_VALUE'].values[0])
        except Exception as fc:
            lg(str(fc) + " raised reading CPU-related value from dataDf['OS-INFORMATION']; cannot continue with database " + whichDB)
            continue

        try:
            numSockets = int(df[df['STAT_NAME'] == 'NUM_CPU_SOCKETS']['STAT_VALUE'].values[0])
        except:
            numSockets = -1

# ---

        try:
            memoryGB = float(df[df['STAT_NAME'] == 'PHYSICAL_MEMORY_GB']['STAT_VALUE'].values[0])
        except:
            memoryGB = 0

        try:
            hosts = df[df['STAT_NAME'] == 'HOSTS']['STAT_VALUE'].values[0].split(',')
        except:
            hosts = []

        instDf = []
        for i in range(instances):
            h = '' if i >= len(hosts) else hosts[i]

            df     = pd.DataFrame([[i + 1, h, numCPUs, numCores, numSockets, memoryGB]], columns=['INSTANCE', 'HOST', 'NUM_CPUS', 'NUM_CPU_CORES', 'NUM_CPU_SOCKETS', 'PHYSICAL_MEMORY_GB'])
            instDf = df if len(instDf) == 0 else pd.concat([instDf, df])

# ---

    df = [] if 'DATABASE-PARAMETERS2' not in dataDf else dataDf['DATABASE-PARAMETERS2'][dataDf['DATABASE-PARAMETERS2']['WHICH_DB'] == whichDB]

    if len(df) > 0:
        df = df[df['PARAMETER_NAME'].isin(['cpu_count', 'cpu_min_count'])][['INSTANCE_NUMBER', 'PARAMETER_NAME', 'VALUE']]

        if len(df) == 0:
            instDf['cpu_count']     = 0
            instDf['cpu_min_count'] = 0

        else:
            df     = pd.pivot_table(df, index='INSTANCE_NUMBER', columns='PARAMETER_NAME', values='VALUE', aggfunc='min').reset_index()
            instDf = pd.merge(left=instDf, right=df, how='left', left_on=['INSTANCE'], right_on=['INSTANCE_NUMBER'])

            if 'cpu_count' in instDf:
                instDf['cpu_count'] = instDf['cpu_count'].astype(int)
            else:
                instDf['cpu_count'] = 0

            if 'cpu_min_count' in instDf:
                instDf['cpu_min_count'] = instDf['cpu_min_count'].astype(int)
            else:
                instDf['cpu_min_count'] = 0

            instDf.drop(columns=['INSTANCE_NUMBER'], inplace=True)

    else:
        df = [] if 'DATABASE-PARAMETERS' not in dataDf else dataDf['DATABASE-PARAMETERS'][dataDf['DATABASE-PARAMETERS']['WHICH_DB'] == whichDB]
        df = df[df['PARAMETER_NAME'].isin(['cpu_count', 'cpu_min_count'])][['PARAMETER_NAME', 'VALUE']]

        if len(df) == 0:
            instDf['cpu_count']     = 0
            instDf['cpu_min_count'] = 0

        else:
            df = pd.pivot_table(df, columns='PARAMETER_NAME', values='VALUE', aggfunc='min')

            instDf['cpu_count']     = int(df['cpu_count'].    values[0]) if 'cpu_count'     in df else 0
            instDf['cpu_min_count'] = int(df['cpu_min_count'].values[0]) if 'cpu_min_count' in df else 0

# ---

    df = [] if 'MEMORY' not in dataDf else dataDf['MEMORY'][dataDf['MEMORY']['WHICH_DB'] == whichDB]

    if len(df) > 0:
        snapIdMax = df['SNAP_ID'].max()

        memoryDf = df[df['SNAP_ID'] == snapIdMax][['INSTANCE_NUMBER', 'SGA', 'PGA', 'TOTAL']].copy()
        memoryDf.rename(columns={'INSTANCE_NUMBER' : 'INSTANCE', 'TOTAL' : 'SGA + PGA'}, inplace=True)

        instDf = pd.merge(left=instDf, right=memoryDf, how='left', left_on=['INSTANCE'], right_on=['INSTANCE'])

# ---

    df = [] if 'MAIN-METRICS' not in dataDf else dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB]

    if len(df) > 0:
        coresDf = df.copy()
        coresDf = coresDf.groupby(['snap', 'inst'], as_index=False)[['cpu_per_s']].sum()

        coresDf = coresDf.groupby('inst')[['cpu_per_s']].describe(percentiles=[0.95]).reset_index()
        coresDf = coresDf[[('inst', ''), ('cpu_per_s', '95%'), ('cpu_per_s', 'max')]]
        coresDf.columns = ['INSTANCE', 'cpu_per_s_95%', 'cpu_per_s_100%']
        coresDf = coresDf.round(2)
        instDf  = pd.merge(left=instDf, right=coresDf, how='left', left_on=['INSTANCE'], right_on=['INSTANCE'])

# ---

    df = [] if 'SQLNET-METRICS' not in dataDf else dataDf['SQLNET-METRICS'][dataDf['SQLNET-METRICS']['WHICH_DB'] == whichDB]

    if len(df) > 0:
        df = df.copy()
        df = df[['inst', 'snap', 'rqsts_to_from_client', 'sqlnet_bytes_received_from_client', 'sqlnet_bytes_sent_to_client']]
        df = pd.melt(df, id_vars=['inst', 'snap'])
        df['value'] = df['value'].astype(int)
#
#       Protect against a counter reset mid-snap
#
        df2 = df.copy()
        df2['snap'] = df2['snap'] - 1
        df.rename(columns={'value': 'shifted'}, inplace=True)
        df = pd.merge(left=df2, right=df, how='left', left_on=['inst', 'snap', 'variable'],
                      right_on=['inst', 'snap', 'variable'])
        df['diff'] = df['value'] - df['shifted']
#
#       Throw-out any resets
#
        df = df[df['diff'] >= 0]
        df = df.groupby(['inst', 'variable'], as_index=False)['diff'].sum()

        df.loc[df['variable'].str.find('bytes') > -1, 'diff']     = df['diff'] / 1024 ** 3
        df.loc[df['variable'].str.find('bytes') > -1, 'variable'] = df['variable'].str.replace('bytes', 'GB')

        df['diff'] = df['diff'].round(3)
        df.columns = ['INSTANCE', 'variable', 'value']

        if 'MAIN-METRICS' in dataDf and len(dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB]) > 0:
            daysShown               = (dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB]['end'].max() -
                                       dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB]['end'].min()).total_seconds() / (24 * 60 * 60)

            sqlNetAvgDf             = df.copy()
            sqlNetAvgDf['value']    = sqlNetAvgDf['value'] / daysShown
            sqlNetAvgDf['value']    = round(sqlNetAvgDf['value'], 3)
            sqlNetAvgDf['variable'] = sqlNetAvgDf['variable'] + ' (daily avg)'

            sqlNetDf = pd.concat([df, sqlNetAvgDf], ignore_index=True)
            sqlNetDf = pd.pivot(sqlNetDf, index=['INSTANCE'], columns=['variable'], values='value').reset_index()

            instDf   = pd.merge(left=instDf, right=sqlNetDf, how='left', left_on=['INSTANCE'], right_on=['INSTANCE'])

# ---

    instDf['WHICH_DB'] = whichDB

    instancesDf = instDf if len(instancesDf) == 0 else pd.concat([instancesDf, instDf], ignore_index=True)

# ---

if 'AVERAGE-ACTIVE-SESSIONS' in dataDf:
    dataDf['AVERAGE-ACTIVE-SESSIONS']['WAIT_CLASS'] = dataDf['AVERAGE-ACTIVE-SESSIONS']['WAIT_CLASS'].str.rstrip()
    dataDf['AVERAGE-ACTIVE-SESSIONS'].loc[dataDf['AVERAGE-ACTIVE-SESSIONS']['WAIT_CLASS'] == 'DB CPU', 'WAIT_CLASS'] = 'CPU'

if 'TOP-N-TIMED-EVENTS' in dataDf:
    dataDf['TOP-N-TIMED-EVENTS']['WAIT_CLASS'] = dataDf['TOP-N-TIMED-EVENTS']['WAIT_CLASS'].str.rstrip()
    dataDf['TOP-N-TIMED-EVENTS']['EVENT_NAME'] = dataDf['TOP-N-TIMED-EVENTS']['EVENT_NAME'].str.rstrip()

    dataDf['TOP-N-TIMED-EVENTS'].loc[dataDf['TOP-N-TIMED-EVENTS']['WAIT_CLASS'] == 'DB CPU', 'WAIT_CLASS'] = 'CPU'
    dataDf['TOP-N-TIMED-EVENTS'].loc[dataDf['TOP-N-TIMED-EVENTS']['EVENT_NAME'] == 'DB CPU', 'EVENT_NAME'] = 'CPU'

if 'MAIN-METRICS' in dataDf:
    snapDf       = dataDf['MAIN-METRICS'][['inst', 'snap', 'end', 'dur_m', 'WHICH_DB']].drop_duplicates()
    gbDf         = snapDf.groupby(['WHICH_DB', 'inst'], as_index=False)[['snap', 'end']].agg(['min', 'max']).reset_index()
    gbDf.columns = ['WHICH_DB', 'INSTANCE', 'snap_id_min', 'snap_id_max', 'snap_end_min', 'snap_end_max']
    instancesDf  = pd.merge(left=instancesDf, right=gbDf, how='left', left_on=['WHICH_DB', 'INSTANCE'], right_on=['WHICH_DB', 'INSTANCE'])
#
#   snapDf will be used in charts below; inst is not needed
#
    snapDf       = dataDf['MAIN-METRICS'][['snap', 'end', 'dur_m', 'WHICH_DB']].drop_duplicates()

else:
    snapDf = []

# ---

instancesDf = pd.merge(left=instancesDf, right=dbDf, how='left', left_on=['WHICH_DB'], right_on=['WHICH_DB'])
instancesDf.drop_duplicates(inplace=True)

if 'HOSTS' in instancesDf:
    instancesDf.rename(columns={'HOSTS' : 'HOST'}, inplace=True)

cols = ['WHICH_DB', 'DB_NAME', 'INSTANCE', 'HOST']

for c in sorted(instancesDf.columns):
    if c not in cols:
        cols.append(c)
instancesDf = instancesDf[cols]

filename =  AWR_MINER_PATH + os.sep + 'awr_miner_plots' + os.sep + ts + os.sep + 'csv' + os.sep + '00_instances_' + ts + '.csv'
instancesDf.drop(columns=['WHICH_DB']).to_csv(filename, index=False)
lg('Wrote instance configuration & summary telemetry to file ' + filename)

for k in dataDf:
    filename = AWR_MINER_PATH + os.sep + 'awr_miner_plots' + os.sep + ts + os.sep + 'csv' + os.sep + k + '_' + ts + '.csv'
    df       = pd.merge(left=dataDf[k], right=dbDf, how='left', left_on=['WHICH_DB'], right_on=['WHICH_DB'])
    df.drop(columns=['WHICH_DB'], inplace=True)
    df.to_csv(filename, index=False)

lg('Wrote composite sources to files in directory ' + AWR_MINER_PATH + os.sep + 'awr_miner_plots' + os.sep + ts + os.sep + 'csv' + '\n')

# ----------------------------------------------------------------------------------------------------------------------

"""

use code like the following if running in a notebook
whichDBs

whichDBs = whichDBs[0:1]
"""

# ----------------------------------------------------------------------------------------------------------------------

for whichDB in whichDBs:
    figs    = []
    DB_NAME = dbDf[dbDf['WHICH_DB'] == whichDB]['DB_NAME'].values[0]
    suffix  = DB_NAME + ', v' + __version__ + ' @ ' + tsDisplay

    lg('Plotting ' + whichDB + '...')

    # ------------------------------------------------------------------------------------------------------------------
    #
    # Figure 0 (Summary Tables)
    #

    df=dataDf['OS-INFORMATION'][dataDf['OS-INFORMATION']['WHICH_DB'] == whichDB].copy()
    df.drop(columns=['WHICH_DB'], inplace=True)

    df.rename(columns={'STAT_NAME': 'Property', 'STAT_VALUE': 'Value'}, inplace=True)

    df=df.append({'Property' : 'AWR_PLOT_VER', 'Value' : __version__}, ignore_index=True)
    df=df.append({'Property' : 'Generated',    'Value' : tsDisplay},   ignore_index=True)

# ---

    if 'MAIN-METRICS' in dataDf and len(dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB]) > 0:
        daysShown = (dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB]['end'].max() -
                     dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB]['end'].min()).total_seconds() / (24 * 60 * 60)

        cols=['dur_m'
             ,'read_iops', 'write_iops', 'read_mb_s', 'write_mb_s'
             ,'logons_total', 'exec_s', 'commits_s', 'aas']

        metricsDf = dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB][['end'] + cols].copy()
        metricsDf = metricsDf.groupby('end', as_index=False)[cols].sum()
        metricsDf = metricsDf[cols].agg(['min', 'max', 'mean', 'sum']).T.reset_index()

        metricsDf.rename(columns={'index' : 'metric', 'mean' : 'avg', 'sum' : 'total'}, inplace=True)

        metricsDf.loc[metricsDf['metric'] == 'dur_m', 'metric'] = 'max(dur_m i.e. snap.min)'

        metricsDf = pd.DataFrame([['days', daysShown, daysShown, daysShown, daysShown]], columns=['metric', 'min', 'max', 'avg', 'total']).append(metricsDf, ignore_index=True)

        metricsDf = metricsDf[['metric', 'max']]
        metricsDf.rename(columns={'metric': 'Property', 'max': 'Value'}, inplace=True)

        metricsDf          = metricsDf.round(2)
        metricsDf['Value'] = metricsDf['Value'].astype(str)

        df = pd.concat([df, metricsDf], ignore_index=True)

# ---

    if 'SIZE-ON-DISK' in dataDf and len(dataDf['SIZE-ON-DISK'][dataDf['SIZE-ON-DISK']['WHICH_DB'] == whichDB]) > 0:
        sizeDf = dataDf['SIZE-ON-DISK'][dataDf['SIZE-ON-DISK']['WHICH_DB'] == whichDB]
        sizeDf = sizeDf[sizeDf['SNAP_ID'] == sizeDf['SNAP_ID'].max()]

        sizeDf['Property'] = 'sizegb'
        sizeDf             = sizeDf[['Property', 'SIZE_GB']]
        sizeDf.rename(columns={'SIZE_GB' : 'Value'}, inplace=True)

        df = pd.concat([df, sizeDf], ignore_index=True)

# ---

    df = df[~df['Property'].isin(['HOSTS', 'NUM_CPUS', 'NUM_CPU_CORES', 'NUM_CPU_SOCKETS', 'PHYSICAL_MEMORY_GB'])]

# ---

    headerColor  = 'grey'
    rowEvenColor = 'lightgrey'
    rowOddColor  = 'white'

    fillColors   = [rowEvenColor, rowOddColor] * len(df)

    fig0a = go.Figure(
        data=[go.Table(
                        columnwidth=[240, 600],
                        header=dict(values=list(df.columns),
                                    height=30,
                                    font={'color' : 'white', 'size' : 20},
                                    line_color='darkslategray',
                                    fill_color=headerColor,
                                    align='left'),
                        cells=dict(values=[df.Property, df.Value],
                                   height=28,
                                   font={'color' : 'darkslategray', 'size' : 18},
                                   fill_color=[fillColors],
                                   align='left'))
                    ])

    fig0a.update_layout(
         height          = HEIGHT * 0.6
        ,width           = WIDTH
        ,title_text      = '<b>Summary Values - ' + suffix + '</b><br>Figure 0a'
        ,title_font_size = 24
        )

    figs.append({'page' : 0, 'fig' : fig0a})

    if SHOW:
        fig0a.show()
    else:
        lg('   Plotted figure 0a')

# ---

    df = instancesDf[instancesDf['WHICH_DB'] == whichDB].set_index('INSTANCE').T.reset_index()
    df = df[~df['index'].isin(['DB_NAME', 'WHICH_DB'])]

    cols  = ['Property']
    for i in range(len(df.columns) - 1):
        cols.append(i + 1)
    df.columns     = cols

    values, widths = [df.Property], [30]

    for i in range(len(df.columns) - 1):
        values.append(df[i + 1])
        widths.append(20)

    headerColor  = 'grey'
    rowEvenColor = 'lightgrey'
    rowOddColor  = 'white'

    fillColors   = [rowEvenColor, rowOddColor] * len(df)

    fig0b = go.Figure(
        data=[go.Table(
                        columnwidth=widths,
                        header=dict(values=list(df.columns),
                                    height=30,
                                    font={'color' : 'white', 'size' : 20},
                                    line_color='darkslategray',
                                    fill_color=headerColor,
                                    align='left'),
                        cells=dict(values=values,
                                   height=28,
                                   font={'color' : 'darkslategray', 'size' : 18},
                                   fill_color=[fillColors],
                                   align='left'))
                    ])

    fig0b.update_layout(
         height          = HEIGHT * 0.4
        ,width           = WIDTH
        ,title_text      = '<b>Instance Values' + ' - ' + suffix + '</b><br>Figure 0b' +
                           (' (Configuration values are dervied from minimum instance number)' if 'OS-INFORMATION2' not in dataDf and len(instancesDf[instancesDf['WHICH_DB'] == whichDB]) > 1 else '')
        ,title_font_size = 24
        )

    figs.append({'page' : 0, 'fig' : fig0b})

    if SHOW:
        fig0b.show()
    else:
        lg('   Plotted figure 0b')

    # ------------------------------------------------------------------------------------------------------------------
    #
    # Figure 1
    #

    if 'AVERAGE-ACTIVE-SESSIONS' in dataDf and len(dataDf['AVERAGE-ACTIVE-SESSIONS'][dataDf['AVERAGE-ACTIVE-SESSIONS']['WHICH_DB'] == whichDB]) > 0:
        total          = dataDf['AVERAGE-ACTIVE-SESSIONS'][dataDf['AVERAGE-ACTIVE-SESSIONS']['WHICH_DB'] == whichDB]['AVG_SESS'].sum()

        df             = dataDf['AVERAGE-ACTIVE-SESSIONS'][dataDf['AVERAGE-ACTIVE-SESSIONS']['WHICH_DB'] == whichDB].copy()
        df             = df.groupby('WAIT_CLASS', as_index=False)['AVG_SESS'].sum()
        df['AVG_SESS'] = round((df['AVG_SESS'] / total) * 100)

        fig1a=px.bar(df, x='WAIT_CLASS', y='AVG_SESS', color='WAIT_CLASS'
                    ,title='Average Active Sessions (AAS) % by Wait Class - All Snapshots - ' + suffix + '<br>Figure 1a'
                    ,labels={'AVG_SESS' : '% of Total(AAS)', 'WAIT_CLASS' : ''}
                    ,height=HEIGHT / 2, width=WIDTH, template=TEMPLATE)
        fig1a.update_layout(font={'size' : 16})

        for idx in range(len(fig1a.data)):
            fig1a.data[idx].text = fig1a.data[idx]['y'][0]

            if fig1a.data[idx]['legendgroup'] not in WAIT_CLASS_COLORS:
                WAIT_CLASS_COLORS[fig1a.data[idx]['legendgroup']] = 'gold'

            fig1a.data[idx]['marker']['color'] = WAIT_CLASS_COLORS[fig1a.data[idx]['legendgroup']]
            fig1a.data[idx]['hovertemplate']   = 'wait_class=' + fig1a.data[idx]['hovertemplate'][1:]

        figs.append({'page' : 1, 'fig' : fig1a})

        if SHOW:
            fig1a.show()
        else:
            lg('   Plotted figure 1a')

# ---
#
# Page 1b
#

    if 'TOP-N-TIMED-EVENTS' in dataDf and len(dataDf['TOP-N-TIMED-EVENTS'][dataDf['TOP-N-TIMED-EVENTS']['WHICH_DB'] == whichDB]) > 0:
        total              = dataDf['TOP-N-TIMED-EVENTS'][dataDf['TOP-N-TIMED-EVENTS']['WHICH_DB'] == whichDB]['TOTAL_TIME_S'].sum()

        df                 = dataDf['TOP-N-TIMED-EVENTS'][dataDf['TOP-N-TIMED-EVENTS']['WHICH_DB'] == whichDB].copy()
        df                 = df.groupby(['WAIT_CLASS', 'EVENT_NAME'], as_index=False)['TOTAL_TIME_S'].sum()
        df['TOTAL_TIME_S'] = round((df['TOTAL_TIME_S'] / total) * 100, 2)
        df['label']        = df['WAIT_CLASS'] + ' - ' + df['EVENT_NAME']

        df.sort_values(['TOTAL_TIME_S'], ascending=[False], inplace=True)
        df.reset_index(drop=True, inplace=True)
        df=df.loc[0:10]

        fig1b=px.bar(df, x='label', y='TOTAL_TIME_S', color='WAIT_CLASS'
                    ,title='Top 10 Timed Events by Total Time Aggregated over Snapshot Range - ' + suffix + '<br>Figure 1b'
                    ,labels={'TOTAL_TIME_S': '% of Total(TOTAL_TIME_S)', 'label' : ''}
                    ,height=HEIGHT / 2, width=WIDTH, template=TEMPLATE)
        fig1b.update_layout(font={'size' : 16})

        for idx in range(len(fig1b.data)):
            fig1b.data[idx].text = fig1b.data[idx]['y']

            if fig1b.data[idx]['legendgroup'] not in WAIT_CLASS_COLORS:
                WAIT_CLASS_COLORS[fig1b.data[idx]['legendgroup']] = 'gold'

            fig1b.data[idx]['marker']['color'] = WAIT_CLASS_COLORS[fig1b.data[idx]['legendgroup']]
            fig1b.data[idx]['hovertemplate']   = 'wait_class - event_name' + fig1b.data[idx]['hovertemplate'][fig1b.data[idx]['hovertemplate'].find('<br>') + 4:]

        figs.append({'page' : 1, 'fig' : fig1b})

        if SHOW:
            fig1b.show()
        else:
            lg('   Plotted figure 1b')

# ---
#
# Page 1c
#

    if 'MAIN-METRICS' in dataDf and len(dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB]) > 0:
        violinDf=[]

        if 1 == 0:
            df=dataDf['AVERAGE-ACTIVE-SESSIONS'].copy().groupby('SNAP_ID', as_index=False)['AVG_SESS'].sum()
            df.rename(columns={'AVG_SESS' : 'value'}, inplace=True)
            df['facet'] = 'Avg Act Sessions'
        else:
            df = dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].copy().groupby('snap', as_index=False)['aas'].sum()
            df.rename(columns={'aas': 'value'}, inplace=True)
            df['facet'] = 'Avg Act Sessions (AAS)'

        violinDf=df

# ---

        if 1 == 0:
            df=dataDf['AVERAGE-ACTIVE-SESSIONS'][dataDf['AVERAGE-ACTIVE-SESSIONS']['WAIT_CLASS'] == 'CPU'].copy().groupby('SNAP_ID', as_index=False)['AVG_SESS'].sum()
            df.rename(columns={'AVG_SESS' : 'value'}, inplace=True)
            df['facet'] = 'CPU'
        else:
            df = dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].copy().groupby('snap', as_index=False)['os_cpu'].sum()
            df.rename(columns={'os_cpu': 'value'}, inplace=True)
            df['facet'] = 'CPU'

        violinDf=pd.concat([violinDf, df], ignore_index=True)

# ---

        df=dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].copy().groupby('snap', as_index=False)['exec_s'].sum()
        df.rename(columns={'exec_s' : 'value'}, inplace=True)
        df['facet'] = 'Execs / S'

        violinDf=pd.concat([violinDf, df], ignore_index=True)

# ---

        df=dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].copy().groupby('snap', as_index=False)['read_iops'].sum()
        df.rename(columns={'read_iops' : 'value'}, inplace=True)
        df['facet'] = 'Read IOPs'

        violinDf=pd.concat([violinDf, df], ignore_index=True)

# ---

        df=dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].copy().groupby('snap', as_index=False)['read_mb_s'].sum()
        df.rename(columns={'read_mb_s' : 'value'}, inplace=True)
        df['facet'] = 'Read MB / S'

        violinDf=pd.concat([violinDf, df], ignore_index=True)

# ---

        df=dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].copy().groupby('snap', as_index=False)['sql_res_t_cs'].sum()
        df.rename(columns={'sql_res_t_cs' : 'value'}, inplace=True)
        df['facet'] = 'SQL Resp Time (cs)'

        violinDf=pd.concat([violinDf, df], ignore_index=True)

# ---

        df=dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].copy().groupby('snap', as_index=False)['se_sess'].sum()
        df.rename(columns={'se_sess' : 'value'}, inplace=True)
        df['facet'] = 'SE Sessions'

        violinDf=pd.concat([violinDf, df], ignore_index=True)

# ---

        df=dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].copy().groupby('snap', as_index=False)['px_sess'].sum()
        df.rename(columns={'px_sess' : 'value'}, inplace=True)
        df['facet'] = 'PX Sessions'

        violinDf=pd.concat([violinDf, df], ignore_index=True)

# ---

        df=dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].copy().groupby('snap', as_index=False)['write_iops'].sum()
        df.rename(columns={'write_iops' : 'value'}, inplace=True)
        df['facet'] = 'Write IOPs'

        violinDf=pd.concat([violinDf, df], ignore_index=True)

# ---

        df=dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].copy().groupby('snap', as_index=False)['write_mb_s'].sum()
        df.rename(columns={'write_mb_s' : 'value'}, inplace=True)
        df['facet'] = 'Write MB / S'

        violinDf=pd.concat([violinDf, df], ignore_index=True)

# ---

        violinDf['x']='a' # needed to get violin plots to center in facets

        fig1c=px.violin(violinDf, y='value', color='x', facet_col='facet', facet_col_wrap=5, box=True
                       ,title='Summary Distributions - ' + suffix + '<br>Figure 1c'
                       ,height=HEIGHT, width=WIDTH, template=TEMPLATE)
        fig1c.update_layout(font={'size' : 16}, showlegend=False)
        fig1c.update_yaxes(matches=None, showticklabels=True)
        fig1c.update_xaxes(matches=None, showticklabels=False)

        for idx in range(len(fig1c.layout.annotations)):
            fig1c.layout.annotations[idx].text = fig1c.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig1c.data)):
            fig1c.data[idx]['hovertemplate'] = fig1c.data[idx]['hovertemplate'].replace('x=a<br>facet=', '')

        figs.append({'page' : 1.5, 'fig' : fig1c})

        if SHOW:
            fig1c.show()
        else:
            lg('   Plotted figure 1c')

    # -------------------------------------------------------------------------------------------------------------------
    #
    # Figure 2
    #

    if 'AVERAGE-ACTIVE-SESSIONS' in dataDf and len(dataDf['AVERAGE-ACTIVE-SESSIONS'][dataDf['AVERAGE-ACTIVE-SESSIONS']['WHICH_DB'] == whichDB]) > 0:
        if len(snapDf) == 0 or len(snapDf[snapDf['WHICH_DB'] == whichDB]) == 0:
            df        = dataDf['AVERAGE-ACTIVE-SESSIONS'][dataDf['AVERAGE-ACTIVE-SESSIONS']['WHICH_DB'] == whichDB].copy()
            df['end'] = df['SNAP_ID']
        else:
            df        = pd.merge(left=dataDf['AVERAGE-ACTIVE-SESSIONS'][dataDf['AVERAGE-ACTIVE-SESSIONS']['WHICH_DB'] == whichDB]
                                ,right=snapDf[snapDf['WHICH_DB'] == whichDB], how='left', left_on=['SNAP_ID'], right_on=['snap'])
#
# Force CPU to appear on the bottom of the chart
#
        df.loc[df['WAIT_CLASS'] == 'CPU', 'WAIT_CLASS'] = '0CPU'
        df.sort_values(['WAIT_CLASS', 'end'], inplace=True)
        df.loc[df['WAIT_CLASS'] == '0CPU', 'WAIT_CLASS'] = 'CPU'

        gbDf      = df.groupby('end', as_index=False)['AVG_SESS'].sum()
        plotCores = instancesDf[instancesDf['WHICH_DB'] == whichDB].cpu_count.sum() <= gbDf.AVG_SESS.max() or gbDf.AVG_SESS.max() >= float(instancesDf[instancesDf['WHICH_DB'] == whichDB].cpu_count.sum()) * 0.75

        fig2=px.area(df, x='end', y='AVG_SESS', color='WAIT_CLASS'
                    ,title='Average Active Sessions (AAS) - ' + suffix + '<br>Total CPU Threads=' + str(instancesDf[instancesDf['WHICH_DB'] == whichDB].cpu_count.sum()) + (' (trace not shown on figure)' if not plotCores else '') + '<br>Figure 2'
                    ,labels={'end' : '', 'AVG_SESS' : 'AAS'}
                    ,height=HEIGHT / 1.75, width=WIDTH, template=TEMPLATE)
        fig2.update_layout(font={'size' : 16})

        for idx in range(len(fig2.data)):
            if fig2.data[idx]['legendgroup'] not in WAIT_CLASS_COLORS:
                WAIT_CLASS_COLORS[fig2.data[idx]['legendgroup']] = 'gold'

            fig2.data[idx]['line']['color'] = WAIT_CLASS_COLORS[fig2.data[idx]['legendgroup']]
            fig2.data[idx]['hovertemplate'] = fig2.data[idx]['hovertemplate'].replace('WAIT_CLASS=', 'wait_class=').replace('=%{x}', 'snap_end=%{x}')
#
#   Prevent plotting of cores line it it would wash out the y-axis
#
        if plotCores:
            fig2.add_trace(go.Scatter(x=fig2.data[0].x, y=[instancesDf[instancesDf['WHICH_DB'] == whichDB].cpu_count.sum()] * len(fig2.data[0].x), name='threads', line_color='red'))

        figs.append({'page' : 2, 'fig' : fig2})

        if SHOW:
            fig2.show()
        else:
            lg('   Plotted figure 2')

    # ------------------------------------------------------------------------------------------------------------------
    #
    # Figure 3
    #

    if 'MAIN-METRICS' in dataDf and len(dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB]) > 0:
        df=dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].copy()
        df=pd.merge(left=df, right=instancesDf[instancesDf['WHICH_DB'] == whichDB], how='left', left_on=['inst'], right_on=['INSTANCE'])
        df.sort_values(['inst', 'end'], inplace=True)

        df['cpu_per_s'] = (df['cpu_per_s'] / df['NUM_CPUS']) * 100

        fig3a=px.line(df, x='end', y=['os_cpu', 'cpu_per_s'], facet_row='inst'
                     ,title='OS & Database CPU Utilization % - ' + suffix + '<br>Figure 3a'
                     ,labels={'value' : 'CPU %', 'end' : ''}
                     ,height=HEIGHT, width=WIDTH, template=TEMPLATE)
        fig3a.update_layout(font={'size' : 16})
        fig3a.update_traces(mode='lines')

        instanceCount = len(fig3a._grid_ref)
#
#   Row 1 is the bottom-most i.e. highest instance number
#
        sl = True

        for row_idx, row_figs in enumerate(fig3a._grid_ref):
            instanceDf           = df[df['inst'] == instanceCount - row_idx][['end', 'cpu_per_s', 'os_cpu']].copy()

            util95               = round(instanceDf.describe(percentiles=[0.95]).loc['95%'][['os_cpu']].values[0])
            instanceDf['util95'] = util95

            fig3a.add_trace(go.Scatter(x=instanceDf['end'], y=instanceDf['util95'], name='95th os_cpu', showlegend=sl, line_width=8, line_color='red'), row=row_idx+1, col=1)

            util95               = round(instanceDf.describe(percentiles=[0.95]).loc['95%'][['cpu_per_s']].values[0])
            instanceDf['util95'] = util95

            fig3a.add_trace(go.Scatter(x=instanceDf['end'], y=instanceDf['util95'], name='95th cpu_per_s', showlegend=sl, line_width=8, line_color='orange'), row=row_idx+1, col=1)

            sl = False

        for idx in range(len(fig3a.layout.annotations)):
            fig3a.layout.annotations[idx].text = fig3a.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig3a.data)):
            if fig3a.data[idx]['hovertemplate'] is None:
                continue

            fig3a.data[idx]['hovertemplate'] = fig3a.data[idx]['hovertemplate'].replace('variable=', '').\
                                                                                replace('=%{x}', 'snap_end=%{x}')

        figs.append({'page' : 3, 'fig' : fig3a})

        if SHOW:
            fig3a.show()
        else:
            lg('   Plotted figure 3a')

    # ---
    #
    # Page 3b
    #

        df=dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].copy()
        df=pd.merge(left=df, right=instancesDf[instancesDf['WHICH_DB'] == whichDB], how='left', left_on=['inst'], right_on=['INSTANCE'])
        df.sort_values(['inst', 'end'], inplace=True)

        df['os_cpu'] = (df['os_cpu'] / 100) * df['NUM_CPUS']

        fig3b=px.line(df, x='end', y=['os_cpu', 'cpu_per_s'], facet_row='inst'
                     ,title='OS & Database Utilization in Threads - ' + suffix + '<br>Figure 3b'
                     ,labels={'value' : 'Threads', 'end' : ''}
                     ,height=HEIGHT, width=WIDTH, template=TEMPLATE)
        fig3b.update_layout(font={'size' : 16})
        fig3b.update_traces(mode='lines')

        instanceCount = len(fig3b._grid_ref)
#
#   Row 1 is the bottom-most i.e. highest instance number
#
        sl = True

        for row_idx, row_figs in enumerate(fig3b._grid_ref):
            instanceDf            = df[df['inst'] == instanceCount - row_idx][['end', 'cpu_per_s', 'os_cpu']].copy()

            cores95               = round(instanceDf.describe(percentiles=[0.95]).loc['95%'][['os_cpu']].values[0], 2)
            instanceDf['cores95'] = cores95

            fig3b.add_trace(go.Scatter(x=instanceDf['end'], y=instanceDf['cores95'], name='95th os_cpu', showlegend=sl, line_width=8, line_color='red'), row=row_idx+1, col=1)

            cores95               = round(instanceDf.describe(percentiles=[0.95]).loc['95%'][['cpu_per_s']].values[0], 2)
            instanceDf['cores95'] = cores95

            fig3b.add_trace(go.Scatter(x=instanceDf['end'], y=instanceDf['cores95'], name='95th cpu_per_s', showlegend=sl, line_width=8, line_color='orange'), row=row_idx+1, col=1)

            sl = False

        for idx in range(len(fig3b.layout.annotations)):
            fig3b.layout.annotations[idx].text = fig3b.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig3b.data)):
            if fig3b.data[idx]['hovertemplate'] is None:
                continue

            fig3b.data[idx]['hovertemplate'] = fig3b.data[idx]['hovertemplate'].replace('variable=', '').\
                                                                                replace('=%{x}', 'snap_end=%{x}')

        figs.append({'page' : 3.1, 'fig' : fig3b})

        if SHOW:
            fig3b.show()
        else:
            lg('   Plotted figure 3b')

    # ------------------------------------------------------------------------------------------------------------------
    #
    # Figure 4
    #

    if 'MAIN-METRICS' in dataDf and len(dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB]) > 0:
        gbDf=dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].groupby(['snap', 'end'], as_index=False).sum()
        gbDf=pd.melt(gbDf[['end', 'read_iops', 'read_iops_max', 'read_mb_s', 'read_mb_s_max', 'write_iops', 'write_iops_max', 'write_mb_s', 'write_mb_s_max']], id_vars='end')

        gbDf['facet'] = 'Write MB / S'

        gbDf.loc[gbDf['variable'].isin(['read_iops',  'read_iops_max']),  'facet'] = 'Read IOPs'
        gbDf.loc[gbDf['variable'].isin(['read_mb_s',  'read_mb_s_max']),  'facet'] = 'Read MB / S'
        gbDf.loc[gbDf['variable'].isin(['write_iops', 'write_iops_max']), 'facet'] = 'Write IOPs'

        gbDf.loc[gbDf['variable'].str.find('max') > -1, 'variable'] = 'Max'
        gbDf.loc[gbDf['variable'] != 'Max',             'variable'] = 'Avg'

        gbDf.sort_values(['facet', 'end'], inplace=True)

        fig4=px.line(gbDf, x='end', y='value', color='variable', facet_row='facet'
                    ,title='IO Avg and Max IO Type - ' + suffix + '<br>Figure 4'
                    ,labels={'value' : '', 'end' : ''}
                    ,height=HEIGHT, width=WIDTH, template=TEMPLATE)
        fig4.update_layout(font={'size' : 16})
        fig4.update_traces(mode='lines')
        fig4.update_yaxes(matches=None, showticklabels=True)

        for idx in range(len(fig4.layout.annotations)):
            fig4.layout.annotations[idx].text = fig4.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig4.data)):
            fig4.data[idx]['line']['color'] = ('coral' if fig4.data[idx]['legendgroup'].find('Max') > -1 else 'navy')
            fig4.data[idx]['hovertemplate'] = fig4.data[idx]['hovertemplate'].replace('variable=', '').\
                                                                              replace('facet=', 'I/O type=').\
                                                                              replace('=%{y}', 'snap_end=%{x}<br>value=%{y}')

        figs.append({'page' : 4, 'fig' : fig4})

        if SHOW:
            fig4.show()
        else:
            lg('   Plotted figure 4')

    # ------------------------------------------------------------------------------------------------------------------
    #
    # Figure 5
    #

    if 'IO-OBJECT-TYPE' in dataDf and len(dataDf['IO-OBJECT-TYPE'][dataDf['IO-OBJECT-TYPE']['WHICH_DB'] == whichDB]) > 0:
        gbDf=dataDf['IO-OBJECT-TYPE'][dataDf['IO-OBJECT-TYPE']['WHICH_DB'] == whichDB].groupby(['OBJECT_TYPE'], as_index=False)[['LOGICAL_READ_GB', 'PHYSICAL_READ_GB', 'PHYSICAL_WRITE_GB', 'GB_ADDED']].sum()
        gbDf=pd.melt(gbDf, id_vars='OBJECT_TYPE')
        gbDf['total']=gbDf.groupby('variable')['value'].transform('sum')
        gbDf['value']=round((gbDf['value'] / gbDf['total']) * 100)

        gbDf.loc[gbDf['variable'] == 'GB_ADDED',          'variable'] = 'Data Growth'
        gbDf.loc[gbDf['variable'] == 'LOGICAL_READ_GB',   'variable'] = 'Logical Reads'
        gbDf.loc[gbDf['variable'] == 'PHYSICAL_READ_GB',  'variable'] = 'Physical Reads'
        gbDf.loc[gbDf['variable'] == 'PHYSICAL_WRITE_GB', 'variable'] = 'Physical Writes'
        gbDf.sort_values(['variable'], inplace=True)

        fig5a=px.bar(gbDf, x='OBJECT_TYPE', y='value', facet_col='variable', color='OBJECT_TYPE'
                    ,title='Segment Activity Percent - ' + suffix + '<br>Figure 5a'
                    ,labels={'value' : '% of TOTAL(WAIT_COUNT)'}
                    ,height=HEIGHT * 0.33, width=WIDTH, template=TEMPLATE)
        fig5a.update_layout(font={'size' : 16})

        for idx in range(len(fig5a.layout.annotations)):
            fig5a.layout.annotations[idx].text = fig5a.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig5a.data)):
            fig5a.data[idx].text = fig5a.data[idx]['y'][0]

            if fig5a.data[idx]['legendgroup'] not in OBJECT_TYPE_COLORS:
                OBJECT_TYPE_COLORS[fig5a.data[idx]['legendgroup']] = 'gold'

            fig5a.data[idx]['marker']['color'] = OBJECT_TYPE_COLORS[fig5a.data[idx]['legendgroup']]
            fig5a.data[idx]['hovertemplate']   = fig5a.data[idx]['hovertemplate'].replace('OBJECT_TYPE=', 'object_type=').replace('variable=', 'activity_type=')

        figs.append({'page' : 5, 'fig' : fig5a})

        if SHOW:
            fig5a.show()
        else:
            lg('   Plotted figure 5a')

    # ---
    #
    # Page 5b
    #

    if 'IO-OBJECT-TYPE' in dataDf and len(dataDf['IO-OBJECT-TYPE'][dataDf['IO-OBJECT-TYPE']['WHICH_DB'] == whichDB]) > 0:
        if len(snapDf) == 0 or len(snapDf[snapDf['WHICH_DB'] == whichDB]) == 0:
            df        = dataDf['IO-OBJECT-TYPE'][dataDf['IO-OBJECT-TYPE']['WHICH_DB'] == whichDB].copy()
            df['end'] = df['SNAP_ID']

        else:
            df        = pd.merge(left=dataDf['IO-OBJECT-TYPE'][dataDf['IO-OBJECT-TYPE']['WHICH_DB'] == whichDB]
                                ,right=snapDf[snapDf['WHICH_DB'] == whichDB], how='left', left_on=['SNAP_ID'], right_on=['snap'])

        gbDf=df.groupby(['end', 'OBJECT_TYPE'], as_index=False).sum()
        gbDf=pd.melt(gbDf[['end', 'OBJECT_TYPE', 'GB_ADDED', 'LOGICAL_READ_GB', 'PHYSICAL_READ_GB', 'PHYSICAL_WRITE_GB']], id_vars=['end', 'OBJECT_TYPE'])
        gbDf.loc[gbDf['variable'] == 'GB_ADDED',          'variable'] = 'GB Added'
        gbDf.loc[gbDf['variable'] == 'LOGICAL_READ_GB',   'variable'] = 'Logical Reads GB'
        gbDf.loc[gbDf['variable'] == 'PHYSICAL_READ_GB',  'variable'] = 'Physical Reads GB'
        gbDf.loc[gbDf['variable'] == 'PHYSICAL_WRITE_GB', 'variable'] = 'Physical Writes GB'
        gbDf.sort_values(['variable', 'end'], inplace=True)

        fig5b=px.line(gbDf, x='end', y='value', color='OBJECT_TYPE', facet_row='variable'
                     ,title='Segment Activity - ' + suffix + '<br>Figure 5b'
                     ,labels={'end' : ''}
                     ,height=HEIGHT * 0.67, width=WIDTH, template=TEMPLATE)
        fig5b.update_layout(font={'size' : 16})
        fig5b.update_traces(mode='lines')
        fig5b.update_yaxes(matches=None, showticklabels=True)

        for idx in range(len(fig5b.layout.annotations)):
            fig5b.layout.annotations[idx].text = fig5b.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig5b.data)):
            if fig5b.data[idx]['legendgroup'] not in OBJECT_TYPE_COLORS:
                OBJECT_TYPE_COLORS[fig5b.data[idx]['legendgroup']] = 'gold'

            fig5b.data[idx]['line']['color'] = OBJECT_TYPE_COLORS[fig5b.data[idx]['legendgroup']]
            fig5b.data[idx]['hovertemplate'] = fig5b.data[idx]['hovertemplate'].replace('OBJECT_TYPE=', 'object_type=').\
                                                                                replace('variable=',    'activity_type=').\
                                                                                replace('=%{x}',        'snap_end=%{x}')

        figs.append({'page' : 5, 'fig' : fig5b})

        if SHOW:
            fig5b.show()
        else:
            lg('   Plotted figure 5b')

    # ------------------------------------------------------------------------------------------------------------------
    # Figure 6
    #

    if 'IOSTAT-BY-FUNCTION' in dataDf and len(dataDf['IOSTAT-BY-FUNCTION'][dataDf['IOSTAT-BY-FUNCTION']['WHICH_DB'] == whichDB]) > 0 and len(snapDf) > 0 and len(snapDf[snapDf['WHICH_DB'] == whichDB]) > 0:
        gbDf=dataDf['IOSTAT-BY-FUNCTION'][dataDf['IOSTAT-BY-FUNCTION']['WHICH_DB'] == whichDB].groupby(['SNAP_ID', 'FUNCTION_NAME'], as_index=False)[['SM_R_REQS', 'SM_W_REQS', 'LG_R_REQS', 'LG_W_REQS']].sum()
        gbDf=pd.melt(gbDf, id_vars=['SNAP_ID', 'FUNCTION_NAME'])
        gbDf=pd.merge(left=gbDf, right=snapDf[snapDf['WHICH_DB'] == whichDB], how='left', left_on=['SNAP_ID'], right_on=['snap'])

        gbDf.loc[gbDf['variable'] == 'LG_R_REQS', 'variable'] = 'Large Read IOPs'
        gbDf.loc[gbDf['variable'] == 'LG_W_REQS', 'variable'] = 'Large Write IOPs'
        gbDf.loc[gbDf['variable'] == 'SM_R_REQS', 'variable'] = 'Small Read IOPs'
        gbDf.loc[gbDf['variable'] == 'SM_W_REQS', 'variable'] = 'Small Write IOPs'
        gbDf['value'] = gbDf['value'] / (gbDf['dur_m'] * 60)

        gbDf.sort_values(['variable', 'end', 'FUNCTION_NAME'], inplace=True)

        #filename=AWR_MINER_PATH + os.sep + 'awr_miner_plots' + os.sep + ts + os.sep + 'csv' + os.sep + 'gbdf_' + ts + '.csv'
        #gbDf.to_csv(filename, index=False)

        fig6=px.area(gbDf, x='end', y='value', color='FUNCTION_NAME', facet_row='variable'
                    ,title='I/O Requests by Size by Function - ' + suffix + '<br>Figure 6'
                    ,labels={'end': ''}
                    ,height=HEIGHT, width=WIDTH, template=TEMPLATE)
        fig6.update_layout(font={'size' : 16})
        fig6.update_yaxes(matches=None, showticklabels=True)

        for idx in range(len(fig6.layout.annotations)):
            fig6.layout.annotations[idx].text = fig6.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig6.data)):
            fig6.data[idx]['hovertemplate'] = fig6.data[idx]['hovertemplate'].replace('FUNCTION_NAME=', 'function_name=').\
                                                                              replace('variable=',      'I/O type=').\
                                                                              replace('=%{x}',          'snap_end=%{x}')
        figs.append({'page' : 6, 'fig' : fig6})

        if SHOW:
            fig6.show()
        else:
            lg('   Plotted figure 6')

    # ------------------------------------------------------------------------------------------------------------------
    #
    # Figure 7
    #
    # The following logic is needed because not all of the events are sampled at the same frequency
    # i.e. the pivot logic below ensures we do not plot areas when values are missing
    #

    if 'IO-WAIT-HISTOGRAM' in dataDf and len(dataDf['IO-WAIT-HISTOGRAM'][dataDf['IO-WAIT-HISTOGRAM']['WHICH_DB'] == whichDB]) > 0:
        df=dataDf['IO-WAIT-HISTOGRAM'][dataDf['IO-WAIT-HISTOGRAM']['WHICH_DB'] == whichDB].copy()
        df.loc[df['WAIT_TIME_MILLI'] > 64, 'WAIT_TIME_MILLI'] = 64

        gbDf=df.groupby(['EVENT_NAME', 'WAIT_TIME_MILLI'], as_index=False)[['WAIT_COUNT']].sum()
        gbDf['total']      = gbDf.groupby('EVENT_NAME')['WAIT_COUNT'].transform('sum')
        gbDf['WAIT_COUNT'] = round((gbDf['WAIT_COUNT'] / gbDf['total']) * 100)

        waitTimesGT0 = gbDf[gbDf['WAIT_COUNT'] > 0]['WAIT_TIME_MILLI'].unique()
        gbDf = gbDf[gbDf['WAIT_TIME_MILLI'].isin(waitTimesGT0)]

        gbDf.loc[gbDf['WAIT_TIME_MILLI'] > 64, 'WAIT_TIME_MILLI'] = 64

        gbDf.sort_values(['WAIT_TIME_MILLI', 'EVENT_NAME'], inplace=True)
        gbDf['WAIT_TIME_MILLI'] = gbDf['WAIT_TIME_MILLI'].astype(str)

        gbDf.loc[gbDf['WAIT_TIME_MILLI'] == '64',   'WAIT_TIME_MILLI'] = '64+'
        gbDf.loc[gbDf['WAIT_TIME_MILLI'] == '64.0', 'WAIT_TIME_MILLI'] = '64.0+'

        fig7a=px.bar(gbDf, x='WAIT_TIME_MILLI', y='WAIT_COUNT', facet_col='EVENT_NAME', color='WAIT_TIME_MILLI'
                    ,title='I/O Wait Event Histogram - ' + suffix + '<br>Figure 7a'
                    ,labels={'WAIT_COUNT' : '% of Total(WAIT_COUNT)'}
                    ,height=HEIGHT * 0.33, width=WIDTH, template=TEMPLATE)
        fig7a.update_layout(font={'size' : 16})

        for idx in range(len(fig7a.layout.annotations)):
            fig7a.layout.annotations[idx].text = fig7a.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig7a.data)):
            fig7a.data[idx].text             = fig7a.data[idx]['y']
            fig7a.data[idx]['hovertemplate'] = fig7a.data[idx]['hovertemplate'].replace('WAIT_TIME_MILLI=', 'wait_time_milli=').\
                                                                                replace('EVENT_NAME=',      'event_name=')

        figs.append({'page' : 7, 'fig' : fig7a})

        if SHOW:
            fig7a.show()
        else:
            lg('   Plotted figure 7a')

    # ---
    #
    # Page 7b
    #

    if 'IO-WAIT-HISTOGRAM' in dataDf and len(dataDf['IO-WAIT-HISTOGRAM'][dataDf['IO-WAIT-HISTOGRAM']['WHICH_DB'] == whichDB]) > 0:
        if len(snapDf) == 0 or len(snapDf[snapDf['WHICH_DB'] == whichDB]) == 0:
            df        = dataDf['IO-WAIT-HISTOGRAM'][dataDf['IO-WAIT-HISTOGRAM']['WHICH_DB'] == whichDB].copy()
            df['end'] = df['SNAP_ID']
            df.sort_values(['end'], inplace=True)

        else:
            df        = pd.merge(left=dataDf['IO-WAIT-HISTOGRAM'][dataDf['IO-WAIT-HISTOGRAM']['WHICH_DB'] == whichDB]
                                ,right=snapDf[snapDf['WHICH_DB'] == whichDB], how='left', left_on=['SNAP_ID'], right_on=['snap'])

        df = df[df['WAIT_TIME_MILLI'].isin(waitTimesGT0)]

        df.loc[df['WAIT_TIME_MILLI']  > 64,   'WAIT_TIME_MILLI'] = 64
        df['WAIT_TIME_MILLI'] = df['WAIT_TIME_MILLI'].astype(str)
        df['WAIT_TIME_MILLI'] = df['WAIT_TIME_MILLI'].str.rjust(5)

        df=pd.pivot_table(df, index='end', columns=['EVENT_NAME', 'WAIT_TIME_MILLI'], values='WAIT_COUNT').fillna(0)
        df.columns = [' '.join(col).strip() for col in df.columns.values]
        df=pd.melt(df.reset_index(), id_vars='end')
        df[['EVENT_NAME', 'WAIT_TIME_MILLI']] = df.apply(parseForFigure7, axis=1, result_type="expand")
        df['WAIT_TIME_MILLI'] = df['WAIT_TIME_MILLI'].astype(float)
        df.sort_values(['WAIT_TIME_MILLI', 'EVENT_NAME', 'end'], inplace=True)

        df['WAIT_TIME_MILLI'] = df['WAIT_TIME_MILLI'].astype(str)
        df.loc[df['WAIT_TIME_MILLI'] == '64',   'WAIT_TIME_MILLI'] = '64+'
        df.loc[df['WAIT_TIME_MILLI'] == '64.0', 'WAIT_TIME_MILLI'] = '64.0+'

        fig7b=px.area(df, x='end', y='value', color='WAIT_TIME_MILLI', facet_row='EVENT_NAME'
                     ,title='I/O Wait Event Area Chart - ' + suffix + '<br>Figure 7b'
                     ,labels={'value' : 'Wait Count', 'end' : ''}
                     ,height=HEIGHT * 0.67, width=WIDTH, template=TEMPLATE)
        fig7b.update_layout(font={'size' : 16})
        fig7b.update_yaxes(matches=None, showticklabels=True)

        domainX  = fig7b.layout.xaxis.domain[1]
        maximumY = fig7b.layout.annotations[len(fig7b.layout.annotations) - 1]['y']

        for idx in range(len(fig7b.layout.annotations)):
            fig7b.layout.annotations[idx].text = fig7b.layout.annotations[idx].text.split('=')[1]
            #
            #The following code plots the labels horizontally
            #
            #fig7b.layout.annotations[idx].textangle=0
            #fig7b.layout.annotations[idx].x=0
            #fig7b.layout.annotations[idx].y=fig7b.layout.annotations[idx].y + ((domainX - maximumY))
            #fig7b.layout.annotations[idx].xanchor= "left"

            if idx % 2 == 1:
                fig7b.layout.annotations[idx].x *= 1.020

        for idx in range(len(fig7b.data)):
            fig7b.data[idx]['hovertemplate'] = fig7b.data[idx]['hovertemplate'].replace('WAIT_TIME_MILLI=', 'wait_time_milli=').\
                                                                                replace('EVENT_NAME=',      'event_name=').\
                                                                                replace('=%{x}',            'snap_end=%{x}')

        figs.append({'page' : 7, 'fig' : fig7b})

        if SHOW:
            fig7b.show()
        else:
            lg('   Plotted figure 7b')

    # ------------------------------------------------------------------------------------------------------------------
    #
    # Figure 8
    #

    if 'AVERAGE-ACTIVE-SESSIONS' in dataDf and len(dataDf['AVERAGE-ACTIVE-SESSIONS'][dataDf['AVERAGE-ACTIVE-SESSIONS']['WHICH_DB'] == whichDB]) > 0 and len(snapDf) > 0 and len(snapDf[snapDf['WHICH_DB'] == whichDB]) > 0:
        df=pd.merge(left=dataDf['AVERAGE-ACTIVE-SESSIONS'][dataDf['AVERAGE-ACTIVE-SESSIONS']['WHICH_DB'] == whichDB]
                   ,right=snapDf[snapDf['WHICH_DB'] == whichDB], how='left', left_on=['SNAP_ID'], right_on=['snap'])

        df['label'] = 'night [8pm-8am)'
        df.loc[(df['end'].dt.hour >= 8) & (df['end'].dt.hour < 20), 'label'] = 'day [8am-8pm)'

        df['day_of_week'] = df['end'].dt.dayofweek
        df['day_name']    = df['end'].dt.day_name()
        df['hour']        = df['end'].dt.hour

        df.loc[(df['label'] == 'day [8am-8pm)'),                       'hour'] = df['hour'] - 8

        df.loc[(df['label'] == 'night [8pm-8am)') & (df['hour'] < 20), 'hour'] = df['hour'] + 24
        df.loc[(df['label'] == 'night [8pm-8am)'),                     'hour'] = df['hour'] - 20

        df = df.groupby(['label', 'day_of_week', 'day_name', 'hour', 'WAIT_CLASS'], as_index=False)['AVG_SESS'].mean()
        #
        #       Force CPU to appear on the bottom of the chart
        #
        df.loc[df['WAIT_CLASS'] == 'CPU', 'WAIT_CLASS'] = '0CPU'
        df.sort_values(['label', 'day_of_week', 'hour', 'WAIT_CLASS'], inplace=True)
        df.loc[df['WAIT_CLASS'] == '0CPU', 'WAIT_CLASS'] = 'CPU'

        fig8 = px.bar(df, x='hour', y='AVG_SESS', color='WAIT_CLASS', facet_col='day_name', facet_row='label'
                     ,title='Average Active Sessions (AAS) by Day by Hour - ' + suffix + '<br>Figure 8'
                     ,labels={'AVG_SESS' : 'AAS'}
                     ,height=HEIGHT, width=WIDTH, template=TEMPLATE)
        fig8.update_layout(font={'size' : 16})

        for idx in range(len(fig8.layout.annotations)):
            fig8.layout.annotations[idx].text = fig8.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig8.data)):
            if fig8.data[idx]['legendgroup'] not in WAIT_CLASS_COLORS:
                WAIT_CLASS_COLORS[fig8.data[idx]['legendgroup']] = 'gold'

            fig8.data[idx]['marker']['color'] = WAIT_CLASS_COLORS[fig8.data[idx]['legendgroup']]
            fig8.data[idx]['hovertemplate']   = fig8.data[idx]['hovertemplate'].replace('WAIT_CLASS=', 'wait_class=').\
                                                                                replace('label=',      'hour_range=').\
                                                                                replace('day_name=',   'day=')

        figs.append({'page' : 8, 'fig' : fig8})

        if SHOW:
            fig8.show()
        else:
            lg('   Plotted figure 8')

    # ----------------------------------------------------------------------------------------------------------------------
    #
    # Figure 9
    #

    if 'MAIN-METRICS' in dataDf and len(dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB]) > 0:
        gbDf=dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].groupby(['snap', 'end'], as_index=False).sum()
        gbDf=pd.melt(gbDf[['end', 'commits_s', 'exec_s', 'hard_p_s', 'logons_total', 'logons_s', 'redo_mb_s', 'sql_res_t_cs']], id_vars='end')

        gbDf.loc[gbDf['variable'] == 'commits_s',    'variable'] = 'Commits / S'
        gbDf.loc[gbDf['variable'] == 'exec_s',       'variable'] = 'Execs / S'
        gbDf.loc[gbDf['variable'] == 'hard_p_s',     'variable'] = 'Hard Parses / S'
        gbDf.loc[gbDf['variable'] == 'logons_total', 'variable'] = 'Logons Total'
        gbDf.loc[gbDf['variable'] == 'logons_s',     'variable'] = 'Logons / S'
        gbDf.loc[gbDf['variable'] == 'redo_mb_s',    'variable'] = 'Redo MB / S'
        gbDf.loc[gbDf['variable'] == 'sql_res_t_cs', 'variable'] = 'SQL Resp (cs)'

        gbDf.sort_values(['variable', 'end'], inplace=True)

        fig9=px.line(gbDf, x='end', y='value', facet_row='variable'
                    ,title='Main Activity Variable - ' + suffix + '<br>Figure 9'
                    ,labels={'end': ''}
                    ,height=HEIGHT, width=WIDTH, template=TEMPLATE)
        fig9.update_layout(font={'size' : 16})
        fig9.update_traces(mode='lines')
        fig9.update_yaxes(matches=None, showticklabels=True)

        for idx in range(len(fig9.layout.annotations)):
            fig9.layout.annotations[idx].text = fig9.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig9.data)):
            fig9.data[idx]['hovertemplate'] = fig9.data[idx]['hovertemplate'].replace('variable=', 'activity_type=').\
                                                                              replace('=%{x}',     'snap_end=%{x}')

        figs.append({'page' : 9, 'fig' : fig9})

        if SHOW:
            fig9.show()
        else:
            lg('   Plotted figure 9')

    # ------------------------------------------------------------------------------------------------------------------
    #
    # Figure 10
    #

    if 'MEMORY' in dataDf and len(dataDf['MEMORY'][dataDf['MEMORY']['WHICH_DB'] == whichDB]) > 0:
        if len(snapDf) == 0 or len(snapDf[snapDf['WHICH_DB'] == whichDB]) == 0:
            df        = dataDf['MEMORY'][dataDf['MEMORY']['WHICH_DB'] == whichDB].copy()
            df['end'] = df['SNAP_ID']
            df.sort_values(['end'], inplace=True)

        else:
            df        = pd.merge(left=dataDf['MEMORY'][dataDf['MEMORY']['WHICH_DB'] == whichDB]
                                ,right=snapDf[snapDf['WHICH_DB'] == whichDB], how='left', left_on=['SNAP_ID'], right_on=['snap'])
            df.sort_values(['end'], inplace=True)

        fig10=px.area(df, x='end', y='TOTAL', facet_row='INSTANCE_NUMBER'
                     ,title='Total Memory Used in GB - ' + suffix + '<br>Figure 10'
                     ,labels={'TOTAL' : 'GB', 'end' : ''}
                     ,height=HEIGHT, width=WIDTH, template=TEMPLATE)
        fig10.update_layout(font={'size' : 16})

        instanceCount = len(fig10._grid_ref)
        #
        #   Row 1 is the bottom-most i.e. highest instance number
        #
        sl=True

        for row_idx, row_figs in enumerate(fig10._grid_ref):
            instanceDf = df[df['INSTANCE_NUMBER'] == instanceCount - row_idx]

            fig10.add_trace(go.Scatter(x=instanceDf['end'], y=instanceDf['SGA'], name='SGA', showlegend=sl, line_width=8, line_color='red'),   row=row_idx+1, col=1)
            fig10.add_trace(go.Scatter(x=instanceDf['end'], y=instanceDf['PGA'], name='PGA', showlegend=sl, line_width=8, line_color='green'), row=row_idx+1, col=1)

            sl=False

        for idx in range(len(fig10.layout.annotations)):
            fig10.layout.annotations[idx].text = fig10.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig10.data)):
            if fig10.data[idx]['hovertemplate'] is None:
                continue

            fig10.data[idx]['hovertemplate'] = fig10.data[idx]['hovertemplate'].replace('INSTANCE_NUMBER=', 'inst=').\
                                                                                replace('=%{x}',            'snap_end=%{x}')

        figs.append({'page' : 10, 'fig' : fig10})

        if SHOW:
            fig10.show()
        else:
            lg('   Plotted figure 10')

    # ------------------------------------------------------------------------------------------------------------------
    #
    # Figure 11
    #

    if 'MEMORY-SGA-ADVICE' in dataDf and len(dataDf['MEMORY-SGA-ADVICE'][dataDf['MEMORY-SGA-ADVICE']['WHICH_DB'] == whichDB]) > 0:
#
#       Use maximum snap id's estimates -- they are based on the longest observation period
#
        df                = dataDf['MEMORY-SGA-ADVICE'][dataDf['MEMORY-SGA-ADVICE']['WHICH_DB'] == whichDB].copy()
        df['SNAP_ID_MAX'] = df.groupby(['INSTANCE_NUMBER'], as_index=False)['SNAP_ID'].transform('max')
        df                = df[df['SNAP_ID'] == df['SNAP_ID_MAX']]

        baseDf            = df[df['SIZE_FACTOR'] == 1].copy()
        baseDf.rename(columns={'ESTD_PHYSICAL_READS' : 'BASELINE_PHYSICAL_READS'}, inplace=True)

        df                = pd.merge(left=df, right=baseDf[['INSTANCE_NUMBER', 'BASELINE_PHYSICAL_READS']], how='left', left_on=['INSTANCE_NUMBER'], right_on=['INSTANCE_NUMBER'])
        df['pct']         = ((df['ESTD_PHYSICAL_READS'] / df['BASELINE_PHYSICAL_READS']) - 1) * 100

        df['pct'] = round(df['pct'], 2)
        df.loc[df['pct'] > 200, 'pct'] = 200

        df['color']                    = 'red'
        df.loc[df['pct'] < 0, 'color'] = 'green'

        df.loc[abs(df['pct']) <= 1, 'pct'] = 0

        df.sort_values(['INSTANCE_NUMBER', 'SGA_TARGET_GB'], inplace=True)

        fig11a=px.bar(df, x='SGA_TARGET_GB', y='pct', color='color', facet_row='INSTANCE_NUMBER'
                     ,title='Average Percent Change in Pysical Reads<br>Relative to SGA_TARGET from SGA Target Advisor - ' + suffix + '<br>(Values >= 200% are Set to 200%, Negative is Better), Figure 11a'
                     ,labels={'pct' : '%'}
                     ,height=HEIGHT / 2, width=WIDTH, template=TEMPLATE)
        fig11a.update_layout(font={'size': 16})
        fig11a.update_xaxes(matches=None, showticklabels=True, type='category')
        fig11a.update_yaxes(matches=None, showticklabels=True)
        fig11a.update(layout_showlegend=False)

        for idx in range(len(fig11a.layout.annotations)):
            fig11a.layout.annotations[idx].text = fig11a.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig11a.data)):
            fig11a.data[idx].text               = fig11a.data[idx]['y']
            fig11a.data[idx]['marker']['color'] = fig11a.data[idx]['name']
            fig11a.data[idx]['hovertemplate']   = fig11a.data[idx]['hovertemplate'].replace('INSTANCE_NUMBER=', 'inst=').replace('SGA_TARGET_GB=', 'sga_target_gb=')

        figs.append({'page' : 11, 'fig' : fig11a})

        if SHOW:
            fig11a.show()
        else:
            lg('   Plotted figure 11a')

    # ---
    #
    # Page 11b
    #

    if 'MEMORY-PGA-ADVICE' in dataDf and len(dataDf['MEMORY-PGA-ADVICE'][dataDf['MEMORY-PGA-ADVICE']['WHICH_DB'] == whichDB]) > 0:
#
#       Use maximum snap id's estimates -- they are based on the longest observation period
#
        df                = dataDf['MEMORY-PGA-ADVICE'][dataDf['MEMORY-PGA-ADVICE']['WHICH_DB'] == whichDB].copy()
        df['SNAP_ID_MAX'] = df.groupby(['INSTANCE_NUMBER'], as_index=False)['SNAP_ID'].transform('max')
        df                = df[df['SNAP_ID'] == df['SNAP_ID_MAX']]

        baseDf            = df[df['SIZE_FACTOR'] == 1].copy()
        baseDf.rename(columns={'ESTD_EXTRA_MB_RW' : 'BASELINE_EXTRA_MB_RW'}, inplace=True)

        df                = pd.merge(left=df, right=baseDf[['INSTANCE_NUMBER', 'BASELINE_EXTRA_MB_RW']], how='left', left_on=['INSTANCE_NUMBER'], right_on=['INSTANCE_NUMBER'])
        df['pct']         = ((df['ESTD_EXTRA_MB_RW'] / df['BASELINE_EXTRA_MB_RW']) - 1) * 100

        df['pct'] = round(df['pct'], 2)
        df.loc[df['pct'] > 200, 'pct'] = 200

        df['color']                    = 'red'
        df.loc[df['pct'] < 0, 'color'] = 'green'

        df.loc[abs(df['pct']) <= 1, 'pct'] = 0

        df.sort_values(['INSTANCE_NUMBER', 'PGA_TARGET_GB'], inplace=True)

        fig11b=px.bar(df, x='PGA_TARGET_GB', y='pct', color='color', facet_row='INSTANCE_NUMBER'
                     ,title='Average Percent Change in W/A MB Read/Written to Disk<br>Relative to PGA_AGGREGATE_TARGET from PGA Target Advisor - ' + suffix + '<br>(Values >= 200% are Set to 200%, Negative is Better), Figure 11b'
                     ,labels={'pct': '%'}
                     ,height=HEIGHT / 2, width=WIDTH, template=TEMPLATE)
        fig11b.update_layout(font={'size': 16})
        fig11b.update_xaxes(matches=None, showticklabels=True, type='category')
        fig11b.update_yaxes(matches=None, showticklabels=True)
        fig11b.update(layout_showlegend=False)

        for idx in range(len(fig11b.layout.annotations)):
            fig11b.layout.annotations[idx].text = fig11b.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig11b.data)):
            fig11b.data[idx].text               = fig11b.data[idx]['y']
            fig11b.data[idx]['marker']['color'] = fig11b.data[idx]['name']
            fig11b.data[idx]['hovertemplate']   = fig11b.data[idx]['hovertemplate'].replace('INSTANCE_NUMBER=', 'inst=').replace('PGA_TARGET_GB=', 'pga_target_gb=')

        figs.append({'page' : 11, 'fig' : fig11b})

        if SHOW:
            fig11b.show()
        else:
            lg('   Plotted figure 11b')

    # ------------------------------------------------------------------------------------------------------------------
    #
    # Figure 12
    #

    if 'TOP-SQL-BY-SNAPID' in dataDf and len(dataDf['TOP-SQL-BY-SNAPID'][dataDf['TOP-SQL-BY-SNAPID']['WHICH_DB'] == whichDB]) > 0:
        gbDf = dataDf['TOP-SQL-BY-SNAPID'][dataDf['TOP-SQL-BY-SNAPID']['WHICH_DB'] == whichDB].copy()
        gbDf = gbDf[gbDf['ELAP_S'] > 0]
        gbDf.loc[gbDf['EXECS'] == 0, 'EXECS'] = 0.1 # From Tyler's original code: #modify execs from 0 to 0.1 if work was done but not completed
        gbDf = gbDf.groupby(['COMMAND_NAME'], as_index=False).sum()

        gbDf['ELAP_S_PER_EXEC'] = gbDf['ELAP_S'] / gbDf['EXECS']

        gbDf=pd.melt(gbDf[['COMMAND_NAME', 'EXECS', 'ELAP_S', 'IO_WAIT', 'CPU_T_S', 'ELAP_S_PER_EXEC']], id_vars='COMMAND_NAME')
        gbDf['total'] = gbDf.groupby('variable')['value'].transform('sum')
        gbDf['value'] = round((gbDf['value'] / gbDf['total']) * 100, 1)

        gbDf.loc[gbDf['variable'] == 'EXECS',           'variable'] = 'Executions'
        gbDf.loc[gbDf['variable'] == 'ELAP_S',          'variable'] = 'Elapsed Time (S)'
        gbDf.loc[gbDf['variable'] == 'IO_WAIT',         'variable'] = 'IO Wait'
        gbDf.loc[gbDf['variable'] == 'CPU_T_S',         'variable'] = 'CPU Time (S)'
        gbDf.loc[gbDf['variable'] == 'ELAP_S_PER_EXEC', 'variable'] = 'Elapsed (S) / Execution'

        fig12a=px.bar(gbDf, x='COMMAND_NAME', y='value', facet_row='variable', color='COMMAND_NAME'
                     ,title='SQL Percent by Command by Metric (All Schema) - ' + suffix + '<br>Figure 12a'
                     ,labels={'value': '%'}
                     ,height=HEIGHT / 2, width=WIDTH, template=TEMPLATE)
        fig12a.update_layout(font={'size': 16})

        for idx in range(len(fig12a.layout.annotations)):
            fig12a.layout.annotations[idx].text = fig12a.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig12a.data)):
            fig12a.data[idx].text             = fig12a.data[idx]['y']
            fig12a.data[idx]['hovertemplate'] = fig12a.data[idx]['hovertemplate'].replace('COMMAND_NAME=', 'command_name=').replace('variable=', 'metric=')

        figs.append({'page' : 12, 'fig' : fig12a})

        if SHOW:
            fig12a.show()
        else:
            lg('   Plotted figure 12a')

    # ---
    #
    # Page 12b
    #

    if 'TOP-SQL-BY-SNAPID' in dataDf and len(dataDf['TOP-SQL-BY-SNAPID'][dataDf['TOP-SQL-BY-SNAPID']['WHICH_DB'] == whichDB]) > 0:
        gbDf         = dataDf['TOP-SQL-BY-SNAPID'][dataDf['TOP-SQL-BY-SNAPID']['WHICH_DB'] == whichDB].groupby(['PARSING_SCHEMA_NAME'], as_index=False)[['ELAP_S']].sum()
        gbDf['rank'] = gbDf['ELAP_S'].rank(method='dense', ascending=False)
        gbDf         = gbDf[gbDf['rank'] <= 10]
        topSchema    = gbDf['PARSING_SCHEMA_NAME'].values

        gbDf = dataDf['TOP-SQL-BY-SNAPID'][(dataDf['TOP-SQL-BY-SNAPID']['WHICH_DB'] == whichDB) & (dataDf['TOP-SQL-BY-SNAPID']['PARSING_SCHEMA_NAME'].isin(topSchema))].copy()
        gbDf = gbDf[gbDf['ELAP_S'] > 0]
        gbDf.loc[gbDf['EXECS'] == 0, 'EXECS'] = 0.1 # From Tyler's original code: #modify execs from 0 to 0.1 if work was done but not completed
        gbDf['ELAP_S_PER_EXEC'] = gbDf['ELAP_S'] / gbDf['EXECS']

        gbDf = gbDf.groupby(['PARSING_SCHEMA_NAME'], as_index=False).sum()

        gbDf=pd.melt(gbDf[['PARSING_SCHEMA_NAME', 'EXECS', 'ELAP_S', 'IO_WAIT', 'CPU_T_S', 'ELAP_S_PER_EXEC']], id_vars='PARSING_SCHEMA_NAME')
        gbDf['total'] = gbDf.groupby('variable')['value'].transform('sum')
        gbDf['value'] = round((gbDf['value'] / gbDf['total']) * 100, 1)

        gbDf.loc[gbDf['variable'] == 'EXECS',           'variable'] = 'Executions'
        gbDf.loc[gbDf['variable'] == 'ELAP_S',          'variable'] = 'Elapsed Time (S)'
        gbDf.loc[gbDf['variable'] == 'IO_WAIT',         'variable'] = 'IO Wait'
        gbDf.loc[gbDf['variable'] == 'CPU_T_S',         'variable'] = 'CPU Time (S)'
        gbDf.loc[gbDf['variable'] == 'ELAP_S_PER_EXEC', 'variable'] = 'Elapsed (S) / Execution'

        fig12b=px.bar(gbDf, x='PARSING_SCHEMA_NAME', y='value', facet_row='variable', color='PARSING_SCHEMA_NAME'
                     ,title='SQL Percent by Schema by Metric (Top 10 Schema by Total Elapsed (S)) - ' + suffix + '<br>Figure 12b'
                     ,labels={'value': '%'}
                     ,height=HEIGHT / 2, width=WIDTH, template=TEMPLATE)
        fig12b.update_layout(font={'size': 16})

        for idx in range(len(fig12b.layout.annotations)):
            fig12b.layout.annotations[idx].text = fig12b.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig12b.data)):
            fig12b.data[idx].text             = fig12b.data[idx]['y']
            fig12b.data[idx]['hovertemplate'] = fig12b.data[idx]['hovertemplate'].replace('PARSING_SCHEMA_NAME=', 'parsing_schema_name=').replace('variable=', 'metric=')

        figs.append({'page' : 12, 'fig' : fig12b})

        if SHOW:
            fig12b.show()
        else:
            lg('   Plotted figure 12b')

    # ------------------------------------------------------------------------------------------------------------------
    #
    # Figure 13
    #

    if 'TOP-SQL-BY-SNAPID' in dataDf and len(dataDf['TOP-SQL-BY-SNAPID'][dataDf['TOP-SQL-BY-SNAPID']['WHICH_DB'] == whichDB]) > 0:
        gbDf         = dataDf['TOP-SQL-BY-SNAPID'][dataDf['TOP-SQL-BY-SNAPID']['WHICH_DB'] == whichDB].groupby(['PARSING_SCHEMA_NAME'], as_index=False)[['ELAP_S']].sum()
        gbDf['rank'] = gbDf['ELAP_S'].rank(method='dense', ascending=False)
        gbDf         = gbDf[gbDf['rank'] <= 10]
        topSchema    = gbDf['PARSING_SCHEMA_NAME'].values

    # ---

        df0 = dataDf['TOP-SQL-BY-SNAPID'][([dataDf['TOP-SQL-BY-SNAPID']['WHICH_DB'] == whichDB]) and (dataDf['TOP-SQL-BY-SNAPID']['PARSING_SCHEMA_NAME'].isin(topSchema))].copy()
        df0 = df0[df0['ELAP_S'] > 0]
        df0.loc[df0['EXECS'] == 0, 'EXECS'] = 0.1  # From Tyler's original code: #modify execs from 0 to 0.1 if work was done but not completed
        df0['ELAP_S_PER_EXEC'] = df0['ELAP_S'] / df0['EXECS']

        df0['bin'] = pd.cut(df0['ELAP_S_PER_EXEC'], bins=[0, 0.1, 0.25, 1, 10, 60, 600, 3600, 21600, float("inf")]
                                                  ,labels=['    0.0  -     0.1'
                                                          ,'    0.1  -     0.25'
                                                          ,'    0.25 -     1.00'
                                                          ,'    1.00 -    10.00'
                                                          ,'   10.00 -    60.00'
                                                          ,'   60.00 -   600.00'
                                                          ,'  600.00 -  3600.00'
                                                          ,' 3600.00 - 21600.00'
                                                          ,'21600.00+'
                                                          ])

        df          = pd.pivot_table(df0, index=['bin'], values='ELAP_S_PER_EXEC', aggfunc='count').fillna(0).reset_index()
        df['total'] = df['ELAP_S_PER_EXEC'].sum()
        df['value'] = round((df['ELAP_S_PER_EXEC'] / df['total']) * 100)

        df.sort_values(['bin'], inplace=True)
        df['bin'] = df['bin'].astype(str)

        fig13a=px.bar(df, x='bin', y='value', color='bin'
                     ,title='Histogram of SQL Elapsed Time (S) per Execution (Top 10 Schema by Total Elapsed (S)) - ' + suffix + '<br>Figure 13a'
                     ,labels={'bin' : 'Bins - Time in Seconds', 'value' : '%'}
                     ,height=HEIGHT * 0.33, width=WIDTH, template=TEMPLATE)
        fig13a.update_layout(font={'size': 16})

        for idx in range(len(fig13a.data)):
            fig13a.data[idx].text = fig13a.data[idx]['y']

        figs.append({'page' : 13, 'fig' : fig13a})

        if SHOW:
            fig13a.show()
        else:
            lg('   Plotted figure 13a')

    # ---
    #
    # Page 13b
    #

    if 'TOP-SQL-BY-SNAPID' in dataDf and len(dataDf['TOP-SQL-BY-SNAPID'][dataDf['TOP-SQL-BY-SNAPID']['WHICH_DB'] == whichDB]) > 0:
        df          = df0.copy()
        df['bin']   = df['bin'].astype(str)
        df          = pd.pivot_table(df, index=['PARSING_SCHEMA_NAME'], columns=['bin'], values='ELAP_S_PER_EXEC', aggfunc='count').fillna(0).reset_index()
        df          = pd.melt(df, id_vars=['PARSING_SCHEMA_NAME'])

        df['total'] = df.groupby(['PARSING_SCHEMA_NAME'])['value'].transform('sum')
        df['value'] = round((df['value'] / df['total']) * 100)

        df.sort_values(['PARSING_SCHEMA_NAME', 'bin'], inplace=True)

        fig13b=px.bar(df, x='bin', y='value', facet_row='PARSING_SCHEMA_NAME', color='bin'
                     ,title='Histogram of SQL Elapsed Time (S) / Execution (Top 10 Schema by Total Elapsed (S)) - ' + suffix + '<br>Figure 13b'
                     ,labels={'bin': 'Bins - Time in Seconds', 'value': '%'}
                     ,height=HEIGHT * 0.67, width=WIDTH, template=TEMPLATE)
        fig13b.update_layout(font={'size': 16})

        for idx in range(len(fig13b.layout.annotations)):
            fig13b.layout.annotations[idx].text = fig13b.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig13b.data)):
            fig13b.data[idx].text             = fig13b.data[idx]['y']
            fig13b.data[idx]['hovertemplate'] = fig13b.data[idx]['hovertemplate'].replace('PARSING_SCHEMA_NAME=', 'parsing_schema_name=').replace('variable=', 'metric=')

        figs.append({'page' : 13, 'fig' : fig13b})

        if SHOW:
            fig13b.show()
        else:
            lg('   Plotted figure 13b')

    # ----------------------------------------------------------------------------------------------------------------------
    #
    # Figure 14
    #

    plotChart=False

    if 'MAIN-METRICS' in dataDf and len(dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB]) > 0:
        df=dataDf['MAIN-METRICS'][dataDf['MAIN-METRICS']['WHICH_DB'] == whichDB].copy()

        cols=['gc_cr_rec_s', 'gc_cu_rec_s', 'gc_cr_get_cs', 'gc_cu_get_cs']
        totals=df[cols].sum().values

        for i in totals:
            if i > 0:
                plotChart=True
                break

    if plotChart:
        gbDf=pd.melt(df[['end', 'inst'] + cols], id_vars=['inst', 'end'])

        gbDf.loc[gbDf['variable'] == 'gc_cr_rec_s',   'variable'] = 'GC CR Block Recs / S '
        gbDf.loc[gbDf['variable'] == 'gc_cu_rec_s',   'variable'] = 'GC Current Block Recs / S'
        gbDf.loc[gbDf['variable'] == 'gc_cr_get_cs',  'variable'] = 'GC Avg CR Gets cs'
        gbDf.loc[gbDf['variable'] == 'gc_cu_get_cs',  'variable'] = 'GC Avg Current Gets cs'

        gbDf.sort_values(['variable', 'end'], inplace=True)

        fig14=px.line(gbDf, x='end', y='value', facet_row='variable', color='inst'
                     ,title='Global Cache Attributes - ' + suffix + '<br>Figure 14'
                     ,labels={'end': ''}
                     ,height=HEIGHT, width=WIDTH, template=TEMPLATE)
        fig14.update_layout(font={'size' : 16})
        fig14.update_traces(mode='lines')
        fig14.update_yaxes(matches=None, showticklabels=True)
        fig14.update_yaxes(rangemode='tozero')

        for idx in range(len(fig14.layout.annotations)):
            fig14.layout.annotations[idx].text = fig14.layout.annotations[idx].text.split('=')[1]

        for idx in range(len(fig14.data)):
            fig14.data[idx]['hovertemplate'] = fig14.data[idx]['hovertemplate'].replace('variable=', 'metric=').\
                                                                                replace('=%{x}',     'snap_end=%{x}')

        figs.append({'page' : 14, 'fig' : fig14})

        if SHOW:
            fig14.show()
        else:
            lg('   Plotted figure 14')

    # ------------------------------------------------------------------------------------------------------------------

    if 1 == 0: # in notwbook
        po.init_notebook_mode()

    filename  = AWR_MINER_PATH + os.sep + 'awr_miner_plots' + os.sep + ts + os.sep + 'html' + os.sep + whichDB + '_' + ts + '.html'

    dashboard = open(filename, 'w')
    dashboard.write('<html><head><title>AWR Miner Plot - ' + suffix + '</title></head><body>' + '\n')

    include_plotlyjs = True
    lastPage         = 0

    for fig in figs:
        if fig['page'] != lastPage:
            dashboard.write('<p style="page-break-before: always"><hr>')
            lastPage = fig['page']

        inner_html = fig['fig'].to_html(include_plotlyjs = include_plotlyjs).split('<body>')[1].split('</body>')[0]
        dashboard.write(inner_html)

        include_plotlyjs = False

    dashboard.write("</body></html>" + "\n")
    dashboard.close()

    lg('Output written to file ' + filename + '\n')

lg('\nTotal running time ' + str(round(time.time() - tb, 3)) + 's')
