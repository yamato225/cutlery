#!/bin/bash

sudo systemctl stop wpa_supplicant && \
sudo systemctl stop dhcpcd && \
sudo ip addr flush dev wlan0 && \
sudo ip addr add 172.24.1.1 dev wlan0 && \
sudo systemctl start dnsmasq && \
sudo systemctl start hostapd
exit $?
