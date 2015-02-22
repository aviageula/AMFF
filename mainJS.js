function inputsValidation() {

    if ($("[name='name']").val().trim().length < 1) {
        $("[name='name']").addClass("notValid").focus().parent().prev().show();
    }
    if (($("[name='email']").val().trim().indexOf("@") < 3) || ($("[name='email']").val().trim().indexOf(".") < 1)) {
        $("[name='email']").addClass("notValid").select().parent().prev().show();
    }
    if ($("[name='phoneNumber']").val().trim().length < 5) {
        $("[name='phoneNumber']").addClass("notValid").select().parent().prev().show();
    }
    if (!($("[name='name']").hasClass("notValid")) && !($("[name='email']").hasClass("notValid")) && !($("[name='phoneNumber']").hasClass("notValid"))) {
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

    $("[type='button']").on("click", function () {

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
