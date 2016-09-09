$.widget( "corecss.dialog" , {

    version: "1.0.0",

    options: {
        modal: false,
        overlay: false,
        overlayColor: 'default',
        overlayClickClose: false,
        type: 'default', // success, alert, warning, info
        content: false,
        hide: false,
        width: '320',
        height: 'auto',
        background: 'default',
        color: 'default',
        show: false,
        href: false,
        contentType: 'default', // video

        _interval: undefined,
        _overlay: undefined,

        onDialogOpen: function(dialog){},
        onDialogClose: function(dialog){}
    },

    _create: function () {
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

        if (o.overlay) {
            this._createOverlay();
        }
        this._createDialog();

        element.appendTo($('body'));
        element.data('dialog', this);

        if (o.show) {
            this.open();
        }
    },

    _createOverlay: function(){
        var that = this, element = this.element, o = this.options;
        var overlay = $('body').find('.overlay');

        if (overlay.length === 0) {
            overlay = $("<div/>").addClass('overlay');
        }

        if (o.overlayColor) {
            if (o.overlayColor.isColor()) {
                overlay.css({
                    background: o.overlayColor
                });
            } else {
                overlay.addClass(o.overlayColor);
            }
        }

        o._overlay = overlay;
    },

    _createDialog: function(){
        var that = this, element = this.element, o = this.options;

        element.addClass('dialog');

        if (o.type !== 'default') {
            element.addClass(o.type);
        }

        if (o.background !== 'default') {
            if (o.background.isColor()) {
                element.css({
                    background: o.background
                });
            } else {
                element.addClass(o.background);
            }
        }

        if (o.color !== 'default') {
            if (o.color.isColor()) {
                element.css({
                    color: o.color
                });
            } else {
                element.addClass(o.color);
            }
        }

        element.css({
            width: o.width,
            height: o.height
        });

        this._hide();
    },

    _hide: function(){
        var element = this.element;
        element.css({
            visibility: "hidden"
        });
    },

    _show: function(){
        var element = this.element;
        this._setContent();
        element.css({
            visibility: "visible"
        });
    },

    _setPosition: function(){
        var that = this, element = this.element, o = this.options;
        var width = element.outerWidth(),
            height = element.outerHeight();

        element.css({
            left: ( $(window).width() - width ) / 2,
            top: ( $(window).height() - height ) / 2
        });
    },

    _setContent: function(){
        var that = this, element = this.element, o = this.options;
        var content = element.find('.dialog-content');

        if (content.length === 0) {
            content = $("<div>").addClass("dialog-content").appendTo(element);
        }

        if (o.contentType === 'video') {
            content.addClass('video-container');
        }

        if (o.content === false && o.href === false) {
            return false;
        }

        if (o.content) {

            if (o.content instanceof jQuery) {
                o.content.appendTo(content);
            } else {
                content.html(o.content);
            }

            this._setPosition();
        }

        if (o.href) {
            $.get(
                o.href,
                function(response){
                    content.html(response);
                    that._setPosition();
                }
            );
        }

    },

    setContent: function(content){
        this.options.contentType = "default";
        this.options.href = false;
        this.options.content = content;
        this._setContent();
    },

    setContentHref: function(href){
        this.options.contentType = "href";
        this.options.content = false;
        this.options.href = href;
        this._setContent();
    },

    setContentVideo: function(content){
        this.options.contentType = "video";
        this.options.content = content;
        this.options.href = false;
        this._setContent();
    },

    toggle: function(){
        var element = this.element;
        if (element.data('opened')) {
            this.close();
        } else {
            this.open();
        }
    },

    open: function(){
        var that = this, element = this.element, o = this.options;
        var overlay;

        this._setPosition();

        element.data('opened', true);

        if (o.overlay) {
            overlay = o._overlay;
            overlay.appendTo('body').show();
            if (o.overlayClickClose) {
                overlay.on('click', function(){
                    that.close();
                });
            }
        }

        this._show();

        if (typeof o.onDialogOpen === 'function') {
            o.onDialogOpen(element);
        } else {
            if (typeof window[o.onDialogOpen] === 'function') {
                window[o.onDialogOpen](element);
            } else {
                var result = eval("(function(){"+o.onDialogOpen+"})");
                result.call(element);
            }
        }

        if (o.hide && parseInt(o.hide) > 0) {
            o._interval = setTimeout(function(){
                that.close();
            }, parseInt(o.hide));
        }
    },

    close: function(){
        var that = this, element = this.element, o = this.options;

        clearInterval(o._interval);

        if (o.overlay) {
            $('body').find('.overlay').remove();
        }

        element.data('opened', false);

        //element.fadeOut();
        this._hide();

        if (typeof o.onDialogClose === 'function') {
            o.onDialogClose(element);
        } else {
            if (typeof window[o.onDialogClose] === 'function') {
                window[o.onDialogClose](element);
            } else {
                var result = eval("(function(){"+o.onDialogClose+"})");
                result.call(element);
            }
        }
    },

    reset: function(){
        this._setPosition();
    },

    _destroy: function () {
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    }
});

var dialog = {
    open: function (el, place, content, contentType){
        var dialog = $(el), dialog_obj;
        if (dialog.length == 0) {
            console.log('Dialog ' + el + ' not found!');
            return false;
        }

        dialog_obj = dialog.data('dialog');

        if (dialog_obj == undefined) {
            console.log('Element not contain role dialog! Please add attribute data-role="dialog" to element ' + el);
            return false;
        }

        if (content != undefined) {
            switch (contentType) {
                case 'href': dialog_obj.setContentHref(content); break;
                case 'video': dialog_obj.setContentVideo(content); break;
                default: dialog_obj.setContent(content);
            }
        }

        if (place !== undefined) {
            dialog_obj.options.place = place;
        }

        dialog_obj.open();
    },

    close: function(el){
        var dialog = $(el), dialog_obj;
        if (dialog.length == 0) {
            console.log('Dialog ' + el + ' not found!');
            return false;
        }

        dialog_obj = dialog.data('dialog');

        if (dialog_obj == undefined) {
            console.log('Element not contain role dialog! Please add attribute data-role="dialog" to element ' + el);
            return false;
        }

        dialog_obj.close();
    },

    toggle: function(el, place, content, contentType){
        var dialog = $(el), dialog_obj;
        if (dialog.length == 0) {
            console.log('Dialog ' + el + ' not found!');
            return false;
        }

        dialog_obj = dialog.data('dialog');

        if (dialog_obj == undefined) {
            console.log('Element not contain role dialog! Please add attribute data-role="dialog" to element ' + el);
            return false;
        }

        if (content != undefined) {
            switch (contentType) {
                case 'href': dialog_obj.setContentHref(content); break;
                case 'video': dialog_obj.setContentVideo(content); break;
                default: dialog_obj.setContent(content);
            }
        }

        if (dialog_obj.element.data('opened') === true) {
            dialog_obj.close();
        } else {
            if (place !== undefined) {
                dialog_obj.options.place = place;
            }
            dialog_obj.open();
        }
    }
};

window.coreDialog = dialog;

$(window).on('resize', function(){
    var dialogs = $('[data-role=dialog]');
    $.each(dialogs, function(){
        var dialog = this, $dialog = $(this), dlg = $dialog.data('dialog');

        if (dlg.element.data('opened') !== true) {
            return false;
        }

        dlg.reset();
    });
});

$.Dialog = function(content, title, actions){
    var dlg = $("<div>").data('role', 'dialog');
};