import Constants from 'js/services/Constants';

module services {
	export class Session {

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

	let sessionFactory: Function = () => {
		return new Session();
	};

	angular.module(Constants.MAIN_MODULE).factory('Session', sessionFactory);
}

export default services;
