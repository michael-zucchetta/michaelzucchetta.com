import DaoFacade from './dao-facade.service';
import BasicInfoDao from '../basic-info-dao';

export default angular.module('dao-facade', [BasicInfoDao, 'ui.router'])
	.service('DaoFacade', DaoFacade)
	.name;
