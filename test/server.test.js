var chai = require('chai');
var expect = chai.expect;

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