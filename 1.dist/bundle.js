webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Constants_1 = __webpack_require__(6);
	var init_ctrl_1 = __webpack_require__(9);
	var homeOpts = {
	    templateUrl: './home.html',
	    controller: init_ctrl_1.default,
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = angular.module(Constants_1.default.MAIN_MODULE)
	    .component('home', homeOpts);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwQkFBc0IsdUJBQXVCLENBQUMsQ0FBQTtBQUM5QywwQkFBcUIsYUFBYSxDQUFDLENBQUE7QUFHbkMsSUFBSSxRQUFRLEdBQTBCO0lBQ3JDLFdBQVcsRUFBRSxhQUFhO0lBQzFCLFVBQVUsRUFBRSxtQkFBUTtDQUNwQixDQUFDO0FBRUY7a0JBQWUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBUyxDQUFDLFdBQVcsQ0FBQztLQUNsRCxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDIn0=

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// json-editor is temporary. css attribute in directives is not working for directives bootstrapped later
	__webpack_require__(10);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(18);
	var InitCtrl = (function () {
	    function InitCtrl(BasicInfoDao, $state) {
	        var _this = this;
	        this.myLinks = [];
	        this.menu = [];
	        (function () {
	            BasicInfoDao.getLinks()
	                .then(function (links) { return _this.myLinks = links; });
	            BasicInfoDao.getMenu()
	                .then(function (menuEls) {
	                _this.menu = menuEls;
	                _this.menu.forEach(function (menuEl) {
	                    if (menuEl.active) {
	                        $state.state(menuEl.name, menuEl.definition);
	                    }
	                });
	            });
	        })();
	    }
	    return InitCtrl;
	}());
	InitCtrl.$inject = ['BasicInfoDao', '$state'];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = InitCtrl;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5jdHJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvaG9tZS9pbml0LmN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlHQUF5RztBQUN6RyxRQUFPLDRCQUE0QixDQUFDLENBQUE7QUFDcEMsUUFBTyxzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlDLFFBQU8sd0NBQXdDLENBQUMsQ0FBQTtBQUNoRCxRQUFPLG9DQUFvQyxDQUFDLENBQUE7QUFHNUM7SUFLQyxrQkFBWSxZQUFZLEVBQUUsTUFBTTtRQUxqQyxpQkF3QkM7UUFsQkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFFZixDQUFDO1lBQ0EsWUFBWSxDQUFDLFFBQVEsRUFBRTtpQkFDckIsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQXBCLENBQW9CLENBQUMsQ0FBQztZQUV0QyxZQUFZLENBQUMsT0FBTyxFQUFFO2lCQUNwQixJQUFJLENBQUMsVUFBQSxPQUFPO2dCQUNaLEtBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO2dCQUNwQixLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWU7b0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM5QyxDQUFDO2dCQUNGLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ04sQ0FBQztJQUNGLGVBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDO0FBRUQsUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUU5QztrQkFBZSxRQUFRLENBQUMifQ==

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Constants_1 = __webpack_require__(6);
	__webpack_require__(11);
	var BasicInfoDao = (function () {
	    function BasicInfoDao(RestProxy) {
	        this.RestProxy = RestProxy;
	    }
	    BasicInfoDao.prototype.getLinks = function () {
	        // temporary
	        return this.RestProxy.handleGetCall('/js/mocks/links.json');
	    };
	    BasicInfoDao.prototype.getMenu = function () {
	        return this.RestProxy.handleGetCall('/js/mocks/menu.json');
	    };
	    return BasicInfoDao;
	}());
	exports.BasicInfoDao = BasicInfoDao;
	var basicInfoDaoFactory = function (RestProxy) {
	    return new BasicInfoDao(RestProxy);
	};
	basicInfoDaoFactory.$inject = ['RestProxy'];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = angular.module(Constants_1.default.MAIN_MODULE)
	    .factory('BasicInfoDao', basicInfoDaoFactory);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtaW5mby1kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvc2VydmljZXMvYmFzaWMtaW5mby1kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUFzQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzlDLFFBQU8sd0JBQXdCLENBQUMsQ0FBQTtBQUVoQztJQUVDLHNCQUFvQixTQUFTO1FBQVQsY0FBUyxHQUFULFNBQVMsQ0FBQTtJQUM3QixDQUFDO0lBRU0sK0JBQVEsR0FBZjtRQUNDLFlBQVk7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU0sOEJBQU8sR0FBZDtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRixtQkFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBZFksb0JBQVksZUFjeEIsQ0FBQTtBQUVELElBQUksbUJBQW1CLEdBQWEsVUFBQyxTQUFTO0lBQzdDLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUM7QUFFRixtQkFBbUIsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUU1QztrQkFBZSxPQUFPLENBQUMsTUFBTSxDQUFDLG1CQUFTLENBQUMsV0FBVyxDQUFDO0tBQ2xELE9BQU8sQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyJ9

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Constants_1 = __webpack_require__(6);
	var RestProxy = (function () {
	    function RestProxy($q, $http) {
	        this.$q = $q;
	        this.$http = $http;
	        this.getCall = this.$http.get;
	    }
	    RestProxy.prototype.handleGetCall = function () {
	        return this.deferredCall(Array.prototype.concat.apply([this.getCall], arguments));
	    };
	    RestProxy.prototype.data = function (response) {
	        return response.data && response.data.data || response.data;
	    };
	    RestProxy.prototype.deferredCall = function (args) {
	        var _this = this;
	        var fn = Array.prototype.shift.call(args);
	        var deferred = this.$q.defer();
	        fn.apply(undefined, args).then(function (response) {
	            return response.status && deferred.resolve(_this.data(response)) || deferred.reject(_this.data(response));
	        });
	        return deferred.promise;
	    };
	    return RestProxy;
	}());
	var restProxyFactory = function ($q, $http) {
	    return new RestProxy($q, $http);
	};
	restProxyFactory.$inject = ['$q', '$http'];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = angular.module(Constants_1.default.MAIN_MODULE)
	    .factory('RestProxy', restProxyFactory);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1wcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9zZXJ2aWNlcy9yZXN0LXByb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwQkFBc0IsdUJBQXVCLENBQUMsQ0FBQTtBQUU5QztJQUVDLG1CQUFvQixFQUFnQixFQUFVLEtBQXNCO1FBQWhELE9BQUUsR0FBRixFQUFFLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFpQjtRQW9CNUQsWUFBTyxHQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBbkIzQyxDQUFDO0lBRU0saUNBQWEsR0FBcEI7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRU8sd0JBQUksR0FBWixVQUFhLFFBQWE7UUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQztJQUM3RCxDQUFDO0lBRU8sZ0NBQVksR0FBcEIsVUFBcUIsSUFBSTtRQUF6QixpQkFPQztRQU5BLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQWE7WUFDNUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDekcsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBSUYsZ0JBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDO0FBRUQsSUFBSSxnQkFBZ0IsR0FBYSxVQUFDLEVBQWdCLEVBQUUsS0FBc0I7SUFDekUsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNqQyxDQUFDLENBQUM7QUFFRixnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFM0M7a0JBQWUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBUyxDQUFDLFdBQVcsQ0FBQztLQUNsRCxPQUFPLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUMifQ==

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Constants_1 = __webpack_require__(6);
	var AnimateTextCtrl = (function () {
	    function AnimateTextCtrl($interval) {
	        var _this = this;
	        this.letters = [];
	        this.lettersBuffer = this.dataText.split('');
	        var endInterval;
	        var pushLetters = function () {
	            _this.letters.push(_this.lettersBuffer.shift());
	            if (_this.lettersBuffer.length === 0) {
	                $interval.cancel(endInterval);
	            }
	        };
	        endInterval = $interval(pushLetters, 100);
	    }
	    return AnimateTextCtrl;
	}());
	AnimateTextCtrl.$inject = ['$interval'];
	;
	var animateTextOpts = {
	    bindings: {
	        dataText: '@animateText'
	    },
	    templateUrl: '/directives/animate-text/animate-text.html',
	    css: '/directives/animate-text/animate-text.css',
	    controller: AnimateTextCtrl
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = angular.module(Constants_1.default.MAIN_MODULE)
	    .component('animateText', animateTextOpts);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0ZS10ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RpcmVjdGl2ZXMvYW5pbWF0ZS10ZXh0L2FuaW1hdGUtdGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXNCLHVCQUF1QixDQUFDLENBQUE7QUFFOUM7SUFRQyx5QkFBWSxTQUE4QjtRQVIzQyxpQkFvQkM7UUFYQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksV0FBNkIsQ0FBQztRQUNsQyxJQUFJLFdBQVcsR0FBYTtZQUMzQixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDOUMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBQ0YsQ0FBQyxDQUFDO1FBQ0YsV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNGLHNCQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQUVELGVBQWUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUl2QyxDQUFDO0FBRUYsSUFBSSxlQUFlLEdBQXlCO0lBQzNDLFFBQVEsRUFBRTtRQUNULFFBQVEsRUFBRSxjQUFjO0tBQ3hCO0lBQ0QsV0FBVyxFQUFFLDRDQUE0QztJQUN6RCxHQUFHLEVBQUUsMkNBQTJDO0lBQ2hELFVBQVUsRUFBRSxlQUFlO0NBQzNCLENBQUM7QUFFRjtrQkFBZSxPQUFPLENBQUMsTUFBTSxDQUFDLG1CQUFTLENBQUMsV0FBVyxDQUFDO0tBQ2xELFNBQVMsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUMifQ==

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Constants_1 = __webpack_require__(6);
	__webpack_require__(14);
	var DropdownMenuCtrl = (function () {
	    function DropdownMenuCtrl() {
	        this.prefix = Constants_1.default.FUNCTION_PREFIX;
	    }
	    // add ng-click to the element that has the directive
	    DropdownMenuCtrl.prototype.showHideMenu = function () {
	        this.showMenu = !this.showMenu;
	    };
	    ;
	    return DropdownMenuCtrl;
	}());
	var dropDownMenuDirective = function ($http, $compile, $timeout, DaoFacade) {
	    return {
	        restrict: 'A',
	        template: function (element) {
	            element.attr('ng-click', 'showHideMenu()');
	        },
	        css: 'directives/dropdown-menu/dropdown-menu.css',
	        controller: DropdownMenuCtrl,
	        link: function (scope, element) {
	            $http.get('directives/dropdown-menu/dropdown-menu.html').then(function (template) {
	                var templateHtml = $(template.data);
	                var compiledTemplate = $compile(templateHtml)(scope);
	                element.after(compiledTemplate);
	                element.removeAttr('dropdown-menu');
	                $compile(element)(scope);
	                $timeout(function () {
	                    // +1 is the border of the menu
	                    var newTop = $(element).outerHeight() + 1;
	                    $(compiledTemplate).css('right', 0);
	                    $(compiledTemplate).css('top', newTop + 1);
	                    $(compiledTemplate).css('z-index', 100);
	                });
	                // init the menu
	                DaoFacade.getMenu().then(function (response) {
	                    scope.menuEls = response;
	                });
	            });
	        }
	    };
	};
	dropDownMenuDirective.$inject = ['$http', '$compile', '$timeout', 'DaoFacade'];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = angular.module(Constants_1.default.MAIN_MODULE)
	    .directive('dropDownMenu', dropDownMenuDirective);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tbWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kaXJlY3RpdmVzL2Ryb3Bkb3duLW1lbnUvZHJvcGRvd24tbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXNCLHVCQUF1QixDQUFDLENBQUE7QUFDOUMsUUFBTyx3QkFBd0IsQ0FBQyxDQUFBO0FBRWhDO0lBV0M7UUFDQyxJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFTLENBQUMsZUFBZSxDQUFDO0lBQ3pDLENBQUM7SUFQRCxxREFBcUQ7SUFDOUMsdUNBQVksR0FBbkI7UUFDQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNoQyxDQUFDOztJQUtGLHVCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFFRCxJQUFJLHFCQUFxQixHQUFRLFVBQUMsS0FBc0IsRUFBRSxRQUE0QixFQUFFLFFBQTRCLEVBQUUsU0FBUztJQUM5SCxNQUFNLENBQUM7UUFDTixRQUFRLEVBQUUsR0FBRztRQUNiLFFBQVEsRUFBRSxVQUFDLE9BQTRCO1lBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELEdBQUcsRUFBRSw0Q0FBNEM7UUFDakQsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixJQUFJLEVBQUUsVUFBQyxLQUFVLEVBQUUsT0FBNEI7WUFDOUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7Z0JBQ3RFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLElBQUksZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyRCxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3BDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFekIsUUFBUSxDQUFDO29CQUNSLCtCQUErQjtvQkFDL0IsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDMUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDcEMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQyxDQUFDO2dCQUVILGdCQUFnQjtnQkFDaEIsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7b0JBQ2pDLEtBQUssQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO2dCQUMxQixDQUFDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixxQkFBcUIsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUUvRTtrQkFBZSxPQUFPLENBQUMsTUFBTSxDQUFDLG1CQUFTLENBQUMsV0FBVyxDQUFDO0tBQ2xELFNBQVMsQ0FBQyxjQUFjLEVBQUUscUJBQXFCLENBQUMsQ0FBQyJ9

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Constants_1 = __webpack_require__(6);
	var utils_1 = __webpack_require__(15);
	var DaoFacade = (function () {
	    function DaoFacade(BasicInfoDao, $route) {
	        this.BasicInfoDao = BasicInfoDao;
	        this.$route = $route;
	    }
	    DaoFacade.prototype.getMenu = function () {
	        var _this = this;
	        return this.BasicInfoDao.getMenu().then(function (menu) {
	            _this.$route.route.setRouteDinamically(menu);
	            return utils_1.default.initializeMenu(menu);
	        });
	    };
	    return DaoFacade;
	}());
	var daoFacadeFactory = function (BasicInfoDao, UtilitiesService) {
	    return new DaoFacade(BasicInfoDao, UtilitiesService);
	};
	daoFacadeFactory.$inject = ['BasicInfoDao', '$route'];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = angular.module(Constants_1.default.MAIN_MODULE).factory(daoFacadeFactory);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFvLWZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9zZXJ2aWNlcy9kYW8tZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwQkFBc0IsdUJBQXVCLENBQUMsQ0FBQTtBQUU5QyxzQkFBNkIsbUJBQW1CLENBQUMsQ0FBQTtBQUVqRDtJQUVDLG1CQUFvQixZQUFZLEVBQVUsTUFBTTtRQUE1QixpQkFBWSxHQUFaLFlBQVksQ0FBQTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQUE7SUFDaEQsQ0FBQztJQUVPLDJCQUFPLEdBQWY7UUFBQSxpQkFLQztRQUpBLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7WUFDNUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLGVBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVGLGdCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFFRCxJQUFJLGdCQUFnQixHQUFhLFVBQUMsWUFBWSxFQUFFLGdCQUFnQjtJQUMvRCxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDdEQsQ0FBQyxDQUFDO0FBRUYsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRXREO2tCQUFlLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyJ9

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var StringUtils_1 = __webpack_require__(16);
	var Utils = (function () {
	    function Utils() {
	    }
	    Utils.initializeMenu = function (rawMenu) {
	        var menu = [];
	        rawMenu.forEach(function (element) {
	            if (!element.parentId) {
	                menu[element.id] = angular.copy(element);
	            }
	            else {
	                if (!menu[element.parentId].children) {
	                    menu[element.parentId].children = [];
	                }
	                menu[element.parentId].children.push(element);
	            }
	            if (element.id in menu) {
	                return;
	            }
	        });
	        return menu;
	    };
	    Utils.removeFormattationFromString = function (inputString) {
	        var newString = StringUtils_1.default.removeTabs(inputString);
	        newString = StringUtils_1.default.removeSpaces(newString);
	        newString = StringUtils_1.default.removeNewLines(newString);
	        newString = StringUtils_1.default.removeEscapes(newString);
	        return newString;
	    };
	    return Utils;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Utils;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvc2VydmljZXMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDRCQUF3Qix5QkFBeUIsQ0FBQyxDQUFBO0FBRWxEO0lBQUE7SUE0QkEsQ0FBQztJQTFCYyxvQkFBYyxHQUE1QixVQUE2QixPQUFrQjtRQUM5QyxJQUFJLElBQUksR0FBYyxFQUFFLENBQUM7UUFDekIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQWdCO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDdEMsQ0FBQztnQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxDQUFDO1lBQ1IsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNiLENBQUM7SUFFYSxrQ0FBNEIsR0FBMUMsVUFBMkMsV0FBbUI7UUFDN0QsSUFBSSxTQUFTLEdBQVcscUJBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUQsU0FBUyxHQUFHLHFCQUFXLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELFNBQVMsR0FBRyxxQkFBVyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxTQUFTLEdBQUcscUJBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBQ0YsWUFBQztBQUFELENBQUMsQUE1QkQsSUE0QkM7QUFFRDtrQkFBZSxLQUFLLENBQUMifQ==

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var RegexUtils_1 = __webpack_require__(17);
	var StringUtils = (function () {
	    function StringUtils() {
	    }
	    StringUtils.removeNewLines = function (inputString) {
	        var newString = inputString.replace(RegexUtils_1.default.newLines, '');
	        return newString;
	    };
	    StringUtils.removeSpaces = function (inputString) {
	        var newString = inputString.replace(RegexUtils_1.default.spaces, '');
	        return newString;
	    };
	    StringUtils.removeTabs = function (inputString) {
	        var newString = inputString.replace(RegexUtils_1.default.tabs, '');
	        return newString;
	    };
	    StringUtils.removeEscapes = function (inputString) {
	        var newString = inputString.replace(RegexUtils_1.default.backslashes, '');
	        return newString;
	    };
	    return StringUtils;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StringUtils;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaW5nVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvc2VydmljZXMvU3RyaW5nVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUF1Qix3QkFBd0IsQ0FBQyxDQUFBO0FBRWhEO0lBQUE7SUFzQkEsQ0FBQztJQXBCYywwQkFBYyxHQUE1QixVQUE2QixXQUFtQjtRQUMvQyxJQUFJLFNBQVMsR0FBVyxXQUFXLENBQUMsT0FBTyxDQUFDLG9CQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbEIsQ0FBQztJQUVhLHdCQUFZLEdBQTFCLFVBQTJCLFdBQW1CO1FBQzdDLElBQUksU0FBUyxHQUFXLFdBQVcsQ0FBQyxPQUFPLENBQUMsb0JBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBRWEsc0JBQVUsR0FBeEIsVUFBeUIsV0FBbUI7UUFDM0MsSUFBSSxTQUFTLEdBQVcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxvQkFBVSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRSxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ2xCLENBQUM7SUFFYSx5QkFBYSxHQUEzQixVQUE0QixXQUFtQjtRQUM5QyxJQUFJLFNBQVMsR0FBVyxXQUFXLENBQUMsT0FBTyxDQUFDLG9CQUFVLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbEIsQ0FBQztJQUVGLGtCQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQztBQUVEO2tCQUFlLFdBQVcsQ0FBQyJ9

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	var RegexUtils = (function () {
	    function RegexUtils() {
	    }
	    RegexUtils.newLines = new RegExp('\\n', 'g');
	    RegexUtils.spaces = new RegExp('\\ ', 'g');
	    RegexUtils.tabs = new RegExp('\\t', 'g');
	    RegexUtils.backslashes = new RegExp('\\\\', 'g');
	    return RegexUtils;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = RegexUtils;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVnZXhVdGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9zZXJ2aWNlcy9SZWdleFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUFBO0lBVUEsQ0FBQztJQVJjLG1CQUFRLEdBQVcsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRTFDLGlCQUFNLEdBQVcsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRXhDLGVBQUksR0FBVyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFdEMsc0JBQVcsR0FBVyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFN0QsaUJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQUVEO2tCQUFlLFVBQVUsQ0FBQyJ9

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var TextEditor_1 = __webpack_require__(19);
	var JsonEditorCtrl = (function () {
	    function JsonEditorCtrl($timeout, $interval) {
	        var _this = this;
	        this.$timeout = $timeout;
	        this.$interval = $interval;
	        var display = $('#json-display');
	        this.textarea = $('#json-input');
	        var container = $('json-input-container');
	        this.editor = new TextEditor_1.default('#json-display', '#json-input', '.json-input-container', 'cell');
	        angular.element(document).ready(function () { return _this.initEditor(); });
	    }
	    JsonEditorCtrl.prototype.initEditor = function () {
	        var _this = this;
	        this.$timeout(function () { return _this.editor.initEditor(); }, 100);
	        this.initCursor('cursor');
	        this.textarea.focus();
	    };
	    JsonEditorCtrl.prototype.setPosition = function ($event) {
	        var _this = this;
	        var setPosition = function () {
	            // checking if any text has been selected
	            var selectedText = window.getSelection().toString();
	            if (selectedText) {
	                _this.editor.selectText(selectedText);
	            }
	            else if (!_this.noSingleClick) {
	                _this.editor.clickEditor($event);
	            }
	        };
	        this.$timeout(setPosition, 10);
	    };
	    JsonEditorCtrl.prototype.insertCharacter = function ($event) {
	        // a character has been inserted
	        this.editor.insertChar($event);
	        this.jsonText = this.editor.textValue;
	    };
	    JsonEditorCtrl.prototype.handleKeyDown = function ($event) {
	        var _this = this;
	        this.$timeout(function () { return _this.editor.handleKeyDown($event); });
	    };
	    JsonEditorCtrl.prototype.initCursor = function (cursorId) {
	        var _this = this;
	        this.$interval(function () { return _this.hideCursor = !_this.hideCursor; }, 500);
	    };
	    JsonEditorCtrl.prototype.selectWord = function ($event) {
	        var _this = this;
	        this.noSingleClick = true;
	        console.log("double click", $event);
	        this.editor.doubleClickEditor($event);
	        // prevent single click to be triggered
	        this.$timeout(function () { return _this.noSingleClick = false; });
	    };
	    return JsonEditorCtrl;
	}());
	JsonEditorCtrl.$inject = ['$timeout', '$interval'];
	;
	var jsonEditorOpts = {
	    // restrict: 'E',
	    bindings: {
	        jsonText: '='
	    },
	    css: '/directives/json-editor/json-editor.css',
	    templateUrl: '/directives/json-editor/json-editor.html',
	    controller: JsonEditorCtrl
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = angular.module('michaelzucchetta')
	    .component('jsonEditor', jsonEditorOpts);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1lZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGlyZWN0aXZlcy9qc29uLWVkaXRvci9qc29uLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQXVCLHVCQUF1QixDQUFDLENBQUE7QUFFL0M7SUFrQkMsd0JBQW9CLFFBQTRCLEVBQVUsU0FBOEI7UUFsQnpGLGlCQThEQztRQTVDb0IsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFxQjtRQUN2RixJQUFJLE9BQU8sR0FBVyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakMsSUFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLG9CQUFVLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5RixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQWJPLG1DQUFVLEdBQWxCO1FBQUEsaUJBSUM7UUFIQSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUF4QixDQUF3QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBV00sb0NBQVcsR0FBbEIsVUFBbUIsTUFBd0I7UUFBM0MsaUJBV0M7UUFWQSxJQUFJLFdBQVcsR0FBRztZQUNqQix5Q0FBeUM7WUFDekMsSUFBSSxZQUFZLEdBQVcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzVELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSx3Q0FBZSxHQUF0QixVQUF3QixNQUFNO1FBQzdCLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxzQ0FBYSxHQUFwQixVQUFxQixNQUFNO1FBQTNCLGlCQUVDO1FBREEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU0sbUNBQVUsR0FBakIsVUFBa0IsUUFBZ0I7UUFBbEMsaUJBRUM7UUFEQSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBbEMsQ0FBa0MsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0sbUNBQVUsR0FBakIsVUFBa0IsTUFBTTtRQUF4QixpQkFNQztRQUxBLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxFQUExQixDQUEwQixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVGLHFCQUFDO0FBQUQsQ0FBQyxBQTlERCxJQThEQztBQUVELGNBQWMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFHbEQsQ0FBQztBQUNGLElBQUksY0FBYyxHQUF5QjtJQUMxQyxpQkFBaUI7SUFDakIsUUFBUSxFQUFFO1FBQ1QsUUFBUSxFQUFFLEdBQUc7S0FDYjtJQUNELEdBQUcsRUFBRSx5Q0FBeUM7SUFDOUMsV0FBVyxFQUFFLDBDQUEwQztJQUN2RCxVQUFVLEVBQUUsY0FBYztDQUMxQixDQUFDO0FBQ0Y7a0JBQWUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztLQUMvQyxTQUFTLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDIn0=

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Keys_1 = __webpack_require__(20);
	var CarelPos = (function () {
	    function CarelPos() {
	    }
	    return CarelPos;
	}());
	var Status = (function () {
	    function Status() {
	    }
	    return Status;
	}());
	;
	var TextPortion = (function () {
	    function TextPortion() {
	    }
	    return TextPortion;
	}());
	var TextEditor = (function () {
	    function TextEditor(displayQuery, textareaQuery, containerQuery, rowSuffix) {
	        this.textValue = '';
	        this.cellX = 0;
	        this.cellY = 0;
	        this.carelPos = {
	            left: 0,
	            top: 0
	        };
	        this.cellWidth = 8;
	        this.cellHeight = 16;
	        this.rowSuffix = '';
	        /**
	         * rowSuffix is the name of the single row class, such as cell html elements
	         * display is where the text is displayed
	         * textarea is the textarea itself (not visible)
	         * container is the html element containing the editor
	         */
	        this._display = $(displayQuery);
	        this._textarea = $(textareaQuery);
	        this._container = $(containerQuery);
	        this.rowSuffix = rowSuffix;
	    }
	    Object.defineProperty(TextEditor.prototype, "display", {
	        get: function () {
	            return this._display;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TextEditor.prototype, "textarea", {
	        get: function () {
	            return this._textarea;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TextEditor.prototype, "container", {
	        get: function () {
	            return this._container;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TextEditor.prototype, "height", {
	        get: function () {
	            return this.editorHeight;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TextEditor.prototype, "width", {
	        get: function () {
	            return this.editorWidth;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TextEditor.prototype.getCellLetter = function (y, x) {
	        return this.statusMatrix[y].string[x];
	    };
	    TextEditor.prototype.initEditor = function () {
	        var _this = this;
	        this.editorWidth = this._display.outerWidth();
	        this.editorHeight = this._display.outerHeight();
	        this.colsNumber = Math.round(this.editorWidth / this.cellWidth);
	        this.rowsNumber = Math.round(this.editorHeight / this.cellHeight);
	        this.statusMatrix = new Array(this.rowsNumber);
	        this.statusMatrix = _.map(this.statusMatrix, function (el, $index) {
	            el = new Status();
	            el.isNew = true;
	            el.string = '';
	            el.id = _this.rowSuffix + $index;
	            return el;
	        });
	    };
	    TextEditor.prototype.clickEditor = function ($event) {
	        // x/cellWidth is the partial cell position, with round it's the cell number
	        this.cellX = Math.round($event.offsetX / this.cellWidth);
	        var tmpY = ($event.target.offsetTop + $event.offsetY) / this.cellHeight;
	        this.cellY = Math.round(tmpY);
	        var cellText = this.getCellString(this.cellY);
	        if (cellText) {
	            if (cellText.length < this.cellX) {
	                this.cellX = cellText.length;
	            }
	            this.textarea.val(cellText);
	        }
	        else {
	            this.cellX = 0;
	        }
	        if (this.cellY > this.getLastRowIndex()) {
	            this.cellY = this.getLastRowIndex();
	        }
	        var y = this.cellY * this.cellHeight;
	        var x = this.cellX * this.cellWidth;
	        this.carelPos.left = x;
	        this.carelPos.top = y;
	        this.textarea.focus();
	    };
	    TextEditor.prototype.addCharacterToEditor = function (key) {
	        var newChar = String.fromCharCode(key);
	        if (!Keys_1.default.isDelKey(key) && !Keys_1.default.isNewLineKey(key)) {
	            this.carelPos.left += this.cellWidth;
	            if (this.statusMatrix[this.cellY].isNew) {
	                this.textValue = this.statusMatrix[this.cellY].string = newChar;
	                this.statusMatrix[this.cellY].isNew = false;
	            }
	            else {
	                var tmpString = this.statusMatrix[this.cellY].string;
	                this.statusMatrix[this.cellY].string = tmpString.substring(0, this.cellX) + newChar + tmpString.substring(this.cellX, tmpString.length);
	                this.textValue += newChar;
	            }
	            this.cellX++;
	        }
	        if (Keys_1.default.isNewLineKey(key)) {
	            this.carelPos.left = 0;
	            this.carelPos.top += this.cellHeight;
	            this._textarea.val('');
	            this.textValue = '';
	            this.cellX = 0;
	            this.cellY++;
	        }
	    };
	    ;
	    TextEditor.prototype.selectText = function (selectedText) {
	        this.selectedText = selectedText;
	    };
	    TextEditor.prototype.insertChar = function ($event) {
	        var key = Keys_1.default.getKeyFromEvent($event);
	        this.addCharacterToEditor(key);
	    };
	    TextEditor.prototype.moveArrow = function ($event, key) {
	        var done = false;
	        var deltaX = NaN;
	        var deltaY = NaN;
	        switch (key) {
	            case Keys_1.default.leftKey:
	                deltaX = -1;
	                break;
	            case Keys_1.default.upKey:
	                deltaY = -1;
	                break;
	            case Keys_1.default.rightKey:
	                deltaX = 1;
	                break;
	            case Keys_1.default.downKey:
	                deltaY = 1;
	                break;
	            default:
	                return;
	        }
	        if (this.cellX + deltaX < 0) {
	            deltaY = -1;
	        }
	        if (this.cellX + deltaX >= this.statusMatrix[this.cellY].string.length && key !== Keys_1.default.upKey) {
	            deltaY = 1;
	        }
	        else if (this.cellX + deltaX >= 0) {
	            this.cellX += deltaX;
	            this.carelPos.left += this.cellWidth * deltaX;
	            done = true;
	        }
	        if (this.cellY + deltaY >= 0 && !done) {
	            this.cellY += deltaY;
	            if (deltaY < 0) {
	                if (key !== Keys_1.default.upKey || this.cellX > this.statusMatrix[this.cellY].string.length) {
	                    this.cellX = this.statusMatrix[this.cellY].string.length;
	                }
	            }
	            else {
	                if (this.statusMatrix[this.cellY - deltaY].isNew) {
	                    this.cellY -= deltaY;
	                }
	                if (this.statusMatrix[this.cellY].isNew || key === Keys_1.default.rightKey) {
	                    this.cellX = 0;
	                }
	                if (key === Keys_1.default.downKey && this.cellX > this.statusMatrix[this.cellY].string.length) {
	                    this.cellX = this.statusMatrix[this.cellY].string.length;
	                }
	            }
	            this.carelPos.left = this.cellX * this.cellWidth;
	            this.carelPos.top = this.cellY * this.cellHeight;
	        }
	    };
	    TextEditor.prototype.handleKeyDown = function ($event) {
	        // add tests for this
	        var key = Keys_1.default.getKeyFromEvent($event);
	        if (Keys_1.default.isArrowKey(key)) {
	            this.moveArrow($event, key);
	        }
	        else if (Keys_1.default.isDelKey(key)) {
	            this.deleteChar($event, key);
	        }
	        else if (key === Keys_1.default.charA && ($event.ctrlKey || $event.metaKey)) {
	        }
	        else {
	        }
	    };
	    TextEditor.prototype.deleteChar = function ($event, key) {
	        var cellText = this.statusMatrix[this.cellY].string;
	        if (!Keys_1.default.isDelKey(key)) {
	            return;
	        }
	        if (this.statusMatrix[this.cellY].string.length === 0) {
	            this.statusMatrix[this.cellY].string = '';
	            this.statusMatrix[this.cellY].isNew = true;
	            if (this.cellY !== 0) {
	                this.cellY--;
	                this.carelPos.top -= this.cellHeight;
	                this.cellX = this.statusMatrix[this.cellY].string.length;
	                this.textValue = this.statusMatrix[this.cellY].string;
	                this.carelPos.left = this.cellWidth * this.cellX;
	            }
	        }
	        else {
	            // concatenate two strings: one from zero to the cursor's position and then from the cursor's position to the end of the string
	            var firstSubPart = cellText.substring(0, this.cellX - 1);
	            var secondSubPart = cellText.substring(this.cellX, cellText.length);
	            this.statusMatrix[this.cellY].string = this.textValue = firstSubPart + secondSubPart;
	            this.carelPos.left -= this.cellWidth;
	            this.cellX--;
	            if (this.cellX < 0) {
	                // if it's going out of the screen
	                this.cellX = 0;
	            }
	        }
	    };
	    TextEditor.prototype.pasteText = function ($event) {
	        var _this = this;
	        var event = $event.originalEvent || $event;
	        var pastedText = event.clipboardData.getData('text/plain');
	        _.each(pastedText, function (char) {
	            _this.addCharacterToEditor(char.charCodeAt(0));
	        });
	    };
	    TextEditor.prototype.cutText = function () {
	        return undefined;
	    };
	    TextEditor.prototype.doubleClickEditor = function ($event) {
	        console.log("double click", $event);
	    };
	    TextEditor.prototype.getLastRowIndex = function () {
	        var $index = undefined;
	        _.each(this.statusMatrix, function (row, index) {
	            if (row.isNew && $index === undefined) {
	                $index = index;
	            }
	        });
	        return $index;
	    };
	    TextEditor.prototype.getCellString = function (y) {
	        return this.statusMatrix[y].string;
	    };
	    return TextEditor;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TextEditor;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9jbGFzc2VzL1RleHRFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUFpQixpQkFBaUIsQ0FBQyxDQUFBO0FBRW5DO0lBQUE7SUFHQSxDQUFDO0lBQUQsZUFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBRUQ7SUFBQTtJQUlBLENBQUM7SUFBRCxhQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFBQSxDQUFDO0FBRUY7SUFBQTtJQU1BLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBRUQ7SUFzQkMsb0JBQVksWUFBb0IsRUFBRSxhQUFxQixFQUFFLGNBQXNCLEVBQUUsU0FBaUI7UUFyQjNGLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFHdkIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGFBQVEsR0FBYTtZQUMzQixJQUFJLEVBQUUsQ0FBQztZQUNQLEdBQUcsRUFBRSxDQUFDO1NBQ04sQ0FBQztRQUtNLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUt4QixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBRzlCOzs7OztXQUtHO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDNUIsQ0FBQztJQUVELHNCQUFJLCtCQUFPO2FBQVg7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGdD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

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	var Keys = (function () {
	    function Keys() {
	    }
	    Keys.isDelKey = function (key) {
	        return key === Keys.delKey1 || key === Keys.delKey2;
	    };
	    Keys.isNewLineKey = function (key) {
	        return key === Keys.newLineKey1 || key === Keys.newLineKey2;
	    };
	    Keys.isArrowKey = function (key) {
	        return [Keys.leftKey, Keys.upKey, Keys.rightKey, Keys.downKey].indexOf(key) !== -1;
	    };
	    Keys.getKeyFromEvent = function ($event) {
	        // key is the unimplemented new version, the others are deprecated
	        var key = $event.key || $event.keyCode || $event.charCode || $event.which;
	        if (typeof key === 'string') {
	            return parseInt(key, 10);
	        }
	        else {
	            return key;
	        }
	    };
	    Keys.leftKey = 37;
	    Keys.upKey = 38;
	    Keys.rightKey = 39;
	    Keys.downKey = 40;
	    Keys.delKey1 = 8;
	    Keys.delKey2 = 46;
	    Keys.newLineKey1 = 10;
	    Keys.newLineKey2 = 13;
	    Keys.tabKey = 9;
	    Keys.charA = 65;
	    Keys.charX = 88;
	    return Keys;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Keys;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9jbGFzc2VzL0tleXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0lBQUE7SUFrQ0EsQ0FBQztJQXJCYyxhQUFRLEdBQXRCLFVBQXVCLEdBQVc7UUFDakMsTUFBTSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsT0FBTyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JELENBQUM7SUFFYSxpQkFBWSxHQUExQixVQUEyQixHQUFXO1FBQ3JDLE1BQU0sQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLFdBQVcsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM3RCxDQUFDO0lBRWEsZUFBVSxHQUF4QixVQUF5QixHQUFXO1FBQ25DLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVhLG9CQUFlLEdBQTdCLFVBQThCLE1BQXFCO1FBQ2xELGtFQUFrRTtRQUNsRSxJQUFJLEdBQUcsR0FBa0IsTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN6RixFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDWixDQUFDO0lBQ0YsQ0FBQztJQWhDYSxZQUFPLEdBQVcsRUFBRSxDQUFDO0lBQ3JCLFVBQUssR0FBVyxFQUFFLENBQUM7SUFDbkIsYUFBUSxHQUFXLEVBQUUsQ0FBQztJQUN0QixZQUFPLEdBQVcsRUFBRSxDQUFDO0lBQ3JCLFlBQU8sR0FBVyxDQUFDLENBQUM7SUFDcEIsWUFBTyxHQUFXLEVBQUUsQ0FBQztJQUNyQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztJQUN6QixXQUFNLEdBQVcsQ0FBQyxDQUFDO0lBQ25CLFVBQUssR0FBVyxFQUFFLENBQUM7SUFDbkIsVUFBSyxHQUFXLEVBQUUsQ0FBQztJQXVCbEMsV0FBQztBQUFELENBQUMsQUFsQ0QsSUFrQ0M7QUFsQ0Q7c0JBa0NDLENBQUEifQ==

/***/ }
]);