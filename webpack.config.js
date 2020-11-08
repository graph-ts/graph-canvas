const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: ['/node_modules/']
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        filename: 'graph-canvas.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'gcanvas',
        libraryTarget: 'umd'
    },
    externals: {
        '@graph-ts/graph-lib': 'glib'
    }
}