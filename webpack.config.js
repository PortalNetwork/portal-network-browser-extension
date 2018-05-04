const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('css/[name].css');
const config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        background: 'background',
        loading: 'loading',
        popup: 'popup',
        error: 'error',
        not404: 'not404'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: "/"
    },
    devServer: {
        compress: true,
        port: 3000
    },
    resolve: {
        modules: [
            path.resolve('src'),
            path.resolve('src/js'),
            path.resolve('src/lib'),
            path.resolve('src/res'),
            path.resolve('node_modules')
        ],
        extensions: ['.js']
    },
    module:{
        rules:[
            {
                type: 'javascript/auto',
                test: /\.(html|json)$/,
                use: 'file-loader?name=[name].[ext]',
                include: path.resolve('src')
            },
            {
                test: /\.(js)$/,
                use: 'babel-loader',
                exclude: /(node_modules)/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: 'url-loader?limit=2000&name=[path][name].[ext]?[hash:8]',
                include: path.resolve('src')
            },
            {
                test: /\.(css)$/,
                use: extractCSS.extract([
                    'css-loader',
                    'postcss-loader'
                ])
            }
        ]
    },
    plugins: [
        extractCSS,
    ]
};

module.exports = config;
