import GlobalCtrl from './global.ctrl';
import mz from 'domains';

const globalOpts: mz.IComponentOptionsCss = {
	template: require('./global.html'),
	controller: GlobalCtrl,
	controllerAs: '$ctrl',
};

export default angular.module('global', [])
.component('global', globalOpts)
.name;
