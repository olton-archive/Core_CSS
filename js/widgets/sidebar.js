$.widget("corecss.sidebar", {

    version: "1.0.0",

    options: {
        toggle: null,
        shift: null,
        overlay: false,
        duration: CORE_ANIMATION_DURATION
    },

    _create: function () {
        var that = this, element = this.element, o = this.options;

        if (!element.hasClass('sidebar')) {
            element.addClass('sidebar');
        }

        this._setOptionsFromDOM();
        this._setToggle();

        element.data('opened', false);
        element.data("sidebar", this);
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
                //e.stopPropagation();
            });
        }
    },

    open: function(){
        var that = this, element = this.element, o = this.options;
        var overlay;

        // if ($(o.toggle).hasClass("nav-button")) {
        //     $(o.toggle).addClass("transform");
        // }

        element.data('opened', true);

        if (o.overlay === true) {
            overlay = $("<div>").attr("id", "js-sidebar-overlay").addClass("overlay").appendTo($('body'));
            overlay.on("click", function(){
                that.close();
            });
        }

        // element.animate({
        //     left: 0
        // }, o.duration);
        element.addClass('active');

        if (o.shift !== null) {

            $.each(o.shift.split(","), function(){
                $(this).animate({left: element.outerWidth()}, o.duration);
            });
        }
    },

    close: function(){
        var that = this, element = this.element, o = this.options;
        var overlay = $("#js-sidebar-overlay");

        // if ($(o.toggle).hasClass("nav-button")) {
        //     $(o.toggle).removeClass("transform");
        // }

        element.data('opened', false);

        if (overlay.length > 0) {
            overlay.off("click").remove();
        }

        if (o.shift !== null) {
            $.each(o.shift.split(","), function(){
                $(this).animate({left: 0}, o.duration);
            });
        }

        // element.animate({
        //     left: "-100%"
        // }, o.duration);
        element.removeClass('active');
    },

    toggle: function(){
        var element = this.element;

        if (element.data('opened') === true) {
            this.close();
        } else {
            this.open();
        }
    },

    isOpened: function(){
        return this.element.data('opened') === true
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

var sidebar = {
    isSidebar: function(el){
        return Utils.isCoreObject(el, 'sidebar');
    },

    open: function(el){
        if (!this.isSidebar(el)) {
            return false;
        }

        var sb = $(el).data('sidebar');

        if (!sb.isOpened()) {
            sb.open();
        }
    },

    close: function(el){
        if (!this.isSidebar(el)) {
            return false;
        }

        var sb = $(el).data('sidebar');

        if (sb.isOpened()) {
            sb.close();
        }
    },

    toggle: function(el){
        if (!this.isSidebar(el)) {
            return false;
        }

        var sb = $(el).data('sidebar');

        sb.toggle();
    }
};

$.Sidebar = window.coreSidebar = sidebar;