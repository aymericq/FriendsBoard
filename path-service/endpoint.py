from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/path', METHOD=['POST'])
def add_path(data):
    if valid_login(request.form['username']):
        pass
