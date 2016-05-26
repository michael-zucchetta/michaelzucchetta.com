
class Canvas {

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

	private resizeCanvas: EventListener;

	private pixels: any;

	constructor(private canvasId: string) {
		this.canvasId = canvasId;
		this.canvas = document.getElementById(this.canvasId);
			this.scale = 1;
			this.ctx = this.canvas.getContext('2d');
			this.resizeCanvas = (): void => {
				// to be removed, it should not stay here
				let canvasParent: HTMLElement = this.canvas.parentNode;
				let siblingsEls = $(this.canvas).siblings();
				let siblingsHeight: number = _.reduce(siblingsEls, (sum: number, siblingEl) => sum + siblingEl.clientHeight);
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
			};
			window.addEventListener('resize', this.resizeCanvas, false);
			document.addEventListener('mousemove', (event) => {
				this.mouseX = (event.pageX - $(this.canvas).offset().left);
				this.mouseY = (event.pageY - $(this.canvas).offset().top);
			});
	}

	private drawCanvas(canvas): void {
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

	set Scale(scale) {
		this.scale = scale;
	}

	private initCanvasWithImg(img: HTMLImageElement): any {
		this.img = img;
		this.width = this.img.width;
		this.height = this.img.height;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.resizeCanvas(undefined);
	}

	private loadImage(img: HTMLImageElement): void {
		if (img instanceof Image) {
			this.initCanvasWithImg(img);
		}
		else {
			img.onload = this.initCanvasWithImg(img);
		}
	}

	private drawImage(action?): void {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.save();
		if (action instanceof Function) {
			action();
		}
		this.ctx.scale(this.scale, this.scale);
		this.ctx.drawImage(this.img, 0, 0);
		this.pixels = this.ctx.getImageData(0, 0, this.width*this.scale, this.height*this.scale);
		this.ctx.restore();
	}

	private getPixelValue(y, x) {
		let offset: number = y * this.pixInterval * this.pixels.width + x*this.pixInterval;
		return {
			r: this.pixels.data[offset + 0],
			g: this.pixels.data[offset + 1],
			b: this.pixels.data[offset + 2],
			opacity: this.pixels.data[offset + 3]
		}
	}

	// zoom by a factor of 2 and use a cursor as center of the zoomed canvas
	private zoomCanvas(): void {
		this.drawImage(() => {
			let newY = this.mouseY - this.height / 4;
			let newX = this.mouseX - this.width / 4;
			this.scale *= 2;
			this.ctx.translate(-newX, -newY);
		});
	}
}
