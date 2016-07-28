import Utils from './utils';

import mz from 'domains';

describe('Test Utils', () => {

	let menuItem1: mz.IMenuEl;
	let menuItem2: mz.IMenuEl;

	beforeEach(() => {
		menuItem1 = {
			id: 1,
			parentId: undefined,
			name: 'Menu Element 1',
			active: true,
			order: 1,
			definition: 'test',
		};
		menuItem2 = {
			id: 2,
			parentId: 1,
			name: 'Menu Element 2',
			active: true,
			order: 1,
			definition: 'test',
		};
	});

	it('test addElementToMenu', () => {
		let rawMenu: mz.IMenuEl[] = [];
		const resultMenu: mz.IMenuEl[] = Utils.addElementToMenu(rawMenu, menuItem1);
		let compareMenu: mz.IMenuEl[] = [];
		compareMenu[1] = menuItem1;
		expect(resultMenu).toEqual(compareMenu);
	});

	it('test addElementToMenu with parentId', () => {
		let rawMenu: mz.IMenuEl[] = [];
		rawMenu[1] = menuItem1;
		const resultMenu: mz.IMenuEl[] = Utils.addElementToMenu(rawMenu, menuItem2);
		let compareMenu: mz.IMenuEl[] = [];
		compareMenu[1] = menuItem1;
		compareMenu[1].children = [menuItem2];
		expect(resultMenu).toEqual(compareMenu);
	});

	it('test initializeMenu', () => {
		let rawMenu: mz.IMenuEl[] = [];
		menuItem2 = {
			id: 2,
			parentId: 1,
			name: 'Menu Element 2',
			active: true,
			order: 1,
			definition: 'test',
			children: undefined,
		};
		rawMenu.push(menuItem1);
		rawMenu.push(menuItem2);
		let compareMenu: mz.IMenuEl[] = [];
		compareMenu[menuItem1.id] = angular.copy(menuItem1);
		compareMenu[menuItem1.id].children = [menuItem2];
		compareMenu.splice(0, 1);
		const resultMenu: mz.IMenuEl[] = Utils.initializeMenu(rawMenu);
		expect(resultMenu).toEqual(compareMenu);
	});

	it('test removeFormattationFromString', () => {
		let unformattedString: string = `\n\n\n
			\t    m y n a m\ne`;
		const formattedString: string = Utils.removeFormattationFromString(unformattedString);
		expect(formattedString).toBe('myname');
	});

});
