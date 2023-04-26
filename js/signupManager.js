class signupManager {
    constructor(){
        this.allClasses = new Array();
        this.allParticipants = new Array();
        this.submissionError = ``;

        this.firstName = $("#firstName").val();
        this.lastName = $("#lastName").val();
        this.email = $("#email").val();
        this.phoneNumber = $("#phoneNumber").val();
        this.experience = "Beginner";
        this.paymentMethod = "venmo";
        this.classType = "session";
        // this.cost = "";
        this.classID = "";
    }
    // ===Getters===
    getExperience(){
        $(".experience_element").each(function() {
            if($(this).hasClass("active_experience")){
                return $(this).first().text().trim();
            }
        });
    }
    getCost(){
        $(".cost_div").each(function() {
            if($(this).hasClass("active_cost")){
                return $(this).first().text().trim();
            }
        });
    }
    getClassID(){
        $(".class_element").each(function() {
            if($(this).hasClass("active_class")){
                return $(this).id;
            }
        });
    }
    getAllClasses(){
        this.allClasses = [];

        let action = "getClasses";
        let ajaxurl = 'handleSignup.php';

        let data = {
                    'action': action
                };
        $.post(ajaxurl, data, (response) => {
            //response is array of user data, which we can parse
            let classes = JSON.parse(response);
            this.allClasses = classes;
            this.showClassesWindow();
        });
    }
    getAllParticipants(){
        this.allParticipants = [];

        let action = "getParticipants";
        let ajaxurl = 'handleSignup.php';

        let data = {
                    'action': action
                };
        $.post(ajaxurl, data, (response) => {
            //response is array of user data, which we can parse
            let participants = JSON.parse(response);
            this.allParticipants = participants;
        });
    }
    //===Setters===
    setWhichClass(sender){
        $(".class_element").each(function() {
            if($(this).hasClass("active_class")){
                $(this).removeClass("active_class");
            }
        });
        sender.classList.add("active_class");
        this.classID = sender.id;
    }
    setExperienceLevel(sender){
        $(".experience_element").each(function() {
            if($(this).hasClass("active_experience")){
                $(this).removeClass("active_experience");
            }
        });
        sender.classList.add("active_experience");
        this.experience = sender.children[0].textContent.trim();
    }
    setPaymentType(sender){
        $(".payment_method").each(function() {
            $(this).addClass("innactive_payment");
            if($(this).hasClass("active_payment")){
                $(this).removeClass("active_payment");
            }
        });
        sender.classList.remove("innactive_payment")
        sender.classList.add("active_payment");
        this.paymentMethod = sender.children[0].textContent.trim();
        $(".class_cost_container").css('display', 'flex');

        if(sender.children[0].innerHTML.trim() == "venmo"){
            $(".payment_message").empty();
            $(".payment_message").append(
                `<p>Venmo: @Molly-Stoner-3</p>`
            );
        }else{
            $(".payment_message").empty();
            $(".payment_message").append(
                `<p>Bring the check into the next class session</p>`
            );
        }
    }
    setCost(sender){
        $(".cost_div").each(function() {
            if($(this).hasClass("active_cost")){
                $(this).removeClass("active_cost");
            }
        });
        sender.classList.add("active_cost");
        this.cost = sender.children[0].textContent.trim();
    }
    // ===Signup functions===
    yogaSignup(){
        let action = "signup";
        var ajaxurl = 'handleSignup.php';

        window.scrollTo(0, 0);

        let data = {
                'action': action,
                'firstName': this.firstName,
                'lastName': this.lastName,
                'email': this.email,
                'phoneNumber': this.phoneNumber,
                'experience': this.experience,
                'cost': this.cost,
                'classType': this.classType,
                'paymentMethod': this.paymentMethod,
                'classID': this.classID
        };

        let wasThereError = this.validateInfo();
        if(!wasThereError){
            $(".error_message").empty();
            // make ajax post to PHP
            $.post(ajaxurl, data, function (response) {
                $(".success_message").css('display', 'block');
            });
        }else{
            $(".error_message").css('display', 'block');
            $(".error_message").empty();
            $(".error_message").prepend(this.submissionError);
        }
    }
    teacherSignup(){
        let action = "signup";
        var ajaxurl = 'handleSignup.php';

        this.classType = "teacherTraining";

        window.scrollTo(0, 0);

        let data = {
                'action': action,
                'firstName': this.firstName,
                'lastName': this.lastName,
                'email': this.email,
                'phoneNumber': this.phoneNumber,
                'experience': this.experience,
                'cost': this.cost,
                'classType': this.classType,
                'paymentMethod': this.paymentMethod,
                'classID': this.classID
        };

        let wasThereError = this.validateTeacherInfo();
        if(!wasThereError){
            $(".error_message").empty();
            // make ajax post to PHP
            $.post(ajaxurl, data, function (response) {
                //response is array of user data, which we can parse
                $(".success_message").css('display', 'block');
            });
        }else{
            $(".error_message").css('display', 'block');
            $(".error_message").empty();
            $(".error_message").prepend(this.submissionError);
        }
    }
    validateInfo(){
        this.submissionError = ``;
        let error = false;
        if(this.firstName == ""){
            this.submissionError+=`<p>First name cannot be left blank</p>`;
            error = true;
        }
        if(this.lastName == ""){
            this.submissionError+=`<p>Last name cannot be left blank</p>`;
            error = true;
        }
        if(this.email == ""){
            this.submissionError+=`<p>Email cannot be left blank</p>`;
            error = true;
        }
        if(this.phoneNumber == ""){
            this.submissionError+=`<p>Phone number cannot be left blank</p>`;
            error = true;
        }
        if(this.experience == ""){
            this.submissionError+=`<p>Please choose an experience level</p>`;
            error = true;
        }
        if(this.paymentMethod == ""){
            this.submissionError+=`<p>Please choose a payment method</p>`;
            error = true;
        }
        if(this.cost == ""){
            this.submissionError+=`<p>Please choose a payment amount</p>`;
            error = true;
        }
        if(this.classID == ""){
            this.submissionError+=`<p>Please choose a class to attend</p>`;
            error = true;
        }
        return error;
    }
    validateTeacherInfo(){
        this.submissionError = ``;
        let error = false;
        if(this.firstName == ""){
            this.submissionError+=`<p>First name cannot be left blank</p>`;
            error = true;
        }
        if(this.lastName == ""){
            this.submissionError+=`<p>Last name cannot be left blank</p>`;
            error = true;
        }
        if(this.email == ""){
            this.submissionError+=`<p>Email cannot be left blank</p>`;
            error = true;
        }
        if(this.phoneNumber == ""){
            this.submissionError+=`<p>Phone number cannot be left blank</p>`;
            error = true;
        }
        if(this.paymentMethod == ""){
            this.submissionError+=`<p>Please choose a payment method</p>`;
            error = true;
        }
        if(this.classID == ""){
            this.submissionError+=`<p>Please choose a class to attend</p>`;
            error = true;
        }
        return error;
    }
    // ===Keydown===
    keyDownUpdateInfo(sender){
        if(sender.id == "firstName"){
            this.firstName = sender.value;
        }
        else if(sender.id == "lastName"){
            this.lastName = sender.value;
        }
        else if(sender.id == "email"){
            this.email = sender.value;
        }
        else if(sender.id == "phoneNumber"){
            this.phoneNumber = sender.value;
        }
    }
    // ===Show Classes===
    showClassesWindow(){
        const MAX_PER_CLASS = 14;
        $(".all_classes_container").empty();
        for(var key in this.allClasses){
            if(this.allClasses[key].type == this.classType){
                var numParticipants = this.calculateParticipants(this.allClasses[key].classID);
                $(".all_classes_container").append(`
                <div onclick = "manager.setWhichClass(this)" id="${this.allClasses[key].classID}" class="class_element">
                    <p class = "class_date">${this.allClasses[key].date}</p>
                    <div class = "class_more_info">
                        <p>${this.allClasses[key].day}, ${this.allClasses[key].time}</p>
                        <p>${this.allClasses[key].experience}</p>
                        <p>Cost: ${this.allClasses[key].cost}</p>
                        <p>Remaining spaces: ${(MAX_PER_CLASS-numParticipants)}</p>
                    </div>
                </div>
                `)
            }
        }
        if($(".all_classes_container").html() == ""){
            $(".all_classes_container").append(`
            <div>
                <h2 class = "class_date">No classes available</h2>
            </div>
            `)
        }
    }
    calculateParticipants(classID){
        var numParticipants = 0;
        for(var key in this.allParticipants){
            if(this.allParticipants[key].classID == classID){
                numParticipants++;
            }
        }
        return numParticipants;
    }
    toggleClassType(sender){
        $(".which_class_title").each(function() {
            if($(this).hasClass("active_class_type")){
                $(this).removeClass("active_class_type");
            }
        });
        sender.classList.add("active_class_type");
        this.classType = sender.id;
        this.showClassesWindow();
    }
}