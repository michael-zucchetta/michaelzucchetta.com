import global from './global';
import home from './home';
import pickColors from './pick-colors';
import animateText from './animate-text';
import hexRgbConverter from './hex-rgb-converter';
import login from './login';
import page from './page';

export default angular.module('components', [
	global,
	home,
	pickColors,
	animateText,
	login,
	page,
	hexRgbConverter])
	.name;
