# State Diagrams

## Table Of Contents
1. [Pre-Approval](#pre)
2. [Course Request](#course)
3. [Instructor](#instructor)
4. [Coordinator](#coordinator)
4. [Student](#student)



## Pre-Approval Form <a name= "pre"></a>

```mermaid
stateDiagram
cpa: Created Pre-Approval
rpa: Reviewed Pre-Approval
apa: Approved Pre-Approval

[*] --> cpa: Pre-Approval form is created by the ongoing student

cpa --> rpa: Pre-Approval form is reviewed by the department coordinator

rpa --> rpa: rejected
rpa --> apa: approved

apa --> [*]
```
## Course Request <a name= "course"></a>
```mermaid
stateDiagram
cr: Course Request
rur: Request Under Review
ca: Course Approved
dr: Request Declined
catf: Course Added To Pre-Approval form
uf: Form Uploaded

[*] --> cr: Course Request Created
cr --> rur: Request Reviewed
rur --> ca: Request approved
rur --> dr: Request declined
dr --> rur: New Course Request
dr --> uf

ca --> catf: Course is taken
catf --> uf

uf --> [*]

```

## Instructor Roles <a name= "instructor"></a>
```mermaid
stateDiagram
i: Instructor
vcr: View Course Request
vs: View & Download Syllabus
cra: Course Request Approved
crr: Course Request Rejected

[*] --> i: logged in
i --> vcr: has course requests

vcr --> vs
vs --> cra: accept
vs --> crr: reject

cra --> [*]
crr --> [*]
```

## Coordinators <a name= "coordinator"></a>
```mermaid
stateDiagram
c: Coordinator
dc: Department Coordinator
ec: Exchange Coordinator
tnp: Track Nomination Process
vpf: View Pre-Approval Form
vla: View Learning Agreement
fa1: Form Approved
fa2: Form Approved
srf1: Student Re-uploads form
srf2: Student Re-uploads form
ul: Upload Students List

[*] --> c: logged in
c --> dc
c --> ec: responsible for nominations

ec --> tnp

dc --> vpf
vpf --> fa1: accept
vpf --> srf1: reject
srf1 --> vpf

dc --> vla

vla --> fa2: accept
vla --> srf2: reject
srf2 --> vla

dc --> ul
ul --> ul: delete file
```

## Student <a name= "student"></a>
```mermaid
stateDiagram
s: Student

os: Outgoing Student
vupl: View University Placement List
uf: Upload Forms
wl: Wait List

epu: Erasmus Process Unsuccesfull
cr: Course Request
upf: Upload Pre-Approval Form

actpf: Add Course To Pre-Approval Form
ula: Upload Learning Agreement
sep: Succesfull Erasmus Process

[*] --> s: logged in

ula --> ula: delete file

s --> os: placed in foreign schools

os --> vupl
vupl --> uf: accept
vupl --> wl: reject
wl --> uf: replacement
wl --> wl: early reject
wl --> epu: no replacement or quit waitlist

uf --> cr
uf --> upf

cr --> actpf: accepted
cr --> upf: rejected
upf --> upf: rejected
actpf --> upf: accpted
upf --> ula: accepted
ula --> ula: rejected
ula --> sep: accepted
```


