import mz from 'domains';

export default class Canvas {

	private pixInterval: number = 4;

	private canvas: any;

	private scale: number;

	private ctx: CanvasRenderingContext2D;

	private width: number;

	private height: number;

	private marginHeight: number = 50;

	private scaleX: number;

	private scaleY: number;

	private mouseX: number;

	private mouseY: number;

	private img: HTMLImageElement;

	private pixels: any;

	constructor(private canvasId: string) {
		this.canvasId = canvasId;
		this.canvas = document.getElementById(this.canvasId);
		this.scale = 1;
		this.ctx = this.canvas.getContext('2d');
		window.addEventListener('resize', this.resizeCanvas, false);
		document.addEventListener('mousemove', (event: MouseEvent) => {
			this.mouseX = (event.pageX - $(this.canvas).offset().left);
			this.mouseY = (event.pageY - $(this.canvas).offset().top);
		});
	}

	public drawCanvas(canvas: HTMLCanvasElement): void {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.save();
		this.ctx.drawImage(canvas, 0, 0);
		this.ctx.restore();
	}

	get Canvas(): HTMLCanvasElement {
		return this.canvas;
	}

	get Scale(): number {
		return this.scale;
	}

	set Scale(scale: number) {
		this.scale = scale;
	}

	public loadImage(img: HTMLImageElement): void {
		if (img instanceof Image) {
			this.initCanvasWithImg(img);
		} else {
			img.onload = this.initCanvasWithImg(img);
		}
	}

	public getPixelValue(y: number, x: number): mz.IRGB {
		let offset: number = y * this.pixInterval * this.pixels.width + x * this.pixInterval;
		return {
			r: this.pixels.data[offset + 0],
			g: this.pixels.data[offset + 1],
			b: this.pixels.data[offset + 2],
			opacity: this.pixels.data[offset + 3]
		};
	}

	// zoom by a factor of 2 and use a cursor as center of the zoomed canvas
	public zoomCanvas(): void {
		this.drawImage(() => {
			let newY: number = this.mouseY - this.height / 4;
			let newX: number = this.mouseX - this.width / 4;
			this.scale *= 2;
			this.ctx.translate(-newX, -newY);
		});
	}

	private drawImage(action?: Function): void {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.save();
		if (action instanceof Function) {
			action();
		}
		this.ctx.scale(this.scale, this.scale);
		this.ctx.drawImage(this.img, 0, 0);
		this.pixels = this.ctx.getImageData(0, 0, this.width * this.scale, this.height * this.scale);
		this.ctx.restore();
	}

	private initCanvasWithImg(img: HTMLImageElement): any {
		this.img = img;
		this.width = this.img.width;
		this.height = this.img.height;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.resizeCanvas();
	}

	resizeCanvas(): void {
		// to be removed, it should not stay here
		let canvasParent: HTMLElement = this.canvas.parentNode;
		let siblingsEls: JQuery = $(this.canvas).siblings();
		let siblingsHeight: number = _.reduce(siblingsEls, (sum: number, siblingEl: HTMLElement) => sum + siblingEl.clientHeight);
		// to be checked
		this.width = this.canvas.width = canvasParent.clientWidth;
		this.height = this.canvas.height = canvasParent.clientHeight - siblingsHeight - this.marginHeight;
		if (this.scale === 1 && (this.img.width > this.width || this.img.height > this.height)) {
			// first resize, so first interaction
			this.scaleX = this.width / this.img.width;
			this.scaleY = this.height / this.img.height;
			this.scale = Math.min(this.scaleX, this.scaleY);
		}
		this.drawImage();
	}
}
