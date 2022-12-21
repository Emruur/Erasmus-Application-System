# Sequence Diagrams

## Table Of Contents
1. [Send Message](#send)
2. [Accept Reject Mandatory Course](#armc)
3. [Approve Reject Pre-Approval Form](#arpf)
4. [Approve Reject Learning Agreemnet Form](#arlaf)
5. [Upload Task Document](#utd)
6. [Edit Student Profile](#esp)
7. [Edit FAQ](#ef)


## Send Message <a name="send"></a>
```mermaid
sequenceDiagram
    User->>Message: 1) View Messages

    alt
        User->>Message: 2) Send Message
    else 
        User->>Message: 3) Reciewe Message
    end
```

## Accept Reject Mandatory Course <a name="armc"></a>
```mermaid
sequenceDiagram
    actor Student
    actor Instructor
    actor Department Coordinator
    
    Student ->> Course: 1) Upload Syllabus

    alt
        Instructor ->> Course: 2) Reject Course
    else
       Instructor ->> Course: 3) Accept Course 
       Department Coordinator ->> Course: 3.1) View Approved Course
    end
```
## Approve / Reject Preapproval Form <a name="arpf"></a>
```mermaid
sequenceDiagram
    actor Student
    actor Department Coordinator

    Student ->> Document: 1) Fill Approval Form

    alt
        Department Coordinator ->> Document: 2) Reject Form
    else
        Department Coordinator ->> Document: 3) Approve Form
        Document ->> Student_: 4) Update Status
    end

```

## Approve / Reject Learning Agreement <a name="arlaf"></a>


```mermaid
sequenceDiagram
actor Student
    actor Department Coordinator

    Student ->> Document: 1) Fill Learning Agreement Form

    alt
        Department Coordinator ->> Document: 2) Reject Form
    else
        Department Coordinator ->> Document: 3) Approve Form
        Document ->> Student_: 4) Update Status
    end
```

## Upload Task Document <a name="utd"></a>
```mermaid
sequenceDiagram
actor Exchange and Department Coordinator
actor Nomination Coordinator
actor Student

Exchange and Department Coordinator ->> Task: 1) Create Task
Exchange and Department Coordinator ->> Task: 2) Assign Task

Nomination Coordinator ->> Task: 3) Approve Task
Student ->> Task: 4) Upload Task Document
```
## Edit Student Profile <a name="esp"></a>
```mermaid
sequenceDiagram

actor Student
    alt
        Student ->> Student_: 1) Edit Name 
    else
        Student ->> Student_: 2) Edit Age
    else
        Student ->> Student_: 3) Edit Photo 

    end
```

```mermaid
sequenceDiagram
actor Exchange Student Advisor

Exchange Student Advisor ->> Faq: 1)Edit FAQ

alt
    Faq ->> ErasmusSystem :1.1) Check if authorized
    ErasmusSystem -->> Faq: 2) authorized

else
    ErasmusSystem -->> Faq: 1.1.1) not authorized
end
```

```mermaid
sequenceDiagram
actor Student

Student ->> Student_: 1) Edit status
alt
    Student_ ->> ErasmusSystem: 1.1) Check if placement rejected
    Student_ ->> ErasmusSystem: 1.2) Check if waitlist enrolled
    ErasmusSystem -->>Student_: 2)Placement rejected || waitlist enrolled == true
else
    ErasmusSystem -->>Student_: 1.3)Placement rejected || waitlist enrolled == false
end
```
