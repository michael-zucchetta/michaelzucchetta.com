interface IMenuEl {
	menuUuid: string;

	name: string;
	
	title?: string;

	status?: mz.IStatus;

	order: number;

	parentUuid?: string;

	active: boolean;

	children?: IMenuEl[];

	definition: IDefinition;

	postUuid?: any;
}
