# ACTIVITY DIAGRAMS
## Table of contents
1. [FAQ Related Diagrams](#faq)
    1. [Adding](#adding)
    2. [Editing](#editing)
    3. [Deleting](#deleting)
2. [Sending & Receiving Messages](#messages)
3. [Editing Student Profiles](#profiles)
4. [Pre Approval Forms](#forms)
5. [Learning Agreements](#learning)
6. [Course Agreement](#course)
6. [Tasks](#tasks)

## FAQ Related Diagrams <a name="faq"></a>
### Activity Diagram Of Adding FAQ  <a name="adding"></a>


```mermaid
flowchart TD
  ia{Is authorized?}
  ea(Enter Answer)
  eq(Enter Question)
  pf(Post FAQ)

  vf(View FAQ)
  af(Add FAQ)

  s((start))
  e(((end)))
  
  s --> vf

  vf --> af
  af --> ia

  ia -->|Yes|eq
  ia -->|No| vf
  
  eq --> ea
  ea --> pf

  pf --> e
```


### Activity Diagram Of Editing FAQ <a name="editing"></a>

```mermaid
flowchart TD
s((start))
e(((end)))

vf(View FAQ)
ef(Edit FAQ)

ha{Has Authority \n To Edit?}
save{Save?}

eq(Edit Question)
ea(Edit Answer)
eq1(Edit Question)
ea1(Edit Answer)

black1[*-*-*-*-*-*-*-*]
black2[*-*-*-*-*-*-*-*]

style black1 fill: black, color: black, stroke: black;
style black2 fill: black, color: black, stroke: black;

s --> vf
vf --> ef
ef --> ha

ha -->|No|vf
ha -->|Yes|black1

black1 --> eq
black1 --> ea
eq --> ea1
ea --> eq1
ea1 --> black2
eq1 --> black2

black2 --> save

save -->|Yes|e
save -->|No|ef
```



### Activity Diagram Of Deleting FAQ <a name="deleting"></a>
```mermaid
flowchart TD
s((start))
e(((end)))

vf(View FAQ)
sf(Select FAQ)
df(Delete FAQ)

ha{Has Authority \nTo Edit?}

s --> vf
vf -->  sf
sf --> ha

ha --> |No|vf
ha --> |Yes|df

df --> e
```

## Activity Diagram For Sending & Receiving Messages <a name="messages"></a>
```mermaid
flowchart TD
s((start))
e(((end)))

black1[*-*-*-*-*-*-*-*]
black2[*-*-*-*-*-*-*-*]

style black1 fill: black, color: black, stroke: gray;
style black2 fill: black, color: black, stroke: gray;

vm(View Messages)
ctp(Choose Target Person)
sm(Send Message)
rr(Reciewe Response)
ce(Communication Established)
n(Notification)
w(Wait 10 seconds)

s --> vm
vm --> ctp
ctp --> black1

black1 --> sm
black1 --> rr

rr --> w

sm --> black2
w --> black2

black2 --> ce
ce --> n
n --> e
```

## Activity Diagram For Editing Student Profiles <a name="profiles"></a>

```mermaid
flowchart TD
s((start))
e(((end)))

b1[*-*-*-*-*-*-*-*]
b2[*-*-*-*-*-*-*-*]
b3[*-*-*-*-*-*-*-*]
b4[*-*-*-*-*-*-*-*]

style b1 fill: black, color: black, stroke: gray;
style b2 fill: black, color: black, stroke: gray;
style b3 fill: black, color: black, stroke: gray;
style b4 fill: black, color: black, stroke: gray;

cl{Choose Feature\n To Be Edited}
sure{Are You Sure}

vsp(View Student Profile)
esp(Edit Student Profile)

en(Edit Name)
ea(Edit Age)
ep(Edit Photo)
es(Edit Status)
sc(Save Changes)
rs(Reject School)
etwl(Enroll To Wait List)
cs(Choose School)
n(Notification)
uq(Update Quota)
uw(Update Waitlist)

subgraph Coordinator
n --> b3
b3 --> uq
b3 --> uw

uq --> b4
uw --> b4
b4 --> e

end

subgraph Student
  s --> vsp
  vsp --> esp
  esp --> cl

  cl --> en
  cl --> ea
  cl --> ep
  cl --> es

  ea --> sc
  en --> sc
  ep --> sc

  es --> b1
  b1 --> rs
  b1 --> etwl

  etwl --> cs
  cs --> b2
  rs --> b2

  b2 --> sure

  sure -->|No|es
  sure -->|Yes|n

  sc --> e
end
```

## Activity Diagram For Pre Approval Forms <a name="forms"></a> 

```mermaid
flowchart TD
s((start))
e(((end)))

b1[*-*-*-*-*-*-*-*]
b2[*-*-*-*-*-*-*-*]


style b1 fill: black, color: black, stroke: gray;
style b2 fill: black, color: black, stroke: gray;


vdp(View Document Page)
cpf(Choose Pre-Approval Form)
upf(Upload Pre_approval Form)
dpf(Delete Pre-Approval From)

save{Save?}
d{Decision?}

vpf(View Pre-Approval Forms)
apf(Approve Pre-Approval Form)
rpf(Reject Pre-Approval From)

n1(Notification)
n2(Notification)

us(Update Status)

subgraph Student
  s --> vdp
  vdp --> cpf
  cpf --> b1

  b1 --> upf
  b1 --> dpf

  upf --> b2
  dpf --> b2

  b2 --> save

  save -->|No|vdp
  

  
end

subgraph Department_Coordinator
  save -->|Yes|vpf
  vpf --> d
  d --> apf
  d --> rpf

  apf --> n1
  rpf --> n2

  n1 --> us
  us --> e
  n2 --> vdp
end

```

## Activity Diagram For Learning Agreements  <a name="learning"></a> 
```mermaid
flowchart TD
s((start))
e(((end)))

b1[*-*-*-*-*-*-*-*]
b2[*-*-*-*-*-*-*-*]


style b1 fill: black, color: black, stroke: gray;
style b2 fill: black, color: black, stroke: gray;


vdp(View Documents Page)
cpf(Choose Learning Agreement)
upf(Upload Learning Agreement Form)
dpf(Delete Learning Agreement From)

save{Save?}
d{Decision?}
ha{Pre-Approval approved?}

vpf(View Learning Agreement Forms)
apf(Approve Learning Agreement Form)
rpf(Reject Learning Agreement From)

n1(Notification)
n2(Notification)

us(Update Status)

subgraph Student
  s --> vdp
  vdp --> cpf
  cpf --> ha
  ha --> |Yes|b1
  ha --> |No| vdp

  b1 --> upf
  b1 --> dpf

  upf --> b2
  dpf --> b2

  b2 --> save

  save -->|No|vdp
  

  
end

subgraph Department_Coordinator
save -->|Yes|vpf
  vpf --> d
  d --> apf
  d --> rpf

  apf --> n1
  rpf --> n2

  n1 --> us
  us --> e
  n2 --> vdp
end
```

## Activity Diagram For Courses <a name="course"></a> //TODO

```mermaid
flowchart TD
s((start))
e(((end)))
b1[*-*-*-*-*-*-*-*]
b2[*-*-*-*-*-*-*-*]


style b1 fill: black, color: black, stroke: gray;
style b2 fill: black, color: black, stroke: gray;
vcp(View Courses Page)
ci(Choose Instructor)
sci(Specify The Course Information)
ucs(Upload Course Syllabus)
dcs(Delete Course Syllabus)
save{save?}
vs(View Syllabi)

decision{decision}

aamc(Accept as mandatory course)
ramc(Reject as mandtory course)
n1(Notification)
n2(Notification)
vac(View approved courses)
vpf(Verify prepared form)

subgraph Student
  s --> vcp
  vcp --> ci
  ci --> sci
  sci --> b1
  b1 --> ucs
  b1 --> dcs

  ucs --> b2
  dcs --> b2

  b2 --> save
  save -->|No|vcp
  
end

subgraph Instructor
  vs --> decision

  decision --> |Accept as mandatory course|n1
  

  decision --> |Reject as mandatory course|n2
  n2 --> vcp

  save -->|Yes|vs
end

subgraph Department Coordinator
n1 --> vac
  vac --> vpf
  vpf --> e
end
```

## Activity Diagram For Tasks <a name="tasks"></a> 

```mermaid
flowchart TD
s((start))
e(((end)))

b1[*-*-*-*-*-*-*-*]
b2[*-*-*-*-*-*-*-*]


style b1 fill: black, color: black, stroke: gray;
style b2 fill: black, color: black, stroke: gray;

ct(Create task)
at(Assign task)
sr(Send Reminder)
cat(Cancel Task)

isdone{Is done?}
cts(Change task status to done)

utd(Upload task document)
mta(Make the tasked approval)

s --> ct
subgraph Exchange Coordinator
  subgraph Department Coordinator
    ct --> at
    at --> b1
    b1 --> sr
    b1 --> cat
    
    sr --> b2
    b2 --> isdone
    isdone -->|Yes|cts
    isdone -->|No|b1
  
    
    subgraph Nomination Coordinator
      subgraph Instructor
        
        mta --> b2
        subgraph Student
           utd --> b2
        end
      end
    end
    b1 --> mta
    cat --> b2
    b1 --> utd

  end
end
cts --> e
```
