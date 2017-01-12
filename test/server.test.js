var chai = require('chai');
var expect = chai.expect;

var fs = require('fs-extra');

var server = require('../src/server');

describe('server.folder.create()', function() {
    it('should create server folder', function(done) {
        server.folder.remove(function(err) {
            server.folder.create(function(err) {
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
describe('server.prepare()', function() {
    it('should create a server folder', function(done) {
        server.prepare('vanilla', function(err) {
            console.log(err);
            expect(!err).to.be.true;
            done();
        });
    });
});