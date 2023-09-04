module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-filename-extension': [
            2, { extensions: ['.jsx', '.tsx'] },
        ],
        indent: [2, 4],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'no-unused-vars': 0,
        'no-undef': 1,
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'max-len': [2, { ignoreComments: true, code: 120 }],
    },
};
