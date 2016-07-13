import ImageUtilities from './image-utilities.service';
import filesUtilitiesModule from '../file-utilities';

export default angular.module('image-utilities', [filesUtilitiesModule])
	.service('ImageUtilities', ImageUtilities)
	.name;
