import imageUtilitiesModule from './index';

import mz from 'domains';

const module: any = angular.mock.module;
const inject: any = angular.mock.inject;

describe('ImageUtilities', () => {
	
	let $service: mz.IImageUtilities;

	beforeEach(module(imageUtilitiesModule));

	beforeEach(inject((_ImageUtilities_: mz.IImageUtilities) => {
		$service = _ImageUtilities_;
	}));

	it('test createImage', () => {
		const hash: string = '3fa341923b';
		const image: HTMLImageElement = $service.createImage(hash);
		expect(image.src).toBe(location.origin + '/' + hash);
	});
});
