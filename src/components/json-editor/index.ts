import JsonEditorCtrl from './json-editor.ctrl';

import mz from 'domains';

const jsonEditorOpts: mz.IComponentOptionsCss = {
	bindings: {
		jsonText: '='
	},
	css: require('./json-editor.scss'),
	templateUrl: require('./json-editor.html'),
	controller: JsonEditorCtrl
};

export default angular.module('jsonEditor', [])
.component('jsonEditor', jsonEditorOpts)
.name;
