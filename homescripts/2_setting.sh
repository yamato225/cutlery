#!/bin/bash

device=$1
command=$2

bash /home/pi/add_irconf.sh $device $command | sudo tee /etc/lirc/lircd.conf.d/${device}.lircd.conf

sudo systemctl restart lircd
