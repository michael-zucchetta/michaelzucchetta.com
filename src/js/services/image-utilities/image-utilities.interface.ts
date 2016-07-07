interface IImageUtilities {
	loadImage(file: File, callback: Function): void;

	onCompleteImg(img: HTMLImageElement): ng.IPromise<boolean>;

	createImage(hash: string): HTMLImageElement;

	floatOpacity(opacity: number): number;

	calculateVal(val: number, opacity: number): string;

	fromRgbToHex(point: mz.IRGB): string;
}
