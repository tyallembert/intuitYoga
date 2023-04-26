<?php 


$action = $_POST['action'];

if($action == "signup"){
    addNewUser($_POST);
}
else if($action == "getClasses"){
    echo readJSON('data/classes.json');
}
else if($action == "getParticipants"){
    echo readJSON('data/allSignups.json');
}

// function to add a new user
function addNewUser($data){
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $email = $data['email'];
    $phoneNum = $data['phoneNumber'];
    $experience = $data['experience'];
    $cost = $data['cost'];
    $paymentMethod = $data['paymentMethod'];
    $classType = $data['classType'];
    $classID = $data['classID'];

    $randomString = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 10);

    $newUser = array(
        "userID" => $randomString,
        "firstName" => $firstName,
        "lastName" => $lastName,
        "email" => $email,
        "phoneNumber" => $phoneNum,
        "experience" => $experience,
        "cost" => $cost,
        "paymentMethod" => $paymentMethod,
        "classType" => $classType,
        "classID" => $classID
    );

    $currentUsers = json_decode(readJSON('data/allSignups.json'), true);

    $currentUsers[] = $newUser;

    echo json_encode($currentUsers);

    writeJSON('data/allSignups.json', $currentUsers);
}

// function to read from a file
function readJSON($file){
    $json = NULL;
    try{
        $json = file_get_contents($file);
    }
    catch(Exception $e){
        $json = [];
    }
    // $json_data = json_decode($json, true);
    return $json;
}
// function to write from a file
function writeJSON($file, $data){
    $json = json_encode($data);
    file_put_contents($file, $json);
}

?>