describe("sample test", function() {
	var websiteUrl = 'http://localhost:8000';
	function sleep(delay) {
		var start = new Date().getTime();
		while (new Date().getTime() < start + delay);
	}
	
	it('go', function() {
		browser.get(websiteUrl);
	});

});
