$.widget( "corecss.accordion" , {

    version: "1.0.0",

    options: {
        closeOther: true,
        onOpen: $.noop,
        onClose: $.noop
    },

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        this._createEvents();

        element.data('accordion', this);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on("click", ".accordion-item > a.item-header", function(){
            var frame = $(this).parent();
            if  (!frame.hasClass('active')) {
                that._openFrame(frame);
            } else {
                that._closeFrame(frame);
            }
        });
    },

    _closeAllFrames: function(){
        var that = this;
        var frames = this.element.children('.accordion-item.active');
        $.each(frames, function(){
            that._closeFrame($(this));
        });
    },

    _openFrame: function(frame){
        var o = this.options;
        var content = frame.children('.item-content');

        if (o.closeAny) this._closeAllFrames();

        content.slideDown(o.speed);
        frame.addClass('active');

        Utils.callback(o.onOpen, frame);
    },

    _closeFrame: function(frame){
        var o = this.options;
        var content = frame.children('.item-content');
        content.slideUp(o.speed,function(){
            frame.removeClass("active");
        });
        Utils.callback(o.onClose, frame);
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
