var Toast = function(message, callback, timeout, cls){
    var toast = $("<div>").addClass("toast").html(message).appendTo($("body")).hide();
    var width = toast.outerWidth();
    var height = toast.outerHeight();
    timeout = timeout || 2000;

    toast.css({
        'left': '50%',
        'margin-left': -(width / 2),
        'border-radius': height/2
    }).addClass(cls).fadeIn(CORE_ANIMATION_DURATION);

    setTimeout(function(){
        toast.fadeOut(CORE_ANIMATION_DURATION, function(){
            toast.remove();
            if (callback != undefined) {
                if (typeof callback === 'function') {
                    callback();
                } else {
                    if (typeof window[callback] === 'function') {
                        window[callback]();
                    } else {
                        var result = eval("(function(){"+callback+"})");
                        result.call();
                    }
                }
            }
        });
    }, timeout);
};

window.coreToast = Toast;

$.Toast = Toast;