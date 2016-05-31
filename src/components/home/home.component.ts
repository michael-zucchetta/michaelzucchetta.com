import Constants from 'js/services/Constants';
import InitCtrl from 'components/home/init.ctrl';
import IComponentsOptionsCss from 'domains/angular-component-css';

let homeOpts: IComponentsOptionsCss = {
	templateUrl: 'components/home/home.html',
	controller: InitCtrl,
};



export default angular.module(Constants.MAIN_MODULE)
	.component('home', homeOpts);
