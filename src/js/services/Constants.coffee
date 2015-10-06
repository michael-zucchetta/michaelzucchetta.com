define ['angular'], () ->
	app = angular.module("constants", [])
	app.constant("FUNCTIONS_PREFIX", "functionalities")
	app.constant("MENU_JSON", "/js/mocks/menu.json")
	return
