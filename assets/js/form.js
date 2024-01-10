function validateForm() {
    var name = $('#name').val();
    var email = $('#email').val();
    var message = $('#message').val();

    if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(message)) {
      $('#error-message').text('Por favor completa todos los campos.');
    } else if (!validator.isEmail(email)) {
      $('#error-message').text('Por favor ingresa un correo electrónico válido.');
    } else {
      submitForm()
    }
  }



function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();


    $.ajax({
        type: "POST",
        url: "https://formsubmit.co/ajax/",
        dataType: 'json',
        accepts: 'application/json',
        data: {
            name: name,
            email: email,
            message: message
        },
        success: () => formSuccess(),
        error:  () => formError()
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h4 text-center text-success";
    } else {
        var msgClasses = "h4 text-center text-danger";
    }
    $("#error-message").removeClass().addClass(msgClasses).text(msg);
}

function formSuccess(){
    $("#contact-form")[0].reset();
    submitMSG(true, "Mensaje enviado!")
}

function formError(){
    submitMSG(false, "Ha ocurrido un error")
}



