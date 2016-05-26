import s from 'js/services/Session';

describe('test session\'s factory', () => {
	let session: s.Session;
	console.log(s.Session);
	beforeEach(() => {
		angular.mock.module('michaelzucchetta');
	});

	beforeEach(() => inject((Session: s.Session) => {
		session = Session;
	}));

	it('test session set/get attribute', () => {
		let testObj: any = {
			'a': 123
		};
		session.setAttr('test', testObj);
		expect(session.getAttr('test')).toEqual(testObj);
	});
});
