/*!
 * Core CSS v1.0.0 (https://github.com/imena/core-css)
 * Copyright 2017 Sergey Pimenov
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
if (window.CORE_DEBUG == undefined) {window.CORE_DEBUG = true;}
if (window.CORE_CALENDAR_WEEK_START == undefined) {window.CORE_CALENDAR_WEEK_START = 1;}
if (window.CORE_LOCALE == undefined) {window.CORE_LOCALE = 'en-US';}
if (window.CORE_ANIMATION_DURATION == undefined) {window.CORE_ANIMATION_DURATION = 200;}

var CoreCss = {

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

$.CoreCss = window.coreCss = CoreCss;
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

        var locale = CORE_LOCALE || 'en-US';

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
                ddd: coreLocales[locale].calendar.days[D],
                dddd: coreLocales[locale].calendar.days[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: coreLocales[locale].calendar.months[m],
                mmmm: coreLocales[locale].calendar.months[m + 12],
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


// Source: js/utils/hash.js
var hash = {
    md5: function(s){
        return hex_md5(s);
    },
    sha1: function(s){
        return hex_sha1(s);
    },
    sha256: function(s){
        return hex_sha256(s);
    },
    sha512: function(s){
        return hex_sha512(s);
    },
    ripemd160: function(s){
        return hex_rmd160(s)
    }
};

window.coreHash = hash;
// Source: js/utils/locales.js
var locales = {

    'en-US': {
        calendar: {
            months: [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            days: [
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
                "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa",
                "Sun", "Mon", "Tus", "Wen", "Thu", "Fri", "Sat"
            ],
            time: ["HOUR", "MIN", "SEC"]
        },
        buttons: {
            ok: "OK",
            cancel: "Cancel",
            done: "Done",
            today: "Today",
            now: "Now",
            clear: "Clear",
            help: "Help",
            yes: "Yes",
            no: "No",
            random: "Random"
        }
    },

    'uk-UA': {
        calendar: {
            months: [
                "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
                "Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"
            ],
            days: [
                "Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота",
                "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
                "Нед", "Пон", "Вiв", "Сер", "Чет", "Пят", "Суб"
            ],
            time: ["ГОД", "ХВЛ", "СЕК"]
        },
        buttons: {
            ok: "ОК",
            cancel: "Відміна",
            done: "Готово",
            today: "Сьогодні",
            now: "Зараз",
            clear: "Очистити",
            help: "Допомога",
            yes: "Так",
            no: "Ні",
            random: "Випадково"
        }
    },

    'ru-RU': {
        calendar: {
            months: [
                "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
                "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
            ],
            days: [
                "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",
                "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
                "Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"
            ],
            time: ["ЧАС", "МИН", "СЕК"]
        },
        buttons: {
            ok: "ОК",
            cancel: "Отмена",
            done: "Готово",
            today: "Сегодня",
            now: "Сейчас",
            clear: "Очистить",
            help: "Помощь",
            yes: "Да",
            no: "Нет",
            random: "Случайно"
        }
    },

    'de_DE': {
        calendar: {
            months: [
                "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember",
                "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
            ],
            days: [
                "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag",
                "Sn", "Mn", "Di", "Mi", "Do", "Fr", "Sa",
                "Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"
            ],
            time: ["UHR", "MIN", "SEK"]
        },
        buttons: {
            ok: "OK",
            cancel: "Abbrechen",
            done: "Fertig",
            today: "Heute",
            now: "Jetzt",
            clear: "Reinigen",
            help: "Hilfe",
            yes: "Ja",
            no: "Nein",
            random: "Zufällig"
        }
    }

};

window.coreLocales = locales;

// Source: js/utils/md5.js
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s) {
    return rstr2hex(rstr_md5(str2rstr_utf8(s)));
}
function b64_md5(s) {
    return rstr2b64(rstr_md5(str2rstr_utf8(s)));
}
function any_md5(s, e) {
    return rstr2any(rstr_md5(str2rstr_utf8(s)), e);
}
function hex_hmac_md5(k, d) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function b64_hmac_md5(k, d) {
    return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function any_hmac_md5(k, d, e) {
    return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test() {
    return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data) {
    var bkey = rstr2binl(key);
    if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
    try {
        hexcase
    } catch (e) {
        hexcase = 0;
    }
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
            + hex_tab.charAt(x & 0x0F);
    }
    return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input) {
    try {
        b64pad
    } catch (e) {
        b64pad = '';
    }
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var len = input.length;
    for (var i = 0; i < len; i += 3) {
        var triplet = (input.charCodeAt(i) << 16)
            | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
            | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > input.length * 8) output += b64pad;
            else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
    }
    return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding) {
    var divisor = encoding.length;
    var i, j, q, x, quotient;

    /* Convert to an array of 16-bit big-endian values, forming the dividend */
    var dividend = Array(Math.ceil(input.length / 2));
    for (i = 0; i < dividend.length; i++) {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
    }

    /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. All remainders are stored for later
     * use.
     */
    var full_length = Math.ceil(input.length * 8 /
        (Math.log(encoding.length) / Math.log(2)));
    var remainders = Array(full_length);
    for (j = 0; j < full_length; j++) {
        quotient = Array();
        x = 0;
        for (i = 0; i < dividend.length; i++) {
            x = (x << 16) + dividend[i];
            q = Math.floor(x / divisor);
            x -= q * divisor;
            if (quotient.length > 0 || q > 0)
                quotient[quotient.length] = q;
        }
        remainders[j] = x;
        dividend = quotient;
    }

    /* Convert the remainders to the output string */
    var output = "";
    for (i = remainders.length - 1; i >= 0; i--)
        output += encoding.charAt(remainders[i]);

    return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;

    while (++i < input.length) {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++;
        }

        /* Encode output as utf-8 */
        if (x <= 0x7F)
            output += String.fromCharCode(x);
        else if (x <= 0x7FF)
            output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                0x80 | ( x & 0x3F));
        else if (x <= 0xFFFF)
            output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
        else if (x <= 0x1FFFFF)
            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                0x80 | ((x >>> 12) & 0x3F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
    }
    return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
            (input.charCodeAt(i) >>> 8) & 0xFF);
    return output;
}

function str2rstr_utf16be(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
            input.charCodeAt(i) & 0xFF);
    return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input) {
    var output = Array(input.length >> 2);
    for (var i = 0; i < output.length; i++)
        output[i] = 0;
    for (var i = 0; i < input.length * 8; i += 8)
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}


window.md5 = {
    hex: function(val){
        return hex_md5(val);
    },

    b64: function(val){
        return b64_md5(val);
    },

    any: function(s, e){
        return any_md5(s, e);
    },

    hex_hmac: function(k, d){
        return hex_hmac_md5(k, d);
    },

    b64_hmac: function(k, d){
        return b64_hmac_md5(k, d);
    },

    any_hmac: function(k, d, e){
        return any_hmac_md5(k, d, e);
    }
};
// Source: js/utils/ripemd160.js
/*
 * A JavaScript implementation of the RIPEMD-160 Algorithm
 * Version 2.2 Copyright Jeremy Lin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 * Also http://www.ocf.berkeley.edu/~jjlin/jsotp/
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_rmd160(s) {
    return rstr2hex(rstr_rmd160(str2rstr_utf8(s)));
}
function b64_rmd160(s) {
    return rstr2b64(rstr_rmd160(str2rstr_utf8(s)));
}
function any_rmd160(s, e) {
    return rstr2any(rstr_rmd160(str2rstr_utf8(s)), e);
}
function hex_hmac_rmd160(k, d) {
    return rstr2hex(rstr_hmac_rmd160(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function b64_hmac_rmd160(k, d) {
    return rstr2b64(rstr_hmac_rmd160(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function any_hmac_rmd160(k, d, e) {
    return rstr2any(rstr_hmac_rmd160(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function rmd160_vm_test() {
    return hex_rmd160("abc").toLowerCase() == "8eb208f7e05d987a9b044a8e98c6b087f15a0bfc";
}

/*
 * Calculate the rmd160 of a raw string
 */
function rstr_rmd160(s) {
    return binl2rstr(binl_rmd160(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-rmd160 of a key and some data (raw strings)
 */
function rstr_hmac_rmd160(key, data) {
    var bkey = rstr2binl(key);
    if (bkey.length > 16) bkey = binl_rmd160(bkey, key.length * 8);

    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = binl_rmd160(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binl_rmd160(opad.concat(hash), 512 + 160));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
    try {
        hexcase
    } catch (e) {
        hexcase = 0;
    }
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
            + hex_tab.charAt(x & 0x0F);
    }
    return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input) {
    try {
        b64pad
    } catch (e) {
        b64pad = '';
    }
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var len = input.length;
    for (var i = 0; i < len; i += 3) {
        var triplet = (input.charCodeAt(i) << 16)
            | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
            | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > input.length * 8) output += b64pad;
            else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
    }
    return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding) {
    var divisor = encoding.length;
    var remainders = Array();
    var i, q, x, quotient;

    /* Convert to an array of 16-bit big-endian values, forming the dividend */
    var dividend = Array(Math.ceil(input.length / 2));
    for (i = 0; i < dividend.length; i++) {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
    }

    /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. We stop when the dividend is zero.
     * All remainders are stored for later use.
     */
    while (dividend.length > 0) {
        quotient = Array();
        x = 0;
        for (i = 0; i < dividend.length; i++) {
            x = (x << 16) + dividend[i];
            q = Math.floor(x / divisor);
            x -= q * divisor;
            if (quotient.length > 0 || q > 0)
                quotient[quotient.length] = q;
        }
        remainders[remainders.length] = x;
        dividend = quotient;
    }

    /* Convert the remainders to the output string */
    var output = "";
    for (i = remainders.length - 1; i >= 0; i--)
        output += encoding.charAt(remainders[i]);

    /* Append leading zero equivalents */
    var full_length = Math.ceil(input.length * 8 /
        (Math.log(encoding.length) / Math.log(2)))
    for (i = output.length; i < full_length; i++)
        output = encoding[0] + output;

    return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;

    while (++i < input.length) {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++;
        }

        /* Encode output as utf-8 */
        if (x <= 0x7F)
            output += String.fromCharCode(x);
        else if (x <= 0x7FF)
            output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                0x80 | ( x & 0x3F));
        else if (x <= 0xFFFF)
            output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
        else if (x <= 0x1FFFFF)
            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                0x80 | ((x >>> 12) & 0x3F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
    }
    return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
            (input.charCodeAt(i) >>> 8) & 0xFF);
    return output;
}

function str2rstr_utf16be(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
            input.charCodeAt(i) & 0xFF);
    return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input) {
    var output = Array(input.length >> 2);
    for (var i = 0; i < output.length; i++)
        output[i] = 0;
    for (var i = 0; i < input.length * 8; i += 8)
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    return output;
}

/*
 * Calculate the RIPE-MD160 of an array of little-endian words, and a bit length.
 */
function binl_rmd160(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var h0 = 0x67452301;
    var h1 = 0xefcdab89;
    var h2 = 0x98badcfe;
    var h3 = 0x10325476;
    var h4 = 0xc3d2e1f0;

    for (var i = 0; i < x.length; i += 16) {
        var T;
        var A1 = h0, B1 = h1, C1 = h2, D1 = h3, E1 = h4;
        var A2 = h0, B2 = h1, C2 = h2, D2 = h3, E2 = h4;
        for (var j = 0; j <= 79; ++j) {
            T = safe_add(A1, rmd160_f(j, B1, C1, D1));
            T = safe_add(T, x[i + rmd160_r1[j]]);
            T = safe_add(T, rmd160_K1(j));
            T = safe_add(bit_rol(T, rmd160_s1[j]), E1);
            A1 = E1;
            E1 = D1;
            D1 = bit_rol(C1, 10);
            C1 = B1;
            B1 = T;
            T = safe_add(A2, rmd160_f(79 - j, B2, C2, D2));
            T = safe_add(T, x[i + rmd160_r2[j]]);
            T = safe_add(T, rmd160_K2(j));
            T = safe_add(bit_rol(T, rmd160_s2[j]), E2);
            A2 = E2;
            E2 = D2;
            D2 = bit_rol(C2, 10);
            C2 = B2;
            B2 = T;
        }
        T = safe_add(h1, safe_add(C1, D2));
        h1 = safe_add(h2, safe_add(D1, E2));
        h2 = safe_add(h3, safe_add(E1, A2));
        h3 = safe_add(h4, safe_add(A1, B2));
        h4 = safe_add(h0, safe_add(B1, C2));
        h0 = T;
    }
    return [h0, h1, h2, h3, h4];
}

function rmd160_f(j, x, y, z) {
    return ( 0 <= j && j <= 15) ? (x ^ y ^ z) :
        (16 <= j && j <= 31) ? (x & y) | (~x & z) :
            (32 <= j && j <= 47) ? (x | ~y) ^ z :
                (48 <= j && j <= 63) ? (x & z) | (y & ~z) :
                    (64 <= j && j <= 79) ? x ^ (y | ~z) :
                        "rmd160_f: j out of range";
}
function rmd160_K1(j) {
    return ( 0 <= j && j <= 15) ? 0x00000000 :
        (16 <= j && j <= 31) ? 0x5a827999 :
            (32 <= j && j <= 47) ? 0x6ed9eba1 :
                (48 <= j && j <= 63) ? 0x8f1bbcdc :
                    (64 <= j && j <= 79) ? 0xa953fd4e :
                        "rmd160_K1: j out of range";
}
function rmd160_K2(j) {
    return ( 0 <= j && j <= 15) ? 0x50a28be6 :
        (16 <= j && j <= 31) ? 0x5c4dd124 :
            (32 <= j && j <= 47) ? 0x6d703ef3 :
                (48 <= j && j <= 63) ? 0x7a6d76e9 :
                    (64 <= j && j <= 79) ? 0x00000000 :
                        "rmd160_K2: j out of range";
}
var rmd160_r1 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
    3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
    1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
    4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
];
var rmd160_r2 = [
    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
    6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
    15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
    8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
    12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
];
var rmd160_s1 = [
    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
    7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
    11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
    11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
    9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
];
var rmd160_s2 = [
    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
    9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
    9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
    15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
    8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
];

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

window.rmd160 = {
    hex: function(val){
        return hex_rmd160(val);
    },

    b64: function(val){
        return b64_rmd160(val);
    },

    any: function(s, e){
        return any_rmd160(s, e);
    },

    hex_hmac: function(k, d){
        return hex_hmac_rmd160(k, d);
    },

    b64_hmac: function(k, d){
        return b64_hmac_rmd160(k, d);
    },

    any_hmac: function(k, d, e){
        return any_hmac_rmd160(k, d, e);
    }
};
// Source: js/utils/scroll-events.js
var special = jQuery.event.special,
    uid1 = 'D' + (+new Date()),
    uid2 = 'D' + (+new Date() + 1);

special.scrollstart = {
    setup: function() {

        var timer,
            handler =  function(evt) {

                var _self = this,
                    _args = arguments;

                if (timer) {
                    clearTimeout(timer);
                } else {
                    evt.type = 'scrollstart';
                    jQuery.event.dispatch.apply(_self, _args);
                }

                timer = setTimeout( function(){
                    timer = null;
                }, special.scrollstop.latency);

            };

        jQuery(this).bind('scroll', handler).data(uid1, handler);

    },
    teardown: function(){
        jQuery(this).unbind( 'scroll', jQuery(this).data(uid1) );
    }
};

special.scrollstop = {
    latency: 300,
    setup: function() {

        var timer,
            handler = function(evt) {

                var _self = this,
                    _args = arguments;

                if (timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout( function(){

                    timer = null;
                    evt.type = 'scrollstop';
                    jQuery.event.dispatch.apply(_self, _args);

                }, special.scrollstop.latency);

            };

        jQuery(this).bind('scroll', handler).data(uid2, handler);

    },
    teardown: function() {
        jQuery(this).unbind( 'scroll', jQuery(this).data(uid2) );
    }
};
// Source: js/utils/sha1.js
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s) {
    return rstr2hex(rstr_sha1(str2rstr_utf8(s)));
}
function b64_sha1(s) {
    return rstr2b64(rstr_sha1(str2rstr_utf8(s)));
}
function any_sha1(s, e) {
    return rstr2any(rstr_sha1(str2rstr_utf8(s)), e);
}
function hex_hmac_sha1(k, d) {
    return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function b64_hmac_sha1(k, d) {
    return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function any_hmac_sha1(k, d, e) {
    return rstr2any(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test() {
    return hex_sha1("abc").toLowerCase() == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA1 of a raw string
 */
function rstr_sha1(s) {
    return binb2rstr(binb_sha1(rstr2binb(s), s.length * 8));
}

/*
 * Calculate the HMAC-SHA1 of a key and some data (raw strings)
 */
function rstr_hmac_sha1(key, data) {
    var bkey = rstr2binb(key);
    if (bkey.length > 16) bkey = binb_sha1(bkey, key.length * 8);

    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = binb_sha1(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
    return binb2rstr(binb_sha1(opad.concat(hash), 512 + 160));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
    try {
        hexcase
    } catch (e) {
        hexcase = 0;
    }
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
            + hex_tab.charAt(x & 0x0F);
    }
    return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input) {
    try {
        b64pad
    } catch (e) {
        b64pad = '';
    }
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var len = input.length;
    for (var i = 0; i < len; i += 3) {
        var triplet = (input.charCodeAt(i) << 16)
            | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
            | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > input.length * 8) output += b64pad;
            else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
    }
    return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding) {
    var divisor = encoding.length;
    var remainders = Array();
    var i, q, x, quotient;

    /* Convert to an array of 16-bit big-endian values, forming the dividend */
    var dividend = Array(Math.ceil(input.length / 2));
    for (i = 0; i < dividend.length; i++) {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
    }

    /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. We stop when the dividend is zero.
     * All remainders are stored for later use.
     */
    while (dividend.length > 0) {
        quotient = Array();
        x = 0;
        for (i = 0; i < dividend.length; i++) {
            x = (x << 16) + dividend[i];
            q = Math.floor(x / divisor);
            x -= q * divisor;
            if (quotient.length > 0 || q > 0)
                quotient[quotient.length] = q;
        }
        remainders[remainders.length] = x;
        dividend = quotient;
    }

    /* Convert the remainders to the output string */
    var output = "";
    for (i = remainders.length - 1; i >= 0; i--)
        output += encoding.charAt(remainders[i]);

    /* Append leading zero equivalents */
    var full_length = Math.ceil(input.length * 8 /
        (Math.log(encoding.length) / Math.log(2)))
    for (i = output.length; i < full_length; i++)
        output = encoding[0] + output;

    return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;

    while (++i < input.length) {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++;
        }

        /* Encode output as utf-8 */
        if (x <= 0x7F)
            output += String.fromCharCode(x);
        else if (x <= 0x7FF)
            output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                0x80 | ( x & 0x3F));
        else if (x <= 0xFFFF)
            output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
        else if (x <= 0x1FFFFF)
            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                0x80 | ((x >>> 12) & 0x3F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
    }
    return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
            (input.charCodeAt(i) >>> 8) & 0xFF);
    return output;
}

function str2rstr_utf16be(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
            input.charCodeAt(i) & 0xFF);
    return output;
}

/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binb(input) {
    var output = Array(input.length >> 2);
    for (var i = 0; i < output.length; i++)
        output[i] = 0;
    for (var i = 0; i < input.length * 8; i += 8)
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
    return output;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
    return output;
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function binb_sha1(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;

    var w = Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;

        for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = x[i + j];
            else w[j] = bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
                safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = bit_rol(b, 30);
            b = a;
            a = t;
        }

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d) {
    if (t < 20) return (b & c) | ((~b) & d);
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t) {
    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
        (t < 60) ? -1894007588 : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

window.sha1 = {
    hex: function(val){
        return hex_sha1(val);
    },

    b64: function(val){
        return b64_sha1(val);
    },

    any: function(s, e){
        return any_sha1(s, e);
    },

    hex_hmac: function(k, d){
        return hex_hmac_sha1(k, d);
    },

    b64_hmac: function(k, d){
        return b64_hmac_sha1(k, d);
    },

    any_hmac: function(k, d, e){
        return any_hmac_sha1(k, d, e);
    }
};
// Source: js/utils/sha256.js
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2 Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 * Also http://anmar.eu.org/projects/jssha2/
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha256(s) {
    return rstr2hex(rstr_sha256(str2rstr_utf8(s)));
}
function b64_sha256(s) {
    return rstr2b64(rstr_sha256(str2rstr_utf8(s)));
}
function any_sha256(s, e) {
    return rstr2any(rstr_sha256(str2rstr_utf8(s)), e);
}
function hex_hmac_sha256(k, d) {
    return rstr2hex(rstr_hmac_sha256(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function b64_hmac_sha256(k, d) {
    return rstr2b64(rstr_hmac_sha256(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function any_hmac_sha256(k, d, e) {
    return rstr2any(rstr_hmac_sha256(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha256_vm_test() {
    return hex_sha256("abc").toLowerCase() ==
        "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
}

/*
 * Calculate the sha256 of a raw string
 */
function rstr_sha256(s) {
    return binb2rstr(binb_sha256(rstr2binb(s), s.length * 8));
}

/*
 * Calculate the HMAC-sha256 of a key and some data (raw strings)
 */
function rstr_hmac_sha256(key, data) {
    var bkey = rstr2binb(key);
    if (bkey.length > 16) bkey = binb_sha256(bkey, key.length * 8);

    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = binb_sha256(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
    return binb2rstr(binb_sha256(opad.concat(hash), 512 + 256));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
    try {
        hexcase
    } catch (e) {
        hexcase = 0;
    }
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
            + hex_tab.charAt(x & 0x0F);
    }
    return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input) {
    try {
        b64pad
    } catch (e) {
        b64pad = '';
    }
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var len = input.length;
    for (var i = 0; i < len; i += 3) {
        var triplet = (input.charCodeAt(i) << 16)
            | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
            | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > input.length * 8) output += b64pad;
            else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
    }
    return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding) {
    var divisor = encoding.length;
    var remainders = Array();
    var i, q, x, quotient;

    /* Convert to an array of 16-bit big-endian values, forming the dividend */
    var dividend = Array(Math.ceil(input.length / 2));
    for (i = 0; i < dividend.length; i++) {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
    }

    /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. We stop when the dividend is zero.
     * All remainders are stored for later use.
     */
    while (dividend.length > 0) {
        quotient = Array();
        x = 0;
        for (i = 0; i < dividend.length; i++) {
            x = (x << 16) + dividend[i];
            q = Math.floor(x / divisor);
            x -= q * divisor;
            if (quotient.length > 0 || q > 0)
                quotient[quotient.length] = q;
        }
        remainders[remainders.length] = x;
        dividend = quotient;
    }

    /* Convert the remainders to the output string */
    var output = "";
    for (i = remainders.length - 1; i >= 0; i--)
        output += encoding.charAt(remainders[i]);

    /* Append leading zero equivalents */
    var full_length = Math.ceil(input.length * 8 /
        (Math.log(encoding.length) / Math.log(2)))
    for (i = output.length; i < full_length; i++)
        output = encoding[0] + output;

    return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;

    while (++i < input.length) {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++;
        }

        /* Encode output as utf-8 */
        if (x <= 0x7F)
            output += String.fromCharCode(x);
        else if (x <= 0x7FF)
            output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                0x80 | ( x & 0x3F));
        else if (x <= 0xFFFF)
            output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
        else if (x <= 0x1FFFFF)
            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                0x80 | ((x >>> 12) & 0x3F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
    }
    return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
            (input.charCodeAt(i) >>> 8) & 0xFF);
    return output;
}

function str2rstr_utf16be(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
            input.charCodeAt(i) & 0xFF);
    return output;
}

/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binb(input) {
    var output = Array(input.length >> 2);
    for (var i = 0; i < output.length; i++)
        output[i] = 0;
    for (var i = 0; i < input.length * 8; i += 8)
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
    return output;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
    return output;
}

/*
 * Main sha256 function, with its support functions
 */
function sha256_S(X, n) {
    return ( X >>> n ) | (X << (32 - n));
}
function sha256_R(X, n) {
    return ( X >>> n );
}
function sha256_Ch(x, y, z) {
    return ((x & y) ^ ((~x) & z));
}
function sha256_Maj(x, y, z) {
    return ((x & y) ^ (x & z) ^ (y & z));
}
function sha256_Sigma0256(x) {
    return (sha256_S(x, 2) ^ sha256_S(x, 13) ^ sha256_S(x, 22));
}
function sha256_Sigma1256(x) {
    return (sha256_S(x, 6) ^ sha256_S(x, 11) ^ sha256_S(x, 25));
}
function sha256_Gamma0256(x) {
    return (sha256_S(x, 7) ^ sha256_S(x, 18) ^ sha256_R(x, 3));
}
function sha256_Gamma1256(x) {
    return (sha256_S(x, 17) ^ sha256_S(x, 19) ^ sha256_R(x, 10));
}
function sha256_Sigma0512(x) {
    return (sha256_S(x, 28) ^ sha256_S(x, 34) ^ sha256_S(x, 39));
}
function sha256_Sigma1512(x) {
    return (sha256_S(x, 14) ^ sha256_S(x, 18) ^ sha256_S(x, 41));
}
function sha256_Gamma0512(x) {
    return (sha256_S(x, 1) ^ sha256_S(x, 8) ^ sha256_R(x, 7));
}
function sha256_Gamma1512(x) {
    return (sha256_S(x, 19) ^ sha256_S(x, 61) ^ sha256_R(x, 6));
}

var sha256_K = new Array
(
    1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993,
    -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987,
    1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885,
    -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872,
    -1866530822, -1538233109, -1090935817, -965641998
);

function binb_sha256(m, l) {
    var HASH = new Array(1779033703, -1150833019, 1013904242, -1521486534,
        1359893119, -1694144372, 528734635, 1541459225);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h;
    var i, j, T1, T2;

    /* append padding */
    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >> 9) << 4) + 15] = l;

    for (i = 0; i < m.length; i += 16) {
        a = HASH[0];
        b = HASH[1];
        c = HASH[2];
        d = HASH[3];
        e = HASH[4];
        f = HASH[5];
        g = HASH[6];
        h = HASH[7];

        for (j = 0; j < 64; j++) {
            if (j < 16) W[j] = m[j + i];
            else W[j] = safe_add(safe_add(safe_add(sha256_Gamma1256(W[j - 2]), W[j - 7]),
                sha256_Gamma0256(W[j - 15])), W[j - 16]);

            T1 = safe_add(safe_add(safe_add(safe_add(h, sha256_Sigma1256(e)), sha256_Ch(e, f, g)),
                sha256_K[j]), W[j]);
            T2 = safe_add(sha256_Sigma0256(a), sha256_Maj(a, b, c));
            h = g;
            g = f;
            f = e;
            e = safe_add(d, T1);
            d = c;
            c = b;
            b = a;
            a = safe_add(T1, T2);
        }

        HASH[0] = safe_add(a, HASH[0]);
        HASH[1] = safe_add(b, HASH[1]);
        HASH[2] = safe_add(c, HASH[2]);
        HASH[3] = safe_add(d, HASH[3]);
        HASH[4] = safe_add(e, HASH[4]);
        HASH[5] = safe_add(f, HASH[5]);
        HASH[6] = safe_add(g, HASH[6]);
        HASH[7] = safe_add(h, HASH[7]);
    }
    return HASH;
}

function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

window.sha256 = {
    hex: function(val){
        return hex_sha256(val);
    },

    b64: function(val){
        return b64_sha256(val);
    },

    any: function(s, e){
        return any_sha256(s, e);
    },

    hex_hmac: function(k, d){
        return hex_hmac_sha256(k, d);
    },

    b64_hmac: function(k, d){
        return b64_hmac_sha256(k, d);
    },

    any_hmac: function(k, d, e){
        return any_hmac_sha256(k, d, e);
    }
};
// Source: js/utils/sha512.js
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-512, as defined
 * in FIPS 180-2
 * Version 2.2 Copyright Anonymous Contributor, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha512(s) {
    return rstr2hex(rstr_sha512(str2rstr_utf8(s)));
}
function b64_sha512(s) {
    return rstr2b64(rstr_sha512(str2rstr_utf8(s)));
}
function any_sha512(s, e) {
    return rstr2any(rstr_sha512(str2rstr_utf8(s)), e);
}
function hex_hmac_sha512(k, d) {
    return rstr2hex(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function b64_hmac_sha512(k, d) {
    return rstr2b64(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function any_hmac_sha512(k, d, e) {
    return rstr2any(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha512_vm_test() {
    return hex_sha512("abc").toLowerCase() ==
        "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a" +
        "2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f";
}

/*
 * Calculate the SHA-512 of a raw string
 */
function rstr_sha512(s) {
    return binb2rstr(binb_sha512(rstr2binb(s), s.length * 8));
}

/*
 * Calculate the HMAC-SHA-512 of a key and some data (raw strings)
 */
function rstr_hmac_sha512(key, data) {
    var bkey = rstr2binb(key);
    if (bkey.length > 32) bkey = binb_sha512(bkey, key.length * 8);

    var ipad = Array(32), opad = Array(32);
    for (var i = 0; i < 32; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = binb_sha512(ipad.concat(rstr2binb(data)), 1024 + data.length * 8);
    return binb2rstr(binb_sha512(opad.concat(hash), 1024 + 512));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
    try {
        hexcase
    } catch (e) {
        hexcase = 0;
    }
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
            + hex_tab.charAt(x & 0x0F);
    }
    return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input) {
    try {
        b64pad
    } catch (e) {
        b64pad = '';
    }
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var len = input.length;
    for (var i = 0; i < len; i += 3) {
        var triplet = (input.charCodeAt(i) << 16)
            | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
            | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > input.length * 8) output += b64pad;
            else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
    }
    return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding) {
    var divisor = encoding.length;
    var i, j, q, x, quotient;

    /* Convert to an array of 16-bit big-endian values, forming the dividend */
    var dividend = Array(Math.ceil(input.length / 2));
    for (i = 0; i < dividend.length; i++) {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
    }

    /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. All remainders are stored for later
     * use.
     */
    var full_length = Math.ceil(input.length * 8 /
        (Math.log(encoding.length) / Math.log(2)));
    var remainders = Array(full_length);
    for (j = 0; j < full_length; j++) {
        quotient = Array();
        x = 0;
        for (i = 0; i < dividend.length; i++) {
            x = (x << 16) + dividend[i];
            q = Math.floor(x / divisor);
            x -= q * divisor;
            if (quotient.length > 0 || q > 0)
                quotient[quotient.length] = q;
        }
        remainders[j] = x;
        dividend = quotient;
    }

    /* Convert the remainders to the output string */
    var output = "";
    for (i = remainders.length - 1; i >= 0; i--)
        output += encoding.charAt(remainders[i]);

    return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;

    while (++i < input.length) {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++;
        }

        /* Encode output as utf-8 */
        if (x <= 0x7F)
            output += String.fromCharCode(x);
        else if (x <= 0x7FF)
            output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                0x80 | ( x & 0x3F));
        else if (x <= 0xFFFF)
            output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
        else if (x <= 0x1FFFFF)
            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                0x80 | ((x >>> 12) & 0x3F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
    }
    return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
            (input.charCodeAt(i) >>> 8) & 0xFF);
    return output;
}

function str2rstr_utf16be(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
            input.charCodeAt(i) & 0xFF);
    return output;
}

/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binb(input) {
    var output = Array(input.length >> 2);
    for (var i = 0; i < output.length; i++)
        output[i] = 0;
    for (var i = 0; i < input.length * 8; i += 8)
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
    return output;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
    return output;
}

/*
 * Calculate the SHA-512 of an array of big-endian dwords, and a bit length
 */
var sha512_k;
function binb_sha512(x, len) {
    if (sha512_k == undefined) {
        //SHA512 constants
        sha512_k = new Array(
            new int64(0x428a2f98, -685199838), new int64(0x71374491, 0x23ef65cd),
            new int64(-1245643825, -330482897), new int64(-373957723, -2121671748),
            new int64(0x3956c25b, -213338824), new int64(0x59f111f1, -1241133031),
            new int64(-1841331548, -1357295717), new int64(-1424204075, -630357736),
            new int64(-670586216, -1560083902), new int64(0x12835b01, 0x45706fbe),
            new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, -704662302),
            new int64(0x72be5d74, -226784913), new int64(-2132889090, 0x3b1696b1),
            new int64(-1680079193, 0x25c71235), new int64(-1046744716, -815192428),
            new int64(-459576895, -1628353838), new int64(-272742522, 0x384f25e3),
            new int64(0xfc19dc6, -1953704523), new int64(0x240ca1cc, 0x77ac9c65),
            new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483),
            new int64(0x5cb0a9dc, -1119749164), new int64(0x76f988da, -2096016459),
            new int64(-1740746414, -295247957), new int64(-1473132947, 0x2db43210),
            new int64(-1341970488, -1728372417), new int64(-1084653625, -1091629340),
            new int64(-958395405, 0x3da88fc2), new int64(-710438585, -1828018395),
            new int64(0x6ca6351, -536640913), new int64(0x14292967, 0xa0e6e70),
            new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926),
            new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, -1651133473),
            new int64(0x650a7354, -1951439906), new int64(0x766a0abb, 0x3c77b2a8),
            new int64(-2117940946, 0x47edaee6), new int64(-1838011259, 0x1482353b),
            new int64(-1564481375, 0x4cf10364), new int64(-1474664885, -1136513023),
            new int64(-1035236496, -789014639), new int64(-949202525, 0x654be30),
            new int64(-778901479, -688958952), new int64(-694614492, 0x5565a910),
            new int64(-200395387, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8),
            new int64(0x19a4c116, -1194143544), new int64(0x1e376c08, 0x5141ab53),
            new int64(0x2748774c, -544281703), new int64(0x34b0bcb5, -509917016),
            new int64(0x391c0cb3, -976659869), new int64(0x4ed8aa4a, -482243893),
            new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, -692930397),
            new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60),
            new int64(-2067236844, -1578062990), new int64(-1933114872, 0x1a6439ec),
            new int64(-1866530822, 0x23631e28), new int64(-1538233109, -561857047),
            new int64(-1090935817, -1295615723), new int64(-965641998, -479046869),
            new int64(-903397682, -366583396), new int64(-779700025, 0x21c0c207),
            new int64(-354779690, -840897762), new int64(-176337025, -294727304),
            new int64(0x6f067aa, 0x72176fba), new int64(0xa637dc5, -1563912026),
            new int64(0x113f9804, -1090974290), new int64(0x1b710b35, 0x131c471b),
            new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493),
            new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, -1676669620),
            new int64(0x4cc5d4be, -885112138), new int64(0x597f299c, -60457430),
            new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817));
    }

    //Initial hash values
    var H = new Array(
        new int64(0x6a09e667, -205731576),
        new int64(-1150833019, -2067093701),
        new int64(0x3c6ef372, -23791573),
        new int64(-1521486534, 0x5f1d36f1),
        new int64(0x510e527f, -1377402159),
        new int64(-1694144372, 0x2b3e6c1f),
        new int64(0x1f83d9ab, -79577749),
        new int64(0x5be0cd19, 0x137e2179));

    var T1 = new int64(0, 0),
        T2 = new int64(0, 0),
        a = new int64(0, 0),
        b = new int64(0, 0),
        c = new int64(0, 0),
        d = new int64(0, 0),
        e = new int64(0, 0),
        f = new int64(0, 0),
        g = new int64(0, 0),
        h = new int64(0, 0),
        //Temporary variables not specified by the document
        s0 = new int64(0, 0),
        s1 = new int64(0, 0),
        Ch = new int64(0, 0),
        Maj = new int64(0, 0),
        r1 = new int64(0, 0),
        r2 = new int64(0, 0),
        r3 = new int64(0, 0);
    var j, i;
    var W = new Array(80);
    for (i = 0; i < 80; i++)
        W[i] = new int64(0, 0);

    // append padding to the source string. The format is described in the FIPS.
    x[len >> 5] |= 0x80 << (24 - (len & 0x1f));
    x[((len + 128 >> 10) << 5) + 31] = len;

    for (i = 0; i < x.length; i += 32) //32 dwords is the block size
    {
        int64copy(a, H[0]);
        int64copy(b, H[1]);
        int64copy(c, H[2]);
        int64copy(d, H[3]);
        int64copy(e, H[4]);
        int64copy(f, H[5]);
        int64copy(g, H[6]);
        int64copy(h, H[7]);

        for (j = 0; j < 16; j++) {
            W[j].h = x[i + 2 * j];
            W[j].l = x[i + 2 * j + 1];
        }

        for (j = 16; j < 80; j++) {
            //sigma1
            int64rrot(r1, W[j - 2], 19);
            int64revrrot(r2, W[j - 2], 29);
            int64shr(r3, W[j - 2], 6);
            s1.l = r1.l ^ r2.l ^ r3.l;
            s1.h = r1.h ^ r2.h ^ r3.h;
            //sigma0
            int64rrot(r1, W[j - 15], 1);
            int64rrot(r2, W[j - 15], 8);
            int64shr(r3, W[j - 15], 7);
            s0.l = r1.l ^ r2.l ^ r3.l;
            s0.h = r1.h ^ r2.h ^ r3.h;

            int64add4(W[j], s1, W[j - 7], s0, W[j - 16]);
        }

        for (j = 0; j < 80; j++) {
            //Ch
            Ch.l = (e.l & f.l) ^ (~e.l & g.l);
            Ch.h = (e.h & f.h) ^ (~e.h & g.h);

            //Sigma1
            int64rrot(r1, e, 14);
            int64rrot(r2, e, 18);
            int64revrrot(r3, e, 9);
            s1.l = r1.l ^ r2.l ^ r3.l;
            s1.h = r1.h ^ r2.h ^ r3.h;

            //Sigma0
            int64rrot(r1, a, 28);
            int64revrrot(r2, a, 2);
            int64revrrot(r3, a, 7);
            s0.l = r1.l ^ r2.l ^ r3.l;
            s0.h = r1.h ^ r2.h ^ r3.h;

            //Maj
            Maj.l = (a.l & b.l) ^ (a.l & c.l) ^ (b.l & c.l);
            Maj.h = (a.h & b.h) ^ (a.h & c.h) ^ (b.h & c.h);

            int64add5(T1, h, s1, Ch, sha512_k[j], W[j]);
            int64add(T2, s0, Maj);

            int64copy(h, g);
            int64copy(g, f);
            int64copy(f, e);
            int64add(e, d, T1);
            int64copy(d, c);
            int64copy(c, b);
            int64copy(b, a);
            int64add(a, T1, T2);
        }
        int64add(H[0], H[0], a);
        int64add(H[1], H[1], b);
        int64add(H[2], H[2], c);
        int64add(H[3], H[3], d);
        int64add(H[4], H[4], e);
        int64add(H[5], H[5], f);
        int64add(H[6], H[6], g);
        int64add(H[7], H[7], h);
    }

    //represent the hash as an array of 32-bit dwords
    var hash = new Array(16);
    for (i = 0; i < 8; i++) {
        hash[2 * i] = H[i].h;
        hash[2 * i + 1] = H[i].l;
    }
    return hash;
}

//A constructor for 64-bit numbers
function int64(h, l) {
    this.h = h;
    this.l = l;
    //this.toString = int64toString;
}

//Copies src into dst, assuming both are 64-bit numbers
function int64copy(dst, src) {
    dst.h = src.h;
    dst.l = src.l;
}

//Right-rotates a 64-bit number by shift
//Won't handle cases of shift>=32
//The function revrrot() is for that
function int64rrot(dst, x, shift) {
    dst.l = (x.l >>> shift) | (x.h << (32 - shift));
    dst.h = (x.h >>> shift) | (x.l << (32 - shift));
}

//Reverses the dwords of the source and then rotates right by shift.
//This is equivalent to rotation by 32+shift
function int64revrrot(dst, x, shift) {
    dst.l = (x.h >>> shift) | (x.l << (32 - shift));
    dst.h = (x.l >>> shift) | (x.h << (32 - shift));
}

//Bitwise-shifts right a 64-bit number by shift
//Won't handle shift>=32, but it's never needed in SHA512
function int64shr(dst, x, shift) {
    dst.l = (x.l >>> shift) | (x.h << (32 - shift));
    dst.h = (x.h >>> shift);
}

//Adds two 64-bit numbers
//Like the original implementation, does not rely on 32-bit operations
function int64add(dst, x, y) {
    var w0 = (x.l & 0xffff) + (y.l & 0xffff);
    var w1 = (x.l >>> 16) + (y.l >>> 16) + (w0 >>> 16);
    var w2 = (x.h & 0xffff) + (y.h & 0xffff) + (w1 >>> 16);
    var w3 = (x.h >>> 16) + (y.h >>> 16) + (w2 >>> 16);
    dst.l = (w0 & 0xffff) | (w1 << 16);
    dst.h = (w2 & 0xffff) | (w3 << 16);
}

//Same, except with 4 addends. Works faster than adding them one by one.
function int64add4(dst, a, b, c, d) {
    var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff);
    var w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (w0 >>> 16);
    var w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (w1 >>> 16);
    var w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (w2 >>> 16);
    dst.l = (w0 & 0xffff) | (w1 << 16);
    dst.h = (w2 & 0xffff) | (w3 << 16);
}

//Same, except with 5 addends
function int64add5(dst, a, b, c, d, e) {
    var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff) + (e.l & 0xffff);
    var w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (e.l >>> 16) + (w0 >>> 16);
    var w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (e.h & 0xffff) + (w1 >>> 16);
    var w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (e.h >>> 16) + (w2 >>> 16);
    dst.l = (w0 & 0xffff) | (w1 << 16);
    dst.h = (w2 & 0xffff) | (w3 << 16);
}

window.sha512 = {
    hex: function(val){
        return hex_sha512(val);
    },

    b64: function(val){
        return b64_sha512(val);
    },

    any: function(s, e){
        return any_sha512(s, e);
    },

    hex_hmac: function(k, d){
        return hex_hmac_sha512(k, d);
    },

    b64_hmac: function(k, d){
        return b64_hmac_sha512(k, d);
    },

    any_hmac: function(k, d, e){
        return any_hmac_sha512(k, d, e);
    }
};
// Source: js/utils/storage.js
var storage = {
    key: "MyAppKey",

    setKey: function(key){
        this.key = key;
    },

    setItem: function(key, value){
        window.localStorage.setItem(storage.key + ":" + key, JSON.stringify(value));
    },

    getItem: function(key, default_value, reviver){
        var result,
            value = window.localStorage.getItem(storage.key + ":" + key) || (default_value || null);
        try {
            result = JSON.parse(value, reviver);
        } catch (e) {
            result = null;
        }
        return result;
    },

    getItemPart: function(key, sub_key, default_value, reviver){
        var val = this.getItem(key, default_value, reviver);
        return val !== null && typeof val === 'object' && val[sub_key] !== undefined ? val[sub_key] : null;
    },

    delItem: function(key){
        window.localStorage.removeItem(storage.key + ":" + key)
    }
};

window.coreStorage = storage;
// Source: js/utils/tpl.js
var TemplateEngine = function(html, options) {
    var re = /<%(.+?)%>/g,
        reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
        code = 'with(obj) { var r=[];\n',
        cursor = 0,
        result,
        match;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    };
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
    try { result = new Function('obj', code).apply(options, [options]); }
    catch(err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
    return result;
};

window.coreTemplate = TemplateEngine;

$.Template = TemplateEngine;
// Source: js/utils/utilities.js
var Utils = {
    isUrl: function (val) {
var regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(val);
    },

    isColor: function (val) {
return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
    },

    secondsToTime: function(secs) {
        var hours = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        return {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
    },

    hex2rgba: function(hex, alpha){
        var c;
        alpha = isNaN(alpha) ? 1 : alpha;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
        }
        throw new Error('Hex2rgba error. Bad Hex value');
    },

    random: function(from, to){
        return Math.floor(Math.random()*(to-from+1)+from);
    },

    isInt: function(n){
        return Number(n) === n && n % 1 === 0;
    },

    isFloat: function(n){
        return Number(n) === n && n % 1 !== 0;
    },

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

    callback: function(cb, args){
        if (cb != undefined) {
            if (typeof cb === 'function') {
                cb(args);
            } else {
                if (typeof window[cb] === 'function') {
                    window[cb](args);
                } else {
                    var result = eval("(function(){"+cb+"})");
                    var _arguments = [];
                    if (args instanceof Array) {
                        _arguments = args;
                    } else {
                        _arguments.push(args);
                    }
                    result.apply(null, _arguments);
                }
            }
        }
    },

    exec: function(f, args){
        if (f != undefined) {
            if (typeof f === 'function') {
                return f(args);
            } else {
                if (typeof window[f] === 'function') {
                    return window[f](args);
                } else {
                    var result = eval("(function(){"+f+"})");
                    var _arguments = [];
                    if (args instanceof Array) {
                        _arguments = args;
                    } else {
                        _arguments.push(args);
                    }
                    return result.apply(null, _arguments);
                }
            }
        }
    },

    isFunc: function(f){
        if (f !== undefined) {
            if (typeof f === 'function') {
                return true;
            } else return typeof window[f] === 'function';
        } else {
            return false;
        }
    },

    isCoreObject: function(el, type){
        var $el = $(el), el_obj = $el.data(type);

        if ($el.length == 0) {
            console.log(type + ' ' + el + ' not found!');
            return false;
        }

        if (el_obj == undefined) {
            console.log('Element not contain role '+ type +'! Please add attribute data-role="'+type+'" to element ' + el);
            return false;
        }

        return true;
    },

    addLocale: function(data){
        $.extend(locales, data);
    },

    getLocaleNames: function(){
        var result = [];
        $.each(locales, function(i, v){
            result.push(i);
        });

        return result;
    }

};

window.coreUtils = Utils;
// Source: js/utils/widget_factory.js
$.ui = $.ui || {};

var version = $.ui.version = "1.12.1";

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

            // If this is an empty collection, we need to have the instance method
            // return undefined instead of the jQuery instance
            if ( !this.length && options === "instance" ) {
                returnValue = undefined;
            } else {
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
            }
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

        this._on( options.element, {
            "remove": "_untrackClassesElement"
        } );

        if ( options.keys ) {
            processClassString( options.keys.match( /\S+/g ) || [], true );
        }
        if ( options.extra ) {
            processClassString( options.extra.match( /\S+/g ) || [] );
        }

        return full.join( " " );
    },

    _untrackClassesElement: function( event ) {
        var that = this;
        $.each( that.classesElementLookup, function( key, value ) {
            if ( $.inArray( event.target, value ) !== -1 ) {
                that.classesElementLookup[ key ] = $( value.not( event.target ).get() );
            }
        } );
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
// Source: js/widgets/accordion.js
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

// Source: js/widgets/bottomsheet.js
$.widget("corecss.bottomsheet", {

    version: "1.0.0",

    options: {
        mode: "list",
        overlay: false,
        duration: CORE_ANIMATION_DURATION
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

    toggle: function(mode){
        return this.toggleState(mode);
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

var coreBottomSheet = {
    toggle: function(target, mode){
        $(target).data("bottomsheet").toggleState(mode);
    },
    open: function(target, mode){
        $(target).data("bottomsheet").open(mode);
    },
    close: function(target){
        $(target).data("bottomsheet").close();
    }
};

window.toggleBottomSheet = function(target, mode){
    $(target).data("bottomsheet").toggleState(mode);
};

window.openBottomSheet = function(target, mode){
    $(target).data("bottomsheet").open(mode);
};

window.closeBottomSheet = function(target){
    $(target).data("bottomsheet").close();
};

$.bottomSheet = window.coreBottomSheet = coreBottomSheet;
// Source: js/widgets/datepicker.js


$.widget( "corecss.datepicker" , {

    version: "1.0.0",

    options: {
        //weekStart: CORE_CALENDAR_WEEK_START,
        mode: "default", // default, range, multi
        //startFrom: "day", // day, month, year
        //format: "dd-mm-yyyy",
        locale: CORE_LOCALE,
        toolbar: true,
        footer: true,
        preset: [],
        current: null,
        buttons: ['cancel', 'today', 'clear', 'done'],
        isDialog: false,

        onCreate: $.noop,
        onDone: $.noop,
        onCancel: $.noop,
        onToday: $.noop,
        onClear: $.noop,
        onDay: $.noop
    },

    current: new Date(),
    today: new Date(),
    selected: [],

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        if (typeof o.preset !== 'object') {
            o.preset = o.preset.split(",").map(function(v){
                return v.trim();
            });
        }

        this.selected = o.preset.map(function(v){
            var d = new Date(v);
            d.setHours(0,0,0,0);
            return d.getTime();
        });

        if (o.current != null && typeof o.current == 'string') {
            this.current = new Date(o.current);
        }

        this._createCalendar();
        this._createEvents();

        element.data('datepicker', this);

        Utils.callback(o.onCreate, element);
    },

    _drawHeader: function(){
        var o = this.options, target = this.today,
            day = target.getDate(),
            dayWeek = target.getDay(),
            month = target.getMonth(),
            year = target.getFullYear(),
            html = "", header;

        html += "<div class='year'>"+year+"</div>";
        html += "<div class='day'>"+coreLocales[o.locale].calendar.days[dayWeek]+", "+coreLocales[o.locale].calendar.months[month + 12]+' '+day+"</div>";

        header = $(html);

        return header;
    },

    _drawToolbar: function(){
        var o = this.options,
            month = this.current.getMonth(),
            year = this.current.getFullYear(),
            toolbar = $("<div>").addClass("toolbar");

        $("<span>").addClass("prev_month js-control").appendTo(toolbar);
        $("<span>").addClass("current_month").html(coreLocales[o.locale].calendar.months[month]).appendTo(toolbar);
        $("<span>").addClass("next_month js-control").appendTo(toolbar);
        $("<span>").addClass("prev_year js-control").appendTo(toolbar);
        $("<span>").addClass("current_year").html(year).appendTo(toolbar);
        $("<span>").addClass("next_year js-control").appendTo(toolbar);

        if (o.toolbar !== true) {
            toolbar.hide();
        }

        return toolbar;
    },

    _drawFooter: function(){
        var element = this.element, o = this.options,
            footer = element.find(".calendar-footer"),
            html = "";

        $.each(o.buttons, function(){
            html += "<button class='flat-button js-button-"+this+" "+(o.isDialog && (this == 'cancel' || this == 'done') ? 'js-dialog-close' : '')+"'>"+coreLocales[o.locale].buttons[this]+"</button>";
        });

        if (o.footer !== true) {
            footer.hide();
        }

        return $(html);
    },

    _drawDays: function(distance){

        function getDay(date){
            var day = date.getDay();
            if (day == 0) day = 7;
            return day - 1;
        }

        distance = distance || 0;
        var o = this.options,
            day = this.current.getDate(),
            month = this.current.getMonth() + distance,
            year = this.current.getFullYear(),
            firstDay = new Date(year, month, 1),
            i, j, md, dd, total = 0, days, stored_day,
            p_month_days,
            days_inner = $("<div>").addClass("days-frame");


        if (month < 0) {
            month = 11;
            year--;
        }

        if (month > 11) {
            month = 0;
            year++;
        }

        /* Draw days of week*/
        var weekDays = $("<div>").addClass("week-days").appendTo(days_inner);
        for (i = 0; i < 7; i++) {
            if (o.weekStart === 0) {
                j = i;
            } else {
                j = i + 1;
                if (j === 7) { j = 0; }
            }
            $("<div/>").addClass("day").html(coreLocales[o.locale].calendar.days[j + 7]).appendTo(weekDays);
        }
        /* End of days of week */

        days = $("<div>").addClass("days");

        p_month_days = (new Date(year, month, 0)).getDate();

        md = $("<div>").addClass("month-days").appendTo(days);

        /* Draw prev month days */
        for(i = 0; i < getDay(firstDay); i++) {
            stored_day = new Date(year, month - 1, p_month_days - getDay(firstDay) + 1 + i);
            dd = $("<div>").addClass("day fg-gray-400 prev-month-day").html(p_month_days - getDay(firstDay) + 1 + i).appendTo(md);
            dd.data('day', stored_day);
            if (this.selected.indexOf(stored_day.getTime()) > -1) {
                dd.addClass("selected");
            }
            total++;
        }

        /* Draw current month days */
        while(firstDay.getMonth() == month) {
            stored_day = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate());
            dd = $("<div>").addClass("day").html(firstDay.getDate()).appendTo(md);
            dd.data('day', stored_day);
            if (
                this.today.getFullYear() == firstDay.getFullYear() &&
                this.today.getMonth() == firstDay.getMonth() &&
                this.today.getDate() == firstDay.getDate()
            ) {
                dd.addClass("today");
            }

            if (this.selected.indexOf(stored_day.getTime()) > -1) {
                dd.addClass("selected");
            }

            total++;

            if (getDay(firstDay) % 7 == 6) {
                md = $("<div>").addClass("month-days").appendTo(days);
            }
            firstDay.setDate(firstDay.getDate() + 1);
        }

        /* Draw next month days */
        while(total < 42) {
            stored_day = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate());
            dd = $("<div>").addClass("day fg-gray-400 next-month-day").html(firstDay.getDate()).appendTo(md);
            dd.data('day', stored_day);
            if (this.selected.indexOf(stored_day.getTime()) > -1) {
                dd.addClass("selected");
            }
            if (getDay(firstDay) % 7 == 6) {
                md = $("<div>").addClass("month-days").appendTo(days);
            }
            firstDay.setDate(firstDay.getDate() + 1);
            total++;
        }

        days.appendTo(days_inner);

        return days_inner;
    },

    _drawCalendar: function(){
        var h, c, f, d, element = this.element;

        element.html("");

        h = $("<div>").addClass("calendar-header").appendTo(element);
        c = $("<div>").addClass("calendar-content").appendTo(element);
        f = $("<div>").addClass("calendar-footer").appendTo(element);
        d = $("<div>").addClass("days-inner");

        h.append(this._drawHeader());
        c.append(this._drawToolbar());

        c.append(d);
        d.append(this._drawDays());

        f.append(this._drawFooter());
    },

    _createCalendar: function(){
        var that = this, element = this.element, o = this.options;

            if (!element.hasClass("calendar")) {
            element.addClass("calendar");
        }

        this._drawCalendar();

        element.ripple({
            rippleTarget: '.flat-button, .day, .js-control',
            rippleColor: '#ccc'
        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on("click", ".js-control", function(){

            var el = $(this), m, y;
            var day = that.current.getDate(),
                month = that.current.getMonth(),
                year = that.current.getFullYear();

            if (el.hasClass("prev_month")) {
                month -= 1;
                if (month < 0) {
                    year -= 1;
                    month = 11;
                }
                that.current = new Date(year, month);
            }
            if (el.hasClass("next_month")) {
                month += 1;
                if (month == 12) {
                    year += 1;
                    month = 0;
                }
                that.current = new Date(year, month);
            }
            if (el.hasClass("next_year")) {
                that.current = new Date(year + 1, month);
            }
            if (el.hasClass("prev_year")) {
                that.current = new Date(year - 1, month);
            }

            setTimeout(function(){
                that._drawCalendar();
            }, 300);

        });

        element.on("click", ".js-button-today", function(){
            that.current = that.today = new Date();
            that.today.setHours(0,0,0,0);
            that.selected[0] = that.today.getTime();
            setTimeout(function(){
                that._drawCalendar();
                Utils.callback(o.onToday, element);
            }, 300);
        });

        element.on("click", ".js-button-clear", function(){
            that.current = that.today = new Date();
            that.selected = [];
            setTimeout(function(){
                that._drawCalendar();
                Utils.callback(o.onClear, element);
            }, 300);
        });

        element.on("click", ".js-button-done", function(){
            setTimeout(function(){
                var result;

                switch(o.mode) {
                    case 'range':
                    case 'multi': result = that.selected; break;
                    default: result = that.selected[0];
                }

                if (result !== undefined) {
                    if (Array.isArray(result)) {
                        result = result.map(function(v){
                            return new Date(v);
                        });
                    } else {
                        result = new Date(result);
                    }
                }
                 else {
                    result = new Date();
                }

                Utils.callback(o.onDone, result);
            }, 300);
        });

        element.on("click", ".month-days .day", function(){
            var el = $(this), day = el.data('day'), index = that.selected.indexOf(day.getTime());

            if (o.mode == 'default') {

                element.find(".selected").removeClass("selected");
                that.selected = [];
                that.current = that.today = day;
                element.find(".calendar-header").html("").append(that._drawHeader());

                if (el.hasClass("prev-month-day") || el.hasClass("next-month-day")) {
                    that._drawCalendar();
                    $.each(element.find(".month-days .day"), function () {
                        var day2 = $(this).data('day');
                        if (day.getTime() == day2.getTime()) {
                            that.selected[0] = $(this).data('day').getTime();
                            $(this).addClass("selected");
                        }
                    });
                } else {
                    that.selected[0] = day.getTime();
                    el.addClass("selected");
                }

            }

            if (o.mode == 'multi') {

                if (el.hasClass("prev-month-day") || el.hasClass("next-month-day")) {
                    that.current = el.data('day');
                    that._drawCalendar();
                    $.each(element.find(".month-days .day"), function () {
                        var day2 = $(this).data('day');
                        if (day.getTime() == day2.getTime()) {
                            if (index == -1) {
                                that.selected.push(day.getTime());
                            } else {
                                delete that.selected[index];
                            }

                            $(this).toggleClass("selected");
                        }
                    });
                } else {
                    if (index == -1) {
                        that.selected.push(day.getTime());
                    } else {
                        delete that.selected[index];
                    }
                    el.toggleClass("selected");
                }

            }

            Utils.callback(o.onDay, day);
        });
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

// Source: js/widgets/dateselect.js
$.widget( "corecss.dateselect" , {

    version: "1.0.0",

    options: {
        locale: CORE_LOCALE,
        minYear: 1900,
        maxYear: new Date().getFullYear(),
        day: (new Date()).getDate(),
        month: (new Date()).getMonth(),
        year: (new Date()).getFullYear(),
        isDialog: false,
        buttons: ['cancel', 'random', 'today', 'done'],
        onDone: $.noop
    },

    current: new Date(),

    day: null,
    month: null,
    year: null,

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        this.day = o.day;
        this.month = o.month;
        this.year = o.year;

        this._createPicker();
        this._createScrollEvents();
        this._createButtonsEvents();

        setTimeout(function(){
            that.today();
        }, 100);

        element.data('dateselect', this);
    },

    _correct: function(){
        function isDate(y,m,d){
            var date = new Date(y,m,d);
            var convertedDate =
                ""+date.getFullYear() + (date.getMonth()) + date.getDate();
            var givenDate = "" + y + m + d;
            return ( givenDate == convertedDate);
        }

        if (!isDate(this.year, this.month, this.day)) {
            var date = new Date(this.year, this.month, this.day);
            // date.setHours(0,0,0,0);
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.day = date.getDate();
            this._removeScrollEvents();
            this.setPosition();
            this._createScrollEvents();
            //
            // console.log("bad date! correct it.");
            // console.log("new date is: " + date);
        }
    },

    setPosition: function(){
        var element = this.element;
        var day = this.day,
            month = this.month + 1,
            year = this.year;
        var d_list = element.find(".d-list"),
            m_list = element.find(".m-list"),
            y_list = element.find(".y-list");

        this._removeScrollEvents();

        // console.log(element.find(".js-dd-"+day).offset());
        // console.log(element.find(".js-dm-"+month));
        // console.log(element.find(".js-yy-"+year));
        //
        d_list.scrollTop(0).animate({
           scrollTop: element.find(".js-dd-"+day).addClass("active").position().top - 48
        });

        m_list.scrollTop(0).animate({
            scrollTop: element.find(".js-dm-"+month).addClass("active").position().top - 48
        });

        y_list.scrollTop(0).animate({
            scrollTop: element.find(".js-yy-"+year).addClass("active").position().top - 48
        });

        this._createScrollEvents();
    },

    today: function(){
        var d = new Date(); d.setHours(0,0,0,0);

        this.day = d.getDate();
        this.month = d.getMonth();
        this.year = d.getFullYear();

        this.setPosition();
    },

    _drawHeader: function(){
        var element = this.element,
            day = this.day,
            dd = new Date(this.year, this.month, this.day),
            dayWeek = dd.getDay(),
            month = this.month,
            year = this.year,
            html = "", header,
            o = this.options;

        html += "<span class='day'>"+coreLocales[o.locale].calendar.days[dayWeek + 14]+", "+coreLocales[o.locale].calendar.months[month + 12]+' '+day+", "+year+"</span>";

        header = $(html);

        return header;
    },

    _drawFooter: function(){
        var element = this.element, o = this.options,
            html = "";

        $.each(o.buttons, function(){
            html += "<button class='flat-button js-button-"+this+" "+(o.isDialog && (this == 'cancel' || this == 'done') ? 'js-dialog-close' : '')+"'>"+coreLocales[o.locale].buttons[this]+"</button>";
        });

        // html += "<button class='flat-button js-button-rand'>"+coreLocales[o.locale].buttons.rand+"</button>";
        // html += "<button class='flat-button js-button-today'>"+coreLocales[o.locale].buttons.today+"</button>";
        // html += "<button class='flat-button js-button-done'>"+coreLocales[o.locale].buttons.done+"</button>";

        return $(html);
    },

    _drawPicker: function(){
        var element = this.element, o = this.options;
        var picker_inner = $("<div>").addClass("picker-content-inner");
        var d_list, m_list, y_list;
        var i;

        d_list = $("<ul>").addClass("d-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(d_list);
        for(i = 1; i <= 31; i++) {
            $("<li>").html(i).appendTo(d_list).data('value', i).addClass("js-dd-"+i);
        }
        $("<li>").html("&nbsp;").appendTo(d_list);

        m_list = $("<ul>").addClass("m-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(m_list);
        for(i = 1; i <= 12; i++) {
            $("<li>").html(coreLocales[o.locale].calendar.months[i-1 + 12]).appendTo(m_list).data('value', i - 1).addClass("js-dm-"+i);
        }
        $("<li>").html("&nbsp;").appendTo(m_list);

        y_list = $("<ul>").addClass("y-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(y_list);
        var j = 1;
        for(i = o.minYear; i <= o.maxYear; i++) {
            $("<li>").html(i).appendTo(y_list).data('value', i).addClass("js-dy-"+j+" js-yy-"+i);
            j++;
        }
        $("<li>").html("&nbsp;").appendTo(y_list);

        return picker_inner;
    },

    _createPicker: function(){
        var h, c, f, element = this.element;

        if (!element.hasClass("wheelpicker")) element.addClass("wheelpicker");

        element.html("");

        h = $("<div>").addClass("picker-header").appendTo(element);
        c = $("<div>").addClass("picker-content").appendTo(element);
        f = $("<div>").addClass("picker-footer").appendTo(element);

        h.append(this._drawHeader());
        c.append(this._drawPicker());
        f.append(this._drawFooter());
    },

    _removeScrollEvents: function(){
        var element = this.element;
        element.find(".d-list").off('scrollstart');
        element.find(".d-list").off('scrollstop');
        element.find(".m-list").off('scrollstart');
        element.find(".m-list").off('scrollstop');
        element.find(".y-list").off('scrollstart');
        element.find(".y-list").off('scrollstop');
    },

    _createScrollEvents: function(){
        var that = this, element = this.element, o = this.options;
        var d_list = element.find(".d-list"),
            m_list = element.find(".m-list"),
            y_list = element.find(".y-list");

        d_list.on('scrollstart', function(){
            d_list.find(".active").removeClass("active");
        });
        d_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(d_list.scrollTop() + 48) / 48));
            var target_element = d_list.find(".js-dd-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 48 + d_list[0].scrollTop;

            d_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
                that.day = val;
                element.find(".picker-header").html(that._drawHeader());
                that._correct();
            });
        });

        m_list.on('scrollstart', function(){
            m_list.find(".active").removeClass("active");
        });
        m_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(m_list.scrollTop() + 48) / 48));
            var target_element = m_list.find(".js-dm-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 48 + m_list[0].scrollTop;

            m_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
                that.month = val;
                element.find(".picker-header").html(that._drawHeader());
                that._correct();
            });
        });

        y_list.on('scrollstart', function(){
            y_list.find(".active").removeClass("active");
        });
        y_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(y_list.scrollTop() + 48) / 48));
            var target_element = y_list.find(".js-dy-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 48 + y_list[0].scrollTop;

            y_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
                that.year = val;
                element.find(".picker-header").html(that._drawHeader());
                that._correct();
            });
        });
    },

    _createButtonsEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.find(".js-button-random").on("click", function(){
            function randomInteger(min, max) {
                var rand = min - 0.5 + Math.random() * (max - min + 1);
                rand = Math.round(rand);
                return rand;
            }

            that.day = randomInteger(1, 31);
            that.month = randomInteger(0, 11);
            that.year = randomInteger(o.minYear, o.maxYear);

            that.setPosition();
        });

        element.find(".js-button-done").on("click", function(){
            var result = new Date(that.year, that.month, that.day);
            Utils.callback(o.onDone, result);
        });

        element.find(".js-button-today").on("click", function(){
            var d = new Date(); d.setHours(0,0,0,0);

            that.day = d.getDate();
            that.month = d.getMonth();
            that.year = d.getFullYear();

            that.setPosition();
        });
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
        this._removeScrollEvents();
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    }
});

// Source: js/widgets/dialog.js
$.widget( "corecss.dialog" , {

    version: "1.0.0",

    options: {
        //modal: true,
        overlay: true,
        overlayColor: 'default',
        //overlayClickClose: false,
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

    isOpened: function(){
        return this.element.data('opened') === true;
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

        Utils.callback(o.onDialogOpen, element);

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

        Utils.callback(o.onDialogClose, element);

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

    isDialog: function(el){
        return Utils.isCoreObject(el, 'dialog');
    },

    open: function (el, content, contentType){
        var dialog = $(el), dialog_obj = dialog.data('dialog');

        if (!this.isDialog(el)) {
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
        var dialog = $(el), dialog_obj = dialog.data('dialog');

        if (!this.isDialog(el)) {
            return false;
        }

        dialog_obj.close();
    },

    toggle: function(el, content, contentType){
        var dialog = $(el), dialog_obj = dialog.data('dialog');

        if (!this.isDialog(el)) {
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

    isOpened: function(el){
        var dialog = $(el), dialog_obj = dialog.data('dialog');

        if (!this.isDialog(el)) {
            return false;
        }

        return dialog_obj.element.data('opened') === true;
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

                    Utils.callback(item.onclick, dlg);

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
// Source: js/widgets/donut.js
$.widget( "corecss.donut" , {

    version: "1.0.0",

    options: {
        size: 100,
        radius: 50,
        value: 0,
        background: "#ffffff",
        stroke: "#d1d8e7",
        fill: "#49649f",
        color: "#49649f",
        fontSize: 'auto',
        hole: .8,
        total: 100,
        cap: "%",
        animate: 0,
        showTitle: true
    },

    animation_change_interval: undefined,

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        this._createDonut();

        element.data('donut', this);
    },

    _createDonut: function(){
        var that = this, element = this.element, o = this.options;
        var html = "";
        var r = o.radius  * (1 - (1 - o.hole) / 2);
        var width = o.radius * (1 - o.hole);
        var circumference = 2 * Math.PI * r;
        var strokeDasharray = ((o.value * circumference) / o.total) + ' ' + circumference;
        var transform = 'rotate(-90 ' + o.radius + ',' + o.radius + ')';
        var fontSize = o.fontSize === 'auto' ? r * o.hole * 0.6 : o.fontSize;

        if (!element.hasClass("donut")) element.addClass("donut");

        element.css({
            width: o.size,
            height: o.size,
            background: o.background
        });

        html += "<svg>";
        html += "   <circle class='donut-back' r='"+(r)+"px' cx='"+(o.radius)+"px' cy='"+(o.radius)+"px' transform='"+(transform)+"' fill='none' stroke='"+(o.stroke)+"' stroke-width='"+(width)+"'/>";
        html += "   <circle class='donut-fill' r='"+(r)+"px' cx='"+(o.radius)+"px' cy='"+(o.radius)+"px' transform='"+(transform)+"' fill='none' stroke='"+(o.fill)+"' stroke-width='"+(width)+"'/>";
        if (o.showTitle === true) {
            html += "   <text   class='donut-title' x='" + (o.radius) + "px' y='" + (o.radius) + "px' dy='" + (fontSize / 3) + "px' text-anchor='middle' fill='" + (o.color) + "' font-size='" + (fontSize) + "px'>0" + (o.cap) + "</text>";
        }
        html += "</svg>";

        element.html(html);

        this.val(o.value);
    },

    _setValue: function(v){
        var that = this, element = this.element, o = this.options;

        var fill = element.find(".donut-fill");
        var title = element.find(".donut-title");
        var r = o.radius  * (1 - (1 - o.hole) / 2);
        var circumference = 2 * Math.PI * r;
        var title_value = ((v * 1000 / o.total) / 10)+(o.cap);
        var fill_value = ((v * circumference) / o.total) + ' ' + circumference;

        fill.attr("stroke-dasharray", fill_value);
        title.html(title_value);
    },

    val: function(v){
        var that = this, o = this.options;

        if (v === undefined) {
            return o.value
        }

        if (o.animate > 0 && !document.hidden) {
            var inc = v > o.value;
            var i = o.value + (inc ? -1 : 1);

            clearInterval(that.animation_change_interval);
            this.animation_change_interval = setInterval(function(){
                if (inc) {
                    that._setValue(++i);
                    if (i >= v) {
                        clearInterval(that.animation_change_interval);
                    }
                } else {
                    that._setValue(--i);
                    if (i <= v) {
                        clearInterval(that.animation_change_interval);
                    }
                }
            }, o.animate);
        } else {
            clearInterval(that.animation_change_interval);
            this._setValue(v);
        }

        o.value = v;
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

// Source: js/widgets/dropdown.js
$.widget("corecss.dropdown", {

    version: "1.0.0",

    options: {
        effect: 'slide',
        toggleElement: false,
        noClose: false,
        duration: CORE_ANIMATION_DURATION,
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
            case 'fade': $(el).fadeIn(o.duration); break;
            case 'slide': $(el).slideDown(o.duration); break;
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
            case 'fade': $(el).fadeOut(o.duration); break;
            case 'slide': $(el).slideUp(o.duration); break;
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

// Source: js/widgets/gravatar.js
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
// Source: js/widgets/pickers.js
var pickers = {
    timePicker: function(cb_done, cb_change){
        var picker = $("<div>").timepicker({
            onDone: cb_done,
            onChange: cb_change,
            isDialog: true
        });
        return coreDialog.create({
            content: picker,
            options: {
                cls: "timepicker-dialog"
            }
        });
    },

    timeSelect: function(cb_done){
        var picker = $("<div>").timeselect({
            onDone: cb_done,
            isDialog: true
        });
        return coreDialog.create({
            content: picker,
            options: {
                cls: "wheelpicker-dialog"
            }
        });
    },

    wheelSelect: function(values, value, cb_done, title){
        var picker = $("<div>").wheelselect({
            title: title,
            values: values,
            value: value,
            onDone: cb_done,
            isDialog: true
        });
        return coreDialog.create({
            content: picker,
            options: {
                cls: "wheelpicker-dialog"
            }
        });
    },

    datePicker: function(cb_done, options){
        var picker_options = $.extend({}, {
            isDialog: true,
            onDone: cb_done
        }, (options != undefined ? options : {}));

        var picker = $("<div>").datepicker(picker_options);
        return coreDialog.create({
            content: picker,
            options: {
                cls: "calendar-dialog"
            }
        });
    },

    dateSelect: function(cb_done, options){
        var picker_options = $.extend({}, {
            isDialog: true,
            onDone: cb_done
        }, (options != undefined ? options : {}));

        var picker = $("<div>").dateselect(picker_options);
        return coreDialog.create({
            content: picker,
            options: {
                cls: "wheelpicker-dialog"
            }
        });
    }
};

$.Pickers = window.corePickers = pickers;
// Source: js/widgets/progress.js
$.widget( "corecss.progress" , {

    version: "1.0.0",

    options: {
        value: 0,
        buffer: 0,
        type: "default", // default, line, circle, buffered
        barColor: 'bg-green',
        bufferColor: 'bg-yellow',
        color: 'bg-gray-600',
        size: '64',
        radius: '20',
        onChange: $.noop,
        onEnd: $.noop
    },

    value: 0,

    _create: function () {
        var element = this.element;

        this._setOptionsFromDOM();

        this._createProgress();

        element.data('progress', this);
    },

    _createProgress: function(){
        var element = this.element, o = this.options;
        var template = '', bar, load, buffer, circle;

        element.addClass("progress");

        if (o.type == 'buffered') {

            element.addClass("buffered");

            bar  = $("<div class='bar'></div>").appendTo(element);
            buffer  = $("<div class='buffer'></div>").appendTo(element);
            load  = $("<div class='load'></div>").appendTo(element);

            if (Utils.isColor(o.barColor)) {
                bar.css('background', o.barColor);
            } else {
                bar.addClass(o.barColor);
            }

            if (Utils.isColor(o.bufferColor)) {
                buffer.css('background', o.bufferColor);
            } else {
                buffer.addClass(o.bufferColor);
            }

            this.val(o.value);
            this.buffer(o.buffer);

        } else if (o.type == 'line') {
            element.removeClass("progress");
            element.addClass("progress-line");
        } else if (o.type == 'circle') {
            element.removeClass("progress");
            element.addClass("circular-loader");
            element.css({
                width: o.size + 'px',
                height: o.size + 'px'
            });
            circle = $('<svg class="circular"><circle class="path" cx="'+o.size/2+'" cy="'+o.size/2+'" r="'+o.radius+'" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>').appendTo(element);
            bar = element.find(".path");

            if (Utils.isColor(o.barColor)) {
                bar.css('stroke', o.barColor);
            } else {
                bar.addClass(o.barColor);
            }
        } else {
            if (Utils.isColor(o.color)) {
                element.css('background', o.color);
            } else {
                element.addClass(o.color);
            }

            bar = $("<div class='bar'>").appendTo(element);

            if (Utils.isColor(o.barColor)) {
                bar.css('background', o.barColor);
            } else {
                bar.addClass(o.barColor);
            }

            this.val(o.value);
        }
    },

    val: function(val){
        var element = this.element, o = this.options;

        if (val == undefined) {
            return this.value;
        }

        this.value = val;
        element.data('value', val);

        element.find(".bar").css({
            width: val + '%'
        });

        Utils.callback(o.onChange, val);

        if (val == 100) {
            Utils.callback(o.onEnd);
        }

        return this;
    },

    buffer: function(val){
        var element = this.element;

        if (val == undefined) {
            return this.buffer;
        }

        this.buffer = val;
        element.data('buffer', val);

        element.find(".buffer").css({
            width: val + '%'
        });

        return this;
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

var progress = {

    isProgress: function(el){
        return Utils.isCoreObject(el, 'progress');
    },

    value: function(el, val){
        if (!this.isProgress(el)) {
            return false;
        }

        if (val !== undefined) {
            $(el).data('progress').val(val);
        } else {
            return $(el).data('progress').val();
        }
    },

    buffer: function(el, val){
        if (!this.isProgress(el)) {
            return false;
        }

        if (val !== undefined) {
            $(el).data('progress').buffer(val);
        } else {
            return $(el).data('progress').buffer();
        }
    },

    showPreloader: function(size, timeout){
        size = size || 64;
        timeout = timeout || false;
        return coreDialog.create({
            content: "<div data-role='progress' data-type='circle' data-size='"+size+"' data-radius='"+size/3+"'></div>",
            options: {
                width: size,
                height: size,
                cls: "preloader",
                hide: timeout
            }
        });
    }
};

$.Progress = window.coreProgress = progress;
// Source: js/widgets/range.js
$.widget("corecss.range", {

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
        returnType: 'value',
        target: false,

        onStartChange: function(){},
        onChange: function(value){},
        onChanged: function(value){},
        onBufferChange: function(value){},

        _range : {
            vertical: false,
            offset: 0,
            length: 0,
            marker: 0,
            ppp: 0,
            start: 0,
            stop: 0
        }
    },

    currValue: 0,

    _create: function(){
        var that = this,
            element = this.element;


        var o = this.options,
            s = o._range;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });

        if (!element.hasClass('range')) {
            element.addClass('range');
        }

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

        this._createRange();
        this._initPoints();
        this._placeMarker(o.position);
        this._showBuffer(o.buffer);

        var event_down = Utils.isTouchDevice() ? 'touchstart' : 'mousedown';

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

            Utils.callback(o.onStartChange);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(event_down, function (e) {
            e.preventDefault();
            that._startMoveMarker(e);
        });

        element.data('range', this);
    },

    _startMoveMarker: function(e){
        var element = this.element, o = this.options, that = this, hint = element.children('.range-hint');
        var returnedValue;

        var event_move = Utils.isTouchDevice() ? 'touchmove' : 'mousemove';
        var event_up = Utils.isTouchDevice() ? 'touchend' : 'mouseup mouseleave';

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

            Utils.callback(o.onChanged, returnedValue);
        });

        this._initPoints();

        this._movingMarker(e);
    },

    _movingMarker: function (ev) {
        var element = this.element, o = this.options;
        var cursorPos,
            percents,
            valuePix,

            vertical = o._range.vertical,
            rangeOffset = o._range.offset,
            rangeStart = o._range.start,
            rangeEnd = o._range.stop,
            rangeLength = o._range.length,
            markerSize = o._range.marker;

        var event = !Utils.isTouchDevice() ? ev.originalEvent : ev.originalEvent.touches[0];

        //console.log(event);

        if (vertical) {
            cursorPos = event.pageY - rangeOffset;
        } else {
            cursorPos = event.pageX - rangeOffset;
        }

        if (cursorPos < rangeStart) {
            cursorPos = rangeStart;
        } else if (cursorPos > rangeEnd) {
            cursorPos = rangeEnd;
        }

        if (vertical) {
            valuePix = rangeLength - cursorPos - markerSize / 2;
        } else {
            valuePix = cursorPos - markerSize / 2;
        }

        percents = this._pixToPerc(valuePix);

        this._placeMarker(percents);

        this.currValue = this._valueToRealValue(percents);
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

        Utils.callback(o.onChange, returnedValue);
    },

    _placeMarker: function (value) {
        var size, size2, o = this.options, colorParts, colorIndex = 0, colorDelta, element = this.element,
            marker = this.element.children('.marker'),
            complete = this.element.children('.complete'),
            hint = this.element.children('.range-hint'), hintValue,
            oldPos = this._percToPix(o.position);

        colorParts = o.colors.length;
        colorDelta = o._range.length / colorParts;

        if (o._range.vertical) {
            var oldSize = this._percToPix(o.position) + o._range.marker,
                oldSize2 = o._range.length - oldSize;
            size = this._percToPix(value) + o._range.marker / 2;
            size2 = o._range.length - size;
            this._animate(marker.css('top', oldSize2),{top: size2});
            this._animate(complete.css('height', oldSize),{height: size});

            if (colorParts) {
                colorIndex = Math.round(size / colorDelta)-1;
                complete.css('background-color', o.colors[colorIndex<0?0:colorIndex]);
            }
            if (o.showHint) {
                hintValue = this._valueToRealValue(value);
                hint.html(hintValue).css('top', size2 - marker.height()/2 - hint.height()/4 - 4);

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
                hint.html(hintValue).css('left', size - marker.width()/2 + 2);
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
        valuePerc = (valuePix < 0 ? 0 : valuePix )* this.options._range.ppp;
        return Math.round(this._correctValue(valuePerc));
    },

    _percToPix: function (value) {
        ///console.log(this.options._range.ppp, value);
        if (this.options._range.ppp === 0) {
            return 0;
        }
        return Math.round(value / this.options._range.ppp);
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
        var o = this.options, s = o._range, element = this.element;

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

    _createRange: function(){
        var element = this.element,
            o = this.options,
            complete, marker, hint, buffer, back;

        element.html('');

        back = $("<div/>").addClass("range-backside").appendTo(element);
        complete = $("<div/>").addClass("complete").appendTo(element);
        buffer = $("<div/>").addClass("buffer").appendTo(element);
        marker = $("<a/>").addClass("marker").appendTo(element);

        if (o.showHint) {
            hint = $("<span/>").addClass("range-hint").appendTo(element);
        }

        if (o.color !== 'default') {
            if (Utils.isColor(o.color)) {
                back.css('background-color', o.color);
            } else {
                back.addClass(o.color);
            }
        }
        if (o.completeColor !== 'default') {
            if (Utils.isColor(o.completeColor)) {
                complete.css('background-color', o.completeColor);
            } else {
                complete.addClass(o.completeColor);
            }
        }
        if (o.bufferColor !== 'default') {
            if (Utils.isColor(o.bufferColor)) {
                buffer.css('background-color', o.bufferColor);
            } else {
                buffer.addClass(o.bufferColor);
            }
        }
        if (o.markerColor !== 'default') {
            if (Utils.isColor(o.markerColor)) {
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

            Utils.callback(o.onChange, returnedValue);


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

        if (o._range.vertical) {
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

            Utils.callback(o.onBufferChange, returnedValue);

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

// Source: js/widgets/ripple.js
$.widget( "corecss.ripple" , {

    version: "1.0.0",

    options: {
        rippleColor: "#fff",
        rippleAlpha: .4,
        rippleTarget: "default"
    },

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        var target = o.rippleTarget === 'default' ? null : o.rippleTarget;

        element.on("click", target, function(e){

            var el = $(this);

            if (el.css('position') == 'static') {
                el.css('position', 'relative');
            }

            el.css({
                overflow: 'hidden'
            });

            $(".ripple").remove();

            var size = Math.max(el.outerWidth(), el.outerHeight());

            // Add the element
            var ripple = $("<span class='ripple'></span>").css({
                width: size,
                height: size
            });

            el.prepend(ripple);

            // Get the center of the element
            var x = e.pageX - el.offset().left - ripple.width()/2;
            var y = e.pageY - el.offset().top - ripple.height()/2;

            // Add the ripples CSS and start the animation
            ripple.css({
                background: Utils.hex2rgba(o.rippleColor, o.rippleAlpha),
                width: size,
                height: size,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");
            setTimeout(function(){
                $(".ripple").remove();
            }, 400);
        });

        element.data('ripple', this);
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
// Source: js/widgets/slider.js
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

// Source: js/widgets/stepper.js
$.widget( "corecss.stepper" , {

    version: "1.0.0",

    options: {
        steps: 0,
        states: null,
        startStep: 1,
        label: '',
        clickable: false,
        onStep: $.noop()
    },

    _create: function () {
        var element = this.element, o = this.options;

        this._setOptionsFromDOM();
        this._createStepper();

        element.data('stepper', this);
    },

    _createStepper: function(){
        var element = this.element, o = this.options;
        var i, steps;

        if (!element.hasClass("stepper")) {
            element.addClass('stepper');
        }

        if (Utils.isFunc(o.steps)) {
            o.steps = Utils.exec(o.steps);
        }

        if (o.states !== null && Utils.isFunc(o.states)) {
            o.states = Utils.exec(o.states);
        }

        if (Array.isArray(o.steps)) {
            $.each(o.steps, function(i, v){
                $("<span>").html(v).data('index', i + 1).appendTo(element);
            });
        } else {
            for(i = 0; i < o.steps; i++) {
                $("<span>").html(o.label != '' ? o.label + ' ' + (i + 1) : '').data('index', i + 1).appendTo(element);
            }
        }

        steps = element.find("span");

        if (o.clickable === true) {
            steps.addClass('clickable');
        }

        if (o.startStep > 0) {
            for(i = 0; i < o.startStep-1; i++) {
                steps.eq(i).addClass('complete');
            }

            steps.eq(o.startStep-1).addClass('current');
        }

        if (Array.isArray(o.states)) {
            $.each(o.states, function(i, v){
                steps.eq(i).addClass(v)
            });
        }

        if (o.clickable === true) {
            element.off('click').on('click', 'span', function(){

            });
        }
    },

    _removeClasses: function(el){
        var $el = $(el);
        $el
            .removeClass('current')
            .removeClass('complete');

        return $el;
    },

    next: function(){
        var that = this, element = this.element, o = this.options;
        var current = element.find(".current").eq(0), next = current.next();

        if (next.length === 0) {
            return false;
        }

        this._removeClasses(current).addClass('complete');
        this._removeClasses(next).addClass('current');

        Utils.callback(o.onStep, [next.data('index'), next]);
    },

    prev: function(){
        var that = this, element = this.element, o = this.options;
        var current = element.find(".current").eq(0), prev = current.prev();

        if (prev.length === 0) {
            return false;
        }

        this._removeClasses(current);
        this._removeClasses(prev).addClass('current');

        Utils.callback(o.onStep, [prev.data('index'), prev]);
    },

    state: function(step, state){
        var that = this, element = this.element, o = this.options;
        var steps = element.find("span");

        steps.eq(step - 1).toggleClass(state);
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
        this.element.off("click");
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    }
});

var stepper = {
    isStepper: function(el){
        return Utils.isCoreObject(el, 'stepper');
    },

    next: function(el){
        if (!this.isStepper(el)) {
            return false;
        }

        $(el).data('stepper').next();
    },

    prev: function(el){
        if (!this.isStepper(el)) {
            return false;
        }

        $(el).data('stepper').prev();
    },

    state: function(el, step, state){
        if (!this.isStepper(el)) {
            return false;
        }

        $(el).data('stepper').state(step, state);
    }
};

$.Steppers = window.coreSteppers = stepper;
// Source: js/widgets/tabs.js
$.widget( "corecss.tabs" , {

    version: "1.0.0",

    options: {
        target: 'self',
        tabsColor: 'bg-lightBlue',
        fontColor: 'fg-white',
        markerColor: 'bg-yellow',
        deep: 'normal',
        duration: CORE_ANIMATION_DURATION,
        onTab: $.noop()
    },


    _create: function () {
        var that = this, element = this.element, o = this.options;
        var tabs = element.find('li:not(.tab-marker)');
        var tab_active = $(element.find('li.active:not(.tab-marker)')[0]);
        var tab = tab_active.length > 0 ? tab_active : $(tabs[0]);

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

        if (!element.hasClass('tabs')) {
            element.addClass('tabs');
        }

        if (o.deep !== 'normal') {
            element.addClass('deep');
        }

        if (Utils.isColor(o.tabsColor)) {
            element.css('background-color', o.tabsColor);
        } else {
            element.addClass(o.tabsColor);
        }

        if (Utils.isColor(o.fontColor)) {
            element.css('color', o.fontColor);
        } else {
            element.addClass(o.fontColor);
        }

        var tab_marker = element.find('li.tab-marker');

        if (tab_marker.length == 0) {
            tab_marker = $("<li>").addClass("tab-marker");
            tab_marker.appendTo(element);
        }

        if (Utils.isColor(o.markerColor)) {
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

        var current_tab = $(element.find('li.active')[0]);

        if (current_tab != tab) {
            tabs.removeClass('active');
            frames.hide();

            tab.addClass('active');
            $(frame).show();
        }

        if (shift + magic > width) {
            element.animate({
                scrollLeft: scroll + (shift - width) + (tab_width / 2)
            }, o.duration);
        }

        if (tab_left - magic < 0) {
            element.animate({
                scrollLeft: tab_left + scroll - (tab_width / 2)
            }, o.duration);
        }

        this._setMarker();
    },

    _setMarker: function(){
        var that = this, element = this.element, o = this.options;
        var tab = element.find("li.active");
        var marker = element.find("li.tab-marker");
        var tab_width = tab.outerWidth();
        var tab_left = tab.position().left;
        var scroll = element.scrollLeft();

        marker.animate({
            width: tab_width,
            top: '100%',
            left: tab_left + scroll
        }, o.duration);
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

            if (target !=undefined && Utils.isUrl(target)) {
                window.location.href = target;
                return true;
            }

            element.data('activeTab', target);

            that._openTab(tab, change_direction);

            Utils.callback(o.onTab, tab);

            e.preventDefault();
            //e.stopPropagation();
        });
    },

    reset: function(tab){
        this._openTab(tab)
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

$(window).on('resize', function(){
    var tabs = $('.tabs');
    $.each(tabs, function(){
        var el = $(this), _tabs = el.data("tabs"), tab = el.find("li.active");
        _tabs.reset(tab);
    });
});
// Source: js/widgets/timepicker.js
$.widget( "corecss.timepicker" , {

    version: "1.0.0",

    options: {
        locale: CORE_LOCALE,
        time: new Date(),
        isDialog: false,
        onDone: $.noop,
        onChange: $.noop,
        onCancel: $.noop
    },

    mode: 'hours',
    am: false,
    hour: 0,
    minute: 0,

    _create: function () {
        var that = this, element = this.element, o = this.options;
        var c = 1000 * 60 * 5;
        var date, h, m;

        this._setOptionsFromDOM();

        if (typeof o.time == 'string') {
            date = new Date();
            h = o.time.split(":")[0];
            m = o.time.split(":")[1];
            date.setHours(h, m);
        } else {
            date = o.time;
        }

        //date = o.date;

        this.mode = 'hours';
        this.am = date.getHours() < 12;
        this.hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        this.minute = new Date(Math.round(date.getTime() / c) * c).getMinutes();

        this._createPicker();
        this._createEvents();

        element.data('timepicker', this);
    },

    _drawHeader: function(){
        var element = this.element, o = this.options,
            html = "", hour, minute, am;

        hour = this.hour > 12 ? this.hour - 12 : this.hour;
        minute = this.minute < 10 ? '0'+this.minute : this.minute;
        am = this.am;

        html += "<span class='am "+(am ? 'active' : '')+"'>am</span>";
        html += "<span class='pm "+(!am ? 'active' : '')+"'>pm</span>";
        html += "<span class='js-hours active'>"+hour+"</span>";
        html += "<span>:</span>";
        html += "<span class='js-minutes'>"+minute+"</span>";

        return $(html);
    },

    _drawFooter: function(){
        var element = this.element, o = this.options,
            html = "";

        html += "<button class='flat-button js-button-cancel "+(o.isDialog === true ? 'js-dialog-close' : '')+"'>"+coreLocales[o.locale].buttons.cancel+"</button>";
        html += "<button class='flat-button js-button-done "+(o.isDialog === true ? 'js-dialog-close' : '')+"'>"+coreLocales[o.locale].buttons.done+"</button>";

        return $(html);
    },

    _createPicker: function(){
        var that = this, element = this.element, o = this.options;
        var i, j, h, c, f, pi, el, line, rotate;


        if (!element.hasClass("timepicker")) {
            element.addClass("timepicker");
        }

        element.html("");

        h = $("<div>").addClass("picker-header").appendTo(element).html(this._drawHeader());
        c = $("<div>").addClass("picker-content").appendTo(element);
        f = $("<div>").addClass("picker-footer").appendTo(element).html(this._drawFooter());
        pi = $("<div>").addClass("picker-inner").appendTo(c);

        for(i = 0; i < 12; i++) {
            j = i == 0 ? 12 : i;
            el = $("<span>").addClass("picker-item").html(j).appendTo(pi).data("hour", j).data("minute", j * 5 == 60 ? '00' : j * 5).data('rotate', ((i+1) * 30 - 30));
            if (j == this.hour) {
                el.addClass("active");
                rotate = el.data('rotate');
            }
        }

        line = $("<div>").addClass("picker-line").appendTo(pi);
        line.css({"transform": "rotate("+rotate+"deg)"});

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on("click", ".picker-item", function(){
            var el = $(this), rotate = el.data('rotate');
            element.find(".picker-item.active").removeClass("active");
            el.addClass("active");

            if (that.mode == 'hours') {
                element.find(".js-hours").text(el.data('hour'));
                that.hour = el.data('hour');
            } else {
                element.find(".js-minutes").text(el.data('minute'));
                that.minute = el.data('minute');
            }

            element.find(".picker-line").css({"transform": "rotate("+rotate+"deg)"});
        });

        element.on("click", ".js-hours, .js-minutes", function(){
            var el = $(this);
            element.find(".picker-item.active").removeClass("active");
            if (el.hasClass("js-hours")) {
                that.mode = "hours";
                element.find(".js-hours").addClass("active");
                element.find(".js-minutes").removeClass("active");
                $.each(element.find(".picker-item"), function(){
                    var el = $(this);
                    el.text(el.data("hour"));
                    if (el.data("hour") == that.hour) {
                        el.addClass("active");
                        element.find(".picker-line").css({"transform": "rotate("+el.data('rotate')+"deg)"});
                    }
                });
            } else {
                that.mode = "minutes";
                element.find(".js-hours").removeClass("active");
                element.find(".js-minutes").addClass("active");
                $.each(element.find(".picker-item"), function(){
                    var el = $(this);
                    el.text(el.data("minute"));
                    if (el.data("minute") == that.minute) {
                        el.addClass("active");
                        element.find(".picker-line").css({"transform": "rotate("+el.data('rotate')+"deg)"});
                    }
                });
            }
            var val = {
                h: that.hour,
                m: that.minute,
                am: that.am
            };
            Utils.callback(o.onChange, val);
        });

        element.on("click", ".am, .pm", function(){
            var el = $(this);
            if (el.hasClass("am")) {
                that.am = true;
                element.find(".am").addClass("active");
                element.find(".pm").removeClass("active");
            } else {
                that.am = false;
                element.find(".am").removeClass("active");
                element.find(".pm").addClass("active");
            }

            var val = {
                h: that.hour,
                m: that.minute,
                am: that.am
            };
            Utils.callback(o.onChange, val);
        });

        element.on("click", ".js-button-done", function(){
            var val = {
                h: that.hour,
                m: that.minute,
                am: that.am
            };
            Utils.callback(o.onDone, val);
        });

        element.on("click", ".js-button-cancel", function(){
            Utils.callback(o.onCancel);
        });
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

// Source: js/widgets/timeselect.js
$.widget( "corecss.timeselect" , {

    version: "1.0.0",

    options: {
        locale: CORE_LOCALE,
        hour: 0,
        minute: 0,
        second: 0,
        isDialog: false,
        buttons: ['cancel', 'random', 'now', 'done'],
        onDone: $.noop
    },

    hour: null,
    minute: null,
    second: null,

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        this.hour = o.hour;
        this.minute = o.minute;
        this.second = o.second;

        this._createElement();
        this._createScrollEvents();
        this._createButtonsEvents();

        setTimeout(function(){
            that.now();
        }, 100);

        element.data('timeselect', this);
    },

    now: function(){
        var d = new Date();

        this.hour = d.getHours();
        this.minute = d.getMinutes();
        this.second = d.getSeconds();

        this.setPosition();
    },

    setPosition: function(){
        var element = this.element;
        var hour = this.hour,
            minute = this.minute,
            second = this.second;
        var h_list = element.find(".h-list"),
            m_list = element.find(".m-list"),
            s_list = element.find(".s-list");

        this._removeScrollEvents();

        h_list.scrollTop(0).animate({
            scrollTop: element.find(".js-hh-"+hour).addClass("active").position().top - 48
        });

        m_list.scrollTop(0).animate({
            scrollTop: element.find(".js-mm-"+minute).addClass("active").position().top - 48
        });

        s_list.scrollTop(0).animate({
            scrollTop: element.find(".js-ss-"+second).addClass("active").position().top - 48
        });

        this._createScrollEvents();
    },

    _drawFooter: function(){
        var element = this.element, o = this.options,
            html = "";

        $.each(o.buttons, function(){
            html += "<button class='flat-button js-button-"+this+" "+(o.isDialog && (this == 'cancel' || this == 'done') ? 'js-dialog-close' : '')+"'>"+coreLocales[o.locale].buttons[this]+"</button>";
        });

        return $(html);
    },

    _drawHeader: function(){
        var element = this.element,
            html = "", header,
            o = this.options;

        html += "<span class='part'>"+coreLocales[o.locale].calendar.time[0]+"</span><span class='part'>"+coreLocales[o.locale].calendar.time[1]+"</span><span class='part'>"+coreLocales[o.locale].calendar.time[2]+"</span>";

        header = $(html);

        return header;
    },

    _drawPicker: function(){
        var element = this.element, o = this.options;
        var picker_inner = $("<div>").addClass("picker-content-inner");
        var h_list, m_list, s_list;
        var i;

        h_list = $("<ul>").addClass("h-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(h_list);
        for(i = 0; i <= 23; i++) {
            $("<li>").html(i).appendTo(h_list).data('value', i).addClass("js-hh-"+i);
        }
        $("<li>").html("&nbsp;").appendTo(h_list);

        m_list = $("<ul>").addClass("m-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(m_list);
        for(i = 0; i <= 59; i++) {
            $("<li>").html(i).appendTo(m_list).data('value', i).addClass("js-mm-"+i);
        }
        $("<li>").html("&nbsp;").appendTo(m_list);

        s_list = $("<ul>").addClass("s-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(s_list);
        for(i = 0; i <= 59; i++) {
            $("<li>").html(i).appendTo(s_list).data('value', i).addClass("js-ss-"+i);
        }
        $("<li>").html("&nbsp;").appendTo(s_list);

        return picker_inner;
    },

    _createElement: function(){
        var that = this, element = this.element, o = this.options;
        var h, c, f;

        if (!element.hasClass("wheelpicker")) element.addClass("wheelpicker");

        element.html("");

        h = $("<div>").addClass("picker-header").appendTo(element);
        c = $("<div>").addClass("picker-content").appendTo(element);
        f = $("<div>").addClass("picker-footer").appendTo(element);

        h.append(this._drawHeader());
        c.append(this._drawPicker());
        f.append(this._drawFooter());
    },

    _createScrollEvents: function(){
        var that = this, element = this.element, o = this.options;
        var h_list = element.find(".h-list"),
            m_list = element.find(".m-list"),
            s_list = element.find(".s-list");

        h_list.on('scrollstart', function(){
            h_list.find(".active").removeClass("active");
        });
        h_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(h_list.scrollTop() + 48) / 48)) - 1;
            var target_element = h_list.find(".js-hh-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 48 + h_list[0].scrollTop;

            h_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
            });
        });

        m_list.on('scrollstart', function(){
            m_list.find(".active").removeClass("active");
        });
        m_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(m_list.scrollTop() + 48) / 48)) - 1;
            var target_element = m_list.find(".js-mm-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 48 + m_list[0].scrollTop;

            m_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
            });
        });

        s_list.on('scrollstart', function(){
            s_list.find(".active").removeClass("active");
        });
        s_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(s_list.scrollTop() + 48) / 48)) - 1;
            var target_element = s_list.find(".js-ss-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 48 + s_list[0].scrollTop;

            s_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
            });
        });
    },

    _removeScrollEvents: function(){
        var element = this.element;
        element.find(".h-list").off('scrollstart');
        element.find(".h-list").off('scrollstop');
        element.find(".m-list").off('scrollstart');
        element.find(".m-list").off('scrollstop');
        element.find(".s-list").off('scrollstart');
        element.find(".s-list").off('scrollstop');
    },


    _createButtonsEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.find(".js-button-random").on("click", function(){
            that.hour = Utils.random(0, 23);
            that.minute = Utils.random(0, 59);
            that.second = Utils.random(0, 59);

            that.setPosition();
        });

        element.find(".js-button-done").on("click", function(){
            var result = {
                hour: that.hour,
                minute: that.minute,
                second: that.second
            };
            Utils.callback(o.onDone, result);
        });

        element.find(".js-button-now").on("click", function(){
            var d = new Date();;

            that.hour = d.getHours();
            that.minute = d.getMinutes();
            that.second = d.getSeconds();

            that.setPosition();
        });
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

// Source: js/widgets/toast.js
var toasts = {
    create: function(message, callback, timeout, cls){
        var toast = $("<div>").addClass("toast").html(message).appendTo($("body")).hide();
        var width = toast.outerWidth();
        var height = toast.outerHeight();
        timeout = timeout || 2000;

        toast.css({
            'left': '50%',
            'margin-left': -(width / 2),
            'border-radius': height/2
        }).addClass(cls).fadeIn(CORE_ANIMATION_DURATION);

        setTimeout(function(){
            toast.fadeOut(CORE_ANIMATION_DURATION, function(){
                toast.remove();
                Utils.callback(callback);
            });
        }, timeout);
    }
};

$.Toasts = window.coreToasts = toasts;

// Source: js/widgets/touch.js
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

$.widget( "corecss.touch" , {

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
        swipeStatus: null, // params: phase, direction, distance, duration, fingerCount, fingerData, currentDirection
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

        element.data('touch', this);
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

// Source: js/widgets/wheelselect.js
$.widget( "corecss.wheelselect" , {

    version: "1.0.0",

    options: {
        title: null,
        locale: CORE_LOCALE,
        values: null,
        value: null,
        isDialog: false,
        buttons: ['cancel', 'random', 'done'],
        onDone: $.noop
    },

    _value: null,

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

        if (typeof o.values !== 'object') {
            o.values = o.values.split(",").map(function(v){
                return isNaN(v) ? v.trim() : Number(v);
            });
        }

        //console.log(o.values);

        this._createElement();
        this._createScrollEvents();
        this._createButtonsEvents();

        setTimeout(function(){
            if (o.value !== null) {
                that.value(o.value);
            }
        }, 100);

        element.data('wheelselect', this);
    },

    value: function(v){
        if (v === undefined) {
            return this._value;
        }

        this._value = v;

        this.setPosition();
    },

    setPosition: function(){
        var element = this.element, o = this.options;
        var values = Utils.isFunc(o.values) ?  Utils.exec(o.values) : o.values;
        var value_index = values.indexOf(this._value);
        var v_list = element.find(".v-list");

        this._removeScrollEvents();

        v_list.scrollTop(0).animate({
            scrollTop: element.find(".js-vv-"+value_index).addClass("active").position().top - 48
        });

        this._createScrollEvents();
    },

    _drawHeader: function(){
        var element = this.element,
            html = "", header,
            o = this.options;

        html += "<span class='day'>"+o.title+"</span>";

        header = $(html);

        return header;
    },

    _drawFooter: function(){
        var element = this.element, o = this.options,
            html = "";

        $.each(o.buttons, function(){
            html += "<button class='flat-button js-button-"+this+" "+(o.isDialog && (this == 'cancel' || this == 'done') ? 'js-dialog-close' : '')+"'>"+coreLocales[o.locale].buttons[this]+"</button>";
        });

        return $(html);
    },

    _drawPicker: function(){
        var element = this.element, o = this.options;
        var picker_inner = $("<div>").addClass("picker-content-inner");
        var v_list;
        var i, items;

        v_list = $("<ul>").addClass("v-list").appendTo(picker_inner);
        $("<li>").html("&nbsp;").appendTo(v_list);

        if (Utils.isFunc(o.values)) {
            items = Utils.exec(o.values);
            $.each(items, function(i, v){
                $("<li>").html(v).appendTo(v_list).data('value', v).addClass("js-vv-"+i);
            });
        } else if ((Object.prototype.toString.call( o.values ) === '[object Array]' || Object.prototype.toString.call( o.values ) === '[object Object]') && o.values.length > 0) {
            for(i = 0; i < o.values.length; i++) {
                $("<li>").html(o.values[i]).appendTo(v_list).data('value', o.values[i]).addClass("js-vv-"+i);
            }
        } else {
            $("<li>").html("NO VALUES").data("value", null).appendTo(v_list);
        }

        $("<li>").html("&nbsp;").appendTo(v_list);

        return picker_inner;
    },

    _createElement: function(){
        var that = this, element = this.element, o = this.options;
        var h, c, f;

        if (!element.hasClass("wheelpicker")) element.addClass("wheelpicker");

        element.html("");

        if (o.title) {
            h = $("<div>").addClass("picker-header").appendTo(element);
            h.append(this._drawHeader());
        }

        c = $("<div>").addClass("picker-content").appendTo(element);
        f = $("<div>").addClass("picker-footer").appendTo(element);

        c.append(this._drawPicker());
        f.append(this._drawFooter());
    },

    _createScrollEvents: function(){
        var that = this, element = this.element, o = this.options;
        var v_list = element.find(".v-list");

        v_list.on('scrollstart', function(){
            v_list.find(".active").removeClass("active");
        });
        v_list.on('scrollstop', function(){
            var target = Math.round((Math.ceil(v_list.scrollTop() + 48) / 48)) - 1;
            var target_element = v_list.find(".js-vv-"+target);
            var val = target_element.data('value');
            var scroll_to = target_element.position().top - 48 + v_list[0].scrollTop;

            v_list.animate({
                scrollTop: scroll_to
            }, CORE_ANIMATION_DURATION, function(){
                target_element.addClass("active");
            });
        });
    },

    _removeScrollEvents: function(){
        var element = this.element;
        element.find(".v-list").off('scrollstart');
        element.find(".v-list").off('scrollstop');
    },


    _createButtonsEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.find(".js-button-random").on("click", function(){

            that._value = o.values[Utils.random(0, o.values.length - 1)];

            that.setPosition();
        });

        element.find(".js-button-done").on("click", function(){
            var result = that.value();
            Utils.callback(o.onDone, result);
        });
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