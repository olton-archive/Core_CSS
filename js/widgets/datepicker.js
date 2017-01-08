$.widget( "corecss.datepicker" , {

    version: "1.0.0",

    options: {
        locale: CORE_LOCALE,
        minYear: 1900,
        maxYear: new Date().getFullYear(),
        day: (new Date()).getDate(),
        month: (new Date()).getMonth(),
        year: (new Date()).getFullYear(),
        isDialog: false,
        buttons: ['cancel', 'random', 'today', 'done'],
        onDone: $.noop
    },

    current: new Date(),

    day: null,
    month: null,
    year: null,

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        this.day = o.day;
        this.month = o.month;
        this.year = o.year;

        this._createPicker();
        this._createScrollEvents();
        this._createButtonsEvents();

        setTimeout(function(){
            that.today();
        }, 100);

        element.data('datepicker', this);
    },

    _correct: function(){
        function isDate(y,m,d){
            var date = new Date(y,m,d);
            var convertedDate =
                ""+date.getFullYear() + (date.getMonth()) + date.getDate();
            var givenDate = "" + y + m + d;
            return ( givenDate == convertedDate);
        }

        if (!isDate(this.year, this.month, this.day)) {
            var date = new Date(this.year, this.month, this.day);
            // date.setHours(0,0,0,0);
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.day = date.getDate();
            this._removeScrollEvents();
            this.setPosition();
            this._createScrollEvents();
            //
            // console.log("bad date! correct it.");
            // console.log("new date is: " + date);
        }
    },

    setPosition: function(){
        var element = this.element;
        var day = this.day,
            month = this.month + 1,
            year = this.year;
        var d_list = element.find(".d-list"),
            m_list = element.find(".m-list"),
            y_list = element.find(".y-list");

        this._removeScrollEvents();

        // console.log(element.find(".js-dd-"+day).offset());
        // console.log(element.find(".js-dm-"+month));
        // console.log(element.find(".js-yy-"+year));
        //
        d_list.scrollTop(0).animate({
           scrollTop: element.find(".js-dd-"+day).addClass("active").position().top - 48
        });

        m_list.scrollTop(0).animate({
            scrollTop: element.find(".js-dm-"+month).addClass("active").position().top - 48
        });

        y_list.scrollTop(0).animate({
            scrollTop: element.find(".js-yy-"+year).addClass("active").position().top - 48
        });

        this._createScrollEvents();
    },

    today: function(){
        var d = new Date(); d.setHours(0,0,0,0);

        this.day = d.getDate();
        this.month = d.getMonth();
        this.year = d.getFullYear();

        this.setPosition();
    },

    _drawHeader: function(){
        var element = this.element,
            day = this.day,
            dd = new Date(this.year, this.month, this.day),
            dayWeek = dd.getDay(),
            month = this.month,
            year = this.year,
            html = "", header,
            o = this.options;

        html += "<span class='day'>"+coreLocales[o.locale].calendar.days[dayWeek + 14]+", "+coreLocales[o.locale].calendar.months[month + 12]+' '+day+", "+year+"</span>";

        header = $(html);

        return header;
    },

    _drawFooter: function(){
        var element = this.element, o = this.options,
            html = "";

        $.each(o.buttons, function(){
            html += "<button class='flat-button js-button-"+this+" "+(o.isDialog && (this == 'cancel' || this == 'done') ? 'js-dialog-close' : '')+"'>"+coreLocales[o.locale].buttons[this]+"</button>";
        });

        // html += "<button class='flat-button js-button-rand'>"+coreLocales[o.locale].buttons.rand+"</button>";
        // html += "<button class='flat-button js-button-today'>"+coreLocales[o.locale].buttons.today+"</button>";
        // html += "<button class='flat-button js-button-done'>"+coreLocales[o.locale].buttons.done+"</button>";

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
            $("<li>").html(coreLocales[o.locale].calendar.months[i-1 + 12]).appendTo(m_list).data('value', i - 1).addClass("js-dm-"+i);
        }
        $("<li>").html("&nbsp;").appendTo(m_list);

        y_list = $("<ul>").addClass("y-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(y_list);
        var j = 1;
        for(i = o.minYear; i <= o.maxYear; i++) {
            $("<li>").html(i).appendTo(y_list).data('value', i).addClass("js-dy-"+j+" js-yy-"+i);
            j++;
        }
        $("<li>").html("&nbsp;").appendTo(y_list);

        return picker_inner;
    },

    _createPicker: function(){
        var h, c, f, element = this.element;

        if (!element.hasClass("wheelpicker")) element.addClass("wheelpicker");

        element.html("");

        h = $("<div>").addClass("picker-header").appendTo(element);
        c = $("<div>").addClass("picker-content").appendTo(element);
        f = $("<div>").addClass("picker-footer").appendTo(element);

        h.append(this._drawHeader());
        c.append(this._drawPicker());
        f.append(this._drawFooter());
    },

    _removeScrollEvents: function(){
        var element = this.element;
        element.find(".d-list").off('scrollstart');
        element.find(".d-list").off('scrollstop');
        element.find(".m-list").off('scrollstart');
        element.find(".m-list").off('scrollstop');
        element.find(".y-list").off('scrollstart');
        element.find(".y-list").off('scrollstop');
    },

    _createScrollEvents: function(){
        var that = this, element = this.element, o = this.options;
        var d_list = element.find(".d-list"),
            m_list = element.find(".m-list"),
            y_list = element.find(".y-list");

        d_list.on('scrollstart', function(){
            d_list.find(".active").removeClass("active");
        });
        d_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(d_list.scrollTop() + 48) / 48));
            var target_element = d_list.find(".js-dd-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 48 + d_list[0].scrollTop;

            d_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
                that.day = val;
                element.find(".picker-header").html(that._drawHeader());
                that._correct();
            });
        });

        m_list.on('scrollstart', function(){
            m_list.find(".active").removeClass("active");
        });
        m_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(m_list.scrollTop() + 48) / 48));
            var target_element = m_list.find(".js-dm-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 48 + m_list[0].scrollTop;

            m_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
                that.month = val;
                element.find(".picker-header").html(that._drawHeader());
                that._correct();
            });
        });

        y_list.on('scrollstart', function(){
            y_list.find(".active").removeClass("active");
        });
        y_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(y_list.scrollTop() + 48) / 48));
            var target_element = y_list.find(".js-dy-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 48 + y_list[0].scrollTop;

            y_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
                that.year = val;
                element.find(".picker-header").html(that._drawHeader());
                that._correct();
            });
        });
    },

    _createButtonsEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.find(".js-button-random").on("click", function(){
            function randomInteger(min, max) {
                var rand = min - 0.5 + Math.random() * (max - min + 1);
                rand = Math.round(rand);
                return rand;
            }

            that.day = randomInteger(1, 31);
            that.month = randomInteger(0, 11);
            that.year = randomInteger(o.minYear, o.maxYear);

            that.setPosition();
        });

        element.find(".js-button-done").on("click", function(){
            var result = new Date(that.year, that.month, that.day);
            $.CoreCss.callback(o.onDone, result);
        });

        element.find(".js-button-today").on("click", function(){
            var d = new Date(); d.setHours(0,0,0,0);

            that.day = d.getDate();
            that.month = d.getMonth();
            that.year = d.getFullYear();

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
        this._removeScrollEvents();
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    }
});
