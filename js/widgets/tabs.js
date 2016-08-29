$.widget( "corecss.tabs" , {

    version: "1.0.0",

    options: {
        openTarget: false,
        duration: CORE_ANIMATION_DURATION,
        onTabClick: function(tab){return true;},
        onTabChange: function(tab){}
    },


    _create: function () {
        var that = this, element = this.element, o = this.options;
        var tabs = element.children('.tabs').find('li');
        var frames = element.children('.tabs-content').children('div');
        var tab = $(tabs[0]);

        //console.log(tab);

        this._setOptionsFromDOM();

        this._createTabs();
        this._createEvents();
        this._openTab(tab, null);

        element.data('tabs', this);
    },

    _createTabs: function(){
        var element = this.element, o = this.options;
        var tabs_container = element.children('.tabs');
        var tabs = element.children('.tabs').find('li:not(.tab-marker)');
        var tab_marker = element.children('.tabs').find('li.tab-marker');

        if (tab_marker.length == 0) {
            tab_marker = $("<li>").addClass("tab-marker");
            tab_marker.appendTo(tabs_container);
        }
    },

    _openTab: function(tab, direction){
        var element = this.element, o = this.options;
        var tabs = element.children('.tabs').find('li');
        var frames = element.children('.tabs-content').children('div');
        var frame = '#'+tab.data('target');
        var marker = element.children('.tabs').find('li.tab-marker');
        var tab_width = tab.outerWidth();

        tabs.removeClass('active');
        frames.hide();

        tab.addClass('active');
        $(frame).show();

        marker.animate({
            width: tab_width,
            top: '100%',
            left: tab.position().left
        }, o.duration);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var tabs = element.children('.tabs').find('li');
        var frames = element.children('.frames').children('div');

        element.on('click', '.tabs > li', function(e){

            if ($(this).hasClass('tab-marker')) return;

            var result;
            var tab = $(this), target = tab.data('target'), frame = $(target);
            var tab_active = element.children(".tabs").find("li.active");
            var change_direction = tabs.index(tab) > tabs.index(tab_active) ? 'right' : 'left';

            //console.log(change_direction);

            if (tab.parent().hasClass('disabled')) {return false;}

            if (typeof o.onTabClick === 'function') {
                if (!o.onTabClick(tab)) {return false;}
            } else {
                if (typeof window[o.onTabClick] === 'function') {
                    if (!window[o.onTabClick](tab)) {return false;}
                } else {
                    result = eval("(function(){"+o.onTabClick+"})");
                    if (!result.call(tab)) {return false;}
                }
            }

            if (target.isUrl()) {
                window.location.href = target;
                return true;
            }

            element.data('activeTab', target);

            that._openTab(tab, change_direction);

            if (typeof o.onTabChange === 'function') {
                o.onTabChange(tab);
            } else {
                if (typeof window[o.onTabChange] === 'function') {
                    window[o.onTabChange](tab);
                } else {
                    result = eval("(function(){"+o.onTabChange+"})");
                    result.call(tab);
                }
            }

            e.preventDefault();
            //e.stopPropagation();
        });
    },

    hideTab: function(tab){

    },

    showTab: function(tab){

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
