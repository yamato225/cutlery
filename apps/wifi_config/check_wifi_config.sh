#!/bin/bash

set -u

declare WIFI_CONFIG_PARH="/etc/wpa_supplicant/wpa_supplicant.conf"
declare network_config_text=""

network_config_text="$(sed -n -e '/network={/,/}/p' ${WIFI_CONFIG_PARH})"

declare -a check_text_regex=('ssid=".\+"' 'psk=[0-9a-f]\+')

#check_ssid_name
for rx in ${check_text_regex[@]}
do
    echo "${network_config_text}" | grep ${rx} > /dev/null 2>&1
    if [[ $? -ne 0 ]];then
        # 設定が含まれていなければ１を返し終了。
        exit 1
    fi
done

# すべての設定が含まれていれば0を返す。
exit 0