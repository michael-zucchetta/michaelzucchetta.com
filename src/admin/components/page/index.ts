import PageAdminCtrl from './page-admin.ctrl';

import mz from 'domains';

const pageOpts: mz.IComponentOptionsCss = {
	template: require('./page.html'),
	css: require('./page.scss'),
	controller: PageAdminCtrl,
	controllerAs: '$ctrl',
};

export default angular.module('pageAdmin', ['ui.router', 
	//'ui.tinymce', 
	'ngQuill'])
	.component('pageAdmin', pageOpts)
	.name;
