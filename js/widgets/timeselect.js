$.widget( "corecss.timeselect" , {

    version: "1.0.0",

    options: {
        locale: CORE_LOCALE,
        hour: 0,
        minute: 0,
        second: 0,
        isDialog: false,
        buttons: ['cancel', 'random', 'now', 'done'],
        onDone: $.noop
    },

    hour: null,
    minute: null,
    second: null,

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        this.hour = o.hour;
        this.minute = o.minute;
        this.second = o.second;

        this._createElement();
        this._createScrollEvents();
        this._createButtonsEvents();

        setTimeout(function(){
            that.now();
        }, 100);

        element.data('timeselect', this);
    },

    now: function(){
        var d = new Date();

        this.hour = d.getHours();
        this.minute = d.getMinutes();
        this.second = d.getSeconds();

        this.setPosition();
    },

    setPosition: function(){
        var element = this.element;
        var hour = this.hour,
            minute = this.minute,
            second = this.second;
        var h_list = element.find(".h-list"),
            m_list = element.find(".m-list"),
            s_list = element.find(".s-list");

        this._removeScrollEvents();

        h_list.scrollTop(0).animate({
            scrollTop: element.find(".js-hh-"+hour).addClass("active").position().top - 40
        });

        m_list.scrollTop(0).animate({
            scrollTop: element.find(".js-mm-"+minute).addClass("active").position().top - 40
        });

        s_list.scrollTop(0).animate({
            scrollTop: element.find(".js-ss-"+second).addClass("active").position().top - 40
        });

        this._createScrollEvents();
    },

    _drawFooter: function(){
        var element = this.element, o = this.options,
            html = "";

        $.each(o.buttons, function(){
            html += "<button class='flat-button js-button-"+this+" "+(o.isDialog && (this == 'cancel' || this == 'done') ? 'js-dialog-close' : '')+"'>"+coreLocales[o.locale].buttons[this]+"</button>";
        });

        return $(html);
    },

    _drawPicker: function(){
        var element = this.element, o = this.options;
        var picker_inner = $("<div>").addClass("picker-content-inner");
        var h_list, m_list, s_list;
        var i;

        h_list = $("<ul>").addClass("h-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(h_list);
        for(i = 0; i <= 23; i++) {
            $("<li>").html(i).appendTo(h_list).data('value', i).addClass("js-hh-"+i);
        }
        $("<li>").html("&nbsp;").appendTo(h_list);

        m_list = $("<ul>").addClass("m-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(m_list);
        for(i = 0; i <= 59; i++) {
            $("<li>").html(i).appendTo(m_list).data('value', i).addClass("js-mm-"+i);
        }
        $("<li>").html("&nbsp;").appendTo(m_list);

        s_list = $("<ul>").addClass("s-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(s_list);
        for(i = 0; i <= 59; i++) {
            $("<li>").html(i).appendTo(s_list).data('value', i).addClass("js-ss-"+i);
        }
        $("<li>").html("&nbsp;").appendTo(s_list);

        return picker_inner;
    },

    _createElement: function(){
        var that = this, element = this.element, o = this.options;
        var h, c, f;

        if (!element.hasClass("timeselect")) element.addClass("timeselect");

        element.html("");

        h = $("<div>").addClass("caption").html("<span>"+coreLocales[o.locale].calendar.time[0]+"</span><span>"+coreLocales[o.locale].calendar.time[1]+"</span><span>"+coreLocales[o.locale].calendar.time[2]+"</span>").appendTo(element);
        c = $("<div>").addClass("picker-content").appendTo(element);
        f = $("<div>").addClass("picker-footer").appendTo(element);

        c.append(this._drawPicker());
        f.append(this._drawFooter());
    },

    _createScrollEvents: function(){
        var that = this, element = this.element, o = this.options;
        var h_list = element.find(".h-list"),
            m_list = element.find(".m-list"),
            s_list = element.find(".s-list");

        h_list.on('scrollstart', function(){
            h_list.find(".active").removeClass("active");
        });
        h_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(h_list.scrollTop() + 40) / 40)) - 1;
            var target_element = h_list.find(".js-hh-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 40 + h_list[0].scrollTop;

            h_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
            });
        });

        m_list.on('scrollstart', function(){
            m_list.find(".active").removeClass("active");
        });
        m_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(m_list.scrollTop() + 40) / 40)) - 1;
            var target_element = m_list.find(".js-mm-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 40 + m_list[0].scrollTop;

            m_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
            });
        });

        s_list.on('scrollstart', function(){
            s_list.find(".active").removeClass("active");
        });
        s_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(s_list.scrollTop() + 40) / 40)) - 1;
            var target_element = s_list.find(".js-ss-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 40 + s_list[0].scrollTop;

            s_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
            });
        });
    },

    _removeScrollEvents: function(){
        var element = this.element;
        element.find(".h-list").off('scrollstart');
        element.find(".h-list").off('scrollstop');
        element.find(".m-list").off('scrollstart');
        element.find(".m-list").off('scrollstop');
        element.find(".s-list").off('scrollstart');
        element.find(".s-list").off('scrollstop');
    },


    _createButtonsEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.find(".js-button-random").on("click", function(){
            that.hour = Utils.random(0, 23);
            that.minute = Utils.random(0, 59);
            that.second = Utils.random(0, 59);

            that.setPosition();
        });

        element.find(".js-button-done").on("click", function(){
            var result = {
                hour: that.hour,
                minute: that.minute,
                second: that.second
            };
            $.CoreCss.callback(o.onDone, result);
        });

        element.find(".js-button-now").on("click", function(){
            var d = new Date();;

            that.hour = d.getHours();
            that.minute = d.getMinutes();
            that.second = d.getSeconds();

            that.setPosition();
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
