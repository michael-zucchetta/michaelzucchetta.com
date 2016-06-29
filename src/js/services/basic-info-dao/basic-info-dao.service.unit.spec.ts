import BasicInfoDaoModule from './index';

import BasicInfoDao from './basic-info-dao.service';

const {
	module,
	inject,
} = angular.mock;

describe('Test basic info dao service', () => {
	
	let $basicInfoDao;
	let $restProxy;
	
	beforeEach(module(BasicInfoDaoModule));

	beforeEach(inject((_RestProxy_) => {
		$restProxy = _RestProxy_;
		$basicInfoDao = BasicInfoDao($restProxy);
	}));

	it('test getLinks()', () => {
		spyOn($restProxy, 'handleGetCall');
		$basicInfoDao.getLinks();
		expect($restProxy.handleGetCall).toHaveBeenCalledWith($basicInfoDao.linksEndpoint);
	});
	
	it('test getMenu()', () => {
		spyOn($restProxy, 'handleGetCall');
		$basicInfoDao.getMenu();
		expect($restProxy.handleGetCall).toHaveBeenCalledWith($basicInfoDao.menuEndpoint);
	});
	
	it('test getIP()', () => {
		spyOn($restProxy, 'handleJsonpCall');
		$basicInfoDao.getIP();
		expect($restProxy.handleJsonpCall).toHaveBeenCalledWith($basicInfoDao.ipInfoEndpoint);
	});

});
