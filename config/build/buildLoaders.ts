export default () => {
    const loaders = [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    },
    {
        test: /.s[ac]css/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.modules.')),
                    },
                },
            },
            'sass-loader',
        ],
        exclude: /node_modules/,
    },
    ];

    return loaders;
};
