$.widget( "corecss.timepicker" , {

    version: "1.0.0",

    options: {
        locale: CORE_LOCALE,
        onDone: $.noop(),
        onChange: $.noop(),
        onCancel: $.noop()
    },

    mode: 'hours',
    am: false,
    hour: 0,
    minute: 0,

    _create: function () {
        var that = this, element = this.element, o = this.options;
        var c = 1000 * 60 * 5;
        var date = new Date();

        this._setOptionsFromDOM();

        this.mode = 'hours';
        this.am = date.getHours() < 13;
        this.hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        this.minute = new Date(Math.round(date.getTime() / c) * c).getMinutes();

        console.log(this.hour);

        this._createPicker();
        this._createEvents();

        element.data('timepicker', this);
    },

    _drawHeader: function(){
        var element = this.element, o = this.options,
            html = "", hour, minute, am;

        hour = this.hour > 12 ? this.hour - 12 : this.hour;
        minute = this.minute < 10 ? '0'+this.minute : this.minute;
        am = this.am;

        html += "<span class='am "+(am ? 'active' : '')+"'>am</span>";
        html += "<span class='pm "+(!am ? 'active' : '')+"'>pm</span>";
        html += "<span class='js-hours active'>"+hour+"</span>";
        html += "<span>:</span>";
        html += "<span class='js-minutes'>"+minute+"</span>";

        return $(html);
    },

    _drawFooter: function(){
        var element = this.element, o = this.options,
            html = "";

        html += "<button class='flat-button js-button-cancel'>"+coreLocales[o.locale].buttons.cancel+"</button>";
        html += "<button class='flat-button js-button-done'>"+coreLocales[o.locale].buttons.done+"</button>";

        return $(html);
    },

    _createPicker: function(){
        var that = this, element = this.element, o = this.options;
        var i, j, h, c, f, pi, el, line, rotate;


        if (!element.hasClass("timepicker")) {
            element.addClass("timepicker");
        }

        element.html("");

        h = $("<div>").addClass("picker-header").appendTo(element).html(this._drawHeader());
        c = $("<div>").addClass("picker-content").appendTo(element);
        f = $("<div>").addClass("picker-footer").appendTo(element).html(this._drawFooter());
        pi = $("<div>").addClass("picker-inner").appendTo(c);

        for(i = 0; i < 12; i++) {
            j = i == 0 ? 12 : i;
            el = $("<span>").addClass("picker-item").html(j).appendTo(pi).data("hour", j).data("minute", j * 5 == 60 ? '00' : j * 5).data('rotate', ((i+1) * 30 - 30));
            if (j == this.hour) {
                el.addClass("active");
                rotate = el.data('rotate');
            }
        }

        line = $("<div>").addClass("picker-line").appendTo(pi);
        line.css({
            "transform": "rotate("+rotate+"deg)",
            "transform-origin": "0% 100%"
        });

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on("click", ".picker-item", function(){
            var el = $(this);
            element.find(".picker-item.active").removeClass("active");
            el.addClass("active");

            if (that.mode == 'hours') {
                element.find(".js-hours").text(el.data('hour'));
                that.hour = el.data('hour');
            } else {
                element.find(".js-minutes").text(el.data('minute'));
                that.minute = el.data('minute');
            }

            element.find(".picker-line").css({
                "transform": "rotate("+el.data('rotate')+"deg)",
                "transform-origin": "0% 100%"
            });
        });

        element.on("click", ".js-hours, .js-minutes", function(){
            var el = $(this);
            element.find(".picker-item.active").removeClass("active");
            if (el.hasClass("js-hours")) {
                that.mode = "hours";
                element.find(".js-hours").addClass("active");
                element.find(".js-minutes").removeClass("active");
                $.each(element.find(".picker-item"), function(){
                    var el = $(this);
                    el.text(el.data("hour"));
                    if (el.data("hour") == that.hour) {
                        el.addClass("active");
                        element.find(".picker-line").css({
                            "transform": "rotate("+el.data('rotate')+"deg)",
                            "transform-origin": "0% 100%"
                        });
                    }
                });
            } else {
                that.mode = "minutes";
                element.find(".js-hours").removeClass("active");
                element.find(".js-minutes").addClass("active");
                $.each(element.find(".picker-item"), function(){
                    var el = $(this);
                    el.text(el.data("minute"));
                    if (el.data("minute") == that.minute) {
                        el.addClass("active");
                        element.find(".picker-line").css({
                            "transform": "rotate("+el.data('rotate')+"deg)",
                            "transform-origin": "0% 100%"
                        });
                    }
                });
            }
            var val = {
                h: that.hour,
                m: that.minute,
                am: that.am
            };
            $.CoreCss.callback(o.onChange, val);
        });

        element.on("click", ".am, .pm", function(){
            var el = $(this);
            if (el.hasClass("am")) {
                that.am = true;
                element.find(".am").addClass("active");
                element.find(".pm").removeClass("active");
            } else {
                that.am = false;
                element.find(".am").removeClass("active");
                element.find(".pm").addClass("active");
            }

            var val = {
                h: that.hour,
                m: that.minute,
                am: that.am
            };
            $.CoreCss.callback(o.onChange, val);
        });

        element.on("click", ".js-button-done", function(){
            var val = {
                h: that.hour,
                m: that.minute,
                am: that.am
            };
            $.CoreCss.callback(o.onDone, val);
        });

        element.on("click", ".js-button-cancel", function(){
            $.CoreCss.callback(o.onCancel);
        });
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _destroy: function () {
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    }
});
