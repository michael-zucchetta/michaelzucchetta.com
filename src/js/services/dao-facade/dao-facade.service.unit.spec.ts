import DaoFacadeModule from './index';
import DaoFacade from './dao-facade.service';
import UtilitiesService from 'js/services/utils';

const {
	module,
	inject,
} = angular.mock;

describe('Test dao facade service', () => {
	
	let $daoFacade;
	let $q;
	let $scope;
	let $state;
	let $httpBackend;
	let BasicInfoDao;

	jasmine.getJSONFixtures().fixturesPath = '/base/js/mocks/';

	beforeEach(module(DaoFacadeModule));

	beforeEach(inject((_BasicInfoDao_, _$q_, _$rootScope_, _$httpBackend_) => {
		BasicInfoDao = _BasicInfoDao_;
		$state = {
			setRouteDinamically(menu) {
			}
		};
		$daoFacade = DaoFacade(_BasicInfoDao_, $state);
		$q = _$q_;
		$scope = _$rootScope_.$new();
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('js/mocks/menu.json').respond(200);
	}));

	it ('test get Menu()', () => {
		let deferred = $q.defer();
		let resultValue;
		let menu = getJSONFixture('menu.json');
		deferred.resolve(menu);
		spyOn($state, 'setRouteDinamically');
		spyOn(BasicInfoDao, 'getMenu').and.returnValue(deferred.promise);
		$daoFacade.getMenu()
			.then((response) => {
				resultValue = $daoFacade.resolveMenu(response);
			});
		$scope.$apply();
		expect(UtilitiesService.initializeMenu(menu)).toEqual(resultValue);
		expect($state.setRouteDinamically).toHaveBeenCalled();
	});
});
