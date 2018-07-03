var webpack = require('webpack');
 
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
    cache: true,
    entry: {      main:  './views/index.jsx'   },
    output: {    path: 'public/build',        filename: '[name].js'    },
    module: {
        loaders: [
            {test: /\.jsx?$/, loader: 'babel', exclude: /(node_modules|bower_components)/, query: { presets: ['react', 'es2015'] }},
            {
                test: /\.scss/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        definePlugin,
        commonsPlugin
    ]
};