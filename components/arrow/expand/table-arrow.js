function clickBox() {

    if($('#up').hasClass('none')){

        $('#up').removeClass('none');
    }else {
        $('#up').addClass('none');
    }

    if($('#down').hasClass('none')){

        $('#down').removeClass('none');
    }else {
        $('#down').addClass('none');
    }

    if($("table tr").hasClass('name')&&$("table tr").hasClass('none')){

        $("table tr").removeClass('none');
    }else if($("table tr").hasClass('name')&&!$("table tr").hasClass('none')){
        $(".name").addClass('none');
    }
}