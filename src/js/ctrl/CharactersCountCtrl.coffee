define ['premain'], (app) ->
	app.controller 'CharactersCountCtrl', ['$scope', ($scope) ->
		#load file in word/txt/html
		$scope.countCharsAndWords = () ->
			$scope.charactersCount = $scope.analysedText.length
			$scope.wordsCount = $scope.analysedText.split(" ")?.length		
			return
		return
		]
	return
