import PageAdmin from './components/page';

let pageAdminCast: any = PageAdmin;

angular.module('michaelzucchetta')
	.requires
	.push(pageAdminCast.name);
