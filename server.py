import os
import configparser

from flask import Flask, abort, send_from_directory

app = Flask(__name__)

@app.route("/<path:request>")
def hello(request):
    if os.path.exists(f"./{request}"):
        return send_from_directory('./', request), 200
    # return send_from_directory('.', "index.html"), 200

if __name__ == "__main__":
    app.run(debug=True)