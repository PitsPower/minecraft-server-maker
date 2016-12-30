var chai = require('chai');
var expect = chai.expect;

var vanilla = require('../src/server-types/vanilla');

describe('vanilla.getDataUrl()', function() {
    it('should get the data url for the latest version', function(done) {
        vanilla.getDataUrl('1.11.2',function(err,url) {
            expect(url).to.equal('https://launchermeta.mojang.com/mc/game/12f260fc1976f6dd688a211f1a906f956344abdd/1.11.2.json');
            done();
        });
    });
    it('should get the data url for a beta version', function(done) {
        vanilla.getDataUrl('b1.6.2',function(err,url) {
            expect(url).to.equal('https://launchermeta.mojang.com/mc/game/c0f2f0bccb56720130a47892620e100ab9ed7f1e/b1.6.2.json');
            done();
        });
    });
});
describe('vanilla.getServerUrl()', function() {
    it('should get the server url for the latest version', function(done) {
        vanilla.getServerUrl('1.11.2',function(err,url) {
            expect(url).to.equal('https://launcher.mojang.com/mc/game/1.11.2/server/f00c294a1576e03fddcac777c3cf4c7d404c4ba4/server.jar');
            done();
        });
    });
    it('should get the server url for any given version', function(done) {
        vanilla.getServerUrl('1.7.10',function(err,url) {
            expect(url).to.equal('https://launcher.mojang.com/mc/game/1.7.10/server/952438ac4e01b4d115c5fc38f891710c4941df29/server.jar');
            done();
        });
    });
    it('should return null for a beta version', function(done) {
        vanilla.getServerUrl('b1.6.2',function(err,url) {
            expect(url).to.be.null;
            done();
        });
    });
});
describe('vanilla.getServerChecksum()', function() {
    it('should get the server checksum for the latest version', function(done) {
        vanilla.getServerChecksum('1.11.2',function(err,checksum) {
            expect(checksum).to.equal('f00c294a1576e03fddcac777c3cf4c7d404c4ba4');
            done();
        });
    });
    it('should get the server checksum for any given version', function(done) {
        vanilla.getServerChecksum('1.7.10',function(err,checksum) {
            expect(checksum).to.equal('952438ac4e01b4d115c5fc38f891710c4941df29');
            done();
        });
    });
    it('should return null for a beta version', function(done) {
        vanilla.getServerChecksum('b1.6.2',function(err,checksum) {
            expect(checksum).to.be.null;
            done();
        });
    });
});
describe('vanilla.downloadServer()', function() {
    it('should get the server file for the given version', function(done) {
        vanilla.downloadServer('vanilla','1.7.10',function(err,url) {
            expect(!err).to.be.true;
            done();
        });
    });
});