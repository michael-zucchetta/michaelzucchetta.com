import LoginCtrl from './page.ctrl';
import services from 'js/services/index';

import mz from 'domains';

const pageOpts: mz.IComponentOptionsCss = {
	template: require('./page.html'),
	css: require('./page.scss'),
	controller: LoginCtrl,
	controllerAs: '$ctrl',
};

export default angular.module('page', ['ui.router', 
	//'ui.tinymce', 
	services])
	.component('page', pageOpts)
	.name;
