import global from './global';
import home from './home';
import pickColors from './pick-colors';
import animateText from './animate-text';
import hexRgbConverter from './hex-rgb-converter';
import login from './login';

export default angular.module('components', [
	global,
	home,
	pickColors,
	animateText,
	hexRgbConverter])
	.name;
