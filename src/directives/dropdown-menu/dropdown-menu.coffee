define ['premain', 'jQuery', 'DaoFacade'], (app, $) ->

	app.directive "dropdownMenu", ['DaoFacade', (DaoFacade) ->
		return {
			restrict: 'A'
			templateUrl: '/directives/dropdown-menu/dropdown-menu.html'
			link: (scope, element, attrs) ->
				#Add ng-click to the element that has the directive
				console.log element
				
				#init the menu
				DaoFacade.getMenu().then (response) ->
					scope.menuEls = response
					return
				return
		}
	]

	return
