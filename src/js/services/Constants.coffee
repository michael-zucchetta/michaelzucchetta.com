define ['angular'], () ->
	app = angular.module("constants", [])
	app.constant("FUNCTIONS_PREFIX", "functionalities")
	app.constant("MENU_JSON", "/js/mocks/menu.json")
	app.constant("DEFAULT_PAGE", "home.html")
	return
