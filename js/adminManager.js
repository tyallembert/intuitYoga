class adminManager{
    constructor(){
        this.allClasses = [];
        this.allParticipants = [];

        this.date = "";
        this.day = "";
        this.time = "";
        this.experience = "";
        this.cost = "";
        this.type = "";
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
        console.log("setting active nav")
        $(".admin_nav_element").each(function() {
            if($(this).hasClass("active_admin_nav")){
                $(this).removeClass("active_admin_nav");
            }
        });
        sender.classList.add("active_admin_nav");
    }
    populateNavBar(classes){
        $(".admin_all_classes_nav").empty();
        $(".admin_all_classes_nav").append(
            `<div class = "admin_nav_elements" onclick="manager.showAddClass(this)">
                <p>Add Class</p>
            </div>`
        )
        for(var key in classes){
            console.log("KEY: ")
            console.log(classes[key]);
            if(classes[key] != {}){
                this.createAdminNavElement(classes[key]);
            }
        }
    }
    createAdminNavElement(element){
        $(".admin_all_classes_nav").append(`
            <div class = "admin_nav_elements" id="${element.classID}" onclick="manager.showParticipants(this)">
                <i class="fa-solid fa-trash" onclick="manager.removeClass(this)"></i>
                <p>${element.date}</p>
            </div>
        `)
    }
    showParticipants(sender){
        this.setWhichAdminNav(sender);

        $(".main_inner_container").empty();

        $(".main_inner_container").append(
            `<div class = "main_inner_titles">
                <p>F. Name</p>
                <p>L. Name</p>
                <p>Email</p>
                <p>Phone Number</p>
                <p>Experience</p>
                <p>Payment Type</p>
                <p>Class Type</p>
            </div>`
        )

        let classID = sender.id;

        let emptyParticipants = true;
        console.log(this.allParticipants)
        for(var key in this.allParticipants){
            if(this.allParticipants[key].classID == classID){
                this.createAdminParticipantElement(key, this.allParticipants[key]);
                emptyParticipants = false;
            }
        }
        if(emptyParticipants){
            $(".main_inner_container").append(
                `<p class = "nobody_in_class">Nobody is signed up for this class</p>`
            )
        }
    }
    createAdminParticipantElement(id, participant){
        $(".main_inner_container").append(`
            <div class = "admin_participant_element" id="participant${id}">
                <p>${participant.firstName}</p>
                <p>${participant.lastName}</p>
                <p>${participant.email}</p>
                <p>${participant.phoneNumber}</p>
                <p>${participant.experience}</p>
                <p>${participant.paymentMethod}</p>
                <p>${participant.classType}</p>
            </div>
        `)
    }
    // ===add/remove classes===
    showAddClass(sender){
        $(".main_inner_container").empty()

        this.setWhichAdminNav(sender);

        $(".admin_nav_element").each(function() {
            if($(this).hasClass("active_admin_nav")){
                $(this).removeClass("active_admin_nav");
            }
        });

        let template_clone = $("#add_class_template").clone();
        console.log(template_clone)
        $(".main_inner_container").append(template_clone.html());
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
        let classID = $(sender).parent().attr("id");
        let action = "removeClass";
        let ajaxurl = '../admin/handleAdmin.php';

        let data = {
                    'action': action,
                    'classID': classID
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
        }
        else if(sender.id == "new_day"){
            this.day = sender.value;
        }
        else if(sender.id == "new_time"){
            this.time = sender.value;
        }
        else if(sender.id == "new_experience"){
            this.experience = sender.value;
        }
        else if(sender.id == "new_cost"){
            this.cost = sender.value;
        }
        else if(sender.name == "new_type"){
            console.log(sender.value)
            this.type = sender.value.toLowerCase();
        }
    }
    hideMessagePopup(){
        $(".admin_message_container").css('display', 'none');
        $(".main_inner_container").empty()
    }
}