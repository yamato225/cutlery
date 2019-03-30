#!/bin/bash

function start_lircd(){
	echo "starting lircd..."
	sudo systemctl start lircd
}


trap 'start_lircd' 2
sudo systemctl stop lircd
echo "stand by"
mode2 -d /dev/lirc0 | tee recorded_ir
