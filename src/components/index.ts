import global from './global';
import home from './home';
import pickColors from './pick-colors';
import animateText from './animate-text';

export default angular.module('components', [global, home, pickColors, animateText])
	.name;
