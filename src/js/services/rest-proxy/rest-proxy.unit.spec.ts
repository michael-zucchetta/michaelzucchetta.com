import mz from 'domains';

import restProxyModule from './index';

const module: any = angular.mock.module;
const inject: any = angular.mock.inject;

describe('test RestProxy', () => {

	let $restProxy: mz.IRestProxy;
	let $rootScope: ng.IRootScopeService;
	let $q: ng.IQService;
	let $scope: ng.IScope;
	let $httpBackend: ng.IHttpBackendService;
	let $http: ng.IHttpService;

	beforeEach(module(restProxyModule));

	beforeEach(inject((_RestProxy_: mz.IRestProxy, _$rootScope_: ng.IRootScopeService,
			_$q_: ng.IQService, _$httpBackend_: ng.IHttpBackendService, _$http_) => {
		$restProxy = _RestProxy_;
		$rootScope = _$rootScope_;
		$q = _$q_;
		$scope = $rootScope.$new();
		$httpBackend = _$httpBackend_;
		$http = _$http_;
	}));

	it('test handleGetCall', () => {
		spyOn($restProxy, 'deferredCall');
		$restProxy.handleGetCall('something');
		expect($restProxy.deferredCall).toHaveBeenCalledWith([$http.get, 'something']);
	});

	it('test handleGetCall', () => {
		spyOn($restProxy, 'deferredCall');
		$restProxy.handleJsonpCall('something 2');
		expect($restProxy.deferredCall).toHaveBeenCalledWith([$http.jsonp, 'something 2']);
	});

	it('test deferredCall', () => {
		const dataResponse: any = {
			data: {
				value: 'hola',
			},
		};
		$httpBackend.whenGET('something3').respond(dataResponse);
		let serviceResponse: any;
		$restProxy.handleGetCall('something3').then((response: any) => {
			serviceResponse = response;
		});
		$httpBackend.flush();
		expect(serviceResponse).toEqual(dataResponse.data);
	});
});
