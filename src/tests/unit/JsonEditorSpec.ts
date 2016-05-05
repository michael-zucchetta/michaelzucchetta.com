import jsonEditor = require('directives/json-editor/json-editor');

describe ('Test jsonEditor component', () => {
	let $componentController,
		component;
	console.log(jsonEditor);
	beforeEach(() => {
		angular.mock.module('michaelzucchetta');
		inject((_$componentController_) => {
			$componentController = _$componentController_;
		});
	});
	
	it ('test char insertion', () => {
		let jsonText: string;
		let insertCharEvent: any = {};
		component = $componentController('jsonEditor', {
			jsonText: jsonText
		});
		/*component.insertCharacter(insertCharEvent);*/
	});
});
