var path = require('path'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    http = require('http'),
    webpackConfig = require(path.join(process.cwd(), './webpack.config'));

function startMockServer(config) {
    var mockConfig = config.mock || {};
    var mockPath = path.join(process.cwd(), './libs/mock/register');
    process.env.REMOTE_DEBUG = mockConfig.remoteDebug;

    var routers = [];
    routers = routers.concat(require(mockPath));
    var app = new (require('express'))();
    app.use('/', routers);

    var server = http.createServer(app); //TODO(zhoulj) add remote https proxy
    server.listen(mockConfig.port, mockConfig.host, function (error) {
        if (error) {
            console.error("MockServer error:", error);
        } else {
            console.info("MockServer Listening:", mockConfig.port)
        }
    })
}

module.exports = startMockServer;