module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    ignorePatterns: ['dist', 'node_modules', '*.html', 'example'],
    rules: {
        semi: ['error', 'never'],
        indent: ['error', 4],
        quotes: ['error', 'single'],
        '@typescript-eslint/ban-ts-comment': [
            'error',
            {
                'ts-ignore': 'allow-with-description'
            }
        ],
        'block-spacing': 'error',
        'comma-spacing': 'error',
        'key-spacing': 'off',
        '@typescript-eslint/key-spacing': 'error',
        'no-multi-spaces': 'error',
        'no-trailing-spaces': 'error',
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
        'space-before-blocks': 'off',
        '@typescript-eslint/space-before-blocks': 'error',

        'comma-dangle': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'space-infix-ops': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        // 'func-call-spacing': 'off',
        // '@typescript-eslint/func-call-spacing': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        // babel的generate和traverse有问题，需要用require
        '@typescript-eslint/no-var-requires': 'off'
    }
}
