describe("sample test", function() {

	function sleep(delay) {
		var start = new Date().getTime();
		while (new Date().getTime() < start + delay);
	}
	
	it('go', function() {
	
		sleep(3000);		
	});

});
