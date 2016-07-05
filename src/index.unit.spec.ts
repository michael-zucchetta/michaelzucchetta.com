import 'angular';
import 'angular-mocks';
import 'ui-router';
import 'lodash';
import 'jQuery';

// this is for compiler warning
Object.defineProperty(window, '$', {value: jQuery});

const testsContext: any[] = require.context('.', true, /\.unit.spec$/);
testsContext.keys().forEach(testsContext);
