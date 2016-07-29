import hexRgbConverterController from './hex-rgb-converter.controller';

import mz from 'domains';

const hexRgbConverterComponent: mz.IComponentOptionsCss = {
	template: require('./hex-rgb-converter.html'),
	css: require('./hex-rgb-converter.scss'),
	controller: hexRgbConverterController,
	controllerAs: '$ctrl',
};

export default angular.module('hexRgbConverter', [])
.component('hexRgbConverter', hexRgbConverterComponent)
.name;
