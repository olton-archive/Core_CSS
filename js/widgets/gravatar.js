var gravatar = {
    getImage: function(email, size, def, is_jquery_object){
        var image = $("<img>");

        image.attr("src", this.getImageSrc(email, size));

        return is_jquery_object === true ? image : image[0];
    },

    getImageSrc: function(email, size, def){
        if (email == undefined || email.trim() == '') {
            return "";
        }

        size = size || 80;
        def = def || '404';

        return "https://www.gravatar.com/avatar/" + hex_md5((email.toLowerCase()).trim()) + '?size=' + size + '&d=' + def;
    }
};

$.Gravatars = window.coreGravatars = gravatar;

$.widget( "corecss.gravatar" , {

    version: "1.0.0",

    options: {
        email: null,
        size: 80,
        default: 'mm' // mm, identicon, monsterid, wavatar, retro, blank
    },

    _create: function () {
        var that = this, element = this.element, o = this.options;
        var gravatar_src, image;

        this._setOptionsFromDOM();

        if (o.email != null) {
            gravatar_src = gravatar.getImageSrc(o.email, o.size, o.default);

            if (element[0].tagName == 'IMG') {
                element.attr('src', gravatar_src);
            } else {
                image = gravatar.getImage(o.email, o.size, o.default, true);
                image.appendTo(element);
            }
        }

        element.data('gravatar', this);
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
