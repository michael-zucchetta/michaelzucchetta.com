class Constants {
	public static viewsDirectory: string = "/views";
	public static controllersDirectory: string = "/js/ctrl";
	public static cssDirectory: string = "/css/";

	public static setViewsDirectory(viewsDir: string): void {
		Constants.viewsDirectory = viewsDir;
	}
	
	public static setControllersDirectory(controllersDir: string): void {
		Constants.controllersDirectory = controllersDir;
	}
	
	public static setCssDirectory(cssDir: string): void {
		Constants.cssDirectory = cssDir;
	}

	public static getViewsDirectory(): string {
		return Constants.viewsDirectory;
	}
	
	public static getControllersDirectory(): string {
		return Constants.controllersDirectory;
	}
	
	public static getCssDirectory(): string {
		return Constants.cssDirectory;
	}
}
