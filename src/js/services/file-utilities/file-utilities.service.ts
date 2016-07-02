import mz from 'domains';

class FilesUtilities implements mz.IFileUtilities {

	constructor(private $q: ng.IQService) {
	}

	public loadFile(file: Blob): ng.IPromise<Event> {
		let deferred: ng.IDeferred<Event> = this.$q.defer();
		let reader: FileReader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (_file: Event) => deferred.resolve(_file);
		return deferred.promise;
	}

	public fromImgToBase64(img: any): void {
		let canvas: HTMLCanvasElement = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = canvas.height;
		let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		let dataURL: any = canvas.toDataURL(img.type);
		dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
	}
}

let fileUtilitiesFactory: Function = ($q: ng.IQService): mz.IFileUtilities => {
	return new FilesUtilities($q);
};

fileUtilitiesFactory.$inject = ['$q'];

export default fileUtilitiesFactory;
