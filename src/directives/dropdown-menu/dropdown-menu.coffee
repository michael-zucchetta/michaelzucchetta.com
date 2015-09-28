define ['premain'], (app) ->

	app.directive "dropdownMenu", [() ->
		return {
			restrict: 'C'
			replace: true
			link: (scope, element, attrs) ->
				
				return
		}
	]

	return
