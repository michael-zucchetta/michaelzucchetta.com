namespace mz {
export interface IComponentOptionsCss extends ng.IComponentOptions {
	css?: any;

	template?: any;

}

export interface IBasicInfoDao {

	getLinks(): ng.IPromise<any>;

	getMenu(): ng.IPromise<any>;

}

export interface IDaoFacade {
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

export interface RGB {
	r: number;
	b: number;
	g: number;
	opacity: number;
}

export interface ISession {

	getAttr(name: string): any;

	setAttr(name: string, obj: any) : void;
}

export interface IStatus {

        url: string;

        templateUrl: string;

        controller: Function;

}

export interface IFileUtilities {
	loadFile(file: Blob): ng.IPromise<Event>;

	fromImgToBase64(img: HTMLImageElement): void;
}
}
export default mz;