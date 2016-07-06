'use strict';
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

	getLinks(): ng.IPromise<any>;

	getMenu(): ng.IPromise<any>;

	getIP(): ng.IPromise<any>;
}

export interface IFileUtilities {
	loadFile(file: Blob): ng.IPromise<Event>;

	fromImgToBase64(img: HTMLImageElement): void;
}

export interface IRestProxy {
	handleGetCall(args: any): ng.IPromise<any>;

	handleJsonpCall(args: any): ng.IPromise<any>;

}

export interface IUtils {
	initializeMenu(rawMenu: mz.IMenuEl[]): mz.IMenuEl[];

	removeFormattationFromString(inputString: string): string;
}
}
export default mz;
