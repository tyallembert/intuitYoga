class adminManager{
    constructor(){
        this.allClasses = [];
        this.allParticipants = [];
        this.activeColumns = ["firstName", "lastName", "email", "phoneNumber", "experience", "paymentMethod", "classType"];
        this.classID = "";

        this.date = "";
        this.day = "";
        this.time = "";
        this.experience = "";
        this.cost = "";
        this.type = "";

        this.adminMessageElement = $(`
        <div class = "admin_message_container">
            <divc class="adminInnerMessageContainer">
                <p class = "admin_message"></p>
                <input type = 'submit'
                        id = "submit"
                        name = 'submit'
                        value = 'Done'
                        onclick="manager.hideMessagePopup()">
            </div>
        </div>
        `);
        this.adminConfirmationElement = $(`
        <div class = "admin_message_container">
            <divc class="adminInnerMessageContainer">
                <p class = "admin_message"></p>
                <button class = "admin_confirmation_button" onclick="manager.removeClass()">Confirm</button>
                <button class = "admin_confirmation_button" onclick="manager.hideMessagePopup()">Cancel</button>
            </div>
        </div>
        `);
    }
    // ===getters===
    getAllClasses(){
        let action = "getClasses";
        let ajaxurl = '../admin/handleAdmin.php';

        let data = {
                    'action': action
                };
        $.post(ajaxurl, data, (response) => {
            //response is array of user data, which we can parse
            let classes = JSON.parse(response);
            this.allClasses = classes;
            console.log(classes);
            this.populateNavBar(classes);
        });
    }
    getAllParticipants(){
        this.allParticipants = [];

        let action = "getParticipants";
        let ajaxurl = '../handleSignup.php';

        let data = {
                    'action': action
                };
        $.post(ajaxurl, data, (response) => {
            //response is array of user data, which we can parse
            let participants = JSON.parse(response);
            // this.allClasses.push(classes);
            this.allParticipants = participants;
        });
    }
    // ===admin nav stuff===
    setWhichAdminNav(sender){
        $(".admin_nav_elements").each(function() {
            if($(this).hasClass("active_admin_nav")){
                $(this).removeClass("active_admin_nav");
            }
        });
        sender.classList.add("active_admin_nav");
        this.activeClassID = sender.id;
        this.changeHeader(sender);
        if ($(sender).find("p").text() =="Add Class"){
            $(".main_inner_container").css({"flex-direction": "row"})
        }else{
            $(".main_inner_container").css({"flex-direction": "column"})
            this.showParticipants();
        }
    }
    changeHeader(sender){
        $(".currentClassTitle").text(sender.innerText);
    }
    populateNavBar(classes){
        $(".admin_all_classes_nav").empty();
        $(".admin_all_classes_nav").append(
            `<div class = "admin_nav_elements" onclick="manager.showAddClass(this)">
                <p>Add Class</p>
            </div>`
        )
        for(var key in classes){
            if(classes[key] != {}){
                this.createAdminNavElement(classes[key]);
            }
        }
    }
    createAdminNavElement(element){
        $(".admin_all_classes_nav").append(`
            <div class = "admin_nav_elements" id="${element.classID}" onclick="manager.setWhichAdminNav(this)">
                <i class="fa-solid fa-trash" onclick="manager.showConfirmationDeleteClass(this)"></i>
                <p>${element.date}</p>
            </div>
        `)
    }
    showParticipants(){

        $(".main_inner_container").empty();

        var titleElement = $(`<div class = "main_inner_titles"></div>`);
        if(this.activeColumns.includes("firstName")){
            $(titleElement).append(`<p>First Name</p>`)
        }
        if(this.activeColumns.includes("lastName")){
            $(titleElement).append(`<p>Last Name</p>`)
        }
        if(this.activeColumns.includes("email")){
            $(titleElement).append(`<p>Email</p>`)
        }
        if(this.activeColumns.includes("phoneNumber")){
            $(titleElement).append(`<p>Phone #</p>`)
        }
        if(this.activeColumns.includes("experience")){
            $(titleElement).append(`<p>Experience</p>`)
        }
        if(this.activeColumns.includes("paymentMethod")){
            $(titleElement).append(`<p>Payment</p>`)
        }
        if(this.activeColumns.includes("classType")){
            $(titleElement).append(`<p>Class Type</p>`)
        }
        $(".main_inner_container").append(titleElement);

        let emptyParticipants = true;
        console.log(this.allParticipants)
        for(var key in this.allParticipants){
            if(this.allParticipants[key].classID == this.activeClassID){
                this.createAdminParticipantElement(this.allParticipants[key]);
                emptyParticipants = false;
            }
        }
        if(emptyParticipants){
            $(".main_inner_container").append(
                `<p class = "nobody_in_class">Nobody is signed up for this class</p>`
            )
        }
    }
    createAdminParticipantElement(participant){
        var newElement = $(`<div class = "admin_participant_element" id="participant-${participant.userID}"></div>`);
        
        $(newElement).append(`<i class="fa-solid fa-trash removeParticipantButton" onclick="manager.removeParticipant(this)"></i>`);
        if(this.activeColumns.includes("firstName")){
            console.log("adding first name")
            $(newElement).append(`<p>${participant.firstName}</p>`)
        }
        if(this.activeColumns.includes("lastName")){
            $(newElement).append(`<p>${participant.lastName}</p>`)
        }
        if(this.activeColumns.includes("email")){
            $(newElement).append(`<p>${participant.email}</p>`)
        }
        if(this.activeColumns.includes("phoneNumber")){
            $(newElement).append(`<p>${participant.phoneNumber}</p>`)
        }
        if(this.activeColumns.includes("experience")){
            $(newElement).append(`<p>${participant.experience}</p>`)
        }
        if(this.activeColumns.includes("paymentMethod")){
            $(newElement).append(`<p>${participant.paymentMethod}</p>`)
        }
        if(this.activeColumns.includes("classType")){
            $(newElement).append(`<p>${participant.classType}</p>`)
        }
        console.log(newElement)
        $(".main_inner_container").append(newElement);
    }
    toggleColumnSetting(sender){
        let column = sender.id;
        if(this.activeColumns.includes(column)){
            this.activeColumns.splice(this.activeColumns.indexOf(column), 1);
            sender.classList.remove("optionActive");
        } else {
            this.activeColumns.push(column);
            sender.classList.add("optionActive");
        }
        console.log(this.activeColumns);
        this.showParticipants();

    }
    // ===add/remove classes===
    showAddClass(sender){

        this.setWhichAdminNav(sender);

        $(".main_inner_container").empty()

        let templateClone = $("#add_class_template").clone();
        let objectClone = $("#classObjectTemplate").clone();
        $(".main_inner_container").append(templateClone.html());
        $(".main_inner_container").append(objectClone.html());
    }
    addClass(){
        let action = "addClass";
        let ajaxurl = '../admin/handleAdmin.php';

        let data = {
                    'action': action,
                    'date': this.date,
                    'day': this.day,
                    'time': this.time,
                    'experience': this.experience,
                    'cost': this.cost,
                    'type': this.type
                };
        $.post(ajaxurl, data, (response) => {
            //response is array of user data, which we can parse
            var classes = JSON.parse(response);
            console.log(classes)
            this.allClasses = classes;
            this.populateNavBar(classes);
            $(".admin_message_container").css('display', 'flex');
            $(".admin_message").text("Created new class");
            this.getAllParticipants();
        });
    }
    removeClass(sender){
        this.hideMessagePopup();
        let action = "removeClass";
        let ajaxurl = '../admin/handleAdmin.php';

        let data = {
                    'action': action,
                    'classID': this.activeClassID
                };
                console.log(data);
        $.post(ajaxurl, data, (response) => {
            console.log("RESPONSE: ")
            console.log(response);
            var classes = JSON.parse(response);
            this.populateNavBar(classes);
            $(".admin_message_container").css('display', 'flex');
            $(".admin_message").text("Removed class");
        });
    }
    updateInput(sender){
        if(sender.id == "new_date"){
            this.date = sender.value;
            $(".class_date").text(this.date);
        }
        else if(sender.id == "new_day"){
            this.day = sender.value;
            $(".dayTime").text(this.day+", "+this.time);
        }
        else if(sender.id == "new_time"){
            this.time = sender.value;
            $(".dayTime").text(this.day+", "+this.time);
        }
        else if(sender.id == "new_experience"){
            this.experience = sender.value;
            $(".experience").text(this.experience);
        }
        else if(sender.id == "new_cost"){
            this.cost = sender.value;
            $(".cost").text(this.cost);
        }
        else if(sender.name == "new_type"){
            console.log(sender.value)
            this.type = sender.value.toLowerCase();
        }
    }
    removeParticipant(sender){
        var userID = $(sender).parent().attr("id").split("-")[1];
        var classID = this.activeClassID;
        let action = "removeParticipant";
        let ajaxurl = '../admin/handleAdmin.php';

        let data = {
                    'action': action,
                    'userID': userID,
                    'classID': classID
                };
        $.post(ajaxurl, data, (response) => {
            console.log("RESPONSE: ")
            console.log(response);
            var participants = JSON.parse(response);
            this.allParticipants = participants;
            this.showParticipants();
            $(".main_inner_container").append(this.adminMessageElement);
            $(".admin_message_container").css('display', 'flex');
            $(".admin_message").text("Removed participant");
        });
    }
    showConfirmationDeleteClass(sender){
        console.log("showing confirmation")
        this.activeClassID = $(sender).parent().attr("id");
        $("body").append(this.adminConfirmationElement);
        $(".admin_message_container").css('display', 'flex');
        $(".admin_message").text("Are you sure you want to delete this class?");
    }
    hideMessagePopup(){
        $(".admin_message_container").remove();
    }
}