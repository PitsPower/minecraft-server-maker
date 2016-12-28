var fs = require('fs-extra');
var request = require('request');

module.exports.getData = function(cb) {
    request('https://launchermeta.mojang.com/mc/game/version_manifest.json', function(err,response,body) {
        cb(err,JSON.parse(body));
    });
}
module.exports.getAll = function(cb) {
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
module.exports.getLatestRelease = function(cb) {
    this.getData(function(err,data) {
        cb(err,data.latest.release);
    });
}
module.exports.getLatestSnapshot = function(cb) {
    this.getData(function(err,data) {
        cb(err,data.latest.snapshot);
    });
}