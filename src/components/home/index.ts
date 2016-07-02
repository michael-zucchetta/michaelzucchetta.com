import Constants from 'js/services/constants';
import HomeCtrl from './home.ctrl';
import services from 'js/services/index';
import routes from './routes';

import mz from 'domains';

let homeOpts: mz.IComponentOptionsCss = {
	template: require('./home.html'),
	controller: HomeCtrl,
};

export default angular.module('home', ['ui.router', Constants.SERVICE_MODULE])
	.config(routes)
	.component('home', homeOpts)
	.name;
