import PageAdminCtrl from './page-admin.ctrl';
import services from 'js/services/index';

import mz from 'domains';

const pageOpts: mz.IComponentOptionsCss = {
	template: require('./page-admin.html'),
	css: require('./page-admin.scss'),
	controller: PageAdminCtrl,
	controllerAs: '$ctrl',
};

export default angular.module('pageAdmin', ['ui.router', 
	services,
	'ngQuill'])
	.component('pageAdmin', pageOpts)
	name;
