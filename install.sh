#!/bin/bash

ROOT_DIR=`cd $(dirname $0) && pwd`

##------

function apt_install() {
echo "install required packages..."
if [ "true" = "false" ];then
apt update
apt install mosquitto python3-pip
pip3 install wifi paho-mqtt
fi
}

##------
function copy_conf_files() {
echo "put os conf files"
cp $ROOT_DIR/os_conf_files/websocket.conf /etc/mosquitto/conf.d/.
}

##------
function add_systemd() {
echo "add to systemd process"
cp $ROOT_DIR/systemd/cutlery.service /lib/systemd/system/.
}



##### main

# start install from here
##apt_install
##copy_conf_files
add_systemd
