define ['premain'], (app) ->

	app.directive "dropdownMenu", [() ->
		return {
			restrict: 'E'
			replace: true
			link: (scope, element, attrs) ->
				return
		}
	]

	return
