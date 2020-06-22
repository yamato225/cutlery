import json
from wifi import Cell

import paho.mqtt.client as mqtt
from time import sleep

import threading
import os
import sys
import signal

APP_NAME="ir_device"

def on_connect(client, userdata, flag, rc):
    print("Connected with result code " + str(rc))
    client.subscribe(""+APP_NAME+"/close",qos=2)

def on_disconnect(client, userdata, flag, rc):
  if  rc != 0:
    print("Unexpected disconnection.")

def on_close():
  print(APP_NAME+":closing connection")
  client.disconnect()
  sys.exit(0)

def on_message(client, userdata, msg):
  print("Received message '" + str(msg.payload) + "' on topic '" + msg.topic + "' with QoS " + str(msg.qos))


def sigterm_handler(signal_number, stack_frame):
  on_close()


signal.signal(signal.SIGTERM,sigterm_handler)
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)
client.loop_forever()

