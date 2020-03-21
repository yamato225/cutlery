import json
import subprocess

class config_admin:
    def __init__(self):
        fw=open("config.json","r")
        self.myconfig=json.load(fw)

    def get(self,key):
        return self.myconfig[key]

    def save(self):
        fw=open("config.json","w")
        json.dump(cfg,fw,indent=4)




def check_mode():
    json_text=subprocess.Popen("ip --json address show wlan0",
    stdout=subprocess.PIPE,
    shell=True).communicate()[0]
    result_list=json.loads(json_text)
    my_ip=""
    for onedev in result_list:
        if "ifname" not in onedev:
            continue
        if onedev["ifname"]=="wlan0":
            for address in onedev["addr_info"]:
                if address["family"]=="inet":
                    my_ip=address["local"]
    if my_ip != "":

        print(my_ip)
    else:
        print("cannot get ip")


check_mode()
