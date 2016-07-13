// require('angular');
// require('angular-mocks');
// require('ui-router');
// require('lodash');
// require('jQuery');

// this is for compiler warning
Object.defineProperty(window, '$', {value: jQuery});

// const testsContext: __WebpackModuleApi.RequireContext = require.context('.', true, /\.unit.spec$/);
const testsContext = require.context('.', true, /\.unit\.spec.ts/);
testsContext.keys().forEach(testsContext);
