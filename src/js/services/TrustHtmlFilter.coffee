define ['premain'], (app) ->
	app.filter "TrustHtmlFilter", ['$sce', ($sce) ->
		(value, type) ->
			$sce.trustAs(type || 'html', value)
	]

return
