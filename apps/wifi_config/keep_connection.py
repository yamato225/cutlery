# run by root

import json
import subprocess

import paho.mqtt.client as mqtt
from time import sleep

import os
import threading

class ConfigAdmin:
    __conf_file_path=""
    __myconfig=""

    @classmethod
    def load(cls):
        cls.__conf_file_path=os.path.dirname(os.path.abspath(__file__))+"/config.json"
        fw=open(cls.__conf_file_path,"r")
        cls.myconfig=json.load(fw)

    @classmethod
    def get(cls,key):
        return cls.myconfig[key]

    @classmethod
    def set(cls,key,value):
        cls.myconfig[key]=value

    @classmethod
    def save(cls):
        fw=open(cls.__conf_file_path,"w")
        json.dump(cfg,fw,indent=4)

# 接続設定監視クラス
class MonitorConnection(threading.Thread):
    def __init__(self):
        super(MonitorConnection, self).__init__()
        self.__stop_event = threading.Event()
        self.setDaemon(True)
        self.is_running=False

    def stop(self):
        self.__stop_event.set()

    def run(self):
        print("start monitoring connection")
        self.is_running=True
        wifi_retry_num=0
        ap_retry_num=0
        while self.__stop_event.is_set() == False:
            wifi_mode=ConfigAdmin.get("wifi_mode")
            if wifi_mode="wifi":
                if check_wifi()==False:
                    # 接続失敗時
                    wifi_retry_num+=1
                    activate_wifi()

            sleep(1)
    
    def check_wifi(self):
        # pingでインターネット接続があるか確認する。
        target_ip=ConfigAdmin.get("const")["WIFI_CHECK_IP"];
        result=subprocess.call("ping -c 1 "+target_ip+" > /dev/null 2>&1",shell=True)
        return result!=0


ConfigAdmin.load()

monitor=MonitorConnection()
monitor.start()

sleep(3500)
