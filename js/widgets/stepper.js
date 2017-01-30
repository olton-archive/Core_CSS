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