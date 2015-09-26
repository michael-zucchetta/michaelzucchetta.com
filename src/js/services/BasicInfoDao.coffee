define ['premain', 'BasicInfoDao', 'angularResource'], (app) ->
	app.factory "BasicInfoDao", ['$http', ($http) ->
		#Temporary
		factory = {}
		factory.getLinks = () ->
			return $http.get '/js/mocks/links.json'
		return factory
	]
	return
