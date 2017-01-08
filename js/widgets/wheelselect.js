$.widget( "corecss.wheelselect" , {

    version: "1.0.0",

    options: {
        title: null,
        locale: CORE_LOCALE,
        values: null,
        value: null,
        isDialog: false,
        buttons: ['cancel', 'random', 'done'],
        onDone: $.noop
    },

    _value: null,

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        if (typeof o.values !== 'object') {
            o.values = o.values.split(",").map(function(v){
                return isNaN(v) ? v.trim() : Number(v);
            });
        }

        console.log(o.values);

        this._createElement();
        this._createScrollEvents();
        this._createButtonsEvents();

        setTimeout(function(){
            if (o.value !== null) {
                that.value(o.value);
            }
        }, 100);

        element.data('wheelselect', this);
    },

    value: function(v){
        if (v === undefined) {
            return this._value;
        }

        this._value = v;

        this.setPosition();
    },

    setPosition: function(){
        var element = this.element;
        var value = this.options.values.indexOf(this._value);
        var v_list = element.find(".v-list");

        this._removeScrollEvents();

        v_list.scrollTop(0).animate({
            scrollTop: element.find(".js-vv-"+value).addClass("active").position().top - 48
        });

        this._createScrollEvents();
    },

    _drawHeader: function(){
        var element = this.element,
            html = "", header,
            o = this.options;

        html += "<span class='day'>"+o.title+"</span>";

        header = $(html);

        return header;
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
        var v_list;
        var i;

        v_list = $("<ul>").addClass("v-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(v_list);

        if ((Object.prototype.toString.call( o.values ) === '[object Array]' || Object.prototype.toString.call( o.values ) === '[object Object]') && o.values.length > 0) {
            for(i = 0; i < o.values.length; i++) {
                $("<li>").html(o.values[i]).appendTo(v_list).data('value', o.values[i]).addClass("js-vv-"+i);
            }
        } else {
            $("<li>").html("NO VALUES").data("value", null).appendTo(v_list);
        }

        $("<li>").html("&nbsp;").appendTo(v_list);

        return picker_inner;
    },

    _createElement: function(){
        var that = this, element = this.element, o = this.options;
        var h, c, f;

        if (!element.hasClass("wheelpicker")) element.addClass("wheelpicker");

        element.html("");

        if (o.title) {
            h = $("<div>").addClass("picker-header").appendTo(element);
            h.append(this._drawHeader());
        }

        c = $("<div>").addClass("picker-content").appendTo(element);
        f = $("<div>").addClass("picker-footer").appendTo(element);

        c.append(this._drawPicker());
        f.append(this._drawFooter());
    },

    _createScrollEvents: function(){
        var that = this, element = this.element, o = this.options;
        var v_list = element.find(".v-list");

        v_list.on('scrollstart', function(){
            v_list.find(".active").removeClass("active");
        });
        v_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(v_list.scrollTop() + 48) / 48)) - 1;
            var target_element = v_list.find(".js-vv-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 48 + v_list[0].scrollTop;

            v_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
            });
        });
    },

    _removeScrollEvents: function(){
        var element = this.element;
        element.find(".v-list").off('scrollstart');
        element.find(".v-list").off('scrollstop');
    },


    _createButtonsEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.find(".js-button-random").on("click", function(){

            that._value = o.values[Utils.random(0, o.values.length - 1)];

            that.setPosition();
        });

        element.find(".js-button-done").on("click", function(){
            var result = that.value();
            $.CoreCss.callback(o.onDone, result);
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
