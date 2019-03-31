#!/bin/bash

python3 /home/pi/ledtickslow.py &
pid=$!

sudo killall hostapd
sudo systemctl stop dnsmasq
sudo systemctl stop dhcpcd
sudo systemctl ifconfig wlan0 down
sudo systemctl ifconfig wlan0 up
sudo systemctl start wpa_supplicant
sleep 2
sudo systemctl daemon-reload
sudo systemctl start dhcpcd


dd=10
result=0
target=8.8.8.8


for((i=0;i<$dd;i++))
do
ping $target -c 1 >> /dev/null
[ $? -lt 1 ] && result=1 && break
sleep 1
done

kill $pid
if [ $result -gt 0 ];then
	exit 0
fi

bash /home/pi/ap_activate.sh &
exit 0
