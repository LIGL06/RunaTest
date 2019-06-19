const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const DEV = process.env.NODE_ENV === 'development';

const WebpackConfig = {
    target: 'web',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },

    mode: DEV
        ? 'development'
        : 'production',

    entry: {
        main: ['@babel/polyfill', './src/client/less/index.less', './src/client/client.js']
    },

    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },

    plugins: [],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: 'babel-loader'
        }]
    }
};

// Development only settings
if (DEV) {
    WebpackConfig.devtool = 'eval-source-map';
    WebpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    WebpackConfig.module.rules.push({
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
    });

    WebpackConfig.devServer = {
        hot: true,
        host: '0.0.0.0',
        contentBase: path.join(__dirname, '/public'),
        publicPath: '/',
        disableHostCheck: true,
        historyApiFallback: true,
        compress: true,
        proxy: {
            '/api': 'http://127.0.0.1:9000',
        },
        stats: 'errors-only',
        noInfo: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        overlay: true,
        inline: true
    };
}

// Production only settings
if (!DEV) {
    WebpackConfig.output.filename = '[name].[chunkhash].js';

    WebpackConfig.plugins.push(
        new CleanWebpackPlugin(['public'], { verbose: false }),
        new webpack.HashedModuleIdsPlugin(),
        new ExtractTextPlugin('style.[chunkhash].css'),
        new TerserPlugin()
    );

    WebpackConfig.module.rules.push({
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: { minimize: true }
                },
                'less-loader'
            ]
        })
    });
}

// Global settings
WebpackConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'client', 'index.html'),
        inject: 'body',
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    }),
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'assets'),
        to: path.resolve(__dirname, 'public', 'assets')
    }])
);

module.exports = WebpackConfig;
