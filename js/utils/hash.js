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