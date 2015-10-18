describe 'e2e test for pick colors', () ->
	websiteUrl = 'http://localhost:8000'
	sleep = (delay) ->
		start = new Date().getTime()
		while (new Date().getTime() < start + delay) then
		return

	loadPage = (callback) ->
		browser.get(websiteUrl)
		browser.waitForAngular().then () ->
			menu = element(By.className('icon-container'))
			menu.click()
			browser.sleep(100)
			console.log   element.all(By.css('.submenu-item a')).get(0)
			element.all(By.css('.submenu-item a')).get(0).click()
			browser.waitForAngular().then callback
		return

	it 'opens page', () ->
		loadPage () ->
			element.all(By.css('.pick-colors')).then (items) ->
				console.log items.length
				browser.pause()
				expect(items.length).toBe(1)
			return
		return
	it 'load image', () ->
		loadPage () ->
			myInputFile = $('#load-pic')
			expect(myInputFile.length).toBe(1)
			myInputFile = myImputFile?[0]
			path = require 'path'
			imgUpload = "./sample-image.jpg"
			absolutePath = path.resolve(__dirname, imgUpload)
			$(myInputFile).sendKeys(absolutePath)
			#waits
			browser.pause()
			#myInputFile.click()
			return
		return
return
