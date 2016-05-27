import ISession from 'domains/session';
import 'js/services/Session';

describe('test session\'s factory', () => {
	let Session: ISession;
	beforeEach(() => angular.mock.module('michaelzucchetta'));

	beforeEach(() => inject((_Session_: ISession) => {
		Session = _Session_;
	}));

	it('test session set/get attribute', () => {
		let testObj: any = {
			'a': 123
		};
		Session.setAttr('test', testObj);
		expect(Session.getAttr('test')).toEqual(testObj);
	});
});
