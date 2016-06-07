import Constants from 'js/services/constants';
import PickColorsCtrl from './pick-colors.ctrl';
import IComponentOptionsCss from 'domains/angular-component-css';


let pickColorsOpts: IComponentOptionsCss = {
	template: require('./pick-colors.html'),
	css: require('./pick-colors.scss'),
	controller: PickColorsCtrl,
};

export default angular.module(Constants.MAIN_MODULE)
	.component('pickColors', pickColorsOpts);
