import FileUtilities from './file-utilities.service';

export default angular.module('fileUtilitiesModule', [])
	.service('FileUtilities', FileUtilities)
	.name;
