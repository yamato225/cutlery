#!/bin/bash

# activate wifi connection

declare -r TARGET_IP=8.8.8.8

sudo systemctl stop hostapd
sudo systemctl stop dnsmasq
sudo ip addr flush dev wlan0
sudo systemctl restart wpa_supplicant
sudo systemctl restart dhcpcd

# check connection
declare -i count=0
declare -i status=1
for((count=0;count<$MAX_TIME;count++))
do
    ping -c 1 ${TARGET_IP} > /dev/null 2>&1
    if [[ $? -eq 0 ]];then
        # success: connecting to Internet
        status=0
        break
    fi
done

exit ${status}