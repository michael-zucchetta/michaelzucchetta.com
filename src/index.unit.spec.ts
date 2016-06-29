import 'angular';
import 'angular-mocks';
import 'ui-router';
import 'lodash';
import 'jQuery';

window.$ = jQuery;

const testsContext = require.context('.', true, /\.unit.spec$/);
testsContext.keys().forEach(testsContext);
