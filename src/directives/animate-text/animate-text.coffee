define ['premain', 'jQuery'], (app, $) ->
	
	app.directive "animateText", [() ->
		restrict: 'A'
		scope:
			dataText: '@animateText'
		templateUrl: '/directives/animate-text/animate-text.html'
		link: (scope, element, attrs) ->
			scope.letters = scope.dataText.split('');
			return
	
	]
	
	return
