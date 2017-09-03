const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const NODE_ENV = process.env.NODE_ENV || 'development';
const envConfig = require('./src/config/' + NODE_ENV);

let env = {};
// (NOTE)zhoulj 对象value转化字符串
for (let prop in envConfig) {
    env[prop] = JSON.stringify(envConfig[prop]);
}
// (NOTE)zhoulj 去掉STATIC_PATH 双引号
const STATIC_PATH = JSON.parse(env['STATIC_PATH']);

module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    entry: {
        index: path.resolve(__dirname, './src/entry.tsx'),
        vendor: ['react', 'react-redux', 'redux-thunk', 'react-router'],
        common: ['jgui']
    },
    output: {
        filename: '[name]-[hash].min.js',
        chunkFilename: '[name]-[chunkhash:8]-min.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: STATIC_PATH,
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, use: 'ts-loader' },
            // (NOTE) zhoulj ExtractTextPlugin, css外部link引入
            // postcss-loader、plugin autoprefixer添加css prefix
            {
                test: /.s?[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer]
                            }
                        }
                    }, "sass-loader"]
                })
            },
            { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'url-loader' },
            { test: /\.(png|svg|jpg|gif)$/, use: 'url-loader' }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new ExtractTextPlugin(
            {
                'filename': '[name]-[chunkhash:8].css'
            }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'common']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'index.html'),
            chunks: ['vendor', 'common', 'index'],
            inject: 'body',
            title: '',
            jsPath: STATIC_PATH,
            locale: env.LOCALE,
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

