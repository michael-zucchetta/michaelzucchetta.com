import mz from 'domains';

import restProxyModule from './index';

const module: any = angular.mock.module;
const inject: any = angular.mock.inject;

describe('test RestProxy', () => {
	
	let $restProxy: mz.IRestProxy;
	
	beforeEach(module(restProxyModule));

	beforeEach(inject((_RestProxy_: mz.IRestProxy) => {
		$restProxy = _RestProxy_;
	}));

	it('test handleGetCall', () => {
		spyOn($restProxy, 'deferredCall');
		$restProxy.handleGetCall('something');
		expect($restProxy.deferredCall).toHaveBeenCalledWith([$restProxy.getCall, 'something']);
	});
});
