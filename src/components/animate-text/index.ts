import IComponentOptionsCss from 'domains/angular-component-css';
import AnimateTextCtrl from './animate-text.ctrl';

let animateTextOpts: IComponentOptionsCss = {
	bindings: {
		dataText: '@animateText'
	},
	templateUrl: '/directives/animate-text/animate-text.html',
	css: '/directives/animate-text/animate-text.css',
	controller: AnimateTextCtrl
};

export default angular.module('animateText', [])
	.component('animateText', animateTextOpts)
	.name;
