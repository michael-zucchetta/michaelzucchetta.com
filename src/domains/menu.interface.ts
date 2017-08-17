interface IMenuEl {
	menuUuid: number;

	name: string;
	
	title: string;

	status?: mz.IStatus;

	order: number;

	parentId?: number;

	active: boolean;

	children?: IMenuEl[];

	definition: any;
}
