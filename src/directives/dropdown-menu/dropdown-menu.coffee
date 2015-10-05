define ['premain', 'DaoFacade', 'Constants'], (app) ->

	app.directive "dropdownMenu", ['$http', '$compile', '$timeout', 'DaoFacade', 'FUNCTIONS_PREFIX', ($http, $compile, $timeout, DaoFacade, FUNCTION_PREFIX) ->
		return {
			restrict: 'A'
			template: (element, attrs) ->
				element.attr("ng-click", "showHideMenu()")
				return
			link: (scope, element, attrs) ->
				scope.prefix = FUNCTION_PREFIX
				#Add ng-click to the element that has the directive
				console.log element
				scope.showHideMenu = () ->
					scope.showMenu = !scope.showMenu
					return

				#Compile the template and add it after the html element where the attribute has been specified
				$http.get('/directives/dropdown-menu/dropdown-menu.html').then (template) ->
					templateHtml = $ template.data
					compiledTemplate = $compile(templateHtml)(scope)
					element.after(compiledTemplate)
					element.removeAttr("dropdown-menu")
					$compile(element)(scope)
					
					$timeout () ->
						#+1 is the border of the menu
						newTop = $(element).outerHeight()/2 + 1
						$(compiledTemplate).css("right", 0)
						$(compiledTemplate).css("top", newTop + 1)
						$(compiledTemplate).css("z-index", 100)
						return
					return
				#init the menu
				DaoFacade.getMenu().then (response) ->
					scope.menuEls = response
					return
				return
		}
	]

	return
