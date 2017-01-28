$.widget( "corecss.panel" , {

    version: "1.0.0",

    options: {
        collapseMode: 'full',
        duration: CORE_ANIMATION_DURATION,
        open: true
    },

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();
        this._initPanel();
        this._createCollapsible();

        element.data('panel', this);
    },

    _initPanel: function(){
        var that = this, element = this.element, o = this.options;

        if (!element.hasClass('panel')) {
            element.addClass('panel');
        }

        if (o.open === true) {
            element.data("opened", true);
            element.removeClass("collapsed");
        } else {
            element.data("opened", false);
            element.addClass("collapsed");
            element.find(".panel-content").hide();
            if (o.collapseMode === 'full') {
                element.find(".panel-footer").hide();
            }
        }
    },

    _createCollapsible: function(){
        var that = this, element = this.element, o = this.options;
        var toggle = element.find(".panel-header .toggle");

        if (toggle.length == 0) {
            toggle = $("<span>").addClass("toggle").appendTo(element.find(".panel-header"));
        }

        toggle.on("click", function(){

            if (element.data("opened") === true) {
                that.close();
            } else {
                that.open();
            }
        });
    },

    open: function(){
        var that = this, element = this.element, o = this.options;


        element.find(".panel-content").slideDown(o.duration);
        if (o.collapseMode === 'full') {
            element.find(".panel-footer").slideDown(o.duration);
        }

        element.removeClass("collapsed");
        element.data("opened", true);
    },

    close: function(){
        var that = this, element = this.element, o = this.options;

        element.find(".panel-content").slideUp(o.duration);
        if (o.collapseMode === 'full') {
            element.find(".panel-footer").slideUp(o.duration);
        }

        element.addClass("collapsed");
        element.data("opened", false);
    },

    toggle: function(){
        var that = this, element = this.element, o = this.options;

        if (element.data("opened") === true) {
            this.close();
        } else {
            this.open();
        }
    },

    isOpened: function(){
        return this.element.data("opened") === true;
    },

    setContent: function(html){
        var that = this, element = this.element, o = this.options;
        var content_wrapper = element.children(".panel-content");
        if (content_wrapper.length > 0) {
            content_wrapper.html(html);
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

var panels = {

    isPanel: function(el){
        return Utils.isCoreObject(el, 'panel');
    },

    open: function(el){
        if (!this.isPanel(el)) {
            return false;
        }

        $(el).data('panel').open();
    },

    close: function(el){
        if (!this.isPanel(el)) {
            return false;
        }

        $(el).data('panel').close();
    },

    toggle: function(el){
        if (!this.isPanel(el)) {
            return false;
        }

        var panel = $(el).data('panel');
        if (panel.isOpened()) {
            panel.close();
        } else {
            panel.open();
        }
    }
};

$.Panels = window.corePanels = panels;