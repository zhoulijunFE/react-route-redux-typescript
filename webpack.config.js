const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production' ? true : false;
const isDevTest = process.env.DEV_TEST === 'true' ? true : false;

var staticPath = '/';

module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    entry: {
        index: path.resolve(__dirname, './src/entry.tsx'),
        vendor: ['react', 'react-redux', 'redux-thunk', 'react-router']
    },
    output: {
        filename: isProduction ? '[name]-[hash].js' : '[name]-[hash].min.js',
        chunkFilename: isProduction ? '[name].[chunkhash:8].min.js' : '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: staticPath,
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, use: 'ts-loader' }, //ts loader 早于 js loader
            { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
            {
                test: /.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader"
                })
            },
            { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' },
            { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
            { test: /\.json$/, use: 'json-loader' }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': isProduction,
                'DEV_TEST': isDevTest
            }
        }),
        new ExtractTextPlugin('[name]-[chunkhash:8].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'index.html'),
            chunks: ['vendor', 'index'],
            inject: 'body',
            title: '基础搭建',
            jsPath: staticPath,
            isColumbus: isColumbus,
            locale: isColumbus ? 'en_US' : 'zh_CN',
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
