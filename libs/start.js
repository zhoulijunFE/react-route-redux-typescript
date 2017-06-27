var startServer = require('./server'),
    startMockServer = require('./mock/server'),
    config = require('../config');

startServer(config);
startMockServer(config);
