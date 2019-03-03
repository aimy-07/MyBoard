const path = require('path');

module.exports = {
    target: 'node',
    entry: './ts/index.tsx',  // エントリファイル
    cache: true,
    mode: 'development',  // "production" | "development" | "none"
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    configFile: './tslint.json',
                    typeCheck: true,
                },
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
            { 
                test: /\.(png|jpg|gif|ttf|otf)$/,
                loader: 'file-loader',
                exclude: [
                    /node_modules/,
                ],
                options: {
                    name: '[path][name].[ext]'
                },
            },
        ],
    },
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
        ]
    },
};