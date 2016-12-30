var chai = require('chai');
var expect = chai.expect;

var fs = require('fs-extra');

var server = require('../src/server');

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
describe('server.createFolder()', function() {
    it('should create a server folder', function(done) {
        server.init(function(err) {
            server.createFolder('vanilla', function(err) {
                console.log(err);
                expect(!err).to.be.true;
                done();
            });
        });
    });
});
describe('server.createDataFile()', function() {
    it('should create a data file', function(done) {
        server.createDataFile('vanilla', '1.7.10', 'vanilla', function() {
            fs.access(__dirname+'/../servers/vanilla/msm_data.json', function(err) {
                expect(!err).to.be.true;
                done();
            });
        });
    });
});