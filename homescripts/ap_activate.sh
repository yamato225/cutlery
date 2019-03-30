#!/bin/bash

python3 /home/pi/ledtick.py &
pid=$?
cat << EOL >> /etc/dhcpcd.conf
interface wlan0
static ip_address=172.24.1.1/24
static routers=172.24.1.1
static domain_name_servers=172.24.1.1
static broadcast 172.24.1.255
EOL

sudo killall hostapd
sudo systemctl daemon-reload
sudo systemctl stop wpa_supplicant
sudo systemctl stop dhcpcd
sudo ifconfig wlan0 down
sudo ifconfig wlan0 up
sudo nohup hostapd /etc/hostapd/hostapd.conf &
sleep 3
sudo systemctl restart dhcpcd
sudo systemctl restart dnsmasq

head -n -5 /etc/dhcpcd.conf | sudo tee /etc/dhcpcd.conf > /dev/null

