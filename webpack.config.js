const path = require('path');
const webpack = require('webpack');
const WebpackZipPlugin = require('webpack-zip-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
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
        filename: '[name].js?[hash:8]',
        publicPath: process.env.NODE_ENV === "development" ? "/" : "./"
    },
    resolve: {
        alias: {
            vue: process.env.NODE_ENV === "development" ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js'
        },
        modules: [
            path.resolve('src'),
            path.resolve('src/images'),
            path.resolve('src/components'),
            path.resolve('src/assets'),
            path.resolve('node_modules')
        ],
        extensions: ['.js']
    },
    module:{
        rules:[
            {
                test: /\.(sass|scss)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        'options':{
                            // data: `@import "./src/scss/global/global.scss";`
                        }
                    }
                    
                ]
            },
            {
                test: /\.svg$/,
                use: 'vue-svg-loader',
            },
            {
                test: /\.(vue)$/,
                use: 'vue-loader',
            },
            {
                test: /\.(js)$/,
                use: 'babel-loader',
                exclude: /(node_modules)/,
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/,
                include: path.resolve('src/images'),
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 3000,
                            name:'[path][name].[ext]?[hash:8]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new WebpackZipPlugin({
            initialFile: './dist',
            endPath: './',
            zipName: 'dist.zip',
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Portal Network',
            filename: 'popup.html',
            template: 'template/popup.html',
            chunks: [ 'popup' ],
        }),
        new HtmlWebpackPlugin({
            title: 'Portal Network | loading',
            filename: 'loading.html',
            template: 'template/loading.html',
            chunks: [ 'loading' ],
        }),
        new HtmlWebpackPlugin({
            title: 'Portal Network | Error',
            filename: 'error.html',
            template: 'template/error.html',
            chunks: [ 'error' ],
        }),
        new HtmlWebpackPlugin({
            title: 'Portal Network | 404',
            filename: '404.html',
            template: 'template/error.html',
            chunks: [ 'not404' ],
        }),
        new CopyWebpackPlugin([
            { from: 'assets', to: 'assets' },
            { from: 'json', to: './' },
        ]),
        new webpack.LoaderOptionsPlugin({
            vue: {
                postcss: [require('autoprefixer')(
                    {
                        browsers: ['> 1%', 'last 5 versions', 'Firefox >= 45', 'iOS >=8', 'Safari >=8','ie >= 10']
                    }
                )]
            }
        })
    ]
};

module.exports = config;
