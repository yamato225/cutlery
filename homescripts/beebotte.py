import paho.mqtt.client as mqtt
import json
import subprocess

TOKEN = "token_NAi45iONwdpFbxRb"
HOSTNAME = "mqtt.beebotte.com"
PORT = 8883
TOPIC = "MySmartHome/rest"
CACERT = "mqtt.beebotte.com.pem"

def on_connect(client, userdata, flags, respons_code):
    print('status {0}'.format(respons_code))
    client.subscribe(TOPIC)

def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload))
    data = json.loads(msg.payload.decode("utf-8"))
    target  = data["data"]["target"]
    command = data["data"]["command"]
    print(target)
    print(command)
    cmd="irsend SEND_ONCE "+target+" "+command
    subprocess.call(cmd.split())

client = mqtt.Client()
client.username_pw_set("token:%s"%TOKEN)
client.on_connect = on_connect
client.on_message = on_message
client.tls_set(CACERT)
client.connect(HOSTNAME, port=PORT, keepalive=60)
client.loop_forever()
