__version__   = '1.8'
__notebook__  = 'awr_miner_parse.py'

#
# Version History
#
# 2021-05-06    1.8  tmf     Accomodated Snap Id from older AWR miner captures
# 2021-04-19    1.7  tmf     Accomodated large data set sizes
# 2021-04-17    1.6  tmf     Accomodated more split columns
# 2021-04-15    1.5  tmf     Directory name change
# 2021-04-14    1.4  tmf     Directory name change
# 2021-04-14    1.3  tmf     Re-factored to run over list of files in directory
# 2021-04-10    1.2  tmf     Initial revision

"""
#
# First cell
#
import os

os.environ['AWR_MINER_PATH']='/Users/tfrazier/Pycharm_NetworkTopology/results/cust-working-dir'
os.environ['AWR_MINER_PATH']='/Users/tfrazier/Pycharm_NetworkTopology/sizing/AWR_Miner_Examples/craft.03'

"""

import fnmatch
import numpy as np
import os
import pandas as pd

if 'AWR_MINER_PATH' in os.environ:
    AWR_MINER_PATH=os.environ['AWR_MINER_PATH']
else:
    AWR_MINER_PATH = os.getcwd()

outputPath  = AWR_MINER_PATH + os.sep + 'awr_miner_parsed'

# ----------------------------------------------------------------------------------------------------------------------

def lg(t):
    print(t)

# ----------------------------------------------------------------------------------------------------------------------

def parse(minerFilename):
    global outputPath

    lg('\nParsing file ' + minerFilename)

    filePieces  = minerFilename.split('-')

    if len(filePieces) != 6:
        lg('     ' + minerFilename + ' has ' + str(len(filePieces)) + 'pieces, not 6; cannot continue')
        return

    try:
        DBID = int(filePieces[2])
    except:
        lg('     ' + 'piece 2, ' + filePieces[2] + ' of filename: ' + minerFilename + ' is not a valid integer (DBID); cannot continue')
        return

    DB = filePieces[3]

    try:
        SNAP_ID_START = int(filePieces[4])
    except:
        lg('     ' + 'piece 4, ' + filePieces[4] + ' of filename: ' + minerFilename + ' is not a valid integer (SNAP_ID_START); cannot continue')
        return

    try:
        SNAP_ID_END = int(filePieces[5].replace('.out', ''))
    except:
        lg('     ' +  'piece 5, ' + filePieces[5] + ' of filename: ' + minerFilename + ' is not a valid integer (SNAP_ID_END); cannot continue')
        return

# ---

    lg('     ' + 'DBID: ' + str(DBID) + ', DB: ' + DB + ', snap_ids: ' + str(SNAP_ID_START) + ' thru ' + str(SNAP_ID_END))

# ---

    f           = open(AWR_MINER_PATH + os.sep + 'awr_miner_out' + os.sep + minerFilename, )
    lines       = f.readlines()
    inFrame     = False

    parsedPath  = outputPath + os.sep + 'db_' + DB + '_' + str(DBID) + os.sep + minerFilename.strip('.out')
    os.makedirs(parsedPath, exist_ok=True)

    for i, l in enumerate(lines):
        if l.startswith('~~BEGIN'):
            section = l[8:-3]

            inFrame       = True
            headerWritten = False

            filenameTxt = parsedPath + os.sep + section + '.txt'
            filenameCsv = parsedPath + os.sep + section + '.csv'

            lg('        wrote section: ' + section + ' to ' + filenameCsv)

            o = open(filenameTxt, 'w')

        elif l.startswith('~~END'):
            inFrame = False
            o.close()

            try:
                df = pd.read_fwf(filenameTxt)

                if 'Snap Id' in df:
                    df.rename(columns={'Snap Id': 'SNAP_ID'}, inplace=True)

                if section in ['DATABASE-PARAMETERS', 'DATABASE-PARAMETERS2']:
                    if 'Unnamed: 2' in df:
                        df['VALUE'] = df['VALUE'] + ' ' + df['Unnamed: 2'].fillna('')
                        df.drop(columns=['Unnamed: 2'], inplace=True)

                elif section == 'MAIN-METRICS':
                    if 'Unnamed: 3' in df:
                        df['end'] = df['end'] + ' ' + df['Unnamed: 3'].fillna('')
                        df.drop(columns=['Unnamed: 3'], inplace=True)

                elif section == 'TOP-N-TIMED-EVENTS':
                    if 'Unnamed: 3' in df:
                        df['EVENT_NAME'] += ' ' + df['Unnamed: 3'].fillna('')
                        df.drop(columns=['Unnamed: 3'], inplace=True)

                elif section == 'TOP-SQL-BY-SNAPID':
                    if 'Unnamed: 4' in df:
                        df['MODULE'] += ' ' + df['Unnamed: 4'].fillna('')
                        df.drop(columns=['Unnamed: 4'], inplace=True)

                    if 'Unnamed: 5' in df:
                        df['ACTION'] = df['Unnamed: 5'].fillna('') + df['ACTION'].fillna('')
                        df.drop(columns=['Unnamed: 5'], inplace=True)

                elif section == 'TOP-SQL-SUMMARY':
                    if 'Unnamed: 1' in df:
                        df['MODULE'] += ' ' + df['Unnamed: 1'].fillna('')
                        df.drop(columns=['Unnamed: 1'], inplace=True)

                    if 'Unnamed: 2' in df:
                        df['MODULE'] += ' ' + df['Unnamed: 2'].fillna('')
                        df.drop(columns=['Unnamed: 2'], inplace=True)
#
#               The following lines are needed just in case the row count in any file > 50000, the limit of SQL*Plus pagesize
#
                df=df[df.ne(df.columns).any(1)]

                if 'SNAP_ID' in df:
                    df=df[df['SNAP_ID'] != 'SNAP_ID']

                df.to_csv(filenameCsv, index=False)

                if section != 'MAIN-METRICS': os.remove(filenameTxt)
            except Exception as fc:
                lg('        error ' + str(fc) + ' reading/writing frame for section ' + section)

        elif inFrame:
            if l.strip() != '':

                if not headerWritten:
                    o.write(l)
                    headerWritten = True

                    continue

                data = [d.strip() for d in l.split(' ') if d != '']

                if data[0][0:3] != '---':
                    o.write(l)

    f.close()

# ----------------------------------------------------------------------------------------------------------------------

if not os.path.exists(AWR_MINER_PATH + os.sep + 'awr_miner_out'):
    lg('\n\nDirectory ' + AWR_MINER_PATH + os.sep + 'awr_miner_out' + ' does not exist; cannot continue')

    assert(False)

for file in np.sort(fnmatch.filter(os.listdir(AWR_MINER_PATH + os.sep + 'awr_miner_out'), 'awr-hist*.out')):
    parse(file)
