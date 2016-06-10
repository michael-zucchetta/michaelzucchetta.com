import 'angular';
import asciify from './asciify';
import dropdownMenu from './dropdown-menu';
import focusClass from './focus-class';
// import jsonEditor from './json-editor';
// import textEditor from './text-editor';

export default angular.module('directives', [asciify, dropdownMenu, focusClass])
	.name;
