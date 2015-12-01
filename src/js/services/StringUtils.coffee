define ['premain', 'RegexUtils'], (app) ->
	app.factory "StringUtils", ["RegexUtils", (RegexUtils) ->
		factory = {}
		
		factory.removeNewLines = (string) ->
			newString = string.replace(RegexUtils.newLines, '')
			return newString

		factory.removeSpaces = (string) ->
			newString = string.replace(RegexUtils.spaces, '')
			return newString

		factory.removeTabs = (string) ->
			newString = string.replace(RegexUtils.tabs, '')
			return newString
		
		factory.removeEscapes = (string) ->
			newString = string.replace(RegexUtils.backslashes, '')
			return newString

		return factory
		]
	return
