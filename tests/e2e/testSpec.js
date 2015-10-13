describe("sample test", function() {
	var websiteUrl = 'http://localhost:8000';
	function sleep(delay) {
		var start = new Date().getTime();
		while (new Date().getTime() < start + delay);
	}
	
	it('go', function() {
		browser.get(websiteUrl);
		return browser.waitForAngular().then(function(){
			var menu = element(by.className('icon-container'))
			menu.click();
			//pick-colors
			element.all(by.css('.submenu-item')).get(0).click();
			return browser.waitForAngular().then(function() {
				return element.all(by.css('.pick-colors')).then(function(items) {
					return expect(items.length).toBe(1);
				});
			});
		});
	});

});
