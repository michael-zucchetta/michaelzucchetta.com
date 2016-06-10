import 'angular';
import asciify from './asciify.directive';

export angular.module('asciify', [])
	.directive('asciify', asciify);
