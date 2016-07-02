interface IFileUtilities {
	loadFile(file: Blob): ng.IPromise<Event>;

	fromImgToBase64(img: HTMLImageElement): void;
}
