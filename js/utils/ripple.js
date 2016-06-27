$(document).on("click", ".ripple", function(e){
    var ink, d, x, y, that = $(this);

    if (that.css("position") == 'static') {
        that.css("position", "relative")
    }

    if(that.find(".ripple-ink").length === 0){
        that.prepend("<span class='ripple-ink'></span>");
    }

    ink = that.find(".ripple-ink");
    ink.removeClass("ripple-animate");

    if(!ink.height() && !ink.width()){
        d = Math.max(that.outerWidth(), that.outerHeight());
        ink.css({height: d, width: d});
    }

    x = e.pageX - that.offset().left - ink.width()/2;
    y = e.pageY - that.offset().top - ink.height()/2;

    ink.css({top: y+'px', left: x+'px'}).addClass("ripple-animate");
});
