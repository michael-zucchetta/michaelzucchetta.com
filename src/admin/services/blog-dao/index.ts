import BlogDao from './blog-dao.service'

export default angular.module('blog-dao', [])
	.service('BlogDao', BlogDao)
	.name;
