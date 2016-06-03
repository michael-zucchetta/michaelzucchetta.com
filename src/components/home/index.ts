import 'angular';
import 'ui-router';
import Constants from 'js/services/Constants';
import HomeCtrl from './home.ctrl';
import IComponentsOptionsCss from 'domains/angular-component-css';

let homeOpts: IComponentsOptionsCss = {
	template: require('./home.html'),
	controller: HomeCtrl,
};

export default angular.module('home', ['ui.router'])
	.component('home', homeOpts);
