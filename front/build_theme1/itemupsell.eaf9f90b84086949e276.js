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
/******/ 	return __webpack_require__(__webpack_require__.s = "./vendor/fads/frontend/src/Faf/Bundle/ItemBundle/Resources/public/themes/theme1/js/itemupsell.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./vendor/fads/frontend/src/Faf/Bundle/ItemBundle/Resources/public/js/faItemUpsell.js":
/*!********************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/ItemBundle/Resources/public/js/faItemUpsell.js ***!
  \********************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

FA.ItemUpsell = function () {
    /* EVENTS START */
    var Events = function Events() {};

    Events.prototype.purchaseHandler = function () {
        $('body').on('submit', 'form[name="purchase_upsell"]', function (e) {
            singleton.purchaseHandler(this);

            return false;
        });
    };

    Events.prototype.selectDurationHandler = function () {
        $('.duration').change(function () {
            singleton.selectDurationHandler(this);
        });
    };

    Events.prototype.closeHandler = function () {
        $('#button_close').click(function () {
            singleton.closeHandler(this);
        });
    };

    Events.prototype.bind = function () {
        $('#purchase').attr("disabled", "disabled");
        Events.prototype.purchaseHandler();
        Events.prototype.selectDurationHandler();
        Events.prototype.closeHandler();
    };

    var events = new Events();
    /* EVENTS END */

    /* PROPERTEIS START */
    var Properties = function Properties() {
        this.arr = {
            'upsellsJ': null
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

    var itemUpsell = function itemUpsell() {};

    itemUpsell.prototype.getProperty = function (key) {
        _properties = properties.get();
        return _properties[key];
    };

    itemUpsell.prototype.init = function (options) {
        options = options || {};
        properties.set(options);
        events.bind();
    };

    itemUpsell.prototype.purchaseHandler = function (that) {
        FA.PageBlock.getInstance().blockPage();
        var route = 'upsell_purchase';
        var formData = $('#purchase_upsell').serialize();
        console.log(formData);

        $.ajax({
            type: "POST",
            url: Routing.generate(route),
            data: formData
        }).always(function (response) {
            //FA.PageBlock.getInstance().unblockPage();
        }).done(function (response) {
            window.location.href = Routing.generate('payment_cart_get');
        });
    };

    itemUpsell.prototype.selectDurationHandler = function (that) {
        var upsellIdI = $(that).data('upsell-id');
        var selectedIndexI = parseInt($(that).prop('selectedIndex'));
        var numberOfSelected = 0;
        if (selectedIndexI == 0) {
            $('#package_description_' + upsellIdI).html($('#firstDescription' + upsellIdI).val());
        } else {
            var upsellsA = JSON.parse(properties.get().upsellsJ);
            var desc = eval('upsellsA.key' + upsellIdI + '.packages' + '.i' + (selectedIndexI - 1) + '.description');
            $('#package_description_' + upsellIdI).html(desc);
        }

        $(".duration").each(function () {
            if (this.value != '') {
                numberOfSelected = numberOfSelected + 1;
            }
        });

        if (numberOfSelected <= 0) {
            $('#purchase').attr("disabled", "disabled");
        } else {
            $('#purchase').removeAttr("disabled");
        }
    };

    itemUpsell.prototype.closeHandler = function (that) {
        $('#faf_promote_item').foundation('reveal', 'close');
        //var popup = new Foundation.Reveal($('#faf_promote_item'));
        //popup.close();
        //$('.reveal-overlay').attr('style', 'display:none;');
    };

    var singleton = new itemUpsell();

    return {
        getInstance: function getInstance() {
            return singleton;
        },
        my_prototype: itemUpsell
    };
}();

if (true) {
    module.exports = FA.ItemUpsell;
}

/***/ }),

/***/ "./vendor/fads/frontend/src/Faf/Bundle/ItemBundle/Resources/public/themes/theme1/css/itemupsell.scss":
/*!***********************************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/ItemBundle/Resources/public/themes/theme1/css/itemupsell.scss ***!
  \***********************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./vendor/fads/frontend/src/Faf/Bundle/ItemBundle/Resources/public/themes/theme1/js/itemupsell.js":
/*!********************************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/ItemBundle/Resources/public/themes/theme1/js/itemupsell.js ***!
  \********************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! Faf/ItemBundle/Resources/public/themes/theme1/css/itemupsell.scss */ "./vendor/fads/frontend/src/Faf/Bundle/ItemBundle/Resources/public/themes/theme1/css/itemupsell.scss");
window.FA.ItemUpsell = __webpack_require__(/*! Faf/ItemBundle/Resources/public/js/faItemUpsell.js */ "./vendor/fads/frontend/src/Faf/Bundle/ItemBundle/Resources/public/js/faItemUpsell.js");

/***/ })

/******/ });