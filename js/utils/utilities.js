var Utils = {
    isUrl: function (val) {
        "use strict";
        var regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(val);
    },

    isColor: function (val) {
        "use strict";
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
        "use strict";
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