import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import buildLoaders from './config/build/buildLoaders';

interface BuildEnv {
    mode: 'development' | 'production'
}

export default (env: BuildEnv) => {
    const isDev = !env.mode || env.mode === 'development';

    return {
        mode: isDev ? 'development' : 'production',
        entry: {
            app: './src/index.tsx',
        },
        devtool: 'inline-source-map',
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: 3000,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
        ],
        module: {
            rules: buildLoaders(isDev),
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            preferAbsolute: true,
            alias: {
                '@': '/src',
            },
        },
        output: {
            filename: '[name].[contenthash].bundle.js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
        },
    };
};
