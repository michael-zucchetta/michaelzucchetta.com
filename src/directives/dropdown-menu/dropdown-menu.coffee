define ['premain', 'DaoFacade'], (app) ->

	app.directive "dropdownMenu", ['$http', '$compile', '$timeout', 'DaoFacade', ($http, $compile, $timeout, DaoFacade) ->
		return {
			restrict: 'A'
			template: (element, attrs) ->
				element.attr("ng-click", "showMenu()")
				return
			link: (scope, element, attrs) ->
				#Add ng-click to the element that has the directive
				console.log element
				scope.showMenu = () ->
					scope.showMenu = !scope.showMenu
					return

				#Compile the template and add it after the html element where the attribute has been specified
				$http.get('/directives/dropdown-menu/dropdown-menu.html').then (template) ->
					templateHtml = $ template.data
					compiledTemplate = $compile(templateHtml)(scope)
					element.after(compiledTemplate)
					
					
					$timeout () ->
						newLeft = $(compiledTemplate).parent().width()/2 + $(compiledTemplate).width()/2
						newTop = $(compiledTemplate).parent().height()
						$(compiledTemplate).css("left", -newLeft)
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
