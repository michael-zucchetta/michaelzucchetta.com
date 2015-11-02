define ['premain', 'lodash'], (app) ->
	app.factory "UtilitiesService", ['$route', 'FUNCTIONS_PREFIX', 'DEFAULT_PAGE', ($route, FUNCTIONS_PREFIX, DEFAULT_PAGE) ->
		factory = {}
		
		factory.initializeMenu = (rawMenu) ->
			menu = {}
			_.each rawMenu, (element) ->
				if element.id in menu then return
				if not element.parentId
					if not menu[element.id] then menu[element.id] = {}
					_.each element, (attr, key) ->
						menu[element.id][key] = attr
						return
				else
					if !menu[element.parentId].children then  menu[element.parentId].children = []
					menu[element.parentId].children.push element
				return
			return menu

		factory.setRouteDinamically = (menu) ->
			route = $route.route
			_.each menu, (menuItem) ->
				$route.when('/' + FUNCTIONS_PREFIX + '/' + menuItem.id, route.resolve(menuItem.name)) if menuItem.active is true
				return
			$route.otherwise(DEFAULT_PAGE)
			$route.reload()
			return
	


		return factory
	]
	return
