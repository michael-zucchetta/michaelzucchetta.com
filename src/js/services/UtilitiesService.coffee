define ['premain', 'underscore'], (app) ->
	app.factory "UtilitiesService", [() ->
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

		return factory
	]
	return
