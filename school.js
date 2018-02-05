
var allStudents = [max];
var allTeachers = [snape];
var allSections = [math];
function clearConfirms(){
    return document.getElementById("confirm").innerHTML =" ";
}
function clearErrors(){
    return document.getElementById("error").innerHTML =" ";
}

function addTeacher(){
    var fn = document.getElementById("tFirst").value;
    var ln = document.getElementById("tLast").value;
    if(fn.length <1){
        clearConfirms();
        return document.getElementById("error").innerHTML ="Error: Please add a first name to teacher  <i class='fa fa-cog fa-spin' style='font-size:24px'></i>";


    }
    if(ln.length <1){
        clearConfirms();
        return document.getElementById("error").innerHTML ="Error: Please add a last name to teacher  <i class='fa fa-cog fa-spin' style='font-size:24px'></i>";

    }
    var subject  = document.getElementById("subject").value;
    var newTeacher = new Teacher(fn,ln,subject);
    allTeachers.push(newTeacher);
    console.log(allTeachers);
    constructBoxes();
    document.getElementById("confirm").innerHTML= "Teacher Added";
    clearBoxes();
    clearErrors();
}
function addStudent() {
    var fn = document.getElementById("sFirst").value;
    var ln = document.getElementById("sLast").value;
    if(fn.length <1){
        clearConfirms();
        return document.getElementById("error").innerHTML ="Error: Please add a first name to student  <i class='fa fa-cog fa-spin' style='font-size:24px'></i>";


    }
    if(ln.length <1){
        clearConfirms();
        return document.getElementById("error").innerHTML ="Error: Please add a last name to student  <i class='fa fa-cog fa-spin' style='font-size:24px'></i>";

    }
    var grade = document.getElementById("grade").value;
    var newStudent = new Student(fn, ln, grade);
    allStudents.push(newStudent);
    console.log(allStudents);
    constructBoxes();
    document.getElementById("confirm").innerHTML= "Student Added";
    clearBoxes();
    clearErrors()

}
function addSection() {
    var size = document.getElementById("sectionSize").value;
    var sectionName = document.getElementById("sectionName").value;
    if(isNaN(size) === true){
        return document.getElementById("error").innerHTML ="Please only use numbers for section size.";
    }
    if(size>50){
        return document.getElementById("error").innerHTML ="Maximum size for a section is 50";
    }
    var newSection = new Section(sectionName,size);
    console.log(newSection);
    allSections.push(newSection);
    constructBoxes();
    document.getElementById("confirm").innerHTML= "Section Added";
    clearBoxes();
    clearErrors();
}

function listNames(){
    var lists = document.getElementById("listNames").value;
    var itemsListed = "<table id = 'itemsTable' class='table table-striped' border = '0'>";
    if(lists ==="students") {
        itemsListed += "<tr><td> First Name</td><td>Last Name</td><td>Grade</td>"
        for (var i = 0; i < allStudents.length; i++) {
            itemsListed += "<tr><td>" + allStudents[i].firstName + "</td>";
            itemsListed += "<td>" + allStudents[i].lastName+ "</td>";
            itemsListed += "<td>"+ allStudents[i].grade+ "</td><tr/>";
        }
    }
    if(lists ==="teachers"){
        itemsListed += "<tr><td> First Name</td><td>Last Name</td><td>Subject</td>"
        for(var k = 0; k<allTeachers.length; k++) {
            itemsListed += "<tr><td>" + allTeachers[k].firstName + "</td>";
            itemsListed += "<td>" + allTeachers[k].lastName+ "</td>";
            itemsListed += "<td>" + allTeachers[k].sub + "</td><tr/>"
        }
    }
    if(lists==="sections"){
        itemsListed += "<tr><td> Section Name</td><td>Section Size</td>"
        for(var l = 0; l<allSections.length; l++) {
            itemsListed +="<tr><td>" +allSections[l].sectionName+ "</td><td>"+allSections[l].sectionSize+ "</td></tr>"
        }
    }
    console.log(itemsListed);
    document.getElementById("items").innerHTML = itemsListed;
    clearErrors()
    clearConfirms()

}

function studentSearcher(){
    var student = document.getElementById("studentDesired").value;
    var studentsWanted = [];
    var studentsReturned = "<table id ='studentSearched' border ='1'><tr> <td>First Name</td><td>Last Name</td><td>Section</td></tr>";
    for(var i = 0; i<allStudents.length; i ++){
        if(student ===allStudents[i].firstName){
            studentsWanted.push(allStudents[i]);
        }
    }
    for(var p =0;p<allSections.length;p++) {
        for (var k = 0; k < studentsWanted.length; k++) {
            for (var s = 0; s < allSections[p].studentsInSection.length; s++) {
                if (allSections[p].studentsInSection[s] === studentsWanted[k]) {
                    studentsReturned += "<tr><td>" + studentsWanted[k].firstName + "</td><td>" + studentsWanted[k].lastName + "</td><td>" + allSections[p].sectionName + "</td></tr>";
                }
            }
        }
    }

    document.getElementById("studentResults").innerHTML=studentsReturned;
    clearErrors()
}

function formSection(){
    var student = idSearcher(parseInt(document.getElementById("studentPool").value));
    var section = idSearcher(parseInt(document.getElementById("sectionPoolS").value));
    console.log(section);
    console.log(student);
    console.log(teacher);
    section.addStudentToSection(student);
    console.log(section.teacher);
}

function addTeachersToSection(){
    var teacher = idSearcher(parseInt(document.getElementById("teacherPool").value));
    var section = idSearcher(parseInt(document.getElementById("sectionPoolT").value));
    console.log(section);
    console.log(teacher);
    section.addTeacherToSection(teacher);
    console.log(section.teacher);
}

function studentsInSection(){
    var section=idSearcher(parseInt(document.getElementById("removerSections").value));
    console.log(parseInt(document.getElementById("removerSections").value));
    console.log(section);
    var students = "<table id='studentsRemovable' border = '1'> ";
    if(section.studentsInSection.length <=0){
        return document.getElementById("studentsDisplayed").innerHTML = "There are no students in selected section";

    }
    for(var i=0; i<section.studentsInSection.length; i++){
        students+="<tr><td>"+section.studentsInSection[i].firstName+ "</td><td>" +section.studentsInSection[i].lastName+"</td>"
        students+= "<td><button value='" + section.studentsInSection[i].id + "'id ='" +
            section.studentsInSection[i].id + "' onclick= removeStudents(this.value," + section.id + ")>Remove Student</button></td>";
    }
    students += "</table>";
    document.getElementById("studentsDisplayed").innerHTML = students;
}

function removeStudents(studentId,sectionId){
    console.log(sectionId);
    console.log(studentId);
    var sD =document.getElementById("studentsDisplayed");

    var section = idSearcher(parseInt(sectionId));
    section.removeStudentFromSection(parseInt(studentId));
    studentsInSection();
    console.log(section.studentsInSection);
}

