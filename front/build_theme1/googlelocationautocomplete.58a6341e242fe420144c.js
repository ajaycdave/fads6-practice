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
/******/ 	return __webpack_require__(__webpack_require__.s = "./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/googlelocationautocomplete.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/faGoogleLocationAutoComplete.js":
/*!************************************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/faGoogleLocationAutoComplete.js ***!
  \************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

FA.GoogleLocationAutoComplete = function () {

    /* EVENTS START */
    var Events = function Events() {};

    Events.prototype.bindGoogleLocationAutocompleteEvents = function () {
        singleton.bindGoogleLocationAutocompleteEventsHandler();
    };

    Events.prototype.bindGoogleLocationAutocompleteOnKeyup = function () {
        var container = properties.get().container;
        if (!container) {
            container = '.google_location_autocomplete';
        }

        $(container).each(function (e) {
            var fieldId = $(this).attr('id');
            $("#" + fieldId).on("keyup", function (e) {
                if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 188 || e.keyCode == 173) {
                    singleton.clearLocationFieldsHandler();
                }
                if (e.keyCode === 13) {
                    e.preventDefault();
                }
            });

            $("#" + fieldId).on("keydown", function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                }
            });
        });
    };

    Events.prototype.bindSubFieldsOnLostFocus = function () {
        singleton.bindSubFieldsOnLostFocusHandler();
    };

    Events.prototype.bindToggleLocationFieldsEvents = function () {
        singleton.bindToggleLocationFieldsEventsHandler();
    };

    Events.prototype.initDataValues = function () {
        $(properties.get().container).each(function (e) {
            $('#' + $(this).attr('id')).data('autocomplete_value', $('#' + $(this).attr('id')).val());
        });
    };

    Events.prototype.bind = function () {
        Events.prototype.bindGoogleLocationAutocompleteEvents();
        Events.prototype.bindGoogleLocationAutocompleteOnKeyup();
        Events.prototype.bindToggleLocationFieldsEvents();
        Events.prototype.bindSubFieldsOnLostFocus();
        Events.prototype.initDataValues();
    };

    var events = new Events();
    /* EVENTS END */

    /* PROPERTEIS START */
    var Properties = function Properties() {
        this.arr = {
            container: '.google_location_autocomplete',
            formName: null,
            componentForm: null,
            countryCodes: null,
            locationLabel: null,
            locationType: null
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

    var google_location_autocomplete = function google_location_autocomplete() {};

    google_location_autocomplete.prototype.init = function (options) {
        options = options || {};
        properties.set(options);
        events.bind();
    };

    google_location_autocomplete.prototype.getProperty = function (key) {
        _properties = properties.get();
        return _properties[key];
    };

    google_location_autocomplete.prototype.bindGoogleLocationAutocompleteEventsHandler = function () {

        var container = properties.get().container;
        if (!container) {
            container = '.google_location_autocomplete';
        }

        $(container).each(function (e) {
            var autoCompleteFieldId = $(this).attr('id');
            singleton.initGoogleAutocomplete(autoCompleteFieldId);
        });
    };

    google_location_autocomplete.prototype.initGoogleAutocomplete = function (autoCompleteFieldId) {
        objAutoComplete = new google.maps.places.Autocomplete(document.getElementById(autoCompleteFieldId), singleton.getAutocompleteOptions());
        objAutoComplete.setFields(['address_components', 'geometry', 'place_id', 'formatted_address', 'name']);
        objAutoComplete.addListener('place_changed', function () {
            singleton.fillInAddress();
            if ($('#' + autoCompleteFieldId).data('after-place-changed-callback') != undefined) {

                _context = window;
                _instance = '';

                str = $('#' + autoCompleteFieldId).data('after-place-changed-callback');
                strArr = str.split('.');
                methodName = strArr.slice(-1)[0];

                for (i = 0; i < strArr.length; i++) {
                    console.log('STR = ' + strArr[i]);
                    if (strArr[i].includes('getInstance')) {
                        _instance = _context['getInstance']();
                    } else if (strArr[i].includes('getNamespaceInstance')) {
                        s = strArr[i].match(/'([^']+)'/)[1];
                        _instance = _instance['getNamespaceInstance'](s);
                    } else {
                        _context = _context[strArr[i]];
                    }
                }

                _instance[methodName](objAutoComplete);
            }
        });
    };

    google_location_autocomplete.prototype.getAutocompleteOptions = function () {
        var countryCodes = singleton.getProperty('countryCodes');
        var optionA = { types: ["geocode"], componentRestrictions: { country: [] } };

        if (singleton.getProperty('locationType') != null) {
            optionA.types = [singleton.getProperty('locationType')];
        }

        if (countryCodes.length) {
            optionA.componentRestrictions.country = countryCodes.split(',');
        }

        return optionA;
    };

    google_location_autocomplete.prototype.fillInAddress = function (objPlace) {
        var locationDataO = {};
        if (typeof objPlace == 'undefined') {
            var objPlace = objAutoComplete.getPlace();
        }

        if (typeof objPlace == 'undefined') return;

        if (document.getElementById(properties.get().formName + '_place_id') && objPlace.hasOwnProperty('place_id')) {
            document.getElementById(properties.get().formName + '_place_id').value = objPlace.place_id;
        }

        if (document.getElementById(properties.get().formName + '_latitude') && objPlace.hasOwnProperty('geometry')) {
            document.getElementById(properties.get().formName + '_latitude').value = objPlace.geometry.location.lat();
        }

        if (document.getElementById(properties.get().formName + '_longitude') && objPlace.hasOwnProperty('geometry')) {
            document.getElementById(properties.get().formName + '_longitude').value = objPlace.geometry.location.lng();
        }

        if (document.getElementById(properties.get().formName + '_location') && objPlace.hasOwnProperty('formatted_address')) {
            $('#' + properties.get().formName + '_location').data('autocomplete_value', $('#' + properties.get().formName + '_location').val());
        }

        for (var component in properties.get().componentForm) {
            if (document.getElementById(component)) {
                document.getElementById(component).value = '';
                if (component != properties.get().formName + '_formatted_address') {
                    $('#' + component).removeAttr('readonly');
                }
            }
        }

        for (var i = 0; objPlace.hasOwnProperty('address_components') && i < objPlace.address_components.length; i++) {
            var fieldId = properties.get().formName + "_" + objPlace.address_components[i].types[0];
            if (properties.get().componentForm[fieldId]) {
                var val = objPlace.address_components[i][properties.get().componentForm[fieldId]];
                if (document.getElementById(fieldId) && val.length > 0) {
                    document.getElementById(fieldId).value = val;
                    locationDataO[objPlace.address_components[i].types[0]] = val;
                    $('#' + fieldId).attr('readonly', 'readonly');
                } else if (document.getElementById(fieldId)) {
                    if (fieldId != properties.get().formName + '_formatted_address') {
                        $('#' + component).removeAttr('readonly');
                    }
                }
            }
        }

        if (document.getElementById(properties.get().formName + '_formatted_address')) {
            if (document.getElementById(properties.get().formName + '_formatted_address').value == '' && objPlace.hasOwnProperty('formatted_address') && objPlace.formatted_address != '') {
                document.getElementById(properties.get().formName + '_formatted_address').value = objPlace.formatted_address;
                $('#' + properties.get().formName + '_formatted_address').attr('readonly', 'readonly');
            }
        }

        if (document.getElementById(properties.get().formName + '_full_address')) {
            var fullAddressS = singleton.generateFullAddressFromLocationData(locationDataO);
            document.getElementById(properties.get().formName + '_full_address').value = fullAddressS;
            $('#location_text').html(properties.get().locationLabel + ": " + fullAddressS);
            $('#location_text').removeClass('hide');
        }

        var countryS = $.trim(document.getElementById(properties.get().formName + '_country').value);
        if (document.getElementById(properties.get().formName + '_locality')) {
            var localityS = $.trim(document.getElementById(properties.get().formName + '_locality').value);
            if (localityS.length > 0 && countryS.length > 0 && document.getElementById(properties.get().formName + '_locality__country')) {
                document.getElementById(properties.get().formName + '_locality__country').value = document.getElementById(properties.get().formName + '_locality').value + ', ' + document.getElementById(properties.get().formName + '_country').value;
            }
        }
        if (document.getElementById(properties.get().formName + '_administrative_area_level_1')) {
            var adminAL1S = $.trim(document.getElementById(properties.get().formName + '_administrative_area_level_1').value);
            if (adminAL1S.length > 0 && countryS.length > 0 && document.getElementById(properties.get().formName + '_administrative_area_level_1__country')) {
                document.getElementById(properties.get().formName + '_administrative_area_level_1__country').value = document.getElementById(properties.get().formName + '_administrative_area_level_1').value + ', ' + document.getElementById(properties.get().formName + '_country').value;
            }
        }
        if (document.getElementById(properties.get().formName + '_administrative_area_level_2')) {
            var adminAL2S = $.trim(document.getElementById(properties.get().formName + '_administrative_area_level_2').value);
            if (adminAL2S.length > 0 && countryS.length > 0 && document.getElementById(properties.get().formName + '_administrative_area_level_2__country')) {
                document.getElementById(properties.get().formName + '_administrative_area_level_2__country').value = document.getElementById(properties.get().formName + '_administrative_area_level_2').value + ', ' + document.getElementById(properties.get().formName + '_country').value;
            }
        }
    };

    google_location_autocomplete.prototype.clearLocationFieldsHandler = function () {

        if ($('#' + properties.get().formName + '_location').val() === $('#' + properties.get().formName + '_location').data('autocomplete_value')) return;

        for (var component in properties.get().componentForm) {
            if (document.getElementById(component)) {
                document.getElementById(component).value = '';
                if (component != properties.get().formName + '_formatted_address') {
                    $('#' + component).removeAttr('readonly');
                }
            }
        }

        if (document.getElementById(properties.get().formName + '_place_id')) {
            document.getElementById(properties.get().formName + '_place_id').value = '';
        }

        if (document.getElementById(properties.get().formName + '_latitude')) {
            document.getElementById(properties.get().formName + '_latitude').value = '';
        }

        if (document.getElementById(properties.get().formName + '_longitude')) {
            document.getElementById(properties.get().formName + '_longitude').value = '';
        }

        if (document.getElementById(properties.get().formName + '_locality__country')) {
            document.getElementById(properties.get().formName + '_locality__country').value = '';
        }

        if (document.getElementById(properties.get().formName + '_administrative_area_level_1__country')) {
            document.getElementById(properties.get().formName + '_administrative_area_level_1__country').value = '';
        }

        if (document.getElementById(properties.get().formName + '_administrative_area_level_2__country')) {
            document.getElementById(properties.get().formName + '_administrative_area_level_2__country').value = '';
        }
    };

    google_location_autocomplete.prototype.generateFullAddressFromLocationData = function (locationDataO) {
        var fullAddressS = '';
        if (typeof locationDataO.street_number != 'undefined' && locationDataO.street_number.trim() != '') {
            fullAddressS = locationDataO.street_number;
        }
        if (typeof locationDataO.route != 'undefined' && locationDataO.route.trim() != '') {
            if (fullAddressS.length > 0) {
                fullAddressS = fullAddressS + ', ';
            }
            fullAddressS = fullAddressS + locationDataO.route;
        }
        if (typeof locationDataO.postal_town != 'undefined' && locationDataO.postal_town.trim() != '') {
            if (fullAddressS.length > 0) {
                fullAddressS = fullAddressS + ', ';
            }
            fullAddressS = fullAddressS + locationDataO.postal_town;
        }
        if (typeof locationDataO.locality != 'undefined' && locationDataO.locality.trim() != '') {
            if (fullAddressS.length > 0) {
                fullAddressS = fullAddressS + ', ';
            }
            fullAddressS = fullAddressS + locationDataO.locality;
        }
        if (typeof locationDataO.administrative_area_level_1 != 'undefined' && locationDataO.administrative_area_level_1.trim() != '') {
            if (fullAddressS.length > 0) {
                fullAddressS = fullAddressS + ', ';
            }
            fullAddressS = fullAddressS + locationDataO.administrative_area_level_1;
        }
        if (typeof locationDataO.administrative_area_level_2 != 'undefined' && locationDataO.administrative_area_level_2.trim() != '') {
            if (fullAddressS.length > 0) {
                fullAddressS = fullAddressS + ', ';
            }
            fullAddressS = fullAddressS + locationDataO.administrative_area_level_2;
        }
        if (typeof locationDataO.postal_code != 'undefined' && locationDataO.postal_code.trim() != '') {
            if (fullAddressS.length > 0) {
                fullAddressS = fullAddressS + ', ';
            }
            fullAddressS = fullAddressS + locationDataO.postal_code;
        }
        if (typeof locationDataO.country != 'undefined' && locationDataO.country.trim() != '') {
            if (fullAddressS.length > 0) {
                fullAddressS = fullAddressS + ', ';
            }
            fullAddressS = fullAddressS + locationDataO.country;
        }

        return fullAddressS;
    };

    google_location_autocomplete.prototype.bindToggleLocationFieldsEventsHandler = function () {
        $("#location_text").off("click");
        $("#location_text").on("click", function (e) {
            $('#location_sub_fields').toggle('fast');
        });
    };

    google_location_autocomplete.prototype.bindSubFieldsOnLostFocusHandler = function () {
        var locationDataO = {};
        $('#location_sub_fields :input').on("change", function (e) {
            $('#location_sub_fields :input').each(function () {
                var fieldName = this.name.replace(properties.get().formName, '');
                fieldName = fieldName.replace('[', '');
                fieldName = fieldName.replace(']', '');
                locationDataO[fieldName] = this.value;
            });

            if (document.getElementById(properties.get().formName + '_full_address')) {
                var fullAddressS = singleton.generateFullAddressFromLocationData(locationDataO);
                document.getElementById(properties.get().formName + '_full_address').value = fullAddressS;
                $('#location_text').html(properties.get().locationLabel + ": " + fullAddressS);
            }
        });
    };

    var singleton = new google_location_autocomplete();

    return {
        getInstance: function getInstance() {
            return singleton;
        },
        my_prototype: google_location_autocomplete
    };
}();

if (true) {
    module.exports = FA.GoogleLocationAutoComplete;
}

/***/ }),

/***/ "./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/googlelocationautocomplete.js":
/*!**********************************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/googlelocationautocomplete.js ***!
  \**********************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

window.FA.GoogleLocationAutoComplete = __webpack_require__(/*! Faf/CoreBundle/Resources/public/js/faGoogleLocationAutoComplete.js */ "./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/faGoogleLocationAutoComplete.js");

/***/ })

/******/ });