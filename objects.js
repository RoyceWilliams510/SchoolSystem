
var nextId = 0;
// function Person(fn,ln) {
//     this.firstName = fn;
//     this.lastName = ln;
//     this.id = nextId++;
//
// }
function Teacher(fn,ln,subject){
    this.sub= subject;
    this.firstName = fn;
    this.lastName = ln;
    this.id = nextId++;
}


function Student(fn,ln,grade){
    this.firstName = fn;
    this.lastName = ln;
    this.grade =grade;
    this.id =nextId++;
}

var maxSize = 50;
function Section(name,size){
    //maybe put this out in school?
//    if(size>maxSize){
    this.id = nextId++;
    this.sectionName =name;
    this.sectionSize = size;
    this.studentsInSection = [];
    this.teacher = "";
    this.addStudentToSection = function(studentToAdd) {
    this.studentsInSection.push(studentToAdd);
    };
    this.addTeacherToSection = function (teacher){
    this.teacher =teacher;
    };
    this.removeStudentFromSection= function(studentId) {
        for (var i = 0; i < this.studentsInSection.length; i++) {
            if (this.studentsInSection[i].id === studentId) {
                this.studentsInSection.splice(i,1);
            }
        }
    }
}
///method that takes id and returns a student object
function idSearcher(id){
    for(var i = 0; i<allStudents.length;i++) {
        if(allStudents[i].id === id){
            return allStudents[i];
        }
    }
    for(var k=0; k<allTeachers.length; k++) {
        if (allTeachers[k].id === id) {
            return allTeachers[k];
        }
    }
    for(var p = 0; p<allSections.length; p++){
        if(allSections[p].id ===id){
            return allSections[p];
        }
    }
}
function constructBoxes(){
    var studentPool = "<option value=100>Select Student</option>";
    for(var i =0; i<allStudents.length; i++){
        studentPool += "<option value =" + allStudents[i].id + ">"+ allStudents[i].firstName
            + " "+ allStudents[i].lastName + "</option>";
    }
    document.getElementById("studentPool").innerHTML = studentPool;
    var teacherPool = "<option value=100>Select Teacher</option>";
    for(var k =0; k<allTeachers.length; k++){
        teacherPool += "<option value =" + allTeachers[k].id + ">"+ allTeachers[k].firstName
            + " "+ allTeachers[k].lastName + "</option>";
    }
    var sectionPool = "<option value=100>Select Section</option>";
    document.getElementById("teacherPool").innerHTML = teacherPool;
    for(var l =0; l<allSections.length; l++) {
        sectionPool += "<option value =" + allSections[l].id + ">" + allSections[l].sectionName + "</option>";
    }
    document.getElementById("sectionPoolS").innerHTML = sectionPool;
    document.getElementById("sectionPoolT").innerHTML = sectionPool;
    document.getElementById("removerSections").innerHTML = sectionPool;
}

function clearBoxes() {
    var boxes = document.getElementsByTagName("input");
    for (var i=0; i<boxes.length; i++) {
        if (boxes[i].type === "text") {
            boxes[i].value = "";
        }
    }
}



