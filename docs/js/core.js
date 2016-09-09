/*!
 * Core CSS v1.0.0 (https://github.com/imena/core-css)
 * Copyright 2016 Sergey Pimenov
 * Licensed under  ()
 */

(function( factory ) {
    if ( typeof define === 'function' && define.amd ) {
        define([ 'jquery' ], factory );
    } else {
        factory( jQuery );
    }
}(function( jQuery ) { 
'use strict';

var $ = jQuery;

// Source: js/init.js
if (window.CALENDAR_WEEK_START == undefined) {window.CALENDAR_WEEK_START = 1;}
if (window.CALENDAR_LOCALE == undefined) {window.CALENDAR_LOCALE = 'en';}
if (window.CORE_ANIMATION_DURATION == undefined) {window.CORE_ANIMATION_DURATION = 200;}

var CoreCss = {
    uniqueId: function (prefix) {
var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },
    
    isTouchDevice: function() {
        return (('ontouchstart' in window)
        || (navigator.MaxTouchPoints > 0)
        || (navigator.msMaxTouchPoints > 0));
    },

    secondsToFormattedString: function(time){
        var hours, minutes, seconds;
    
        hours = parseInt( time / 3600 ) % 24;
        minutes = parseInt( time / 60 ) % 60;
        seconds = time % 60;
    
        return (hours ? (hours) + ":" : "") + (minutes < 10 ? "0"+minutes : minutes) + ":" + (seconds < 10 ? "0"+seconds : seconds);
    },

    init: function(){
        var widgets = $("[data-role]");

        CoreCss.initWidgets(widgets);

        var observer, observerOptions, observerCallback;

        observerOptions = {
            'childList': true,
            'subtree': true
        };

        observerCallback = function(mutations){

            //console.log(mutations);

            mutations.map(function(record){

                if (record.addedNodes) {

                    /*jshint loopfunc: true */
                    var obj, widgets, plugins;

                    for(var i = 0, l = record.addedNodes.length; i < l; i++) {
                        obj = $(record.addedNodes[i]);

                        plugins = obj.find("[data-role]");

                        if (obj.data('role') !== undefined) {
                            widgets = $.merge(plugins, obj);
                        } else {
                            widgets = plugins;
                        }

                        if (widgets.length) {
                            CoreCss.initWidgets(widgets);
                        }
                    }
                }
            });
        };

        //console.log($(document));
        observer = new MutationObserver(observerCallback);
        observer.observe(document, observerOptions);
    },

    initWidgets: function(widgets) {
        $.each(widgets, function () {
            var $this = $(this), w = this;
            var roles = $this.data('role').split(/\s*,\s*/);
            roles.map(function (func) {
                try {
                    //console.log(func);
                    //console.log($.fn[func]);
                    //$(w)[func]();
                    if ($.fn[func] !== undefined && $this.data(func + '-initiated') !== true) {
                        $.fn[func].call($this);
                        $this.data(func + '-initiated', true);
                    }
                } catch (e) {
                    if (window.CORE_DEBUG != undefined) {
                        console.log(e.message, e.stack);
                    }
                }
            });
        });
    }
};


// Source: js/utils/easing.js
$.easing['jswing'] = $.easing['swing'];

$.extend($.easing, {
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert($.easing.default);
        return $.easing[$.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - $.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) return $.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return $.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

// Source: js/utils/extensions.js
Array.prototype.shuffle = function () {
    var currentIndex = this.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = this[currentIndex];
        this[currentIndex] = this[randomIndex];
        this[randomIndex] = temporaryValue;
    }

    return this;
};

Array.prototype.clone = function () {
    return this.slice(0);
};

Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

String.prototype.isUrl = function () {
var regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(this);
};

String.prototype.isColor = function () {
return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this);
};


/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */
// this is a temporary solution

var dateFormat = function () {

var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) {
                val = "0" + val;
            }
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length === 1 && Object.prototype.toString.call(date) === "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        //console.log(arguments);

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date();
        //if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) === "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        //console.log(locale);

        var locale = window.CALENDAR_LOCALE || 'en';

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: window.CALENDAR_LOCALES[locale].days[D],
                dddd: window.CALENDAR_LOCALES[locale].days[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: window.CALENDAR_LOCALES[locale].months[m],
                mmmm: window.CALENDAR_LOCALES[locale].months[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    default: "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// For convenience...
Date.prototype.format = function (mask, utc) {
return dateFormat(this, mask, utc);
};

// Source: js/utils/locales.js
window.CALENDAR_LOCALES = {
    'en': {
        months: [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        days: [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
            "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa",
            "Sun", "Mon", "Tus", "Wen", "Thu", "Fri", "Sat"
        ],
        buttons: [
            "Today", "Clear", "Cancel", "Help", "Prior", "Next", "Finish", "Ok"
        ]
    },
    'ua': {
        months: [
            "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
            "Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"
        ],
        days: [
            "Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота",
            "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
            "Нед", "Пон", "Вiв", "Сер", "Чет", "Пят", "Суб"
        ],
        buttons: [
            "Сьогодні", "Очистити", "Скасувати", "Допомога", "Назад", "Вперед", "Готово", "Ok"
        ]
    },
    'ru': {
        months: [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
            "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
        ],
        days: [
            "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",
            "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
            "Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"
        ],
        buttons: [
            "Сегодня", "Очистить", "Отменить", "Помощь", "Назад", "Вперед", "Готово", "Ok"
        ]
    }
};

// Source: js/utils/ripple.js
$(document).on("click", ".ripple", function(e){
    var ink, d, x, y, that = $(this);

    if (that.css("position") == 'static') {
        that.css("position", "relative")
    }

    if(that.find(".ripple-ink").length === 0){
        that.prepend("<span class='ripple-ink'></span>");
    }

    ink = that.find(".ripple-ink");
    ink.removeClass("ripple-animate");

    if(!ink.height() && !ink.width()){
        d = Math.max(that.outerWidth(), that.outerHeight());
        ink.css({height: d, width: d});
    }

    x = e.pageX - that.offset().left - ink.width()/2;
    y = e.pageY - that.offset().top - ink.height()/2;

    ink.css({top: y+'px', left: x+'px'}).addClass("ripple-animate");
});

// Source: js/utils/storage.js
var storage = {
    key: "MyAppKey",

    setKey: function(key){
        this.key = key;
    },

    setItem: function(key, value){
        window.localStorage.setItem(storage.key + ":" + key, value);
    },

    getItem: function(key, default_value){
        return window.localStorage.getItem(storage.key + ":" + key) || (default_value || null);
    },

    getItemPart: function(key, sub_key, default_value){
        var val = this.getItem(key, default_value);
        return val !== null && val[sub_key] !== undefined ? val[sub_key] : null;
    },

    delItem: function(key){
        window.localStorage.removeItem(storage.key + ":" + key)
    }
};

window.coreStorage = storage;
// Source: js/utils/widget_factory.js
$.ui = $.ui || {};

var version = $.ui.version = "1.12.0-rc.2";

var widgetUuid = 0;
var widgetSlice = Array.prototype.slice;

$.cleanData = ( function( orig ) {
    return function( elems ) {
        var events, elem, i;
        for ( i = 0; ( elem = elems[ i ] ) != null; i++ ) {
            try {

                // Only trigger remove when necessary to save time
                events = $._data( elem, "events" );
                if ( events && events.remove ) {
                    $( elem ).triggerHandler( "remove" );
                }

                // Http://bugs.jquery.com/ticket/8235
            } catch ( e ) {}
        }
        orig( elems );
    };
} )( $.cleanData );

$.widget = function( name, base, prototype ) {
    var existingConstructor, constructor, basePrototype;

    // ProxiedPrototype allows the provided prototype to remain unmodified
    // so that it can be used as a mixin for multiple widgets (#8876)
    var proxiedPrototype = {};

    var namespace = name.split( "." )[ 0 ];
    name = name.split( "." )[ 1 ];
    var fullName = namespace + "-" + name;

    if ( !prototype ) {
        prototype = base;
        base = $.Widget;
    }

    if ( $.isArray( prototype ) ) {
        prototype = $.extend.apply( null, [ {} ].concat( prototype ) );
    }

    // Create selector for plugin
    $.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
        return !!$.data( elem, fullName );
    };

    $[ namespace ] = $[ namespace ] || {};
    existingConstructor = $[ namespace ][ name ];
    constructor = $[ namespace ][ name ] = function( options, element ) {

        // Allow instantiation without "new" keyword
        if ( !this._createWidget ) {
            return new constructor( options, element );
        }

        // Allow instantiation without initializing for simple inheritance
        // must use "new" keyword (the code above always passes args)
        if ( arguments.length ) {
            this._createWidget( options, element );
        }
    };

    // Extend with the existing constructor to carry over any static properties
    $.extend( constructor, existingConstructor, {
        version: prototype.version,

        // Copy the object used to create the prototype in case we need to
        // redefine the widget later
        _proto: $.extend( {}, prototype ),

        // Track widgets that inherit from this widget in case this widget is
        // redefined after a widget inherits from it
        _childConstructors: []
    } );

    basePrototype = new base();

    // We need to make the options hash a property directly on the new instance
    // otherwise we'll modify the options hash on the prototype that we're
    // inheriting from
    basePrototype.options = $.widget.extend( {}, basePrototype.options );
    $.each( prototype, function( prop, value ) {
        if ( !$.isFunction( value ) ) {
            proxiedPrototype[ prop ] = value;
            return;
        }
        proxiedPrototype[ prop ] = ( function() {
            function _super() {
                return base.prototype[ prop ].apply( this, arguments );
            }

            function _superApply( args ) {
                return base.prototype[ prop ].apply( this, args );
            }

            return function() {
                var __super = this._super;
                var __superApply = this._superApply;
                var returnValue;

                this._super = _super;
                this._superApply = _superApply;

                returnValue = value.apply( this, arguments );

                this._super = __super;
                this._superApply = __superApply;

                return returnValue;
            };
        } )();
    } );
    constructor.prototype = $.widget.extend( basePrototype, {

        // TODO: remove support for widgetEventPrefix
        // always use the name + a colon as the prefix, e.g., draggable:start
        // don't prefix for widgets that aren't DOM-based
        widgetEventPrefix: existingConstructor ? ( basePrototype.widgetEventPrefix || name ) : name
    }, proxiedPrototype, {
        constructor: constructor,
        namespace: namespace,
        widgetName: name,
        widgetFullName: fullName
    } );

    // If this widget is being redefined then we need to find all widgets that
    // are inheriting from it and redefine all of them so that they inherit from
    // the new version of this widget. We're essentially trying to replace one
    // level in the prototype chain.
    if ( existingConstructor ) {
        $.each( existingConstructor._childConstructors, function( i, child ) {
            var childPrototype = child.prototype;

            // Redefine the child widget using the same prototype that was
            // originally used, but inherit from the new version of the base
            $.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor,
                child._proto );
        } );

        // Remove the list of existing child constructors from the old constructor
        // so the old child constructors can be garbage collected
        delete existingConstructor._childConstructors;
    } else {
        base._childConstructors.push( constructor );
    }

    $.widget.bridge( name, constructor );

    return constructor;
};

$.widget.extend = function( target ) {
    var input = widgetSlice.call( arguments, 1 );
    var inputIndex = 0;
    var inputLength = input.length;
    var key;
    var value;

    for ( ; inputIndex < inputLength; inputIndex++ ) {
        for ( key in input[ inputIndex ] ) {
            value = input[ inputIndex ][ key ];
            if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {

                // Clone objects
                if ( $.isPlainObject( value ) ) {
                    target[ key ] = $.isPlainObject( target[ key ] ) ?
                        $.widget.extend( {}, target[ key ], value ) :

                        // Don't extend strings, arrays, etc. with objects
                        $.widget.extend( {}, value );

                    // Copy everything else by reference
                } else {
                    target[ key ] = value;
                }
            }
        }
    }
    return target;
};

$.widget.bridge = function( name, object ) {
    var fullName = object.prototype.widgetFullName || name;
    $.fn[ name ] = function( options ) {
        var isMethodCall = typeof options === "string";
        var args = widgetSlice.call( arguments, 1 );
        var returnValue = this;

        if ( isMethodCall ) {
            this.each( function() {
                var methodValue;
                var instance = $.data( this, fullName );

                if ( options === "instance" ) {
                    returnValue = instance;
                    return false;
                }

                if ( !instance ) {
                    return $.error( "cannot call methods on " + name +
                        " prior to initialization; " +
                        "attempted to call method '" + options + "'" );
                }

                if ( !$.isFunction( instance[ options ] ) || options.charAt( 0 ) === "_" ) {
                    return $.error( "no such method '" + options + "' for " + name +
                        " widget instance" );
                }

                methodValue = instance[ options ].apply( instance, args );

                if ( methodValue !== instance && methodValue !== undefined ) {
                    returnValue = methodValue && methodValue.jquery ?
                        returnValue.pushStack( methodValue.get() ) :
                        methodValue;
                    return false;
                }
            } );
        } else {

            // Allow multiple hashes to be passed on init
            if ( args.length ) {
                options = $.widget.extend.apply( null, [ options ].concat( args ) );
            }

            this.each( function() {
                var instance = $.data( this, fullName );
                if ( instance ) {
                    instance.option( options || {} );
                    if ( instance._init ) {
                        instance._init();
                    }
                } else {
                    $.data( this, fullName, new object( options, this ) );
                }
            } );
        }

        return returnValue;
    };
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",

    options: {
        classes: {},
        disabled: false,

        // Callbacks
        create: null
    },

    _createWidget: function( options, element ) {
        element = $( element || this.defaultElement || this )[ 0 ];
        this.element = $( element );
        this.uuid = widgetUuid++;
        this.eventNamespace = "." + this.widgetName + this.uuid;

        this.bindings = $();
        this.hoverable = $();
        this.focusable = $();
        this.classesElementLookup = {};

        if ( element !== this ) {
            $.data( element, this.widgetFullName, this );
            this._on( true, this.element, {
                remove: function( event ) {
                    if ( event.target === element ) {
                        this.destroy();
                    }
                }
            } );
            this.document = $( element.style ?

                // Element within the document
                element.ownerDocument :

                // Element is window or document
            element.document || element );
            this.window = $( this.document[ 0 ].defaultView || this.document[ 0 ].parentWindow );
        }

        this.options = $.widget.extend( {},
            this.options,
            this._getCreateOptions(),
            options );

        this._create();

        if ( this.options.disabled ) {
            this._setOptionDisabled( this.options.disabled );
        }

        this._trigger( "create", null, this._getCreateEventData() );
        this._init();
    },

    _getCreateOptions: function() {
        return {};
    },

    _getCreateEventData: $.noop,

    _create: $.noop,

    _init: $.noop,

    destroy: function() {
        var that = this;

        this._destroy();
        $.each( this.classesElementLookup, function( key, value ) {
            that._removeClass( value, key );
        } );

        // We can probably remove the unbind calls in 2.0
        // all event bindings should go through this._on()
        this.element
            .off( this.eventNamespace )
            .removeData( this.widgetFullName );
        this.widget()
            .off( this.eventNamespace )
            .removeAttr( "aria-disabled" );

        // Clean up events and states
        this.bindings.off( this.eventNamespace );
    },

    _destroy: $.noop,

    widget: function() {
        return this.element;
    },

    option: function( key, value ) {
        var options = key;
        var parts;
        var curOption;
        var i;

        if ( arguments.length === 0 ) {

            // Don't return a reference to the internal hash
            return $.widget.extend( {}, this.options );
        }

        if ( typeof key === "string" ) {

            // Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
            options = {};
            parts = key.split( "." );
            key = parts.shift();
            if ( parts.length ) {
                curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
                for ( i = 0; i < parts.length - 1; i++ ) {
                    curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
                    curOption = curOption[ parts[ i ] ];
                }
                key = parts.pop();
                if ( arguments.length === 1 ) {
                    return curOption[ key ] === undefined ? null : curOption[ key ];
                }
                curOption[ key ] = value;
            } else {
                if ( arguments.length === 1 ) {
                    return this.options[ key ] === undefined ? null : this.options[ key ];
                }
                options[ key ] = value;
            }
        }

        this._setOptions( options );

        return this;
    },

    _setOptions: function( options ) {
        var key;

        for ( key in options ) {
            this._setOption( key, options[ key ] );
        }

        return this;
    },

    _setOption: function( key, value ) {
        if ( key === "classes" ) {
            this._setOptionClasses( value );
        }

        this.options[ key ] = value;

        if ( key === "disabled" ) {
            this._setOptionDisabled( value );
        }

        return this;
    },

    _setOptionClasses: function( value ) {
        var classKey, elements, currentElements;

        for ( classKey in value ) {
            currentElements = this.classesElementLookup[ classKey ];
            if ( value[ classKey ] === this.options.classes[ classKey ] ||
                !currentElements ||
                !currentElements.length ) {
                continue;
            }

            // We are doing this to create a new jQuery object because the _removeClass() call
            // on the next line is going to destroy the reference to the current elements being
            // tracked. We need to save a copy of this collection so that we can add the new classes
            // below.
            elements = $( currentElements.get() );
            this._removeClass( currentElements, classKey );

            // We don't use _addClass() here, because that uses this.options.classes
            // for generating the string of classes. We want to use the value passed in from
            // _setOption(), this is the new value of the classes option which was passed to
            // _setOption(). We pass this value directly to _classes().
            elements.addClass( this._classes( {
                element: elements,
                keys: classKey,
                classes: value,
                add: true
            } ) );
        }
    },

    _setOptionDisabled: function( value ) {
        this._toggleClass( this.widget(), this.widgetFullName + "-disabled", null, !!value );

        // If the widget is becoming disabled, then nothing is interactive
        if ( value ) {
            this._removeClass( this.hoverable, null, "ui-state-hover" );
            this._removeClass( this.focusable, null, "ui-state-focus" );
        }
    },

    enable: function() {
        return this._setOptions( { disabled: false } );
    },

    disable: function() {
        return this._setOptions( { disabled: true } );
    },

    _classes: function( options ) {
        var full = [];
        var that = this;

        options = $.extend( {
            element: this.element,
            classes: this.options.classes || {}
        }, options );

        function processClassString( classes, checkOption ) {
            var current, i;
            for ( i = 0; i < classes.length; i++ ) {
                current = that.classesElementLookup[ classes[ i ] ] || $();
                if ( options.add ) {
                    current = $( $.unique( current.get().concat( options.element.get() ) ) );
                } else {
                    current = $( current.not( options.element ).get() );
                }
                that.classesElementLookup[ classes[ i ] ] = current;
                full.push( classes[ i ] );
                if ( checkOption && options.classes[ classes[ i ] ] ) {
                    full.push( options.classes[ classes[ i ] ] );
                }
            }
        }

        if ( options.keys ) {
            processClassString( options.keys.match( /\S+/g ) || [], true );
        }
        if ( options.extra ) {
            processClassString( options.extra.match( /\S+/g ) || [] );
        }

        return full.join( " " );
    },

    _removeClass: function( element, keys, extra ) {
        return this._toggleClass( element, keys, extra, false );
    },

    _addClass: function( element, keys, extra ) {
        return this._toggleClass( element, keys, extra, true );
    },

    _toggleClass: function( element, keys, extra, add ) {
        add = ( typeof add === "boolean" ) ? add : extra;
        var shift = ( typeof element === "string" || element === null ),
            options = {
                extra: shift ? keys : extra,
                keys: shift ? element : keys,
                element: shift ? this.element : element,
                add: add
            };
        options.element.toggleClass( this._classes( options ), add );
        return this;
    },

    _on: function( suppressDisabledCheck, element, handlers ) {
        var delegateElement;
        var instance = this;

        // No suppressDisabledCheck flag, shuffle arguments
        if ( typeof suppressDisabledCheck !== "boolean" ) {
            handlers = element;
            element = suppressDisabledCheck;
            suppressDisabledCheck = false;
        }

        // No element argument, shuffle and use this.element
        if ( !handlers ) {
            handlers = element;
            element = this.element;
            delegateElement = this.widget();
        } else {
            element = delegateElement = $( element );
            this.bindings = this.bindings.add( element );
        }

        $.each( handlers, function( event, handler ) {
            function handlerProxy() {

                // Allow widgets to customize the disabled handling
                // - disabled as an array instead of boolean
                // - disabled class as method for disabling individual parts
                if ( !suppressDisabledCheck &&
                    ( instance.options.disabled === true ||
                    $( this ).hasClass( "ui-state-disabled" ) ) ) {
                    return;
                }
                return ( typeof handler === "string" ? instance[ handler ] : handler )
                    .apply( instance, arguments );
            }

            // Copy the guid so direct unbinding works
            if ( typeof handler !== "string" ) {
                handlerProxy.guid = handler.guid =
                    handler.guid || handlerProxy.guid || $.guid++;
            }

            var match = event.match( /^([\w:-]*)\s*(.*)$/ );
            var eventName = match[ 1 ] + instance.eventNamespace;
            var selector = match[ 2 ];

            if ( selector ) {
                delegateElement.on( eventName, selector, handlerProxy );
            } else {
                element.on( eventName, handlerProxy );
            }
        } );
    },

    _off: function( element, eventName ) {
        eventName = ( eventName || "" ).split( " " ).join( this.eventNamespace + " " ) +
            this.eventNamespace;
        element.off( eventName ).off( eventName );

        // Clear the stack to avoid memory leaks (#10056)
        this.bindings = $( this.bindings.not( element ).get() );
        this.focusable = $( this.focusable.not( element ).get() );
        this.hoverable = $( this.hoverable.not( element ).get() );
    },

    _delay: function( handler, delay ) {
        function handlerProxy() {
            return ( typeof handler === "string" ? instance[ handler ] : handler )
                .apply( instance, arguments );
        }
        var instance = this;
        return setTimeout( handlerProxy, delay || 0 );
    },

    _hoverable: function( element ) {
        this.hoverable = this.hoverable.add( element );
        this._on( element, {
            mouseenter: function( event ) {
                this._addClass( $( event.currentTarget ), null, "ui-state-hover" );
            },
            mouseleave: function( event ) {
                this._removeClass( $( event.currentTarget ), null, "ui-state-hover" );
            }
        } );
    },

    _focusable: function( element ) {
        this.focusable = this.focusable.add( element );
        this._on( element, {
            focusin: function( event ) {
                this._addClass( $( event.currentTarget ), null, "ui-state-focus" );
            },
            focusout: function( event ) {
                this._removeClass( $( event.currentTarget ), null, "ui-state-focus" );
            }
        } );
    },

    _trigger: function( type, event, data ) {
        var prop, orig;
        var callback = this.options[ type ];

        data = data || {};
        event = $.Event( event );
        event.type = ( type === this.widgetEventPrefix ?
            type :
        this.widgetEventPrefix + type ).toLowerCase();

        // The original event may come from any element
        // so we need to reset the target on the new event
        event.target = this.element[ 0 ];

        // Copy original event properties over to the new event
        orig = event.originalEvent;
        if ( orig ) {
            for ( prop in orig ) {
                if ( !( prop in event ) ) {
                    event[ prop ] = orig[ prop ];
                }
            }
        }

        this.element.trigger( event, data );
        return !( $.isFunction( callback ) &&
        callback.apply( this.element[ 0 ], [ event ].concat( data ) ) === false ||
        event.isDefaultPrevented() );
    }
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
    $.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
        if ( typeof options === "string" ) {
            options = { effect: options };
        }

        var hasOptions;
        var effectName = !options ?
            method :
            options === true || typeof options === "number" ?
                defaultEffect :
            options.effect || defaultEffect;

        options = options || {};
        if ( typeof options === "number" ) {
            options = { duration: options };
        }

        hasOptions = !$.isEmptyObject( options );
        options.complete = callback;

        if ( options.delay ) {
            element.delay( options.delay );
        }

        if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
            element[ method ]( options );
        } else if ( effectName !== method && element[ effectName ] ) {
            element[ effectName ]( options.duration, options.easing, callback );
        } else {
            element.queue( function( next ) {
                $( this )[ method ]();
                if ( callback ) {
                    callback.call( element[ 0 ] );
                }
                next();
            } );
        }
    };
} );

var widget = $.widget;

// Source: js/widgets/bottomsheet.js
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


// Source: js/widgets/calendar.js
$.widget("corecss.calendar", {

    version: "1.0.0",

    options: {
        format: "yyyy-mm-dd",
        multiSelect: false,
        startMode: 'day', //year, month, day
        weekStart: window.CALENDAR_WEEK_START, // 0 - Sunday, 1 - Monday
        otherDays: true,
        date: new Date(),
        minDate: false,
        maxDate: false,
        preset: false,
        exclude: false,
        stored: false,
        buttons: {
            buttonToday: false,
            buttonClear: false,
            buttonOk: true,
            buttonCancel: true
        },
        syncCalenderToDateField: true,
        locale: window.CALENDAR_LOCALE,
        actions: true,
        condensedGrid: false,
        scheme: 'default',
        getDates: function (d) { },
        dayClick: function (d, d0) { },

        onOkClick: function(d, d2){},
        onCancelClick: function(){}
    },

    //_storage: [],
    //_exclude: [],

    _year: 0,
    _month: 0,
    _day: 0,
    _today: new Date(),
    _event: '',

    _mode: 'day', // day, month, year
    _distance: 0,

    _events: [],

    _create: function () {
        var that = this, element = this.element, o = this.options;

        if (!element.hasClass('calendar')) { element.addClass('calendar'); }

        this._setOptionsFromDOM();

        if (typeof o.date === 'string') {
            o.date = new Date(o.date);
        }

        if (o.minDate !== false && typeof o.minDate === 'string') {
            o.minDate = new Date(o.minDate + 'T00:00:00Z') - 24 * 60 * 60 * 1000;
        }

        if (o.maxDate !== false && typeof o.maxDate === 'string') {
            o.maxDate = new Date(o.maxDate + 'T00:00:00Z');
        }

        //console.log(window.METRO_LOCALES);

        this.locales = window.CALENDAR_LOCALES;

        this._year = o.date.getFullYear();
        this._distance = o.date.getFullYear() - 4;
        this._month = o.date.getMonth();
        this._day = o.date.getDate();
        this._dayOfWeek = o.date.getDay();
        this._mode = o.startMode;

        element.data("_storage", []);
        element.data("_exclude", []);
        element.data("_stored", []);

        var re, dates;

        if (o.preset) {
            re = /\s*,\s*/;
            dates = o.preset.split(re);
            $.each(dates, function () {
                if (new Date(this) !== undefined) { that.setDate(this); }
            });
        }

        if (o.exclude) {
            re = /\s*,\s*/;
            dates = o.exclude.split(re);
            $.each(dates, function () {
                if (new Date(this) !== undefined) { that.setDateExclude(this); }
            });
        }

        if (o.stored) {
            re = /\s*,\s*/;
            dates = o.stored.split(re);
            $.each(dates, function () {
                if (new Date(this) !== undefined) { that.setDateStored(this); }
            });
        }

        if (o.scheme !== 'default') {
            element.addClass(o.scheme);
        }

        this._renderCalendar();

        element.data('calendar', this);

    },

    _renderButtons: function (table) {
        var tr, td, o = this.options;

        //console.log( o.buttons);

        if (typeof o.buttons === 'object') {

            var buttonToday = o.buttons.buttonToday !== false ? "<button class='button calendar-btn-today flat-button ripple place-left'>" + this.locales[o.locale].buttons[0] + "</button>" : "";
            var buttonClear = o.buttons.buttonClear !== false  ? "<button class='button calendar-btn-clear flat-button ripple place-left'>" + this.locales[o.locale].buttons[1] + "</button>" : "";
            var buttonOk = o.buttons.buttonOk !== false ? "<button class='button calendar-btn-ok flat-button ripple'>" + this.locales[o.locale].buttons[7] + "</button>" : "";
            var buttonCancel = o.buttons.buttonCancel !== false ? "<button class='button calendar-btn-cancel flat-button ripple'>" + this.locales[o.locale].buttons[2] + "</button>" : "";

            tr = $("<div/>").addClass("calendar-row calendar-actions");
            td = $("<div/>").addClass("align-right").html(
                buttonToday + buttonClear+ buttonCancel + buttonOk
            );
            td.appendTo(tr);
            tr.appendTo(table);
        }
    },

    _renderMonth: function () {
        var o = this.options,
            year = this._year,
            month = this._month,
            day = this._day,
            //event = this._event,
            feb = 28;

        if (month === 1) {
            if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
                feb = 29;
            }
        }

        var totalDays = ["31", "" + feb + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
        var daysInMonth = totalDays[month];

        var first_week_day = this._dateFromNumbers(year, month + 1, 1).getDay();

        var table, tr, td, i, div;

        this.element.html("");

        table = $("<div/>").addClass("calendar-grid");
        if (o.condensedGrid) {
            table.addClass('condensed no-border');
        }

        //console.log(this.locales);

        // Add calendar header
        tr = $("<div/>").addClass('calendar-row no-margin');

        $("<div/>").addClass("calendar-cell align-center").html("<a class='btn-previous-year' href='#'>-</a>").appendTo(tr);
        $("<div/>").addClass("calendar-cell align-center").html("<a class='btn-previous-month' href='#'>&#12296;</a>").appendTo(tr);

        $("<div/>").addClass("calendar-cell sel-month align-center").html("<a class='btn-select-month' href='#'>" + this.locales[o.locale].months[month] + ' ' + year + "</a>").appendTo(tr);

        $("<div/>").addClass("calendar-cell align-center").html("<a class='btn-next-month' href='#'>&#12297;</a>").appendTo(tr);
        $("<div/>").addClass("calendar-cell align-center").html("<a class='btn-next-year' href='#'>+</a>").appendTo(tr);

        tr.addClass("calendar-subheader").appendTo(table);

        // Add day names
        var j;
        tr = $("<div/>").addClass('calendar-row week-days');
        for (i = 0; i < 7; i++) {
            if (!o.weekStart) {
                td = $("<div/>").addClass("calendar-cell align-center day-of-week").appendTo(tr);
                div = $("<div/>").html(this.locales[o.locale].days[i + 7]).appendTo(td);
            } else {
                j = i + 1;
                if (j === 7) { j = 0; }
                td = $("<div/>").addClass("calendar-cell align-center day-of-week").appendTo(tr);
                div = $("<div/>").html(this.locales[o.locale].days[j + 7]).appendTo(td);
            }
        }
        tr.addClass("calendar-subheader").appendTo(table);

        // Add empty days for previos month
        var prevMonth = this._month - 1; if (prevMonth < 0) { prevMonth = 11; } var daysInPrevMonth = totalDays[prevMonth];
        var _first_week_day = ((o.weekStart) ? first_week_day + 6 : first_week_day) % 7;
        var htmlPrevDay = "";
        tr = $("<div/>").addClass('calendar-row');
        for (i = 0; i < _first_week_day; i++) {
            if (o.otherDays) { htmlPrevDay = daysInPrevMonth - (_first_week_day - i - 1); }
            td = $("<div/>").addClass("calendar-cell empty").appendTo(tr);
            div = $("<div/>").addClass('other-day').html(htmlPrevDay).appendTo(td);
            if (!o.otherDays) {
                div.css('visibility', 'hidden');
            }
        }

        // Days for current month
        var week_day = ((o.weekStart) ? first_week_day + 6 : first_week_day) % 7;

        var d, a, d_html;

        for (i = 1; i <= daysInMonth; i++) {
            week_day %= 7;

            if (week_day === 0) {
                tr.appendTo(table);
                tr = $("<div/>").addClass('calendar-row');
            }

            td = $("<div/>").addClass("calendar-cell align-center day");
            div = $("<div/>").appendTo(td);

            if (o.minDate !== false && (this._dateFromNumbers(year, month + 1, i) < o.minDate) || o.maxDate !== false && (this._dateFromNumbers(year, month + 1, i) > o.maxDate)) {
                td.removeClass("day");
                div.addClass("other-day");
                d_html = i;
            } else {
                d_html = "<a href='#'>" + i + "</a>";
            }

            if (i == this._day) {
                td.addClass("selected");
            }

            div.html(d_html);

            //console.log(div);

            if (year === this._today.getFullYear() && month === this._today.getMonth() && this._today.getDate() === i) {
                td.addClass("today");
            }

            //console.log('xxx');
            d = this._dateNumberStringyFy(this._year, this._month + 1, i);

            if (this.element.data('_storage').indexOf(d) >= 0) {
                a = td.find("a");
                a.parent().parent().addClass("selected");
            }

            if (this.element.data('_exclude').indexOf(d) >= 0) {
                a = td.find("a");
                a.parent().parent().addClass("exclude");
            }

            if (this.element.data('_stored').indexOf(d) >= 0) {
                a = td.find("a");
                a.parent().parent().addClass("stored");
            }

            td.appendTo(tr);
            week_day++;
        }


        // next month other days
        var htmlOtherDays = "";
        for (i = week_day + 1; i <= 7; i++) {
            if (o.otherDays) { htmlOtherDays = i - week_day; }
            td = $("<div/>").addClass("calendar-cell empty").appendTo(tr);
            div = $("<div/>").addClass('other-day').html(htmlOtherDays).appendTo(td);
            if (!o.otherDays) {
                div.css('visibility', 'hidden');
            }
        }

        tr.appendTo(table);
        this._renderHeader();
        this._renderButtons(table);
        table.appendTo(this.element);
    },

    _renderMonths: function () {
        var table, tr, td, i, j;

        this.element.html("");

        table = $("<div/>").addClass("calendar-grid");
        if (this.options.condensedGrid) {
            table.addClass('condensed no-border');
        }

        // Add calendar header
        tr = $("<div/>").addClass('calendar-row');

        $("<div/>").addClass("calendar-cell sel-minus align-center").html("<a class='btn-previous-year' href='#'>-</a>").appendTo(tr);
        $("<div/>").addClass("calendar-cell sel-year align-center").html("<a class='btn-select-year' href='#'>" + this._year + "</a>").appendTo(tr);
        $("<div/>").addClass("calendar-cell sel-plus align-center").html("<a class='btn-next-year' href='#'>+</a>").appendTo(tr);

        tr.addClass("calendar-subheader").appendTo(table);

        tr = $("<div/>").addClass('calendar-row');
        j = 0;
        for (i = 0; i < 12; i++) {

            //td = $("<td/>").addClass("text-center month").html("<a href='#' data-month='"+i+"'>"+this.options.monthsShort[i]+"</a>");
            td = $("<div/>").addClass("calendar-cell month-cell align-center month").html("<a href='#' data-month='" + i + "'>" + this.locales[this.options.locale].months[i + 12] + "</a>");

            if (this._month === i && (new Date()).getFullYear() === this._year) {
                td.addClass("today");
            }

            td.appendTo(tr);
            if ((j + 1) % 4 === 0) {
                tr.appendTo(table);
                tr = $("<div/>").addClass('calendar-row');
            }
            j += 1;
        }

        this._renderHeader();
        this._renderButtons(table);

        table.appendTo(this.element);
    },

    _renderYears: function () {
        var table, tr, td, i, j;

        this.element.html("");

        table = $("<div/>").addClass("calendar-grid");
        if (this.options.condensedGrid) {
            table.addClass('condensed no-border');
        }

        // Add calendar header
        tr = $("<div/>").addClass('calendar-row cells4');

        $("<div/>").addClass("calendar-cell sel-minus align-center").html("<a class='btn-previous-year' href='#'>-</a>").appendTo(tr);
        $("<div/>").addClass("calendar-cell sel-year align-center").html("<a class='btn-none-btn'>" + (this._distance) + "-" + (this._distance + 11) + "</a>").appendTo(tr);
        $("<div/>").addClass("calendar-cell sel-plus align-center").html("<a class='btn-next-year' href='#'>+</a>").appendTo(tr);

        tr.addClass("calendar-subheader").appendTo(table);

        tr = $("<div/>").addClass('calendar-row');

        j = 0;
        for (i = this._distance; i < this._distance + 12; i++) {
            td = $("<div/>").addClass("calendar-cell year-cell align-center year").html("<a href='#' data-year='" + i + "'>" + i + "</a>");
            if ((new Date()).getFullYear() === i) {
                td.addClass("today");
            }
            td.appendTo(tr);
            if ((j + 1) % 4 === 0) {
                tr.appendTo(table);
                tr = $("<div/>").addClass('calendar-row');
            }
            j += 1;
        }

        this._renderHeader();
        this._renderButtons(table);

        table.appendTo(this.element);
    },

    _renderCalendar: function () {
        var element = this.element;

        //this._renderHeader();

        switch (this._mode) {
            case 'year': this._renderYears(); break;
            case 'month': this._renderMonths(); break;
            default: this._renderMonth();
        }

        this._initButtons();

    },

    _renderHeader: function(){
        var element = this.element;

        // console.log(this._year);
        // console.log(this._month + 1);
        // console.log(this._day);
        // console.log(this._dayOfWeek);

        var header_html = "";

        header_html += "<div class='header-year'>"+this._year+"</div>";
        header_html += "<div class='header-month'>"+this.locales[this.options.locale].days[this._dayOfWeek + 14]+", "+this.locales[this.options.locale].months[this._month + 12]+' '+this._day+"</div>";


        var header = element.find(".calendar-header");

        //console.log(header.length);

        if (header.length == 0) {
            header = $("<div>").addClass("calendar-header");
            header.appendTo(element);
        }

        header.html(header_html);
    },

    _initButtons: function () {
        // Add actions
        var that = this, o = this.options,
            table = this.element.find('.calendar-grid');

        if (this._mode === 'day') {
            table.find('.btn-select-month').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                that._mode = 'month';
                that._renderCalendar();
            });
            table.find('.btn-previous-month').off('click').on('click', function (e) {
                that._event = 'eventPrevious';
                e.preventDefault();
                e.stopPropagation();
                that._month -= 1;
                if (that._month < 0) {
                    that._year -= 1;
                    that._month = 11;
                }
                that._renderCalendar();
            });
            table.find('.btn-next-month').off('click').on('click', function (e) {
                that._event = 'eventNext';
                e.preventDefault();
                e.stopPropagation();
                that._month += 1;
                if (that._month === 12) {
                    that._year += 1;
                    that._month = 0;
                }
                that._renderCalendar();
            });
            table.find('.btn-previous-year').off('click').on('click', function (e) {
                that._event = 'eventPrevious';
                e.preventDefault();
                e.stopPropagation();
                that._year -= 1;
                that._renderCalendar();
            });
            table.find('.btn-next-year').off('click').on('click', function (e) {
                that._event = 'eventNext';
                e.preventDefault();
                e.stopPropagation();
                that._year += 1;
                that._renderCalendar();
            });
            table.find('.day a').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                if ($(this).parent().parent().hasClass('exclude')) {
                    return false;
                }

                var d = (new Date(that._paddy(that._year, 4), that._paddy(that._month, 2), that._paddy(parseInt($(this).html()), 2)).format(that.options.format, null));
                var d0 = (new Date(that._paddy(that._year, 4), that._paddy(that._month, 2), that._paddy(parseInt($(this).html()), 2)));

                if (that.options.multiSelect) {
                    $(this).parent().parent().toggleClass("selected");

                    if ($(this).parent().parent().hasClass("selected")) {
                        that._addDate(that._dateStringyFy(d0));
                    } else {
                        that._removeDate(that._dateStringyFy(d0));
                    }
                } else {
                    table.find('.day a').parent().parent().removeClass('selected');
                    $(this).parent().parent().addClass("selected");
                    that.element.data('_storage', []);
                    that._addDate(that._dateStringyFy(d0));
                }


                if (typeof o.dayClick === 'function') {
                    o.dayClick(d, d0);
                } else {
                    if (typeof window[o.dayClick] === 'function') {
                        window[o.dayClick](d, d0);
                    } else {
                        var result = eval("(function(){" + o.dayClick + "})");
                        result.call(d, d0);
                    }
                }

                that._day = parseInt($(this).html());
                that._renderCalendar();
            });
        } else if (this._mode === 'month') {
            table.find('.month a').off('click').on('click', function (e) {
                that._event = 'eventNext';
                e.preventDefault();
                e.stopPropagation();
                that._month = parseInt($(this).data('month'));
                that._mode = 'day';
                that._renderCalendar();
            });
            table.find('.btn-previous-year').off('click').on('click', function (e) {
                that._event = 'eventPrevious';
                e.preventDefault();
                e.stopPropagation();
                that._year -= 1;
                that._renderCalendar();
            });
            table.find('.btn-next-year').off('click').on('click', function (e) {
                that._event = 'eventNext';
                e.preventDefault();
                e.stopPropagation();
                that._year += 1;
                that._renderCalendar();
            });
            table.find('.btn-select-year').off('click').on('click', function (e) {
                that._event = 'eventNext';
                e.preventDefault();
                e.stopPropagation();
                that._mode = 'year';
                that._renderCalendar();
            });
        } else {
            table.find('.year a').off('click').on('click', function (e) {
                that._event = 'eventNext';
                e.preventDefault();
                e.stopPropagation();
                that._year = parseInt($(this).data('year'));
                that._mode = 'month';
                that._renderCalendar();
            });
            table.find('.btn-previous-year').off('click').on('click', function (e) {
                that._event = 'eventPrevious';
                e.preventDefault();
                e.stopPropagation();
                that._distance -= 10;
                that._renderCalendar();
            });
            table.find('.btn-next-year').off('click').on('click', function (e) {
                that._event = 'eventNext';
                e.preventDefault();
                e.stopPropagation();
                that._distance += 10;
                that._renderCalendar();
            });
        }

        table.find('.calendar-btn-today').off('click').on('click', function (e) {
            //that._event = 'eventNext';
            e.preventDefault();
            e.stopPropagation();
            that._mode = that.options.startMode;
            that.options.date = new Date();
            that._year = that.options.date.getFullYear();
            that._month = that.options.date.getMonth();
            that._day = that.options.date.getDate();
            that._renderCalendar();
        });
        table.find('.calendar-btn-clear').off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            that.options.date = new Date();
            that._year = that.options.date.getFullYear();
            that._month = that.options.date.getMonth();
            that._day = that.options.date.getDate();
            that.element.data('_storage', []);
            that._renderCalendar();
        });

        table.find('.calendar-btn-ok').off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var res = new Date(that._year, that._month, that._day);
            var res2 = that.getDates();

            if (typeof o.onOkClick === 'function') {
                o.onOkClick(res, res2);
            } else {
                if (typeof window[o.onOkClick] === 'function') {
                    window[o.onOkClick](res, res2);
                } else {
                    var result = eval("(function(){"+o.onOkClick+"})");
                    result.call(res, res2);
                }
            }
        });

        table.find('.calendar-btn-cancel').off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (typeof o.onCancelClick === 'function') {
                o.onCancelClick();
            } else {
                if (typeof window[o.onCancelClick] === 'function') {
                    window[o.onCancelClick]();
                } else {
                    var result = eval("(function(){"+o.onCancelClick+"})");
                    result.call();
                }
            }
        });

    },

    _addDate: function (d) {
        var index = this.element.data('_storage').indexOf(d);
        if (index < 0) { this.element.data('_storage').push(d); }
    },

    _removeDate: function (d) {
        var index = this.element.data('_storage').indexOf(d);
        this.element.data('_storage').splice(index, 1);
    },

    _addDateExclude: function (d) {
        var index = this.element.data('_exclude').indexOf(d);
        if (index < 0) { this.element.data('_exclude').push(d); }
    },

    _addDateStored: function (d) {
        var index = this.element.data('_stored').indexOf(d);
        if (index < 0) { this.element.data('_stored').push(d); }
    },

    _removeDateExclude: function (d) {
        var index = this.element.data('_exclude').indexOf(d);
        this.element.data('_exclude').splice(index, 1);
    },

    _removeDateStored: function (d) {
        var index = this.element.data('_stored').indexOf(d);
        this.element.data('_stored').splice(index, 1);
    },

    _paddy: function paddy(n, p, c) {
        var pad_char = typeof c !== 'undefined' ? c : '0';
        var pad = new Array(1 + p).join(pad_char);
        return (pad + n).slice(-pad.length);
    },

    _dateFromNumbers: function dateFromNumbers(year, month, day){
        return new Date(this._paddy(year, 4) + "/" +  this._paddy(month, 2) + "/" + this._paddy(day, 2));
    },

    _dateNumberStringyFy: function dateNumberStringyFy(year, month, day) {
        return (this._dateFromNumbers(year, month, day)).format('yyyy-mm-dd')
    },

    _dateStringyFy: function dateStringyFy(d) {
        return this._dateNumberStringyFy(d.getFullYear(), d.getMonth() + 1, d.getDate());
    },

    setDate: function (d) {
        var r;
        d = new Date(d);
        r = this._dateNumberStringyFy(d.getFullYear(), d.getMonth() + 1, d.getDate());

        this._addDate(r);
        if (this.options.syncCalenderToDateField) {
            this._year = d.getFullYear();
            this._month = d.getMonth();
            this._day = d.getDate();
            this._dayOfWeek = d.getDay();
        }
        this._renderCalendar();
    },

    setDateExclude: function (d) {
        var r;
        d = new Date(d);
        r = this._dateNumberStringyFy(d.getFullYear(), d.getMonth() + 1, d.getDate());
        this._addDateExclude(r);
        this._renderCalendar();
    },

    setDateStored: function (d) {
        var r;
        d = new Date(d);
        r = this._dateNumberStringyFy(d.getFullYear(), d.getMonth() + 1, d.getDate());
        this._addDateStored(r);
        this._renderCalendar();
    },

    getDate: function (index) {
        return new Date(index !== undefined ? this.element.data('_storage')[index] : this.element.data('_storage')[0]).format(this.options.format);
    },

    getDates: function () {
        var res;
        res = $.merge($.merge([], this.element.data('_storage')), this.element.data('_stored'));
        return res.unique();
    },

    unsetDate: function (d) {
        var r;
        d = new Date(d);
        r = this._dateNumberStringyFy(d.getFullYear(), d.getMonth() + 1, d.getDate());
        this._removeDate(r);
        this._renderCalendar();
    },

    unsetDateExclude: function (d) {
        var r;
        d = new Date(d);
        r = this._dateNumberStringyFy(d.getFullYear(), d.getMonth() + 1, d.getDate());
        this._removeDateExclude(r);
        this._renderCalendar();
    },

    unsetDateStored: function (d) {
        var r;
        d = new Date(d);
        r = this._dateNumberStringyFy(d.getFullYear(), d.getMonth() + 1, d.getDate());
        this._removeDateStored(r);
        this._renderCalendar();
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

    _destroy: function () { },

    _setOption: function (key, value) {
        this._super('_setOption', key, value);
    }
});

// Source: js/widgets/dialog.js
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
// Source: js/widgets/dropdown.js
$.widget("corecss.dropdown", {

    version: "1.0.0",

    options: {
        effect: 'slide',
        toggleElement: false,
        noClose: false,
        onDrop: function(object){},
        onUp: function(object){}
    },

    _create: function(){
        var  that = this, element = this.element, o = this.options,
            menu = this.element,
            name = this.name,
            parent = this.element.parent();

        var toggle;

        this._setOptionsFromDOM();

        toggle = o.toggleElement ? $(o.toggleElement) : parent.children('.dropdown-toggle').length > 0 ? parent.children('.dropdown-toggle') : parent.children('a:nth-child(1)');

        toggle.on('click.'+name, function(e){
            parent.siblings(parent[0].tagName).removeClass("active-container");
            $(".active-container").removeClass("active-container");

            if (menu.css('display') === 'block' && !menu.hasClass('keep-open')) {
                that._close(menu);
            } else {
                $('[data-role=dropdown]').each(function(i, el){
                    if (!menu.parents('[data-role=dropdown]').is(el) && !$(el).hasClass('keep-open') && $(el).css('display') === 'block') {
                        that._close(el);
                    }
                });
                if (menu.hasClass('horizontal')) {
                    menu.css({
                        'visibility': 'hidden',
                        'display': 'block'
                    });
                    var item_length = $(menu.children('li')[0]).outerWidth();
                    //var item_length2 = $(menu.children('li')[0]).width();
                    menu.css({
                        'visibility': 'visible',
                        'display': 'none'
                    });
                    var menu_width = menu.children('li').length * item_length + (menu.children('li').length - 1);
                    menu.css('width', menu_width);
                }
                that._open(menu);
                parent.addClass("active-container");
            }
            e.preventDefault();
            e.stopPropagation();
        });

        if (o.noClose === true) {
            menu.on('click', function (e) {
                // e.preventDefault();
                e.stopPropagation();
            });
        }

        $(menu).find('li.disabled a').on('click', function(e){
            e.preventDefault();
        });

        element.data('dropdown', this);
    },

    _open: function(el){
        var parent = this.element.parent(), o = this.options;
        var toggle = o.toggleElement ? $(o.toggleElement) : parent.children('.dropdown-toggle').length > 0 ? parent.children('.dropdown-toggle') : parent.children('a:nth-child(1)');

        switch (this.options.effect) {
            case 'fade': $(el).fadeIn(CORE_ANIMATION_DURATION); break;
            case 'slide': $(el).slideDown(CORE_ANIMATION_DURATION); break;
            default: $(el).show();
        }
        this._trigger("onOpen", null, el);
        toggle.addClass('active-toggle');

        if (typeof o.onDrop === 'function') {
            o.onDrop(el);
        } else {
            if (typeof window[o.onDrop] === 'function') {
                window[o.onDrop](el);
            } else {
                var result = eval("(function(){"+o.onDrop+"})");
                result.call(el);
            }
        }
    },

    _close: function(el){
        var parent = $(el).parent(), o = this.options;
        var toggle = o.toggleElement ? $(o.toggleElement) : parent.children('.dropdown-toggle').length > 0 ? parent.children('.dropdown-toggle') : parent.children('a:nth-child(1)');

        switch (this.options.effect) {
            case 'fade': $(el).fadeOut(CORE_ANIMATION_DURATION); break;
            case 'slide': $(el).slideUp(CORE_ANIMATION_DURATION); break;
            default: $(el).hide();
        }
        this._trigger("onClose", null, el);
        toggle.removeClass('active-toggle');

        if (typeof o.onUp === 'function') {
            o.onUp(el);
        } else {
            if (typeof window[o.onUp] === 'function') {
                window[o.onUp](el);
            } else {
                var result = eval("(function(){"+o.onUp+"})");
                result.call(el);
            }
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

    _destroy: function(){
    },

    _setOption: function(key, value){
        this._super('_setOption', key, value);
    }
});

$(document).on('click', function(e){
    $('[data-role=dropdown]').each(function(i, el){
        if (!$(el).hasClass('keep-open') && $(el).css('display')==='block') {
            var that = $(el).data('dropdown');
            that._close(el);
        }
    });
});

// Source: js/widgets/panel.js
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

// Source: js/widgets/sidebar.js
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

    toggleState: function(){
        var element = this.element;

        if (element.data('opened') === true) {
            this.close();
        } else {
            this.open();
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


// Source: js/widgets/slider.js
$.widget("corecss.slider", {

    version: "1.0.1",

    options: {
        position: 0,
        buffer: 0,
        accuracy: 0,
        color: 'default',
        completeColor: 'default',
        bufferColor: 'default',
        markerColor: 'default',
        colors: false,
        showHint: false,
        permanentHint: false,
        hintPosition: 'top',
        vertical: false,
        min: 0,
        max: 100,
        animate: false,
        minValue: 0,
        maxValue: 100,
        currValue: 0,
        returnType: 'value',
        target: false,

        onStartChange: function(){},
        onChange: function(value, slider){},
        onChanged: function(value, slider){},
        onBufferChange: function(value, slider){},

        _slider : {
            vertical: false,
            offset: 0,
            length: 0,
            marker: 0,
            ppp: 0,
            start: 0,
            stop: 0
        }
    },

    _create: function(){
        var that = this,
            element = this.element;


        var o = this.options,
            s = o._slider;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });

        o.accuracy = o.accuracy < 0 ? 0 : o.accuracy;
        o.min = o.min < 0 ? 0 : o.min;
        o.min = o.min > o.max ? o.max : o.min;
        o.max = o.max > 100 ? 100 : o.max;
        o.max = o.max < o.min ? o.min : o.max;
        o.position = this._correctValue(element.data('position') > o.min ? (element.data('position') > o.max ? o.max : element.data('position')) : o.min);
        o.buffer = this._correctValue(element.data('buffer') > o.min ? (element.data('buffer') > o.max ? o.max : element.data('buffer')) : o.min);
        o.colors = o.colors ? o.colors.split(",") : false;

        s.vertical = o.vertical;
        if (o.vertical && !element.hasClass('vertical')) {
            element.addClass('vertical');
        }
        if (o.permanentHint && !element.hasClass('permanent-hint')) {
            element.addClass('permanent-hint');
        }

        if (!o.vertical && o.hintPosition === 'bottom') {
            element.addClass('hint-bottom');
        }

        if (o.vertical && o.hintPosition === 'left') {
            element.addClass('hint-left');
        }

        this._createSlider();
        this._initPoints();
        this._placeMarker(o.position);
        this._showBuffer(o.buffer);

        var event_down = CoreCss.isTouchDevice() ? 'touchstart' : 'mousedown';

        if (o.target && $(o.target)[0].tagName == 'INPUT') {
            $(o.target).on('keyup', function(){
                var input_value = this.value !== undefined ? this.value : 0;
                var new_value = Math.min(input_value, o.maxValue);
                that._placeMarker(that._realValueToValue(new_value));
                //console.log(that._realValueToValue(this.value));
            });
        }

        element.children('.marker').on(event_down, function (e) {
            $(this).addClass("focus");
            that._startMoveMarker(e);
            if (typeof o.onStartChange === 'function') {
                o.onStartChange();
            } else {
                if (typeof window[o.onStartChange] === 'function') {
                    window[o.onStartChange]();
                } else {
                    var result = eval("(function(){"+o.onStartChange+"})");
                    result.call();
                }
            }
            e.preventDefault();
            e.stopPropagation();
        });

        element.on(event_down, function (e) {
            e.preventDefault();
            that._startMoveMarker(e);
        });

        element.data('slider', this);
    },

    _startMoveMarker: function(e){
        var element = this.element, o = this.options, that = this, hint = element.children('.slider-hint');
        var returnedValue;

        var event_move = CoreCss.isTouchDevice() ? 'touchmove' : 'mousemove';
        var event_up = CoreCss.isTouchDevice() ? 'touchend' : 'mouseup mouseleave';

        $(document).on(event_move, function (event) {
            that._movingMarker(event);
            if (!element.hasClass('permanent-hint')) {
                hint.css('display', 'block');
            }
        });
        $(document).on(event_up, function () {
            element.find(".marker").removeClass("focus");
            $(document).off(event_move);
            $(document).off(event_up);
            element.data('value', o.position);
            element.trigger('changed', o.position);
            element.trigger('change', o.position);

            returnedValue = o.returnType === 'value' ? that._valueToRealValue(o.position) : o.position;

            if (!element.hasClass('permanent-hint')) {
                hint.css('display', 'none');
            }

            if (typeof o.onChanged === 'function') {
                o.onChanged(returnedValue, element);
            } else {
                if (typeof window[o.onChanged] === 'function') {
                    window[o.onChanged](returnedValue, element);
                } else {
                    var result = eval("(function(){"+o.onChanged+"})");
                    result.call(returnedValue, element);
                }
            }

        });

        this._initPoints();

        this._movingMarker(e);
    },

    _movingMarker: function (ev) {
        var element = this.element, o = this.options;
        var cursorPos,
            percents,
            valuePix,

            vertical = o._slider.vertical,
            sliderOffset = o._slider.offset,
            sliderStart = o._slider.start,
            sliderEnd = o._slider.stop,
            sliderLength = o._slider.length,
            markerSize = o._slider.marker;

        var event = !CoreCss.isTouchDevice() ? ev.originalEvent : ev.originalEvent.touches[0];

        //console.log(event);

        if (vertical) {
            cursorPos = event.pageY - sliderOffset;
        } else {
            cursorPos = event.pageX - sliderOffset;
        }

        if (cursorPos < sliderStart) {
            cursorPos = sliderStart;
        } else if (cursorPos > sliderEnd) {
            cursorPos = sliderEnd;
        }

        if (vertical) {
            valuePix = sliderLength - cursorPos - markerSize / 2;
        } else {
            valuePix = cursorPos - markerSize / 2;
        }

        percents = this._pixToPerc(valuePix);

        this._placeMarker(percents);

        o.currValue = this._valueToRealValue(percents);
        o.position = percents;

        var returnedValue = o.returnType === 'value' ? this._valueToRealValue(o.position) : o.position;

        if (o.target) {
            if ($(o.target)[0].tagName == 'INPUT') {
                $(o.target).val(returnedValue);
            } else {
                $(o.target).html(returnedValue);
            }
            $(o.target).trigger('change', returnedValue);
        }

        if (typeof o.onChange === 'function') {
            o.onChange(returnedValue, element);
        } else {
            if (typeof window[o.onChange] === 'function') {
                window[o.onChange](returnedValue, element);
            } else {
                var result = eval("(function(){"+o.onChange+"})");
                result.call(returnedValue, element);
            }
        }
    },

    _placeMarker: function (value) {
        var size, size2, o = this.options, colorParts, colorIndex = 0, colorDelta, element = this.element,
            marker = this.element.children('.marker'),
            complete = this.element.children('.complete'),
            hint = this.element.children('.slider-hint'), hintValue,
            oldPos = this._percToPix(o.position);

        colorParts = o.colors.length;
        colorDelta = o._slider.length / colorParts;

        if (o._slider.vertical) {
            var oldSize = this._percToPix(o.position) + o._slider.marker,
                oldSize2 = o._slider.length - oldSize;
            size = this._percToPix(value) + o._slider.marker / 2;
            size2 = o._slider.length - size;
            this._animate(marker.css('top', oldSize2),{top: size2});
            this._animate(complete.css('height', oldSize),{height: size});

            if (colorParts) {
                colorIndex = Math.round(size / colorDelta)-1;
                complete.css('background-color', o.colors[colorIndex<0?0:colorIndex]);
            }
            if (o.showHint) {
                hintValue = this._valueToRealValue(value);
                hint.html(hintValue).css('top', size2 - marker.height()/2 - hint.height()/4);
            }
        } else {
            size = this._percToPix(value);
            this._animate(marker.css('left', oldPos),{left: size});
            this._animate(complete.css('width', oldPos),{width: size});
            if (colorParts) {
                colorIndex = Math.round(size / colorDelta)-1;
                complete.css('background-color', o.colors[colorIndex<0?0:colorIndex]);
            }
            if (o.showHint) {
                hintValue = this._valueToRealValue(value);
                hint.html(hintValue).css('left', size - marker.width()/2);
            }
        }
    },

    _valueToRealValue: function(value){
        var o = this.options;
        var real_value;

        var percent_value = (o.maxValue - o.minValue) / 100;

        real_value = value * percent_value + o.minValue;

        return Math.round(real_value);
    },

    _realValueToValue: function(value){
        var o = this.options, val_val;
        var percent_value = (o.maxValue - o.minValue) / 100;
        val_val = value / percent_value + o.minValue;
        return Math.round(val_val);
    },

    _animate: function (obj, val) {
        var o = this.options;
        //console.log(obj, val);
        if(o.animate) {
            obj.stop(true).animate(val);
        } else {
            obj.css(val);
        }
    },

    _pixToPerc: function (valuePix) {
        var valuePerc;
        valuePerc = (valuePix < 0 ? 0 : valuePix )* this.options._slider.ppp;
        return Math.round(this._correctValue(valuePerc));
    },

    _percToPix: function (value) {
        ///console.log(this.options._slider.ppp, value);
        if (this.options._slider.ppp === 0) {
            return 0;
        }
        return Math.round(value / this.options._slider.ppp);
    },

    _correctValue: function (value) {
        var o = this.options;
        var accuracy = o.accuracy;
        var max = o.max;
        var min = o.min;
        if (accuracy === 0) {
            return value;
        }
        if (value === max) {
            return max;
        }
        if (value === min) {
            return min;
        }
        value = Math.floor(value / accuracy) * accuracy + Math.round(value % accuracy / accuracy) * accuracy;
        if (value > max) {
            return max;
        }
        if (value < min) {
            return min;
        }
        return value;
    },

    _initPoints: function(){
        var o = this.options, s = o._slider, element = this.element;

        if (s.vertical) {
            s.offset = element.offset().top;
            s.length = element.height();
            s.marker = element.children('.marker').height();
        } else {
            s.offset = element.offset().left;
            s.length = element.width();
            s.marker = element.children('.marker').width();
        }

        s.ppp = o.max / (s.length - s.marker);
        s.start = s.marker / 2;
        s.stop = s.length - s.marker / 2;
    },

    _createSlider: function(){
        var element = this.element,
            o = this.options,
            complete, marker, hint, buffer, back;

        element.html('');

        back = $("<div/>").addClass("slider-backside").appendTo(element);
        complete = $("<div/>").addClass("complete").appendTo(element);
        buffer = $("<div/>").addClass("buffer").appendTo(element);
        marker = $("<a/>").addClass("marker").appendTo(element);

        if (o.showHint) {
            hint = $("<span/>").addClass("slider-hint").appendTo(element);
        }

        if (o.color !== 'default') {
            if (o.color.isColor()) {
                back.css('background-color', o.color);
            } else {
                back.addClass(o.color);
            }
        }
        if (o.completeColor !== 'default') {
            if (o.completeColor.isColor()) {
                complete.css('background-color', o.completeColor);
            } else {
                complete.addClass(o.completeColor);
            }
        }
        if (o.bufferColor !== 'default') {
            if (o.bufferColor.isColor()) {
                buffer.css('background-color', o.bufferColor);
            } else {
                buffer.addClass(o.bufferColor);
            }
        }
        if (o.markerColor !== 'default') {
            if (o.markerColor.isColor()) {
                marker.css('background-color', o.markerColor);
            } else {
                marker.addClass(o.markerColor);
            }
        }
    },

    value: function (value) {
        var element = this.element, o = this.options, returnedValue;

        if (typeof value !== 'undefined') {

            value = value > o.max ? o.max : value;
            value = value < o.min ? o.min : value;

            this._placeMarker(parseInt(value));
            o.position = parseInt(value);

            returnedValue = o.returnType === 'value' ? this._valueToRealValue(o.position) : o.position;

            if (o.target) {
                if ($(o.target)[0].tagName == 'INPUT') {
                    $(o.target).val(returnedValue);
                } else {
                    $(o.target).html(returnedValue);
                }
                $(o.target).trigger('change', returnedValue);
            }

            if (typeof o.onChange === 'function') {
                o.onChange(returnedValue, element);
            } else {
                if (typeof window[o.onChange] === 'function') {
                    window[o.onChange](returnedValue, element);
                } else {
                    var result = eval("(function(){"+o.onChange+"})");
                    result.call(returnedValue, element);
                }
            }

            return this;
        } else {
            returnedValue = o.returnType === 'value' ? this._valueToRealValue(o.position) : o.position;
            return returnedValue;
        }
    },

    _showBuffer: function(value){
        var size, oldSize, o = this.options, element = this.element,
            buffer = this.element.children('.buffer');

        oldSize = o.buffer;
        size = value == 100 ? 99.9 : value;

        if (o._slider.vertical) {
            this._animate(buffer.css('height', oldSize+'%'),{height: size+'%'});

        } else {
            this._animate(buffer.css('width', oldSize+'%'),{width: size+'%'});
        }
    },

    buffer: function (value) {
        var element = this.element, o = this.options, returnedValue;

        if (typeof value !== 'undefined') {

            value = value > 100 ? 100 : value;
            value = value < 0 ? 0 : value;

            this._showBuffer(parseInt(value));
            o.buffer = parseInt(value);

            returnedValue = o.buffer;

            if (typeof o.onBufferChange === 'function') {
                o.onBufferChange(returnedValue, element);
            } else {
                if (typeof window[o.onBufferChange] === 'function') {
                    window[o.onBufferChange](returnedValue, element);
                } else {
                    var result = eval("(function(){"+o.onBufferChange+"})");
                    result.call(returnedValue, element);
                }
            }

            return this;
        } else {
            returnedValue = o.buffer;
            return returnedValue;
        }
    },

    _destroy: function(){},

    _setOption: function(key, value){
        this._super('_setOption', key, value);
    }
});

// Source: js/widgets/swipe.js
var LEFT = "left",
    RIGHT = "right",
    UP = "up",
    DOWN = "down",
    IN = "in",
    OUT = "out",

    NONE = "none",
    AUTO = "auto",

    SWIPE = "swipe",
    PINCH = "pinch",
    TAP = "tap",
    DOUBLE_TAP = "doubletap",
    LONG_TAP = "longtap",
    HOLD = "hold",

    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",

    ALL_FINGERS = "all",

    DOUBLE_TAP_THRESHOLD = 10,

    PHASE_START = "start",
    PHASE_MOVE = "move",
    PHASE_END = "end",
    PHASE_CANCEL = "cancel",

    SUPPORTS_TOUCH = 'ontouchstart' in window,

    SUPPORTS_POINTER_IE10 = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !SUPPORTS_TOUCH,

    SUPPORTS_POINTER = (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !SUPPORTS_TOUCH;

/*
$.fn.swipe.phases = {
    PHASE_START: PHASE_START,
    PHASE_MOVE: PHASE_MOVE,
    PHASE_END: PHASE_END,
    PHASE_CANCEL: PHASE_CANCEL
};

$.fn.swipe.directions = {
    LEFT: LEFT,
    RIGHT: RIGHT,
    UP: UP,
    DOWN: DOWN,
    IN: IN,
    OUT: OUT
};

$.fn.swipe.pageScroll = {
    NONE: NONE,
    HORIZONTAL: HORIZONTAL,
    VERTICAL: VERTICAL,
    AUTO: AUTO
};

$.fn.swipe.fingers = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    ALL: ALL_FINGERS
};
*/

$.widget( "corecss.swipe" , {

    version: "1.0.0",

    options: {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: ".noSwipe",
        preventDefaultEvents: true
        },

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        if (o.allowPageScroll === undefined && (o.swipe !== undefined || o.swipeStatus !== undefined)) {
            o.allowPageScroll = NONE;
        }

        this.useTouchEvents = (SUPPORTS_TOUCH || SUPPORTS_POINTER || !o.fallbackToMouseEvents);
        this.START_EV = this.useTouchEvents ? (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? 'MSPointerDown' : 'pointerdown') : 'touchstart') : 'mousedown';
        this.MOVE_EV = this.useTouchEvents ? (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? 'MSPointerMove' : 'pointermove') : 'touchmove') : 'mousemove';
        this.END_EV = this.useTouchEvents ? (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? 'MSPointerUp' : 'pointerup') : 'touchend') : 'mouseup';
        this.LEAVE_EV = this.useTouchEvents ? (SUPPORTS_POINTER ? 'mouseleave' : null) : 'mouseleave'; //we manually detect leave on touch devices, so null event here
        this.CANCEL_EV = (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? 'MSPointerCancel' : 'pointercancel') : 'touchcancel');

        //touch properties
        this.distance = 0;
        this.direction = null;
        this.currentDirection = null;
        this.duration = 0;
        this.startTouchesDistance = 0;
        this.endTouchesDistance = 0;
        this.pinchZoom = 1;
        this.pinchDistance = 0;
        this.pinchDirection = 0;
        this.maximumsMap = null;

        //jQuery wrapped element for this instance
        //var $element = $(element);

        //Current phase of th touch cycle
        this.phase = "start";

        // the current number of fingers being used.
        this.fingerCount = 0;

        //track mouse points / delta
        this.fingerData = {};

        //track times
        this.startTime = 0;
        this.endTime = 0;
        this.previousTouchEndTime = 0;
        this.fingerCountAtRelease = 0;
        this.doubleTapStartTime = 0;

        //Timeouts
        this.singleTapTimeout = null;
        this.holdTimeout = null;

        // Add gestures to all swipable areas if supported
        try {
            element.bind(this.START_EV, $.proxy(this.touchStart, that));
            element.bind(this.CANCEL_EV, $.proxy(this.touchCancel, that));
        } catch (e) {
            $.error('events not supported ' + this.START_EV + ',' + this.CANCEL_EV + ' on jQuery.swipe');
        }

        element.data('swipe', this);
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
        this.removeListeners();
        this.element.data('corecss', null);
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    },

    enable: function(){
        this.disable();
        this.element.bind(this.START_EV, this.touchStart);
        this.element.bind(this.CANCEL_EV, this.touchCancel);
        return this.element;
    },

    disable: function(){
        this.removeListeners();
        return this.element;
    },

    touchStart: function(jqEvent) {

        //console.log(this);

        var that = this, $element = this.element, options = this.options;

        //If we already in a touch event (a finger already in use) then ignore subsequent ones..
        if (this.getTouchInProgress()) {
            return;
        }

        //Check if this element matches any in the excluded elements selectors,  or its parent is excluded, if so, DON'T swipe
        if ($(jqEvent.target).closest(options.excludedElements, $element).length > 0) {
            return;
        }

        //As we use Jquery bind for events, we need to target the original event object
        //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
        var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;

        var ret,
            touches = event.touches,
            evt = touches ? touches[0] : event;

        this.phase = PHASE_START;

        //If we support touches, get the finger count
        if (touches) {
            // get the total number of fingers touching the screen
            this.fingerCount = touches.length;
        }
        //Else this is the desktop, so stop the browser from dragging content
        else if (options.preventDefaultEvents !== false) {
            jqEvent.preventDefault(); //call this on jq event so we are cross browser
        }

        //clear vars..
        this.distance = 0;
        this.direction = null;
        this.currentDirection=null;
        this.pinchDirection = null;
        this.duration = 0;
        this.startTouchesDistance = 0;
        this.endTouchesDistance = 0;
        this.pinchZoom = 1;
        this.pinchDistance = 0;
        this.maximumsMap = this.createMaximumsData();
        this.cancelMultiFingerRelease();

        //Create the default finger data
        this.createFingerData(0, evt);

        // check the number of fingers is what we are looking for, or we are capturing pinches
        if (!touches || (this.fingerCount === options.fingers || options.fingers === ALL_FINGERS) || this.hasPinches()) {
            // get the coordinates of the touch
            this.startTime = this.getTimeStamp();

            if (this.fingerCount == 2) {
                //Keep track of the initial pinch distance, so we can calculate the diff later
                //Store second finger data as start
                this.createFingerData(1, touches[1]);
                this.startTouchesDistance = this.endTouchesDistance = this.calculateTouchesDistance(this.fingerData[0].start, this.fingerData[1].start);
            }

            if (options.swipeStatus || options.pinchStatus) {
                ret = this.triggerHandler(event, this.phase);
            }
        } else {
            //A touch with more or less than the fingers we are looking for, so cancel
            ret = false;
        }

        //If we have a return value from the users handler, then return and cancel
        if (ret === false) {
            this.phase = PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
            return ret;
        } else {
            if (options.hold) {
                this.holdTimeout = setTimeout($.proxy(function() {
                    //Trigger the event
                    $element.trigger('hold', [event.target]);
                    //Fire the callback
                    if (options.hold) {
                        ret = options.hold.call($element, event, event.target);
                    }
                }, this), options.longTapThreshold);
            }

            this.setTouchInProgress(true);
        }

        return null;
    },

    touchMove: function(jqEvent) {
        //As we use Jquery bind for events, we need to target the original event object
        //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
        var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;

        //If we are ending, cancelling, or within the threshold of 2 fingers being released, don't track anything..
        if (this.phase === PHASE_END || this.phase === PHASE_CANCEL || this.inMultiFingerRelease())
            return;

        var ret,
            touches = event.touches,
            evt = touches ? touches[0] : event;

        //Update the  finger data
        var currentFinger = this.updateFingerData(evt);
        this.endTime = this.getTimeStamp();

        if (touches) {
            this.fingerCount = touches.length;
        }

        if (this.options.hold) {
            clearTimeout(this.holdTimeout);
        }

        this.phase = PHASE_MOVE;

        //If we have 2 fingers get Touches distance as well
        if (this.fingerCount == 2) {

            //Keep track of the initial pinch distance, so we can calculate the diff later
            //We do this here as well as the start event, in case they start with 1 finger, and the press 2 fingers
            if (this.startTouchesDistance == 0) {
                //Create second finger if this is the first time...
                this.createFingerData(1, touches[1]);

                this.startTouchesDistance = this.endTouchesDistance = this.calculateTouchesDistance(this.fingerData[0].start, this.fingerData[1].start);
            } else {
                //Else just update the second finger
                this.updateFingerData(touches[1]);

                this.endTouchesDistance = this.calculateTouchesDistance(this.fingerData[0].end, this.fingerData[1].end);
                this.pinchDirection = this.calculatePinchDirection(this.fingerData[0].end, this.fingerData[1].end);
            }

            this.pinchZoom = this.calculatePinchZoom(this.startTouchesDistance, this.endTouchesDistance);
            this.pinchDistance = Math.abs(this.startTouchesDistance - this.endTouchesDistance);
        }

        if ((this.fingerCount === this.options.fingers || this.options.fingers === ALL_FINGERS) || !touches || this.hasPinches()) {

            //The overall direction of the swipe. From start to now.
            this.direction = this.calculateDirection(currentFinger.start, currentFinger.end);

            //The immediate direction of the swipe, direction between the last movement and this one.
            this.currentDirection = this.calculateDirection(currentFinger.last, currentFinger.end);

            //Check if we need to prevent default event (page scroll / pinch zoom) or not
            this.validateDefaultEvent(jqEvent, this.currentDirection);

            //Distance and duration are all off the main finger
            this.distance = this.calculateDistance(currentFinger.start, currentFinger.end);
            this.duration = this.calculateDuration();

            //Cache the maximum distance we made in this direction
            this.setMaxDistance(this.direction, this.distance);

            //Trigger status handler
            ret = this.triggerHandler(event, this.phase);


            //If we trigger end events when threshold are met, or trigger events when touch leaves element
            if (!this.options.triggerOnTouchEnd || this.options.triggerOnTouchLeave) {

                var inBounds = true;

                //If checking if we leave the element, run the bounds check (we can use touchleave as its not supported on webkit)
                if (this.options.triggerOnTouchLeave) {
                    var bounds = this.getBounds(this);
                    inBounds = this.isInBounds(currentFinger.end, bounds);
                }

                //Trigger end handles as we swipe if thresholds met or if we have left the element if the user has asked to check these..
                if (!this.options.triggerOnTouchEnd && inBounds) {
                    this.phase = this.getNextPhase(PHASE_MOVE);
                }
                //We end if out of bounds here, so set current phase to END, and check if its modified
                else if (this.options.triggerOnTouchLeave && !inBounds) {
                    this.phase = this.getNextPhase(PHASE_END);
                }

                if (this.phase == PHASE_CANCEL || this.phase == PHASE_END) {
                    this.triggerHandler(event, this.phase);
                }
            }
        } else {
            this.phase = PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
        }

        if (ret === false) {
            this.phase = PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
        }
    },

    touchEnd: function(jqEvent) {
        //As we use Jquery bind for events, we need to target the original event object
        //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
        var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent,
            touches = event.touches;

        //If we are still in a touch with the device wait a fraction and see if the other finger comes up
        //if it does within the threshold, then we treat it as a multi release, not a single release and end the touch / swipe
        if (touches) {
            if (touches.length && !this.inMultiFingerRelease()) {
                this.startMultiFingerRelease(event);
                return true;
            } else if (touches.length && this.inMultiFingerRelease()) {
                return true;
            }
        }

        //If a previous finger has been released, check how long ago, if within the threshold, then assume it was a multifinger release.
        //This is used to allow 2 fingers to release fractionally after each other, whilst maintaining the event as containing 2 fingers, not 1
        if (this.inMultiFingerRelease()) {
            this.fingerCount = this.fingerCountAtRelease;
        }

        //Set end of swipe
        this.endTime = this.getTimeStamp();

        //Get duration incase move was never fired
        this.duration = this.calculateDuration();

        //If we trigger handlers at end of swipe OR, we trigger during, but they didnt trigger and we are still in the move phase
        if (this.didSwipeBackToCancel() || !this.validateSwipeDistance()) {
            this.phase = PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
        } else if (this.options.triggerOnTouchEnd || (this.options.triggerOnTouchEnd === false && this.phase === PHASE_MOVE)) {
            //call this on jq event so we are cross browser
            if (this.options.preventDefaultEvents !== false) {
                jqEvent.preventDefault();
            }
            this.phase = PHASE_END;
            this.triggerHandler(event, this.phase);
        }
        //Special cases - A tap should always fire on touch end regardless,
        //So here we manually trigger the tap end handler by itself
        //We dont run trigger handler as it will re-trigger events that may have fired already
        else if (!this.options.triggerOnTouchEnd && this.hasTap()) {
            //Trigger the pinch events...
            this.phase = PHASE_END;
            this.triggerHandlerForGesture(event, this.phase, TAP);
        } else if (this.phase === PHASE_MOVE) {
            this.phase = PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
        }

        this.setTouchInProgress(false);

        return null;
    },

    touchCancel: function() {
        // reset the variables back to default values
        this.fingerCount = 0;
        this.endTime = 0;
        this.startTime = 0;
        this.startTouchesDistance = 0;
        this.endTouchesDistance = 0;
        this.pinchZoom = 1;

        //If we were in progress of tracking a possible multi touch end, then re set it.
        this.cancelMultiFingerRelease();

        this.setTouchInProgress(false);
    },

    touchLeave: function(jqEvent) {
        //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
        var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;

        //If we have the trigger on leave property set....
        if (this.options.triggerOnTouchLeave) {
            this.phase = this.getNextPhase(PHASE_END);
            this.triggerHandler(event, this.phase);
        }
    },

    removeListeners: function() {
        var $element = this.element;

        $element.unbind(this.START_EV, this.touchStart, this);
        $element.unbind(this.CANCEL_EV, this.touchCancel, this);
        $element.unbind(this.MOVE_EV, this.touchMove, this);
        $element.unbind(this.END_EV, this.touchEnd, this);

        //we only have leave events on desktop, we manually calculate leave on touch as its not supported in webkit
        if (this.LEAVE_EV) {
            $element.unbind(this.LEAVE_EV, this.touchLeave, this);
        }

        this.setTouchInProgress(false);
    },

    getNextPhase: function(currentPhase) {
        var options  = this.options;
        var nextPhase = currentPhase;

        // Ensure we have valid swipe (under time and over distance  and check if we are out of bound...)
        var validTime = this.validateSwipeTime();
        var validDistance = this.validateSwipeDistance();
        var didCancel = this.didSwipeBackToCancel();

        //If we have exceeded our time, then cancel
        if (!validTime || didCancel) {
            nextPhase = PHASE_CANCEL;
        }
        //Else if we are moving, and have reached distance then end
        else if (validDistance && currentPhase == PHASE_MOVE && (!options.triggerOnTouchEnd || options.triggerOnTouchLeave)) {
            nextPhase = PHASE_END;
        }
        //Else if we have ended by leaving and didn't reach distance, then cancel
        else if (!validDistance && currentPhase == PHASE_END && options.triggerOnTouchLeave) {
            nextPhase = PHASE_CANCEL;
        }

        return nextPhase;
    },

    triggerHandler: function(event, phase) {
        var ret,
            touches = event.touches;

        // SWIPE GESTURES
        if (this.didSwipe() || this.hasSwipes()) {
            ret = this.triggerHandlerForGesture(event, phase, SWIPE);
        }

        // PINCH GESTURES (if the above didn't cancel)
        if ((this.didPinch() || this.hasPinches()) && ret !== false) {
            ret = this.triggerHandlerForGesture(event, phase, PINCH);
        }

        // CLICK / TAP (if the above didn't cancel)
        if (this.didDoubleTap() && ret !== false) {
            //Trigger the tap events...
            ret = this.triggerHandlerForGesture(event, phase, DOUBLE_TAP);
        }

        // CLICK / TAP (if the above didn't cancel)
        else if (this.didLongTap() && ret !== false) {
            //Trigger the tap events...
            ret = this.triggerHandlerForGesture(event, phase, LONG_TAP);
        }

        // CLICK / TAP (if the above didn't cancel)
        else if (this.didTap() && ret !== false) {
            //Trigger the tap event..
            ret = this.triggerHandlerForGesture(event, phase, TAP);
        }

        // If we are cancelling the gesture, then manually trigger the reset handler
        if (phase === PHASE_CANCEL) {
            this.touchCancel(event);
        }

        // If we are ending the gesture, then manually trigger the reset handler IF all fingers are off
        if (phase === PHASE_END) {
            //If we support touch, then check that all fingers are off before we cancel
            if (touches) {
                if (!touches.length) {
                    this.touchCancel(event);
                }
            } else {
                this.touchCancel(event);
            }
        }

        return ret;
    },

    triggerHandlerForGesture: function(event, phase, gesture) {

        var ret, $element = this.element, options = this.options;

        //SWIPES....
        if (gesture == SWIPE) {
            //Trigger status every time..
            $element.trigger('swipeStatus', [phase, this.direction || null, this.distance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.currentDirection]);

            if (options.swipeStatus) {
                ret = options.swipeStatus.call($element, event, phase, this.direction || null, this.distance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.currentDirection);
                //If the status cancels, then dont run the subsequent event handlers..
                if (ret === false) return false;
            }

            if (phase == PHASE_END && this.validateSwipe()) {

                //Cancel any taps that were in progress...
                clearTimeout(this.singleTapTimeout);
                clearTimeout(this.holdTimeout);

                $element.trigger('swipe', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);

                if (options.swipe) {
                    ret = options.swipe.call($element, event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection);
                    //If the status cancels, then dont run the subsequent event handlers..
                    if (ret === false) return false;
                }

                //trigger direction specific event handlers
                switch (this.direction) {
                    case LEFT:
                        $element.trigger('swipeLeft', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);

                        if (options.swipeLeft) {
                            ret = options.swipeLeft.call($element, event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection);
                        }
                        break;

                    case RIGHT:
                        $element.trigger('swipeRight', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);

                        if (options.swipeRight) {
                            ret = options.swipeRight.call($element, event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection);
                        }
                        break;

                    case UP:
                        $element.trigger('swipeUp', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);

                        if (options.swipeUp) {
                            ret = options.swipeUp.call($element, event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection);
                        }
                        break;

                    case DOWN:
                        $element.trigger('swipeDown', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);

                        if (options.swipeDown) {
                            ret = options.swipeDown.call($element, event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection);
                        }
                        break;
                }
            }
        }


        //PINCHES....
        if (gesture == PINCH) {
            $element.trigger('pinchStatus', [phase, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.pinchZoom, this.fingerData]);

            if (options.pinchStatus) {
                ret = options.pinchStatus.call($element, event, phase, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.pinchZoom, this.fingerData);
                //If the status cancels, then dont run the subsequent event handlers..
                if (ret === false) return false;
            }

            if (phase == PHASE_END && this.validatePinch()) {

                switch (this.pinchDirection) {
                    case IN:
                        $element.trigger('pinchIn', [this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.pinchZoom, this.fingerData]);

                        if (options.pinchIn) {
                            ret = options.pinchIn.call($element, event, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.pinchZoom, this.fingerData);
                        }
                        break;

                    case OUT:
                        $element.trigger('pinchOut', [this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.pinchZoom, this.fingerData]);

                        if (options.pinchOut) {
                            ret = options.pinchOut.call($element, event, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.pinchZoom, this.fingerData);
                        }
                        break;
                }
            }
        }

        if (gesture == TAP) {
            if (phase === PHASE_CANCEL || phase === PHASE_END) {

                clearTimeout(this.singleTapTimeout);
                clearTimeout(this.holdTimeout);

                //If we are also looking for doubelTaps, wait incase this is one...
                if (this.hasDoubleTap() && !this.inDoubleTap()) {
                    this.doubleTapStartTime = this.getTimeStamp();

                    //Now wait for the double tap timeout, and trigger this single tap
                    //if its not cancelled by a double tap
                    this.singleTapTimeout = setTimeout($.proxy(function() {
                        this.doubleTapStartTime = null;
                        $element.trigger('tap', [event.target]);

                        if (options.tap) {
                            ret = options.tap.call($element, event, event.target);
                        }
                    }, this), options.doubleTapThreshold);

                } else {
                    this.doubleTapStartTime = null;
                    $element.trigger('tap', [event.target]);
                    if (options.tap) {
                        ret = options.tap.call($element, event, event.target);
                    }
                }
            }
        } else if (gesture == DOUBLE_TAP) {
            if (phase === PHASE_CANCEL || phase === PHASE_END) {
                clearTimeout(this.singleTapTimeout);
                clearTimeout(this.holdTimeout);
                this.doubleTapStartTime = null;
                $element.trigger('doubletap', [event.target]);

                if (options.doubleTap) {
                    ret = options.doubleTap.call($element, event, event.target);
                }
            }
        } else if (gesture == LONG_TAP) {
            if (phase === PHASE_CANCEL || phase === PHASE_END) {
                clearTimeout(this.singleTapTimeout);
                this.doubleTapStartTime = null;

                $element.trigger('longtap', [event.target]);
                if (options.longTap) {
                    ret = options.longTap.call($element, event, event.target);
                }
            }
        }

        return ret;
    },

    validateSwipeDistance: function() {
        var valid = true;
        //If we made it past the min swipe distance..
        if (this.options.threshold !== null) {
            valid = this.distance >= this.options.threshold;
        }

        return valid;
    },

    didSwipeBackToCancel: function() {
        var options = this.options;
        var cancelled = false;
        if (options.cancelThreshold !== null && this.direction !== null) {
            cancelled = (this.getMaxDistance(this.direction) - this.distance) >= options.cancelThreshold;
        }

        return cancelled;
    },

    validatePinchDistance: function() {
        if (this.options.pinchThreshold !== null) {
            return this.pinchDistance >= this.options.pinchThreshold;
        }
        return true;
    },

    validateSwipeTime: function() {
        var result, options = this.options;

        if (options.maxTimeThreshold) {
            result = duration < options.maxTimeThreshold;
        } else {
            result = true;
        }

        return result;
    },

    validateDefaultEvent: function(jqEvent, direction) {
        var options = this.options;

        //If the option is set, allways allow the event to bubble up (let user handle weirdness)
        if (options.preventDefaultEvents === false) {
            return;
        }

        if (options.allowPageScroll === NONE) {
            jqEvent.preventDefault();
        } else {
            var auto = options.allowPageScroll === AUTO;

            switch (direction) {
                case LEFT:
                    if ((options.swipeLeft && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) {
                        jqEvent.preventDefault();
                    }
                    break;

                case RIGHT:
                    if ((options.swipeRight && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) {
                        jqEvent.preventDefault();
                    }
                    break;

                case UP:
                    if ((options.swipeUp && auto) || (!auto && options.allowPageScroll != VERTICAL)) {
                        jqEvent.preventDefault();
                    }
                    break;

                case DOWN:
                    if ((options.swipeDown && auto) || (!auto && options.allowPageScroll != VERTICAL)) {
                        jqEvent.preventDefault();
                    }
                    break;

                case NONE:

                    break;
            }
        }
    },

    validatePinch: function() {
        var hasCorrectFingerCount = this.validateFingers();
        var hasEndPoint = this.validateEndPoint();
        var hasCorrectDistance = this.validatePinchDistance();
        return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance;
    },

    hasPinches: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.options.pinchStatus || this.options.pinchIn || this.options.pinchOut);
    },

    didPinch: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validatePinch() && this.hasPinches());
    },

    validateSwipe: function() {
        //Check validity of swipe
        var hasValidTime = this.validateSwipeTime();
        var hasValidDistance = this.validateSwipeDistance();
        var hasCorrectFingerCount = this.validateFingers();
        var hasEndPoint = this.validateEndPoint();
        var didCancel = this.didSwipeBackToCancel();

        // if the user swiped more than the minimum length, perform the appropriate action
        // hasValidDistance is null when no distance is set
        return !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime;
    },

    hasSwipes: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.options.swipe || this.options.swipeStatus || this.options.swipeLeft || this.options.swipeRight || this.options.swipeUp || this.options.swipeDown);
    },

    didSwipe: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validateSwipe() && this.hasSwipes());
    },

    validateFingers: function() {
        //The number of fingers we want were matched, or on desktop we ignore
        return ((this.fingerCount === this.options.fingers || this.options.fingers === ALL_FINGERS) || !SUPPORTS_TOUCH);
    },

    validateEndPoint: function() {
        //We have an end value for the finger
        return this.fingerData[0].end.x !== 0;
    },

    hasTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.options.tap);
    },

    hasDoubleTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.options.doubleTap);
    },

    hasLongTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.options.longTap);
    },

    validateDoubleTap: function() {
        if (this.doubleTapStartTime == null) {
            return false;
        }
        var now = this.getTimeStamp();
        return (this.hasDoubleTap() && ((now - this.doubleTapStartTime) <= this.options.doubleTapThreshold));
    },

    inDoubleTap: function() {
        return this.validateDoubleTap();
    },

    validateTap: function() {
        return ((this.fingerCount === 1 || !SUPPORTS_TOUCH) && (isNaN(this.distance) || this.distance < this.options.threshold));
    },

    validateLongTap: function() {
        var options = this.options;
        //slight threshold on moving finger
        return ((this.duration > options.longTapThreshold) && (this.distance < DOUBLE_TAP_THRESHOLD)); // check double_tab_threshold where from
    },

    didTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validateTap() && this.hasTap());
    },

    didDoubleTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validateDoubleTap() && this.hasDoubleTap());
    },

    didLongTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validateLongTap() && this.hasLongTap());
    },

    startMultiFingerRelease: function(event) {
        this.previousTouchEndTime = this.getTimeStamp();
        this.fingerCountAtRelease = event.touches.length + 1;
    },

    cancelMultiFingerRelease: function() {
        this.previousTouchEndTime = 0;
        this.fingerCountAtRelease = 0;
    },

    inMultiFingerRelease: function() {
        var withinThreshold = false;

        if (this.previousTouchEndTime) {
            var diff = this.getTimeStamp() - this.previousTouchEndTime;
            if (diff <= options.fingerReleaseThreshold) {
                withinThreshold = true;
            }
        }

        return withinThreshold;
    },

    getTouchInProgress: function() {
        var $element = this.element;
        //strict equality to ensure only true and false are returned
        return ($element.data('corecss_intouch') === true);
    },

    setTouchInProgress: function(val) {
        var $element = this.element;

        //If destroy is called in an event handler, we have no el, and we have already cleaned up, so return.
        if(!$element) { return; }

        //Add or remove event listeners depending on touch status
        if (val === true) {
            $element.bind(this.MOVE_EV, $.proxy(this.touchMove, this));
            $element.bind(this.END_EV, $.proxy(this.touchEnd, this));

            //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
            if (this.LEAVE_EV) {
                $element.bind(this.LEAVE_EV, $.proxy(this.touchLeave, this));
            }
        } else {

            $element.unbind(this.MOVE_EV, this.touchMove, false);
            $element.unbind(this.END_EV, this.touchEnd, false);

            //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
            if (this.LEAVE_EV) {
                $element.unbind(this.LEAVE_EV, this.touchLeave, false);
            }
        }

        //strict equality to ensure only true and false can update the value
        $element.data('corecss_intouch', val === true);
    },

    createFingerData: function(id, evt) {
        var f = {
            start: {
                x: 0,
                y: 0
            },
            last: {
                x: 0,
                y: 0
            },
            end: {
                x: 0,
                y: 0
            }
        };
        f.start.x = f.last.x = f.end.x = evt.pageX || evt.clientX;
        f.start.y = f.last.y = f.end.y = evt.pageY || evt.clientY;
        this.fingerData[id] = f;
        return f;
    },

    updateFingerData: function(evt) {
        var id = evt.identifier !== undefined ? evt.identifier : 0;
        var f = this.getFingerData(id);

        if (f === null) {
            f = this.createFingerData(id, evt);
        }

        f.last.x = f.end.x;
        f.last.y = f.end.y;

        f.end.x = evt.pageX || evt.clientX;
        f.end.y = evt.pageY || evt.clientY;

        return f;
    },

    getFingerData: function(id) {
        return this.fingerData[id] || null;
    },

    setMaxDistance: function(direction, distance) {
        if (direction == NONE) return;
        distance = Math.max(distance, this.getMaxDistance(direction));
        this.maximumsMap[direction].distance = distance;
    },

    getMaxDistance: function(direction) {
        return (this.maximumsMap[direction]) ? this.maximumsMap[direction].distance : undefined;
    },

    createMaximumsData: function() {
        var maxData = {};
        maxData[LEFT] = this.createMaximumVO(LEFT);
        maxData[RIGHT] = this.createMaximumVO(RIGHT);
        maxData[UP] = this.createMaximumVO(UP);
        maxData[DOWN] = this.createMaximumVO(DOWN);

        return maxData;
    },

    createMaximumVO: function(dir) {
        return {
            direction: dir,
            distance: 0
        }
    },

    calculateDuration: function(){
        return this.endTime - this.startTime;
    },

    calculateTouchesDistance: function(startPoint, endPoint){
        var diffX = Math.abs(startPoint.x - endPoint.x);
        var diffY = Math.abs(startPoint.y - endPoint.y);

        return Math.round(Math.sqrt(diffX * diffX + diffY * diffY));
    },

    calculatePinchZoom: function(startDistance, endDistance){
        var percent = (endDistance / startDistance) * 100; // 1 ? 100
        return percent.toFixed(2);
    },

    calculatePinchDirection: function(){
        if (this.pinchZoom < 1) {
            return OUT;
        } else {
            return IN;
        }
    },

    calculateDistance: function(startPoint, endPoint){
        return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)));
    },

    calculateAngle: function(startPoint, endPoint){
        var x = startPoint.x - endPoint.x;
        var y = endPoint.y - startPoint.y;
        var r = Math.atan2(y, x); //radians
        var angle = Math.round(r * 180 / Math.PI); //degrees

        //ensure value is positive
        if (angle < 0) {
            angle = 360 - Math.abs(angle);
        }

        return angle;
    },

    calculateDirection: function(startPoint, endPoint){
        if( this.comparePoints(startPoint, endPoint) ) {
            return NONE;
        }

        var angle = this.calculateAngle(startPoint, endPoint);

        if ((angle <= 45) && (angle >= 0)) {
            return LEFT;
        } else if ((angle <= 360) && (angle >= 315)) {
            return LEFT;
        } else if ((angle >= 135) && (angle <= 225)) {
            return RIGHT;
        } else if ((angle > 45) && (angle < 135)) {
            return DOWN;
        } else {
            return UP;
        }
    },

    getTimeStamp: function(){
        return (new Date()).getTime();
    },

    getBounds: function (el) {
        el = $(el);
        var offset = el.offset();

        return {
            left: offset.left,
            right: offset.left + el.outerWidth(),
            top: offset.top,
            bottom: offset.top + el.outerHeight()
        };
    },

    isInBounds: function(point, bounds){
        return (point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom);
    },

    comparePoints: function(pointA, pointB) {
        return (pointA.x == pointB.x && pointA.y == pointB.y);
    }
});

// Source: js/widgets/tabs.js
$.widget( "corecss.tabs" , {

    version: "1.0.0",

    options: {
        openTarget: false,
        duration: CORE_ANIMATION_DURATION,
        target: 'self',
        markerColor: 'bg-white',
        onTabClick: function(tab){return true;},
        onTabChange: function(tab){}
    },


    _create: function () {
        var that = this, element = this.element, o = this.options;
        var tabs = element.find('li:not(.tab-marker)');
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
        //var tabs = element.find('li:not(.tab-marker)');
        var tab_marker = element.find('li.tab-marker');

        if (tab_marker.length == 0) {
            tab_marker = $("<li>").addClass("tab-marker");
            tab_marker.appendTo(element);
        }

        if (o.markerColor.isColor()) {
            tab_marker.css('background', o.markerColor);
        } else {
            tab_marker.addClass(o.markerColor);
        }
    },

    _openTab: function(tab, direction){
        var element = this.element, o = this.options;
        var tabs = element.find('li:not(.tab-marker)');
        var frames = o.target === 'self' ? element.siblings('.tabs-content').children('div') : $(o.target).children('div');
        var frame = '#'+tab.data('target');
        var marker = element.find('li.tab-marker');
        var tab_width = tab.outerWidth();
        var tab_left = tab.position().left;
        var shift = tab.position().left + tab.outerWidth();
        var width = element.outerWidth();
        var scroll = element.scrollLeft();
        var magic = 32;

        tabs.removeClass('active');
        frames.hide();

        tab.addClass('active');
        $(frame).show();

        marker.animate({
            width: tab_width,
            top: '100%',
            left: tab_left + scroll
        }, o.duration);

        if (shift + magic > width) {
            element.animate({
                scrollLeft: scroll + (shift - width) + (tab_width / 2)
            }, CORE_ANIMATION_DURATION);
        }

        if (tab_left - magic < 0) {
            element.animate({
                scrollLeft: tab_left + scroll - (tab_width / 2)
            }, CORE_ANIMATION_DURATION);
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var tabs = element.find('li');

        element.on('click', 'li', function(e){

            if ($(this).hasClass('tab-marker')) return;
            if ($(this).hasClass('scroll-control-left')) return;
            if ($(this).hasClass('scroll-control-right')) return;

            var result;
            var tab = $(this), target = tab.data('target'), frame = $(target);
            var tab_active = element.find("li.active");
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

            if (target !=undefined && target.isUrl()) {
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

// Source: js/widgets/widget.js
$.widget( "corecss.widget" , {

    version: "1.0.0",

    options: {
        someValue: null
    },

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        element.data('widget', this);

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


 return CoreCss.init();

}));