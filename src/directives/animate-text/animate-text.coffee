define ['premain', 'jQuery'], (app, $) ->
	
	app.directive "animateText", ['$interval', ($interval) ->
		restrict: 'A'
		scope:
			dataText: '@animateText'
		templateUrl: '/directives/animate-text/animate-text.html'
		css: '/directives/animate-text/animate-text.css'
		link: (scope, element, attrs) ->
			scope.letters = []
			scope.lettersBuffer = scope.dataText.split ''
			
			pushLetters = () ->
				scope.letters.push scope.lettersBuffer.shift()
				$interval.cancel scope.endInterval if scope.lettersBuffer.length is 0
				return
			scope.endInterval = $interval pushLetters, 100
			return
	]
	
	return
