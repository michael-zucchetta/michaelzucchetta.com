import 'angular';
import focusClass from 'directives/focus-class/focus-class.directive';
import GlobalCtrl from './global.ctrl';

export default angular.module('global', [focusClass])
	.controller('GlobalCtrl', GlobalCtrl)
	.name; 
