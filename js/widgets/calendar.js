

$.widget( "corecss.calendar" , {

    version: "1.0.0",

    options: {
        weekStart: CORE_CALENDAR_WEEK_START,
        mode: "default", // default, range, multi
        startFrom: "day", // day, month, year
        format: "dd-mm-yyyy",
        locale: CORE_LOCALE,
        toolbar: true,
        onDone: $.noop()
    },

    current: new Date(),
    today: new Date(),
    selected: [],

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        this._createCalendar();
        this._createEvents();

        element.data('calendar', this);
    },

    _drawHeader: function(){
        var element = this.element,
            day = this.today.getDate(),
            dayWeek = this.today.getDay(),
            month = this.today.getMonth(),
            year = this.today.getFullYear(),
            //header = element.find(".calendar-header").html(""),
            html = "", header,
            o = this.options;

        html += "<div class='year'>"+year+"</div>";
        html += "<div class='day'>"+coreLocales[o.locale].calendar.days[dayWeek]+", "+coreLocales[o.locale].calendar.months[month + 12]+' '+day+"</div>";

        header = $(html);

        return header;
    },

    _drawToolbar: function(){
        var o = this.options,
            month = this.current.getMonth(),
            year = this.current.getFullYear(),
            toolbar = $("<div>").addClass("toolbar");

        $("<span>").addClass("prev_month js-control").appendTo(toolbar);
        $("<span>").addClass("current_month").html(coreLocales[o.locale].calendar.months[month]).appendTo(toolbar);
        $("<span>").addClass("next_month js-control").appendTo(toolbar);
        $("<span>").addClass("prev_year js-control").appendTo(toolbar);
        $("<span>").addClass("current_year").html(year).appendTo(toolbar);
        $("<span>").addClass("next_year js-control").appendTo(toolbar);

        if (o.toolbar !== true) {
            toolbar.hide();
        }

        return toolbar;
    },

    _drawFooter: function(){
        var o = this.options,
            footer = "";

        footer += "<button class='flat-button js-button-today'>"+coreLocales[o.locale].buttons.today+"</button>";
        footer += "<button class='flat-button js-button-done'>"+coreLocales[o.locale].buttons.done+"</button>";

        return $(footer);
    },

    _drawDays: function(distance){

        function getDay(date){
            var day = date.getDay();
            if (day == 0) day = 7;
            return day - 1;
        }

        distance = distance || 0;
        var o = this.options,
            day = this.current.getDate(),
            month = this.current.getMonth() - distance,
            year = this.current.getFullYear(),
            firstDay = new Date(year, month, 1),
            i, j, md, dd, total = 0, days,
            p_month_days,
            days_inner = $("<div>");


        /* Draw days of week*/
        var weekDays = $("<div>").addClass("week-days").appendTo(days_inner);
        for (i = 0; i < 7; i++) {
            if (o.weekStart === 0) {
                j = i;
            } else {
                j = i + 1;
                if (j === 7) { j = 0; }
            }
            $("<div/>").addClass("day").html(coreLocales[o.locale].calendar.days[j + 7]).appendTo(weekDays);
        }
        /* End of days of week */

        days = $("<div>").addClass("days");

        p_month_days = (new Date(year, month, 0)).getDate();

        md = $("<div>").addClass("month-days").appendTo(days);

        for(i = 0; i < getDay(firstDay); i++) {
            dd = $("<div>").addClass("day fg-gray-400 prev-month-day").html(p_month_days - i).appendTo(md);
            dd.data('day', new Date(year, month - 1, p_month_days - i));
            total++;
        }

        while(firstDay.getMonth() == month) {
            dd = $("<div>").addClass("day").html(firstDay.getDate()).appendTo(md);
            dd.data('day', new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate()));
            if (
                this.today.getFullYear() == firstDay.getFullYear() &&
                this.today.getMonth() == firstDay.getMonth() &&
                this.today.getDate() == firstDay.getDate()
            ) {
                dd.addClass("today");
            }

            total++;
            if (getDay(firstDay) % 7 == 6) {
                md = $("<div>").addClass("month-days").appendTo(days);
            }
            firstDay.setDate(firstDay.getDate() + 1);
        }

        while(total < 42) {
            dd = $("<div>").addClass("day fg-gray-400 next-month-day").html(firstDay.getDate()).appendTo(md);
            dd.data('day', new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate()));
            if (getDay(firstDay) % 7 == 6) {
                md = $("<div>").addClass("month-days").appendTo(days);
            }
            firstDay.setDate(firstDay.getDate() + 1);
            total++;
        }

        days.appendTo(days_inner);

        return days_inner;
    },

    _drawCalendar: function(){
        var h, c, f, element = this.element;

        element.html("");

        h = $("<div>").addClass("calendar-header").appendTo(element);
        c = $("<div>").addClass("calendar-content").appendTo(element);
        f = $("<div>").addClass("calendar-footer").appendTo(element);

        h.append(this._drawHeader());
        c.append(this._drawToolbar());
        c.append(this._drawDays());
        f.append(this._drawFooter());
    },

    _createCalendar: function(){
        var that = this, element = this.element, o = this.options;

            if (!element.hasClass("calendar")) {
            element.addClass("calendar");
        }

        this._drawCalendar();

        element.ripple({
            rippleTarget: '.flat-button, .day, .js-control',
            rippleColor: '#ccc'
        });
    },

    _createEvents: function(){
        var that = this, element = this.element;

        element.on("click", ".js-control", function(){

            var el = $(this), m, y;
            var day = that.current.getDate(),
                month = that.current.getMonth(),
                year = that.current.getFullYear();

            if (el.hasClass("prev_month")) {
                month -= 1;
                if (month < 0) {
                    year -= 1;
                    month = 11;
                }
                that.current = new Date(year, month);
            }
            if (el.hasClass("next_month")) {
                month += 1;
                if (month == 12) {
                    year += 1;
                    month = 0;
                }
                that.current = new Date(year, month);
            }
            if (el.hasClass("next_year")) {
                that.current = new Date(year + 1, month);
            }
            if (el.hasClass("prev_year")) {
                that.current = new Date(year - 1, month);
            }

            setTimeout(function(){
                that._drawCalendar();
            }, 300);

        });

        element.on("click", ".js-button-today", function(){
            that.current = that.today;
            setTimeout(function(){
                that._drawCalendar();
            }, 300);
        });

        element.on("click", ".js-button-done", function(){
            setTimeout(function(){
                var result;

                switch(o.mode) {
                    case 'range':
                    case 'multi': result = that.selected; break;
                    default: result = that.selected[0];
                }

                CoreCss.callback(o.onDone, result);
            }, 300);
        });

        element.on("click", ".month-days .day", function(){
            var el = $(this), day = el.data('day');

            if (el.hasClass("prev-month-day") || el.hasClass("next-month-day")) {
                that.current = el.data('day');
                that._drawCalendar();
                $.each(element.find(".month-days .day"), function(){
                    var day2 = $(this).data('day');
                    if (day.getTime() == day2.getTime()) {
                        that.selected[0] = $(this).data('day');
                        element.find(".selected").removeClass("selected");
                        $(this).addClass("selected");
                    }
                });
            } else {
                that.selected[0] = day;
                element.find(".selected").removeClass("selected");
                el.addClass("selected");
            }
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
