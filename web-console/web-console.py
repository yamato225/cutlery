# all the imports
#import sqlite3
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash, jsonify
import psycopg2

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)

@app.before_request
def before_request():
    pass

@app.after_request
def after_request(response):
    return response

@app.route('/')
def config_list():
    return render_template('list.html')

def get_connection():
    return psycopg2.connect('postgresql://majestyid:mid@localhost:5432/majestydb')

@app.route('/wifi_config', methods=['GET','POST'])
def wifi_config():
    error=None
    if request.method == 'POST':
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute('INSERT INTO requests(app_no) VALUES (%s)', (1,))

        json={"ssid":request.form['input_ssid'],"pass":request.form['input_password']}
        print(json)
        return redirect(url_for('config_list'))
        
    return render_template('wifi_config.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
