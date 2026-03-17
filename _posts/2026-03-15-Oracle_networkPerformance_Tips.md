---
layout: post
title: "Oracle OCI Network Performance TestTips"
category: Oracle
tags: Oracle OCI Network Tips
---

* content
{:toc}

Oracle OCI Network Performance Test

### Test Network Performance in OCI

[Network Performance](https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/networkperformance.htm)

Install via yum.
```
sudo yum install -y iperf3

```
Enable communication to the server instance on TCP port 5201 (for iperf3):
```
sudo firewall-cmd --zone=public --permanent --add-port 5201/tcp
sudo firewall-cmd --reload
```

On the server instance, run iperf3 in server mode. Example Linux command:
```
iperf3 -s
```

On the client instance, run iperf3 in client mode and specify the private IP address of the server instance. Example Linux command:
```
iperf3 -c <server_instance_private_ip_address>
```

### qperf

[qperf をインストールして TCP, UDP レイテンシ(遅延)をマイクロ秒(μs)単位で測定してみてみた](https://qiita.com/shirok/items/7ee5cc026ef8227843ff)

Network Test Prerequisites
Latency and throughput are measured by iperf3 and qperf (installed on Exadata by default).

[Network Tests](https://docs.oracle.com/en/database/oracle/oracle-database/26/haovw/maa-evaluations-multicloud-solutions.html)

```
Run the following tests multiple times to ensure consistency.
It is recommended that the tests be run at different times of the day to ensure consistency throughout.
For database server VMs, these tests should minimally be performed between one VM of the primary cluster and one VM of the standby database cluster. Additional tests can be performed on all database servers to ensure consistency.
All iperf3 and qperf commands should be run as root (sudo su - from opc user).
For iperf3 tests, you can optionally use the -f M parameter to display bitrate results in MB/s.
```




### perf-check.py

perf-check.py
```
#!/usr/bin/env python3

"""
Copyright (c) 2021, Oracle and/or its affiliates.
Licensed under the Universal Permissive License v1.0 as shown at https://oss.oracle.com/licenses/upl

OCI VCN Performance Test automation script

https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/networkperformance.htm
"""

import argparse
from distutils.version import LooseVersion
from io import BytesIO
import logging
import os
import re
import shutil
import subprocess
import sys
from subprocess import PIPE, STDOUT
import tarfile
from tarfile import TarInfo, REGTYPE, DIRTYPE
import time

logger = logging.getLogger()

DEFAULT_SERVER_TARBALL="perf-results-server.tar.gz"
DEFAULT_CLIENT_TARBALL="perf-results-client.tar.gz"

class ResultsTarball:
    """Basic tarfile wrapper"""

    def __init__(self, name, prefix):
        self.tf = tarfile.open(name, 'w:gz')
        self.prefix = prefix

        self.uid = os.getuid()
        self.gid = os.getgid()

        # Query user/group name via 'id' tool which can handle
        # non-locally defined names (e.g. ldap-based users)
        self.uname = invoke_subprocess(['id', '-un']).stdout
        self.gname = invoke_subprocess(['id', '-gn']).stdout

        info = TarInfo(prefix)
        info.mtime = time.time()
        info.uid = self.uid
        info.gid = self.gid
        info.uname = self.uname
        info.gname = self.gname
        info.type = DIRTYPE
        info.mode = 0o755

        self.tf.addfile(tarinfo=info)


    def add_buffer(self, name, contents):
        """Add a file with the given name and contents to the results tarball"""

        info = TarInfo(self.prefix+name)
        info.size = len(contents)
        info.mtime = time.time()
        info.uid = self.uid
        info.gid = self.gid
        info.uname = self.uname
        info.gname = self.gname
        info.type = REGTYPE

        self.tf.addfile(tarinfo=info, fileobj=BytesIO(contents.encode()))

    def close(self):
        """Close the tarball.  Adding additional contents will lead to an error."""
        self.tf.close()


def invoke_subprocess(popenargs, encoding='utf-8'):
    return subprocess.run(popenargs,
                          stdout=PIPE,
                          stderr=PIPE,
                          check=False,
                          encoding=encoding)


def get_metadata(metadata):
    """Invoke curl to retrieve requested instance metadata"""

    result = subprocess.run(['curl',
                             '-H',
                             'Authorization: Bearer Oracle',
                             'http://169.254.169.254/'+metadata
                            ],
                            stdout=PIPE, stderr=PIPE, check=False, encoding='utf-8')
    return result


def check_firewall():
    """Very basic santity check to see if there is a firewall rule for
    the default iperf port (5201).  Not exact as there are various ways to write
    a valid rule."""

    # firewall-cmd requires root access
    if invoke_subprocess(['sudo', '-v', '-n']).returncode == 0:
        fw_cmd = invoke_subprocess(['sudo', 'firewall-cmd' '--list-all'])
        if fw_cmd.returncode == 0 and re.search("dport 5201.*ACCEPT", fw_cmd.stdout) == None:
            print("""
###############################################################
Unable to find matching firewall rule.  Test may fail.  
Add via:
    sudo firewall-cmd --zone=public --permanent --add-port 5201/tcp
    sudo firewall-cmd --zone=public --permanent --add-port 5201/udp
    sudo firewall-cmd --reload

Remove via:
   sudo firewall-cmd --zone=public --permanent --remove-port=5201/tcp
   sudo firewall-cmd --zone=public --permanent --remove-port=5201/udp
   sudo firewall-cmd --reload
###############################################################
""")


def parse_args():
    """Parse command line arguments"""

    basename = os.path.basename(__file__)

    parser = argparse.ArgumentParser(description=
"""OCI Network Performance Analyzer

This tool assists with gathering network performance measurements
between OCI instances by running 'iperf' captures.  Run the tool
on two instances (i.e. 'client' and 'server') to perform a capture.

The 'iperf3' tool must be installed and tcp/udp port 5201 must be open.""",
                                     epilog=
"""To perform a capture:
Start the tool in 'server' mode:
    {} server
On another OCI instance. Start a 'client':
    {} client <server address>
Provide generated capture archives to OCI Support upon completion.
    Defaults: {}, {}
""".format(basename, basename, DEFAULT_CLIENT_TARBALL, DEFAULT_SERVER_TARBALL),
                                     formatter_class=argparse.RawDescriptionHelpFormatter)

    # Common arguments
    parser.add_argument('--bind',
                        dest='address',
                        action='store',
                        required=False,
                        help='Bind test to given host address')
    parser.add_argument('--output-file',
                        dest='file',
                        action='store',
                        required=False,
                        help='Archive to store test results')
    parser.add_argument('--iperf',
                        action='store',
                        default='iperf3',
                        required=False,
                        help='Path to iperf executable')
    parser.add_argument('--include-metadata',
                        action='store_true',
                        required=False,
                        help='Collect system metadata')

    # Client-mode
    subparsers = parser.add_subparsers(dest='mode')
    parser_client = subparsers.add_parser('client', help='Start performance test in client mode')
    parser_client.add_argument('host',
                               action='store',
                               type=str,
                               help='Destination host address')
    parser_client.add_argument('--bandwidth',
                               action='store',
                               required=False,
                               type=int,
                               help='Set target bandwidth (Mbps)')
    parser_client.add_argument('--parallel',
                               action='store',
                               required=False,
                               type=int,
                               default=1,
                               help='Number of parallel client streams to run')

    # Server-mode
    subparsers.add_parser('server', help='Start performance test in server mode')

    # Allow common 'parser' args to be placed before or after sub-command
    # by parsing known arguments first, then re-trying unparsed arguments
    parsed = parser.parse_known_args()
    parsed = parser.parse_args(parsed[1], parsed[0])

    if shutil.which(parsed.iperf) is None:
        sys.exit(
"""Failed to find iperf3 in path.
    - Try installing via 'sudo yum install -y iperf3'
    - Set path to 'iperf3' executable via '--iperf' option
""")

    if parsed.mode == 'server':
        if parsed.file is None:
            parsed.file = DEFAULT_SERVER_TARBALL
    elif parsed.mode == 'client':
        if parsed.file is None:
            parsed.file = DEFAULT_CLIENT_TARBALL

        # Set the target bandwidth based on instance's metadata value
        # Otherwise iperf will only use 1Mbit for udp tests
        if parsed.bandwidth is None:
            try:
                bandwidth = get_metadata('opc/v2/instance/shapeConfig/networkingBandwidthInGbps')
                bandwidth_gbps = float(bandwidth.stdout)
                parsed.bandwidth = int(bandwidth_gbps * 1000)
            except Exception:
                logger.exception(
"""Failed to retrieve instance bandwidth limit. Is this an OCI instance?
    - Try setting '--bandwidth' flag
    - Curl error: 
{}""".format(bandwidth.stderr))
                sys.exit()
    else:
        parser.print_help()
        sys.exit()

    return parsed


def common_metadata(settings, results):
    """Capture some common system information that may be useful for debugging"""
    if settings.include_metadata is True:
        results.add_buffer('hostname.out', invoke_subprocess(['hostname', '-f']).stdout)
        results.add_buffer('uname.out', invoke_subprocess(['uname', '-a']).stdout)
        results.add_buffer('vnics.out', get_metadata('opc/v2/vnics/').stdout)
        results.add_buffer('shapeConfig.out', get_metadata('opc/v2/instance/shapeConfig/').stdout)
        results.add_buffer('ifconfig.out', invoke_subprocess(['ifconfig', '-a', '-v']).stdout)
        results.add_buffer('route.out', invoke_subprocess('route').stdout)


def iperf_metadata(settings, results):
    iperf_version = invoke_subprocess([settings.iperf, '-v']).stdout
    results.add_buffer('iperf3_version.out', iperf_version)

    version_regex = re.search("[0-9]\.[0-9]\.[0-9]", iperf_version)
    if version_regex != None:
        curr_ver = LooseVersion(version_regex.group(0))
        min_ver = LooseVersion("3.3.0")
        if curr_ver < min_ver:
            print("""
###############################################################
Installed iperf version ({}) is lower than recommended ({})

UDP test results may be unreliable
###############################################################
""".format(curr_ver.vstring, min_ver.vstring))



def client_test(settings, results):
    """Client test runs iperf twice.  Once in TCP mode, followed by UDP mode.
       It also captures ping and tracepath results to the server"""
    common_metadata(settings, results)
    iperf_metadata(settings, results)

    # Basic health-check
    ping_results = invoke_subprocess(['ping', '-c', '4', settings.host])
    results.add_buffer('ping.out', ping_results.stdout)
    if ping_results.returncode != 0:
        print("""
###############################################################
Failed to ping specified host ({})
    - Is ICMP Type 8 allowed at the server (security rules)?
###############################################################
""".format(settings.host))

    # No need to set the 'bandwidth' flag as iperf will max out available tcp bandwidth
    iperf_args = [settings.iperf, '-c', settings.host, '-V', '-P', str(settings.parallel)]
    if settings.address is not None:
        iperf_args.extend(['-B', settings.address])

    print('Beginning TCP performance test...\n')
    results.add_buffer('top_pretcp.out', invoke_subprocess(['top', '-b', '-n', '1']).stdout)
    iperf_results = invoke_subprocess(iperf_args)
    results.add_buffer('iperf3_tcp.out', iperf_results.stdout)
    results.add_buffer('top_posttcp.out', invoke_subprocess(['top', '-b', '-n', '1']).stdout)

    if iperf_results.returncode != 0:
        print(
"""
###############################################################
TCP performance test failed (iperf3 RC: {}).
    - Is the serverside test running?
    - Is the server reachable (ping RC: {})?
    - Is port 5201 open on the server (firewall+security rules)?
###############################################################
""".format(iperf_results.returncode, ping_results.returncode))

    print('\nTCP performance results:')
    print(iperf_results.stdout)
    print('\n')

    # Give the server time to close and restart iperf
    time.sleep(5)

    # Must set desired bandwidth for UDP test
    iperf_args.extend(['-u', '-b', str(settings.bandwidth)+'M'])

    print('Beginning UDP performance test...\n')
    results.add_buffer('top_preudp.out', invoke_subprocess(['top', '-b', '-n', '1']).stdout)
    iperf_results = invoke_subprocess(iperf_args)
    results.add_buffer('iperf3_udp.out', iperf_results.stdout)
    results.add_buffer('top_postudp.out', invoke_subprocess(['top', '-b', '-n', '1']).stdout)

    if iperf_results.returncode != 0:
        print(
"""
###############################################################
UDP performance test failed (iperf3 RC: {}).
    - Is the serverside test running?
    - Is the server reachable (ping RC: {})?
    - Is port 5201 open on the server (firewall+securitylist)?
###############################################################
""".format(iperf_results.returncode, ping_results.returncode))

    print('UDP performance results:')
    print(iperf_results.stdout)
    print('\n')

    # Capture a tracepath at the end of the test (as it can take some time to complete)
    tracepath = invoke_subprocess(['tracepath', '-b', '-m', '64', '-p', '5201', settings.host])
    results.add_buffer('tracepath.out', tracepath.stdout)


def server_test(settings, results):
    """Server-side performance test simply invokes iperf in server mode"""
    common_metadata(settings, results)
    iperf_metadata(settings, results)

    iperf_args = [settings.iperf, '-s', '-1', '-V']
    if settings.address is not None:
        iperf_args.extend(['-B', settings.address])

    print('Beginning iperf TCP test...')
    results.add_buffer('top_pretcp.out', invoke_subprocess(['top', '-b', '-n', '1']).stdout)
    iperf_results = invoke_subprocess(iperf_args)
    results.add_buffer('iperf3_tcp.out', iperf_results.stdout)
    results.add_buffer('top_posttcp.out', invoke_subprocess(['top', '-b', '-n', '1']).stdout)

    print('\nTCP Performance Results:')
    print(iperf_results.stdout)
    print('\n')


    print('Beginning iperf UDP test...')
    results.add_buffer('top_preudp.out', invoke_subprocess(['top', '-b', '-n', '1']).stdout)
    iperf_results = invoke_subprocess(iperf_args)
    results.add_buffer('iperf3_udp.out', iperf_results.stdout)
    results.add_buffer('top_postudp.out', invoke_subprocess(['top', '-b', '-n', '1']).stdout)

    print('\nUDP Performance Results:')
    print(iperf_results.stdout)
    print('\n')


if __name__ == '__main__':
    args = parse_args()

    check_firewall()

    tarball = None
    if args.mode == 'server':
        print('Running test in server mode...')
        tarball = ResultsTarball(args.file, 'perf-results-server/')
        server_test(args, tarball)
    else:
        print('Running test in client mode...')
        tarball = ResultsTarball(args.file, 'perf-results-client/')
        client_test(args, tarball)

    print("Performance test completed.  Please provide the '{}' archive to Oracle Support.".format(args.file))
    tarball.close()
```

### Good Day

Have a good work&life! 2026/03 via LinHong
