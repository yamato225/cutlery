import paho.mqtt.client as mqtt
import subprocess

import threading
import time

process_list={
  "wifi_setter": {"filename":"wifi_config/setter.py","pid":0},
  "wifi_scanner": {"filename":"wifi_config/wifi_scanner.py","pid":0},
  "wifi_config": {"filename":"wifi_config/wake.py","pid":0},
  "fordebug": {"filename":"debug.py","pid":0},
  "ir_config": {"filename":"ir_config/init.py","pid":0}
}

MAX_AGE=60

class ProcessKillThread(threading.Thread):
    global process_list

    def __init__(self):
        super(ProcessKillThread, self).__init__()
        self.stop_event = threading.Event()
        self.setDaemon(True)
        self.is_running=False

    def stop(self):
        self.stop_event.set()

    def killOldProcess(self):
      for k in process_list.keys():
        #pid=process_list[k]["pid"]
        if "pobj" in process_list[k].keys():
          pobj=process_list[k]["pobj"]
          if not pobj is None:
            pid=pobj.pid
            if pobj.poll() is None:
              age=int(time.time()) - process_list[k]['time']
              #print("pid="+str(pid)+",age="+str(age)+"/"+str(MAX_AGE))
              if age > MAX_AGE:
                try:
                  print("killing..."+str(pid))
                  pobj.terminate()
                  try:
                    pobj.wait(10)
                  except:
                    print("child process will not die")
                    sys.exit()
                except:
                  print("error on killing process")
            else:
              #process_list[k]['pid']=0
              print("pid="+str(pid)+": dead")
              process_list[k]["pobj"]=None

    def run(self):
      self.is_running=True
      while self.stop_event.is_set() == False:
        self.killOldProcess()
        time.sleep(3)

pkt=ProcessKillThread()

def on_connect(client, userdata, flag, rc):
  print("Connected with result code " + str(rc))
  pkt.start()    
  client.subscribe("process_waker/wake",qos=2)

def on_disconnect(client, userdata, flag, rc):
  if  rc != 0:
    print("Unexpected disconnection.")

def wake_process(process_name):
  filename=process_list[process_name]['filename']
  pobj=subprocess.Popen(['python3',filename])
  #process_list[process_name]['pid']=pobj.pid
  process_list[process_name]['pobj']=pobj
  process_list[process_name]['time']=int(time.time())
  print("pid="+str(pobj.pid))

def wake_process_check(process_name):
  if "pobj" in process_list[process_name].keys():
    if not process_list[process_name]["pobj"] is None:
      print("duplicate")
      process_list[process_name]['time']=int(time.time())
    else:
      wake_process(process_name)
  else:
    wake_process(process_name)

def on_message(client, userdata, msg):
  global process_list
  print("Received message '" + str(msg.payload) + "' on topic '" + msg.topic + "' with QoS " + str(msg.qos))
  if msg.topic=="process_waker/wake":
    process_name=str(msg.payload.decode('utf-8'))
    wake_process_check(process_name)

client = mqtt.Client()
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message

client.connect("localhost", 1883, 60)

client.loop_forever()