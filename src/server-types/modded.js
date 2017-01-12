var fs = require('fs-extra');
var sanitize = require('sanitize-filename');
var request = require('request');
var jsdom = require('jsdom');
var checksum = require('checksum');
var proc = require('child_process');

var server = require('../server');

module.exports.version = {};
module.exports.version.getAll = function(cb) {
    var versions = [];
    
    jsdom.env({
        url: 'https://files.minecraftforge.net',
        scripts: ['http://code.jquery.com/jquery.min.js'],
        done: function(err,window) {
            // istanbul ignore if
            if (err) return cb(err);
            
            var $ = window.$;
            
            $(".li-version-list li").each(function() {
                versions.push($(this).text().trim());
            });
            
            cb(err,versions);
        }
    });
}
module.exports.version.getLatestRelease = function(cb) {
    jsdom.env({
        url: 'https://files.minecraftforge.net',
        scripts: ['http://code.jquery.com/jquery.min.js'],
        done: function(err,window) {
            // istanbul ignore if
            if (err) return cb(err);
            
            var $ = window.$;

            cb(err,$(".li-version-list li").first().text().trim());
        }
    });
}

module.exports.getServerUrl = function(version,cb) {
    jsdom.env({
        url: 'https://files.minecraftforge.net/maven/net/minecraftforge/forge/index_'+version+'.html',
        scripts: ['http://code.jquery.com/jquery.min.js'],
        done: function(err,window) {
            // istanbul ignore if
            if (err) return cb(err);
            
            var $ = window.$;

            var relativeLink = $('.downloadsTable td').eq(2).find('li').eq(1).find('.info-link').attr('href');
            var downloadLink = relativeLink?'https://files.minecraftforge.net'+relativeLink:null;
            
            cb(err,downloadLink);
        }
    });
}
module.exports.getServerChecksum = function(version,cb) {
    jsdom.env({
        url: 'https://files.minecraftforge.net/maven/net/minecraftforge/forge/index_'+version+'.html',
        scripts: ['http://code.jquery.com/jquery.min.js'],
        done: function(err,window) {
            // istanbul ignore if
            if (err) return cb(err);
            
            var $ = window.$;

            var hash = $('.downloadsTable td').eq(2).find('li').eq(1).find('.info').contents().filter(function() {return this.nodeType==3}).eq(3).text().trim();
            
            cb(err,hash==''?null:hash);
        }
    });
}
module.exports.downloadServer = function(name,version,cb) {
    var _this = this;
    
    server.prepare(name,function() {
        _this.getServerUrl(version,function(err,url) {
            // istanbul ignore if
            if (err) return cb(err);
            
            var pathname = __dirname+'/../../servers/'+name+'/installer.jar';
            
            request(url)
                .pipe(fs.createWriteStream(pathname))
                .on('finish',function() {
                    _this.getServerChecksum(version,function(err,hash) {
                        checksum.file(pathname, function(err,fileHash) {
                            // istanbul ignore else
                            if (hash==fileHash) {
                                server.createDataFile(name,version,'modded',function(err) {
                                    cb(err);
                                });
                            } else {
                                fs.remove(pathname, function(err) {
                                    _this.downloadServer(name,version,cb);
                                });
                            }
                        });
                    });
                });
        });
    });
}
module.exports.installServer = function(name,cb) {
    var pathname = __dirname+'/../../servers/'+name;
    
    var installerProcess = proc.spawn(
        'java',
        ['-jar', 'installer.jar', '-installServer'],
        {cwd: pathname}
    );
    installerProcess.on('exit', function() {
        fs.remove(pathname+'/installer.jar', function(err) {
            // istanbul ignore if
            if (err) return cb(err);
            fs.readdir(pathname, function(err,files) {
                // istanbul ignore if
                if (err) return cb(err);

//                for (var i=0;i<files.length;i++) {
//                    if (files[i].indexOf('forge-')>-1) {
//                        fs.renameSync(pathname+'/'+files[i],pathname+'/server.jar');
//                        break;
//                    }
//                }
                
                fs.renameSync(pathname+'/'+files[0],pathname+'/server.jar');
                
                cb(err);
            });
        });
    });
}