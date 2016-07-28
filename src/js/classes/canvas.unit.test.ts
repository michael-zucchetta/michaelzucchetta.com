import Canvas from './canvas';

import mz from 'domains';

describe('test canvas class', () => {

	let canvas: any;

	beforeEach(() => {
		canvas = new Canvas();
		canvas.pixels = {
			data: [
				200,
				0,
				200,
				1,
			],
		};
	});

	it('test getPixelValue of the first pixel', () => {
		const pixel: mz.IRGB = canvas.getPixelValue(0, 0);
		expect(pixel).toEqual({
			r: 200,
			g: 0,
			b: 200,
			opacity: 1,
		});
	});

	it('test loadImage with string', () => {
		const img: HTMLImageElement = document.createElement('img');
		canvas.loadImage(img);
	});
});
