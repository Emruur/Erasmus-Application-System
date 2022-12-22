from main import DB_INIT, Student, University
from flask import Flask,render_template
from dataclasses import dataclass, asdict
import json
from flask import request
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
import xlrd 
import csv
import pandas as pd

app = Flask(__name__)


@app.route('/', methods=['POST'])
def index():

    try:
        f = request.files['file']
        f.save("proper.csv")
    except:
        print("An exception occurred")
        return "No file uploaded!"
 
    
    db_init= DB_INIT()

    (students,universities)= db_init.place()
    students_json= []
    universities_json= []

    for st in students:
        students_json.append(st.generate_map())

    for uni in universities:
        universities_json.append(uni.generate_map())

    students_json= students_json
    universities_json= universities_json

    accepted_students= [s for s in students if s.placed_university != ""]
    rejected_students= [s for s in students if s.placed_university == ""]


    return render_template('index.html', accepted_students=accepted_students, rejected_students= rejected_students )
  


  
  
