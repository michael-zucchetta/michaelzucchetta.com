describe ('e2e test for pick colors', () => {
	let websiteUrl = 'http://localhost:8000';
	let sleep = (delay) => {
		let start = new Date().getTime();
		while (new Date().getTime() < start + delay) ;
	}

	let loadPage = (callback: Function) => {
		browser.get(websiteUrl);
		browser.waitForAngular().then(() => {
			let menu = element(By.className('icon-container'));
			menu.click();
			browser.sleep(100);
			// console.log   element.all(By.css('.submenu-item a')).get(0)
			element.all(By.css('.submenu-item a')).get(0).click();
			browser.waitForAngular()
				.then(callback);

		});
	};

	it ('opens page', () => {
		loadPage(() => {
			element.all(By.css('.pick-colors')).then((items) => {
				console.log("ITEMS", items.length);
				expect(items.length).toBe(1);
			});
		});
	});

	it ('load image', () => {
		loadPage(() => {
			let myInputFile = element(By.id('load-pic'));
			expect(myInputFile).toBeTruthy();
			let path = require('path');
			let imgUpload = "./sample-image.jpg"
			let absolutePath = path.resolve(__dirname, imgUpload);
			console.log('PATH', absolutePath, myInputFile.sendKeys);
			// browser.actions().sendKeys(protractor.Key.ENTER).perform();
			myInputFile.click();
			myInputFile.sendKeys(absolutePath);
			sleep(1000);
			//waits
			browser.pause();
		});
	});
});
