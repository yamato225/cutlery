import paho.mqtt.client as mqtt
import json
import sys 
import subprocess
import signal

def on_connect(client, userdata, flag, rc):
  print("Connected with result code " + str(rc))
  client.subscribe("wifi_config/config",qos=2)

def on_disconnect(client, userdata, flag, rc):
  if  rc != 0:
    print("Unexpected disconnection.")

def on_message(client, userdata, msg):
  print("Received message '" + str(msg.payload) + "' on topic '" + msg.topic + "' with QoS " + str(msg.qos))
  recv=json.loads(msg.payload.decode('utf-8'))
  base_file=open("wifi_config/wpa_supplicant.base","r")
  conf_text=base_file.read()
  conf_text+="network={\n"
  conf_text+="  ssid=\""+recv['ssid']+"\"\n"
  conf_text+="  psk=\""+recv['password']+"\"\n}"
  conf_file=open("/etc/wpa_supplicant/wpa_supplicant.conf","w")
  conf_file.write(conf_text)
  print(conf_text)
  #TODO: systemd経由でなく、rpi-wifi-monitorにmosquitto経由で再起動させる。
  subprocess.Popen(["systemctl","restart","rpi-wifi-monitor"])
  # inform other processes processes to close
  client.publish("wifi_config/close","[]")
  client.disconnect()


#TODO: フレームワーク化し、この辺のスクリプトを毎度かかなくていいようにする
client = mqtt.Client()
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message

#TODO: ポート番号・ホストを外だしする。
client.connect("localhost", 1883, 60)

def sigterm_handler(signal_number, stack_frame):
  global client
  print("terminated: setter")
  client.disconnect()
  sys.exit(0)

print("sigterm")
signal.signal(signal.SIGTERM,sigterm_handler)

client.loop_forever()