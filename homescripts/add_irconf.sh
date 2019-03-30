#!/bin/bash

device=$1
command=$2

conf_file=/etc/lirc/lircd.conf.d/${device}.lircd.conf

if [ ! -e $conf_file ];then

cat << EOF
begin remote
  name  ${device}
  flags RAW_CODES
  eps   30
  aeps  100
  gap   200000
  toggle_bit_mask 0x0

  begin raw_codes
EOF

else
head -n -2 $conf_file
fi

echo 'name '$command

awk '{if(NR % 30) ORS=" "; else ORS="\n"; print $2}' /home/pi/recorded_ir

echo ""
echo ""
echo 'end raw_codes'
echo 'end remote'
