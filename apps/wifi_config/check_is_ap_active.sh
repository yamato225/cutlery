#!/bin/bash
{
sudo systemctl status hostapd && sudo systemctl status dnsmasq
} > /dev/null 2>&1
exit $?