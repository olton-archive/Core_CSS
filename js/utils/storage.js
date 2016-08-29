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