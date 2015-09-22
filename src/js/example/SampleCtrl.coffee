define ['premain'], (app) ->
	app.controller 'SampleCtrl', ['$scope', ($scope) ->
		$scope.sum = (n1, n2) ->
			return "Error" if undefined in [n1, n2]
			return n1 + n2
		return
	]
	return
