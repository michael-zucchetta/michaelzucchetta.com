import PageAdmin from './components/page';
import BlogDao from './services/blog-dao';

let pageAdminCast: any = PageAdmin;

let adminModule = angular.module('Admin', [pageAdminCast.name,
	BlogDao
]);

angular.module('michaelzucchetta')
	.requires
	.push(adminModule.name);
