import Keys from 'js/classes/Keys';
describe ('Test jsonEditor component', () => {
	let $componentController,
		component;
	beforeEach(() => {
		angular.mock.module('michaelzucchetta');
	});
	beforeEach(inject((_$componentController_) => {
		$componentController = _$componentController_;
	}));
	
	it ('test char insertion', () => {
		let jsonText: string;
		let insertCharEvent: any = {};
		component = $componentController('jsonEditor', {
			jsonText: jsonText
		});
		/*component.insertCharacter(insertCharEvent);*/
	});
});
