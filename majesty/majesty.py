# all the imports
from flask import Flask, request, session, g, redirect, url_for, \
     abort, flash, jsonify
import subprocess

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)

@app.before_request
def before_request():
    global apps_path
    apps_path="/home/pi/cutlery/apps/"
    pass

@app.after_request
def after_request(response):
    return response

@app.route('/wifi_config', methods=['POST'])
def wifi_config():
    error=None
    global apps_path
    if request.method == 'POST':
        ssid=request.json['ssid']
        pswd=request.json['pass']
        #result = subprocess.call(cmd.split())
        result = subprocess.call(["/bin/bash",apps_path+"common/wifi_config.sh",ssid,pswd])
        return jsonify(result)
        
    return jsonify("ok")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0',port=8888)
