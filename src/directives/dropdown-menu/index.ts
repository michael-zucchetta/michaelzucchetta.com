import dropdownMenuDirective from './dropdown-menu';

export default angular.module('dropdownMenu', [])
	.directive('dropdownMenu', dropdownMenuDirective.factory())
	.name;
