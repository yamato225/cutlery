#!/bin/bash

set -o nounset

# activate wifi connection

mydir=$(cd $(dirname $0); pwd)

declare -ri MAX_TIME=10

sudo systemctl stop hostapd
sudo systemctl stop dnsmasq
sudo ip addr flush dev wlan0
sudo systemctl restart wpa_supplicant
sudo systemctl restart dhcpcd

# check connection
declare -i count=0
declare -i status=1
declare target_ip=""
for((count=0;$count<$MAX_TIME;count++))
do
    target_ip=$(ip route show | awk '{if($1=="default")print $3}')
    ping -c 1 ${target_ip} > /dev/null 2>&1
    if [[ $? -eq 0 ]];then
        # success: connecting to Internet
        status=0
        break
    fi
done

# when failed, activate ap
if [[ ${status} -ne 0 ]];then
    bash ${mydir}/activate_ap.sh
fi

exit ${status}
