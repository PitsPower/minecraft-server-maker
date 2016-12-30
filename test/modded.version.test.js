var chai = require('chai');
var expect = chai.expect;

var modded = require('../src/server-types/modded');

describe('version.getAll()', function() {
    it('should include latest version', function(done) {
        modded.version.getAll(function(err,data) {
            expect(data).to.include('1.11.2');
            done();
        });
    });
    it('should not include beta versions', function(done) {
        modded.version.getAll(function(err,data) {
            expect(data).to.not.include('b1.6.2');
            done();
        });
    });
    it('should not include alpha versions', function(done) {
        modded.version.getAll(function(err,data) {
            expect(data).to.not.include('a1.0.4');
            done();
        });
    });
    it('should not include eliminated versions', function(done) {
        modded.version.getAll(function(err,data) {
            expect(data).to.not.include('1.0');
            done();
        });
    });
});
describe('version.getLatestRelease()', function() {
    it('should get latest release version', function(done) {
        modded.version.getLatestRelease(function(err,version) {
            expect(version).to.equal('1.11.2');
            done();
        });
    });
});