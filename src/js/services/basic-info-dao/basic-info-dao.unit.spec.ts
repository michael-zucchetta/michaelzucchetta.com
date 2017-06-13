import BasicInfoDaoModule from './index';
import BasicInfoDao from './basic-info-dao.service';

import mz from 'domains';

let module: any = angular.mock.module;
let inject: any = angular.mock.inject;

describe('Test basic info dao service', () => {

	let $basicInfoDao: mz.IBasicInfoDao;
	let $restProxy: mz.IRestProxy;

	beforeEach(module(BasicInfoDaoModule));

	beforeEach(inject((_RestProxy_: mz.IRestProxy) => {
		$restProxy = _RestProxy_;
		$basicInfoDao = BasicInfoDao($restProxy);
	}));

	it('test getLinks()', () => {
		spyOn($restProxy, 'handleGetCall');
		$basicInfoDao.getLinks();
		expect($restProxy.handleGetCall).toHaveBeenCalled();
	});

	it('test getMenu()', () => {
		spyOn($restProxy, 'handleGetCall');
		$basicInfoDao.getMenu();
		expect($restProxy.handleGetCall).toHaveBeenCalled();
	});

	it('test getIP()', () => {
		spyOn($restProxy, 'handleJsonpCall');
		$basicInfoDao.getIP();
		expect($restProxy.handleGetCall).toHaveBeenCalled();
	});

});
