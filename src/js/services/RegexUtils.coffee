define ['premain'], (app) ->
	app.factory "RegexUtils", [() ->
		factory = {}
		
		factory.newLines = new RegExp("\\n", "g")
		
		factory.spaces = new RegExp("\\ ", "g")

		factory.tabs = new RegExp("\\t", "g")
		
		factory.backslashes = new RegExp("\\\\", "g")


		return factory
	]
return
