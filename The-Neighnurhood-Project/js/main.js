//Menu code
$(document).ready(function(){
    $("a").click(function() {
        $(".container").addClass("open");
        $("#MenuButton").css('display', 'none');
    });

    $("#closeButton").click(function() {
        $(".container").removeClass("open");
        $("#MenuButton").css('display', '');
    });
});

