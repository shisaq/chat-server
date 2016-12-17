#!/bin/bash
# Chat Server Startup

virtualenv venv
. ./venv/bin/activate
pip install -r requirements.txt
export FLASK_APP=run.py
flask run
