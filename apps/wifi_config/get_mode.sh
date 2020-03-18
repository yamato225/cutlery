#!/bin/bash

declare -r AP_MODE_PROCESS="hostapd"


if [[ $(pgrep ${AP_MODE_PROCESS}) -gt 0 ]];then
    echo "ap"
else
    echo "wifi"
fi
