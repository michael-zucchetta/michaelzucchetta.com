import PostsDao from './posts.service';
import RestProxy from '../rest-proxy';

export default angular.module('posts', [RestProxy])
	.service('PostsDao', PostsDao)
	.name;
