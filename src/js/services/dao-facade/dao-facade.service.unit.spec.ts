import DaoFacadeModule from './index';
import DaoFacade from './dao-facade.service';
import UtilitiesService from 'js/services/utils';

import mz from 'domains';

let module: any = angular.mock.module;
let inject: any = angular.mock.inject;

describe('Test dao facade service', () => {

	let $daoFacade: mz.IDaoFacade;
	let $q: ng.IQService;
	let $scope: ng.IScope;
	let $state: mz.IState;
	let $httpBackend: ng.IHttpBackendService;
	let BasicInfoDao: mz.IBasicInfoDao;

	jasmine.getJSONFixtures().fixturesPath = '/base/js/mocks/';

	beforeEach(module(DaoFacadeModule));

	beforeEach(inject((_BasicInfoDao_: mz.IBasicInfoDao, _$q_: ng.IQService,
			_$rootScope_: ng.IRootScopeService, _$httpBackend_: ng.IHttpBackendService) => {
		BasicInfoDao = _BasicInfoDao_;
		$state = {
			setRouteDinamically: (menu: mz.IMenuEl[]): void => {
				// disable tslint error
			},
		};
		$daoFacade = DaoFacade(_BasicInfoDao_, $state);
		$q = _$q_;
		$scope = _$rootScope_.$new();
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('js/mocks/menu.json').respond(200);
	}));

	it ('test get Menu()', () => {
		let deferred: ng.IDeferred<any> = $q.defer();
		let resultValue: mz.IMenuEl[];
		let menu: any = getJSONFixture('menu.json');
		deferred.resolve(menu);
		spyOn($state, 'setRouteDinamically');
		spyOn(BasicInfoDao, 'getMenu').and.returnValue(deferred.promise);
		$daoFacade.getMenu()
			.then((response: any) => {
				resultValue = $daoFacade.resolveMenu(response);
			});
		$scope.$apply();
		expect(UtilitiesService.initializeMenu(menu)).toEqual(resultValue);
		expect($state.setRouteDinamically).toHaveBeenCalled();
	});
});
