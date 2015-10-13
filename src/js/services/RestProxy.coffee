define ['premain'], (app) ->
	app.factory "RestProxy", ['$q', '$http', ($q, $http) ->
		factory = {}

		data = (response) ->
			return response.data && response.data.data || response.data

		factory.deferredCall = () ->
			fn = Array.prototype.shift.call(arguments, 0)
			deferred = $q.defer()
			fn.apply(null, arguments).then (response) ->
				response.status && deferred.resolve(data(response)) || deferred.reject data(response)
			deferred.promise

		factory.getCall = () ->
			$http.get

		factory.handleGetCall = () ->
			newArgs =  Array.prototype.concat.apply([factory.getCall()], arguments)
			factory.deferredCall.apply(null, newArgs)
		factory
	]
	return
