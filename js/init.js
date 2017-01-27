if (window.CORE_CALENDAR_WEEK_START == undefined) {window.CORE_CALENDAR_WEEK_START = 1;}
if (window.CORE_LOCALE == undefined) {window.CORE_LOCALE = 'en-US';}
if (window.CORE_ANIMATION_DURATION == undefined) {window.CORE_ANIMATION_DURATION = 200;}

var CoreCss = {

    init: function(){
        var widgets = $("[data-role]");

        CoreCss.initWidgets(widgets);

        var observer, observerOptions, observerCallback;

        observerOptions = {
            'childList': true,
            'subtree': true
        };

        observerCallback = function(mutations){

            //console.log(mutations);

            mutations.map(function(record){

                if (record.addedNodes) {

                    /*jshint loopfunc: true */
                    var obj, widgets, plugins;

                    for(var i = 0, l = record.addedNodes.length; i < l; i++) {
                        obj = $(record.addedNodes[i]);

                        plugins = obj.find("[data-role]");

                        if (obj.data('role') !== undefined) {
                            widgets = $.merge(plugins, obj);
                        } else {
                            widgets = plugins;
                        }

                        if (widgets.length) {
                            CoreCss.initWidgets(widgets);
                        }
                    }
                }
            });
        };

        //console.log($(document));
        observer = new MutationObserver(observerCallback);
        observer.observe(document, observerOptions);
    },

    initWidgets: function(widgets) {
        $.each(widgets, function () {
            var $this = $(this), w = this;
            var roles = $this.data('role').split(/\s*,\s*/);
            roles.map(function (func) {
                try {
                    //console.log(func);
                    //console.log($.fn[func]);
                    //$(w)[func]();
                    if ($.fn[func] !== undefined && $this.data(func + '-initiated') !== true) {
                        $.fn[func].call($this);
                        $this.data(func + '-initiated', true);
                    }
                } catch (e) {
                    if (window.CORE_DEBUG != undefined) {
                        console.log(e.message, e.stack);
                    }
                }
            });
        });
    }
};

$.CoreCss = window.coreCss = CoreCss;