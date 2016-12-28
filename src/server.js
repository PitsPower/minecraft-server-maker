var fs = require('fs-extra');
var sanitize = require('sanitize-filename');
var request = require('request');

var versionModule = require('./version');

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
module.exports.getDataUrl = function(version,cb) {
    versionModule.getData(function(err,data) {
        var versions = data.versions;
        
        for (var i=0;i<versions.length;i++) {
            if (versions[i].id==version) {
                cb(err,versions[i].url);
                break;
            }
        }
    });
}
module.exports.getServerUrl = function(version,cb) {
    this.getDataUrl(version,function(err,url) {
        request(url, function(err,response,body) {
            var server = JSON.parse(body).downloads.server;
            cb(err,server?server.url:null);
        });
    });
}
module.exports.getServerChecksum = function(version,cb) {
    this.getDataUrl(version,function(err,url) {
        request(url, function(err,response,body) {
            var server = JSON.parse(body).downloads.server;
            cb(err,server?server.sha1:null);
        });
    });
}
module.exports.createFolder = function(name,cb) {
    fs.mkdir(__dirname+'/../servers/'+name, function(err) {
        if (cb) cb(err);
    });
}
module.exports.download = function(name,version,cb) {
    var _this = this;
    
    _this.init(function(err) {
        _this.createFolder(name,function(err) {
            _this.getServerUrl(version,function(err,url) {
                request(url)
                    .pipe(fs.createWriteStream(__dirname+'/../servers/'+name+'/server.jar'))
                    .on('finish',function() {
                        cb(err);
                    });
            });
        });
    });
}