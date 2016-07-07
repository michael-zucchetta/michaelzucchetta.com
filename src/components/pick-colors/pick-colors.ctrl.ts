import Canvas from 'js/classes/canvas';
import mz from 'domains';

class PickColorsCtrl {

	private canvas: any;

	private backupCanvases: any[];

	private imageFile: File;

	private pixelValue: mz.IRGB;

	private loadPicLabel: string;

	private pixelHexValue: string;

	constructor(private $timeout: ng.ITimeoutService, private ImagesUtilities: mz.IImageUtilities) {
	}

	public uploadPicture(): void {
		if (!this.imageFile) {
			return;
		}
		this.canvas = new Canvas('uploaded-picture');
		this.ImagesUtilities.loadImage(this.imageFile, (img: HTMLImageElement) => this.canvas.loadImage(img));
	}

	public initPickColors(): void {
		this.canvas = undefined;
		this.loadPicLabel = 'Load picture:';
		this.backupCanvases = [];
	}

	public createCanvasBackup(): void {
		let canvasBackup: HTMLCanvasElement = document.createElement('canvas');
		canvasBackup.width = this.canvas.width;
		canvasBackup.height = this.canvas.height;
		let ctx: CanvasRenderingContext2D = canvasBackup.getContext('2d');
		ctx.drawImage(this.canvas.getCanvas(), 0, 0);
		this.backupCanvases.push(canvasBackup);
	}

	public clickCanvas($event: MouseEvent): void {
		this.pixelValue = this.canvas.getPixelValue($event.offsetY, $event.offsetX);
		this.pixelHexValue = this.ImagesUtilities.fromRgbToHex(this.pixelValue);
		this.$timeout(() => (<HTMLInputElement> document.getElementById('result-color')).value = this.pixelHexValue);
	}

	public zoomCanvas($event: KeyboardEvent): void {
		// magic number: To be changed so it is enabled on body and check if the event is within the canvas
		if ($event.keyCode === 122) {
			this.createCanvasBackup();
			this.canvas.zoomCanvas();
		} else if ($event.shiftKey && $event.keyCode === 90 && this.backupCanvases.length) {
			this.canvas.setScale(this.canvas.getScale() / 2);
			this.canvas.drawCanvas(this.backupCanvases.pop());
		}

		this.initPickColors();
	}
}

PickColorsCtrl.$inject = ['$timeout', 'ImagesUtilities'];

export default PickColorsCtrl;
