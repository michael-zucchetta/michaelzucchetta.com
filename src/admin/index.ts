import PageAdmin from './components/page';
console.log('ohiiii', angular.module('michaelzucchetta').name);
export default angular.module('Admin', ['michaelzucchetta'])
	.component('pageAdmin', PageAdmin)
	.name;

