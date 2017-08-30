namespace mz {
export interface IComponentOptionsCss extends ng.IComponentOptions {
	css?: any;

	template?: any;

}

export interface IBlogDao {
	insertNewPost(postTitle: string, postText: string, postType: string, menuUuid: string, postPublished: boolean): ng.IPromise<any>;
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
	menuUuid: string;

	name: string;
	
	title?: string;

	status?: mz.IStatus;

	order: number;

	parentUuid?: string;

	active: boolean;

	children?: IMenuEl[];

	definition: any;

	pagePost?: any;
}

export interface IRGB {
	r: number;
	g: number;
	b: number;
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

export interface IAuthenticationInterceptor {
	request(config: any): any;

	responseError(rejection: any, response: any): ng.IPromise<any>;
}

export interface IAuth {
	login(username: string, password: string): ng.IPromise<any>;
}

export interface IBasicInfoDao {

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

export interface IPosts {

	getPostByUuid(postUuid: string): ng.IPromise<any>;
}

export interface IRestProxy {

	handleGetCall(args: any): ng.IPromise<any>;

	handleGetCall(args: any): ng.IPromise<any>;

	deferredCall(args: any[]): ng.IPromise<any>;
}

export interface IUtils {
	initializeMenu(rawMenu: mz.IMenuEl[]): mz.IMenuEl[];

	removeFormattationFromString(inputString: string): string;
}
}
export default mz;
