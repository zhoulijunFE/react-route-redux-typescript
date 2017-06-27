var path = require('path'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require(path.join(process.cwd(), './webpack.config'));

function startServer(config) {
    var mockConfig = config.mock || {};
    new WebpackDevServer(webpack(webpackConfig), {
        publicPath: webpackConfig.output.publicPath,
        historyApiFallback: true,
        stats: { colors: true },
        hot: true,
        inline: true,
        proxy: {
            "*": {
                target: 'http://' + mockConfig.host + ":" + mockConfig.port,
                bypass: function (req, res, proxyOptions) {
                    if (req.url.toLowerCase().match(
                        /\.(jpeg|jpg|png|gif|css|js|swf|eot|svg|ttf|woff|html|htm|ico|webp)([?#].*)?$/)) {
                    }
                    console.log('Server url:', req.url);
                }
            }
        }
    }).listen(config.port, config.host, function (err, result) {
        if (err) {
            console.log("Server error:", err);
        }
        console.log('Server Listening:', config.port);
    });
}

module.exports = startServer;