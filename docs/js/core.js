/*!
 * Core CSS v0.0.1 (https://github.com/olton/CoreCSS)
 * Copyright 2016 Sergey Pimenov
 * Licensed under MIT (https://github.com/olton/CoreCSS/blob/master/LICENSE)
 */
// Source: js/init.js
var CoreCss = {
    init: function(){
        
    }
};
// Source: js/utils/ripple.js
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
