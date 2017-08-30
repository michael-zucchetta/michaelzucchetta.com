import BasicInfoDao from './basic-info-dao.service';
import RestProxy from '../rest-proxy';

export default angular.module('basic-info-dao', [RestProxy])
	.service('BasicInfoDao', BasicInfoDao)
	.name;
