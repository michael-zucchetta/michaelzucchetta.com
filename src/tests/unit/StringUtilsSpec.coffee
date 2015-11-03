define ['StringUtils', 'RegexUtils', 'UtilitiesService'], () ->
	StringUtils = RegexUtils = UtilitiesService = null
	describe 'StringUtils methos', () ->
		beforeEach () ->
			module('common')
			inject ($injector) ->
				StringUtils = $injector.get("StringUtils")
				RegexUtils = $injector.get("RegexUtils")
				UtilitiesService = $injector.get("UtilitiesService")
				return
			return
		it 'Removing new lines from string', () ->
			stringText = "test \n test \n test"
			newString = StringUtils.removeNewLines(stringText)
			expect(RegexUtils.newLines.test(newString)).toBe(false)
			return
		
		it 'Removing spaces from string', () ->
			stringText = "test \n test \n test"
			newString = StringUtils.removeSpaces(stringText)
			expect(RegexUtils.spaces.test(newString)).toBe(false)
			return
		
		it 'Removing tabs from string', () ->
			stringText = "test \t test \t test"
			newString = StringUtils.removeTabs(stringText)
			expect(RegexUtils.tabs.test(newString)).toBe(false)
			return
		
		it 'Removing backslashes from string', () ->
			stringText = "test \t test \t test"
			newString = StringUtils.removeEscapes(stringText)
			expect(RegexUtils.backslashes.test(newString)).toBe(false)
			return
		
		it 'Removing tabs/new lines/spaces from string', () ->
			stringText = "\n test \t \ test \n \t test"
			newString = UtilitiesService.removeFormattationFromString(stringText)
			expect(!RegexUtils.tabs.test(newString) && !RegexUtils.spaces.test(newString) && !RegexUtils.newLines.test(newString)).toBe(true)
			return
		return
	return
return
