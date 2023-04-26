<!-- HOST WITH BlueHost -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intuit Yoga</title>
    <!-- ===CSS=== -->
    <link rel = "stylesheet"
    href = "../css/style.css"
    type = "text/css">
    <!-- ===JS=== -->
    <script
        src="https://code.jquery.com/jquery-3.4.1.js"
        integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
        crossorigin="anonymous"></script>
    <!-- <script src="../js/script.js" defer></script> -->
    <script src="https://kit.fontawesome.com/d8117dcf7d.js" crossorigin="anonymous"></script>
    
</head>

<body>
    <!-- =====Checks to see if logged in===== -->
<?php
$user = ""; //prevent the "no index" error from $_POST
$pass = "";
$randomString = "ksjbfjlgbaiwrgbiuSKdvsjdgflibAEOfw89wbiw4";
if (isset($_POST['username'])) { // check for them and set them so
    $user = $_POST['username'];
}
if (isset($_POST['password'])) { // so that they don't return errors
    $pass = $_POST['password'];
}    

$USERNAME = '1873b3bc82ccb0ae9b16bc6ecb6cb327';
$PASSWORD = '1ebf8799e7917bc1d67c9c0dc842e026';
$userhash = md5($user.$randomString); // hash entered user
$passhash = md5($pass.$randomString);  // hash entered pw

if ($USERNAME == $userhash && $PASSWORD == $passhash) {
    // do nothing
} else {
    header("Location: sign-in.html");
}
?>
    <div class = "admin_message_container">
        <p class = "admin_message"></p>
        <input type = 'submit'
                id = "submit"
                name = 'submit'
                value = 'Done'
                onclick="manager.hideMessagePopup()">
    </div>
    <h2 class = "admin_title">Intuit Yoga ADMIN</h2>
    <div class = "admin_classes_container">
        <div class = "admin_all_classes_nav">

        </div>
        <div class = "main_inner_container">

        </div>
    </div>
    <script src="../js/adminManager.js"></script>
    <script>
        const manager = new adminManager(); 
        manager.getAllClasses();
        manager.getAllParticipants();
    </script>
    <!-- ===Templates=== -->
    <template id = "add_class_template">
        <div class = "add_class_form">
            <h2>Add Class</h2>
            <div class="inputContainer">
                <label for = "new_date">Date</label>
                <input oninput="manager.updateInput(this)"
                placeholder="Exp. 10th - Exp. 15th"
                type = 'text'
                id = "new_date"
                name = 'new_date'
                maxlength = "50"
                value=""
                require>
            </div>
            <div class="inputContainer">
                <label for = "new_day">Day</label>
                <input oninput="manager.updateInput(this)"
                placeholder="Monday"
                type = 'text'
                id = "new_day"
                name = 'new_day'
                maxlength = "50"
                value=""
                require>
            </div>
            <div class="inputContainer">
                <label for = "new_time">Time</label>
                <input oninput="manager.updateInput(this)"
                placeholder="12:00pm - 1:00pm"
                type = 'text'
                id = "new_time"
                name = 'new_time'
                maxlength = "50"
                value=""
                require>
            </div>
            <div class="inputContainer">
                <label for = "new_experience">Experience Level</label>
                <input oninput="manager.updateInput(this)"
                placeholder="Beginner Class"
                type = 'text'
                id = "new_experience"
                name = 'new_experience'
                maxlength = "30"
                value=""
                require>
            </div>
            <div class="inputContainer">
                <label for = "new_cost">Cost</label>
                <input oninput="manager.updateInput(this)"
                placeholder="$100"
                type = 'text'
                id = "new_cost"
                name = 'new_cost'
                maxlength = "10"
                value=""
                require>
            </div>
            <div class="inputContainer">
                <div class="radioInput">
                    <input onclick="manager.updateInput(this)"
                    type = 'radio'
                    id = "new_type_individual"
                    name = 'new_type'
                    value="individual"
                    require>
                    <label class="radioLabel" for = "new_type_individual">Individual</label>
                </div>
                <div class="radioInput">
                    <input onclick="manager.updateInput(this)"
                    type = 'radio'
                    id = "new_type_session"
                    name = 'new_type'
                    value="session"
                    require>
                    <label class="radioLabel" for = "new_type_session">Session</label>
                </div>
                <div class="radioInput">
                    <input onclick="manager.updateInput(this)"
                    type = 'radio'
                    id = "new_type_teacher"
                    name = 'new_type'
                    value="teacher"
                    require>
                    <label class="radioLabel" for = "new_type_teacher">Teacher Training</label>
                </div>
            </div>
            <input type = 'submit'
                id = "submit"
                name = 'submit'
                value = 'Add Class'
                onclick="manager.addClass()">
        </div>
    </template>
</body>
</html>