#!/bin/bash

SSID=$1
PASSWORD=$2

cat << EOL > /etc/wpa_supplicant/wpa_supplicant.conf
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=JP
EOL

wpa_passphrase $SSID $PASSWORD | grep '^\s#' >> /etc/wpa_supplicant/wpa_supplicant.conf
