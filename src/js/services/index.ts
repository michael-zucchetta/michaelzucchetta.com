import 'angular';
import Constants from './constants';
import restProxyFactory from './rest-proxy';
import daoFacadeFactory from './dao-facade';
import sessionFactory from './session';
import fileUtilitiesFactory from './file-utilities';
import basicInfoDaoFactory from './basic-info-dao';
import imagesUtilitiesFactory from './images-utilities';
import 'ui-router';

export default angular.module(Constants.SERVICE_MODULE, ['ui.router'])
	.factory('BasicInfoDao', basicInfoDaoFactory)
	.factory('FilesUtilities', fileUtilitiesFactory)
	.factory('Session', sessionFactory)
	.factory('DaoFacade', daoFacadeFactory)
	.factory('ImagesUtilities', imagesUtilitiesFactory)
	.factory('RestProxy', restProxyFactory).name;
