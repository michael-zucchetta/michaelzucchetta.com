import RGB from 'domains/rgb';

class ImageUtilities {

	constructor(private $q: ng.IQService, private $interval: ng.IIntervalService, private FilesUtilities) {}

	public loadImage(file, callback) {
		this.FilesUtilities.loadFile(file).then((resolvedFile) => {
			let img = this.createImage(resolvedFile.target.result);
			this.onCompleteImg(img)
				.then(() => callback(img));
		});
	}

	public onCompleteImg(img): ng.IPromise<boolean> {
		let deferred = this.$q.defer();
		let cancelInterval = this.$interval(() => {
			if (img.complete) {
				this.$interval.cancel(cancelInterval);
				deferred.resolve(true);
			}
		}, 30);
		return deferred.promise;
	}

	public createImage(hash: string) {
		let image = new Image();
		image.src = hash;
		return image;
	}

	public floatOpacity(opacity: number): number {
		return opacity / 255;
	}

	public calculateVal(val: number, opacity: number): string {
		let hexVal;
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

	public fromRgbToHex(point: RGB): string {
		let opacity = this.floatOpacity(point.opacity);
		return '#' + this.calculateVal(point.r, opacity) + this.calculateVal(point.g, opacity) + this.calculateVal(point.b, opacity);
	}
}

let imageUtilitiesFactory: Function = ($q: ng.IQService, $interval: ng.IIntervalService, FilesUtilities) => {
	return new ImageUtilities($q, $interval, FilesUtilities);
};

export default imageUtilitiesFactory;
