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

function sendEmail($data){
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    $email = $data['email'];
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $payment = $data['paymentMethod'];
    $classType = $data['classType'];

    // Required variables
    $FROMEMAIL  = '"Intuit Yoga" <intuitYoga@gmail.com>';
    $TOEMAIL    = $email;
    $SUBJECT    = "Thanks for Signing up!";

    $message = `
        <body>
            <h1>Hi $firstName!</h1>
            <p>Thanks for signing up for Intuit Yoga and Educational Services!</p>
            <p>Your class info is listed below:</p>

            <p>Name: $firstName $lastName</p>
            <p>Payment Method: $payment</p>
            <p>Class Type: $classType$</p>
            <p><Class Date: $/p>
            <p>Class Time: $</p>

            <p>Best,</p>
            <p>Intuit Yoga</p>
        </body>
    `;
    // $RANDOMHASH = "anyrandomhash";
    // $FICTIONALSERVER = "@email.myownserver.com";
    // $ORGANIZATION = "myownserver.com";


    
    // Basic headers
    $headers = "From: ".$FROMEMAIL."\n";
    $headers .= "Reply-To: ".$FROMEMAIL."\n";
    $headers .= "Return-path: ".$FROMEMAIL."\n";
    // $headers .= "Message-ID: <".$RANDOMHASH.$FICTIONALSERVER.">\n";
    $headers .= "X-Mailer: Your Website\n";
    // $headers .= "Organization: $ORGANIZATION\n";
    $headers .= "MIME-Version: 1.0\n";

    $headers .= "Content-type: text/html\r\n";

    // Convert plain text body to quoted printable
    $message = quoted_printable_encode($message);

    // Create a BASE64 encoded subject
    $subject = "=?UTF-8?B?".base64_encode($SUBJECT)."?=";

    // Send email
    mail($TOEMAIL, $subject, $message, $headers, "-f".$FROMEMAIL);
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