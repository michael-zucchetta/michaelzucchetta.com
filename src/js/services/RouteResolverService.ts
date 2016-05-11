import angular = require('angular');

class RouteConfig {
	private viewsDirectory: string;
	private controllersDirectory: string;
	private cssDirectory: string;

	constructor() {
		this.viewsDirectory = '/views';
		this.controllersDirectory = '/js/ctrl/';
		this.cssDirectory = '/css/';
	};

	public setBaseDirectories(viewsDir, controllersDir, cssDirectory): void {
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

class RouteResolver {
	
	public $get() {
		return this;
	}

	private routeConfig: RouteConfig;
	
	constructor() {
		this.routeConfig = new RouteConfig();
	};

	public route() {
		let resolve: Function = (baseName: string, path: string, secure: boolean) => {
			if (!path) {
				path = '';
			}
			// move regex
			let nonCamelToeBaseName: string = baseName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
			let routeDef = {
				controller: baseName + 'Ctrl',
				secure: secure || false,
				templateUrl: this.routeConfig.getViewsDirectory() + path + nonCamelToeBaseName + '.html',
				css: this.routeConfig.getCSSDirectory() + path + nonCamelToeBaseName + '.css',
				resolve: {}
			};
			
			routeDef.resolve = {
				load: ['$q', '$rootScope', ($q: ng.IQService, $rootScope: ng.IRootScopeService) => {
						let dependencies = [this.routeConfig.getControllersDirectory() + path + baseName + 'Ctrl.js'];
						return resolveDependencies($q, $rootScope, dependencies)
					}
				]
			};
			return routeDef;
		};
			
		let resolveDependencies = ($q, $rootScope, dependencies) => {
			// IDeferred<T> is what you return in the resolve type
			let deferred: ng.IDeferred<void> = $q.defer()
			require(dependencies, () => {
				deferred.resolve();
				$rootScope.$apply();
			});
			return deferred.promise;
		};
		
		return resolve;
	};
};

export default RouteResolver;
