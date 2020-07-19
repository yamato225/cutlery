import json

import paho.mqtt.client as mqtt
from time import sleep

import threading
import os
import sys
import signal

APP_NAME="ir_devices"

device_list={
        "devices":[
            { 
                "id":1, "label":"エアコン",
                "buttons":[ {"id":1,"label":"冷房ON" }, {"id":2, "label":"OFF"}, {"id":3,"label":"ハイパワー"} ] 
            },
            {
                "id":2, "label":"リビング照明",
                "buttons":[ {"id":1, "label":"ON"},{"id":2,"label":"OFF"} ]
            },
            {
                "id":3, "label":"ぬるぽ",
                "buttons":[ {"id":1, "label":"ON"} ]
            },
        ]
}

def on_connect(client, userdata, flag, rc):
    print("Connected with result code " + str(rc))
    client.subscribe(""+APP_NAME+"/#",qos=2)

def on_disconnect(client, userdata, flag, rc):
  if  rc != 0:
    print("Unexpected disconnection.")

def on_close():
  print(APP_NAME+":closing connection")
  client.disconnect()
  sys.exit(0)

def on_add_device(mosq,obj,msg):
  print("Received message '" + str(msg.payload) + "' on topic '" + msg.topic + "' with QoS " + str(msg.qos))

def on_get_device(client, userdata, msg):
  print("Received message '" + str(msg.payload) + "' on topic '" + msg.topic + "' with QoS " + str(msg.qos))
  client.publish("ir_devices/devices",json.dumps(device_list))


def sigterm_handler(signal_number, stack_frame):
  on_close()


signal.signal(signal.SIGTERM,sigterm_handler)
client = mqtt.Client()
client.on_connect = on_connect
client.message_callback_add("ir_devices/add/device",on_add_device)
client.message_callback_add("ir_devices/request/devices",on_get_device)

client.connect("192.168.3.30", 1883, 60)
client.loop_forever()

