import BlogCtrl from './blog.ctrl';
import mz from 'domains';

const blogOpts: mz.IComponentOptionsCss = {
	template: require('./blog.html'),
	controller: BlogCtrl,
	controllerAs: '$ctrl',
}

export default angular.module('blog', [])
	.component('blog', blogOpts)
	.name;

