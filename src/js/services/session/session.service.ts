import Constants from 'js/services/constants';
import ISession from 'domains/session';

class Session implements ISession {

	private sessionData: any;

	constructor() {
		this.sessionData = {};
	}

	public getAttr(name: string): any {
		return this.sessionData[name];
	}

	public setAttr(name: string, obj: any): void {
		this.sessionData[name] = obj;
	}

}

let sessionFactory: Function = (): ISession => {
	return new Session();
};

export default sessionFactory;