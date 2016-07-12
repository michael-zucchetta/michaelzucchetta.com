interface IMenuEl {
	id: number;

	name: string;

	status?: mz.IStatus;

	order: number;

	parentId?: number;

	active: boolean;

	children?: IMenuEl[];

	definition: any;
}
