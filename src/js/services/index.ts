import Constants from './constants';
import restProxyFactory from './rest-proxy';
import DaoFacade from './dao-facade';
import sessionFactory from './session';
import fileUtilitiesFactory from './file-utilities';
import basicInfoDaoFactory from './basic-info-dao';
import imagesUtilitiesFactory from './images-utilities';

export default angular.module(Constants.SERVICE_MODULE, ['ui.router', DaoFacade])
	.factory('BasicInfoDao', basicInfoDaoFactory)
	.factory('FilesUtilities', fileUtilitiesFactory)
	.factory('Session', sessionFactory)
	.factory('ImagesUtilities', imagesUtilitiesFactory)
	.factory('RestProxy', restProxyFactory).name;
