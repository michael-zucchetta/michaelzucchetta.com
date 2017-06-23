import LoginCtrl from './login.ctrl';
import services from 'js/services/index';

import mz from 'domains';

const loginOpts: mz.IComponentOptionsCss = {
	template: require('./login.html'),
	css: require('./login.scss'),
	controller: LoginCtrl,
	controllerAs: '$ctrl',
};

export default angular.module('login', ['ui.router', services])
	.component('login', loginOpts)
	.name;
