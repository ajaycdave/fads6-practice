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
/******/ 	return __webpack_require__(__webpack_require__.s = "./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/multilevelselect.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/faMultiLevelSelect.js":
/*!**************************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/faMultiLevelSelect.js ***!
  \**************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

FA.MultiLevelSelect = function () {

    /* EVENTS START */
    var Events = function Events() {};

    Events.prototype.setCategoryIdOnLoad = function () {
        singleton.setCategoryIdOnLoadHandler();
    };

    Events.prototype.categoryChange = function () {
        $(document).on('change', "." + singleton.getProperty('fieldName'), function (e) {
            singleton.categoryChangeHandler(this);
        });
    };

    Events.prototype.bind = function () {
        Events.prototype.setCategoryIdOnLoad();
        Events.prototype.categoryChange();
    };

    var events = new Events();
    /* EVENTS END */

    /* PROPERTEIS START */
    var Properties = function Properties() {
        this.arr = {
            'totalLevel': null,
            'formName': null,
            'fieldName': null,
            'optslctsbcat': null,
            'catajxgtndjn': null
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

    var multilevelselect = function multilevelselect() {};

    multilevelselect.prototype.init = function (options) {
        options = options || {};
        properties.set(options);
        events.bind();
    };

    multilevelselect.prototype.getProperty = function (key) {
        _properties = properties.get();
        return _properties[key];
    };

    multilevelselect.prototype.setCategoryIdOnLoadHandler = function () {
        var category_id = $('#' + properties.get().formName + '_' + properties.get().fieldName).val();
        var total_level = properties.get().totalLevel;
        for (var l = 1; l <= properties.get().totalLevel; l++) {
            if ($('#' + properties.get().formName + '_category_' + l).val()) {
                category_id = $('#' + properties.get().formName + '_' + properties.get().fieldName + '_' + l).val();
            }
        }

        $('#' + properties.get().formName + '_' + properties.get().fieldName).val(category_id);
        var category_selector = $('#' + properties.get().formName + '_' + properties.get().fieldName + '_' + total_level);
        if ($(category_selector).parents('div.category_choice').length > 0) {
            singleton.categoryChangeFieldClass(category_selector);
        }
    };

    multilevelselect.prototype.categoryChangeHandler = function (that) {
        var fieldId = $(that).attr('id');
        var level = fieldId.replace(properties.get().formName + '_' + properties.get().fieldName + '_', '');
        var nextLevel = parseInt(level) + 1;

        if (nextLevel <= properties.get().totalLevel) {
            singleton.loadCategoryByLevel($(that).val(), nextLevel);
        } else {
            $('#' + properties.get().formName + '_' + properties.get().fieldName).val($(that).val());
        }
    };

    multilevelselect.prototype.loadCategoryByLevel = function (id, level) {
        var category_selector = $('#' + properties.get().formName + '_' + properties.get().fieldName + '_' + level);
        category_selector.html('<option value="">' + properties.get().optslctsbcat + '</option>');

        if (level == 2) {
            $('#' + properties.get().formName + '_' + properties.get().fieldName).val('');
        }

        if (id && id.match(/^([0-9]+)$/)) {
            $('#' + properties.get().formName + '_' + properties.get().fieldName).val(id);

            var data = {
                id: id
            };
            $.ajax({
                type: 'post',
                url: properties.get().catajxgtndjn,
                data: data,
                success: function success(data) {
                    if (data.length > 0) {
                        if ($(category_selector).parents('div.category_choice').length > 0) {
                            $('#category_choice_div_' + level).parent().show();
                        } else {
                            $('#category_choice_div_' + level).show();
                        }
                        for (var i = 0, total = data.length; i < total; i++) {
                            category_selector.append('<option value="' + data[i].id + '">' + data[i].text + '</option>');
                        }
                    } else {
                        level = parseInt(level) - 1;
                    }

                    if ($(category_selector).parents('div.category_choice').length > 0) {
                        singleton.categoryChangeFieldClass(category_selector);
                    }
                }
            });
        } else {
            if (id == 'no-category') {
                $('#' + properties.get().formName + '_' + properties.get().fieldName).val('no-category');
            }

            level = parseInt(level) - 1;
        }

        for (var l = parseInt(level) + 1; l <= properties.get().totalLevel; l++) {
            $('#' + properties.get().formName + '_' + properties.get().fieldName + '_' + l).html('<option value="">' + properties.get().optslctsbcat + '</option>');
            if ($(category_selector).parents('div.category_choice').length > 0) {
                $('#category_choice_div_' + l).parent().hide();
            } else {
                $('#category_choice_div_' + l).hide();
            }
        }

        if ($(category_selector).parents('div.category_choice').length > 0) {
            singleton.categoryChangeFieldClass(category_selector);
        }
    };

    multilevelselect.prototype.categoryChangeFieldClass = function (category_selector, cnt) {
        var cnt = $(category_selector).parents('div.category_choice').parent().children('.category_choice').filter(function () {
            return $(this).css("display") === "block";
        }).length;
        var cls = "large-3";

        if (cnt == 1) {
            cls = "large-12";
        } else if (cnt == 2) {
            cls = "large-6";
        } else if (cnt == 3) {
            cls = "large-4";
        } else if (cnt == 4) {
            cls = "large-3";
        } else if (cnt >= 5) {
            cls = "large-2";
        }

        $(category_selector).parents('div.category_choice').parent().children('.category_choice').filter(function () {
            return $(this).css("display") === "block";
        }).removeClass('large-12');
        $(category_selector).parents('div.category_choice').parent().children('.category_choice').filter(function () {
            return $(this).css("display") === "block";
        }).removeClass('large-6');
        $(category_selector).parents('div.category_choice').parent().children('.category_choice').filter(function () {
            return $(this).css("display") === "block";
        }).removeClass('large-4');
        $(category_selector).parents('div.category_choice').parent().children('.category_choice').filter(function () {
            return $(this).css("display") === "block";
        }).removeClass('large-3');
        $(category_selector).parents('div.category_choice').parent().children('.category_choice').filter(function () {
            return $(this).css("display") === "block";
        }).addClass(cls);
    };
    var singleton = new multilevelselect();

    return {
        getInstance: function getInstance() {
            return singleton;
        },
        my_prototype: multilevelselect
    };
}();

if (true) {
    module.exports = FA.MultiLevelSelect;
}

/***/ }),

/***/ "./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/faMultiLevelSelectLocation.js":
/*!**********************************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/faMultiLevelSelectLocation.js ***!
  \**********************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

FA.MultiLevelSelectLocation = function () {

    /* EVENTS START */
    var Events = function Events() {};

    Events.prototype.setLocationIdOnLoad = function () {
        singleton.setLocationIdOnLoadHandler();
    };

    Events.prototype.locatoinChange = function () {
        $("." + singleton.getProperty('fieldName')).off().on('change', function (e) {
            if ($(this).parent().hasClass('error')) {
                $(this).nextAll('div.form-error').first().remove();
                $(this).parent().nextAll('div.form-error').first().remove();
                $(this).parent().removeClass('error');
            }
            singleton.locatoinChangeHandler(this);
        });
    };

    Events.prototype.bind = function () {
        Events.prototype.setLocationIdOnLoad();
        Events.prototype.locatoinChange();
    };

    var events = new Events();
    /* EVENTS END */

    /* PROPERTEIS START */
    var Properties = function Properties() {
        this.arr = {
            'totalLevel': null,
            'formName': null,
            'fieldName': null,
            'optslctsbcat': null,
            'locajxgtndjn': null,
            'optslctsbcat_1': null,
            'optslctsbcat_2': null,
            'optslctsbcat_3': null,
            'optslctsbcat_4': null,
            'optslctsbcat_5': null
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

    var multilevelselectlocation = function multilevelselectlocation() {};

    multilevelselectlocation.prototype.init = function (options) {
        options = options || {};
        properties.set(options);
        events.bind();
    };

    multilevelselectlocation.prototype.getProperty = function (key) {
        _properties = properties.get();
        return _properties[key];
    };

    multilevelselectlocation.prototype.setLocationIdOnLoadHandler = function () {
        var category_id = $('#' + singleton.getProperty('formName') + '_' + singleton.getProperty('fieldName')).val();
        var total_level = singleton.getProperty('totalLevel');
        for (var l = 1; l <= total_level; l++) {
            var propertyName = 'optslctsbcat_' + l;
            $('#' + singleton.getProperty('formName') + '_' + singleton.getProperty('fieldName') + '_' + l + ' > option:first-child').text(singleton.getProperty(propertyName));
            if ($('#' + singleton.getProperty('formName') + '_' + singleton.getProperty('fieldName') + '_' + l).val()) {
                category_id = $('#' + singleton.getProperty('formName') + '_' + singleton.getProperty('fieldName') + '_' + l).val();
            }
        }

        singleton.setLocationVal();
    };

    multilevelselectlocation.prototype.locatoinChangeHandler = function (that) {
        var fieldId = $(that).attr('id');
        var level = fieldId.replace(singleton.getProperty('formName') + '_' + singleton.getProperty('fieldName') + '_', '');
        var nextLevel = parseInt(level) + 1;

        if (nextLevel <= singleton.getProperty('totalLevel')) {
            singleton.loadLocationByLevel($(that).val(), nextLevel);
        } else {
            singleton.setLocationVal();
        }
    };

    multilevelselectlocation.prototype.loadLocationByLevel = function (id, level) {
        var location_selector = $('#' + singleton.getProperty('formName') + '_' + singleton.getProperty('fieldName') + '_' + level);
        var propertyName = 'optslctsbcat_' + level;
        location_selector.html('<option value="">' + singleton.getProperty(propertyName) + '</option>');

        singleton.setLocationVal();
        if (level == singleton.getProperty('totalLevel') - 1) {
            $('#' + singleton.getProperty('formName') + '_' + singleton.getProperty('fieldName')).val('');
            /*$('#'+singleton.getProperty('formName')+'_'+singleton.getProperty('fieldName')+'_'+ (level + 1)).val('');
            var propertyName = 'optslctsbcat_'+ (level + 1);
            $('#'+singleton.getProperty('formName')+'_'+singleton.getProperty('fieldName')+'_'+ (level + 1)).html('<option value="">'+singleton.getProperty(propertyName)+'</option>');*/
        }

        if (id) {
            singleton.setLocationVal();
            var data = {
                id: id,
                level: level
            };
            $.ajax({
                type: 'post',
                url: singleton.getProperty('locajxgtndjn'),
                data: data,
                success: function success(data) {
                    if (data.length > 0) {
                        if ($(location_selector).parents('div.category_choice').length > 0) {
                            $('#category_choice_div_' + level).parent().show();
                        } else {
                            $('#category_choice_div_' + level).show();
                        }
                        for (var i = 0, total = data.length; i < total; i++) {
                            location_selector.append('<option value="' + data[i].id + '">' + data[i].text + '</option>');
                        }
                    } else {
                        level = parseInt(level) - 1;
                    }
                }
            });
        } else {
            if (id == 'no-category') {
                $('#' + singleton.getProperty('formName') + '_' + singleton.getProperty('fieldName')).val('no-category');
            }

            level = parseInt(level) - 1;
        }

        for (var l = parseInt(level) + 1; l <= singleton.getProperty('totalLevel'); l++) {
            var propertyNameS = 'optslctsbcat_' + l;
            $('#' + singleton.getProperty('formName') + '_' + singleton.getProperty('fieldName') + '_' + l).html('<option value="">' + singleton.getProperty(propertyNameS) + '</option>');
        }
    };

    multilevelselectlocation.prototype.setLocationVal = function () {
        var locationS = '';
        var total_level = singleton.getProperty('totalLevel');
        var count = 1;
        for (var l = 1; l <= total_level; l++) {
            if ($('#' + singleton.getProperty('formName') + '_' + singleton.getProperty('fieldName') + '_' + l).val()) {
                locationS = $('#' + singleton.getProperty('formName') + '_' + singleton.getProperty('fieldName') + '_' + l).val();
                /*if (count == 1) {
                    locationS = $('#'+ singleton.getProperty('formName') +'_'+ singleton.getProperty('fieldName') +'_'+l).val();
                } else {
                    locationS = locationS + ', ' + $('#'+ singleton.getProperty('formName') +'_'+ singleton.getProperty('fieldName') +'_'+l).val();
                }*/
                count++;
            } else {
                $('#' + singleton.getProperty('formName') + '_' + singleton.getProperty('fieldName') + '_' + l).val('');
            }
        }

        $('#' + singleton.getProperty('formName') + '_' + singleton.getProperty('fieldName')).val(locationS);
    };

    var singleton = new multilevelselectlocation();

    return {
        getInstance: function getInstance() {
            return singleton;
        },
        my_prototype: multilevelselectlocation
    };
}();

if (true) {
    module.exports = FA.MultiLevelSelectLocation;
}

/***/ }),

/***/ "./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/multilevelselect.js":
/*!************************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/multilevelselect.js ***!
  \************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

window.FA.MultiLevelSelect = __webpack_require__(/*! Faf/CoreBundle/Resources/public/js/faMultiLevelSelect.js */ "./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/faMultiLevelSelect.js");
window.FA.MultiLevelSelectLocation = __webpack_require__(/*! Faf/CoreBundle/Resources/public/js/faMultiLevelSelectLocation.js */ "./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/faMultiLevelSelectLocation.js");

/***/ })

/******/ });