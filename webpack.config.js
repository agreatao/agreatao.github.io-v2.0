const NODE_ENV = process.env.NODE_ENV;

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const SpritesmithPlugin = require('webpack-spritesmith');
const config = require("./config");

const HIGHLIGHT_JS = new ExtractTextWebpackPlugin({
    filename: 'css/highlight.css',
    allChunks: true
})

const DEFAULT_CSS = new ExtractTextWebpackPlugin({
    filename: 'css/default.css',
    allChunks: true
})

const PROJECT_LESS = new ExtractTextWebpackPlugin({
    filename: 'css/[name].css',
    allChunks: true
})

module.exports = {
    devtool: 'source-map',
    entry: {
        vendor: ['react', 'react-dom', 'redux', 'react-redux',
            'react-router', 'redux-thunk', 'autoprefixer',
            'add-dom-event-listener', 'moment', 'axios', 'nprogress'],
        config: path.join(__dirname, 'config'),
        main: ['babel-polyfill', path.join(__dirname, 'src/entry')]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            path.join('node_modules')
        ],
        alias: {
            '@': path.join(__dirname, 'src'),
            'loader': path.join(__dirname, 'src/loader'),
            'images': path.join(__dirname, 'src/images'),
            'masters': path.join(__dirname, 'src/masters'),
            'pages': path.join(__dirname, 'src/pages'),
            'components': path.join(__dirname, 'src/components'),
            'lib': path.join(__dirname, 'src/lib'),
            'store': path.join(__dirname, 'src/store'),
            'router': path.join(__dirname, 'src/router'),
            'theme': path.join(__dirname, 'src/theme'),
            'config': path.join(__dirname, 'config')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    limit: 512,
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.mp4$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    limit: 2048,
                    name: 'videos/[name].[ext]'
                }
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            },
            {
                test: /\.(woff2?|svg|ttf|eot)$/,
                loader: 'file-loader',
                query: {
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loader: HIGHLIGHT_JS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: DEFAULT_CSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: PROJECT_LESS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({ // 公共代码提取
            name: ['vendor', 'runtime'],
            filename: 'js/[name].js',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: config.title,
            template: path.join(__dirname, 'src/views/index.html'),
            filename: 'index.html',
            favicon: path.join(__dirname, 'src/views/favicon.ico'),
            inject: true,
            chunks: ['runtime', 'vendor', 'config', 'main'],
            minify: NODE_ENV == 'production' ? {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            } : false
        }),
        // 雪碧图制作插件
        // new SpritesmithPlugin({
        //     src: {
        //         cwd: path.resolve(__dirname, './src/images/icons'),
        //         glob: '*.png'
        //     },
        //     target: {
        //         image: path.resolve(__dirname, './dist/images/sprite.png'),
        //         css: path.resolve(__dirname, './dist/css/sprite.css')
        //     },
        //     // 样式文件中调用雪碧图地址写法
        //     apiOptions: {
        //         cssImageRef: '/images/sprite.png'
        //     },
        //     spritesmithOptions: {
        //         algorithm: 'top-down'
        //     }
        // }),
        HIGHLIGHT_JS,
        DEFAULT_CSS,
        PROJECT_LESS
    ].concat(NODE_ENV == 'production' ? [
        /**
         * 生产模式下的配置
         */
        new webpack.optimize.UglifyJsPlugin({ // js代码压缩
            compress: {
                warnings: false
            }
        }),
        new OptimizeCssAssetsWebpackPlugin({ // css代码压缩
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    ] : [])
}