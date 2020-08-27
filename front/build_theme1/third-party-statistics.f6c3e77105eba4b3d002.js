/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build_theme1/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./vendor/fads/frontend/src/Faf/Bundle/ReportBundle/Resources/public/js/third-party-statistics.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./vendor/fads/frontend/src/Faf/Bundle/ReportBundle/Resources/public/js/faPushThirdPartyStatistics.js":
/*!************************************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/ReportBundle/Resources/public/js/faPushThirdPartyStatistics.js ***!
  \************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

FA.PushThirdPartyStatistics = function () {

    var push_third_party_statistics = function push_third_party_statistics() {};

    push_third_party_statistics.prototype.push = function (params, url) {
        url = url || "https://test.fads-statistics.fiareads.com/api/stats/custom";
        singleton.apiCall(params, url);
    };

    push_third_party_statistics.prototype.apiCall = function (data, url) {
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            timeout: 1000,
            dataType: 'json',
            crossDomain: true,
            contentType: "application/ld+json"
        }).done(function (response) {}).fail(function (jqXHR, textStatus, errorThrown) {
            console.log('========= Third Party Stats ERROR =========');
            /*console.log(jqXHR);
            if(jqXHR.responseText) {
                let errors = JSON.parse(jqXHR.responseText);
                console.log(errors.detail);
            }*/
            console.log(errorThrown);
            console.log('==================');
        });
    };

    var singleton = new push_third_party_statistics();

    return {
        my_prototype: push_third_party_statistics,
        push: function push(params, url) {
            url = url || '';
            return singleton.push(params, url);
        }
    };
}();

/***/ }),

/***/ "./vendor/fads/frontend/src/Faf/Bundle/ReportBundle/Resources/public/js/faThirdPartyStatistics.js":
/*!********************************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/ReportBundle/Resources/public/js/faThirdPartyStatistics.js ***!
  \********************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

FA.ThirdPartyStatistics = function () {

    // * When page get refreshed / redirected before stats request send then
    // ** We do store a temporary session before on click and on page load we do send request and store stat
    // ** It was causing issue if we send async request before page unload,
    // **   because Mozila send pre-flight request to ensure that the request we are sending is CORS compatible or not
    // **   in Mozila due to pre-flight request our stats request was not working.
    // So for workaround we store event name in session storage and then on next page load we check if there is any event remain to pushed,
    //   and if there is, then we send request to push stats

    // ** Use following line if page refreshed / redirect.
    // window.sessionStorage.setItem("event_name", "register_link_clicked");

    // ** Use following line in cases of ajax or page don't get refreshed / redirected
    // singleton.clickHandler(this, 'register_link_clicked');

    /* EVENTS START */
    var Events = function Events() {};

    Events.prototype.registerLinkClick = function () {
        $('body').on('click', '#user_registration_link', function (e) {
            singleton.clickHandler(this, 'register_link_clicked');
        });
    };

    Events.prototype.registerButtonStep2Click = function () {
        $('body').on('click', '#id_faf_user button[type=submit]', function (e) {
            singleton.clickHandler(this, 'register_button2_clicked');
        });
    };

    Events.prototype.inquiryLinkClick = function () {
        $('body').on('click', '#inquiry_btn', function (e) {
            singleton.clickHandler(this, 'inquiry_link_clicked');
        });
    };

    Events.prototype.inquiryButtonClick = function () {
        $('body').off('submit.statsEvents', '#inquiry').on('submit.statsEvents', '#inquiry', function (e) {
            window.sessionStorage.setItem("event_name", "inquiry_button_clicked");
        });
    };

    Events.prototype.paaLinkClick = function () {
        $('body').on('click', '#post_ad_btn', function (e) {
            window.sessionStorage.setItem("event_name", "paa_link_clicked");
        });
    };

    Events.prototype.paaButtonClick = function () {
        $('body').on('click', '#item_save, #item_preview', function (e) {
            singleton.clickHandler(this, 'paa_button_clicked');
        });
    };

    Events.prototype.bind = function () {
        Events.prototype.registerLinkClick();
        Events.prototype.registerButtonStep2Click();
        Events.prototype.inquiryLinkClick();
        Events.prototype.inquiryButtonClick();
        Events.prototype.paaLinkClick();
        Events.prototype.paaButtonClick();
    };

    var events = new Events();
    /* EVENTS END */

    /* PROPERTEIS START */
    var Properties = function Properties() {
        this.arr = {
            'site_identifier': null
        };
    };

    Properties.prototype.set = function (valArr) {
        var _arr = this.arr;

        $.each(valArr, function (key, val) {
            if (_arr.hasOwnProperty(key)) {
                _arr[key] = val;
            }
        });

        this.arr = _arr;
    };

    Properties.prototype.get = function () {
        return this.arr;
    };

    var properties = new Properties();
    /* PROPERTEIS END */

    var third_party_statistics = function third_party_statistics() {};

    third_party_statistics.prototype.setProperty = function (key, value) {
        _properties = properties.get();
        return _properties[key] = value;
    };

    third_party_statistics.prototype.getProperty = function (key) {
        _properties = properties.get();
        return _properties[key];
    };

    third_party_statistics.prototype.init = function (options) {
        options = options || {};
        properties.set(options);
        events.bind();

        // Check if session storage has event to be pushed into stats, if event_name key present in session storage then send request
        if (window.sessionStorage.getItem("event_name")) {
            singleton.clickHandler(this, window.sessionStorage.getItem("event_name"));
            window.sessionStorage.removeItem("event_name");
        }
    };

    third_party_statistics.prototype.clickHandler = function (that, identifier) {
        var today = new Date();
        var data = {
            'site_identifier': properties.get().site_identifier,
            'identifier': identifier,
            'name': identifier,
            'total': 1,
            'start_at': today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        };
        FA.PushThirdPartyStatistics.push(JSON.stringify(data));
    };

    var singleton = new third_party_statistics();

    return {
        getInstance: function getInstance() {
            return singleton;
        },
        my_prototype: third_party_statistics
    };
}();

if (true) {
    module.exports = FA.ThirdPartyStatistics;
}

/***/ }),

/***/ "./vendor/fads/frontend/src/Faf/Bundle/ReportBundle/Resources/public/js/third-party-statistics.js":
/*!********************************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/ReportBundle/Resources/public/js/third-party-statistics.js ***!
  \********************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! Faf/ReportBundle/Resources/public/js/faPushThirdPartyStatistics.js */ "./vendor/fads/frontend/src/Faf/Bundle/ReportBundle/Resources/public/js/faPushThirdPartyStatistics.js");
window.FA.ThirdPartyStatistics = __webpack_require__(/*! Faf/ReportBundle/Resources/public/js/faThirdPartyStatistics.js */ "./vendor/fads/frontend/src/Faf/Bundle/ReportBundle/Resources/public/js/faThirdPartyStatistics.js");

/***/ })

/******/ });