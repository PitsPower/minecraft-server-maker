var chai = require('chai');
var expect = chai.expect;

var fs = require('fs-extra');

var modded = require('../src/server-types/modded');

describe('modded.getServerUrl()', function() {
    it('should get the server url for the latest version', function(done) {
        modded.getServerUrl('1.11.2',function(err,url) {
            expect(url).to.equal('https://files.minecraftforge.net/maven/net/minecraftforge/forge/1.11.2-13.20.0.2201/forge-1.11.2-13.20.0.2201-installer.jar');
            done();
        });
    });
    it('should get the server url for any given version', function(done) {
        modded.getServerUrl('1.7.10',function(err,url) {
            expect(url).to.equal('https://files.minecraftforge.net/maven/net/minecraftforge/forge/1.7.10-10.13.4.1614-1.7.10/forge-1.7.10-10.13.4.1614-1.7.10-installer.jar');
            done();
        });
    });
    it('should return null for a beta version', function(done) {
        modded.getServerUrl('b1.6.2',function(err,url) {
            expect(url).to.be.null;
            done();
        });
    });
});
describe('modded.getServerChecksum()', function() {
    it('should get the server checksum for the latest version', function(done) {
        modded.getServerChecksum('1.11.2',function(err,checksum) {
            expect(checksum).to.equal('14edb633a584a8396f41b2b9b74ca426ee9f75cb');
            done();
        });
    });
    it('should get the server checksum for any given version', function(done) {
        modded.getServerChecksum('1.7.10',function(err,checksum) {
            expect(checksum).to.equal('5b377cd419c2e207dedcde9f011989f0821d337e');
            done();
        });
    });
    it('should return null for a beta version', function(done) {
        modded.getServerChecksum('b1.6.2',function(err,checksum) {
            expect(checksum).to.be.null;
            done();
        });
    });
});
describe('modded.downloadServer()', function() {
    it('should get the server file for the given version', function(done) {
        this.timeout(10000);
        modded.downloadServer('modded','1.7.10',function(err) {
            expect(!err).to.be.true;
            done();
        });
    });
});
describe('modded.installServer()', function() {
    it('should install the server and created a server file', function(done) {
        this.timeout(50000);
        modded.installServer('modded',function(err) {
            fs.access(__dirname+'/../servers/modded/minecraft_server.1.7.10.jar', function(err) {
                expect(!err).to.be.true;
                done();
            });
        });
    });
    it('should delete the installer file', function(done) {
        fs.access(__dirname+'/../servers/modded/installer.jar', function(err) {
            expect(!err).to.be.false;
            done();
        });
    });
});