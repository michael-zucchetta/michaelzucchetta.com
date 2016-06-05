import Constants from 'js/services/Constants';

class FilesUtilities {

	constructor(private $q) {
	}
	
	public loadFile(file) {
		let deferred = this.$q.defer();
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (_file) => deferred.resolve(_file);
		return deferred.promise;
	}

	public fromImgToBase64(img) {
		let canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = canvas.height;
		let ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		let dataURL = canvas.toDataURL(img.type);
		dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	}
}

let fileUtilitiesFactory = ($q) => {
	return new FilesUtilities($q);
}

fileUtilitiesFactory.$inject = ['$q'];

export default fileUtilitiesFactory;
