describe('server.js', function() {
    require('./server.test');
});
describe('vanilla.js', function() {
    describe('version', function() {
        require('./vanilla.version.test');
    });
    require('./vanilla.test');
});
describe('modded.js', function() {
    describe('version', function() {
        require('./modded.version.test');
    });
    require('./modded.test');
});