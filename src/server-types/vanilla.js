var fs = require('fs-extra');
var sanitize = require('sanitize-filename');
var request = require('request');
var checksum = require('checksum');

var versionModule = require('../version');
var server = require('../server');

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
module.exports.downloadServer = function(name,version,cb) {
    var _this = this;
    
    server.init(function(err) {
        server.createFolder(name,function(err) {
            _this.getServerUrl(version,function(err,url) {
                var pathname = __dirname+'/../../servers/'+name+'/server.jar';
                
                request(url)
                    .pipe(fs.createWriteStream(pathname))
                    .on('finish',function() {
                        _this.getServerChecksum(version,function(err,hash) {
                            checksum.file(pathname, function(err,fileHash) {
                                if (hash==fileHash) {
                                    cb(err);
                                } else {
                                    fs.remove(pathname, function(err) {
                                        _this.download(name,version,cb);
                                    });
                                }
                            });
                        });
                    });
            });
        });
    });
}