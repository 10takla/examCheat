import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import buildLoaders from './config/build/buildLoaders';

const config = {
    entry: {
        app: './src/index.tsx',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
        }),
    ],
    module: {
        rules: buildLoaders(),
    },
    loaders: {

    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
};

export default config;
