define ['premain', 'lodash', 'StringUtils'], (app) ->
	app.factory "UtilitiesService", ['$route', 'StringUtils', 'FUNCTIONS_PREFIX', 'DEFAULT_PAGE', ($route, StringUtils, FUNCTIONS_PREFIX, DEFAULT_PAGE) ->
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
	
		factory.removeFormattationFromString = (string) ->
			newString = StringUtils.removeTabs(string)
			newString = StringUtils.removeSpaces(newString)
			newString = StringUtils.removeNewLines(newString)
			newString = StringUtils.removeEscapes(newString)
			return newString


		return factory
	]
	return
