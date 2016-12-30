var fs = require('fs-extra');
var sanitize = require('sanitize-filename');
var request = require('request');
var checksum = require('checksum');

var server = require('../server');

module.exports.version = {};
module.exports.version.getData = function(cb) {
    request('https://launchermeta.mojang.com/mc/game/version_manifest.json', function(err,response,body) {
        cb(err,JSON.parse(body));
    });
}
module.exports.version.getAll = function(cb) {
    this.getData(function(err,data) {
        var versions = data.versions;
        
        var serverVersions = [];
        var eliminatedVersions = ['1.2.4','1.2.3','1.2.2','1.2.1','1.1','1.0'];
        
        for (var i=0;i<versions.length;i++) {
            var version = versions[i].id;
            
            if (!isNaN(parseInt(version[0]))) {
                var isEliminated = false;
                
                for (var j=0;j<eliminatedVersions.length;j++) {
                    if (version==eliminatedVersions[j]) {
                        isEliminated = true;
                        break;
                    }
                }
                
                if (!isEliminated) {
                    serverVersions.push(version);
                }
            }
        }
        
        cb(err,serverVersions);
    });
}
module.exports.version.getLatestRelease = function(cb) {
    this.getData(function(err,data) {
        cb(err,data.latest.release);
    });
}
module.exports.version.getLatestSnapshot = function(cb) {
    this.getData(function(err,data) {
        cb(err,data.latest.snapshot);
    });
}

module.exports.getDataUrl = function(version,cb) {
    this.version.getData(function(err,data) {
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