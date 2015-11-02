define ['premain'], (app) ->
	app.factory "RegexUtils", [() ->
		factory = {}
		
		factory.newLines = new RegExp("\\n", "g")

		return factory
	]
return
