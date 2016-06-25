import 'angular';
import 'angular-mocks';

const testsContext = require.context('.', true, /\.unit.spec$/);
testsContext.keys().forEach(testsContext);
