var picker = {
    timePicker: function(cb_done, cb_cancel, cb_change){
        var picker = $("<div>").timepicker({
            onDone: cb_done,
            onCancel: cb_cancel,
            onChange: cb_change,
            isDialog: true
        });
        return coreDialog.create({
            content: picker,
            options: {
                cls: "timepicker-dialog"
            }
        });
    }
};

$.Picker = window.corePicker = picker;