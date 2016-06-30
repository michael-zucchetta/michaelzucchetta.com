import JsonEditorCtrl from './json-editor.ctrl';
import IComponentOptionsCss from 'domains/angular-component-css';

let jsonEditorOpts: IComponentOptionsCss = {
        bindings: {
                jsonText: '='
        },
        css: require('./json-editor.scss'),
        templateUrl: ('./json-editor.html'),
        controller: JsonEditorCtrl
};

export default angular.module('jsonEditor', [])
        .component('jsonEditor', jsonEditorOpts)
	.name;
