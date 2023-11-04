const srcTsFiles = ['src/**/*.ts', 'src/**/*.tsx'];
const srcTsStoriesFiles = ['src/**/*.stories.ts?(x)'];
const srcTsTestFiles = ['src/**/*.test.ts?(x)'];

// cf. https://nextjs.org/docs/app/api-reference/file-conventions
const nextConventionFilesWithTestFiles = [
  'src/app/**/default?(.test).tsx',
  'src/app/**/error?(.test).tsx',
  'src/app/**/layout?(.test).tsx',
  'src/app/**/loading?(.test).tsx',
  'src/app/**/not-found?(.test).tsx',
  'src/app/**/page?(.test).tsx',
  'src/app/**/route?(.test).tsx',
  'src/app/**/template?(.test).tsx',
];

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { project: './tsconfig.json' },
  ignorePatterns: [
    'node_modules/*',
    'src/gql/*',
    'svgr/*',
    '.storybook',
    '.eslintrc.cjs',
    '.prettierrc.cjs',
    'jest.config.mjs',
    'jest.setup.mjs',
    'next.config.mjs',
    'plopfile.mjs',
    'postcss.config.cjs',
    'tailwind.config.cjs',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  plugins: ['import', 'unused-imports', 'tailwindcss'],
  rules: {
    // NOTE: import関連のルール
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: '{next/**,react}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '#/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'object'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: true,
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'unused-imports/no-unused-imports': 'error',

    // NOTE: export関連のルール
    'import/no-anonymous-default-export': 'error',
    'import/group-exports': 'error',

    // NOTE: ESLintの構文関連のルール
    curly: 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSEnumDeclaration',
        message: "Don't declare enums",
      },
    ],
    'no-await-in-loop': 'error',
    'require-await': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'no-nested-ternary': 'error',

    // NOTE: React関連のルール
    'react/display-name': 'error',
    'react/destructuring-assignment': ['error', 'always'],
    'react/jsx-pascal-case': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],

    // NOTE: typescript-eslint関連のルール
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      // NOTE: typeLike(class, interface, typeAlias, enum, typeParameter)は、PascalCase
      {
        selector: ['typeLike'],
        format: ['PascalCase'],
      },
      // NOTE: function, method(classMethod, objectLiteralMethod, typeMethod)は、strictCamelCase
      {
        selector: ['function', 'method'],
        format: ['strictCamelCase'],
        filter: {
          regex: '^_',
          match: false,
        },
      },
      // NOTE: parameter は、strictCamelCase
      // (ただし、未使用の parameter (_で始まる)は除外する)
      {
        selector: ['parameter'],
        format: ['strictCamelCase'],
        filter: {
          regex: '^_',
          match: false,
        },
      },
      // NOTE: variable は、strictCamelCase or UPPER_CASE(固定値定義のみ)
      // (ReactFuncitonComponent は StrictPascalCase で命名するため、types から function を除外する)
      {
        selector: ['variable'],
        types: ['boolean', 'string', 'number', 'array'],
        format: ['strictCamelCase', 'UPPER_CASE'],
      },
      // NOTE: boolean の variable は、特定の prefix をつけて StrictPascalCase
      // (ただし、未使用の variable (_で始まる)は除外する)
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['StrictPascalCase'],
        prefix: ['is', 'can', 'should', 'has'],
        filter: {
          regex: '^_',
          match: false,
        },
      },
    ],

    // NOTE: Tailwind CSS関連のルール
    'tailwindcss/classnames-order': 'error',
    'tailwindcss/enforces-negative-arbitrary-values': 'error',
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/no-arbitrary-value': 'error',
    'tailwindcss/no-custom-classname': 'error',
    'tailwindcss/no-contradicting-classname': 'error',
  },
  overrides: [
    // NOTE: srcTsFiles(exclude srcTsStoriesFiles, nextConventionFilesWithTestFiles)に適用するルール
    {
      files: srcTsFiles,
      rules: {
        'import/no-default-export': 'error',
        'import/exports-last': 'error',
      },
      excludedFiles: [
        ...srcTsStoriesFiles,
        ...nextConventionFilesWithTestFiles,
      ],
    },
    // NOTE: srcTsTestFilesに適用するルール
    {
      files: srcTsTestFiles,
      extends: ['plugin:testing-library/react'],
    },
  ],
};
