import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default (isDev: boolean) => {
    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };
    const stylesLoader = {
        test: /\.s[ac]ss|css$/,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                    },
                },
            },
            'sass-loader',
        ],
        exclude: /node_modules/,
    };

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    return [
        svgLoader,
        stylesLoader,
        tsLoader,
    ];
};
