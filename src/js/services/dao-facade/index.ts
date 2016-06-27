import DaoFacade from './dao-facade.service.ts';

export default angular.module('dao-facade', [])
	.service('DaoFacade', DaoFacade)
	.name;
