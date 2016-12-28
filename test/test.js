var chai = require('chai');
var expect = chai.expect;

var server = require('../src/server');
var version = require('../src/version');

describe('server.init()', function() {
    it('should create server folder', function(done) {
        server.folder.remove(function(err) {
            server.init(function(err) {
                expect(!err).to.be.true;
                done();
            });
        });
    });
});
describe('server.folder.remove()', function() {
    it('should delete server folder', function(done) {
        server.folder.remove(function(err) {
            expect(!err).to.be.true;
            done();
        });
    });
});
describe('version.getData()', function() {
    it('should get version data as an object', function(done) {
        version.getData(function(err,data) {
            expect(data).to.be.instanceof(Object);
            done();
        });
    });
});
describe('version.getAll()', function() {
    it('should include latest version', function(done) {
        version.getAll(function(err,data) {
            expect(data).to.include('1.11.2');
            done();
        });
    });
    it('should not include beta versions', function(done) {
        version.getAll(function(err,data) {
            expect(data).to.not.include('b1.6.2');
            done();
        });
    });
    it('should not include alpha versions', function(done) {
        version.getAll(function(err,data) {
            expect(data).to.not.include('a1.0.4');
            done();
        });
    });
    it('should not include eliminated versions', function(done) {
        version.getAll(function(err,data) {
            expect(data).to.not.include('1.2.4');
            done();
        });
    });
});
describe('version.getLatestRelease()', function() {
    it('should get latest release version', function(done) {
        version.getLatestRelease(function(err,version) {
            expect(version).to.equal('1.11.2');
            done();
        });
    });
});
describe('version.getLatestSnapshot()', function() {
    it('should get latest snapshot version', function(done) {
        version.getLatestSnapshot(function(err,version) {
            expect(version).to.equal('1.11.2');
            done();
        });
    });
});
describe('server.getDataUrl()', function() {
    it('should get the data url for the latest version', function(done) {
        server.getDataUrl('1.11.2',function(err,url) {
            expect(url).to.equal('https://launchermeta.mojang.com/mc/game/12f260fc1976f6dd688a211f1a906f956344abdd/1.11.2.json');
            done();
        });
    });
    it('should get the data url for a beta version', function(done) {
        server.getDataUrl('b1.6.2',function(err,url) {
            expect(url).to.equal('https://launchermeta.mojang.com/mc/game/c0f2f0bccb56720130a47892620e100ab9ed7f1e/b1.6.2.json');
            done();
        });
    });
});
describe('server.getServerUrl()', function() {
    it('should get the server url for the latest version', function(done) {
        server.getServerUrl('1.11.2',function(err,url) {
            expect(url).to.equal('https://launcher.mojang.com/mc/game/1.11.2/server/f00c294a1576e03fddcac777c3cf4c7d404c4ba4/server.jar');
            done();
        });
    });
    it('should get the server url for any given version', function(done) {
        server.getServerUrl('1.7.10',function(err,url) {
            expect(url).to.equal('https://launcher.mojang.com/mc/game/1.7.10/server/952438ac4e01b4d115c5fc38f891710c4941df29/server.jar');
            done();
        });
    });
    it('should return null for a beta version', function(done) {
        server.getServerUrl('b1.6.2',function(err,url) {
            expect(url).to.be.null;
            done();
        });
    });
});
describe('server.getServerChecksum()', function() {
    it('should get the server checksum for the latest version', function(done) {
        server.getServerChecksum('1.11.2',function(err,url) {
            expect(url).to.equal('f00c294a1576e03fddcac777c3cf4c7d404c4ba4');
            done();
        });
    });
    it('should get the server checksum for any given version', function(done) {
        server.getServerChecksum('1.7.10',function(err,url) {
            expect(url).to.equal('952438ac4e01b4d115c5fc38f891710c4941df29');
            done();
        });
    });
    it('should return null for a beta version', function(done) {
        server.getServerChecksum('b1.6.2',function(err,url) {
            expect(url).to.be.null;
            done();
        });
    });
});
describe('server.download()', function() {
    it('should get the server file for the given version', function(done) {
        server.download('testing','1.7.10',function(err,url) {
            expect(!err).to.be.true;
            done();
        });
    });
});