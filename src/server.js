var fs = require('fs-extra');

module.exports.folder = {};

module.exports.init = function(cb) {
    fs.mkdir(__dirname+'/../servers', function(err) {
        cb(err);
    });
}
module.exports.folder.remove = function(cb) {
    fs.remove(__dirname+'/../servers', function(err) {
        cb(err);
    });
}
module.exports.createFolder = function(name,cb) {
    fs.mkdir(__dirname+'/../servers/'+name, function(err) {
        cb(err);
    });
}
module.exports.createDataFile = function(name,version,type,cb) {
    var data = {
        version: version,
        type: type,
        created: (new Date()).getTime()
    };
    
    fs.writeFile(__dirname+'/../servers/'+name+'/msm_data.json', JSON.stringify(data), 'utf8', function(err, fd) {
        cb(err);
    });
}