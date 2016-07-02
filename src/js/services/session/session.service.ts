import mz from 'domains';

class Session implements mz.ISession {

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

let sessionFactory: Function = (): mz.ISession => {
	return new Session();
};

export default sessionFactory;
