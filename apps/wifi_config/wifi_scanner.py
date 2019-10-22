import json
from wifi import Cell

import paho.mqtt.client as mqtt
from time import sleep

import threading
import os
import sys
import signal

APP_NAME="wifi_config"
SCAN_RESULT_TOPIC_NAME=APP_NAME + "/scan_results"

class ScanThread(threading.Thread):
    global SCAN_RESULT_TOPIC_NAME
    global APP_NAME

    def __init__(self):
        super(ScanThread, self).__init__()
        self.stop_event = threading.Event()
        self.setDaemon(True)
        self.is_running=False

    def stop(self):
        self.stop_event.set()

    def scan_wifi_list(self):
      print("scanning")
      cells = Cell.all('wlan0')
      wifi_list=[]
      id=0
      for cell in cells:
          qs=cell.quality.split('/')
          strength=int(int(qs[0])*5/int(qs[1]))
          print(cell.ssid)
          wifi_list.append({"id":id,"name":cell.ssid,"strength":strength})
          id+=1
      #print("sending...")
      print(SCAN_RESULT_TOPIC_NAME)
      client.publish(SCAN_RESULT_TOPIC_NAME,json.dumps(wifi_list))

    def run(self):
      print("start!")
      self.is_running=True
      print("flag="+str(self.stop_event.is_set()))
      while self.stop_event.is_set() == False:
        print("flag="+str(self.stop_event.is_set()))
        self.scan_wifi_list()
        sleep(5)

scanner=ScanThread()

def on_connect(client, userdata, flag, rc):
    global scanner
    print("Connected with result code " + str(rc))
    scanner.start()
    client.subscribe(""+APP_NAME+"/close",qos=2)

def on_disconnect(client, userdata, flag, rc):
  if  rc != 0:
    print("Unexpected disconnection.")

def on_close():
  global scanner
  print(APP_NAME+":closing connection")
  scanner.stop()
  client.disconnect()
  sys.exit(0)

def on_message(client, userdata, msg):
  print("Received message '" + str(msg.payload) + "' on topic '" + msg.topic + "' with QoS " + str(msg.qos))
  on_close()

def sigterm_handler(signal_number, stack_frame):
  on_close()


signal.signal(signal.SIGTERM,sigterm_handler)
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)
client.loop_forever()


"""
connect_flag=False


def repeat_thread():
    global connect_flag
    while True:
        if connect_flag == True:
            get_wifi_list()
            sleep(3)

th=threading.Thread(target=repeat_thread)

def get_wifi_list():
    cells = Cell.all('wlan0')
    wifi_list=[]
    id=0
    for cell in cells:
        qs=cell.quality.split('/')
        strength=int(int(qs[0])*5/int(qs[1]))
        #print("name:"+cell.ssid+","+str(strength)+","+str(id))
        wifi_list.append({"id":id,"name":cell.ssid,"strength":strength})
        id+=1

    #client.subscribe("process_waker/wake",qos=2)
    #print(wifi_list)
    print("a")
    client.publish("presence",json.dumps(wifi_list))

def on_connect(client, userdata, flag, rc):
    global connect_flag
    print("Connected with result code " + str(rc))
    connect_flag=True
    pid = os.getpid()
    print("pid="+str(pid))
    client.subscribe("process_waker/close/"+str(pid),qos=2)

def on_disconnect(client, userdata, flag, rc):
  if  rc != 0:
    print("Unexpected disconnection.")

def on_message(client, userdata, msg):
  print("Received message '" + str(msg.payload) + "' on topic '" + msg.topic + "' with QoS " + str(msg.qos))
  client.disconnect()
  sys.exit(0)

client = mqtt.Client()
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message

client.connect("localhost", 1883, 60)

client.loop_start()

print("thread_start")
th.start()

"""
