$.widget("corecss.bottomsheet", {

    version: "1.0.0",

    options: {
        mode: "list",
        overlay: false,
        duration: 200
    },

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();
        this._setToggle();

        element.data('opened', false);

        element.data("bottomsheet", this);
    },

    _setToggle: function(){
        var that = this, element = this.element, o = this.options;

        if (o.toggle !== null) {
            $(o.toggle).on("click", function(e){

                if (element.data('opened') === false) {
                    that.open();
                } else {
                    that.close();
                }

                e.preventDefault();
            });
        }
    },

    open: function(mode){
        var that = this, element = this.element, o = this.options;

        if (mode !== undefined) {
            o.mode = mode;
        }

        var mode_class = o.mode == 'list' ? "list-style" : "grid-style";
        element.removeClass("grid-style list-style").addClass(mode_class);

        element.data('opened', true);

        if (o.overlay === true) {
            var overlay = $("<div>").addClass("overlay").appendTo("body");
        }

        var element_size = element.outerHeight();

        element.animate({
            'margin-top': -element_size
        }, o.duration);
    },

    close: function(){
        var that = this, element = this.element, o = this.options;

        element.data('opened', false);

        element.animate({
            'margin-top': 0
        }, o.duration);
    },

    toggleState: function(mode){
        var element = this.element;

        if (element.data('opened') === true) {
            this.close();
        } else {
            this.open(mode);
        }
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

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

window.toggleBottomSheet = function(target, mode){
    $(target).data("bottomsheet").toggleState(mode);
};

window.openBottomSheet = function(target, mode){
    $(target).data("bottomsheet").open(mode);
};

window.closeBottomSheet = function(target){
    $(target).data("bottomsheet").close();
};

