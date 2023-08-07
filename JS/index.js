/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var baseUrl = "http://api.login2explore.com:5577";
var irl = "/api/irl";
var iml = "/api/iml";
var DBname = "SCHOOL-DB";
var relationName = "STUDENT-TABLE";
var connToken = "90931353|-31949323053461177|90950187";

$("#Roll-no").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getRollNoAsJsonObj() {
    var rollno = document.getElementById("Roll-no").value;
    var jsonStr = {
        id: rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#Full-Name").val(record.fullname);
    $("#Class").val(record.Class);
    $("#Birth-Date").val(record.birthDate);
    $("#Address").val(record.address);
    $("#Enrollment-Date").val(record.enrollDate);
}

function resetForm() {
    $("#Roll-no").val("");
    $("#Full-Name").val("");
    $("#Class").val("");
    $("#Birth-Date").val("");
    $("#Address").val("");
    $("#Enrollment-Date").val("");
    $("#Roll-no").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#Roll-no").focus();
}

function validateData() {
    var rollno, fullname, Class, birthdate, address, enroll;
    rollno = $("#Roll-no").val();
    fullname =document.getElementById("Full-Name").value;
    Class =document.getElementById("Class").value;
    birthdate = document.getElementById("Birth-Date").value;
    address =document.getElementById("Address").value;
    enroll = document.getElementById("Enrollment-Date").value;

    if (rollno === '') {
        alert("Roll no is missing");
        $("#Roll-no").focus();
        return "";
    }
    if (fullname === '') {
        alert("Full-name is missing");
        $("#Full-Name").focus();
        return "";
    }
    if (Class === '') {
        alert("Class is missing");
        $("#Class").focus();
        return "";
    }
    if (birthdate === '') {
        alert("BirthDate is missing");
        $("#Birth-Date").focus();
        return "";
    }
    if (address === '') {
        alert("Address is missing");
        $("#Address").focus();
        return "";
    }
    if (enroll === '') {
        alert("Enrollment-Date is missing");
        $("#Enrollment-Date").focus();
        return "";
    }
    var jsonStrObj = {
        id: rollno,
        fullname: fullname,
        Class: Class,
        birthdate: birthdate,
        address: address,
        enrollDate: enroll
    };
    console.log(jsonStrObj);
    return JSON.stringify(jsonStrObj);
}

function getStudentDetails() {
    var RollnoJsonObj = getRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, DBname, relationName, RollnoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, baseUrl, irl);
    jQuery.ajaxSetup({async: true});

    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#update").prop("disabled", true);
        $("#Full-Name").focus();
    } else if (resJsonObj.status === 200) {
        $("#Roll-no").prop("disabled", true);
        fillData(resJsonObj);
        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#save").prop("disabled", true);
        $("#Full-Name").focus();
    }
}

function saveData(){
    var jsonStrObj = validateData();
//    if(jsonStrObj === ""){
//        return '';
//    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, DBname, relationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, baseUrl, iml);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    console.log(jsonStrObj);
    resetForm();
    $("#Roll-no").focus();
}

function updateData(){
    $("#update").prop("disabled", true);
    var jsonUpd = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonUpd, DBname, relationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, baseUrl, iml);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#Roll-no").focus();
}