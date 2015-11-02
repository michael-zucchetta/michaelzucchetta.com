define ['premain'], (app) ->
	app.factory "StringUtils", ["RegexUtils", (RegexUtils) ->
		factory = {}
		
		factory.removeNewLines = (string) ->
			newString = string.replace(RegexUtils.newLines, '')
			return newString

		return factory
		]
	return
