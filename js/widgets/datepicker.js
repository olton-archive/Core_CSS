$.widget( "corecss.datepicker" , {

    version: "1.0.0",

    options: {
        locale: CORE_LOCALE
    },

    current: new Date(),

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        this._createPicker();
        this._createEvents();

        this.setPosition();

        element.data('datepicker', this);
    },

    setPosition: function(target){
        target = target || this.current;
        var element = this.element, date = typeof target == 'object' ? target : new Date(target);
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        var d_list = element.find(".d-list"),
            m_list = element.find(".m-list"),
            y_list = element.find(".y-list");

        d_list.animate({
            scrollTop: element.find(".js-dd-"+day).addClass("active").position().top - 40
        });

        m_list.animate({
            scrollTop: element.find(".js-dm-"+month).addClass("active").position().top - 40
        });

        y_list.animate({
            scrollTop: element.find(".js-yy-"+year).addClass("active").position().top - 40
        });
    },

    _drawHeader: function(){
        var element = this.element, target = this.current,
            day = target.getDate(),
            dayWeek = target.getDay(),
            month = target.getMonth(),
            year = target.getFullYear(),
            html = "", header,
            o = this.options;

        html += "<span class='day'>"+coreLocales[o.locale].calendar.days[dayWeek + 14]+", "+coreLocales[o.locale].calendar.months[month + 12]+' '+day+", "+year+"</span>";

        header = $(html);

        return header;
    },

    _drawFooter: function(){
        var element = this.element, o = this.options,
            html = "";

        html += "<button class='flat-button js-button-rand'>"+coreLocales[o.locale].buttons.rand+"</button>";
        html += "<button class='flat-button js-button-done'>"+coreLocales[o.locale].buttons.done+"</button>";

        return $(html);
    },

    _drawPicker: function(){
        var element = this.element, o = this.options;
        var picker_inner = $("<div>").addClass("picker-content-inner");
        var d_list, m_list, y_list;
        var i;

        d_list = $("<ul>").addClass("d-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(d_list);
        for(i = 1; i <= 31; i++) {
            $("<li>").html(i).appendTo(d_list).data('value', i).addClass("js-dd-"+i);
        }
        $("<li>").html("&nbsp;").appendTo(d_list);

        m_list = $("<ul>").addClass("m-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(m_list);
        for(i = 1; i <= 12; i++) {
            $("<li>").html(coreLocales[o.locale].calendar.months[i-1 + 12]).appendTo(m_list).data('value', i).addClass("js-dm-"+i);
        }
        $("<li>").html("&nbsp;").appendTo(m_list);

        y_list = $("<ul>").addClass("y-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(y_list);
        var j = 1;
        for(i = 1900; i <= 2100; i++) {
            $("<li>").html(i).appendTo(y_list).data('value', i).addClass("js-dy-"+j+" js-yy-"+i);
            j++;
        }
        $("<li>").html("&nbsp;").appendTo(y_list);

        return picker_inner;
    },

    _createPicker: function(){
        var h, c, f, element = this.element;

        if (!element.hasClass("datepicker")) {
            element.addClass("datepicker");
        }

        element.html("");

        h = $("<div>").addClass("picker-header").appendTo(element);
        c = $("<div>").addClass("picker-content").appendTo(element);
        f = $("<div>").addClass("picker-footer").appendTo(element);

        h.append(this._drawHeader());
        c.append(this._drawPicker());
        f.append(this._drawFooter());
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var d_list = element.find(".d-list"),
            m_list = element.find(".m-list"),
            y_list = element.find(".y-list");

        d_list.on('scrollstart', function(){
            d_list.find(".active").removeClass("active");
        });
        d_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(d_list.scrollTop() + 40) / 40));
            var target_element = d_list.find(".js-dd-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 40 + d_list[0].scrollTop;

            d_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
                that.current = new Date(that.current.getFullYear(), that.current.getMonth(), val);
                element.find(".picker-header").html(that._drawHeader());
            });
        });

        m_list.on('scrollstart', function(){
            m_list.find(".active").removeClass("active");
        });
        m_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(m_list.scrollTop() + 40) / 40));
            var target_element = m_list.find(".js-dm-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 40 + m_list[0].scrollTop;

            m_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
                that.current = new Date(that.current.getFullYear(), val - 1, that.current.getDate());
                element.find(".picker-header").html(that._drawHeader());
            });
        });

        y_list.on('scrollstart', function(){
            y_list.find(".active").removeClass("active");
        });
        y_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(y_list.scrollTop() + 40) / 40));
            var target_element = y_list.find(".js-dy-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 40 + y_list[0].scrollTop;

            y_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
                that.current = new Date(val, that.current.getMonth(), that.current.getDate());
                element.find(".picker-header").html(that._drawHeader());
            });
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
