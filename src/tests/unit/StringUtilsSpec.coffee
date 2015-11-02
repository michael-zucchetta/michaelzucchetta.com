define ['StringUtils', 'RegexUtils'], () ->
	StringUtils = RegexUtils = null
	describe 'StringUtils methos', () ->
		beforeEach () ->
			module('common')
			inject ($injector) ->
				StringUtils = $injector.get("StringUtils")
				RegexUtils = $injector.get("RegexUtils")
				return
			return
		it 'Removing new lines from string', () ->
			stringText = "test \n test \n test"
			newString = StringUtils.removeNewLines(stringText)
			expect(RegexUtils.newLines.test(newString)).toBe(false)
			return

		return
	return
return
