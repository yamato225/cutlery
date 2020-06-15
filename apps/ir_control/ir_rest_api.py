#!/usr/bin/env python

from flask import Flask
import json
app = Flask(__name__)

@app.route('/')
def hello():
    name = "Hello World"
    return name

@app.route('/api/devices')
def get_buttons():
    devices={
        "devices":[
            { 
                "id":1, "label":"エアコン",
                "buttons":[ {"id":1,"label":"冷房ON" }, {"id":2, "label":"OFF"}, {"id":3,"label":"ハイパワー"} ] 
            },
            {
                "id":2, "label":"リビング照明",
                "buttons":[ {"id":1, "label":"ON"},{"id":2,"label":"OFF"} ]
            }
        ]
    }
    return json.dumps(devices)

# {"1": {
#            {"id": "on",
#            "label": "ON"},
#            "2": {"id": "on",
#            "label": "OFF"}}

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5000)