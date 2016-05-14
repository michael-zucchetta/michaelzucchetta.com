import jsonEditor from 'directives/json-editor/json-editor';

describe ('Test jsonEditor component', () => {
	let componentController: ng.IComponentControllerService,
		rootScope: ng.IRootScopeService,
		component: ng.IModule;
	console.log(jsonEditor);
	beforeEach(() => {
		angular.mock.module('michaelzucchetta');
		inject(($componentController: ng.IComponentControllerService, $rootScope: ng.IRootScopeService) => {
			componentController = $componentController;
			rootScope = $rootScope;
		});
	});

	it ('test char insertion', () => {
		let jsonText: string;
		let insertCharEvent: any = {};
		componentController('jsonEditor', undefined, rootScope.$new());
		/*component.insertCharacter(insertCharEvent);*/
	});
});
