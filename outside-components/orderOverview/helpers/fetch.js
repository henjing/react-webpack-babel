var $ = require('jquery');

var commonAjax = function (config, url, sucFunc, errFunc) {
    
    var formData = new FormData();
    
    for (var i in config) {
        formData.append(i, config[i]);
    }
    
    $.ajax({
        url : url,
        type : 'POST',
        cache : false,
        data : formData,
        processData : false,
        contentType : false
    }).done(sucFunc).fail(errFunc);
};

module.exports = commonAjax;