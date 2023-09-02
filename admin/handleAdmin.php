<?php 

$action = $_POST['action'];


if($action == "getClasses"){
    echo readJSON("../data/classes.json");
}
else if($action == "getParticipants"){
    echo readJSON("../data/allSignups.json");
}
else if($action == "addClass"){
    addClass($_POST);
}
else if($action == "removeClass"){
    removeClass($_POST);
}
else if($action == "removeParticipant"){
    removeParticipant($_POST);
}

function addClass($data){
    $date = $data['date'];
    $day = $data['day'];
    $time = $data['time'];
    $experience = $data['experience'];
    $cost = $data['cost'];
    $type = $data['type'];

    $currentClasses = json_decode(readJSON("../data/classes.json"), true);

    $randomString = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 10);

    $newClass = array(
        "classID" => $randomString,
        "date" => $date,
        "day" => $day,
        "time" => $time,
        "cost" => $cost,
        "experience" => $experience,
        "type" => $type
    );
    $currentClasses[] = $newClass;

    echo json_encode($currentClasses);

    writeJSON("../data/classes.json", $currentClasses);
}

function removeClass($data){
    $classID = $data['classID'];
    $currentClasses = json_decode(readJSON("../data/classes.json"), true);
    foreach ($currentClasses as $key => $classInfo) {
        if (!isset($classInfo['classID'])) {
            // handle the error here
            continue;
        }else{
            if ($classInfo['classID'] == $classID) {
                unset($currentClasses[$key]);
                break;
            }
        }
    }
    echo json_encode($currentClasses);
    writeJSON("../data/classes.json", $currentClasses);
}

function removeParticipant($data){
    $participantID = $data['userID'];
    $classID = $data['classID'];
    $currentParticipants = json_decode(readJSON("../data/allSignups.json"), true);
    foreach ($currentParticipants as $key => $participantInfo) {
        if (!isset($participantInfo['userID'])) {
            // handle the error here
            continue;
        }else{
            if ($participantInfo['userID'] == $participantID && $participantInfo['classID'] == $classID) {
                unset($currentParticipants[$key]);
                break;
            }
        }
    }
    echo json_encode($currentParticipants);
    writeJSON("../data/allSignups.json", $currentParticipants);
}

// function to read from a file
function readJSON($file){
    $json = file_get_contents($file);
    return $json;
}
// function to write from a file
function writeJSON($file, $data){
    $json = json_encode($data);
    file_put_contents($file, $json);
}

?>