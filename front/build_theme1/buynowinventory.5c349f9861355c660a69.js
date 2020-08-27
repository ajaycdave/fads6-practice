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
/******/ 	return __webpack_require__(__webpack_require__.s = "./vendor/fads/frontend/src/Faf/Bundle/BuynowBundle/Resources/public/js/buynowinventory.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./vendor/fads/frontend/src/Faf/Bundle/BuynowBundle/Resources/public/js/buynowinventory.js":
/*!*************************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/BuynowBundle/Resources/public/js/buynowinventory.js ***!
  \*************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

window.FA.BuynowInventoryPrimaryFields = __webpack_require__(/*! Faf/BuynowBundle/Resources/public/js/faBuynowInventoryPrimaryFields.js */ "./vendor/fads/frontend/src/Faf/Bundle/BuynowBundle/Resources/public/js/faBuynowInventoryPrimaryFields.js");
window.FA.BuynowInventoryUnitFields = __webpack_require__(/*! Faf/BuynowBundle/Resources/public/js/faBuynowInventoryUnitFields.js */ "./vendor/fads/frontend/src/Faf/Bundle/BuynowBundle/Resources/public/js/faBuynowInventoryUnitFields.js");

$(document).ready(function () {
    $(document).foundation();
});

/***/ }),

/***/ "./vendor/fads/frontend/src/Faf/Bundle/BuynowBundle/Resources/public/js/faBuynowInventoryPrimaryFields.js":
/*!****************************************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/BuynowBundle/Resources/public/js/faBuynowInventoryPrimaryFields.js ***!
  \****************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

FA.BuynowInventoryPrimaryFields = function () {
    /* EVENTS START */
    var Events = function Events() {};

    Events.prototype.inventoryTypeClick = function () {
        $('body').on('click', '[name="item[inventory_type]"]', singleton.inventoryTypeClickHandler);
    };

    Events.prototype.vatTypeClick = function () {
        $('body').on('click', '[name="item[vat_type]"]', singleton.vatTypeClickHandler);
    };

    Events.prototype.inventoryIsUnlimitedHideShowClick = function () {
        $('body').on('click', 'input:checkbox.is_unlimited', singleton.inventoryIsUnlimitedHideShowClickHandler);
        singleton.inventoryIsUnlimitedHideShowClickHandler();
    };

    Events.prototype.ajaxSuccessCall = function () {
        $(document).ajaxSuccess(singleton.ajaxSuccessCallHandler);
    };

    Events.prototype.bind = function () {
        Events.prototype.inventoryIsUnlimitedHideShowClick();
        Events.prototype.inventoryTypeClick();
        Events.prototype.ajaxSuccessCall();
        Events.prototype.vatTypeClick();
    };

    var events = new Events();
    /* EVENTS END */

    /* PROPERTEIS START */
    var Properties = function Properties() {
        this.arr = {};
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

    var BuynowInventoryPrimaryFields = function BuynowInventoryPrimaryFields() {};

    /* Start Public Methods*/

    BuynowInventoryPrimaryFields.prototype.getProperty = function (key) {
        _properties = properties.get();
        return _properties[key];
    };

    BuynowInventoryPrimaryFields.prototype.init = function (options) {
        options = options || {};
        properties.set(options);
        events.bind();
    };

    BuynowInventoryPrimaryFields.prototype.inventoryIsUnlimitedHideShowClickHandler = function (e) {
        if ($('input:checkbox.is_unlimited').is(':checked')) {
            $('.form-field-qty').hide();
            $('.qty').val('');
            $('.form-field-low-stock-thresold').hide();
            $('.low_stock_thresold').val('');
        } else {
            $('.form-field-qty').show();
            $('.form-field-low-stock-thresold').show();
        }
    };

    BuynowInventoryPrimaryFields.prototype.inventoryTypeClickHandler = function (e) {
        var inventoryTypeIdI = parseInt($(this).val());
        var stockSlugS = '';

        if (inventoryTypeIdI > 0 /* && $('#buynow_inventory_main').length*/) {
                FA.PageBlock.getInstance().blockPage();

                $.ajax({
                    type: 'GET',
                    url: Routing.generate('buynow_is_stock_inventory_type', { 'inventory_type_id': inventoryTypeIdI })
                }).always(function (response) {
                    FA.PageBlock.getInstance().unblockPage();
                }).done(function (response) {
                    if ($('#buynow_inventory_main').length) {
                        if (typeof response.is_stock_type !== 'undefined' && response.is_stock_type) {
                            $('#buynow_inventory_main').show();

                            if ($('div[id^=buynow_inventory_row]').length) {
                                $('div[id^=buynow_inventory_row]').show();
                            }

                            if ($('#inventory-add-row-btn').length) {
                                $('#inventory-add-row-btn').show();
                            }
                        } else {
                            $('#buynow_inventory_main').hide();

                            if ($('div[id^=buynow_inventory_row]').length) {
                                $('div[id^=buynow_inventory_row]').hide();
                            }

                            if ($('#inventory-add-row-btn').length) {
                                $('#inventory-add-row-btn').hide();
                            }
                        }
                    } else {
                        if (typeof response.is_stock_type !== 'undefined' && response.is_stock_type) {
                            // $('#item').submit();
                            if ($('#item_id').length > 0 && $('#item_id').val() != '') {
                                route = Routing.generate('user_item_edit_category_item_type', {
                                    'category_id': $('#' + FA.ItemPost.getInstance().getProperty('formName') + '_category').val(),
                                    'item_type': $('#' + FA.ItemPost.getInstance().getProperty('formName') + '_item_type').val(), 'validate': 0,
                                    'item_gallery_counter': properties.get().itemGalleryCounter,
                                    'item_document_counter': properties.get().itemDocumentCounter,
                                    'step': 1,
                                    'id': $('#item_id').val(),
                                    'inventory_type_id': inventoryTypeIdI
                                });
                                $.ajax({
                                    type: "GET",
                                    url: route
                                }).always(function (response) {
                                    FA.PageBlock.getInstance().unblockElement('#item_form_main');
                                    $('#item_form_fields button[type=submit]').removeAttr('disabled');
                                }).done(function (response) {
                                    if (response.htmlContent) {
                                        $('#item_form_fields').html(response.htmlContent).foundation();
                                    }
                                });
                            } else {
                                $('#item').submit();
                            }

                            // $('#' + FA.ItemPost.getInstance().getProperty('formName') + '_item_type').trigger('change');
                        }
                    }
                    /*if (typeof response.is_stock_type !== 'undefined' && response.is_stock_type) {
                        $('#buynow_inventory_main').show();
                         if ($('#buynow_extra_inventory_fields').length) {
                            $('#buynow_extra_inventory_fields').show();
                        }
                    } else {
                        $('#buynow_inventory_main').hide();
                         if ($('#buynow_extra_inventory_fields').length) {
                            $('#buynow_extra_inventory_fields').hide();
                        }
                    }*/
                });
            }
    };

    BuynowInventoryPrimaryFields.prototype.vatTypeClickHandler = function (e) {
        var vatTypeIdI = parseInt($(this).val());
        var stockSlugS = '';

        if (vatTypeIdI > 0) {
            FA.PageBlock.getInstance().blockPage();

            $.ajax({
                type: 'GET',
                url: Routing.generate('buynow_is_custom_vat_type', { 'vat_type_id': vatTypeIdI })
            }).always(function (response) {
                FA.PageBlock.getInstance().unblockPage();
            }).done(function (response) {
                if (typeof response.is_custom_type !== 'undefined' && response.is_custom_type) {
                    $('.form-field-custom-vat').show();
                } else {
                    $('.form-field-custom-vat :input').val('');
                    $('.form-field-custom-vat').hide();
                }
            });
        }
    };

    BuynowInventoryPrimaryFields.prototype.ajaxSuccessCallHandler = function (e) {
        if ($('input:checkbox.is_unlimited').length) {
            singleton.inventoryIsUnlimitedHideShowClickHandler();
        }
    };

    // SINGLETON
    var singleton = new BuynowInventoryPrimaryFields();

    // Module
    return {
        getInstance: function getInstance() {
            return singleton;
        },
        my_prototype: BuynowInventoryPrimaryFields // Prototype


        /* End Public Methods*/
    };
}();

if (true) {
    module.exports = FA.BuynowInventoryPrimaryFields;
}

/***/ }),

/***/ "./vendor/fads/frontend/src/Faf/Bundle/BuynowBundle/Resources/public/js/faBuynowInventoryUnitFields.js":
/*!*************************************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/BuynowBundle/Resources/public/js/faBuynowInventoryUnitFields.js ***!
  \*************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

FA.BuynowInventoryUnitFields = function () {
    /* EVENTS START */
    var Events = function Events() {};

    Events.prototype.inventoryAddRowLinkClick = function () {
        $('body').on('click', '#inventory-add-row-btn', singleton.inventoryAddRowLinkClickHandler);
    };

    Events.prototype.inventoryDeleteRowLinkClick = function () {
        $('body').on('click', '.inventory-delete-row-btn', singleton.inventoryDeleteRowLinkModalHandler);
    };

    Events.prototype.inventoryDeleteRowYesLinkClick = function () {
        $('body').on('click', '#yesClick', singleton.inventoryDeleteYesRowLinkClickHandler);
    };

    Events.prototype.inventoryDeleteRowNoLinkClick = function () {
        $('body').on('click', '#noClick', function (e) {
            $('#faf_buynow_unit_delete').foundation('close');
            properties.set({ 'deleteId': '' });
        });
    };

    Events.prototype.bind = function () {
        Events.prototype.inventoryAddRowLinkClick();
        Events.prototype.inventoryDeleteRowLinkClick();
        Events.prototype.inventoryDeleteRowYesLinkClick();
        Events.prototype.inventoryDeleteRowNoLinkClick();
    };

    var events = new Events();
    /* EVENTS END */

    /* PROPERTEIS START */
    var Properties = function Properties() {
        this.arr = {
            'deleteId': null
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

    var BuynowInventoryUnitFields = function BuynowInventoryUnitFields() {};

    /* Start Public Methods*/

    BuynowInventoryUnitFields.prototype.getProperty = function (key) {
        _properties = properties.get();
        return _properties[key];
    };

    BuynowInventoryUnitFields.prototype.init = function (options) {
        options = options || {};
        properties.set(options);
        events.bind();
    };

    BuynowInventoryUnitFields.prototype.inventoryAddRowLinkClickHandler = function (e) {
        e.preventDefault();
        var categoryIdI = 0;
        var rowIdI = 0;

        if ($('#item_inventory_row_count').length) {
            rowIdI = parseInt($('#item_inventory_row_count').val()) + 1;
        }

        if ($('#item_category').length) {
            categoryIdI = $('#item_category').val();
        }

        if (categoryIdI > 0 && rowIdI > 0) {
            FA.PageBlock.getInstance().blockPage();

            $.ajax({
                type: 'GET',
                url: Routing.generate('buynow_get_category_buynow_fields', { 'category_id': categoryIdI, 'row_id': rowIdI })
            }).always(function (response) {
                FA.PageBlock.getInstance().unblockPage();
            }).done(function (response) {
                if (typeof response.htmlContent !== 'undefined' && response.htmlContent.length) {
                    $('#buynow_add_more_wrapper').append(response.htmlContent);
                    $('#item_inventory_row_count').val(rowIdI);
                }
            });
        }
    };

    BuynowInventoryUnitFields.prototype.inventoryDeleteRowLinkModalHandler = function (e) {
        $('#faf_buynow_unit_delete').foundation('open');
        if ($(this).data('id') != 'undefined') {
            properties.set({ 'deleteId': $(this).data('id') });
        }
        return false;
    };

    BuynowInventoryUnitFields.prototype.inventoryDeleteYesRowLinkClickHandler = function (e) {
        e.preventDefault();

        if (properties.get().deleteId != '') {
            $('#buynow_inventory_row_' + properties.get().deleteId).remove();

            // rename existing rows to make it linear
            var j = 1;
            for (i = 1; i <= parseInt($('#item_inventory_row_count').val()); i++) {
                if ($('#buynow_inventory_row_' + i).length) {
                    if ($('#buynow_inventory_row_' + i).length) {
                        $('#buynow_inventory_row_' + i).attr('id', 'buynow_inventory_row_' + j);
                    }
                    if ($('[name="item[unit_' + i + ']"]').length) {
                        $('[name="item[unit_' + i + ']"]').attr('name', 'item[unit_' + j + ']').attr('data-id', j);
                    }
                    if ($('[name="item[unit_price_per_item_' + i + ']"]').length) {
                        $('[name="item[unit_price_per_item_' + i + ']"]').attr('name', 'item[unit_price_per_item_' + j + ']').attr('data-id', j);
                    }
                    if ($('[name="item[unit_qty_' + i + ']"]').length) {
                        $('[name="item[unit_qty_' + i + ']"]').attr('name', 'item[unit_qty_' + j + ']').attr('data-id', j);
                    }
                    if ($('[name="item[unit_availability_at_' + i + ']"]').length) {
                        $('[name="item[unit_availability_at_' + i + ']"]').attr('name', 'item[unit_availability_at_' + j + ']').attr('data-id', j);
                    }
                    if ($('[name="item[unit_delivery_method_' + i + '][]"]').length) {
                        $('[name="item[unit_delivery_method_' + i + '][]"]').each(function (index) {
                            $(this).attr('name', 'item[unit_delivery_method_' + j + '][]').attr('data-id', j);
                        });
                    }
                    if ($('[name="item[inventory_delete_row_btn_' + i + ']"]').length) {
                        $('[name="item[inventory_delete_row_btn_' + i + ']"]').attr('name', 'item[inventory_delete_row_btn_' + j + ']').attr('data-id', j);
                    }
                    j++;
                }
            }

            var rowCountI = parseInt($('#item_inventory_row_count').val()) - 1;
            $('#item_inventory_row_count').val(rowCountI);
            $('#faf_buynow_unit_delete').foundation('close');
            properties.set({ 'deleteId': '' });
        }
    };

    // SINGLETON
    var singleton = new BuynowInventoryUnitFields();

    // Module
    return {
        getInstance: function getInstance() {
            return singleton;
        },
        my_prototype: BuynowInventoryUnitFields // Prototype


        /* End Public Methods*/
    };
}();

if (true) {
    module.exports = FA.BuynowInventoryUnitFields;
}

/***/ })

/******/ });