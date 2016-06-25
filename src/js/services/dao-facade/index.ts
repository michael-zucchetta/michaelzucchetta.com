import DaoFacade from './dao-facade.ts';

export default angular.module('dao-facade', [])
	.service('DaoFacade', DaoFacade)
	.name;
