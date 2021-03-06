/* eslint-disable import/no-extraneous-dependencies */
const { createDefaultConfig } = require('@open-wc/testing-karma')
const merge = require('deepmerge')

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      esm: {
        babelExclude: ['**/node_modules/sinon/**', '**/node_modules/@bundled-es-modules/**', '**/components/reader/selectors/**', '**/pdfjs-dist/**', '**/node_modules/fetch-mock/dist/es5/**'],
        nodeResolve: true,
        babelConfig: {
          // exclude libraries which don't need babel processing for speed
          exclude: ['**/node_modules/sinon/**', '**/node_modules/@bundled-es-modules/**', '**/components/reader/selectors/**', '**/pdfjs-dist/**']
        },
        coverageExclude: ['/js/**', 'components/hooks/onpushstate.js']
      },
      // We might temporarily removing Firefox while we figure out a better configuration for testing visibility.
      browsers: ['Firefox'],
      exclude: ['test/useVisibility.test.js'],
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        { pattern: config.grep ? config.grep : 'test/**/*.test.js', type: 'module' },
        { pattern: 'node_modules/fetch-mock/dist/es5/client-bundle.js', type: 'js' }
      ],
      coverageIstanbulReporter: {
        reports: ['html', 'lcovonly', 'text'],
        dir: 'coverage',
        combineBrowserReports: true,
        skipFilesWithNoCoverage: false,
        thresholds: {
          global: {
            statements: 50,
            branches: 50,
            functions: 50,
            lines: 50
          }
        }
      }

      // you can overwrite/extend the config further
    })
  )
  return config
}
