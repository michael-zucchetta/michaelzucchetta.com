import PickColorsCtrl from './pick-colors.ctrl';
import services from 'js/services';
import mz from 'domains';

let pickColorsOpts: mz.IComponentOptionsCss = {
	template: require('./pick-colors.html'),
	css: require('./pick-colors.scss'),
	controller: PickColorsCtrl,
};

export default angular.module('pickColors', [services])
	.component('pickColors', pickColorsOpts)
	.name;
