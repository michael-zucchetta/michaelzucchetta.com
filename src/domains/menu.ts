interface IMenuEl {
	id: number;

	name: string;

	order: number;

	parentId?: number;

	active: boolean;

	children?: IMenuEl[];
}

export default IMenuEl;
