import path from 'path';
import svgr from 'vite-plugin-svgr';

export default {
    plugins: [
        svgr({ exportAsDefault: true }),
    ],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
        ],
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
            generateScopedName: '[name]__[hash:base64:2]',
        },
    },
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8000'),
        __PROJECT__: JSON.stringify('frontend'),
    },
};
