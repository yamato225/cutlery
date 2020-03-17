#!/bin/bash

sudo systemctl stop wpa_supplicant
sudo systemctl stop dhcpcd

# give fixed ip
sudo ip addr add 172.24.1.1
sudo ip route add default via 172.24.1.1

# start dhcp server
sudo systemctl start dnsmasq

# start hostapd
sudo systemctl start hostapd

exit 0