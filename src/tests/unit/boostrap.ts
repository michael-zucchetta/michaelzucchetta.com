requirejs(
        [
                'jquery',
                'lodash',
                'ngMock',
                'angular',
                'angular-mocks',
                // Load our app module and pass it to our definition function
        ],
        function(){
                console.log("bootstrap");
        }
);
