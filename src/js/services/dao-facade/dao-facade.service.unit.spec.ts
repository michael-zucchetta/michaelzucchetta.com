import DaoFacadeModule from './index';
import DaoFacade from './dao-facade.service';
import UtilitiesService from 'js/services/utils';

import mz from 'domains';

const {
	module,
	inject,
} = angular.mock;

describe('Test dao facade service', () => {

	let $daoFacade: mz.IDaoService;
	let $q: Ing.IQService;
	let $scope: ng.IScope;
	let $state: angular.ui.IState;
	let $httpBackend: ng.IHttpBackendService;
	let BasicInfoDao: mz.IBasicInfoDao;

	jasmine.getJSONFixtures().fixturesPath = '/base/js/mocks/';

	beforeEach(module(DaoFacadeModule));

	beforeEach(inject((_BasicInfoDao_: mz.IBasicInfoDao, _$q_: ng.IQService, _$rootScope_: ng.IRootScopeService, _$httpBackend_: ng.IHttpBackendService) => {
		BasicInfoDao = _BasicInfoDao_;
		$state = {
			setRouteDinamically: (menu: mz.IMenuEl[]): void => {},
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
