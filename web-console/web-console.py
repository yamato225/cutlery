# all the imports
#import sqlite3
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)

@app.before_request
def before_request():
    pass
#    g.db = connect_db()

@app.after_request
def after_request(response):
    #g.db.close()
    return response

@app.route('/')
def config_list():
    return render_template('list.html')

@app.route('/wifi_config', methods=['GET','POST'])
def wifi_config():
    error=None
    if request.method == 'POST':
        return redirect(url_for('config_list'))
        
    return render_template('wifi_config.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')