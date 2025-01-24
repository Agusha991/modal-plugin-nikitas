const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: './src/index.ts',
    mode: "none",
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'nikitaModal',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            vue: 'vue/dist/vue.runtime.esm-bundler.js',
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.scss$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [new VueLoaderPlugin()],
    externals: {
        vue: 'vue', // Vue will not be bundled; it’s an external dependency
    },
};
