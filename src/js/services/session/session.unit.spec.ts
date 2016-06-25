import ISession from 'domains/session';
import Session from './session';

describe('test session\'s factory', () => {
	let session: ISession;
	beforeEach(() => session = Session());

	it('test session set/get attribute', () => {
		let testObj: any = {
			'a': 123
		};
		session.setAttr('test', testObj);
		expect(session.getAttr('test')).toEqual(testObj);
	});
});
