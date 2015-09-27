define ['premain', 'BasicInfoDao', 'angularResource'], (app) ->
	app.factory "BasicInfoDao", ['$http', ($http) ->
		#Temporary
		factory = {}
		factory.getLinks = () ->
			$http.get '/js/mocks/links.json'
		
		factory.getMenu = () ->
			$http.get '/js/mocks/menu.json'
		
		return factory
	]
	return
