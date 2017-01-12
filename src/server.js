var fs = require('fs-extra');

module.exports.folder = {};

module.exports.folder.create = function(cb) {
    fs.mkdir(__dirname+'/../servers', function(err) {
        if (err && err.code=='EEXIST') err=null;
        cb(err);
    });
}
module.exports.folder.remove = function(cb) {
    fs.remove(__dirname+'/../servers', function(err) {
        cb(err);
    });
}
function createFolder(name,cb) {
    fs.mkdir(__dirname+'/../servers/'+name, function(err) {
        cb(err);
    });
}
module.exports.prepare = function(name,cb) {
    this.folder.create(function(err) {
        // istanbul ignore if
        if (err) return cb(err);
        createFolder(name,function(err) {
            cb(err);
        });
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