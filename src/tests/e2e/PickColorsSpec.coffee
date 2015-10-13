define [], () ->
	describe 'e2e test for pick colors', () ->
		websiteUrl = 'http://localhost:8000'
		sleep = (delay) ->
			start = new Date().getTime()
			while (new Date().getTime() < start + delay) then
			return

		it 'opens page', () ->
			browser.get(websiteUrl)
			browser.waitForAngular().then () ->
				menu = element(By.className('icon-container'))
				menu.click()
				element.all(By.css('.submenu-item')).get(0).click()
				browser.waitForAngular().then () ->
					element.all(By.css('.pick-colors')).then (items) ->
						expect(items.length).toBe(1)
	
	return
return
