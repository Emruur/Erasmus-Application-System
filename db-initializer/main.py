# -*- coding: utf-8 -*-
import csv
from dataclasses import dataclass, field
import names
import random
from supabase import create_client
import json



@dataclass
class Student:
    first_name: str
    last_name: str
    student_id: int
    faculty: str
    department: str
    degree: str
    transcript_grade_4: float
    transcript_grade_100: float
    transcript_grade_contribution: float
    total_points: float
    erasmus_cgpa: float
    ue_se: int
    uecgpa: float
    eng_101: str
    eng_102: str
    lang_points: int
    duration: str
    preferred_universities: list[str] = field(default_factory=list)
    placed_university: str = field(default_factory=str)

    def generate_map(self)-> dict:
        return {
            "name": self.first_name +" "+self.last_name,
            "placement": self.placed_university,
            "points": self.total_points
        }
        
@dataclass
class University:
    name: str
    quota: int
    lang_req: str
    lang_req_other: str
    coordinator: str
    placed_students: list[Student] = field(default_factory=list)
    waiting_students: list[Student] = field(default_factory=list)

    def generate_map(self)-> dict:
        return {
            "name": self.name,
            "coordinator": self.coordinator,
            "quota": self.quota,
            "placed_students": len(self.placed_students)
        }


class DB_INIT:
    def resetPlacement(self):
        self.supabase.table('University').update({"currentStudentNumber": 0}).gt(
            "currentStudentNumber", 0).execute()

    def insertPlacement(self):
        for student in self.students:
            user = self.supabase.auth.sign_up(email=student.first_name + "." + student.last_name + "@ug.bilkent.com", password=1234567, options= {
                'role': "OutgoingStudent",
                'userId': student.student_id
            })
            auth_id= user.id
            data = {
                'hasSubmittedPa': False,
                'preApprovalFormId': -1,
                "isPlaced": (len(student.placed_university) != 0),
                "isPlacementRejected": False,
                "preferedUniversity1": student.preferred_universities[0],
                "preferedUniversity2": student.preferred_universities[1],
                "preferedUniversity3": student.preferred_universities[2],
                "preferedUniversity4": student.preferred_universities[3],
                "preferedUniversity5": student.preferred_universities[4],
                "university": "Bilkent University",
                "placed_university": student.placed_university,
                "cgpa": student.erasmus_cgpa,
                "learning_agreement": -1,
                "hasSubmittedLa": False,
                "laDocumentId": -1,
                "name": student.first_name,
                "surname": student.last_name,
                "email": student.first_name + "." + student.last_name + "@ug.bilkent.com",
                "phone": -1,
                "bilkent_id": student.student_id}
            self.supabase.table('OutgoingStudent').insert(data).execute()
        
        for uni in self.universities:
            self.supabase.table('University').update({"currentStudentNumber": len(uni.placed_students)}).eq("name", uni.name).execute()

    def place(self) -> tuple[list[Student],list[University]]:
        breakpt1 = False

        for student in self.students:
            breakpt1 = False
            for uni in student.preferred_universities:
                for uniObj in self.universities:
                    if (uni == uniObj.name and len(uniObj.placed_students) < uniObj.quota):
                        student.placed_university = uniObj.name
                        uniObj.placed_students.append(student)
                        breakpt1 = True
                        break
                if (breakpt1):
                    break

        placedCount = 0
        studentId = 2
        for student in self.students:
            if (len(student.placed_university) != 0):
                placedCount = placedCount + 1
                print(str(studentId) + ": " + student.placed_university)
            studentId = studentId + 1

        print("Total number of placed students: " + str(placedCount))

        return (self.students, self.universities)

    def __init__(self):
        API_URL = "https://uivukmakozginistjwru.supabase.co"
        API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdnVrbWFrb3pnaW5pc3Rqd3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkwMjIxOTEsImV4cCI6MTk4NDU5ODE5MX0.aRryO_aWjHcZevo3_dS711x3xCSeoZOvS8WwsoW9dxs"

        self.supabase = create_client(API_URL, API_KEY)

        fields = []
        rows = []

        filename = 'proper.csv'

        with open(filename, 'r',encoding = "ISO-8859-1") as csvfile:
            csvreader = csv.reader(csvfile, delimiter=";")
            fields = next(csvreader)

            for row in csvreader:
                res = [sub.replace(',', '.') for sub in row]
                rows.append(res)

        # Initialize Students
        self.students: list[Student] = []
        for row in rows:
            first_name = names.get_first_name()
            last_name = names.get_last_name()
            student_id = random.randint(10000000, 99999999)
            c = 0
            student = Student(first_name, last_name, student_id, row[c], row[c+1],
                              row[c+2], row[c+3], row[c +
                                                      4], row[c+5], row[c+6], row[c+9],
                              row[c+10], row[c+11], row[c+12], row[c+13], row[c+14], row[c+17])
            for uni in row[c+18:c+23]:
                student.preferred_universities.append(uni)
            self.students.append(student)

        self.universities: list[University] = []
        self.universities.append(University(
            "Technical University of Berlin", 2, "English B2", "German A2", "Can Alkan"))
        self.universities.append(University(
            "AGH University of Science and Technology", 2, "English B2", None, "Ayşegül Dündar"))
        self.universities.append(University(
            "ESIEE Paris", 4, None, None, None))
        self.universities.append(University("TU Universitaet Dortmund",
                                            2, None, "German B2", "Can Alkan"))
        self.universities.append(University("Vrije Üniversitesi", 2,
                                            "English B2", None, "Ayşegül Dündar"))
        self.universities.append(University("Roskilde Universitesi",
                                            2, "English B2", None, "Ayşegül Dündar"))
        self.universities.append(University(
            "Universita degli Studi di L&#039;Aquila", 2, "English B1", None, "Ayşegül Dündar"))
        self.universities.append(University(
            "École Polytechnique Fédérale (EPF)", 2, "English B2", None, "Ayşegül Dündar"))
        self.universities.append(University("Kingston University",
                                            2, "English B2", None, "Can Alkan"))
        self.universities.append(University(
            "Ecole Pour Linformatique Et Les Techniques Avancees (EPITA)", 2, "English B2", "French B2", "Can Alkan"))
        self.universities.append(University("Saarland Üniversitesi",
                                            2, "English B2", None, "Can Alkan"))
        self.universities.append(University(
            "ESIEA (Ecole Superieure d&#039;Informatique, Electronique et Automatique)", 4, "English B2", None, "Can Alkan"))
