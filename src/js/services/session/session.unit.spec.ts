import mz from 'domains';
import Session from './session.service';

describe('test session\'s factory', () => {
	let session: mz.ISession;
	beforeEach(() => session = Session());

	it('test session set/get attribute', () => {
		let testObj: any = {
			'a': 123
		};
		session.setAttr('test', testObj);
		expect(session.getAttr('test')).toEqual(testObj);
	});
});
