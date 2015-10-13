describe("sample test", function() {
	var websiteUrl = 'http://localhost:8000';
	function sleep(delay) {
		var start = new Date().getTime();
		while (new Date().getTime() < start + delay);
	}
	
	it('go', function() {
		browser.get(websiteUrl);
		browser.waitForAngular().then(function(){
			var menu = element(by.className('icon-container'))
			menu.click();
			return browser.wait(function() {
				element.all(by.css('.submenu-item')).get(0).click();
				return browser.wait(function() {
					
				});	
			});
		});
	});

});
