
function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var telefono = $("#telefono").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();


    $.ajax({
        type: "POST",
        url: "https://formsubmit.co/ajax/fasasegura@gmail.com",
        dataType: 'json',
        accepts: 'application/json',
        data: {
            name: name,
            email: email,
            telefono: telefono,
            message: message
        },
        success: () => formSuccess(),
        error:  (err) => {
            formError()
            submitMSG(false,err)
        }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Mensaje enviado!")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
function onSubmit(token) {
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
  
    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      formError();
      submitMSG(false, "Por favor, completa todos los campos.");
    } else {
      submitForm();
    }
  }
  