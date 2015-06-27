
function inputsValidation() {

    var inputName = $("[name='name']");
    var inputEmail = $("[name='email']");
    var inputPhone = $("[name='phoneNumber']");

    if ($(inputName).val().trim().length < 1) {
        $(inputName).addClass("notValid").focus().parent().prev().show();
    }
    if (($(inputEmail).val().trim().indexOf("@") < 3) || ($("[name='email']").val().trim().indexOf(".") < 1)) {
        $(inputEmail).addClass("notValid").select().parent().prev().show();
    }
    if ($(inputPhone).val().trim().length < 5) {
        $(inputPhone).addClass("notValid").select().parent().prev().show();
    }
    if (!($(inputName).hasClass("notValid")) && !($(inputEmail).hasClass("notValid")) && !($(inputPhone).hasClass("notValid"))) {
        sendAndGetAjax();
    }
}
/*If inserted invalid input, message will pop out.*/

function sendAndGetAjax() {

    $.ajax({
        url: "ajax.html",
        data: {
            name: $("[name='name']").val(),
            email: $("[name='email']").val(),
            phoneNumber: $("[name='phoneNumber']").val()
        },
        type: "GET",
        dataType: "html",
        success: function (data) {
            var messageToShow = $("<div>").append(data).find("div");
            $(".formDiv").html(messageToShow);
            $(messageToShow).fadeIn(2000);
        },
        error: function (xhr, status) {
            alert("Sorry, there was a problem - " + xhr.status + ", " + xhr.statusText + ".");
        }
    });

}
/*Send the inputs to html document with ajax.
when success, loads the data we received back into the form box/*/

$(document).ready(function () {

    $("footer > p > span").text(new Date().getFullYear());
    /*Using current year in the footer*/

    $("[type='submit']").on("click", function () {

        inputsValidation();

    });
    /*When the button is clicked this function will be executed.*/

    $("[type='text']").on("keyup", function () {

        $(this).removeClass("notValid").parent().prev().hide();

    });
    /*When a key is pressed in input, hide the message*/

    $("[name='phoneNumber']").on("keypress", function (e) {
        var whichKey = e.charCode;
        if (((whichKey > 57) || (whichKey < 48))) {
            e.preventDefault();
        }
        /*Allow only numbers */
    });

});
