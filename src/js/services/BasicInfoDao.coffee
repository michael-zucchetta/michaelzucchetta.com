define ['premain', 'RestProxy', 'angularResource'], (app) ->
	app.factory "BasicInfoDao", ['RestProxy', (RestProxy) ->
		#Temporary
		factory = {}

		factory.getLinks = () ->
			RestProxy.handleGetCall '/js/mocks/links.json'
		
		factory.getMenu = () ->
			RestProxy.handleGetCall '/js/mocks/menu.json'
		
		return factory
	]
	return
