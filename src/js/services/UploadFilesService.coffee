define ['premain'], (app) ->
	app.factory 'UploadFilesService', ['$q', ($q) ->
		factory = {}
		
		factory.loadFile = (file) ->
			deferred = $q.defer()

			reader = new FileReader()
			reader.readAsDataURL(file)			
			reader.onload = (_file) ->
				deferred.resolve(_file)
				return
	
			return deferred.promise


		return factory
	]
	return
