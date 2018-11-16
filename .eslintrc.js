module.exports = {
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'plugins': [
        'react'
    ],
    "parser": "babel-eslint",
    'parserOptions': {
        "sourceType": "module",
        "allowImportExportEverywhere": false,
        "codeFrame": true
    },
    settings: {
        react: {
            version: '16.5.1'
        }
    },
    'env': {
        'browser': true,
        'node': true,
        'es6': true,
        'jest': true
    }
};
