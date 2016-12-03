var picker = {
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

    calendarPicker: function(cb_done, options){
        var picker_options = $.extend({}, {
            isDialog: true,
            onDone: cb_done
        }, (options != undefined ? options : {}));

        var picker = $("<div>").calendar(picker_options);
        return coreDialog.create({
            content: picker,
            options: {
                cls: "calendar-dialog"
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
                cls: "datepicker-dialog"
            }
        });
    }
};

$.Picker = window.corePicker = picker;