import Constants from 'js/services/Constants';
import PickColorsCtrl from './pick-colors.ctrl';
import IComponentOptionsCss from 'domains/angular-component-css';


let pickColorsOpts: IComponentOptionsCss = {
	templateUrl: './pick-colors.html',
	controller: PickColorsCtrl,
};

export default angular.module(Constants.MAIN_MODULE)
	.component('pickColors', pickColorsOpts);
