import jsonEditorModule from './index';
import JsonEditorCtrl from './json-editor.ctrl';

const {module, inject} = angular.mock;

export default describe ('Test jsonEditor component', () => {
	let controller: ng.IControllerService,
		rootScope: ng.IRootScopeService,
		component: ng.IModule,
		$timeout: ng.ITimeoutService,
		$interval: ng.IIntervalService;

	beforeEach(() => {
		module(jsonEditorModule);
		inject(($controller: ng.IControllerService, $rootScope: ng.IRootScopeService, _$timeout_: ng.ITimeoutService, _$interval_: ng.IIntervalService) => {
			controller = $controller;
			rootScope = $rootScope;
			$timeout = _$timeout_;
			$interval = _$interval_;
		});
	});

	it ('test char insertion', () => {
		let jsonText: string;
		let insertCharEvent: any = {};
		const jsonEditorController = controller(JsonEditorCtrl, {$timeout, $interval});
		// jsonEditorController.insertCharacter(insertCharEvent);
	});
});
