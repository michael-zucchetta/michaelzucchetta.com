namespace mz {
export interface IComponentOptionsCss extends ng.IComponentOptions {
	css?: any;

	template?: any;

}

export interface IClipboardEvent extends Event {
	originalEvent: IClipboardEvent;

	clipboardData?: DataTransfer;
}

export interface IDaoFacade {
	resolveMenu(menu: any): mz.IMenuEl[];

	getMenu(): ng.IPromise<mz.IMenuEl[]>;
}

export interface IMenuEl {
	id: number;

	name: string;

	status: mz.IStatus;

	order: number;

	parentId?: number;

	active: boolean;

	children?: IMenuEl[];

	definition: any;
}

export interface IRGB {
	r: number;
	b: number;
	g: number;
	opacity: number;
}

export interface ISession {

	getAttr(name: string): any;

	setAttr(name: string, obj: any): void;
}

export interface IState extends angular.ui.IState {
	setRouteDinamically(menu: mz.IMenuEl[]): void;
}

export interface IStatus {

	url: string;

	templateUrl: string;

	controller: Function;

}

export interface IBasicInfoDao {

	linksEndpoint: string;

	menuEndpoint: string;

	ipInfoEndpoint: string;

	getLinks(): ng.IPromise<any>;

	getMenu(): ng.IPromise<any>;

	getIP(): ng.IPromise<any>;
}

export interface IFileUtilities {
	loadFile(file: Blob): ng.IPromise<Event>;

	fromImgToBase64(img: HTMLImageElement): void;
}

export interface IImageUtilities {
	loadImage(file: File, callback: Function): void;

	onCompleteImg(img: HTMLImageElement): ng.IPromise<boolean>;

	createImage(hash: string): HTMLImageElement;

	floatOpacity(opacity: number): number;

	calculateVal(val: number, opacity: number): string;

	fromRgbToHex(point: mz.IRGB): string;
}

export interface IRestProxy {
	
	getCall: Function;

	jsonpCall: Function;

	handleGetCall(args: any): ng.IPromise<any>; 

	deferredCall(args: any[]): ng.IPromise<any>;

	handleGetCall(args: any): ng.IPromise<any>;

	handleJsonpCall(args: any): ng.IPromise<any>;

}

export interface IUtils {
	initializeMenu(rawMenu: mz.IMenuEl[]): mz.IMenuEl[];

	removeFormattationFromString(inputString: string): string;
}
}
export default mz;
