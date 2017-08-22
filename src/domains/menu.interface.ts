interface IMenuEl {
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
