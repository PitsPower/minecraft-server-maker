var fs = require('fs-extra');

module.exports.folder = {};

module.exports.init = function(cb) {
    fs.mkdir(__dirname+'/../servers', function(err) {
        if (cb) cb(err);
    });
}
module.exports.folder.remove = function(cb) {
    fs.remove(__dirname+'/../servers', function(err) {
        if (cb) cb(err);
    });
}
module.exports.createFolder = function(name,cb) {
    fs.mkdir(__dirname+'/../servers/'+name, function(err) {
        if (cb) cb(err);
    });
}