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
        cls.__conf_file_path=cls.get_current_path()+"/config.json"
        fw=open(cls.__conf_file_path,"r")
        cls.myconfig=json.load(fw)

    @classmethod
    def get(cls,key):
        return cls.myconfig[key]

    @classmethod
    def get_current_path(cls):
        return os.path.dirname(os.path.abspath(__file__))

    @classmethod
    def set(cls,key,value):
        cls.myconfig[key]=value

    @classmethod
    def save(cls):
        fw=open(cls.__conf_file_path,"w")
        json.dump(cls.__myconfig,fw,indent=4)

class NetworkControl:
    @staticmethod
    def ping_check(target_ip):
        # pingでインターネット接続があるか確認する。
        result=subprocess.call("ping -c 1 "+target_ip+" > /dev/null 2>&1",shell=True)
        return result==0

    @staticmethod
    def run_shell(shell_file_name):
        # 指定されたシェルを実行する。その返り値が0ならTrueを返す。sss
        return subprocess.call(["bash",ConfigAdmin.get_current_path()+"/"+shell_file_name])==0

    @staticmethod
    def activate_wifi():
        return NetworkControl.run_shell("activate_wifi.sh")

    @staticmethod
    def activate_ap():
        return NetworkControl.run_shell("activate_ap.sh")

    @staticmethod
    def check_wifi_config():
        return NetworkControl.run_shell("check_wifi_config.sh")

    @staticmethod
    def check_is_ap_active():
        return NetworkControl.run_shell("check_is_ap_active.sh")


# 接続設定監視クラス
class MonitorConnection(threading.Thread):
    def __init__(self):
        super(MonitorConnection, self).__init__()
        self.__stop_event = threading.Event()
        self.setDaemon(True)
        self.is_running=False

    def stop(self):
        self.__stop_event.set()

    def change_mode(self,mode):
        ConfigAdmin.set("wifi_mode",mode)
        if mode=="wifi":
            self.activate_wifi()
        else:
            self.activate_ap()

    def activate_wifi(self):
        NetworkControl.activate_wifi()

    def activate_ap(self):
        NetworkControl.activate_ap()
    
    def get_mode(self):
        return ConfigAdmin.get("wifi_mode")

    def run(self):
        print("start monitoring connection")
        self.is_running=True
        wifi_retry_num=0
        while self.__stop_event.is_set() == False:
            wifi_mode=ConfigAdmin.get("wifi_mode")
            #print(NetworkControl.ping_check(ConfigAdmin.get("const")["WIFI_CHECK_IP"]))
            if wifi_mode=="wifi":
                if not NetworkControl.ping_check(ConfigAdmin.get("const")["WIFI_CHECK_IP"]):
                    print("failed to ping:"+ConfigAdmin.get("const")["WIFI_CHECK_IP"])
                    # 設定が有効になっているか確認.(有効でなければapモードに変更)
                    if not NetworkControl.check_wifi_config():
                        ConfigAdmin.set("wifi_mode","ap")
                        continue
                    
                    # activate_wifi再実行
                    wifi_retry_num+=1
                    if (wifi_retry_num<ConfigAdmin.get("const")["WIFI_RETRY_MAX"]):
                        print("trying to activate wifi:"+str(wifi_retry_num))
                        #NetworkControl.activate_wifi()
                        self.activate_wifi()
                        sleep(60)
                    else:
                        # 複数回ネットワーク接続に失敗した場合APモードに切り替え。
                        wifi_retry_num=0
                        print("activate_wifi="+wifi_mode)
                        ConfigAdmin.set("wifi_mode","ap")
            elif wifi_mode=="ap":
                if not NetworkControl.check_is_ap_active():
                    print("activate_ap="+wifi_mode)
                    #NetworkControl.activate_ap()
                    self.activate_ap()
            sleep(1)

class KeepConnection(object):
    def __new__(cls):
        self=object.__new__(cls)
        self.initialize()
        return self

    def initialize(self):
        self.monitor=MonitorConnection()
        ConfigAdmin.load()
        self.monitor.start()
        self.start_mqtt()

    def start_mqtt(self):
        client = mqtt.Client()
        client.message_callback_add("wifi_config/connection/change/mode",self.on_wifi_mode)
        client.message_callback_add("wifi_config/connection/request/status",self.on_request_status)
        client.connect("localhost", 1883, 60)
        client.subscribe("wifi_config/#")
        #client.publish("wifi_",)
        client.loop_forever()

    def on_wifi_mode(self,client,obj,msg):
        print("got change"+msg.payload.decode('utf-8'))
        mode=str(msg.payload.decode('utf-8'))
        self.monitor.change_mode(mode)
        self.publish_status(client)

    def publish_status(self,client):
        mode=self.monitor.get_mode()
        client.publish("wifi_config/connection/status",mode)

    def on_request_status(self,client,obj,msg):
        print("got request")
        self.publish_status(client)

if __name__ == "__main__":
    KeepConnection()

"""
# メイン処理
ConfigAdmin.load()
monitor=MonitorConnection()

def on_wifi_mode(clt,obj,msg):
    global monitor
    mode=str(msg.payload.decode('utf-8'))
    #ConfigAdmin.set("wifi_mode",mode)
    monitor.change_mode(mode)


monitor.start()

## mqtt
client = mqtt.Client()
client.message_callback_add("wifi_config/mode",on_wifi_mode)
client.connect("localhost", 1883, 60)
client.subscribe("wifi_config/#")
client.loop_forever()

#print("PING_CHECK"+str(NetworkControl.ping_check(ConfigAdmin.get("const")["WIFI_CHECK_IP"])))
#print("WIFI_CONFIG_CHECK="+str(NetworkControl.check_wifi_config()) )
#print("AP_CHECK="+str(NetworkControl.check_is_ap_active()))

#sleep(3500)

"""