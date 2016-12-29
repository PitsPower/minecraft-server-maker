var chai = require('chai');
var expect = chai.expect;

var version = require('../src/version');

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