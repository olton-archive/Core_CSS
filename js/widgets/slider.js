$.widget( "corecss.slider" , {

    version: "1.0.0",

    options: {
    },

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        element.data('slider', this);
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
