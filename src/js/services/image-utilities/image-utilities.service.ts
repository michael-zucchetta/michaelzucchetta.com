import mz from 'domains';

class ImageUtilities implements mz.IImageUtilities {

	constructor(private $q: ng.IQService, private $interval: ng.IIntervalService, private FilesUtilities: mz.IFileUtilities) {}

	public loadImage(file: File, callback: Function): void {
		this.FilesUtilities.loadFile(file).then((resolvedFile: any) => {
			let img: HTMLImageElement = this.createImage(resolvedFile.target.result);
			this.onCompleteImg(img)
				.then(() => callback(img));
		});
	}

	public onCompleteImg(img: HTMLImageElement): ng.IPromise<boolean> {
		let deferred: ng.IDeferred<boolean> = this.$q.defer();
		let cancelInterval: ng.IPromise<any> = this.$interval(() => {
			if (img.complete) {
				this.$interval.cancel(cancelInterval);
				deferred.resolve(true);
			}
		}, 30);
		return deferred.promise;
	}

	public createImage(hash: string): HTMLImageElement {
		const image: HTMLImageElement = new Image();
		image.src = hash;
		return image;
	}

	public floatOpacity(opacity: number): number {
		return opacity / 255;
	}

	public calculateVal(val: number, opacity: number): string {
		let hexVal: string;
		if (val * opacity) {
			hexVal = (val * opacity).toString(16);
		}
		if (!hexVal) {
			return '00';
		}
		if (hexVal.length === 1) {
			return '0' + hexVal;
		}
		return hexVal;
	}

	public fromRgbToHex(point: mz.IRGB): string {
		let opacity: number = this.floatOpacity(point.opacity);
		return '#' + this.calculateVal(point.r, opacity) + this.calculateVal(point.g, opacity) + this.calculateVal(point.b, opacity);
	}
}

let imageUtilitiesFactory: Function = ($q: ng.IQService, $interval: ng.IIntervalService, FilesUtilities: any): ImageUtilities => {
	return new ImageUtilities($q, $interval, FilesUtilities);
};

export default imageUtilitiesFactory;
