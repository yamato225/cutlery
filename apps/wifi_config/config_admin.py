import os
import json

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