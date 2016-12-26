$.widget( "corecss.dialog" , {

    version: "1.0.0",

    options: {
        modal: true,
        overlay: true,
        overlayColor: 'default',
        overlayClickClose: false,
        type: 'default', // success, alert, warning, info
        content: false,
        contentFull: false,
        hide: false,
        width: '320',
        height: 'auto',
        background: 'default',
        color: 'default',
        show: false,
        href: false,
        contentType: 'default', // video
        duration: CORE_ANIMATION_DURATION,
        easing: 'swing',
        closeAction: true,
        closeElement: ".js-dialog-close",
        removeOnClose: false,
        cls: "",

        // _interval: undefined,
        // _overlay: undefined,

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

        this._interval = undefined;
        this._overlay = undefined;


        if (o.overlay) {
            this._createOverlay();
        }
        this._createDialog();

        if (o.closeAction === true) {
            element.on("click", ".dialog-actions > button" + o.closeElement, function(){
                that.close();
            });
            element.on("click", ".js-dialog-close", function(){
                that.close();
            });
        }

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
            if (Utils.isColor(o.overlayColor)) {
                overlay.css({
                    background: o.overlayColor
                });
            } else {
                overlay.addClass(o.overlayColor);
            }
        }

        this._overlay = overlay;
    },

    _createDialog: function(){
        var that = this, element = this.element, o = this.options;

        element.addClass('dialog');

        if (o.type !== 'default') {
            element.addClass(o.type);
        }

        if (o.background !== 'default') {
            if (Utils.isColor(o.background)) {
                element.css({
                    background: o.background
                });
            } else {
                element.addClass(o.background);
            }
        }

        if (o.color !== 'default') {
            if (Utils.isColor(o.color)) {
                element.css({
                    color: o.color
                });
            } else {
                element.addClass(o.color);
            }
        }

        element.css({
            width: o.width,
            height: o.height,
            visibility: "hidden",
            top: '100%'
        });

        if (o.cls !== "") {
            element.addClass(o.cls);
        }
    },

    _hide: function(){
        var element = this.element, o = this.options;
        element.animate({
            top: "100%",
            opacity: 0
        }, o.duration, function(){
            element.css({
                visibility: "hidden"
            });
            if (o.removeOnClose === true) {
                element.remove();
            }
        });
    },

    _show: function(){
        var element = this.element, o = this.options;
        this._setContent();
        element.css({
            visibility: "visible",
            top: "100%"
        }).animate({
            top: $(window).height()/2-(element.outerHeight()/2),
            opacity: 1
        }, o.duration, o.easing);
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

        if (o.contentFull !== false && content.length === 0) {
            content = $("<div>").addClass("dialog-content").appendTo(element);
        }

        if (o.contentType === 'video') {
            content.addClass('video-container');
        }

        if (o.content === false && o.contentFull === false && o.href === false) {
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

        if (o.contentFull) {

            if (o.contentFull instanceof jQuery) {
                o.contentFull.appendTo(element);
            } else {
                element.html(o.contentFull);
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

        if (o.modal || o.overlay) {
            overlay = this._overlay;
            overlay.appendTo('body').show();
            if (o.overlayClickClose) {
                overlay.on('click', function(){
                    that.close();
                });
            }
        }

        this._show();

        //console.log('after show');

        $.CoreCss.callback(o.onDialogOpen, element);

        if (o.hide && parseInt(o.hide) > 0) {
            this._interval = setTimeout(function(){
                that.close();
            }, parseInt(o.hide));
        }
    },

    close: function(){
        var that = this, element = this.element, o = this.options;

        clearInterval(this._interval);

        if (o.overlay) {
            $('body').find('.overlay').remove();
        }

        element.data('opened', false);

        //element.fadeOut();
        this._hide();

        $.CoreCss.callback(o.onDialogClose, element);

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
    open: function (el, content, contentType){
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

    toggle: function(el, content, contentType){
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
            dialog_obj.open();
        }
    },

    create: function(data){
        var dlg, id, html, buttons;

        id = "dialog_id_" + (new Date()).getTime();
        dlg = $("<div id='"+id+"'></div>");

        if (data.title !== undefined) {
            $("<div class='dialog-title'>"+data.title+"</div>").appendTo(dlg);
        }
        if (data.content !== undefined) {
            $("<div class='dialog-content'>").append($(data.content)).appendTo(dlg);
        }
        if (data.actions !== undefined && typeof data.actions == 'object') {

            buttons = $("<div class='dialog-actions'></div>").appendTo(dlg);

            $.each(data.actions, function(){
                var item = this;
                var button = $("<button class='flat-button'>"+item.title+"</button>");

                if (item.onclick != undefined) button.on("click", function(){

                    $.CoreCss.callback(item.onclick, dlg);

                });

                if (item.cls !== undefined) {
                    button.addClass(item.cls);
                }

                button.appendTo(buttons);
            });
        }

        dlg.appendTo($("body"));

        var dlg_options = $.extend({}, {
            show: true,
            closeAction: true,
            removeOnClose: true
        }, (data.options != undefined ? data.options : {}));

        return dlg.dialog(dlg_options);

    }
};

window.coreDialog = dialog;

$(window).on('resize', function(){
    var dialogs = $('.dialog');
    $.each(dialogs, function(){
        var dlg = $(this).data('dialog');

        if (dlg.element.data('opened') !== true) {
            return;
        }

        dlg.reset();
    });
});

$.Dialog = function(data){
    return coreDialog.create(data);
};