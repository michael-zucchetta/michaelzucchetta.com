import Constants from 'js/services/Constants';
import InitCtrl from './init.ctrl';
import IComponentsOptionsCss from 'domains/angular-component-css';

let homeOpts: IComponentsOptionsCss = {
	templateUrl: './home.html',
	controller: InitCtrl,
};

export default angular.module(Constants.MAIN_MODULE)
	.component('home', homeOpts);
