from main import DB_INIT, Student, University
from flask import Flask
from dataclasses import dataclass, asdict
import json

class DataclassJSONEncoder(json.JSONEncoder):
        def default(self, o):
            return asdict(o)


db_init= DB_INIT()

(students,universities)= db_init.place()
students_json= []
universities_json= []

for st in students:
    students_json.append(json.dumps(st, cls=DataclassJSONEncoder))

for uni in universities:
    universities_json.append(json.dumps(uni, cls=DataclassJSONEncoder))

students_json= json.dumps(students_json)
universities_json= json.dumps(universities_json)


 