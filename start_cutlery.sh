#!/bin/bash

trap 'kill $(jobs -p)' EXIT

ROOT_PATH=`dirname $0`

date >> $ROOT_PATH/cutlery.log
echo "=======================================" | tee -a $ROOT_PATH/cutlery.log

python3 "${ROOT_PATH}/process_waker/process_waker.py" 2>&1 >> $ROOT_PATH/cutlery.log &
wait
