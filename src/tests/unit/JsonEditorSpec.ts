import Keys from 'js/classes/Keys';
import jsonEditor from 'directives/json-editor/json-editor';
describe ('Test jsonEditor component', () => {
	let $componentController,
		component;
	beforeEach(() => {
		angular.mock.module('michaelzucchetta');
		inject((_$componentController_) => {
			$componentController = _$componentController_;
		})
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
