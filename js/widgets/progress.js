$.widget( "corecss.progress" , {

    version: "1.0.0",

    options: {
        value: 0,
        buffer: 0,
        type: "default", // default, line, circle, buffered
        barColor: 'bg-green',
        bufferColor: 'bg-yellow',
        color: 'bg-gray-600',
        size: '64',
        radius: '20',
        onChange: $.noop(),
        onEnd: $.noop()
    },

    value: 0,

    _create: function () {
        var element = this.element;

        this._setOptionsFromDOM();

        this._createProgress();

        element.data('progress', this);
    },

    _createProgress: function(){
        var element = this.element, o = this.options;
        var template = '', bar, load, buffer, circle;

        element.addClass("progress");

        if (o.type == 'buffered') {

            element.addClass("buffered");

            bar  = $("<div class='bar'></div>").appendTo(element);
            buffer  = $("<div class='buffer'></div>").appendTo(element);
            load  = $("<div class='load'></div>").appendTo(element);

            if (o.barColor.isColor()) {
                bar.css('background', o.barColor);
            } else {
                bar.addClass(o.barColor);
            }

            if (o.bufferColor.isColor()) {
                buffer.css('background', o.bufferColor);
            } else {
                buffer.addClass(o.bufferColor);
            }

            this.val(o.value);
            this.buffer(o.buffer);

        } else if (o.type == 'line') {
            element.removeClass("progress");
            element.addClass("progress-line");
        } else if (o.type == 'circle') {
            element.removeClass("progress");
            element.addClass("circular-loader");
            element.css({
                width: o.size + 'px',
                height: o.size + 'px'
            });
            circle = $('<svg class="circular"><circle class="path" cx="'+o.size/2+'" cy="'+o.size/2+'" r="'+o.radius+'" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>').appendTo(element);
            bar = element.find(".path");

            if (o.barColor.isColor()) {
                bar.css('stroke', o.barColor);
            } else {
                bar.addClass(o.barColor);
            }
        } else {
            if (o.color.isColor()) {
                element.css('background', o.color);
            } else {
                element.addClass(o.color);
            }

            bar = $("<div class='bar'>").appendTo(element);

            if (o.barColor.isColor()) {
                bar.css('background', o.barColor);
            } else {
                bar.addClass(o.barColor);
            }

            this.val(o.value);
        }
    },

    val: function(val){
        var element = this.element, o = this.options;

        if (val == undefined) {
            return this.value;
        }

        this.value = val;
        element.data('value', val);

        element.find(".bar").css({
            width: val + '%'
        });

        $.CoreCss.callback(o.onChange, val);

        if (val == 100) {
            $.CoreCss.callback(o.onEnd);
        }

        return this;
    },

    buffer: function(val){
        var element = this.element;

        if (val == undefined) {
            return this.buffer;
        }

        this.buffer = val;
        element.data('buffer', val);

        element.find(".buffer").css({
            width: val + '%'
        });

        return this;
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
