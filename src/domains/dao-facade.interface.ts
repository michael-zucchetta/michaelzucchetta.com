interface IDaoFacade {
	resolveMenu(menu: any): mz.IMenuEl[];

	getMenu(): ng.IPromise<mz.IMenuEl[]>;
}
