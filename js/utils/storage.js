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