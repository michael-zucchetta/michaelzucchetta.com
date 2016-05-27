
class RouteConfig {
	private viewsDirectory: string;
	private controllersDirectory: string;
	private cssDirectory: string;

	constructor() {
		this.viewsDirectory = '/views/';
		this.controllersDirectory = '/js/ctrl/';
		this.cssDirectory = '/css/';
	};

	public setBaseDirectories(viewsDir: string, controllersDir: string, cssDirectory: string): void {
		this.viewsDirectory = viewsDir;
		this.controllersDirectory = controllersDir;
		this.cssDirectory = cssDirectory;
	};

	public getViewsDirectory(): string {
		return this.viewsDirectory;
	};

	public getControllersDirectory(): string {
		return this.controllersDirectory;
	};

	public getCSSDirectory(): string {
		return this.cssDirectory;
	};

};
class RouteDef {
	public controller: string;
	public secure: boolean;
	public templateUrl: string;
	public css: string;
	public resolve: any;
}

export class RouteResolver {

	constructor() {
		this.routeConfig = new RouteConfig();
	}

	resolveWithParams = (baseName: string, path: string, secure: boolean): RouteDef => {
		if (!path) {
			path = '';
		}
		// move regex
		let nonCamelToeBaseName: string = baseName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		let routeDef: RouteDef = {
			controller: baseName + 'Ctrl',
			css: this.routeConfig.getCSSDirectory() + path + nonCamelToeBaseName + '.css',
			secure: secure || false,
			templateUrl: this.routeConfig.getViewsDirectory() + path + nonCamelToeBaseName + '.html',
			resolve: {
				load: ['$q', '$rootScope', ($q: ng.IQService, $rootScope: ng.IRootScopeService) => {
						let dependencies = [this.routeConfig.getControllersDirectory() + path + baseName + '.ctrl.js'];
						return this.resolveDependencies($q, $rootScope, dependencies);
					}
				]
			}
		};

		return routeDef;
	};

	resolve = (baseName: string): RouteDef => {
		return this.resolveWithParams(baseName, undefined, undefined);
	};

	public $get(): RouteResolver {
		return this;
	}

	public route = {
		resolve: this.resolve
	};

	private routeConfig: RouteConfig;

	private resolveDependencies ($q: ng.IQService, $rootScope: ng.IRootScopeService, dependencies): ng.IPromise<void> {
		// the IDeferred<T> is what you return in the resolve type
		let deferred: ng.IDeferred<void> = $q.defer<void>();
		require(dependencies, () => {
			deferred.resolve();
			$rootScope.$apply();
		});
		return deferred.promise;
	}
};

export default RouteResolver;
