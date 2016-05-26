import Constants from 'js/services/Constants';

class PickColorsCtrl {

	private canvas;

	private backupCanvases;

	private imageFile;

	private pixelValue;

	private loadPicLabel;

	private pixelHexValue;

	constructor(private $timeout, private ImagesUtilities) {
	}

	public uploadPicture() {
		if (!this.imageFile) {
			return;
		}
		let file = this.imageFile;
		this.canvas = new Canvas('uploaded-picture')
		this.ImagesUtilities.loadImage(file, img => this.canvas.loadImage(img))
	}
	
	public initPickColors() {
		this.canvas = undefined;
		this.loadPicLabel = "Load picture:";
		this.backupCanvases = [];
	}

	public createCanvasBackup() {
		let canvasBackup = document.createElement('canvas');
		canvasBackup.width = this.canvas.width;
		canvasBackup.height = this.canvas.height;
		let ctx = canvasBackup.getContext('2d');
		ctx.drawImage(this.canvas.getCanvas(), 0, 0);
		this.backupCanvases.push(canvasBackup);
	}

	public clickCanvas($event) {
		this.pixelValue = this.canvas.getPixelValue($event.offsetY, $event.offsetX);
		this.pixelHexValue = this.ImagesUtilities.fromRgbToHex(this.pixelValue);
		this.$timeout(() => (<HTMLInputElement> document.getElementById('result-color')).value = this.pixelHexValue);
	}
	
	public zoomCanvas($event) {
		// magic number: To be changed so it is enabled on body and check if the event is within the canvas
		if ($event.keyCode === 122) {
			this.createCanvasBackup();
			this.canvas.zoomCanvas();
		}
		else if ($event.shiftKey && $event.keyCode === 90 && this.backupCanvases.length) {
			this.canvas.setScale(this.canvas.getScale() / 2);
			this.canvas.drawCanvas(this.backupCanvases.pop())
		}

		this.initPickColors();
	}
}

PickColorsCtrl.$inject = ['$timeout', 'ImageUtilities'];

export default angular.module(Constants.MAIN_MODULE)
	.controller('PickColorsCtrl', PickColorsCtrl);
