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

	it('test floatOpacity', () => {
		const returnValue: number = $service.floatOpacity(1);
		expect(returnValue).toBe(1 / 255);
	});

	it('test calculateVal', () => {
		let calculatedValue: string = $service.calculateVal(255, 1);
		expect(calculatedValue).toBe('ff');
	});

	it('test calculateVal with no hex value', () => {
		let calculatedValue: string = $service.calculateVal(undefined, undefined);
		expect(calculatedValue).toBe('00');
	});

	it('test calculateVal with low value', () => {
		let calculatedValue: string = $service.calculateVal(9, 1);
		expect(calculatedValue).toBe('09');
	});

	it('fromRgbToHex', () => {
		const point: mz.IRGB = {
			r: 255,
			g: 255,
			b: 0,
			opacity: 255,
		};
		const hexValue: string = $service.fromRgbToHex(point);
		expect(hexValue).toBe('#ffff00');
	});
});
