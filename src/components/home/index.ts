import Constants from 'js/services/constants';
import HomeCtrl from './home.ctrl';
import IComponentsOptionsCss from 'domains/angular-component-css';
import services from 'js/services/index';
import routes from './routes';

let homeOpts: IComponentsOptionsCss = {
	template: require('./home.html'),
	controller: HomeCtrl,
};

export default angular.module('home', ['ui.router', Constants.SERVICE_MODULE])
	.config(routes)
	.component('home', homeOpts)
	.name;
