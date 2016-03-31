let routeResolver = () => {
	this.$get = () => {
		return this;
	};

	this.routeConfig = () => {
		
		let setBaseDirectory = (viewsDir: string, controllersDir: string, cssDir: string): void => {
			Constants.setViewsDirectory(viewsDir);
			Constants.setControllersDirectory(controllersDir);
			Constants.setCssDirectory(cssDir);
		};
	
	};
};
