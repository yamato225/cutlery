#!/bin/bash

declare ssid=$1
declare pw=$2


conf_file_path="/etc/wpa_supplicant/wpa_supplicant.conf"

# 設定を削除
sed -i -e "/^network={/,/}/d" ${conf_file_path}

wpa_passphrase ${ssid} ${pw} | grep -v '^\s*#' | sudo tee -a ${conf_file_path} > /dev/null