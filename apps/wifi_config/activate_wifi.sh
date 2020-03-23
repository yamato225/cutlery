#!/bin/bash

set -o nounset

# activate wifi connection

sudo systemctl stop hostapd && \
sudo systemctl stop dnsmasq && \
sudo ip addr flush dev wlan0 && \
sudo systemctl restart wpa_supplicant && \
sudo systemctl restart dhcpcd

exit $?