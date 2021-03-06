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
/******/ 	return __webpack_require__(__webpack_require__.s = "./vendor/fads/frontend/src/Faf/Bundle/FrontendBundle/Resources/public/js/faTinyMce.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/tinymce/plugins/advlist/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/tinymce/plugins/advlist/index.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "advlist" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/advlist')
//   ES2015:
//     import 'tinymce/plugins/advlist'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/advlist/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/advlist/plugin.js":
/*!********************************************************!*\
  !*** ./node_modules/tinymce/plugins/advlist/plugin.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

(function () {
var advlist = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var applyListFormat = function (editor, listName, styleValue) {
    var cmd = listName === 'UL' ? 'InsertUnorderedList' : 'InsertOrderedList';
    editor.execCommand(cmd, false, styleValue === false ? null : { 'list-style-type': styleValue });
  };
  var $_8f96lb7fjcq8h64u = { applyListFormat: applyListFormat };

  var register = function (editor) {
    editor.addCommand('ApplyUnorderedListStyle', function (ui, value) {
      $_8f96lb7fjcq8h64u.applyListFormat(editor, 'UL', value['list-style-type']);
    });
    editor.addCommand('ApplyOrderedListStyle', function (ui, value) {
      $_8f96lb7fjcq8h64u.applyListFormat(editor, 'OL', value['list-style-type']);
    });
  };
  var $_4n78in7ejcq8h64t = { register: register };

  var getNumberStyles = function (editor) {
    var styles = editor.getParam('advlist_number_styles', 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman');
    return styles ? styles.split(/[ ,]/) : [];
  };
  var getBulletStyles = function (editor) {
    var styles = editor.getParam('advlist_bullet_styles', 'default,circle,disc,square');
    return styles ? styles.split(/[ ,]/) : [];
  };
  var $_6o3v9k7hjcq8h64y = {
    getNumberStyles: getNumberStyles,
    getBulletStyles: getBulletStyles
  };

  var isChildOfBody = function (editor, elm) {
    return editor.$.contains(editor.getBody(), elm);
  };
  var isTableCellNode = function (node) {
    return node && /^(TH|TD)$/.test(node.nodeName);
  };
  var isListNode = function (editor) {
    return function (node) {
      return node && /^(OL|UL|DL)$/.test(node.nodeName) && isChildOfBody(editor, node);
    };
  };
  var getSelectedStyleType = function (editor) {
    var listElm = editor.dom.getParent(editor.selection.getNode(), 'ol,ul');
    return editor.dom.getStyle(listElm, 'listStyleType') || '';
  };
  var $_e69no07ijcq8h64z = {
    isTableCellNode: isTableCellNode,
    isListNode: isListNode,
    getSelectedStyleType: getSelectedStyleType
  };

  var styleValueToText = function (styleValue) {
    return styleValue.replace(/\-/g, ' ').replace(/\b\w/g, function (chr) {
      return chr.toUpperCase();
    });
  };
  var toMenuItems = function (styles) {
    return Tools.map(styles, function (styleValue) {
      var text = styleValueToText(styleValue);
      var data = styleValue === 'default' ? '' : styleValue;
      return {
        text: text,
        data: data
      };
    });
  };
  var $_j7b5g7jjcq8h651 = { toMenuItems: toMenuItems };

  var findIndex = function (list, predicate) {
    for (var index = 0; index < list.length; index++) {
      var element = list[index];
      if (predicate(element)) {
        return index;
      }
    }
    return -1;
  };
  var listState = function (editor, listName) {
    return function (e) {
      var ctrl = e.control;
      editor.on('NodeChange', function (e) {
        var tableCellIndex = findIndex(e.parents, $_e69no07ijcq8h64z.isTableCellNode);
        var parents = tableCellIndex !== -1 ? e.parents.slice(0, tableCellIndex) : e.parents;
        var lists = Tools.grep(parents, $_e69no07ijcq8h64z.isListNode(editor));
        ctrl.active(lists.length > 0 && lists[0].nodeName === listName);
      });
    };
  };
  var updateSelection = function (editor) {
    return function (e) {
      var listStyleType = $_e69no07ijcq8h64z.getSelectedStyleType(editor);
      e.control.items().each(function (ctrl) {
        ctrl.active(ctrl.settings.data === listStyleType);
      });
    };
  };
  var addSplitButton = function (editor, id, tooltip, cmd, nodeName, styles) {
    editor.addButton(id, {
      active: false,
      type: 'splitbutton',
      tooltip: tooltip,
      menu: $_j7b5g7jjcq8h651.toMenuItems(styles),
      onPostRender: listState(editor, nodeName),
      onshow: updateSelection(editor),
      onselect: function (e) {
        $_8f96lb7fjcq8h64u.applyListFormat(editor, nodeName, e.control.settings.data);
      },
      onclick: function () {
        editor.execCommand(cmd);
      }
    });
  };
  var addButton = function (editor, id, tooltip, cmd, nodeName, styles) {
    editor.addButton(id, {
      active: false,
      type: 'button',
      tooltip: tooltip,
      onPostRender: listState(editor, nodeName),
      onclick: function () {
        editor.execCommand(cmd);
      }
    });
  };
  var addControl = function (editor, id, tooltip, cmd, nodeName, styles) {
    if (styles.length > 0) {
      addSplitButton(editor, id, tooltip, cmd, nodeName, styles);
    } else {
      addButton(editor, id, tooltip, cmd, nodeName, styles);
    }
  };
  var register$1 = function (editor) {
    addControl(editor, 'numlist', 'Numbered list', 'InsertOrderedList', 'OL', $_6o3v9k7hjcq8h64y.getNumberStyles(editor));
    addControl(editor, 'bullist', 'Bullet list', 'InsertUnorderedList', 'UL', $_6o3v9k7hjcq8h64y.getBulletStyles(editor));
  };
  var $_ae567h7gjcq8h64v = { register: register$1 };

  PluginManager.add('advlist', function (editor) {
    var hasPlugin = function (editor, plugin) {
      var plugins = editor.settings.plugins ? editor.settings.plugins : '';
      return Tools.inArray(plugins.split(/[ ,]/), plugin) !== -1;
    };
    if (hasPlugin(editor, 'lists')) {
      $_ae567h7gjcq8h64v.register(editor);
      $_4n78in7ejcq8h64t.register(editor);
    }
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()


/***/ }),

/***/ "./node_modules/tinymce/plugins/code/index.js":
/*!****************************************************!*\
  !*** ./node_modules/tinymce/plugins/code/index.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "code" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/code')
//   ES2015:
//     import 'tinymce/plugins/code'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/code/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/code/plugin.js":
/*!*****************************************************!*\
  !*** ./node_modules/tinymce/plugins/code/plugin.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

(function () {
var code = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var getMinWidth = function (editor) {
    return editor.getParam('code_dialog_width', 600);
  };
  var getMinHeight = function (editor) {
    return editor.getParam('code_dialog_height', Math.min(DOMUtils.DOM.getViewPort().h - 200, 500));
  };
  var $_2gs58k91jcq8h69z = {
    getMinWidth: getMinWidth,
    getMinHeight: getMinHeight
  };

  var setContent = function (editor, html) {
    editor.focus();
    editor.undoManager.transact(function () {
      editor.setContent(html);
    });
    editor.selection.setCursorLocation();
    editor.nodeChanged();
  };
  var getContent = function (editor) {
    return editor.getContent({ source_view: true });
  };
  var $_9j6n6593jcq8h6a1 = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_2gs58k91jcq8h69z.getMinWidth(editor);
    var minHeight = $_2gs58k91jcq8h69z.getMinHeight(editor);
    var win = editor.windowManager.open({
      title: 'Source code',
      body: {
        type: 'textbox',
        name: 'code',
        multiline: true,
        minWidth: minWidth,
        minHeight: minHeight,
        spellcheck: false,
        style: 'direction: ltr; text-align: left'
      },
      onSubmit: function (e) {
        $_9j6n6593jcq8h6a1.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_9j6n6593jcq8h6a1.getContent(editor));
  };
  var $_dbpg4r90jcq8h69x = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_dbpg4r90jcq8h69x.open(editor);
    });
  };
  var $_cm6iwg8zjcq8h69w = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_dbpg4r90jcq8h69x.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_dbpg4r90jcq8h69x.open(editor);
      }
    });
  };
  var $_c6v0ka94jcq8h6a2 = { register: register$1 };

  PluginManager.add('code', function (editor) {
    $_cm6iwg8zjcq8h69w.register(editor);
    $_c6v0ka94jcq8h6a2.register(editor);
    return {};
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()


/***/ }),

/***/ "./node_modules/tinymce/plugins/link/index.js":
/*!****************************************************!*\
  !*** ./node_modules/tinymce/plugins/link/index.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "link" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/link')
//   ES2015:
//     import 'tinymce/plugins/link'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/link/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/link/plugin.js":
/*!*****************************************************!*\
  !*** ./node_modules/tinymce/plugins/link/plugin.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

(function () {
var link = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var VK = tinymce.util.Tools.resolve('tinymce.util.VK');

  var assumeExternalTargets = function (editorSettings) {
    return typeof editorSettings.link_assume_external_targets === 'boolean' ? editorSettings.link_assume_external_targets : false;
  };
  var hasContextToolbar = function (editorSettings) {
    return typeof editorSettings.link_context_toolbar === 'boolean' ? editorSettings.link_context_toolbar : false;
  };
  var getLinkList = function (editorSettings) {
    return editorSettings.link_list;
  };
  var hasDefaultLinkTarget = function (editorSettings) {
    return typeof editorSettings.default_link_target === 'string';
  };
  var getDefaultLinkTarget = function (editorSettings) {
    return editorSettings.default_link_target;
  };
  var getTargetList = function (editorSettings) {
    return editorSettings.target_list;
  };
  var setTargetList = function (editor, list) {
    editor.settings.target_list = list;
  };
  var shouldShowTargetList = function (editorSettings) {
    return getTargetList(editorSettings) !== false;
  };
  var getRelList = function (editorSettings) {
    return editorSettings.rel_list;
  };
  var hasRelList = function (editorSettings) {
    return getRelList(editorSettings) !== undefined;
  };
  var getLinkClassList = function (editorSettings) {
    return editorSettings.link_class_list;
  };
  var hasLinkClassList = function (editorSettings) {
    return getLinkClassList(editorSettings) !== undefined;
  };
  var shouldShowLinkTitle = function (editorSettings) {
    return editorSettings.link_title !== false;
  };
  var allowUnsafeLinkTarget = function (editorSettings) {
    return typeof editorSettings.allow_unsafe_link_target === 'boolean' ? editorSettings.allow_unsafe_link_target : false;
  };
  var $_9mcqhkefjcq8h74b = {
    assumeExternalTargets: assumeExternalTargets,
    hasContextToolbar: hasContextToolbar,
    getLinkList: getLinkList,
    hasDefaultLinkTarget: hasDefaultLinkTarget,
    getDefaultLinkTarget: getDefaultLinkTarget,
    getTargetList: getTargetList,
    setTargetList: setTargetList,
    shouldShowTargetList: shouldShowTargetList,
    getRelList: getRelList,
    hasRelList: hasRelList,
    getLinkClassList: getLinkClassList,
    hasLinkClassList: hasLinkClassList,
    shouldShowLinkTitle: shouldShowLinkTitle,
    allowUnsafeLinkTarget: allowUnsafeLinkTarget
  };

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

  var appendClickRemove = function (link, evt) {
    document.body.appendChild(link);
    link.dispatchEvent(evt);
    document.body.removeChild(link);
  };
  var open = function (url) {
    if (!Env.ie || Env.ie > 10) {
      var link = document.createElement('a');
      link.target = '_blank';
      link.href = url;
      link.rel = 'noreferrer noopener';
      var evt = document.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      appendClickRemove(link, evt);
    } else {
      var win = window.open('', '_blank');
      if (win) {
        win.opener = null;
        var doc = win.document;
        doc.open();
        doc.write('<meta http-equiv="refresh" content="0; url=' + DOMUtils.DOM.encode(url) + '">');
        doc.close();
      }
    }
  };
  var $_4cx8z2egjcq8h74d = { open: open };

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var toggleTargetRules = function (rel, isUnsafe) {
    var rules = ['noopener'];
    var newRel = rel ? rel.split(/\s+/) : [];
    var toString = function (rel) {
      return Tools.trim(rel.sort().join(' '));
    };
    var addTargetRules = function (rel) {
      rel = removeTargetRules(rel);
      return rel.length ? rel.concat(rules) : rules;
    };
    var removeTargetRules = function (rel) {
      return rel.filter(function (val) {
        return Tools.inArray(rules, val) === -1;
      });
    };
    newRel = isUnsafe ? addTargetRules(newRel) : removeTargetRules(newRel);
    return newRel.length ? toString(newRel) : null;
  };
  var trimCaretContainers = function (text) {
    return text.replace(/\uFEFF/g, '');
  };
  var getAnchorElement = function (editor, selectedElm) {
    selectedElm = selectedElm || editor.selection.getNode();
    if (isImageFigure(selectedElm)) {
      return editor.dom.select('a[href]', selectedElm)[0];
    } else {
      return editor.dom.getParent(selectedElm, 'a[href]');
    }
  };
  var getAnchorText = function (selection, anchorElm) {
    var text = anchorElm ? anchorElm.innerText || anchorElm.textContent : selection.getContent({ format: 'text' });
    return trimCaretContainers(text);
  };
  var isLink = function (elm) {
    return elm && elm.nodeName === 'A' && elm.href;
  };
  var hasLinks = function (elements) {
    return Tools.grep(elements, isLink).length > 0;
  };
  var isOnlyTextSelected = function (html) {
    if (/</.test(html) && (!/^<a [^>]+>[^<]+<\/a>$/.test(html) || html.indexOf('href=') === -1)) {
      return false;
    }
    return true;
  };
  var isImageFigure = function (node) {
    return node && node.nodeName === 'FIGURE' && /\bimage\b/i.test(node.className);
  };
  var link = function (editor, attachState) {
    return function (data) {
      editor.undoManager.transact(function () {
        var selectedElm = editor.selection.getNode();
        var anchorElm = getAnchorElement(editor, selectedElm);
        var linkAttrs = {
          href: data.href,
          target: data.target ? data.target : null,
          rel: data.rel ? data.rel : null,
          class: data.class ? data.class : null,
          title: data.title ? data.title : null
        };
        if (!$_9mcqhkefjcq8h74b.hasRelList(editor.settings) && $_9mcqhkefjcq8h74b.allowUnsafeLinkTarget(editor.settings) === false) {
          linkAttrs.rel = toggleTargetRules(linkAttrs.rel, linkAttrs.target === '_blank');
        }
        if (data.href === attachState.href) {
          attachState.attach();
          attachState = {};
        }
        if (anchorElm) {
          editor.focus();
          if (data.hasOwnProperty('text')) {
            if ('innerText' in anchorElm) {
              anchorElm.innerText = data.text;
            } else {
              anchorElm.textContent = data.text;
            }
          }
          editor.dom.setAttribs(anchorElm, linkAttrs);
          editor.selection.select(anchorElm);
          editor.undoManager.add();
        } else {
          if (isImageFigure(selectedElm)) {
            linkImageFigure(editor, selectedElm, linkAttrs);
          } else if (data.hasOwnProperty('text')) {
            editor.insertContent(editor.dom.createHTML('a', linkAttrs, editor.dom.encode(data.text)));
          } else {
            editor.execCommand('mceInsertLink', false, linkAttrs);
          }
        }
      });
    };
  };
  var unlink = function (editor) {
    return function () {
      editor.undoManager.transact(function () {
        var node = editor.selection.getNode();
        if (isImageFigure(node)) {
          unlinkImageFigure(editor, node);
        } else {
          editor.execCommand('unlink');
        }
      });
    };
  };
  var unlinkImageFigure = function (editor, fig) {
    var a, img;
    img = editor.dom.select('img', fig)[0];
    if (img) {
      a = editor.dom.getParents(img, 'a[href]', fig)[0];
      if (a) {
        a.parentNode.insertBefore(img, a);
        editor.dom.remove(a);
      }
    }
  };
  var linkImageFigure = function (editor, fig, attrs) {
    var a, img;
    img = editor.dom.select('img', fig)[0];
    if (img) {
      a = editor.dom.create('a', attrs);
      img.parentNode.insertBefore(a, img);
      a.appendChild(img);
    }
  };
  var $_fz1rkkejjcq8h74m = {
    link: link,
    unlink: unlink,
    isLink: isLink,
    hasLinks: hasLinks,
    isOnlyTextSelected: isOnlyTextSelected,
    getAnchorElement: getAnchorElement,
    getAnchorText: getAnchorText,
    toggleTargetRules: toggleTargetRules
  };

  var Delay = tinymce.util.Tools.resolve('tinymce.util.Delay');

  var XHR = tinymce.util.Tools.resolve('tinymce.util.XHR');

  var attachState = {};
  var createLinkList = function (editor, callback) {
    var linkList = $_9mcqhkefjcq8h74b.getLinkList(editor.settings);
    if (typeof linkList === 'string') {
      XHR.send({
        url: linkList,
        success: function (text) {
          callback(editor, JSON.parse(text));
        }
      });
    } else if (typeof linkList === 'function') {
      linkList(function (list) {
        callback(editor, list);
      });
    } else {
      callback(editor, linkList);
    }
  };
  var buildListItems = function (inputList, itemCallback, startItems) {
    var appendItems = function (values, output) {
      output = output || [];
      Tools.each(values, function (item) {
        var menuItem = { text: item.text || item.title };
        if (item.menu) {
          menuItem.menu = appendItems(item.menu);
        } else {
          menuItem.value = item.value;
          if (itemCallback) {
            itemCallback(menuItem);
          }
        }
        output.push(menuItem);
      });
      return output;
    };
    return appendItems(inputList, startItems || []);
  };
  var delayedConfirm = function (editor, message, callback) {
    var rng = editor.selection.getRng();
    Delay.setEditorTimeout(editor, function () {
      editor.windowManager.confirm(message, function (state) {
        editor.selection.setRng(rng);
        callback(state);
      });
    });
  };
  var showDialog = function (editor, linkList) {
    var data = {};
    var selection = editor.selection;
    var dom = editor.dom;
    var anchorElm, initialText;
    var win, onlyText, textListCtrl, linkListCtrl, relListCtrl, targetListCtrl, classListCtrl, linkTitleCtrl, value;
    var linkListChangeHandler = function (e) {
      var textCtrl = win.find('#text');
      if (!textCtrl.value() || e.lastControl && textCtrl.value() === e.lastControl.text()) {
        textCtrl.value(e.control.text());
      }
      win.find('#href').value(e.control.value());
    };
    var buildAnchorListControl = function (url) {
      var anchorList = [];
      Tools.each(editor.dom.select('a:not([href])'), function (anchor) {
        var id = anchor.name || anchor.id;
        if (id) {
          anchorList.push({
            text: id,
            value: '#' + id,
            selected: url.indexOf('#' + id) !== -1
          });
        }
      });
      if (anchorList.length) {
        anchorList.unshift({
          text: 'None',
          value: ''
        });
        return {
          name: 'anchor',
          type: 'listbox',
          label: 'Anchors',
          values: anchorList,
          onselect: linkListChangeHandler
        };
      }
    };
    var updateText = function () {
      if (!initialText && onlyText && !data.text) {
        this.parent().parent().find('#text')[0].value(this.value());
      }
    };
    var urlChange = function (e) {
      var meta = e.meta || {};
      if (linkListCtrl) {
        linkListCtrl.value(editor.convertURL(this.value(), 'href'));
      }
      Tools.each(e.meta, function (value, key) {
        var inp = win.find('#' + key);
        if (key === 'text') {
          if (initialText.length === 0) {
            inp.value(value);
            data.text = value;
          }
        } else {
          inp.value(value);
        }
      });
      if (meta.attach) {
        attachState = {
          href: this.value(),
          attach: meta.attach
        };
      }
      if (!meta.text) {
        updateText.call(this);
      }
    };
    var onBeforeCall = function (e) {
      e.meta = win.toJSON();
    };
    onlyText = $_fz1rkkejjcq8h74m.isOnlyTextSelected(selection.getContent());
    anchorElm = $_fz1rkkejjcq8h74m.getAnchorElement(editor);
    data.text = initialText = $_fz1rkkejjcq8h74m.getAnchorText(editor.selection, anchorElm);
    data.href = anchorElm ? dom.getAttrib(anchorElm, 'href') : '';
    if (anchorElm) {
      data.target = dom.getAttrib(anchorElm, 'target');
    } else if ($_9mcqhkefjcq8h74b.hasDefaultLinkTarget(editor.settings)) {
      data.target = $_9mcqhkefjcq8h74b.getDefaultLinkTarget(editor.settings);
    }
    if (value = dom.getAttrib(anchorElm, 'rel')) {
      data.rel = value;
    }
    if (value = dom.getAttrib(anchorElm, 'class')) {
      data.class = value;
    }
    if (value = dom.getAttrib(anchorElm, 'title')) {
      data.title = value;
    }
    if (onlyText) {
      textListCtrl = {
        name: 'text',
        type: 'textbox',
        size: 40,
        label: 'Text to display',
        onchange: function () {
          data.text = this.value();
        }
      };
    }
    if (linkList) {
      linkListCtrl = {
        type: 'listbox',
        label: 'Link list',
        values: buildListItems(linkList, function (item) {
          item.value = editor.convertURL(item.value || item.url, 'href');
        }, [{
            text: 'None',
            value: ''
          }]),
        onselect: linkListChangeHandler,
        value: editor.convertURL(data.href, 'href'),
        onPostRender: function () {
          linkListCtrl = this;
        }
      };
    }
    if ($_9mcqhkefjcq8h74b.shouldShowTargetList(editor.settings)) {
      if ($_9mcqhkefjcq8h74b.getTargetList(editor.settings) === undefined) {
        $_9mcqhkefjcq8h74b.setTargetList(editor, [
          {
            text: 'None',
            value: ''
          },
          {
            text: 'New window',
            value: '_blank'
          }
        ]);
      }
      targetListCtrl = {
        name: 'target',
        type: 'listbox',
        label: 'Target',
        values: buildListItems($_9mcqhkefjcq8h74b.getTargetList(editor.settings))
      };
    }
    if ($_9mcqhkefjcq8h74b.hasRelList(editor.settings)) {
      relListCtrl = {
        name: 'rel',
        type: 'listbox',
        label: 'Rel',
        values: buildListItems($_9mcqhkefjcq8h74b.getRelList(editor.settings), function (item) {
          if ($_9mcqhkefjcq8h74b.allowUnsafeLinkTarget(editor.settings) === false) {
            item.value = $_fz1rkkejjcq8h74m.toggleTargetRules(item.value, data.target === '_blank');
          }
        })
      };
    }
    if ($_9mcqhkefjcq8h74b.hasLinkClassList(editor.settings)) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: buildListItems($_9mcqhkefjcq8h74b.getLinkClassList(editor.settings), function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                inline: 'a',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    if ($_9mcqhkefjcq8h74b.shouldShowLinkTitle(editor.settings)) {
      linkTitleCtrl = {
        name: 'title',
        type: 'textbox',
        label: 'Title',
        value: data.title
      };
    }
    win = editor.windowManager.open({
      title: 'Insert link',
      data: data,
      body: [
        {
          name: 'href',
          type: 'filepicker',
          filetype: 'file',
          size: 40,
          autofocus: true,
          label: 'Url',
          onchange: urlChange,
          onkeyup: updateText,
          onbeforecall: onBeforeCall
        },
        textListCtrl,
        linkTitleCtrl,
        buildAnchorListControl(data.href),
        linkListCtrl,
        relListCtrl,
        targetListCtrl,
        classListCtrl
      ],
      onSubmit: function (e) {
        var assumeExternalTargets = $_9mcqhkefjcq8h74b.assumeExternalTargets(editor.settings);
        var insertLink = $_fz1rkkejjcq8h74m.link(editor, attachState);
        var removeLink = $_fz1rkkejjcq8h74m.unlink(editor);
        var resultData = Tools.extend({}, data, e.data);
        var href = resultData.href;
        if (!href) {
          removeLink();
          return;
        }
        if (!onlyText || resultData.text === initialText) {
          delete resultData.text;
        }
        if (href.indexOf('@') > 0 && href.indexOf('//') === -1 && href.indexOf('mailto:') === -1) {
          delayedConfirm(editor, 'The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?', function (state) {
            if (state) {
              resultData.href = 'mailto:' + href;
            }
            insertLink(resultData);
          });
          return;
        }
        if (assumeExternalTargets === true && !/^\w+:/i.test(href) || assumeExternalTargets === false && /^\s*www[\.|\d\.]/i.test(href)) {
          delayedConfirm(editor, 'The URL you entered seems to be an external link. Do you want to add the required http:// prefix?', function (state) {
            if (state) {
              resultData.href = 'http://' + href;
            }
            insertLink(resultData);
          });
          return;
        }
        insertLink(resultData);
      }
    });
  };
  var open$1 = function (editor) {
    createLinkList(editor, showDialog);
  };
  var $_32euzoeljcq8h74s = { open: open$1 };

  var getLink = function (editor, elm) {
    return editor.dom.getParent(elm, 'a[href]');
  };
  var getSelectedLink = function (editor) {
    return getLink(editor, editor.selection.getStart());
  };
  var getHref = function (elm) {
    var href = elm.getAttribute('data-mce-href');
    return href ? href : elm.getAttribute('href');
  };
  var isContextMenuVisible = function (editor) {
    var contextmenu = editor.plugins.contextmenu;
    return contextmenu ? contextmenu.isContextMenuVisible() : false;
  };
  var hasOnlyAltModifier = function (e) {
    return e.altKey === true && e.shiftKey === false && e.ctrlKey === false && e.metaKey === false;
  };
  var gotoLink = function (editor, a) {
    if (a) {
      var href = getHref(a);
      if (/^#/.test(href)) {
        var targetEl = editor.$(href);
        if (targetEl.length) {
          editor.selection.scrollIntoView(targetEl[0], true);
        }
      } else {
        $_4cx8z2egjcq8h74d.open(a.href);
      }
    }
  };
  var openDialog = function (editor) {
    return function () {
      $_32euzoeljcq8h74s.open(editor);
    };
  };
  var gotoSelectedLink = function (editor) {
    return function () {
      gotoLink(editor, getSelectedLink(editor));
    };
  };
  var leftClickedOnAHref = function (editor) {
    return function (elm) {
      var sel, rng, node;
      if ($_9mcqhkefjcq8h74b.hasContextToolbar(editor.settings) && !isContextMenuVisible(editor) && $_fz1rkkejjcq8h74m.isLink(elm)) {
        sel = editor.selection;
        rng = sel.getRng();
        node = rng.startContainer;
        if (node.nodeType === 3 && sel.isCollapsed() && rng.startOffset > 0 && rng.startOffset < node.data.length) {
          return true;
        }
      }
      return false;
    };
  };
  var setupGotoLinks = function (editor) {
    editor.on('click', function (e) {
      var link = getLink(editor, e.target);
      if (link && VK.metaKeyPressed(e)) {
        e.preventDefault();
        gotoLink(editor, link);
      }
    });
    editor.on('keydown', function (e) {
      var link = getSelectedLink(editor);
      if (link && e.keyCode === 13 && hasOnlyAltModifier(e)) {
        e.preventDefault();
        gotoLink(editor, link);
      }
    });
  };
  var toggleActiveState = function (editor) {
    return function () {
      var self = this;
      editor.on('nodechange', function (e) {
        self.active(!editor.readonly && !!$_fz1rkkejjcq8h74m.getAnchorElement(editor, e.element));
      });
    };
  };
  var toggleViewLinkState = function (editor) {
    return function () {
      var self = this;
      var toggleVisibility = function (e) {
        if ($_fz1rkkejjcq8h74m.hasLinks(e.parents)) {
          self.show();
        } else {
          self.hide();
        }
      };
      if (!$_fz1rkkejjcq8h74m.hasLinks(editor.dom.getParents(editor.selection.getStart()))) {
        self.hide();
      }
      editor.on('nodechange', toggleVisibility);
      self.on('remove', function () {
        editor.off('nodechange', toggleVisibility);
      });
    };
  };
  var $_bemrcredjcq8h747 = {
    openDialog: openDialog,
    gotoSelectedLink: gotoSelectedLink,
    leftClickedOnAHref: leftClickedOnAHref,
    setupGotoLinks: setupGotoLinks,
    toggleActiveState: toggleActiveState,
    toggleViewLinkState: toggleViewLinkState
  };

  var register = function (editor) {
    editor.addCommand('mceLink', $_bemrcredjcq8h747.openDialog(editor));
  };
  var $_6zajicecjcq8h745 = { register: register };

  var setup = function (editor) {
    editor.addShortcut('Meta+K', '', $_bemrcredjcq8h747.openDialog(editor));
  };
  var $_4ti0hjeojcq8h74z = { setup: setup };

  var setupButtons = function (editor) {
    editor.addButton('link', {
      active: false,
      icon: 'link',
      tooltip: 'Insert/edit link',
      onclick: $_bemrcredjcq8h747.openDialog(editor),
      onpostrender: $_bemrcredjcq8h747.toggleActiveState(editor)
    });
    editor.addButton('unlink', {
      active: false,
      icon: 'unlink',
      tooltip: 'Remove link',
      onclick: $_fz1rkkejjcq8h74m.unlink(editor),
      onpostrender: $_bemrcredjcq8h747.toggleActiveState(editor)
    });
    if (editor.addContextToolbar) {
      editor.addButton('openlink', {
        icon: 'newtab',
        tooltip: 'Open link',
        onclick: $_bemrcredjcq8h747.gotoSelectedLink(editor)
      });
    }
  };
  var setupMenuItems = function (editor) {
    editor.addMenuItem('openlink', {
      text: 'Open link',
      icon: 'newtab',
      onclick: $_bemrcredjcq8h747.gotoSelectedLink(editor),
      onPostRender: $_bemrcredjcq8h747.toggleViewLinkState(editor),
      prependToContext: true
    });
    editor.addMenuItem('link', {
      icon: 'link',
      text: 'Link',
      shortcut: 'Meta+K',
      onclick: $_bemrcredjcq8h747.openDialog(editor),
      stateSelector: 'a[href]',
      context: 'insert',
      prependToContext: true
    });
  };
  var setupContextToolbars = function (editor) {
    if (editor.addContextToolbar) {
      editor.addContextToolbar($_bemrcredjcq8h747.leftClickedOnAHref(editor), 'openlink | link unlink');
    }
  };
  var $_fjpfdoepjcq8h750 = {
    setupButtons: setupButtons,
    setupMenuItems: setupMenuItems,
    setupContextToolbars: setupContextToolbars
  };

  PluginManager.add('link', function (editor) {
    $_fjpfdoepjcq8h750.setupButtons(editor);
    $_fjpfdoepjcq8h750.setupMenuItems(editor);
    $_fjpfdoepjcq8h750.setupContextToolbars(editor);
    $_bemrcredjcq8h747.setupGotoLinks(editor);
    $_6zajicecjcq8h745.register(editor);
    $_4ti0hjeojcq8h74z.setup(editor);
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()


/***/ }),

/***/ "./node_modules/tinymce/plugins/lists/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/tinymce/plugins/lists/index.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "lists" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/lists')
//   ES2015:
//     import 'tinymce/plugins/lists'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/lists/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/lists/plugin.js":
/*!******************************************************!*\
  !*** ./node_modules/tinymce/plugins/lists/plugin.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

(function () {
var lists = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var RangeUtils = tinymce.util.Tools.resolve('tinymce.dom.RangeUtils');

  var TreeWalker = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');

  var VK = tinymce.util.Tools.resolve('tinymce.util.VK');

  var BookmarkManager = tinymce.util.Tools.resolve('tinymce.dom.BookmarkManager');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var isTextNode = function (node) {
    return node && node.nodeType === 3;
  };
  var isListNode = function (node) {
    return node && /^(OL|UL|DL)$/.test(node.nodeName);
  };
  var isListItemNode = function (node) {
    return node && /^(LI|DT|DD)$/.test(node.nodeName);
  };
  var isTableCellNode = function (node) {
    return node && /^(TH|TD)$/.test(node.nodeName);
  };
  var isBr = function (node) {
    return node && node.nodeName === 'BR';
  };
  var isFirstChild = function (node) {
    return node.parentNode.firstChild === node;
  };
  var isLastChild = function (node) {
    return node.parentNode.lastChild === node;
  };
  var isTextBlock = function (editor, node) {
    return node && !!editor.schema.getTextBlockElements()[node.nodeName];
  };
  var isBlock = function (node, blockElements) {
    return node && node.nodeName in blockElements;
  };
  var isBogusBr = function (dom, node) {
    if (!isBr(node)) {
      return false;
    }
    if (dom.isBlock(node.nextSibling) && !isBr(node.previousSibling)) {
      return true;
    }
    return false;
  };
  var isEmpty = function (dom, elm, keepBookmarks) {
    var empty = dom.isEmpty(elm);
    if (keepBookmarks && dom.select('span[data-mce-type=bookmark]', elm).length > 0) {
      return false;
    }
    return empty;
  };
  var isChildOfBody = function (dom, elm) {
    return dom.isChildOf(elm, dom.getRoot());
  };
  var $_8kryjjf4jcq8h76s = {
    isTextNode: isTextNode,
    isListNode: isListNode,
    isListItemNode: isListItemNode,
    isTableCellNode: isTableCellNode,
    isBr: isBr,
    isFirstChild: isFirstChild,
    isLastChild: isLastChild,
    isTextBlock: isTextBlock,
    isBlock: isBlock,
    isBogusBr: isBogusBr,
    isEmpty: isEmpty,
    isChildOfBody: isChildOfBody
  };

  var getNormalizedEndPoint = function (container, offset) {
    var node = RangeUtils.getNode(container, offset);
    if ($_8kryjjf4jcq8h76s.isListItemNode(container) && $_8kryjjf4jcq8h76s.isTextNode(node)) {
      var textNodeOffset = offset >= container.childNodes.length ? node.data.length : 0;
      return {
        container: node,
        offset: textNodeOffset
      };
    }
    return {
      container: container,
      offset: offset
    };
  };
  var normalizeRange = function (rng) {
    var outRng = rng.cloneRange();
    var rangeStart = getNormalizedEndPoint(rng.startContainer, rng.startOffset);
    outRng.setStart(rangeStart.container, rangeStart.offset);
    var rangeEnd = getNormalizedEndPoint(rng.endContainer, rng.endOffset);
    outRng.setEnd(rangeEnd.container, rangeEnd.offset);
    return outRng;
  };
  var $_3n96ucf3jcq8h76q = {
    getNormalizedEndPoint: getNormalizedEndPoint,
    normalizeRange: normalizeRange
  };

  var DOM$1 = DOMUtils.DOM;
  var createBookmark = function (rng) {
    var bookmark = {};
    var setupEndPoint = function (start) {
      var offsetNode, container, offset;
      container = rng[start ? 'startContainer' : 'endContainer'];
      offset = rng[start ? 'startOffset' : 'endOffset'];
      if (container.nodeType === 1) {
        offsetNode = DOM$1.create('span', { 'data-mce-type': 'bookmark' });
        if (container.hasChildNodes()) {
          offset = Math.min(offset, container.childNodes.length - 1);
          if (start) {
            container.insertBefore(offsetNode, container.childNodes[offset]);
          } else {
            DOM$1.insertAfter(offsetNode, container.childNodes[offset]);
          }
        } else {
          container.appendChild(offsetNode);
        }
        container = offsetNode;
        offset = 0;
      }
      bookmark[start ? 'startContainer' : 'endContainer'] = container;
      bookmark[start ? 'startOffset' : 'endOffset'] = offset;
    };
    setupEndPoint(true);
    if (!rng.collapsed) {
      setupEndPoint();
    }
    return bookmark;
  };
  var resolveBookmark = function (bookmark) {
    function restoreEndPoint(start) {
      var container, offset, node;
      var nodeIndex = function (container) {
        var node = container.parentNode.firstChild, idx = 0;
        while (node) {
          if (node === container) {
            return idx;
          }
          if (node.nodeType !== 1 || node.getAttribute('data-mce-type') !== 'bookmark') {
            idx++;
          }
          node = node.nextSibling;
        }
        return -1;
      };
      container = node = bookmark[start ? 'startContainer' : 'endContainer'];
      offset = bookmark[start ? 'startOffset' : 'endOffset'];
      if (!container) {
        return;
      }
      if (container.nodeType === 1) {
        offset = nodeIndex(container);
        container = container.parentNode;
        DOM$1.remove(node);
        if (!container.hasChildNodes() && DOM$1.isBlock(container)) {
          container.appendChild(DOM$1.create('br'));
        }
      }
      bookmark[start ? 'startContainer' : 'endContainer'] = container;
      bookmark[start ? 'startOffset' : 'endOffset'] = offset;
    }
    restoreEndPoint(true);
    restoreEndPoint();
    var rng = DOM$1.createRng();
    rng.setStart(bookmark.startContainer, bookmark.startOffset);
    if (bookmark.endContainer) {
      rng.setEnd(bookmark.endContainer, bookmark.endOffset);
    }
    return $_3n96ucf3jcq8h76q.normalizeRange(rng);
  };
  var $_7ds4v1f2jcq8h76o = {
    createBookmark: createBookmark,
    resolveBookmark: resolveBookmark
  };

  var DOM$2 = DOMUtils.DOM;
  var normalizeList = function (dom, ul) {
    var sibling;
    var parentNode = ul.parentNode;
    if (parentNode.nodeName === 'LI' && parentNode.firstChild === ul) {
      sibling = parentNode.previousSibling;
      if (sibling && sibling.nodeName === 'LI') {
        sibling.appendChild(ul);
        if ($_8kryjjf4jcq8h76s.isEmpty(dom, parentNode)) {
          DOM$2.remove(parentNode);
        }
      } else {
        DOM$2.setStyle(parentNode, 'listStyleType', 'none');
      }
    }
    if ($_8kryjjf4jcq8h76s.isListNode(parentNode)) {
      sibling = parentNode.previousSibling;
      if (sibling && sibling.nodeName === 'LI') {
        sibling.appendChild(ul);
      }
    }
  };
  var normalizeLists = function (dom, element) {
    Tools.each(Tools.grep(dom.select('ol,ul', element)), function (ul) {
      normalizeList(dom, ul);
    });
  };
  var $_5atetdf5jcq8h76u = {
    normalizeList: normalizeList,
    normalizeLists: normalizeLists
  };

  var DomQuery = tinymce.util.Tools.resolve('tinymce.dom.DomQuery');

  var getParentList = function (editor) {
    var selectionStart = editor.selection.getStart(true);
    return editor.dom.getParent(selectionStart, 'OL,UL,DL', getClosestListRootElm(editor, selectionStart));
  };
  var isParentListSelected = function (parentList, selectedBlocks) {
    return parentList && selectedBlocks.length === 1 && selectedBlocks[0] === parentList;
  };
  var findSubLists = function (parentList) {
    return Tools.grep(parentList.querySelectorAll('ol,ul,dl'), function (elm) {
      return $_8kryjjf4jcq8h76s.isListNode(elm);
    });
  };
  var getSelectedSubLists = function (editor) {
    var parentList = getParentList(editor);
    var selectedBlocks = editor.selection.getSelectedBlocks();
    if (isParentListSelected(parentList, selectedBlocks)) {
      return findSubLists(parentList);
    } else {
      return Tools.grep(selectedBlocks, function (elm) {
        return $_8kryjjf4jcq8h76s.isListNode(elm) && parentList !== elm;
      });
    }
  };
  var findParentListItemsNodes = function (editor, elms) {
    var listItemsElms = Tools.map(elms, function (elm) {
      var parentLi = editor.dom.getParent(elm, 'li,dd,dt', getClosestListRootElm(editor, elm));
      return parentLi ? parentLi : elm;
    });
    return DomQuery.unique(listItemsElms);
  };
  var getSelectedListItems = function (editor) {
    var selectedBlocks = editor.selection.getSelectedBlocks();
    return Tools.grep(findParentListItemsNodes(editor, selectedBlocks), function (block) {
      return $_8kryjjf4jcq8h76s.isListItemNode(block);
    });
  };
  var getClosestListRootElm = function (editor, elm) {
    var parentTableCell = editor.dom.getParents(elm, 'TD,TH');
    var root = parentTableCell.length > 0 ? parentTableCell[0] : editor.getBody();
    return root;
  };
  var $_ewhx1bf6jcq8h76w = {
    getParentList: getParentList,
    getSelectedSubLists: getSelectedSubLists,
    getSelectedListItems: getSelectedListItems,
    getClosestListRootElm: getClosestListRootElm
  };

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

  var DOM$4 = DOMUtils.DOM;
  var createNewTextBlock = function (editor, contentNode, blockName) {
    var node, textBlock;
    var fragment = DOM$4.createFragment();
    var hasContentNode;
    var blockElements = editor.schema.getBlockElements();
    if (editor.settings.forced_root_block) {
      blockName = blockName || editor.settings.forced_root_block;
    }
    if (blockName) {
      textBlock = DOM$4.create(blockName);
      if (textBlock.tagName === editor.settings.forced_root_block) {
        DOM$4.setAttribs(textBlock, editor.settings.forced_root_block_attrs);
      }
      if (!$_8kryjjf4jcq8h76s.isBlock(contentNode.firstChild, blockElements)) {
        fragment.appendChild(textBlock);
      }
    }
    if (contentNode) {
      while (node = contentNode.firstChild) {
        var nodeName = node.nodeName;
        if (!hasContentNode && (nodeName !== 'SPAN' || node.getAttribute('data-mce-type') !== 'bookmark')) {
          hasContentNode = true;
        }
        if ($_8kryjjf4jcq8h76s.isBlock(node, blockElements)) {
          fragment.appendChild(node);
          textBlock = null;
        } else {
          if (blockName) {
            if (!textBlock) {
              textBlock = DOM$4.create(blockName);
              fragment.appendChild(textBlock);
            }
            textBlock.appendChild(node);
          } else {
            fragment.appendChild(node);
          }
        }
      }
    }
    if (!editor.settings.forced_root_block) {
      fragment.appendChild(DOM$4.create('br'));
    } else {
      if (!hasContentNode && (!Env.ie || Env.ie > 10)) {
        textBlock.appendChild(DOM$4.create('br', { 'data-mce-bogus': '1' }));
      }
    }
    return fragment;
  };
  var $_x5p25f9jcq8h770 = { createNewTextBlock: createNewTextBlock };

  var DOM$3 = DOMUtils.DOM;
  var splitList = function (editor, ul, li, newBlock) {
    var tmpRng, fragment, bookmarks, node;
    var removeAndKeepBookmarks = function (targetNode) {
      Tools.each(bookmarks, function (node) {
        targetNode.parentNode.insertBefore(node, li.parentNode);
      });
      DOM$3.remove(targetNode);
    };
    bookmarks = DOM$3.select('span[data-mce-type="bookmark"]', ul);
    newBlock = newBlock || $_x5p25f9jcq8h770.createNewTextBlock(editor, li);
    tmpRng = DOM$3.createRng();
    tmpRng.setStartAfter(li);
    tmpRng.setEndAfter(ul);
    fragment = tmpRng.extractContents();
    for (node = fragment.firstChild; node; node = node.firstChild) {
      if (node.nodeName === 'LI' && editor.dom.isEmpty(node)) {
        DOM$3.remove(node);
        break;
      }
    }
    if (!editor.dom.isEmpty(fragment)) {
      DOM$3.insertAfter(fragment, ul);
    }
    DOM$3.insertAfter(newBlock, ul);
    if ($_8kryjjf4jcq8h76s.isEmpty(editor.dom, li.parentNode)) {
      removeAndKeepBookmarks(li.parentNode);
    }
    DOM$3.remove(li);
    if ($_8kryjjf4jcq8h76s.isEmpty(editor.dom, ul)) {
      DOM$3.remove(ul);
    }
  };
  var $_3cgkjqf8jcq8h76y = { splitList: splitList };

  var DOM = DOMUtils.DOM;
  var removeEmptyLi = function (dom, li) {
    if ($_8kryjjf4jcq8h76s.isEmpty(dom, li)) {
      DOM.remove(li);
    }
  };
  var outdent = function (editor, li) {
    var ul = li.parentNode;
    var ulParent = ul.parentNode;
    var newBlock;
    if (ul === editor.getBody()) {
      return true;
    }
    if (li.nodeName === 'DD') {
      DOM.rename(li, 'DT');
      return true;
    }
    if ($_8kryjjf4jcq8h76s.isFirstChild(li) && $_8kryjjf4jcq8h76s.isLastChild(li)) {
      if (ulParent.nodeName === 'LI') {
        DOM.insertAfter(li, ulParent);
        removeEmptyLi(editor.dom, ulParent);
        DOM.remove(ul);
      } else if ($_8kryjjf4jcq8h76s.isListNode(ulParent)) {
        DOM.remove(ul, true);
      } else {
        ulParent.insertBefore($_x5p25f9jcq8h770.createNewTextBlock(editor, li), ul);
        DOM.remove(ul);
      }
      return true;
    } else if ($_8kryjjf4jcq8h76s.isFirstChild(li)) {
      if (ulParent.nodeName === 'LI') {
        DOM.insertAfter(li, ulParent);
        li.appendChild(ul);
        removeEmptyLi(editor.dom, ulParent);
      } else if ($_8kryjjf4jcq8h76s.isListNode(ulParent)) {
        ulParent.insertBefore(li, ul);
      } else {
        ulParent.insertBefore($_x5p25f9jcq8h770.createNewTextBlock(editor, li), ul);
        DOM.remove(li);
      }
      return true;
    } else if ($_8kryjjf4jcq8h76s.isLastChild(li)) {
      if (ulParent.nodeName === 'LI') {
        DOM.insertAfter(li, ulParent);
      } else if ($_8kryjjf4jcq8h76s.isListNode(ulParent)) {
        DOM.insertAfter(li, ul);
      } else {
        DOM.insertAfter($_x5p25f9jcq8h770.createNewTextBlock(editor, li), ul);
        DOM.remove(li);
      }
      return true;
    }
    if (ulParent.nodeName === 'LI') {
      ul = ulParent;
      newBlock = $_x5p25f9jcq8h770.createNewTextBlock(editor, li, 'LI');
    } else if ($_8kryjjf4jcq8h76s.isListNode(ulParent)) {
      newBlock = $_x5p25f9jcq8h770.createNewTextBlock(editor, li, 'LI');
    } else {
      newBlock = $_x5p25f9jcq8h770.createNewTextBlock(editor, li);
    }
    $_3cgkjqf8jcq8h76y.splitList(editor, ul, li, newBlock);
    $_5atetdf5jcq8h76u.normalizeLists(editor.dom, ul.parentNode);
    return true;
  };
  var outdentSelection = function (editor) {
    var listElements = $_ewhx1bf6jcq8h76w.getSelectedListItems(editor);
    if (listElements.length) {
      var bookmark = $_7ds4v1f2jcq8h76o.createBookmark(editor.selection.getRng(true));
      var i = void 0, y = void 0;
      var root = $_ewhx1bf6jcq8h76w.getClosestListRootElm(editor, editor.selection.getStart(true));
      i = listElements.length;
      while (i--) {
        var node = listElements[i].parentNode;
        while (node && node !== root) {
          y = listElements.length;
          while (y--) {
            if (listElements[y] === node) {
              listElements.splice(i, 1);
              break;
            }
          }
          node = node.parentNode;
        }
      }
      for (i = 0; i < listElements.length; i++) {
        if (!outdent(editor, listElements[i]) && i === 0) {
          break;
        }
      }
      editor.selection.setRng($_7ds4v1f2jcq8h76o.resolveBookmark(bookmark));
      editor.nodeChanged();
      return true;
    }
  };
  var $_2uej3hf0jcq8h76k = {
    outdent: outdent,
    outdentSelection: outdentSelection
  };

  var updateListStyle = function (dom, el, detail) {
    var type = detail['list-style-type'] ? detail['list-style-type'] : null;
    dom.setStyle(el, 'list-style-type', type);
  };
  var setAttribs = function (elm, attrs) {
    Tools.each(attrs, function (value, key) {
      elm.setAttribute(key, value);
    });
  };
  var updateListAttrs = function (dom, el, detail) {
    setAttribs(el, detail['list-attributes']);
    Tools.each(dom.select('li', el), function (li) {
      setAttribs(li, detail['list-item-attributes']);
    });
  };
  var updateListWithDetails = function (dom, el, detail) {
    updateListStyle(dom, el, detail);
    updateListAttrs(dom, el, detail);
  };
  var getEndPointNode = function (editor, rng, start, root) {
    var container, offset;
    container = rng[start ? 'startContainer' : 'endContainer'];
    offset = rng[start ? 'startOffset' : 'endOffset'];
    if (container.nodeType === 1) {
      container = container.childNodes[Math.min(offset, container.childNodes.length - 1)] || container;
    }
    if (!start && $_8kryjjf4jcq8h76s.isBr(container.nextSibling)) {
      container = container.nextSibling;
    }
    while (container.parentNode !== root) {
      if ($_8kryjjf4jcq8h76s.isTextBlock(editor, container)) {
        return container;
      }
      if (/^(TD|TH)$/.test(container.parentNode.nodeName)) {
        return container;
      }
      container = container.parentNode;
    }
    return container;
  };
  var getSelectedTextBlocks = function (editor, rng, root) {
    var textBlocks = [], dom = editor.dom;
    var startNode = getEndPointNode(editor, rng, true, root);
    var endNode = getEndPointNode(editor, rng, false, root);
    var block;
    var siblings = [];
    for (var node = startNode; node; node = node.nextSibling) {
      siblings.push(node);
      if (node === endNode) {
        break;
      }
    }
    Tools.each(siblings, function (node) {
      if ($_8kryjjf4jcq8h76s.isTextBlock(editor, node)) {
        textBlocks.push(node);
        block = null;
        return;
      }
      if (dom.isBlock(node) || $_8kryjjf4jcq8h76s.isBr(node)) {
        if ($_8kryjjf4jcq8h76s.isBr(node)) {
          dom.remove(node);
        }
        block = null;
        return;
      }
      var nextSibling = node.nextSibling;
      if (BookmarkManager.isBookmarkNode(node)) {
        if ($_8kryjjf4jcq8h76s.isTextBlock(editor, nextSibling) || !nextSibling && node.parentNode === root) {
          block = null;
          return;
        }
      }
      if (!block) {
        block = dom.create('p');
        node.parentNode.insertBefore(block, node);
        textBlocks.push(block);
      }
      block.appendChild(node);
    });
    return textBlocks;
  };
  var hasCompatibleStyle = function (dom, sib, detail) {
    var sibStyle = dom.getStyle(sib, 'list-style-type');
    var detailStyle = detail ? detail['list-style-type'] : '';
    detailStyle = detailStyle === null ? '' : detailStyle;
    return sibStyle === detailStyle;
  };
  var applyList = function (editor, listName, detail) {
    var rng = editor.selection.getRng(true);
    var bookmark, listItemName = 'LI';
    var root = $_ewhx1bf6jcq8h76w.getClosestListRootElm(editor, editor.selection.getStart(true));
    var dom = editor.dom;
    detail = detail ? detail : {};
    if (dom.getContentEditable(editor.selection.getNode()) === 'false') {
      return;
    }
    listName = listName.toUpperCase();
    if (listName === 'DL') {
      listItemName = 'DT';
    }
    bookmark = $_7ds4v1f2jcq8h76o.createBookmark(rng);
    Tools.each(getSelectedTextBlocks(editor, rng, root), function (block) {
      var listBlock, sibling;
      sibling = block.previousSibling;
      if (sibling && $_8kryjjf4jcq8h76s.isListNode(sibling) && sibling.nodeName === listName && hasCompatibleStyle(dom, sibling, detail)) {
        listBlock = sibling;
        block = dom.rename(block, listItemName);
        sibling.appendChild(block);
      } else {
        listBlock = dom.create(listName);
        block.parentNode.insertBefore(listBlock, block);
        listBlock.appendChild(block);
        block = dom.rename(block, listItemName);
      }
      updateListWithDetails(dom, listBlock, detail);
      mergeWithAdjacentLists(editor.dom, listBlock);
    });
    editor.selection.setRng($_7ds4v1f2jcq8h76o.resolveBookmark(bookmark));
  };
  var removeList = function (editor) {
    var bookmark = $_7ds4v1f2jcq8h76o.createBookmark(editor.selection.getRng(true));
    var root = $_ewhx1bf6jcq8h76w.getClosestListRootElm(editor, editor.selection.getStart(true));
    var listItems = $_ewhx1bf6jcq8h76w.getSelectedListItems(editor);
    var emptyListItems = Tools.grep(listItems, function (li) {
      return editor.dom.isEmpty(li);
    });
    listItems = Tools.grep(listItems, function (li) {
      return !editor.dom.isEmpty(li);
    });
    Tools.each(emptyListItems, function (li) {
      if ($_8kryjjf4jcq8h76s.isEmpty(editor.dom, li)) {
        $_2uej3hf0jcq8h76k.outdent(editor, li);
        return;
      }
    });
    Tools.each(listItems, function (li) {
      var node, rootList;
      if (li.parentNode === editor.getBody()) {
        return;
      }
      for (node = li; node && node !== root; node = node.parentNode) {
        if ($_8kryjjf4jcq8h76s.isListNode(node)) {
          rootList = node;
        }
      }
      $_3cgkjqf8jcq8h76y.splitList(editor, rootList, li);
      $_5atetdf5jcq8h76u.normalizeLists(editor.dom, rootList.parentNode);
    });
    editor.selection.setRng($_7ds4v1f2jcq8h76o.resolveBookmark(bookmark));
  };
  var isValidLists = function (list1, list2) {
    return list1 && list2 && $_8kryjjf4jcq8h76s.isListNode(list1) && list1.nodeName === list2.nodeName;
  };
  var hasSameListStyle = function (dom, list1, list2) {
    var targetStyle = dom.getStyle(list1, 'list-style-type', true);
    var style = dom.getStyle(list2, 'list-style-type', true);
    return targetStyle === style;
  };
  var hasSameClasses = function (elm1, elm2) {
    return elm1.className === elm2.className;
  };
  var shouldMerge = function (dom, list1, list2) {
    return isValidLists(list1, list2) && hasSameListStyle(dom, list1, list2) && hasSameClasses(list1, list2);
  };
  var mergeWithAdjacentLists = function (dom, listBlock) {
    var sibling, node;
    sibling = listBlock.nextSibling;
    if (shouldMerge(dom, listBlock, sibling)) {
      while (node = sibling.firstChild) {
        listBlock.appendChild(node);
      }
      dom.remove(sibling);
    }
    sibling = listBlock.previousSibling;
    if (shouldMerge(dom, listBlock, sibling)) {
      while (node = sibling.lastChild) {
        listBlock.insertBefore(node, listBlock.firstChild);
      }
      dom.remove(sibling);
    }
  };
  var updateList = function (dom, list, listName, detail) {
    if (list.nodeName !== listName) {
      var newList = dom.rename(list, listName);
      updateListWithDetails(dom, newList, detail);
    } else {
      updateListWithDetails(dom, list, detail);
    }
  };
  var toggleMultipleLists = function (editor, parentList, lists, listName, detail) {
    if (parentList.nodeName === listName && !hasListStyleDetail(detail)) {
      removeList(editor);
    } else {
      var bookmark = $_7ds4v1f2jcq8h76o.createBookmark(editor.selection.getRng(true));
      Tools.each([parentList].concat(lists), function (elm) {
        updateList(editor.dom, elm, listName, detail);
      });
      editor.selection.setRng($_7ds4v1f2jcq8h76o.resolveBookmark(bookmark));
    }
  };
  var hasListStyleDetail = function (detail) {
    return 'list-style-type' in detail;
  };
  var toggleSingleList = function (editor, parentList, listName, detail) {
    if (parentList === editor.getBody()) {
      return;
    }
    if (parentList) {
      if (parentList.nodeName === listName && !hasListStyleDetail(detail)) {
        removeList(editor);
      } else {
        var bookmark = $_7ds4v1f2jcq8h76o.createBookmark(editor.selection.getRng(true));
        updateListWithDetails(editor.dom, parentList, detail);
        mergeWithAdjacentLists(editor.dom, editor.dom.rename(parentList, listName));
        editor.selection.setRng($_7ds4v1f2jcq8h76o.resolveBookmark(bookmark));
      }
    } else {
      applyList(editor, listName, detail);
    }
  };
  var toggleList = function (editor, listName, detail) {
    var parentList = $_ewhx1bf6jcq8h76w.getParentList(editor);
    var selectedSubLists = $_ewhx1bf6jcq8h76w.getSelectedSubLists(editor);
    detail = detail ? detail : {};
    if (parentList && selectedSubLists.length > 0) {
      toggleMultipleLists(editor, parentList, selectedSubLists, listName, detail);
    } else {
      toggleSingleList(editor, parentList, listName, detail);
    }
  };
  var $_db72b5exjcq8h76d = {
    toggleList: toggleList,
    removeList: removeList,
    mergeWithAdjacentLists: mergeWithAdjacentLists
  };

  var findNextCaretContainer = function (editor, rng, isForward, root) {
    var node = rng.startContainer;
    var offset = rng.startOffset;
    var nonEmptyBlocks, walker;
    if (node.nodeType === 3 && (isForward ? offset < node.data.length : offset > 0)) {
      return node;
    }
    nonEmptyBlocks = editor.schema.getNonEmptyElements();
    if (node.nodeType === 1) {
      node = RangeUtils.getNode(node, offset);
    }
    walker = new TreeWalker(node, root);
    if (isForward) {
      if ($_8kryjjf4jcq8h76s.isBogusBr(editor.dom, node)) {
        walker.next();
      }
    }
    while (node = walker[isForward ? 'next' : 'prev2']()) {
      if (node.nodeName === 'LI' && !node.hasChildNodes()) {
        return node;
      }
      if (nonEmptyBlocks[node.nodeName]) {
        return node;
      }
      if (node.nodeType === 3 && node.data.length > 0) {
        return node;
      }
    }
  };
  var hasOnlyOneBlockChild = function (dom, elm) {
    var childNodes = elm.childNodes;
    return childNodes.length === 1 && !$_8kryjjf4jcq8h76s.isListNode(childNodes[0]) && dom.isBlock(childNodes[0]);
  };
  var unwrapSingleBlockChild = function (dom, elm) {
    if (hasOnlyOneBlockChild(dom, elm)) {
      dom.remove(elm.firstChild, true);
    }
  };
  var moveChildren = function (dom, fromElm, toElm) {
    var node, targetElm;
    targetElm = hasOnlyOneBlockChild(dom, toElm) ? toElm.firstChild : toElm;
    unwrapSingleBlockChild(dom, fromElm);
    if (!$_8kryjjf4jcq8h76s.isEmpty(dom, fromElm, true)) {
      while (node = fromElm.firstChild) {
        targetElm.appendChild(node);
      }
    }
  };
  var mergeLiElements = function (dom, fromElm, toElm) {
    var node, listNode;
    var ul = fromElm.parentNode;
    if (!$_8kryjjf4jcq8h76s.isChildOfBody(dom, fromElm) || !$_8kryjjf4jcq8h76s.isChildOfBody(dom, toElm)) {
      return;
    }
    if ($_8kryjjf4jcq8h76s.isListNode(toElm.lastChild)) {
      listNode = toElm.lastChild;
    }
    if (ul === toElm.lastChild) {
      if ($_8kryjjf4jcq8h76s.isBr(ul.previousSibling)) {
        dom.remove(ul.previousSibling);
      }
    }
    node = toElm.lastChild;
    if (node && $_8kryjjf4jcq8h76s.isBr(node) && fromElm.hasChildNodes()) {
      dom.remove(node);
    }
    if ($_8kryjjf4jcq8h76s.isEmpty(dom, toElm, true)) {
      dom.$(toElm).empty();
    }
    moveChildren(dom, fromElm, toElm);
    if (listNode) {
      toElm.appendChild(listNode);
    }
    dom.remove(fromElm);
    if ($_8kryjjf4jcq8h76s.isEmpty(dom, ul) && ul !== dom.getRoot()) {
      dom.remove(ul);
    }
  };
  var mergeIntoEmptyLi = function (editor, fromLi, toLi) {
    editor.dom.$(toLi).empty();
    mergeLiElements(editor.dom, fromLi, toLi);
    editor.selection.setCursorLocation(toLi);
  };
  var mergeForward = function (editor, rng, fromLi, toLi) {
    var dom = editor.dom;
    if (dom.isEmpty(toLi)) {
      mergeIntoEmptyLi(editor, fromLi, toLi);
    } else {
      var bookmark = $_7ds4v1f2jcq8h76o.createBookmark(rng);
      mergeLiElements(dom, fromLi, toLi);
      editor.selection.setRng($_7ds4v1f2jcq8h76o.resolveBookmark(bookmark));
    }
  };
  var mergeBackward = function (editor, rng, fromLi, toLi) {
    var bookmark = $_7ds4v1f2jcq8h76o.createBookmark(rng);
    mergeLiElements(editor.dom, fromLi, toLi);
    var resolvedBookmark = $_7ds4v1f2jcq8h76o.resolveBookmark(bookmark);
    editor.selection.setRng(resolvedBookmark);
  };
  var backspaceDeleteFromListToListCaret = function (editor, isForward) {
    var dom = editor.dom, selection = editor.selection;
    var selectionStartElm = selection.getStart();
    var root = $_ewhx1bf6jcq8h76w.getClosestListRootElm(editor, selectionStartElm);
    var li = dom.getParent(selection.getStart(), 'LI', root);
    var ul, rng, otherLi;
    if (li) {
      ul = li.parentNode;
      if (ul === editor.getBody() && $_8kryjjf4jcq8h76s.isEmpty(dom, ul)) {
        return true;
      }
      rng = $_3n96ucf3jcq8h76q.normalizeRange(selection.getRng(true));
      otherLi = dom.getParent(findNextCaretContainer(editor, rng, isForward, root), 'LI', root);
      if (otherLi && otherLi !== li) {
        if (isForward) {
          mergeForward(editor, rng, otherLi, li);
        } else {
          mergeBackward(editor, rng, li, otherLi);
        }
        return true;
      } else if (!otherLi) {
        if (!isForward && $_db72b5exjcq8h76d.removeList(editor)) {
          return true;
        }
      }
    }
    return false;
  };
  var removeBlock = function (dom, block, root) {
    var parentBlock = dom.getParent(block.parentNode, dom.isBlock, root);
    dom.remove(block);
    if (parentBlock && dom.isEmpty(parentBlock)) {
      dom.remove(parentBlock);
    }
  };
  var backspaceDeleteIntoListCaret = function (editor, isForward) {
    var dom = editor.dom;
    var selectionStartElm = editor.selection.getStart();
    var root = $_ewhx1bf6jcq8h76w.getClosestListRootElm(editor, selectionStartElm);
    var block = dom.getParent(selectionStartElm, dom.isBlock, root);
    if (block && dom.isEmpty(block)) {
      var rng = $_3n96ucf3jcq8h76q.normalizeRange(editor.selection.getRng(true));
      var otherLi_1 = dom.getParent(findNextCaretContainer(editor, rng, isForward, root), 'LI', root);
      if (otherLi_1) {
        editor.undoManager.transact(function () {
          removeBlock(dom, block, root);
          $_db72b5exjcq8h76d.mergeWithAdjacentLists(dom, otherLi_1.parentNode);
          editor.selection.select(otherLi_1, true);
          editor.selection.collapse(isForward);
        });
        return true;
      }
    }
    return false;
  };
  var backspaceDeleteCaret = function (editor, isForward) {
    return backspaceDeleteFromListToListCaret(editor, isForward) || backspaceDeleteIntoListCaret(editor, isForward);
  };
  var backspaceDeleteRange = function (editor) {
    var selectionStartElm = editor.selection.getStart();
    var root = $_ewhx1bf6jcq8h76w.getClosestListRootElm(editor, selectionStartElm);
    var startListParent = editor.dom.getParent(selectionStartElm, 'LI,DT,DD', root);
    if (startListParent || $_ewhx1bf6jcq8h76w.getSelectedListItems(editor).length > 0) {
      editor.undoManager.transact(function () {
        editor.execCommand('Delete');
        $_5atetdf5jcq8h76u.normalizeLists(editor.dom, editor.getBody());
      });
      return true;
    }
    return false;
  };
  var backspaceDelete = function (editor, isForward) {
    return editor.selection.isCollapsed() ? backspaceDeleteCaret(editor, isForward) : backspaceDeleteRange(editor);
  };
  var setup = function (editor) {
    editor.on('keydown', function (e) {
      if (e.keyCode === VK.BACKSPACE) {
        if (backspaceDelete(editor, false)) {
          e.preventDefault();
        }
      } else if (e.keyCode === VK.DELETE) {
        if (backspaceDelete(editor, true)) {
          e.preventDefault();
        }
      }
    });
  };
  var $_2myf82etjcq8h766 = {
    setup: setup,
    backspaceDelete: backspaceDelete
  };

  var get = function (editor) {
    return {
      backspaceDelete: function (isForward) {
        $_2myf82etjcq8h766.backspaceDelete(editor, isForward);
      }
    };
  };
  var $_3cl1y0esjcq8h764 = { get: get };

  var DOM$5 = DOMUtils.DOM;
  var mergeLists = function (from, to) {
    var node;
    if ($_8kryjjf4jcq8h76s.isListNode(from)) {
      while (node = from.firstChild) {
        to.appendChild(node);
      }
      DOM$5.remove(from);
    }
  };
  var indent = function (li) {
    var sibling, newList, listStyle;
    if (li.nodeName === 'DT') {
      DOM$5.rename(li, 'DD');
      return true;
    }
    sibling = li.previousSibling;
    if (sibling && $_8kryjjf4jcq8h76s.isListNode(sibling)) {
      sibling.appendChild(li);
      return true;
    }
    if (sibling && sibling.nodeName === 'LI' && $_8kryjjf4jcq8h76s.isListNode(sibling.lastChild)) {
      sibling.lastChild.appendChild(li);
      mergeLists(li.lastChild, sibling.lastChild);
      return true;
    }
    sibling = li.nextSibling;
    if (sibling && $_8kryjjf4jcq8h76s.isListNode(sibling)) {
      sibling.insertBefore(li, sibling.firstChild);
      return true;
    }
    sibling = li.previousSibling;
    if (sibling && sibling.nodeName === 'LI') {
      newList = DOM$5.create(li.parentNode.nodeName);
      listStyle = DOM$5.getStyle(li.parentNode, 'listStyleType');
      if (listStyle) {
        DOM$5.setStyle(newList, 'listStyleType', listStyle);
      }
      sibling.appendChild(newList);
      newList.appendChild(li);
      mergeLists(li.lastChild, newList);
      return true;
    }
    return false;
  };
  var indentSelection = function (editor) {
    var listElements = $_ewhx1bf6jcq8h76w.getSelectedListItems(editor);
    if (listElements.length) {
      var bookmark = $_7ds4v1f2jcq8h76o.createBookmark(editor.selection.getRng(true));
      for (var i = 0; i < listElements.length; i++) {
        if (!indent(listElements[i]) && i === 0) {
          break;
        }
      }
      editor.selection.setRng($_7ds4v1f2jcq8h76o.resolveBookmark(bookmark));
      editor.nodeChanged();
      return true;
    }
  };
  var $_cf20ewfcjcq8h776 = { indentSelection: indentSelection };

  var queryListCommandState = function (editor, listName) {
    return function () {
      var parentList = editor.dom.getParent(editor.selection.getStart(), 'UL,OL,DL');
      return parentList && parentList.nodeName === listName;
    };
  };
  var register = function (editor) {
    editor.on('BeforeExecCommand', function (e) {
      var cmd = e.command.toLowerCase();
      var isHandled;
      if (cmd === 'indent') {
        if ($_cf20ewfcjcq8h776.indentSelection(editor)) {
          isHandled = true;
        }
      } else if (cmd === 'outdent') {
        if ($_2uej3hf0jcq8h76k.outdentSelection(editor)) {
          isHandled = true;
        }
      }
      if (isHandled) {
        editor.fire('ExecCommand', { command: e.command });
        e.preventDefault();
        return true;
      }
    });
    editor.addCommand('InsertUnorderedList', function (ui, detail) {
      $_db72b5exjcq8h76d.toggleList(editor, 'UL', detail);
    });
    editor.addCommand('InsertOrderedList', function (ui, detail) {
      $_db72b5exjcq8h76d.toggleList(editor, 'OL', detail);
    });
    editor.addCommand('InsertDefinitionList', function (ui, detail) {
      $_db72b5exjcq8h76d.toggleList(editor, 'DL', detail);
    });
    editor.addQueryStateHandler('InsertUnorderedList', queryListCommandState(editor, 'UL'));
    editor.addQueryStateHandler('InsertOrderedList', queryListCommandState(editor, 'OL'));
    editor.addQueryStateHandler('InsertDefinitionList', queryListCommandState(editor, 'DL'));
  };
  var $_b8tjfyfbjcq8h773 = { register: register };

  var shouldIndentOnTab = function (editor) {
    return editor.getParam('lists_indent_on_tab', true);
  };
  var $_dyacmmfejcq8h77a = { shouldIndentOnTab: shouldIndentOnTab };

  var setupTabKey = function (editor) {
    editor.on('keydown', function (e) {
      if (e.keyCode !== VK.TAB || VK.metaKeyPressed(e)) {
        return;
      }
      if (editor.dom.getParent(editor.selection.getStart(), 'LI,DT,DD')) {
        e.preventDefault();
        if (e.shiftKey) {
          $_2uej3hf0jcq8h76k.outdentSelection(editor);
        } else {
          $_cf20ewfcjcq8h776.indentSelection(editor);
        }
      }
    });
  };
  var setup$1 = function (editor) {
    if ($_dyacmmfejcq8h77a.shouldIndentOnTab(editor)) {
      setupTabKey(editor);
    }
    $_2myf82etjcq8h766.setup(editor);
  };
  var $_50aobofdjcq8h779 = { setup: setup$1 };

  var findIndex = function (list, predicate) {
    for (var index = 0; index < list.length; index++) {
      var element = list[index];
      if (predicate(element)) {
        return index;
      }
    }
    return -1;
  };
  var listState = function (editor, listName) {
    return function (e) {
      var ctrl = e.control;
      editor.on('NodeChange', function (e) {
        var tableCellIndex = findIndex(e.parents, $_8kryjjf4jcq8h76s.isTableCellNode);
        var parents = tableCellIndex !== -1 ? e.parents.slice(0, tableCellIndex) : e.parents;
        var lists = Tools.grep(parents, $_8kryjjf4jcq8h76s.isListNode);
        ctrl.active(lists.length > 0 && lists[0].nodeName === listName);
      });
    };
  };
  var indentPostRender = function (editor) {
    return function (e) {
      var ctrl = e.control;
      editor.on('nodechange', function () {
        var listItemBlocks = $_ewhx1bf6jcq8h76w.getSelectedListItems(editor);
        var disable = listItemBlocks.length > 0 && $_8kryjjf4jcq8h76s.isFirstChild(listItemBlocks[0]);
        ctrl.disabled(disable);
      });
    };
  };
  var register$1 = function (editor) {
    var hasPlugin = function (editor, plugin) {
      var plugins = editor.settings.plugins ? editor.settings.plugins : '';
      return Tools.inArray(plugins.split(/[ ,]/), plugin) !== -1;
    };
    if (!hasPlugin(editor, 'advlist')) {
      editor.addButton('numlist', {
        active: false,
        title: 'Numbered list',
        cmd: 'InsertOrderedList',
        onPostRender: listState(editor, 'OL')
      });
      editor.addButton('bullist', {
        active: false,
        title: 'Bullet list',
        cmd: 'InsertUnorderedList',
        onPostRender: listState(editor, 'UL')
      });
    }
    editor.addButton('indent', {
      icon: 'indent',
      title: 'Increase indent',
      cmd: 'Indent',
      onPostRender: indentPostRender(editor)
    });
  };
  var $_4iryk7ffjcq8h77b = { register: register$1 };

  PluginManager.add('lists', function (editor) {
    $_50aobofdjcq8h779.setup(editor);
    $_4iryk7ffjcq8h77b.register(editor);
    $_b8tjfyfbjcq8h773.register(editor);
    return $_3cl1y0esjcq8h764.get(editor);
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()


/***/ }),

/***/ "./node_modules/tinymce/plugins/paste/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/tinymce/plugins/paste/index.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "paste" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/paste')
//   ES2015:
//     import 'tinymce/plugins/paste'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/paste/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/paste/plugin.js":
/*!******************************************************!*\
  !*** ./node_modules/tinymce/plugins/paste/plugin.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

(function () {
var paste = (function () {
  'use strict';

  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var hasProPlugin = function (editor) {
    if (/(^|[ ,])powerpaste([, ]|$)/.test(editor.settings.plugins) && PluginManager.get('powerpaste')) {
      if (typeof window.console !== 'undefined' && window.console.log) {
        window.console.log('PowerPaste is incompatible with Paste plugin! Remove \'paste\' from the \'plugins\' option.');
      }
      return true;
    } else {
      return false;
    }
  };
  var $_c9r1regxjcq8h7e5 = { hasProPlugin: hasProPlugin };

  var get = function (clipboard, quirks) {
    return {
      clipboard: clipboard,
      quirks: quirks
    };
  };
  var $_9r5u22gyjcq8h7e6 = { get: get };

  var firePastePreProcess = function (editor, html, internal, isWordHtml) {
    return editor.fire('PastePreProcess', {
      content: html,
      internal: internal,
      wordContent: isWordHtml
    });
  };
  var firePastePostProcess = function (editor, node, internal, isWordHtml) {
    return editor.fire('PastePostProcess', {
      node: node,
      internal: internal,
      wordContent: isWordHtml
    });
  };
  var firePastePlainTextToggle = function (editor, state) {
    return editor.fire('PastePlainTextToggle', { state: state });
  };
  var firePaste = function (editor, ieFake) {
    return editor.fire('paste', { ieFake: ieFake });
  };
  var $_2jo74oh1jcq8h7ea = {
    firePastePreProcess: firePastePreProcess,
    firePastePostProcess: firePastePostProcess,
    firePastePlainTextToggle: firePastePlainTextToggle,
    firePaste: firePaste
  };

  var shouldPlainTextInform = function (editor) {
    return editor.getParam('paste_plaintext_inform', true);
  };
  var shouldBlockDrop = function (editor) {
    return editor.getParam('paste_block_drop', false);
  };
  var shouldPasteDataImages = function (editor) {
    return editor.getParam('paste_data_images', false);
  };
  var shouldFilterDrop = function (editor) {
    return editor.getParam('paste_filter_drop', true);
  };
  var getPreProcess = function (editor) {
    return editor.getParam('paste_preprocess');
  };
  var getPostProcess = function (editor) {
    return editor.getParam('paste_postprocess');
  };
  var getWebkitStyles = function (editor) {
    return editor.getParam('paste_webkit_styles');
  };
  var shouldRemoveWebKitStyles = function (editor) {
    return editor.getParam('paste_remove_styles_if_webkit', true);
  };
  var shouldMergeFormats = function (editor) {
    return editor.getParam('paste_merge_formats', true);
  };
  var isSmartPasteEnabled = function (editor) {
    return editor.getParam('smart_paste', true);
  };
  var isPasteAsTextEnabled = function (editor) {
    return editor.getParam('paste_as_text', false);
  };
  var getRetainStyleProps = function (editor) {
    return editor.getParam('paste_retain_style_properties');
  };
  var getWordValidElements = function (editor) {
    var defaultValidElements = '-strong/b,-em/i,-u,-span,-p,-ol,-ul,-li,-h1,-h2,-h3,-h4,-h5,-h6,' + '-p/div,-a[href|name],sub,sup,strike,br,del,table[width],tr,' + 'td[colspan|rowspan|width],th[colspan|rowspan|width],thead,tfoot,tbody';
    return editor.getParam('paste_word_valid_elements', defaultValidElements);
  };
  var shouldConvertWordFakeLists = function (editor) {
    return editor.getParam('paste_convert_word_fake_lists', true);
  };
  var shouldUseDefaultFilters = function (editor) {
    return editor.getParam('paste_enable_default_filters', true);
  };
  var $_9orupch2jcq8h7eb = {
    shouldPlainTextInform: shouldPlainTextInform,
    shouldBlockDrop: shouldBlockDrop,
    shouldPasteDataImages: shouldPasteDataImages,
    shouldFilterDrop: shouldFilterDrop,
    getPreProcess: getPreProcess,
    getPostProcess: getPostProcess,
    getWebkitStyles: getWebkitStyles,
    shouldRemoveWebKitStyles: shouldRemoveWebKitStyles,
    shouldMergeFormats: shouldMergeFormats,
    isSmartPasteEnabled: isSmartPasteEnabled,
    isPasteAsTextEnabled: isPasteAsTextEnabled,
    getRetainStyleProps: getRetainStyleProps,
    getWordValidElements: getWordValidElements,
    shouldConvertWordFakeLists: shouldConvertWordFakeLists,
    shouldUseDefaultFilters: shouldUseDefaultFilters
  };

  var shouldInformUserAboutPlainText = function (editor, userIsInformedState) {
    return userIsInformedState.get() === false && $_9orupch2jcq8h7eb.shouldPlainTextInform(editor);
  };
  var displayNotification = function (editor, message) {
    editor.notificationManager.open({
      text: editor.translate(message),
      type: 'info'
    });
  };
  var togglePlainTextPaste = function (editor, clipboard, userIsInformedState) {
    if (clipboard.pasteFormat === 'text') {
      clipboard.pasteFormat = 'html';
      $_2jo74oh1jcq8h7ea.firePastePlainTextToggle(editor, false);
    } else {
      clipboard.pasteFormat = 'text';
      $_2jo74oh1jcq8h7ea.firePastePlainTextToggle(editor, true);
      if (shouldInformUserAboutPlainText(editor, userIsInformedState)) {
        displayNotification(editor, 'Paste is now in plain text mode. Contents will now be pasted as plain text until you toggle this option off.');
        userIsInformedState.set(true);
      }
    }
    editor.focus();
  };
  var $_6nvr6hh0jcq8h7e8 = { togglePlainTextPaste: togglePlainTextPaste };

  var register = function (editor, clipboard, userIsInformedState) {
    editor.addCommand('mceTogglePlainTextPaste', function () {
      $_6nvr6hh0jcq8h7e8.togglePlainTextPaste(editor, clipboard, userIsInformedState);
    });
    editor.addCommand('mceInsertClipboardContent', function (ui, value) {
      if (value.content) {
        clipboard.pasteHtml(value.content, value.internal);
      }
      if (value.text) {
        clipboard.pasteText(value.text);
      }
    });
  };
  var $_13sr5igzjcq8h7e6 = { register: register };

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

  var Delay = tinymce.util.Tools.resolve('tinymce.util.Delay');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var VK = tinymce.util.Tools.resolve('tinymce.util.VK');

  var internalMimeType = 'x-tinymce/html';
  var internalMark = '<!-- ' + internalMimeType + ' -->';
  var mark = function (html) {
    return internalMark + html;
  };
  var unmark = function (html) {
    return html.replace(internalMark, '');
  };
  var isMarked = function (html) {
    return html.indexOf(internalMark) !== -1;
  };
  var $_fm2tzkh8jcq8h7en = {
    mark: mark,
    unmark: unmark,
    isMarked: isMarked,
    internalHtmlMime: function () {
      return internalMimeType;
    }
  };

  var Entities = tinymce.util.Tools.resolve('tinymce.html.Entities');

  var isPlainText = function (text) {
    return !/<(?:\/?(?!(?:div|p|br|span)>)\w+|(?:(?!(?:span style="white-space:\s?pre;?">)|br\s?\/>))\w+\s[^>]+)>/i.test(text);
  };
  var toBRs = function (text) {
    return text.replace(/\r?\n/g, '<br>');
  };
  var openContainer = function (rootTag, rootAttrs) {
    var key;
    var attrs = [];
    var tag = '<' + rootTag;
    if (typeof rootAttrs === 'object') {
      for (key in rootAttrs) {
        if (rootAttrs.hasOwnProperty(key)) {
          attrs.push(key + '="' + Entities.encodeAllRaw(rootAttrs[key]) + '"');
        }
      }
      if (attrs.length) {
        tag += ' ' + attrs.join(' ');
      }
    }
    return tag + '>';
  };
  var toBlockElements = function (text, rootTag, rootAttrs) {
    var blocks = text.split(/\n\n/);
    var tagOpen = openContainer(rootTag, rootAttrs);
    var tagClose = '</' + rootTag + '>';
    var paragraphs = Tools.map(blocks, function (p) {
      return p.split(/\n/).join('<br />');
    });
    var stitch = function (p) {
      return tagOpen + p + tagClose;
    };
    return paragraphs.length === 1 ? paragraphs[0] : Tools.map(paragraphs, stitch).join('');
  };
  var convert = function (text, rootTag, rootAttrs) {
    return rootTag ? toBlockElements(text, rootTag, rootAttrs) : toBRs(text);
  };
  var $_ep3wn5h9jcq8h7eo = {
    isPlainText: isPlainText,
    convert: convert,
    toBRs: toBRs,
    toBlockElements: toBlockElements
  };

  var PasteBin = function (editor) {
    var lastRng;
    var pasteBinDefaultContent = '%MCEPASTEBIN%';
    var create = function () {
      var dom = editor.dom, body = editor.getBody();
      var viewport = editor.dom.getViewPort(editor.getWin());
      var scrollTop = viewport.y, top = 20;
      var pasteBinElm;
      var scrollContainer;
      lastRng = editor.selection.getRng();
      if (editor.inline) {
        scrollContainer = editor.selection.getScrollContainer();
        if (scrollContainer && scrollContainer.scrollTop > 0) {
          scrollTop = scrollContainer.scrollTop;
        }
      }
      function getCaretRect(rng) {
        var rects, textNode, node;
        var container = rng.startContainer;
        rects = rng.getClientRects();
        if (rects.length) {
          return rects[0];
        }
        if (!rng.collapsed || container.nodeType !== 1) {
          return;
        }
        node = container.childNodes[lastRng.startOffset];
        while (node && node.nodeType === 3 && !node.data.length) {
          node = node.nextSibling;
        }
        if (!node) {
          return;
        }
        if (node.tagName === 'BR') {
          textNode = dom.doc.createTextNode('\uFEFF');
          node.parentNode.insertBefore(textNode, node);
          rng = dom.createRng();
          rng.setStartBefore(textNode);
          rng.setEndAfter(textNode);
          rects = rng.getClientRects();
          dom.remove(textNode);
        }
        if (rects.length) {
          return rects[0];
        }
      }
      if (lastRng.getClientRects) {
        var rect = getCaretRect(lastRng);
        if (rect) {
          top = scrollTop + (rect.top - dom.getPos(body).y);
        } else {
          top = scrollTop;
          var container = lastRng.startContainer;
          if (container) {
            if (container.nodeType === 3 && container.parentNode !== body) {
              container = container.parentNode;
            }
            if (container.nodeType === 1) {
              top = dom.getPos(container, scrollContainer || body).y;
            }
          }
        }
      }
      pasteBinElm = editor.dom.add(editor.getBody(), 'div', {
        'id': 'mcepastebin',
        'contentEditable': true,
        'data-mce-bogus': 'all',
        'style': 'position: absolute; top: ' + top + 'px; width: 10px; height: 10px; overflow: hidden; opacity: 0'
      }, pasteBinDefaultContent);
      if (Env.ie || Env.gecko) {
        dom.setStyle(pasteBinElm, 'left', dom.getStyle(body, 'direction', true) === 'rtl' ? 65535 : -65535);
      }
      dom.bind(pasteBinElm, 'beforedeactivate focusin focusout', function (e) {
        e.stopPropagation();
      });
      pasteBinElm.focus();
      editor.selection.select(pasteBinElm, true);
    };
    var remove = function () {
      if (getEl()) {
        var pasteBinClone = void 0;
        while (pasteBinClone = editor.dom.get('mcepastebin')) {
          editor.dom.remove(pasteBinClone);
          editor.dom.unbind(pasteBinClone);
        }
        if (lastRng) {
          editor.selection.setRng(lastRng);
        }
      }
      lastRng = null;
    };
    var getEl = function () {
      return editor.dom.get('mcepastebin');
    };
    var getHtml = function () {
      var pasteBinElm, pasteBinClones, i, dirtyWrappers, cleanWrapper;
      var copyAndRemove = function (toElm, fromElm) {
        toElm.appendChild(fromElm);
        editor.dom.remove(fromElm, true);
      };
      pasteBinClones = Tools.grep(editor.getBody().childNodes, function (elm) {
        return elm.id === 'mcepastebin';
      });
      pasteBinElm = pasteBinClones.shift();
      Tools.each(pasteBinClones, function (pasteBinClone) {
        copyAndRemove(pasteBinElm, pasteBinClone);
      });
      dirtyWrappers = editor.dom.select('div[id=mcepastebin]', pasteBinElm);
      for (i = dirtyWrappers.length - 1; i >= 0; i--) {
        cleanWrapper = editor.dom.create('div');
        pasteBinElm.insertBefore(cleanWrapper, dirtyWrappers[i]);
        copyAndRemove(cleanWrapper, dirtyWrappers[i]);
      }
      return pasteBinElm ? pasteBinElm.innerHTML : '';
    };
    var getLastRng = function () {
      return lastRng;
    };
    var isDefaultContent = function (content) {
      return content === pasteBinDefaultContent;
    };
    var isPasteBin = function (elm) {
      return elm && elm.id === 'mcepastebin';
    };
    var isDefault = function () {
      var pasteBinElm = getEl();
      return isPasteBin(pasteBinElm) && isDefaultContent(pasteBinElm.innerHTML);
    };
    return {
      create: create,
      remove: remove,
      getEl: getEl,
      getHtml: getHtml,
      getLastRng: getLastRng,
      isDefault: isDefault,
      isDefaultContent: isDefaultContent
    };
  };

  var DomParser = tinymce.util.Tools.resolve('tinymce.html.DomParser');

  var Node = tinymce.util.Tools.resolve('tinymce.html.Node');

  var Schema = tinymce.util.Tools.resolve('tinymce.html.Schema');

  var Serializer = tinymce.util.Tools.resolve('tinymce.html.Serializer');

  function filter(content, items) {
    Tools.each(items, function (v) {
      if (v.constructor === RegExp) {
        content = content.replace(v, '');
      } else {
        content = content.replace(v[0], v[1]);
      }
    });
    return content;
  }
  function innerText(html) {
    var schema = Schema();
    var domParser = DomParser({}, schema);
    var text = '';
    var shortEndedElements = schema.getShortEndedElements();
    var ignoreElements = Tools.makeMap('script noscript style textarea video audio iframe object', ' ');
    var blockElements = schema.getBlockElements();
    function walk(node) {
      var name = node.name, currentNode = node;
      if (name === 'br') {
        text += '\n';
        return;
      }
      if (shortEndedElements[name]) {
        text += ' ';
      }
      if (ignoreElements[name]) {
        text += ' ';
        return;
      }
      if (node.type === 3) {
        text += node.value;
      }
      if (!node.shortEnded) {
        if (node = node.firstChild) {
          do {
            walk(node);
          } while (node = node.next);
        }
      }
      if (blockElements[name] && currentNode.next) {
        text += '\n';
        if (name === 'p') {
          text += '\n';
        }
      }
    }
    html = filter(html, [/<!\[[^\]]+\]>/g]);
    walk(domParser.parse(html));
    return text;
  }
  function trimHtml(html) {
    function trimSpaces(all, s1, s2) {
      if (!s1 && !s2) {
        return ' ';
      }
      return '\xA0';
    }
    html = filter(html, [
      /^[\s\S]*<body[^>]*>\s*|\s*<\/body[^>]*>[\s\S]*$/ig,
      /<!--StartFragment-->|<!--EndFragment-->/g,
      [
        /( ?)<span class="Apple-converted-space">\u00a0<\/span>( ?)/g,
        trimSpaces
      ],
      /<br class="Apple-interchange-newline">/g,
      /<br>$/i
    ]);
    return html;
  }
  function createIdGenerator(prefix) {
    var count = 0;
    return function () {
      return prefix + count++;
    };
  }
  var isMsEdge = function () {
    return navigator.userAgent.indexOf(' Edge/') !== -1;
  };
  var $_7h8kq4hijcq8h7fg = {
    filter: filter,
    innerText: innerText,
    trimHtml: trimHtml,
    createIdGenerator: createIdGenerator,
    isMsEdge: isMsEdge
  };

  function isWordContent(content) {
    return /<font face="Times New Roman"|class="?Mso|style="[^"]*\bmso-|style='[^'']*\bmso-|w:WordDocument/i.test(content) || /class="OutlineElement/.test(content) || /id="?docs\-internal\-guid\-/.test(content);
  }
  function isNumericList(text) {
    var found, patterns;
    patterns = [
      /^[IVXLMCD]{1,2}\.[ \u00a0]/,
      /^[ivxlmcd]{1,2}\.[ \u00a0]/,
      /^[a-z]{1,2}[\.\)][ \u00a0]/,
      /^[A-Z]{1,2}[\.\)][ \u00a0]/,
      /^[0-9]+\.[ \u00a0]/,
      /^[\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d]+\.[ \u00a0]/,
      /^[\u58f1\u5f10\u53c2\u56db\u4f0d\u516d\u4e03\u516b\u4e5d\u62fe]+\.[ \u00a0]/
    ];
    text = text.replace(/^[\u00a0 ]+/, '');
    Tools.each(patterns, function (pattern) {
      if (pattern.test(text)) {
        found = true;
        return false;
      }
    });
    return found;
  }
  function isBulletList(text) {
    return /^[\s\u00a0]*[\u2022\u00b7\u00a7\u25CF]\s*/.test(text);
  }
  function convertFakeListsToProperLists(node) {
    var currentListNode, prevListNode, lastLevel = 1;
    function getText(node) {
      var txt = '';
      if (node.type === 3) {
        return node.value;
      }
      if (node = node.firstChild) {
        do {
          txt += getText(node);
        } while (node = node.next);
      }
      return txt;
    }
    function trimListStart(node, regExp) {
      if (node.type === 3) {
        if (regExp.test(node.value)) {
          node.value = node.value.replace(regExp, '');
          return false;
        }
      }
      if (node = node.firstChild) {
        do {
          if (!trimListStart(node, regExp)) {
            return false;
          }
        } while (node = node.next);
      }
      return true;
    }
    function removeIgnoredNodes(node) {
      if (node._listIgnore) {
        node.remove();
        return;
      }
      if (node = node.firstChild) {
        do {
          removeIgnoredNodes(node);
        } while (node = node.next);
      }
    }
    function convertParagraphToLi(paragraphNode, listName, start) {
      var level = paragraphNode._listLevel || lastLevel;
      if (level !== lastLevel) {
        if (level < lastLevel) {
          if (currentListNode) {
            currentListNode = currentListNode.parent.parent;
          }
        } else {
          prevListNode = currentListNode;
          currentListNode = null;
        }
      }
      if (!currentListNode || currentListNode.name !== listName) {
        prevListNode = prevListNode || currentListNode;
        currentListNode = new Node(listName, 1);
        if (start > 1) {
          currentListNode.attr('start', '' + start);
        }
        paragraphNode.wrap(currentListNode);
      } else {
        currentListNode.append(paragraphNode);
      }
      paragraphNode.name = 'li';
      if (level > lastLevel && prevListNode) {
        prevListNode.lastChild.append(currentListNode);
      }
      lastLevel = level;
      removeIgnoredNodes(paragraphNode);
      trimListStart(paragraphNode, /^\u00a0+/);
      trimListStart(paragraphNode, /^\s*([\u2022\u00b7\u00a7\u25CF]|\w+\.)/);
      trimListStart(paragraphNode, /^\u00a0+/);
    }
    var elements = [];
    var child = node.firstChild;
    while (typeof child !== 'undefined' && child !== null) {
      elements.push(child);
      child = child.walk();
      if (child !== null) {
        while (typeof child !== 'undefined' && child.parent !== node) {
          child = child.walk();
        }
      }
    }
    for (var i = 0; i < elements.length; i++) {
      node = elements[i];
      if (node.name === 'p' && node.firstChild) {
        var nodeText = getText(node);
        if (isBulletList(nodeText)) {
          convertParagraphToLi(node, 'ul');
          continue;
        }
        if (isNumericList(nodeText)) {
          var matches = /([0-9]+)\./.exec(nodeText);
          var start = 1;
          if (matches) {
            start = parseInt(matches[1], 10);
          }
          convertParagraphToLi(node, 'ol', start);
          continue;
        }
        if (node._listLevel) {
          convertParagraphToLi(node, 'ul', 1);
          continue;
        }
        currentListNode = null;
      } else {
        prevListNode = currentListNode;
        currentListNode = null;
      }
    }
  }
  function filterStyles(editor, validStyles, node, styleValue) {
    var outputStyles = {}, matches;
    var styles = editor.dom.parseStyle(styleValue);
    Tools.each(styles, function (value, name) {
      switch (name) {
      case 'mso-list':
        matches = /\w+ \w+([0-9]+)/i.exec(styleValue);
        if (matches) {
          node._listLevel = parseInt(matches[1], 10);
        }
        if (/Ignore/i.test(value) && node.firstChild) {
          node._listIgnore = true;
          node.firstChild._listIgnore = true;
        }
        break;
      case 'horiz-align':
        name = 'text-align';
        break;
      case 'vert-align':
        name = 'vertical-align';
        break;
      case 'font-color':
      case 'mso-foreground':
        name = 'color';
        break;
      case 'mso-background':
      case 'mso-highlight':
        name = 'background';
        break;
      case 'font-weight':
      case 'font-style':
        if (value !== 'normal') {
          outputStyles[name] = value;
        }
        return;
      case 'mso-element':
        if (/^(comment|comment-list)$/i.test(value)) {
          node.remove();
          return;
        }
        break;
      }
      if (name.indexOf('mso-comment') === 0) {
        node.remove();
        return;
      }
      if (name.indexOf('mso-') === 0) {
        return;
      }
      if ($_9orupch2jcq8h7eb.getRetainStyleProps(editor) === 'all' || validStyles && validStyles[name]) {
        outputStyles[name] = value;
      }
    });
    if (/(bold)/i.test(outputStyles['font-weight'])) {
      delete outputStyles['font-weight'];
      node.wrap(new Node('b', 1));
    }
    if (/(italic)/i.test(outputStyles['font-style'])) {
      delete outputStyles['font-style'];
      node.wrap(new Node('i', 1));
    }
    outputStyles = editor.dom.serializeStyle(outputStyles, node.name);
    if (outputStyles) {
      return outputStyles;
    }
    return null;
  }
  var filterWordContent = function (editor, content) {
    var retainStyleProperties, validStyles;
    retainStyleProperties = $_9orupch2jcq8h7eb.getRetainStyleProps(editor);
    if (retainStyleProperties) {
      validStyles = Tools.makeMap(retainStyleProperties.split(/[, ]/));
    }
    content = $_7h8kq4hijcq8h7fg.filter(content, [
      /<br class="?Apple-interchange-newline"?>/gi,
      /<b[^>]+id="?docs-internal-[^>]*>/gi,
      /<!--[\s\S]+?-->/gi,
      /<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi,
      [
        /<(\/?)s>/gi,
        '<$1strike>'
      ],
      [
        /&nbsp;/gi,
        '\xA0'
      ],
      [
        /<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi,
        function (str, spaces) {
          return spaces.length > 0 ? spaces.replace(/./, ' ').slice(Math.floor(spaces.length / 2)).split('').join('\xA0') : '';
        }
      ]
    ]);
    var validElements = $_9orupch2jcq8h7eb.getWordValidElements(editor);
    var schema = Schema({
      valid_elements: validElements,
      valid_children: '-li[p]'
    });
    Tools.each(schema.elements, function (rule) {
      if (!rule.attributes.class) {
        rule.attributes.class = {};
        rule.attributesOrder.push('class');
      }
      if (!rule.attributes.style) {
        rule.attributes.style = {};
        rule.attributesOrder.push('style');
      }
    });
    var domParser = DomParser({}, schema);
    domParser.addAttributeFilter('style', function (nodes) {
      var i = nodes.length, node;
      while (i--) {
        node = nodes[i];
        node.attr('style', filterStyles(editor, validStyles, node, node.attr('style')));
        if (node.name === 'span' && node.parent && !node.attributes.length) {
          node.unwrap();
        }
      }
    });
    domParser.addAttributeFilter('class', function (nodes) {
      var i = nodes.length, node, className;
      while (i--) {
        node = nodes[i];
        className = node.attr('class');
        if (/^(MsoCommentReference|MsoCommentText|msoDel)$/i.test(className)) {
          node.remove();
        }
        node.attr('class', null);
      }
    });
    domParser.addNodeFilter('del', function (nodes) {
      var i = nodes.length;
      while (i--) {
        nodes[i].remove();
      }
    });
    domParser.addNodeFilter('a', function (nodes) {
      var i = nodes.length, node, href, name;
      while (i--) {
        node = nodes[i];
        href = node.attr('href');
        name = node.attr('name');
        if (href && href.indexOf('#_msocom_') !== -1) {
          node.remove();
          continue;
        }
        if (href && href.indexOf('file://') === 0) {
          href = href.split('#')[1];
          if (href) {
            href = '#' + href;
          }
        }
        if (!href && !name) {
          node.unwrap();
        } else {
          if (name && !/^_?(?:toc|edn|ftn)/i.test(name)) {
            node.unwrap();
            continue;
          }
          node.attr({
            href: href,
            name: name
          });
        }
      }
    });
    var rootNode = domParser.parse(content);
    if ($_9orupch2jcq8h7eb.shouldConvertWordFakeLists(editor)) {
      convertFakeListsToProperLists(rootNode);
    }
    content = Serializer({ validate: editor.settings.validate }, schema).serialize(rootNode);
    return content;
  };
  var preProcess = function (editor, content) {
    return $_9orupch2jcq8h7eb.shouldUseDefaultFilters(editor) ? filterWordContent(editor, content) : content;
  };
  var $_3qrfaqhdjcq8h7ez = {
    preProcess: preProcess,
    isWordContent: isWordContent
  };

  var processResult = function (content, cancelled) {
    return {
      content: content,
      cancelled: cancelled
    };
  };
  var postProcessFilter = function (editor, html, internal, isWordHtml) {
    var tempBody = editor.dom.create('div', { style: 'display:none' }, html);
    var postProcessArgs = $_2jo74oh1jcq8h7ea.firePastePostProcess(editor, tempBody, internal, isWordHtml);
    return processResult(postProcessArgs.node.innerHTML, postProcessArgs.isDefaultPrevented());
  };
  var filterContent = function (editor, content, internal, isWordHtml) {
    var preProcessArgs = $_2jo74oh1jcq8h7ea.firePastePreProcess(editor, content, internal, isWordHtml);
    if (editor.hasEventListeners('PastePostProcess') && !preProcessArgs.isDefaultPrevented()) {
      return postProcessFilter(editor, preProcessArgs.content, internal, isWordHtml);
    } else {
      return processResult(preProcessArgs.content, preProcessArgs.isDefaultPrevented());
    }
  };
  var process = function (editor, html, internal) {
    var isWordHtml = $_3qrfaqhdjcq8h7ez.isWordContent(html);
    var content = isWordHtml ? $_3qrfaqhdjcq8h7ez.preProcess(editor, html) : html;
    return filterContent(editor, content, internal, isWordHtml);
  };
  var $_8mcykuhcjcq8h7ew = { process: process };

  var isAbsoluteUrl = function (url) {
    return /^https?:\/\/[\w\?\-\/+=.&%@~#]+$/i.test(url);
  };
  var isImageUrl = function (url) {
    return isAbsoluteUrl(url) && /.(gif|jpe?g|png)$/.test(url);
  };
  var createImage = function (editor, url, pasteHtml) {
    editor.undoManager.extra(function () {
      pasteHtml(editor, url);
    }, function () {
      editor.insertContent('<img src="' + url + '">');
    });
    return true;
  };
  var createLink = function (editor, url, pasteHtml) {
    editor.undoManager.extra(function () {
      pasteHtml(editor, url);
    }, function () {
      editor.execCommand('mceInsertLink', false, url);
    });
    return true;
  };
  var linkSelection = function (editor, html, pasteHtml) {
    return editor.selection.isCollapsed() === false && isAbsoluteUrl(html) ? createLink(editor, html, pasteHtml) : false;
  };
  var insertImage = function (editor, html, pasteHtml) {
    return isImageUrl(html) ? createImage(editor, html, pasteHtml) : false;
  };
  var pasteHtml = function (editor, html) {
    editor.insertContent(html, {
      merge: $_9orupch2jcq8h7eb.shouldMergeFormats(editor),
      paste: true
    });
    return true;
  };
  var smartInsertContent = function (editor, html) {
    Tools.each([
      linkSelection,
      insertImage,
      pasteHtml
    ], function (action) {
      return action(editor, html, pasteHtml) !== true;
    });
  };
  var insertContent = function (editor, html) {
    if ($_9orupch2jcq8h7eb.isSmartPasteEnabled(editor) === false) {
      pasteHtml(editor, html);
    } else {
      smartInsertContent(editor, html);
    }
  };
  var $_ae3468hjjcq8h7fj = {
    isImageUrl: isImageUrl,
    isAbsoluteUrl: isAbsoluteUrl,
    insertContent: insertContent
  };

  var Clipboard = function (editor) {
    var self = this;
    var keyboardPasteTimeStamp = 0;
    var pasteBin = PasteBin(editor);
    var keyboardPastePlainTextState;
    var mceInternalUrlPrefix = 'data:text/mce-internal,';
    var uniqueId = $_7h8kq4hijcq8h7fg.createIdGenerator('mceclip');
    self.pasteFormat = $_9orupch2jcq8h7eb.isPasteAsTextEnabled(editor) ? 'text' : 'html';
    function pasteHtml(html, internalFlag) {
      var internal = internalFlag ? internalFlag : $_fm2tzkh8jcq8h7en.isMarked(html);
      var args = $_8mcykuhcjcq8h7ew.process(editor, $_fm2tzkh8jcq8h7en.unmark(html), internal);
      if (args.cancelled === false) {
        $_ae3468hjjcq8h7fj.insertContent(editor, args.content);
      }
    }
    function pasteText(text) {
      text = editor.dom.encode(text).replace(/\r\n/g, '\n');
      text = $_ep3wn5h9jcq8h7eo.convert(text, editor.settings.forced_root_block, editor.settings.forced_root_block_attrs);
      pasteHtml(text, false);
    }
    function getDataTransferItems(dataTransfer) {
      var items = {};
      if (dataTransfer) {
        if (dataTransfer.getData) {
          var legacyText = dataTransfer.getData('Text');
          if (legacyText && legacyText.length > 0) {
            if (legacyText.indexOf(mceInternalUrlPrefix) === -1) {
              items['text/plain'] = legacyText;
            }
          }
        }
        if (dataTransfer.types) {
          for (var i = 0; i < dataTransfer.types.length; i++) {
            var contentType = dataTransfer.types[i];
            try {
              items[contentType] = dataTransfer.getData(contentType);
            } catch (ex) {
              items[contentType] = '';
            }
          }
        }
      }
      return items;
    }
    function getClipboardContent(clipboardEvent) {
      var content = getDataTransferItems(clipboardEvent.clipboardData || editor.getDoc().dataTransfer);
      return $_7h8kq4hijcq8h7fg.isMsEdge() ? Tools.extend(content, { 'text/html': '' }) : content;
    }
    function hasHtmlOrText(content) {
      return hasContentType(content, 'text/html') || hasContentType(content, 'text/plain');
    }
    function getBase64FromUri(uri) {
      var idx;
      idx = uri.indexOf(',');
      if (idx !== -1) {
        return uri.substr(idx + 1);
      }
      return null;
    }
    function isValidDataUriImage(settings, imgElm) {
      return settings.images_dataimg_filter ? settings.images_dataimg_filter(imgElm) : true;
    }
    function extractFilename(str) {
      var m = str.match(/([\s\S]+?)\.(?:jpeg|jpg|png|gif)$/i);
      return m ? editor.dom.encode(m[1]) : null;
    }
    function pasteImage(rng, reader, blob) {
      if (rng) {
        editor.selection.setRng(rng);
        rng = null;
      }
      var dataUri = reader.result;
      var base64 = getBase64FromUri(dataUri);
      var id = uniqueId();
      var name = editor.settings.images_reuse_filename && blob.name ? extractFilename(blob.name) : id;
      var img = new Image();
      img.src = dataUri;
      if (isValidDataUriImage(editor.settings, img)) {
        var blobCache = editor.editorUpload.blobCache;
        var blobInfo = void 0, existingBlobInfo = void 0;
        existingBlobInfo = blobCache.findFirst(function (cachedBlobInfo) {
          return cachedBlobInfo.base64() === base64;
        });
        if (!existingBlobInfo) {
          blobInfo = blobCache.create(id, blob, base64, name);
          blobCache.add(blobInfo);
        } else {
          blobInfo = existingBlobInfo;
        }
        pasteHtml('<img src="' + blobInfo.blobUri() + '">', false);
      } else {
        pasteHtml('<img src="' + dataUri + '">', false);
      }
    }
    function pasteImageData(e, rng) {
      var dataTransfer = e.clipboardData || e.dataTransfer;
      function processItems(items) {
        var i, item, reader, hadImage = false;
        if (items) {
          for (i = 0; i < items.length; i++) {
            item = items[i];
            if (/^image\/(jpeg|png|gif|bmp)$/.test(item.type)) {
              var blob = item.getAsFile ? item.getAsFile() : item;
              reader = new window.FileReader();
              reader.onload = pasteImage.bind(null, rng, reader, blob);
              reader.readAsDataURL(blob);
              e.preventDefault();
              hadImage = true;
            }
          }
        }
        return hadImage;
      }
      if (editor.settings.paste_data_images && dataTransfer) {
        return processItems(dataTransfer.items) || processItems(dataTransfer.files);
      }
    }
    function isBrokenAndroidClipboardEvent(e) {
      var clipboardData = e.clipboardData;
      return navigator.userAgent.indexOf('Android') !== -1 && clipboardData && clipboardData.items && clipboardData.items.length === 0;
    }
    function hasContentType(clipboardContent, mimeType) {
      return mimeType in clipboardContent && clipboardContent[mimeType].length > 0;
    }
    function isKeyboardPasteEvent(e) {
      return VK.metaKeyPressed(e) && e.keyCode === 86 || e.shiftKey && e.keyCode === 45;
    }
    function registerEventHandlers() {
      editor.on('keydown', function (e) {
        function removePasteBinOnKeyUp(e) {
          if (isKeyboardPasteEvent(e) && !e.isDefaultPrevented()) {
            pasteBin.remove();
          }
        }
        if (isKeyboardPasteEvent(e) && !e.isDefaultPrevented()) {
          keyboardPastePlainTextState = e.shiftKey && e.keyCode === 86;
          if (keyboardPastePlainTextState && Env.webkit && navigator.userAgent.indexOf('Version/') !== -1) {
            return;
          }
          e.stopImmediatePropagation();
          keyboardPasteTimeStamp = new Date().getTime();
          if (Env.ie && keyboardPastePlainTextState) {
            e.preventDefault();
            $_2jo74oh1jcq8h7ea.firePaste(editor, true);
            return;
          }
          pasteBin.remove();
          pasteBin.create();
          editor.once('keyup', removePasteBinOnKeyUp);
          editor.once('paste', function () {
            editor.off('keyup', removePasteBinOnKeyUp);
          });
        }
      });
      function insertClipboardContent(clipboardContent, isKeyBoardPaste, plainTextMode, internal) {
        var content, isPlainTextHtml;
        if (hasContentType(clipboardContent, 'text/html')) {
          content = clipboardContent['text/html'];
        } else {
          content = pasteBin.getHtml();
          internal = internal ? internal : $_fm2tzkh8jcq8h7en.isMarked(content);
          if (pasteBin.isDefaultContent(content)) {
            plainTextMode = true;
          }
        }
        content = $_7h8kq4hijcq8h7fg.trimHtml(content);
        pasteBin.remove();
        isPlainTextHtml = internal === false && $_ep3wn5h9jcq8h7eo.isPlainText(content);
        if (!content.length || isPlainTextHtml) {
          plainTextMode = true;
        }
        if (plainTextMode) {
          if (hasContentType(clipboardContent, 'text/plain') && isPlainTextHtml) {
            content = clipboardContent['text/plain'];
          } else {
            content = $_7h8kq4hijcq8h7fg.innerText(content);
          }
        }
        if (pasteBin.isDefaultContent(content)) {
          if (!isKeyBoardPaste) {
            editor.windowManager.alert('Please use Ctrl+V/Cmd+V keyboard shortcuts to paste contents.');
          }
          return;
        }
        if (plainTextMode) {
          pasteText(content);
        } else {
          pasteHtml(content, internal);
        }
      }
      var getLastRng = function () {
        return pasteBin.getLastRng() || editor.selection.getRng();
      };
      editor.on('paste', function (e) {
        var clipboardTimer = new Date().getTime();
        var clipboardContent = getClipboardContent(e);
        var clipboardDelay = new Date().getTime() - clipboardTimer;
        var isKeyBoardPaste = new Date().getTime() - keyboardPasteTimeStamp - clipboardDelay < 1000;
        var plainTextMode = self.pasteFormat === 'text' || keyboardPastePlainTextState;
        var internal = hasContentType(clipboardContent, $_fm2tzkh8jcq8h7en.internalHtmlMime());
        keyboardPastePlainTextState = false;
        if (e.isDefaultPrevented() || isBrokenAndroidClipboardEvent(e)) {
          pasteBin.remove();
          return;
        }
        if (!hasHtmlOrText(clipboardContent) && pasteImageData(e, getLastRng())) {
          pasteBin.remove();
          return;
        }
        if (!isKeyBoardPaste) {
          e.preventDefault();
        }
        if (Env.ie && (!isKeyBoardPaste || e.ieFake) && !hasContentType(clipboardContent, 'text/html')) {
          pasteBin.create();
          editor.dom.bind(pasteBin.getEl(), 'paste', function (e) {
            e.stopPropagation();
          });
          editor.getDoc().execCommand('Paste', false, null);
          clipboardContent['text/html'] = pasteBin.getHtml();
        }
        if (hasContentType(clipboardContent, 'text/html')) {
          e.preventDefault();
          if (!internal) {
            internal = $_fm2tzkh8jcq8h7en.isMarked(clipboardContent['text/html']);
          }
          insertClipboardContent(clipboardContent, isKeyBoardPaste, plainTextMode, internal);
        } else {
          Delay.setEditorTimeout(editor, function () {
            insertClipboardContent(clipboardContent, isKeyBoardPaste, plainTextMode, internal);
          }, 0);
        }
      });
    }
    self.pasteHtml = pasteHtml;
    self.pasteText = pasteText;
    self.pasteImageData = pasteImageData;
    self.getDataTransferItems = getDataTransferItems;
    self.hasHtmlOrText = hasHtmlOrText;
    self.hasContentType = hasContentType;
    editor.on('preInit', function () {
      registerEventHandlers();
      var src;
      editor.parser.addNodeFilter('img', function (nodes, name, args) {
        function isPasteInsert(args) {
          return args.data && args.data.paste === true;
        }
        function remove(node) {
          if (!node.attr('data-mce-object') && src !== Env.transparentSrc) {
            node.remove();
          }
        }
        function isWebKitFakeUrl(src) {
          return src.indexOf('webkit-fake-url') === 0;
        }
        function isDataUri(src) {
          return src.indexOf('data:') === 0;
        }
        if (!editor.settings.paste_data_images && isPasteInsert(args)) {
          var i = nodes.length;
          while (i--) {
            src = nodes[i].attributes.map.src;
            if (!src) {
              continue;
            }
            if (isWebKitFakeUrl(src)) {
              remove(nodes[i]);
            } else if (!editor.settings.allow_html_data_urls && isDataUri(src)) {
              remove(nodes[i]);
            }
          }
        }
      });
    });
  };

  var noop = function () {
  };
  var hasWorkingClipboardApi = function (clipboardData) {
    return Env.iOS === false && clipboardData !== undefined && typeof clipboardData.setData === 'function' && $_7h8kq4hijcq8h7fg.isMsEdge() !== true;
  };
  var setHtml5Clipboard = function (clipboardData, html, text) {
    if (hasWorkingClipboardApi(clipboardData)) {
      try {
        clipboardData.clearData();
        clipboardData.setData('text/html', html);
        clipboardData.setData('text/plain', text);
        clipboardData.setData($_fm2tzkh8jcq8h7en.internalHtmlMime(), html);
        return true;
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  };
  var setClipboardData = function (evt, data, fallback, done) {
    if (setHtml5Clipboard(evt.clipboardData, data.html, data.text)) {
      evt.preventDefault();
      done();
    } else {
      fallback(data.html, done);
    }
  };
  var fallback = function (editor) {
    return function (html, done) {
      var markedHtml = $_fm2tzkh8jcq8h7en.mark(html);
      var outer = editor.dom.create('div', {
        'contenteditable': 'false',
        'data-mce-bogus': 'all'
      });
      var inner = editor.dom.create('div', { contenteditable: 'true' }, markedHtml);
      editor.dom.setStyles(outer, {
        position: 'fixed',
        left: '-3000px',
        width: '1000px',
        overflow: 'hidden'
      });
      outer.appendChild(inner);
      editor.dom.add(editor.getBody(), outer);
      var range = editor.selection.getRng();
      inner.focus();
      var offscreenRange = editor.dom.createRng();
      offscreenRange.selectNodeContents(inner);
      editor.selection.setRng(offscreenRange);
      setTimeout(function () {
        outer.parentNode.removeChild(outer);
        editor.selection.setRng(range);
        done();
      }, 0);
    };
  };
  var getData = function (editor) {
    return {
      html: editor.selection.getContent({ contextual: true }),
      text: editor.selection.getContent({ format: 'text' })
    };
  };
  var cut = function (editor) {
    return function (evt) {
      if (editor.selection.isCollapsed() === false) {
        setClipboardData(evt, getData(editor), fallback(editor), function () {
          setTimeout(function () {
            editor.execCommand('Delete');
          }, 0);
        });
      }
    };
  };
  var copy = function (editor) {
    return function (evt) {
      if (editor.selection.isCollapsed() === false) {
        setClipboardData(evt, getData(editor), fallback(editor), noop);
      }
    };
  };
  var register$1 = function (editor) {
    editor.on('cut', cut(editor));
    editor.on('copy', copy(editor));
  };
  var $_77f1lxhkjcq8h7fl = { register: register$1 };

  var RangeUtils = tinymce.util.Tools.resolve('tinymce.dom.RangeUtils');

  var getCaretRangeFromEvent = function (editor, e) {
    return RangeUtils.getCaretRangeFromPoint(e.clientX, e.clientY, editor.getDoc());
  };
  var isPlainTextFileUrl = function (content) {
    var plainTextContent = content['text/plain'];
    return plainTextContent ? plainTextContent.indexOf('file://') === 0 : false;
  };
  var setFocusedRange = function (editor, rng) {
    editor.focus();
    editor.selection.setRng(rng);
  };
  var setup = function (editor, clipboard, draggingInternallyState) {
    if ($_9orupch2jcq8h7eb.shouldBlockDrop(editor)) {
      editor.on('dragend dragover draggesture dragdrop drop drag', function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
    }
    if (!$_9orupch2jcq8h7eb.shouldPasteDataImages(editor)) {
      editor.on('drop', function (e) {
        var dataTransfer = e.dataTransfer;
        if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
          e.preventDefault();
        }
      });
    }
    editor.on('drop', function (e) {
      var dropContent, rng;
      rng = getCaretRangeFromEvent(editor, e);
      if (e.isDefaultPrevented() || draggingInternallyState.get()) {
        return;
      }
      dropContent = clipboard.getDataTransferItems(e.dataTransfer);
      var internal = clipboard.hasContentType(dropContent, $_fm2tzkh8jcq8h7en.internalHtmlMime());
      if ((!clipboard.hasHtmlOrText(dropContent) || isPlainTextFileUrl(dropContent)) && clipboard.pasteImageData(e, rng)) {
        return;
      }
      if (rng && $_9orupch2jcq8h7eb.shouldFilterDrop(editor)) {
        var content_1 = dropContent['mce-internal'] || dropContent['text/html'] || dropContent['text/plain'];
        if (content_1) {
          e.preventDefault();
          Delay.setEditorTimeout(editor, function () {
            editor.undoManager.transact(function () {
              if (dropContent['mce-internal']) {
                editor.execCommand('Delete');
              }
              setFocusedRange(editor, rng);
              content_1 = $_7h8kq4hijcq8h7fg.trimHtml(content_1);
              if (!dropContent['text/html']) {
                clipboard.pasteText(content_1);
              } else {
                clipboard.pasteHtml(content_1, internal);
              }
            });
          });
        }
      }
    });
    editor.on('dragstart', function (e) {
      draggingInternallyState.set(true);
    });
    editor.on('dragover dragend', function (e) {
      if ($_9orupch2jcq8h7eb.shouldPasteDataImages(editor) && draggingInternallyState.get() === false) {
        e.preventDefault();
        setFocusedRange(editor, getCaretRangeFromEvent(editor, e));
      }
      if (e.type === 'dragend') {
        draggingInternallyState.set(false);
      }
    });
  };
  var $_foj54rhljcq8h7fo = { setup: setup };

  var setup$1 = function (editor) {
    var plugin = editor.plugins.paste;
    var preProcess = $_9orupch2jcq8h7eb.getPreProcess(editor);
    if (preProcess) {
      editor.on('PastePreProcess', function (e) {
        preProcess.call(plugin, plugin, e);
      });
    }
    var postProcess = $_9orupch2jcq8h7eb.getPostProcess(editor);
    if (postProcess) {
      editor.on('PastePostProcess', function (e) {
        postProcess.call(plugin, plugin, e);
      });
    }
  };
  var $_a5fvvehnjcq8h7fr = { setup: setup$1 };

  function addPreProcessFilter(editor, filterFunc) {
    editor.on('PastePreProcess', function (e) {
      e.content = filterFunc(editor, e.content, e.internal, e.wordContent);
    });
  }
  function addPostProcessFilter(editor, filterFunc) {
    editor.on('PastePostProcess', function (e) {
      filterFunc(editor, e.node);
    });
  }
  function removeExplorerBrElementsAfterBlocks(editor, html) {
    if (!$_3qrfaqhdjcq8h7ez.isWordContent(html)) {
      return html;
    }
    var blockElements = [];
    Tools.each(editor.schema.getBlockElements(), function (block, blockName) {
      blockElements.push(blockName);
    });
    var explorerBlocksRegExp = new RegExp('(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*(<\\/?(' + blockElements.join('|') + ')[^>]*>)(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*', 'g');
    html = $_7h8kq4hijcq8h7fg.filter(html, [[
        explorerBlocksRegExp,
        '$1'
      ]]);
    html = $_7h8kq4hijcq8h7fg.filter(html, [
      [
        /<br><br>/g,
        '<BR><BR>'
      ],
      [
        /<br>/g,
        ' '
      ],
      [
        /<BR><BR>/g,
        '<br>'
      ]
    ]);
    return html;
  }
  function removeWebKitStyles(editor, content, internal, isWordHtml) {
    if (isWordHtml || internal) {
      return content;
    }
    var webKitStyles = $_9orupch2jcq8h7eb.getWebkitStyles(editor);
    if ($_9orupch2jcq8h7eb.shouldRemoveWebKitStyles(editor) === false || webKitStyles === 'all') {
      return content;
    }
    if (webKitStyles) {
      webKitStyles = webKitStyles.split(/[, ]/);
    }
    if (webKitStyles) {
      var dom_1 = editor.dom, node_1 = editor.selection.getNode();
      content = content.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi, function (all, before, value, after) {
        var inputStyles = dom_1.parseStyle(dom_1.decode(value), 'span');
        var outputStyles = {};
        if (webKitStyles === 'none') {
          return before + after;
        }
        for (var i = 0; i < webKitStyles.length; i++) {
          var inputValue = inputStyles[webKitStyles[i]], currentValue = dom_1.getStyle(node_1, webKitStyles[i], true);
          if (/color/.test(webKitStyles[i])) {
            inputValue = dom_1.toHex(inputValue);
            currentValue = dom_1.toHex(currentValue);
          }
          if (currentValue !== inputValue) {
            outputStyles[webKitStyles[i]] = inputValue;
          }
        }
        outputStyles = dom_1.serializeStyle(outputStyles, 'span');
        if (outputStyles) {
          return before + ' style="' + outputStyles + '"' + after;
        }
        return before + after;
      });
    } else {
      content = content.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi, '$1$3');
    }
    content = content.replace(/(<[^>]+) data-mce-style="([^"]+)"([^>]*>)/gi, function (all, before, value, after) {
      return before + ' style="' + value + '"' + after;
    });
    return content;
  }
  function removeUnderlineAndFontInAnchor(editor, root) {
    editor.$('a', root).find('font,u').each(function (i, node) {
      editor.dom.remove(node, true);
    });
  }
  var setup$2 = function (editor) {
    if (Env.webkit) {
      addPreProcessFilter(editor, removeWebKitStyles);
    }
    if (Env.ie) {
      addPreProcessFilter(editor, removeExplorerBrElementsAfterBlocks);
      addPostProcessFilter(editor, removeUnderlineAndFontInAnchor);
    }
  };
  var $_18mtashojcq8h7ft = { setup: setup$2 };

  var noop$1 = function () {
  };
  var noarg = function (f) {
    return function () {
      return f();
    };
  };
  var compose = function (fa, fb) {
    return function () {
      return fa(fb.apply(null, arguments));
    };
  };
  var constant = function (value) {
    return function () {
      return value;
    };
  };
  var identity = function (x) {
    return x;
  };
  var tripleEquals = function (a, b) {
    return a === b;
  };
  var curry = function (f) {
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var not = function (f) {
    return function () {
      return !f.apply(null, arguments);
    };
  };
  var die = function (msg) {
    return function () {
      throw new Error(msg);
    };
  };
  var apply = function (f) {
    return f();
  };
  var call = function (f) {
    f();
  };
  var never = constant(false);
  var always = constant(true);
  var $_fdroz0hqjcq8h7fy = {
    noop: noop$1,
    noarg: noarg,
    compose: compose,
    constant: constant,
    identity: identity,
    tripleEquals: tripleEquals,
    curry: curry,
    not: not,
    die: die,
    apply: apply,
    call: call,
    never: never,
    always: always
  };

  var stateChange = function (editor, clipboard, e) {
    var ctrl = e.control;
    ctrl.active(clipboard.pasteFormat === 'text');
    editor.on('PastePlainTextToggle', function (e) {
      ctrl.active(e.state);
    });
  };
  var register$2 = function (editor, clipboard) {
    var postRender = $_fdroz0hqjcq8h7fy.curry(stateChange, editor, clipboard);
    editor.addButton('pastetext', {
      active: false,
      icon: 'pastetext',
      tooltip: 'Paste as text',
      cmd: 'mceTogglePlainTextPaste',
      onPostRender: postRender
    });
    editor.addMenuItem('pastetext', {
      text: 'Paste as text',
      selectable: true,
      active: clipboard.pasteFormat,
      cmd: 'mceTogglePlainTextPaste',
      onPostRender: postRender
    });
  };
  var $_dnft54hpjcq8h7fw = { register: register$2 };

  var userIsInformedState = Cell(false);
  PluginManager.add('paste', function (editor) {
    if ($_c9r1regxjcq8h7e5.hasProPlugin(editor) === false) {
      var clipboard = new Clipboard(editor);
      var quirks = $_18mtashojcq8h7ft.setup(editor);
      var draggingInternallyState = Cell(false);
      $_dnft54hpjcq8h7fw.register(editor, clipboard);
      $_13sr5igzjcq8h7e6.register(editor, clipboard, userIsInformedState);
      $_a5fvvehnjcq8h7fr.setup(editor);
      $_77f1lxhkjcq8h7fl.register(editor);
      $_foj54rhljcq8h7fo.setup(editor, clipboard, draggingInternallyState);
      return $_9r5u22gyjcq8h7e6.get(clipboard, quirks);
    }
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()


/***/ }),

/***/ "./node_modules/tinymce/skins/lightgray/content.min.css":
/*!**************************************************************!*\
  !*** ./node_modules/tinymce/skins/lightgray/content.min.css ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/tinymce/skins/lightgray/skin.min.css":
/*!***********************************************************!*\
  !*** ./node_modules/tinymce/skins/lightgray/skin.min.css ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/tinymce/themes/modern/theme.js":
/*!*****************************************************!*\
  !*** ./node_modules/tinymce/themes/modern/theme.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

(function () {
var modern = (function () {
  'use strict';

  var ThemeManager = tinymce.util.Tools.resolve('tinymce.ThemeManager');

  var EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var isBrandingEnabled = function (editor) {
    return editor.getParam('branding', true, 'boolean');
  };
  var hasMenubar = function (editor) {
    return getMenubar(editor) !== false;
  };
  var getMenubar = function (editor) {
    return editor.getParam('menubar');
  };
  var hasStatusbar = function (editor) {
    return editor.getParam('statusbar', true, 'boolean');
  };
  var getToolbarSize = function (editor) {
    return editor.getParam('toolbar_items_size');
  };
  var isReadOnly = function (editor) {
    return editor.getParam('readonly', false, 'boolean');
  };
  var getFixedToolbarContainer = function (editor) {
    return editor.getParam('fixed_toolbar_container');
  };
  var getInlineToolbarPositionHandler = function (editor) {
    return editor.getParam('inline_toolbar_position_handler');
  };
  var getMenu = function (editor) {
    return editor.getParam('menu');
  };
  var getRemovedMenuItems = function (editor) {
    return editor.getParam('removed_menuitems', '');
  };
  var getMinWidth = function (editor) {
    return editor.getParam('min_width', 100, 'number');
  };
  var getMinHeight = function (editor) {
    return editor.getParam('min_height', 100, 'number');
  };
  var getMaxWidth = function (editor) {
    return editor.getParam('max_width', 65535, 'number');
  };
  var getMaxHeight = function (editor) {
    return editor.getParam('max_height', 65535, 'number');
  };
  var isSkinDisabled = function (editor) {
    return editor.settings.skin === false;
  };
  var isInline = function (editor) {
    return editor.getParam('inline', false, 'boolean');
  };
  var getResize = function (editor) {
    var resize = editor.getParam('resize', 'vertical');
    if (resize === false) {
      return 'none';
    } else if (resize === 'both') {
      return 'both';
    } else {
      return 'vertical';
    }
  };
  var getSkinUrl = function (editor) {
    var settings = editor.settings;
    var skin = settings.skin;
    var skinUrl = settings.skin_url;
    if (skin !== false) {
      var skinName = skin ? skin : 'lightgray';
      if (skinUrl) {
        skinUrl = editor.documentBaseURI.toAbsolute(skinUrl);
      } else {
        skinUrl = EditorManager.baseURL + '/skins/' + skinName;
      }
    }
    return skinUrl;
  };
  var getIndexedToolbars = function (settings, defaultToolbar) {
    var toolbars = [];
    for (var i = 1; i < 10; i++) {
      var toolbar_1 = settings['toolbar' + i];
      if (!toolbar_1) {
        break;
      }
      toolbars.push(toolbar_1);
    }
    var mainToolbar = settings.toolbar ? [settings.toolbar] : [defaultToolbar];
    return toolbars.length > 0 ? toolbars : mainToolbar;
  };
  var getToolbars = function (editor) {
    var toolbar = editor.getParam('toolbar');
    var defaultToolbar = 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image';
    if (toolbar === false) {
      return [];
    } else if (Tools.isArray(toolbar)) {
      return Tools.grep(toolbar, function (toolbar) {
        return toolbar.length > 0;
      });
    } else {
      return getIndexedToolbars(editor.settings, defaultToolbar);
    }
  };

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var Factory = tinymce.util.Tools.resolve('tinymce.ui.Factory');

  var I18n = tinymce.util.Tools.resolve('tinymce.util.I18n');

  var fireSkinLoaded = function (editor) {
    return editor.fire('SkinLoaded');
  };
  var fireResizeEditor = function (editor) {
    return editor.fire('ResizeEditor');
  };
  var fireBeforeRenderUI = function (editor) {
    return editor.fire('BeforeRenderUI');
  };
  var $_7bp6cis7jcq8h9by = {
    fireSkinLoaded: fireSkinLoaded,
    fireResizeEditor: fireResizeEditor,
    fireBeforeRenderUI: fireBeforeRenderUI
  };

  var focus = function (panel, type) {
    return function () {
      var item = panel.find(type)[0];
      if (item) {
        item.focus(true);
      }
    };
  };
  var addKeys = function (editor, panel) {
    editor.shortcuts.add('Alt+F9', '', focus(panel, 'menubar'));
    editor.shortcuts.add('Alt+F10,F10', '', focus(panel, 'toolbar'));
    editor.shortcuts.add('Alt+F11', '', focus(panel, 'elementpath'));
    panel.on('cancel', function () {
      editor.focus();
    });
  };
  var $_fbv7ubs8jcq8h9bz = { addKeys: addKeys };

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

  var Rect = tinymce.util.Tools.resolve('tinymce.geom.Rect');

  var Delay = tinymce.util.Tools.resolve('tinymce.util.Delay');

  var noop = function () {
  };
  var noarg = function (f) {
    return function () {
      return f();
    };
  };
  var compose = function (fa, fb) {
    return function () {
      return fa(fb.apply(null, arguments));
    };
  };
  var constant = function (value) {
    return function () {
      return value;
    };
  };
  var identity = function (x) {
    return x;
  };
  var tripleEquals = function (a, b) {
    return a === b;
  };
  var curry = function (f) {
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var not = function (f) {
    return function () {
      return !f.apply(null, arguments);
    };
  };
  var die = function (msg) {
    return function () {
      throw new Error(msg);
    };
  };
  var apply = function (f) {
    return f();
  };
  var call = function (f) {
    f();
  };
  var never$1 = constant(false);
  var always$1 = constant(true);
  var $_1amajisfjcq8h9cd = {
    noop: noop,
    noarg: noarg,
    compose: compose,
    constant: constant,
    identity: identity,
    tripleEquals: tripleEquals,
    curry: curry,
    not: not,
    die: die,
    apply: apply,
    call: call,
    never: never$1,
    always: always$1
  };

  var never = $_1amajisfjcq8h9cd.never;
  var always = $_1amajisfjcq8h9cd.always;
  var none = function () {
    return NONE;
  };
  var NONE = function () {
    var eq = function (o) {
      return o.isNone();
    };
    var call = function (thunk) {
      return thunk();
    };
    var id = function (n) {
      return n;
    };
    var noop = function () {
    };
    var me = {
      fold: function (n, s) {
        return n();
      },
      is: never,
      isSome: never,
      isNone: always,
      getOr: id,
      getOrThunk: call,
      getOrDie: function (msg) {
        throw new Error(msg || 'error: getOrDie called on none.');
      },
      or: id,
      orThunk: call,
      map: none,
      ap: none,
      each: noop,
      bind: none,
      flatten: none,
      exists: never,
      forall: always,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray: function () {
        return [];
      },
      toString: $_1amajisfjcq8h9cd.constant('none()')
    };
    if (Object.freeze)
      Object.freeze(me);
    return me;
  }();
  var some = function (a) {
    var constant_a = function () {
      return a;
    };
    var self = function () {
      return me;
    };
    var map = function (f) {
      return some(f(a));
    };
    var bind = function (f) {
      return f(a);
    };
    var me = {
      fold: function (n, s) {
        return s(a);
      },
      is: function (v) {
        return a === v;
      },
      isSome: always,
      isNone: never,
      getOr: constant_a,
      getOrThunk: constant_a,
      getOrDie: constant_a,
      or: self,
      orThunk: self,
      map: map,
      ap: function (optfab) {
        return optfab.fold(none, function (fab) {
          return some(fab(a));
        });
      },
      each: function (f) {
        f(a);
      },
      bind: bind,
      flatten: constant_a,
      exists: bind,
      forall: bind,
      filter: function (f) {
        return f(a) ? me : NONE;
      },
      equals: function (o) {
        return o.is(a);
      },
      equals_: function (o, elementEq) {
        return o.fold(never, function (b) {
          return elementEq(a, b);
        });
      },
      toArray: function () {
        return [a];
      },
      toString: function () {
        return 'some(' + a + ')';
      }
    };
    return me;
  };
  var from = function (value) {
    return value === null || value === undefined ? NONE : some(value);
  };
  var $_eol4yusejcq8h9cb = {
    some: some,
    none: none,
    from: from
  };

  var getUiContainerDelta = function () {
    var uiContainer = Env.container;
    if (uiContainer && DOMUtils.DOM.getStyle(uiContainer, 'position', true) !== 'static') {
      var containerPos = DOMUtils.DOM.getPos(uiContainer);
      var dx = uiContainer.scrollLeft - containerPos.x;
      var dy = uiContainer.scrollTop - containerPos.y;
      return $_eol4yusejcq8h9cb.some({
        x: dx,
        y: dy
      });
    } else {
      return $_eol4yusejcq8h9cb.none();
    }
  };
  var $_91p28usdjcq8h9c8 = { getUiContainerDelta: getUiContainerDelta };

  var createToolbar = function (editor, items, size) {
    var toolbarItems = [];
    var buttonGroup;
    if (!items) {
      return;
    }
    Tools.each(items.split(/[ ,]/), function (item) {
      var itemName;
      var bindSelectorChanged = function () {
        var selection = editor.selection;
        if (item.settings.stateSelector) {
          selection.selectorChanged(item.settings.stateSelector, function (state) {
            item.active(state);
          }, true);
        }
        if (item.settings.disabledStateSelector) {
          selection.selectorChanged(item.settings.disabledStateSelector, function (state) {
            item.disabled(state);
          });
        }
      };
      if (item === '|') {
        buttonGroup = null;
      } else {
        if (!buttonGroup) {
          buttonGroup = {
            type: 'buttongroup',
            items: []
          };
          toolbarItems.push(buttonGroup);
        }
        if (editor.buttons[item]) {
          itemName = item;
          item = editor.buttons[itemName];
          if (typeof item === 'function') {
            item = item();
          }
          item.type = item.type || 'button';
          item.size = size;
          item = Factory.create(item);
          buttonGroup.items.push(item);
          if (editor.initialized) {
            bindSelectorChanged();
          } else {
            editor.on('init', bindSelectorChanged);
          }
        }
      }
    });
    return {
      type: 'toolbar',
      layout: 'flow',
      items: toolbarItems
    };
  };
  var createToolbars = function (editor, size) {
    var toolbars = [];
    var addToolbar = function (items) {
      if (items) {
        toolbars.push(createToolbar(editor, items, size));
      }
    };
    Tools.each(getToolbars(editor), function (toolbar) {
      addToolbar(toolbar);
    });
    if (toolbars.length) {
      return {
        type: 'panel',
        layout: 'stack',
        classes: 'toolbar-grp',
        ariaRoot: true,
        ariaRemember: true,
        items: toolbars
      };
    }
  };
  var $_chv6mlsgjcq8h9ch = {
    createToolbar: createToolbar,
    createToolbars: createToolbars
  };

  var DOM$1 = DOMUtils.DOM;
  var toClientRect = function (geomRect) {
    return {
      left: geomRect.x,
      top: geomRect.y,
      width: geomRect.w,
      height: geomRect.h,
      right: geomRect.x + geomRect.w,
      bottom: geomRect.y + geomRect.h
    };
  };
  var hideAllFloatingPanels = function (editor) {
    Tools.each(editor.contextToolbars, function (toolbar) {
      if (toolbar.panel) {
        toolbar.panel.hide();
      }
    });
  };
  var movePanelTo = function (panel, pos) {
    panel.moveTo(pos.left, pos.top);
  };
  var togglePositionClass = function (panel, relPos, predicate) {
    relPos = relPos ? relPos.substr(0, 2) : '';
    Tools.each({
      t: 'down',
      b: 'up'
    }, function (cls, pos) {
      panel.classes.toggle('arrow-' + cls, predicate(pos, relPos.substr(0, 1)));
    });
    Tools.each({
      l: 'left',
      r: 'right'
    }, function (cls, pos) {
      panel.classes.toggle('arrow-' + cls, predicate(pos, relPos.substr(1, 1)));
    });
  };
  var userConstrain = function (handler, x, y, elementRect, contentAreaRect, panelRect) {
    panelRect = toClientRect({
      x: x,
      y: y,
      w: panelRect.w,
      h: panelRect.h
    });
    if (handler) {
      panelRect = handler({
        elementRect: toClientRect(elementRect),
        contentAreaRect: toClientRect(contentAreaRect),
        panelRect: panelRect
      });
    }
    return panelRect;
  };
  var addContextualToolbars = function (editor) {
    var scrollContainer;
    var getContextToolbars = function () {
      return editor.contextToolbars || [];
    };
    var getElementRect = function (elm) {
      var pos, targetRect, root;
      pos = DOM$1.getPos(editor.getContentAreaContainer());
      targetRect = editor.dom.getRect(elm);
      root = editor.dom.getRoot();
      if (root.nodeName === 'BODY') {
        targetRect.x -= root.ownerDocument.documentElement.scrollLeft || root.scrollLeft;
        targetRect.y -= root.ownerDocument.documentElement.scrollTop || root.scrollTop;
      }
      targetRect.x += pos.x;
      targetRect.y += pos.y;
      return targetRect;
    };
    var reposition = function (match, shouldShow) {
      var relPos, panelRect, elementRect, contentAreaRect, panel, relRect, testPositions, smallElementWidthThreshold;
      var handler = getInlineToolbarPositionHandler(editor);
      if (editor.removed) {
        return;
      }
      if (!match || !match.toolbar.panel) {
        hideAllFloatingPanels(editor);
        return;
      }
      testPositions = [
        'bc-tc',
        'tc-bc',
        'tl-bl',
        'bl-tl',
        'tr-br',
        'br-tr'
      ];
      panel = match.toolbar.panel;
      if (shouldShow) {
        panel.show();
      }
      elementRect = getElementRect(match.element);
      panelRect = DOM$1.getRect(panel.getEl());
      contentAreaRect = DOM$1.getRect(editor.getContentAreaContainer() || editor.getBody());
      var delta = $_91p28usdjcq8h9c8.getUiContainerDelta().getOr({
        x: 0,
        y: 0
      });
      elementRect.x += delta.x;
      elementRect.y += delta.y;
      panelRect.x += delta.x;
      panelRect.y += delta.y;
      contentAreaRect.x += delta.x;
      contentAreaRect.y += delta.y;
      smallElementWidthThreshold = 25;
      if (DOM$1.getStyle(match.element, 'display', true) !== 'inline') {
        var clientRect = match.element.getBoundingClientRect();
        elementRect.w = clientRect.width;
        elementRect.h = clientRect.height;
      }
      if (!editor.inline) {
        contentAreaRect.w = editor.getDoc().documentElement.offsetWidth;
      }
      if (editor.selection.controlSelection.isResizable(match.element) && elementRect.w < smallElementWidthThreshold) {
        elementRect = Rect.inflate(elementRect, 0, 8);
      }
      relPos = Rect.findBestRelativePosition(panelRect, elementRect, contentAreaRect, testPositions);
      elementRect = Rect.clamp(elementRect, contentAreaRect);
      if (relPos) {
        relRect = Rect.relativePosition(panelRect, elementRect, relPos);
        movePanelTo(panel, userConstrain(handler, relRect.x, relRect.y, elementRect, contentAreaRect, panelRect));
      } else {
        contentAreaRect.h += panelRect.h;
        elementRect = Rect.intersect(contentAreaRect, elementRect);
        if (elementRect) {
          relPos = Rect.findBestRelativePosition(panelRect, elementRect, contentAreaRect, [
            'bc-tc',
            'bl-tl',
            'br-tr'
          ]);
          if (relPos) {
            relRect = Rect.relativePosition(panelRect, elementRect, relPos);
            movePanelTo(panel, userConstrain(handler, relRect.x, relRect.y, elementRect, contentAreaRect, panelRect));
          } else {
            movePanelTo(panel, userConstrain(handler, elementRect.x, elementRect.y, elementRect, contentAreaRect, panelRect));
          }
        } else {
          panel.hide();
        }
      }
      togglePositionClass(panel, relPos, function (pos1, pos2) {
        return pos1 === pos2;
      });
    };
    var repositionHandler = function (show) {
      return function () {
        var execute = function () {
          if (editor.selection) {
            reposition(findFrontMostMatch(editor.selection.getNode()), show);
          }
        };
        Delay.requestAnimationFrame(execute);
      };
    };
    var bindScrollEvent = function () {
      if (!scrollContainer) {
        var reposition_1 = repositionHandler(true);
        scrollContainer = editor.selection.getScrollContainer() || editor.getWin();
        DOM$1.bind(scrollContainer, 'scroll', reposition_1);
        DOM$1.bind(Env.container, 'scroll', reposition_1);
        editor.on('remove', function () {
          DOM$1.unbind(scrollContainer, 'scroll', reposition_1);
          DOM$1.unbind(Env.container, 'scroll', reposition_1);
        });
      }
    };
    var showContextToolbar = function (match) {
      var panel;
      if (match.toolbar.panel) {
        match.toolbar.panel.show();
        reposition(match);
        return;
      }
      bindScrollEvent();
      panel = Factory.create({
        type: 'floatpanel',
        role: 'dialog',
        classes: 'tinymce tinymce-inline arrow',
        ariaLabel: 'Inline toolbar',
        layout: 'flex',
        direction: 'column',
        align: 'stretch',
        autohide: false,
        autofix: true,
        fixed: true,
        border: 1,
        items: $_chv6mlsgjcq8h9ch.createToolbar(editor, match.toolbar.items),
        oncancel: function () {
          editor.focus();
        }
      });
      match.toolbar.panel = panel;
      panel.renderTo().reflow();
      reposition(match);
    };
    var hideAllContextToolbars = function () {
      Tools.each(getContextToolbars(), function (toolbar) {
        if (toolbar.panel) {
          toolbar.panel.hide();
        }
      });
    };
    var findFrontMostMatch = function (targetElm) {
      var i, y, parentsAndSelf;
      var toolbars = getContextToolbars();
      parentsAndSelf = editor.$(targetElm).parents().add(targetElm);
      for (i = parentsAndSelf.length - 1; i >= 0; i--) {
        for (y = toolbars.length - 1; y >= 0; y--) {
          if (toolbars[y].predicate(parentsAndSelf[i])) {
            return {
              toolbar: toolbars[y],
              element: parentsAndSelf[i]
            };
          }
        }
      }
      return null;
    };
    editor.on('click keyup setContent ObjectResized', function (e) {
      if (e.type === 'setcontent' && !e.selection) {
        return;
      }
      Delay.setEditorTimeout(editor, function () {
        var match;
        match = findFrontMostMatch(editor.selection.getNode());
        if (match) {
          hideAllContextToolbars();
          showContextToolbar(match);
        } else {
          hideAllContextToolbars();
        }
      });
    });
    editor.on('blur hide contextmenu', hideAllContextToolbars);
    editor.on('ObjectResizeStart', function () {
      var match = findFrontMostMatch(editor.selection.getNode());
      if (match && match.toolbar.panel) {
        match.toolbar.panel.hide();
      }
    });
    editor.on('ResizeEditor ResizeWindow', repositionHandler(true));
    editor.on('nodeChange', repositionHandler(false));
    editor.on('remove', function () {
      Tools.each(getContextToolbars(), function (toolbar) {
        if (toolbar.panel) {
          toolbar.panel.remove();
        }
      });
      editor.contextToolbars = {};
    });
    editor.shortcuts.add('ctrl+shift+e > ctrl+shift+p', '', function () {
      var match = findFrontMostMatch(editor.selection.getNode());
      if (match && match.toolbar.panel) {
        match.toolbar.panel.items()[0].focus();
      }
    });
  };
  var $_4su53as9jcq8h9c1 = { addContextualToolbars: addContextualToolbars };

  var rawIndexOf = function () {
    var pIndexOf = Array.prototype.indexOf;
    var fastIndex = function (xs, x) {
      return pIndexOf.call(xs, x);
    };
    var slowIndex = function (xs, x) {
      return slowIndexOf(xs, x);
    };
    return pIndexOf === undefined ? slowIndex : fastIndex;
  }();
  var indexOf = function (xs, x) {
    var r = rawIndexOf(xs, x);
    return r === -1 ? $_eol4yusejcq8h9cb.none() : $_eol4yusejcq8h9cb.some(r);
  };
  var contains = function (xs, x) {
    return rawIndexOf(xs, x) > -1;
  };
  var exists = function (xs, pred) {
    return findIndex(xs, pred).isSome();
  };
  var range = function (num, f) {
    var r = [];
    for (var i = 0; i < num; i++) {
      r.push(f(i));
    }
    return r;
  };
  var chunk = function (array, size) {
    var r = [];
    for (var i = 0; i < array.length; i += size) {
      var s = array.slice(i, i + size);
      r.push(s);
    }
    return r;
  };
  var map = function (xs, f) {
    var len = xs.length;
    var r = new Array(len);
    for (var i = 0; i < len; i++) {
      var x = xs[i];
      r[i] = f(x, i, xs);
    }
    return r;
  };
  var each = function (xs, f) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var eachr = function (xs, f) {
    for (var i = xs.length - 1; i >= 0; i--) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var partition = function (xs, pred) {
    var pass = [];
    var fail = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      var arr = pred(x, i, xs) ? pass : fail;
      arr.push(x);
    }
    return {
      pass: pass,
      fail: fail
    };
  };
  var filter = function (xs, pred) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        r.push(x);
      }
    }
    return r;
  };
  var groupBy = function (xs, f) {
    if (xs.length === 0) {
      return [];
    } else {
      var wasType = f(xs[0]);
      var r = [];
      var group = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        var type = f(x);
        if (type !== wasType) {
          r.push(group);
          group = [];
        }
        wasType = type;
        group.push(x);
      }
      if (group.length !== 0) {
        r.push(group);
      }
      return r;
    }
  };
  var foldr = function (xs, f, acc) {
    eachr(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var foldl = function (xs, f, acc) {
    each(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var find = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return $_eol4yusejcq8h9cb.some(x);
      }
    }
    return $_eol4yusejcq8h9cb.none();
  };
  var findIndex = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return $_eol4yusejcq8h9cb.some(i);
      }
    }
    return $_eol4yusejcq8h9cb.none();
  };
  var slowIndexOf = function (xs, x) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (xs[i] === x) {
        return i;
      }
    }
    return -1;
  };
  var push = Array.prototype.push;
  var flatten = function (xs) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (!Array.prototype.isPrototypeOf(xs[i]))
        throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
      push.apply(r, xs[i]);
    }
    return r;
  };
  var bind = function (xs, f) {
    var output = map(xs, f);
    return flatten(output);
  };
  var forall = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      var x = xs[i];
      if (pred(x, i, xs) !== true) {
        return false;
      }
    }
    return true;
  };
  var equal = function (a1, a2) {
    return a1.length === a2.length && forall(a1, function (x, i) {
      return x === a2[i];
    });
  };
  var slice = Array.prototype.slice;
  var reverse = function (xs) {
    var r = slice.call(xs, 0);
    r.reverse();
    return r;
  };
  var difference = function (a1, a2) {
    return filter(a1, function (x) {
      return !contains(a2, x);
    });
  };
  var mapToObject = function (xs, f) {
    var r = {};
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      r[String(x)] = f(x, i);
    }
    return r;
  };
  var pure = function (x) {
    return [x];
  };
  var sort = function (xs, comparator) {
    var copy = slice.call(xs, 0);
    copy.sort(comparator);
    return copy;
  };
  var head = function (xs) {
    return xs.length === 0 ? $_eol4yusejcq8h9cb.none() : $_eol4yusejcq8h9cb.some(xs[0]);
  };
  var last = function (xs) {
    return xs.length === 0 ? $_eol4yusejcq8h9cb.none() : $_eol4yusejcq8h9cb.some(xs[xs.length - 1]);
  };
  var $_flnht0sijcq8h9cx = {
    map: map,
    each: each,
    eachr: eachr,
    partition: partition,
    filter: filter,
    groupBy: groupBy,
    indexOf: indexOf,
    foldr: foldr,
    foldl: foldl,
    find: find,
    findIndex: findIndex,
    flatten: flatten,
    bind: bind,
    forall: forall,
    exists: exists,
    contains: contains,
    equal: equal,
    reverse: reverse,
    chunk: chunk,
    difference: difference,
    mapToObject: mapToObject,
    pure: pure,
    sort: sort,
    range: range,
    head: head,
    last: last
  };

  var defaultMenus = {
    file: {
      title: 'File',
      items: 'newdocument restoredraft | preview | print'
    },
    edit: {
      title: 'Edit',
      items: 'undo redo | cut copy paste pastetext | selectall'
    },
    view: {
      title: 'View',
      items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen'
    },
    insert: {
      title: 'Insert',
      items: 'image link media template codesample inserttable | charmap hr | pagebreak nonbreaking anchor toc | insertdatetime'
    },
    format: {
      title: 'Format',
      items: 'bold italic underline strikethrough superscript subscript codeformat | blockformats align | removeformat'
    },
    tools: {
      title: 'Tools',
      items: 'spellchecker spellcheckerlanguage | a11ycheck'
    },
    table: { title: 'Table' },
    help: { title: 'Help' }
  };
  var delimiterMenuNamePair = function () {
    return {
      name: '|',
      item: { text: '|' }
    };
  };
  var createMenuNameItemPair = function (name, item) {
    var menuItem = item ? {
      name: name,
      item: item
    } : null;
    return name === '|' ? delimiterMenuNamePair() : menuItem;
  };
  var hasItemName = function (namedMenuItems, name) {
    return $_flnht0sijcq8h9cx.findIndex(namedMenuItems, function (namedMenuItem) {
      return namedMenuItem.name === name;
    }).isSome();
  };
  var isSeparator = function (namedMenuItem) {
    return namedMenuItem && namedMenuItem.item.text === '|';
  };
  var cleanupMenu = function (namedMenuItems, removedMenuItems) {
    var menuItemsPass1 = $_flnht0sijcq8h9cx.filter(namedMenuItems, function (namedMenuItem) {
      return removedMenuItems.hasOwnProperty(namedMenuItem.name) === false;
    });
    var menuItemsPass2 = $_flnht0sijcq8h9cx.filter(menuItemsPass1, function (namedMenuItem, i, namedMenuItems) {
      return !isSeparator(namedMenuItem) || !isSeparator(namedMenuItems[i - 1]);
    });
    return $_flnht0sijcq8h9cx.filter(menuItemsPass2, function (namedMenuItem, i, namedMenuItems) {
      return !isSeparator(namedMenuItem) || i > 0 && i < namedMenuItems.length - 1;
    });
  };
  var createMenu = function (editorMenuItems, menus, removedMenuItems, context) {
    var menuButton, menu, namedMenuItems, isUserDefined;
    if (menus) {
      menu = menus[context];
      isUserDefined = true;
    } else {
      menu = defaultMenus[context];
    }
    if (menu) {
      menuButton = { text: menu.title };
      namedMenuItems = [];
      Tools.each((menu.items || '').split(/[ ,]/), function (name) {
        var namedMenuItem = createMenuNameItemPair(name, editorMenuItems[name]);
        if (namedMenuItem) {
          namedMenuItems.push(namedMenuItem);
        }
      });
      if (!isUserDefined) {
        Tools.each(editorMenuItems, function (item, name) {
          if (item.context === context && !hasItemName(namedMenuItems, name)) {
            if (item.separator === 'before') {
              namedMenuItems.push(delimiterMenuNamePair());
            }
            if (item.prependToContext) {
              namedMenuItems.unshift(createMenuNameItemPair(name, item));
            } else {
              namedMenuItems.push(createMenuNameItemPair(name, item));
            }
            if (item.separator === 'after') {
              namedMenuItems.push(delimiterMenuNamePair());
            }
          }
        });
      }
      menuButton.menu = $_flnht0sijcq8h9cx.map(cleanupMenu(namedMenuItems, removedMenuItems), function (menuItem) {
        return menuItem.item;
      });
      if (!menuButton.menu.length) {
        return null;
      }
    }
    return menuButton;
  };
  var getDefaultMenubar = function (editor) {
    var name;
    var defaultMenuBar = [];
    var menu = getMenu(editor);
    if (menu) {
      for (name in menu) {
        defaultMenuBar.push(name);
      }
    } else {
      for (name in defaultMenus) {
        defaultMenuBar.push(name);
      }
    }
    return defaultMenuBar;
  };
  var createMenuButtons = function (editor) {
    var menuButtons = [];
    var defaultMenuBar = getDefaultMenubar(editor);
    var removedMenuItems = Tools.makeMap(getRemovedMenuItems(editor).split(/[ ,]/));
    var menubar = getMenubar(editor);
    var enabledMenuNames = typeof menubar === 'string' ? menubar.split(/[ ,]/) : defaultMenuBar;
    for (var i = 0; i < enabledMenuNames.length; i++) {
      var menuItems = enabledMenuNames[i];
      var menu = createMenu(editor.menuItems, getMenu(editor), removedMenuItems, menuItems);
      if (menu) {
        menuButtons.push(menu);
      }
    }
    return menuButtons;
  };
  var $_1q58jdshjcq8h9cl = { createMenuButtons: createMenuButtons };

  var DOM$2 = DOMUtils.DOM;
  var getSize = function (elm) {
    return {
      width: elm.clientWidth,
      height: elm.clientHeight
    };
  };
  var resizeTo = function (editor, width, height) {
    var containerElm, iframeElm, containerSize, iframeSize;
    containerElm = editor.getContainer();
    iframeElm = editor.getContentAreaContainer().firstChild;
    containerSize = getSize(containerElm);
    iframeSize = getSize(iframeElm);
    if (width !== null) {
      width = Math.max(getMinWidth(editor), width);
      width = Math.min(getMaxWidth(editor), width);
      DOM$2.setStyle(containerElm, 'width', width + (containerSize.width - iframeSize.width));
      DOM$2.setStyle(iframeElm, 'width', width);
    }
    height = Math.max(getMinHeight(editor), height);
    height = Math.min(getMaxHeight(editor), height);
    DOM$2.setStyle(iframeElm, 'height', height);
    $_7bp6cis7jcq8h9by.fireResizeEditor(editor);
  };
  var resizeBy = function (editor, dw, dh) {
    var elm = editor.getContentAreaContainer();
    resizeTo(editor, elm.clientWidth + dw, elm.clientHeight + dh);
  };
  var $_50isi6sjjcq8h9d2 = {
    resizeTo: resizeTo,
    resizeBy: resizeBy
  };

  var api = function (elm) {
    return {
      element: function () {
        return elm;
      }
    };
  };
  var trigger = function (sidebar, panel, callbackName) {
    var callback = sidebar.settings[callbackName];
    if (callback) {
      callback(api(panel.getEl('body')));
    }
  };
  var hidePanels = function (name, container, sidebars) {
    Tools.each(sidebars, function (sidebar) {
      var panel = container.items().filter('#' + sidebar.name)[0];
      if (panel && panel.visible() && sidebar.name !== name) {
        trigger(sidebar, panel, 'onhide');
        panel.visible(false);
      }
    });
  };
  var deactivateButtons = function (toolbar) {
    toolbar.items().each(function (ctrl) {
      ctrl.active(false);
    });
  };
  var findSidebar = function (sidebars, name) {
    return Tools.grep(sidebars, function (sidebar) {
      return sidebar.name === name;
    })[0];
  };
  var showPanel = function (editor, name, sidebars) {
    return function (e) {
      var btnCtrl = e.control;
      var container = btnCtrl.parents().filter('panel')[0];
      var panel = container.find('#' + name)[0];
      var sidebar = findSidebar(sidebars, name);
      hidePanels(name, container, sidebars);
      deactivateButtons(btnCtrl.parent());
      if (panel && panel.visible()) {
        trigger(sidebar, panel, 'onhide');
        panel.hide();
        btnCtrl.active(false);
      } else {
        if (panel) {
          panel.show();
          trigger(sidebar, panel, 'onshow');
        } else {
          panel = Factory.create({
            type: 'container',
            name: name,
            layout: 'stack',
            classes: 'sidebar-panel',
            html: ''
          });
          container.prepend(panel);
          trigger(sidebar, panel, 'onrender');
          trigger(sidebar, panel, 'onshow');
        }
        btnCtrl.active(true);
      }
      $_7bp6cis7jcq8h9by.fireResizeEditor(editor);
    };
  };
  var isModernBrowser = function () {
    return !Env.ie || Env.ie >= 11;
  };
  var hasSidebar = function (editor) {
    return isModernBrowser() && editor.sidebars ? editor.sidebars.length > 0 : false;
  };
  var createSidebar = function (editor) {
    var buttons = Tools.map(editor.sidebars, function (sidebar) {
      var settings = sidebar.settings;
      return {
        type: 'button',
        icon: settings.icon,
        image: settings.image,
        tooltip: settings.tooltip,
        onclick: showPanel(editor, sidebar.name, editor.sidebars)
      };
    });
    return {
      type: 'panel',
      name: 'sidebar',
      layout: 'stack',
      classes: 'sidebar',
      items: [{
          type: 'toolbar',
          layout: 'stack',
          classes: 'sidebar-toolbar',
          items: buttons
        }]
    };
  };
  var $_60ls3sskjcq8h9d4 = {
    hasSidebar: hasSidebar,
    createSidebar: createSidebar
  };

  var fireSkinLoaded$1 = function (editor) {
    var done = function () {
      editor._skinLoaded = true;
      $_7bp6cis7jcq8h9by.fireSkinLoaded(editor);
    };
    return function () {
      if (editor.initialized) {
        done();
      } else {
        editor.on('init', done);
      }
    };
  };
  var $_awx04msljcq8h9d7 = { fireSkinLoaded: fireSkinLoaded$1 };

  var DOM = DOMUtils.DOM;
  var switchMode = function (panel) {
    return function (e) {
      panel.find('*').disabled(e.mode === 'readonly');
    };
  };
  var editArea = function (border) {
    return {
      type: 'panel',
      name: 'iframe',
      layout: 'stack',
      classes: 'edit-area',
      border: border,
      html: ''
    };
  };
  var editAreaContainer = function (editor) {
    return {
      type: 'panel',
      layout: 'stack',
      classes: 'edit-aria-container',
      border: '1 0 0 0',
      items: [
        editArea('0'),
        $_60ls3sskjcq8h9d4.createSidebar(editor)
      ]
    };
  };
  var render = function (editor, theme, args) {
    var panel, resizeHandleCtrl, startSize;
    if (isSkinDisabled(editor) === false && args.skinUiCss) {
      DOM.styleSheetLoader.load(args.skinUiCss, $_awx04msljcq8h9d7.fireSkinLoaded(editor));
    } else {
      $_awx04msljcq8h9d7.fireSkinLoaded(editor)();
    }
    panel = theme.panel = Factory.create({
      type: 'panel',
      role: 'application',
      classes: 'tinymce',
      style: 'visibility: hidden',
      layout: 'stack',
      border: 1,
      items: [
        {
          type: 'container',
          classes: 'top-part',
          items: [
            hasMenubar(editor) === false ? null : {
              type: 'menubar',
              border: '0 0 1 0',
              items: $_1q58jdshjcq8h9cl.createMenuButtons(editor)
            },
            $_chv6mlsgjcq8h9ch.createToolbars(editor, getToolbarSize(editor))
          ]
        },
        $_60ls3sskjcq8h9d4.hasSidebar(editor) ? editAreaContainer(editor) : editArea('1 0 0 0')
      ]
    });
    if (getResize(editor) !== 'none') {
      resizeHandleCtrl = {
        type: 'resizehandle',
        direction: getResize(editor),
        onResizeStart: function () {
          var elm = editor.getContentAreaContainer().firstChild;
          startSize = {
            width: elm.clientWidth,
            height: elm.clientHeight
          };
        },
        onResize: function (e) {
          if (getResize(editor) === 'both') {
            $_50isi6sjjcq8h9d2.resizeTo(editor, startSize.width + e.deltaX, startSize.height + e.deltaY);
          } else {
            $_50isi6sjjcq8h9d2.resizeTo(editor, null, startSize.height + e.deltaY);
          }
        }
      };
    }
    if (hasStatusbar(editor)) {
      var linkHtml = '<a href="https://www.tinymce.com/?utm_campaign=editor_referral&utm_medium=poweredby&utm_source=tinymce" rel="noopener" target="_blank" role="presentation" tabindex="-1">tinymce</a>';
      var html = I18n.translate([
        'Powered by {0}',
        linkHtml
      ]);
      var brandingLabel = isBrandingEnabled(editor) ? {
        type: 'label',
        classes: 'branding',
        html: ' ' + html
      } : null;
      panel.add({
        type: 'panel',
        name: 'statusbar',
        classes: 'statusbar',
        layout: 'flow',
        border: '1 0 0 0',
        ariaRoot: true,
        items: [
          {
            type: 'elementpath',
            editor: editor
          },
          resizeHandleCtrl,
          brandingLabel
        ]
      });
    }
    $_7bp6cis7jcq8h9by.fireBeforeRenderUI(editor);
    editor.on('SwitchMode', switchMode(panel));
    panel.renderBefore(args.targetNode).reflow();
    if (isReadOnly(editor)) {
      editor.setMode('readonly');
    }
    if (args.width) {
      DOM.setStyle(panel.getEl(), 'width', args.width);
    }
    editor.on('remove', function () {
      panel.remove();
      panel = null;
    });
    $_fbv7ubs8jcq8h9bz.addKeys(editor, panel);
    $_4su53as9jcq8h9c1.addContextualToolbars(editor);
    return {
      iframeContainer: panel.find('#iframe')[0].getEl(),
      editorContainer: panel.getEl()
    };
  };
  var $_djafeys3jcq8h9bu = { render: render };

  var $ = tinymce.util.Tools.resolve('tinymce.dom.DomQuery');

  var count = 0;
  var funcs = {
    id: function () {
      return 'mceu_' + count++;
    },
    create: function (name, attrs, children) {
      var elm = document.createElement(name);
      DOMUtils.DOM.setAttribs(elm, attrs);
      if (typeof children === 'string') {
        elm.innerHTML = children;
      } else {
        Tools.each(children, function (child) {
          if (child.nodeType) {
            elm.appendChild(child);
          }
        });
      }
      return elm;
    },
    createFragment: function (html) {
      return DOMUtils.DOM.createFragment(html);
    },
    getWindowSize: function () {
      return DOMUtils.DOM.getViewPort();
    },
    getSize: function (elm) {
      var width, height;
      if (elm.getBoundingClientRect) {
        var rect = elm.getBoundingClientRect();
        width = Math.max(rect.width || rect.right - rect.left, elm.offsetWidth);
        height = Math.max(rect.height || rect.bottom - rect.bottom, elm.offsetHeight);
      } else {
        width = elm.offsetWidth;
        height = elm.offsetHeight;
      }
      return {
        width: width,
        height: height
      };
    },
    getPos: function (elm, root) {
      return DOMUtils.DOM.getPos(elm, root || funcs.getContainer());
    },
    getContainer: function () {
      return Env.container ? Env.container : document.body;
    },
    getViewPort: function (win) {
      return DOMUtils.DOM.getViewPort(win);
    },
    get: function (id) {
      return document.getElementById(id);
    },
    addClass: function (elm, cls) {
      return DOMUtils.DOM.addClass(elm, cls);
    },
    removeClass: function (elm, cls) {
      return DOMUtils.DOM.removeClass(elm, cls);
    },
    hasClass: function (elm, cls) {
      return DOMUtils.DOM.hasClass(elm, cls);
    },
    toggleClass: function (elm, cls, state) {
      return DOMUtils.DOM.toggleClass(elm, cls, state);
    },
    css: function (elm, name, value) {
      return DOMUtils.DOM.setStyle(elm, name, value);
    },
    getRuntimeStyle: function (elm, name) {
      return DOMUtils.DOM.getStyle(elm, name, true);
    },
    on: function (target, name, callback, scope) {
      return DOMUtils.DOM.bind(target, name, callback, scope);
    },
    off: function (target, name, callback) {
      return DOMUtils.DOM.unbind(target, name, callback);
    },
    fire: function (target, name, args) {
      return DOMUtils.DOM.fire(target, name, args);
    },
    innerHtml: function (elm, html) {
      DOMUtils.DOM.setHTML(elm, html);
    }
  };

  function calculateRelativePosition(ctrl, targetElm, rel) {
    var ctrlElm, pos, x, y, selfW, selfH, targetW, targetH, viewport, size;
    viewport = funcs.getViewPort();
    pos = funcs.getPos(targetElm);
    x = pos.x;
    y = pos.y;
    if (ctrl.state.get('fixed') && funcs.getRuntimeStyle(document.body, 'position') === 'static') {
      x -= viewport.x;
      y -= viewport.y;
    }
    ctrlElm = ctrl.getEl();
    size = funcs.getSize(ctrlElm);
    selfW = size.width;
    selfH = size.height;
    size = funcs.getSize(targetElm);
    targetW = size.width;
    targetH = size.height;
    rel = (rel || '').split('');
    if (rel[0] === 'b') {
      y += targetH;
    }
    if (rel[1] === 'r') {
      x += targetW;
    }
    if (rel[0] === 'c') {
      y += Math.round(targetH / 2);
    }
    if (rel[1] === 'c') {
      x += Math.round(targetW / 2);
    }
    if (rel[3] === 'b') {
      y -= selfH;
    }
    if (rel[4] === 'r') {
      x -= selfW;
    }
    if (rel[3] === 'c') {
      y -= Math.round(selfH / 2);
    }
    if (rel[4] === 'c') {
      x -= Math.round(selfW / 2);
    }
    return {
      x: x,
      y: y,
      w: selfW,
      h: selfH
    };
  }
  var $_dvdzmdsqjcq8h9dn = {
    testMoveRel: function (elm, rels) {
      var viewPortRect = funcs.getViewPort();
      for (var i = 0; i < rels.length; i++) {
        var pos = calculateRelativePosition(this, elm, rels[i]);
        if (this.state.get('fixed')) {
          if (pos.x > 0 && pos.x + pos.w < viewPortRect.w && pos.y > 0 && pos.y + pos.h < viewPortRect.h) {
            return rels[i];
          }
        } else {
          if (pos.x > viewPortRect.x && pos.x + pos.w < viewPortRect.w + viewPortRect.x && pos.y > viewPortRect.y && pos.y + pos.h < viewPortRect.h + viewPortRect.y) {
            return rels[i];
          }
        }
      }
      return rels[0];
    },
    moveRel: function (elm, rel) {
      if (typeof rel !== 'string') {
        rel = this.testMoveRel(elm, rel);
      }
      var pos = calculateRelativePosition(this, elm, rel);
      return this.moveTo(pos.x, pos.y);
    },
    moveBy: function (dx, dy) {
      var self = this, rect = self.layoutRect();
      self.moveTo(rect.x + dx, rect.y + dy);
      return self;
    },
    moveTo: function (x, y) {
      var self = this;
      function constrain(value, max, size) {
        if (value < 0) {
          return 0;
        }
        if (value + size > max) {
          value = max - size;
          return value < 0 ? 0 : value;
        }
        return value;
      }
      if (self.settings.constrainToViewport) {
        var viewPortRect = funcs.getViewPort(window);
        var layoutRect = self.layoutRect();
        x = constrain(x, viewPortRect.w + viewPortRect.x, layoutRect.w);
        y = constrain(y, viewPortRect.h + viewPortRect.y, layoutRect.h);
      }
      if (self.state.get('rendered')) {
        self.layoutRect({
          x: x,
          y: y
        }).repaint();
      } else {
        self.settings.x = x;
        self.settings.y = y;
      }
      self.fire('move', {
        x: x,
        y: y
      });
      return self;
    }
  };

  var Class = tinymce.util.Tools.resolve('tinymce.util.Class');

  var EventDispatcher = tinymce.util.Tools.resolve('tinymce.util.EventDispatcher');

  var $_3xgdaaswjcq8h9et = {
    parseBox: function (value) {
      var len;
      var radix = 10;
      if (!value) {
        return;
      }
      if (typeof value === 'number') {
        value = value || 0;
        return {
          top: value,
          left: value,
          bottom: value,
          right: value
        };
      }
      value = value.split(' ');
      len = value.length;
      if (len === 1) {
        value[1] = value[2] = value[3] = value[0];
      } else if (len === 2) {
        value[2] = value[0];
        value[3] = value[1];
      } else if (len === 3) {
        value[3] = value[1];
      }
      return {
        top: parseInt(value[0], radix) || 0,
        right: parseInt(value[1], radix) || 0,
        bottom: parseInt(value[2], radix) || 0,
        left: parseInt(value[3], radix) || 0
      };
    },
    measureBox: function (elm, prefix) {
      function getStyle(name) {
        var defaultView = elm.ownerDocument.defaultView;
        if (defaultView) {
          var computedStyle = defaultView.getComputedStyle(elm, null);
          if (computedStyle) {
            name = name.replace(/[A-Z]/g, function (a) {
              return '-' + a;
            });
            return computedStyle.getPropertyValue(name);
          } else {
            return null;
          }
        }
        return elm.currentStyle[name];
      }
      function getSide(name) {
        var val = parseFloat(getStyle(name));
        return isNaN(val) ? 0 : val;
      }
      return {
        top: getSide(prefix + 'TopWidth'),
        right: getSide(prefix + 'RightWidth'),
        bottom: getSide(prefix + 'BottomWidth'),
        left: getSide(prefix + 'LeftWidth')
      };
    }
  };

  function noop$1() {
  }
  function ClassList(onchange) {
    this.cls = [];
    this.cls._map = {};
    this.onchange = onchange || noop$1;
    this.prefix = '';
  }
  Tools.extend(ClassList.prototype, {
    add: function (cls) {
      if (cls && !this.contains(cls)) {
        this.cls._map[cls] = true;
        this.cls.push(cls);
        this._change();
      }
      return this;
    },
    remove: function (cls) {
      if (this.contains(cls)) {
        var i = void 0;
        for (i = 0; i < this.cls.length; i++) {
          if (this.cls[i] === cls) {
            break;
          }
        }
        this.cls.splice(i, 1);
        delete this.cls._map[cls];
        this._change();
      }
      return this;
    },
    toggle: function (cls, state) {
      var curState = this.contains(cls);
      if (curState !== state) {
        if (curState) {
          this.remove(cls);
        } else {
          this.add(cls);
        }
        this._change();
      }
      return this;
    },
    contains: function (cls) {
      return !!this.cls._map[cls];
    },
    _change: function () {
      delete this.clsValue;
      this.onchange.call(this);
    }
  });
  ClassList.prototype.toString = function () {
    var value;
    if (this.clsValue) {
      return this.clsValue;
    }
    value = '';
    for (var i = 0; i < this.cls.length; i++) {
      if (i > 0) {
        value += ' ';
      }
      value += this.prefix + this.cls[i];
    }
    return value;
  };

  function unique(array) {
    var uniqueItems = [];
    var i = array.length, item;
    while (i--) {
      item = array[i];
      if (!item.__checked) {
        uniqueItems.push(item);
        item.__checked = 1;
      }
    }
    i = uniqueItems.length;
    while (i--) {
      delete uniqueItems[i].__checked;
    }
    return uniqueItems;
  }
  var expression = /^([\w\\*]+)?(?:#([\w\-\\]+))?(?:\.([\w\\\.]+))?(?:\[\@?([\w\\]+)([\^\$\*!~]?=)([\w\\]+)\])?(?:\:(.+))?/i;
  var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
  var whiteSpace = /^\s*|\s*$/g;
  var Collection$2;
  var Selector = Class.extend({
    init: function (selector) {
      var match = this.match;
      function compileNameFilter(name) {
        if (name) {
          name = name.toLowerCase();
          return function (item) {
            return name === '*' || item.type === name;
          };
        }
      }
      function compileIdFilter(id) {
        if (id) {
          return function (item) {
            return item._name === id;
          };
        }
      }
      function compileClassesFilter(classes) {
        if (classes) {
          classes = classes.split('.');
          return function (item) {
            var i = classes.length;
            while (i--) {
              if (!item.classes.contains(classes[i])) {
                return false;
              }
            }
            return true;
          };
        }
      }
      function compileAttrFilter(name, cmp, check) {
        if (name) {
          return function (item) {
            var value = item[name] ? item[name]() : '';
            return !cmp ? !!check : cmp === '=' ? value === check : cmp === '*=' ? value.indexOf(check) >= 0 : cmp === '~=' ? (' ' + value + ' ').indexOf(' ' + check + ' ') >= 0 : cmp === '!=' ? value !== check : cmp === '^=' ? value.indexOf(check) === 0 : cmp === '$=' ? value.substr(value.length - check.length) === check : false;
          };
        }
      }
      function compilePsuedoFilter(name) {
        var notSelectors;
        if (name) {
          name = /(?:not\((.+)\))|(.+)/i.exec(name);
          if (!name[1]) {
            name = name[2];
            return function (item, index, length) {
              return name === 'first' ? index === 0 : name === 'last' ? index === length - 1 : name === 'even' ? index % 2 === 0 : name === 'odd' ? index % 2 === 1 : item[name] ? item[name]() : false;
            };
          }
          notSelectors = parseChunks(name[1], []);
          return function (item) {
            return !match(item, notSelectors);
          };
        }
      }
      function compile(selector, filters, direct) {
        var parts;
        function add(filter) {
          if (filter) {
            filters.push(filter);
          }
        }
        parts = expression.exec(selector.replace(whiteSpace, ''));
        add(compileNameFilter(parts[1]));
        add(compileIdFilter(parts[2]));
        add(compileClassesFilter(parts[3]));
        add(compileAttrFilter(parts[4], parts[5], parts[6]));
        add(compilePsuedoFilter(parts[7]));
        filters.pseudo = !!parts[7];
        filters.direct = direct;
        return filters;
      }
      function parseChunks(selector, selectors) {
        var parts = [];
        var extra, matches, i;
        do {
          chunker.exec('');
          matches = chunker.exec(selector);
          if (matches) {
            selector = matches[3];
            parts.push(matches[1]);
            if (matches[2]) {
              extra = matches[3];
              break;
            }
          }
        } while (matches);
        if (extra) {
          parseChunks(extra, selectors);
        }
        selector = [];
        for (i = 0; i < parts.length; i++) {
          if (parts[i] !== '>') {
            selector.push(compile(parts[i], [], parts[i - 1] === '>'));
          }
        }
        selectors.push(selector);
        return selectors;
      }
      this._selectors = parseChunks(selector, []);
    },
    match: function (control, selectors) {
      var i, l, si, sl, selector, fi, fl, filters, index, length, siblings, count, item;
      selectors = selectors || this._selectors;
      for (i = 0, l = selectors.length; i < l; i++) {
        selector = selectors[i];
        sl = selector.length;
        item = control;
        count = 0;
        for (si = sl - 1; si >= 0; si--) {
          filters = selector[si];
          while (item) {
            if (filters.pseudo) {
              siblings = item.parent().items();
              index = length = siblings.length;
              while (index--) {
                if (siblings[index] === item) {
                  break;
                }
              }
            }
            for (fi = 0, fl = filters.length; fi < fl; fi++) {
              if (!filters[fi](item, index, length)) {
                fi = fl + 1;
                break;
              }
            }
            if (fi === fl) {
              count++;
              break;
            } else {
              if (si === sl - 1) {
                break;
              }
            }
            item = item.parent();
          }
        }
        if (count === sl) {
          return true;
        }
      }
      return false;
    },
    find: function (container) {
      var matches = [], i, l;
      var selectors = this._selectors;
      function collect(items, selector, index) {
        var i, l, fi, fl, item;
        var filters = selector[index];
        for (i = 0, l = items.length; i < l; i++) {
          item = items[i];
          for (fi = 0, fl = filters.length; fi < fl; fi++) {
            if (!filters[fi](item, i, l)) {
              fi = fl + 1;
              break;
            }
          }
          if (fi === fl) {
            if (index === selector.length - 1) {
              matches.push(item);
            } else {
              if (item.items) {
                collect(item.items(), selector, index + 1);
              }
            }
          } else if (filters.direct) {
            return;
          }
          if (item.items) {
            collect(item.items(), selector, index);
          }
        }
      }
      if (container.items) {
        for (i = 0, l = selectors.length; i < l; i++) {
          collect(container.items(), selectors[i], 0);
        }
        if (l > 1) {
          matches = unique(matches);
        }
      }
      if (!Collection$2) {
        Collection$2 = Selector.Collection;
      }
      return new Collection$2(matches);
    }
  });

  var Collection;
  var proto$1;
  var push$1 = Array.prototype.push;
  var slice$1 = Array.prototype.slice;
  proto$1 = {
    length: 0,
    init: function (items) {
      if (items) {
        this.add(items);
      }
    },
    add: function (items) {
      var self = this;
      if (!Tools.isArray(items)) {
        if (items instanceof Collection) {
          self.add(items.toArray());
        } else {
          push$1.call(self, items);
        }
      } else {
        push$1.apply(self, items);
      }
      return self;
    },
    set: function (items) {
      var self = this;
      var len = self.length;
      var i;
      self.length = 0;
      self.add(items);
      for (i = self.length; i < len; i++) {
        delete self[i];
      }
      return self;
    },
    filter: function (selector) {
      var self = this;
      var i, l;
      var matches = [];
      var item, match;
      if (typeof selector === 'string') {
        selector = new Selector(selector);
        match = function (item) {
          return selector.match(item);
        };
      } else {
        match = selector;
      }
      for (i = 0, l = self.length; i < l; i++) {
        item = self[i];
        if (match(item)) {
          matches.push(item);
        }
      }
      return new Collection(matches);
    },
    slice: function () {
      return new Collection(slice$1.apply(this, arguments));
    },
    eq: function (index) {
      return index === -1 ? this.slice(index) : this.slice(index, +index + 1);
    },
    each: function (callback) {
      Tools.each(this, callback);
      return this;
    },
    toArray: function () {
      return Tools.toArray(this);
    },
    indexOf: function (ctrl) {
      var self = this;
      var i = self.length;
      while (i--) {
        if (self[i] === ctrl) {
          break;
        }
      }
      return i;
    },
    reverse: function () {
      return new Collection(Tools.toArray(this).reverse());
    },
    hasClass: function (cls) {
      return this[0] ? this[0].classes.contains(cls) : false;
    },
    prop: function (name, value) {
      var self = this;
      var item;
      if (value !== undefined) {
        self.each(function (item) {
          if (item[name]) {
            item[name](value);
          }
        });
        return self;
      }
      item = self[0];
      if (item && item[name]) {
        return item[name]();
      }
    },
    exec: function (name) {
      var self = this, args = Tools.toArray(arguments).slice(1);
      self.each(function (item) {
        if (item[name]) {
          item[name].apply(item, args);
        }
      });
      return self;
    },
    remove: function () {
      var i = this.length;
      while (i--) {
        this[i].remove();
      }
      return this;
    },
    addClass: function (cls) {
      return this.each(function (item) {
        item.classes.add(cls);
      });
    },
    removeClass: function (cls) {
      return this.each(function (item) {
        item.classes.remove(cls);
      });
    }
  };
  Tools.each('fire on off show hide append prepend before after reflow'.split(' '), function (name) {
    proto$1[name] = function () {
      var args = Tools.toArray(arguments);
      this.each(function (ctrl) {
        if (name in ctrl) {
          ctrl[name].apply(ctrl, args);
        }
      });
      return this;
    };
  });
  Tools.each('text name disabled active selected checked visible parent value data'.split(' '), function (name) {
    proto$1[name] = function (value) {
      return this.prop(name, value);
    };
  });
  Collection = Class.extend(proto$1);
  Selector.Collection = Collection;
  var Collection$1 = Collection;

  var Binding = function (settings) {
    this.create = settings.create;
  };
  Binding.create = function (model, name) {
    return new Binding({
      create: function (otherModel, otherName) {
        var bindings;
        var fromSelfToOther = function (e) {
          otherModel.set(otherName, e.value);
        };
        var fromOtherToSelf = function (e) {
          model.set(name, e.value);
        };
        otherModel.on('change:' + otherName, fromOtherToSelf);
        model.on('change:' + name, fromSelfToOther);
        bindings = otherModel._bindings;
        if (!bindings) {
          bindings = otherModel._bindings = [];
          otherModel.on('destroy', function () {
            var i = bindings.length;
            while (i--) {
              bindings[i]();
            }
          });
        }
        bindings.push(function () {
          model.off('change:' + name, fromSelfToOther);
        });
        return model.get(name);
      }
    });
  };

  var Observable = tinymce.util.Tools.resolve('tinymce.util.Observable');

  function isNode(node) {
    return node.nodeType > 0;
  }
  function isEqual(a, b) {
    var k, checked;
    if (a === b) {
      return true;
    }
    if (a === null || b === null) {
      return a === b;
    }
    if (typeof a !== 'object' || typeof b !== 'object') {
      return a === b;
    }
    if (Tools.isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }
      k = a.length;
      while (k--) {
        if (!isEqual(a[k], b[k])) {
          return false;
        }
      }
    }
    if (isNode(a) || isNode(b)) {
      return a === b;
    }
    checked = {};
    for (k in b) {
      if (!isEqual(a[k], b[k])) {
        return false;
      }
      checked[k] = true;
    }
    for (k in a) {
      if (!checked[k] && !isEqual(a[k], b[k])) {
        return false;
      }
    }
    return true;
  }
  var ObservableObject = Class.extend({
    Mixins: [Observable],
    init: function (data) {
      var name, value;
      data = data || {};
      for (name in data) {
        value = data[name];
        if (value instanceof Binding) {
          data[name] = value.create(this, name);
        }
      }
      this.data = data;
    },
    set: function (name, value) {
      var key, args;
      var oldValue = this.data[name];
      if (value instanceof Binding) {
        value = value.create(this, name);
      }
      if (typeof name === 'object') {
        for (key in name) {
          this.set(key, name[key]);
        }
        return this;
      }
      if (!isEqual(oldValue, value)) {
        this.data[name] = value;
        args = {
          target: this,
          name: name,
          value: value,
          oldValue: oldValue
        };
        this.fire('change:' + name, args);
        this.fire('change', args);
      }
      return this;
    },
    get: function (name) {
      return this.data[name];
    },
    has: function (name) {
      return name in this.data;
    },
    bind: function (name) {
      return Binding.create(this, name);
    },
    destroy: function () {
      this.fire('destroy');
    }
  });

  var dirtyCtrls = {};
  var animationFrameRequested;
  var $_5bnmeot3jcq8h9fb = {
    add: function (ctrl) {
      var parent = ctrl.parent();
      if (parent) {
        if (!parent._layout || parent._layout.isNative()) {
          return;
        }
        if (!dirtyCtrls[parent._id]) {
          dirtyCtrls[parent._id] = parent;
        }
        if (!animationFrameRequested) {
          animationFrameRequested = true;
          Delay.requestAnimationFrame(function () {
            var id, ctrl;
            animationFrameRequested = false;
            for (id in dirtyCtrls) {
              ctrl = dirtyCtrls[id];
              if (ctrl.state.get('rendered')) {
                ctrl.reflow();
              }
            }
            dirtyCtrls = {};
          }, document.body);
        }
      }
    },
    remove: function (ctrl) {
      if (dirtyCtrls[ctrl._id]) {
        delete dirtyCtrls[ctrl._id];
      }
    }
  };

  var hasMouseWheelEventSupport = 'onmousewheel' in document;
  var hasWheelEventSupport = false;
  var classPrefix = 'mce-';
  var Control;
  var idCounter = 0;
  var proto = {
    Statics: { classPrefix: classPrefix },
    isRtl: function () {
      return Control.rtl;
    },
    classPrefix: classPrefix,
    init: function (settings) {
      var self = this;
      var classes, defaultClasses;
      function applyClasses(classes) {
        var i;
        classes = classes.split(' ');
        for (i = 0; i < classes.length; i++) {
          self.classes.add(classes[i]);
        }
      }
      self.settings = settings = Tools.extend({}, self.Defaults, settings);
      self._id = settings.id || 'mceu_' + idCounter++;
      self._aria = { role: settings.role };
      self._elmCache = {};
      self.$ = $;
      self.state = new ObservableObject({
        visible: true,
        active: false,
        disabled: false,
        value: ''
      });
      self.data = new ObservableObject(settings.data);
      self.classes = new ClassList(function () {
        if (self.state.get('rendered')) {
          self.getEl().className = this.toString();
        }
      });
      self.classes.prefix = self.classPrefix;
      classes = settings.classes;
      if (classes) {
        if (self.Defaults) {
          defaultClasses = self.Defaults.classes;
          if (defaultClasses && classes !== defaultClasses) {
            applyClasses(defaultClasses);
          }
        }
        applyClasses(classes);
      }
      Tools.each('title text name visible disabled active value'.split(' '), function (name) {
        if (name in settings) {
          self[name](settings[name]);
        }
      });
      self.on('click', function () {
        if (self.disabled()) {
          return false;
        }
      });
      self.settings = settings;
      self.borderBox = $_3xgdaaswjcq8h9et.parseBox(settings.border);
      self.paddingBox = $_3xgdaaswjcq8h9et.parseBox(settings.padding);
      self.marginBox = $_3xgdaaswjcq8h9et.parseBox(settings.margin);
      if (settings.hidden) {
        self.hide();
      }
    },
    Properties: 'parent,name',
    getContainerElm: function () {
      return funcs.getContainer();
    },
    getParentCtrl: function (elm) {
      var ctrl;
      var lookup = this.getRoot().controlIdLookup;
      while (elm && lookup) {
        ctrl = lookup[elm.id];
        if (ctrl) {
          break;
        }
        elm = elm.parentNode;
      }
      return ctrl;
    },
    initLayoutRect: function () {
      var self = this;
      var settings = self.settings;
      var borderBox, layoutRect;
      var elm = self.getEl();
      var width, height, minWidth, minHeight, autoResize;
      var startMinWidth, startMinHeight, initialSize;
      borderBox = self.borderBox = self.borderBox || $_3xgdaaswjcq8h9et.measureBox(elm, 'border');
      self.paddingBox = self.paddingBox || $_3xgdaaswjcq8h9et.measureBox(elm, 'padding');
      self.marginBox = self.marginBox || $_3xgdaaswjcq8h9et.measureBox(elm, 'margin');
      initialSize = funcs.getSize(elm);
      startMinWidth = settings.minWidth;
      startMinHeight = settings.minHeight;
      minWidth = startMinWidth || initialSize.width;
      minHeight = startMinHeight || initialSize.height;
      width = settings.width;
      height = settings.height;
      autoResize = settings.autoResize;
      autoResize = typeof autoResize !== 'undefined' ? autoResize : !width && !height;
      width = width || minWidth;
      height = height || minHeight;
      var deltaW = borderBox.left + borderBox.right;
      var deltaH = borderBox.top + borderBox.bottom;
      var maxW = settings.maxWidth || 65535;
      var maxH = settings.maxHeight || 65535;
      self._layoutRect = layoutRect = {
        x: settings.x || 0,
        y: settings.y || 0,
        w: width,
        h: height,
        deltaW: deltaW,
        deltaH: deltaH,
        contentW: width - deltaW,
        contentH: height - deltaH,
        innerW: width - deltaW,
        innerH: height - deltaH,
        startMinWidth: startMinWidth || 0,
        startMinHeight: startMinHeight || 0,
        minW: Math.min(minWidth, maxW),
        minH: Math.min(minHeight, maxH),
        maxW: maxW,
        maxH: maxH,
        autoResize: autoResize,
        scrollW: 0
      };
      self._lastLayoutRect = {};
      return layoutRect;
    },
    layoutRect: function (newRect) {
      var self = this;
      var curRect = self._layoutRect, lastLayoutRect, size, deltaWidth, deltaHeight, repaintControls;
      if (!curRect) {
        curRect = self.initLayoutRect();
      }
      if (newRect) {
        deltaWidth = curRect.deltaW;
        deltaHeight = curRect.deltaH;
        if (newRect.x !== undefined) {
          curRect.x = newRect.x;
        }
        if (newRect.y !== undefined) {
          curRect.y = newRect.y;
        }
        if (newRect.minW !== undefined) {
          curRect.minW = newRect.minW;
        }
        if (newRect.minH !== undefined) {
          curRect.minH = newRect.minH;
        }
        size = newRect.w;
        if (size !== undefined) {
          size = size < curRect.minW ? curRect.minW : size;
          size = size > curRect.maxW ? curRect.maxW : size;
          curRect.w = size;
          curRect.innerW = size - deltaWidth;
        }
        size = newRect.h;
        if (size !== undefined) {
          size = size < curRect.minH ? curRect.minH : size;
          size = size > curRect.maxH ? curRect.maxH : size;
          curRect.h = size;
          curRect.innerH = size - deltaHeight;
        }
        size = newRect.innerW;
        if (size !== undefined) {
          size = size < curRect.minW - deltaWidth ? curRect.minW - deltaWidth : size;
          size = size > curRect.maxW - deltaWidth ? curRect.maxW - deltaWidth : size;
          curRect.innerW = size;
          curRect.w = size + deltaWidth;
        }
        size = newRect.innerH;
        if (size !== undefined) {
          size = size < curRect.minH - deltaHeight ? curRect.minH - deltaHeight : size;
          size = size > curRect.maxH - deltaHeight ? curRect.maxH - deltaHeight : size;
          curRect.innerH = size;
          curRect.h = size + deltaHeight;
        }
        if (newRect.contentW !== undefined) {
          curRect.contentW = newRect.contentW;
        }
        if (newRect.contentH !== undefined) {
          curRect.contentH = newRect.contentH;
        }
        lastLayoutRect = self._lastLayoutRect;
        if (lastLayoutRect.x !== curRect.x || lastLayoutRect.y !== curRect.y || lastLayoutRect.w !== curRect.w || lastLayoutRect.h !== curRect.h) {
          repaintControls = Control.repaintControls;
          if (repaintControls) {
            if (repaintControls.map && !repaintControls.map[self._id]) {
              repaintControls.push(self);
              repaintControls.map[self._id] = true;
            }
          }
          lastLayoutRect.x = curRect.x;
          lastLayoutRect.y = curRect.y;
          lastLayoutRect.w = curRect.w;
          lastLayoutRect.h = curRect.h;
        }
        return self;
      }
      return curRect;
    },
    repaint: function () {
      var self = this;
      var style, bodyStyle, bodyElm, rect, borderBox;
      var borderW, borderH, lastRepaintRect, round, value;
      round = !document.createRange ? Math.round : function (value) {
        return value;
      };
      style = self.getEl().style;
      rect = self._layoutRect;
      lastRepaintRect = self._lastRepaintRect || {};
      borderBox = self.borderBox;
      borderW = borderBox.left + borderBox.right;
      borderH = borderBox.top + borderBox.bottom;
      if (rect.x !== lastRepaintRect.x) {
        style.left = round(rect.x) + 'px';
        lastRepaintRect.x = rect.x;
      }
      if (rect.y !== lastRepaintRect.y) {
        style.top = round(rect.y) + 'px';
        lastRepaintRect.y = rect.y;
      }
      if (rect.w !== lastRepaintRect.w) {
        value = round(rect.w - borderW);
        style.width = (value >= 0 ? value : 0) + 'px';
        lastRepaintRect.w = rect.w;
      }
      if (rect.h !== lastRepaintRect.h) {
        value = round(rect.h - borderH);
        style.height = (value >= 0 ? value : 0) + 'px';
        lastRepaintRect.h = rect.h;
      }
      if (self._hasBody && rect.innerW !== lastRepaintRect.innerW) {
        value = round(rect.innerW);
        bodyElm = self.getEl('body');
        if (bodyElm) {
          bodyStyle = bodyElm.style;
          bodyStyle.width = (value >= 0 ? value : 0) + 'px';
        }
        lastRepaintRect.innerW = rect.innerW;
      }
      if (self._hasBody && rect.innerH !== lastRepaintRect.innerH) {
        value = round(rect.innerH);
        bodyElm = bodyElm || self.getEl('body');
        if (bodyElm) {
          bodyStyle = bodyStyle || bodyElm.style;
          bodyStyle.height = (value >= 0 ? value : 0) + 'px';
        }
        lastRepaintRect.innerH = rect.innerH;
      }
      self._lastRepaintRect = lastRepaintRect;
      self.fire('repaint', {}, false);
    },
    updateLayoutRect: function () {
      var self = this;
      self.parent()._lastRect = null;
      funcs.css(self.getEl(), {
        width: '',
        height: ''
      });
      self._layoutRect = self._lastRepaintRect = self._lastLayoutRect = null;
      self.initLayoutRect();
    },
    on: function (name, callback) {
      var self = this;
      function resolveCallbackName(name) {
        var callback, scope;
        if (typeof name !== 'string') {
          return name;
        }
        return function (e) {
          if (!callback) {
            self.parentsAndSelf().each(function (ctrl) {
              var callbacks = ctrl.settings.callbacks;
              if (callbacks && (callback = callbacks[name])) {
                scope = ctrl;
                return false;
              }
            });
          }
          if (!callback) {
            e.action = name;
            this.fire('execute', e);
            return;
          }
          return callback.call(scope, e);
        };
      }
      getEventDispatcher(self).on(name, resolveCallbackName(callback));
      return self;
    },
    off: function (name, callback) {
      getEventDispatcher(this).off(name, callback);
      return this;
    },
    fire: function (name, args, bubble) {
      var self = this;
      args = args || {};
      if (!args.control) {
        args.control = self;
      }
      args = getEventDispatcher(self).fire(name, args);
      if (bubble !== false && self.parent) {
        var parent_1 = self.parent();
        while (parent_1 && !args.isPropagationStopped()) {
          parent_1.fire(name, args, false);
          parent_1 = parent_1.parent();
        }
      }
      return args;
    },
    hasEventListeners: function (name) {
      return getEventDispatcher(this).has(name);
    },
    parents: function (selector) {
      var self = this;
      var ctrl, parents = new Collection$1();
      for (ctrl = self.parent(); ctrl; ctrl = ctrl.parent()) {
        parents.add(ctrl);
      }
      if (selector) {
        parents = parents.filter(selector);
      }
      return parents;
    },
    parentsAndSelf: function (selector) {
      return new Collection$1(this).add(this.parents(selector));
    },
    next: function () {
      var parentControls = this.parent().items();
      return parentControls[parentControls.indexOf(this) + 1];
    },
    prev: function () {
      var parentControls = this.parent().items();
      return parentControls[parentControls.indexOf(this) - 1];
    },
    innerHtml: function (html) {
      this.$el.html(html);
      return this;
    },
    getEl: function (suffix) {
      var id = suffix ? this._id + '-' + suffix : this._id;
      if (!this._elmCache[id]) {
        this._elmCache[id] = $('#' + id)[0];
      }
      return this._elmCache[id];
    },
    show: function () {
      return this.visible(true);
    },
    hide: function () {
      return this.visible(false);
    },
    focus: function () {
      try {
        this.getEl().focus();
      } catch (ex) {
      }
      return this;
    },
    blur: function () {
      this.getEl().blur();
      return this;
    },
    aria: function (name, value) {
      var self = this, elm = self.getEl(self.ariaTarget);
      if (typeof value === 'undefined') {
        return self._aria[name];
      }
      self._aria[name] = value;
      if (self.state.get('rendered')) {
        elm.setAttribute(name === 'role' ? name : 'aria-' + name, value);
      }
      return self;
    },
    encode: function (text, translate) {
      if (translate !== false) {
        text = this.translate(text);
      }
      return (text || '').replace(/[&<>"]/g, function (match) {
        return '&#' + match.charCodeAt(0) + ';';
      });
    },
    translate: function (text) {
      return Control.translate ? Control.translate(text) : text;
    },
    before: function (items) {
      var self = this, parent = self.parent();
      if (parent) {
        parent.insert(items, parent.items().indexOf(self), true);
      }
      return self;
    },
    after: function (items) {
      var self = this, parent = self.parent();
      if (parent) {
        parent.insert(items, parent.items().indexOf(self));
      }
      return self;
    },
    remove: function () {
      var self = this;
      var elm = self.getEl();
      var parent = self.parent();
      var newItems, i;
      if (self.items) {
        var controls = self.items().toArray();
        i = controls.length;
        while (i--) {
          controls[i].remove();
        }
      }
      if (parent && parent.items) {
        newItems = [];
        parent.items().each(function (item) {
          if (item !== self) {
            newItems.push(item);
          }
        });
        parent.items().set(newItems);
        parent._lastRect = null;
      }
      if (self._eventsRoot && self._eventsRoot === self) {
        $(elm).off();
      }
      var lookup = self.getRoot().controlIdLookup;
      if (lookup) {
        delete lookup[self._id];
      }
      if (elm && elm.parentNode) {
        elm.parentNode.removeChild(elm);
      }
      self.state.set('rendered', false);
      self.state.destroy();
      self.fire('remove');
      return self;
    },
    renderBefore: function (elm) {
      $(elm).before(this.renderHtml());
      this.postRender();
      return this;
    },
    renderTo: function (elm) {
      $(elm || this.getContainerElm()).append(this.renderHtml());
      this.postRender();
      return this;
    },
    preRender: function () {
    },
    render: function () {
    },
    renderHtml: function () {
      return '<div id="' + this._id + '" class="' + this.classes + '"></div>';
    },
    postRender: function () {
      var self = this;
      var settings = self.settings;
      var elm, box, parent, name, parentEventsRoot;
      self.$el = $(self.getEl());
      self.state.set('rendered', true);
      for (name in settings) {
        if (name.indexOf('on') === 0) {
          self.on(name.substr(2), settings[name]);
        }
      }
      if (self._eventsRoot) {
        for (parent = self.parent(); !parentEventsRoot && parent; parent = parent.parent()) {
          parentEventsRoot = parent._eventsRoot;
        }
        if (parentEventsRoot) {
          for (name in parentEventsRoot._nativeEvents) {
            self._nativeEvents[name] = true;
          }
        }
      }
      bindPendingEvents(self);
      if (settings.style) {
        elm = self.getEl();
        if (elm) {
          elm.setAttribute('style', settings.style);
          elm.style.cssText = settings.style;
        }
      }
      if (self.settings.border) {
        box = self.borderBox;
        self.$el.css({
          'border-top-width': box.top,
          'border-right-width': box.right,
          'border-bottom-width': box.bottom,
          'border-left-width': box.left
        });
      }
      var root = self.getRoot();
      if (!root.controlIdLookup) {
        root.controlIdLookup = {};
      }
      root.controlIdLookup[self._id] = self;
      for (var key in self._aria) {
        self.aria(key, self._aria[key]);
      }
      if (self.state.get('visible') === false) {
        self.getEl().style.display = 'none';
      }
      self.bindStates();
      self.state.on('change:visible', function (e) {
        var state = e.value;
        var parentCtrl;
        if (self.state.get('rendered')) {
          self.getEl().style.display = state === false ? 'none' : '';
          self.getEl().getBoundingClientRect();
        }
        parentCtrl = self.parent();
        if (parentCtrl) {
          parentCtrl._lastRect = null;
        }
        self.fire(state ? 'show' : 'hide');
        $_5bnmeot3jcq8h9fb.add(self);
      });
      self.fire('postrender', {}, false);
    },
    bindStates: function () {
    },
    scrollIntoView: function (align) {
      function getOffset(elm, rootElm) {
        var x, y, parent = elm;
        x = y = 0;
        while (parent && parent !== rootElm && parent.nodeType) {
          x += parent.offsetLeft || 0;
          y += parent.offsetTop || 0;
          parent = parent.offsetParent;
        }
        return {
          x: x,
          y: y
        };
      }
      var elm = this.getEl(), parentElm = elm.parentNode;
      var x, y, width, height, parentWidth, parentHeight;
      var pos = getOffset(elm, parentElm);
      x = pos.x;
      y = pos.y;
      width = elm.offsetWidth;
      height = elm.offsetHeight;
      parentWidth = parentElm.clientWidth;
      parentHeight = parentElm.clientHeight;
      if (align === 'end') {
        x -= parentWidth - width;
        y -= parentHeight - height;
      } else if (align === 'center') {
        x -= parentWidth / 2 - width / 2;
        y -= parentHeight / 2 - height / 2;
      }
      parentElm.scrollLeft = x;
      parentElm.scrollTop = y;
      return this;
    },
    getRoot: function () {
      var ctrl = this, rootControl;
      var parents = [];
      while (ctrl) {
        if (ctrl.rootControl) {
          rootControl = ctrl.rootControl;
          break;
        }
        parents.push(ctrl);
        rootControl = ctrl;
        ctrl = ctrl.parent();
      }
      if (!rootControl) {
        rootControl = this;
      }
      var i = parents.length;
      while (i--) {
        parents[i].rootControl = rootControl;
      }
      return rootControl;
    },
    reflow: function () {
      $_5bnmeot3jcq8h9fb.remove(this);
      var parent = this.parent();
      if (parent && parent._layout && !parent._layout.isNative()) {
        parent.reflow();
      }
      return this;
    }
  };
  Tools.each('text title visible disabled active value'.split(' '), function (name) {
    proto[name] = function (value) {
      if (arguments.length === 0) {
        return this.state.get(name);
      }
      if (typeof value !== 'undefined') {
        this.state.set(name, value);
      }
      return this;
    };
  });
  Control = Class.extend(proto);
  function getEventDispatcher(obj) {
    if (!obj._eventDispatcher) {
      obj._eventDispatcher = new EventDispatcher({
        scope: obj,
        toggleEvent: function (name, state) {
          if (state && EventDispatcher.isNative(name)) {
            if (!obj._nativeEvents) {
              obj._nativeEvents = {};
            }
            obj._nativeEvents[name] = true;
            if (obj.state.get('rendered')) {
              bindPendingEvents(obj);
            }
          }
        }
      });
    }
    return obj._eventDispatcher;
  }
  function bindPendingEvents(eventCtrl) {
    var i, l, parents, eventRootCtrl, nativeEvents, name;
    function delegate(e) {
      var control = eventCtrl.getParentCtrl(e.target);
      if (control) {
        control.fire(e.type, e);
      }
    }
    function mouseLeaveHandler() {
      var ctrl = eventRootCtrl._lastHoverCtrl;
      if (ctrl) {
        ctrl.fire('mouseleave', { target: ctrl.getEl() });
        ctrl.parents().each(function (ctrl) {
          ctrl.fire('mouseleave', { target: ctrl.getEl() });
        });
        eventRootCtrl._lastHoverCtrl = null;
      }
    }
    function mouseEnterHandler(e) {
      var ctrl = eventCtrl.getParentCtrl(e.target), lastCtrl = eventRootCtrl._lastHoverCtrl, idx = 0, i, parents, lastParents;
      if (ctrl !== lastCtrl) {
        eventRootCtrl._lastHoverCtrl = ctrl;
        parents = ctrl.parents().toArray().reverse();
        parents.push(ctrl);
        if (lastCtrl) {
          lastParents = lastCtrl.parents().toArray().reverse();
          lastParents.push(lastCtrl);
          for (idx = 0; idx < lastParents.length; idx++) {
            if (parents[idx] !== lastParents[idx]) {
              break;
            }
          }
          for (i = lastParents.length - 1; i >= idx; i--) {
            lastCtrl = lastParents[i];
            lastCtrl.fire('mouseleave', { target: lastCtrl.getEl() });
          }
        }
        for (i = idx; i < parents.length; i++) {
          ctrl = parents[i];
          ctrl.fire('mouseenter', { target: ctrl.getEl() });
        }
      }
    }
    function fixWheelEvent(e) {
      e.preventDefault();
      if (e.type === 'mousewheel') {
        e.deltaY = -1 / 40 * e.wheelDelta;
        if (e.wheelDeltaX) {
          e.deltaX = -1 / 40 * e.wheelDeltaX;
        }
      } else {
        e.deltaX = 0;
        e.deltaY = e.detail;
      }
      e = eventCtrl.fire('wheel', e);
    }
    nativeEvents = eventCtrl._nativeEvents;
    if (nativeEvents) {
      parents = eventCtrl.parents().toArray();
      parents.unshift(eventCtrl);
      for (i = 0, l = parents.length; !eventRootCtrl && i < l; i++) {
        eventRootCtrl = parents[i]._eventsRoot;
      }
      if (!eventRootCtrl) {
        eventRootCtrl = parents[parents.length - 1] || eventCtrl;
      }
      eventCtrl._eventsRoot = eventRootCtrl;
      for (l = i, i = 0; i < l; i++) {
        parents[i]._eventsRoot = eventRootCtrl;
      }
      var eventRootDelegates = eventRootCtrl._delegates;
      if (!eventRootDelegates) {
        eventRootDelegates = eventRootCtrl._delegates = {};
      }
      for (name in nativeEvents) {
        if (!nativeEvents) {
          return false;
        }
        if (name === 'wheel' && !hasWheelEventSupport) {
          if (hasMouseWheelEventSupport) {
            $(eventCtrl.getEl()).on('mousewheel', fixWheelEvent);
          } else {
            $(eventCtrl.getEl()).on('DOMMouseScroll', fixWheelEvent);
          }
          continue;
        }
        if (name === 'mouseenter' || name === 'mouseleave') {
          if (!eventRootCtrl._hasMouseEnter) {
            $(eventRootCtrl.getEl()).on('mouseleave', mouseLeaveHandler).on('mouseover', mouseEnterHandler);
            eventRootCtrl._hasMouseEnter = 1;
          }
        } else if (!eventRootDelegates[name]) {
          $(eventRootCtrl.getEl()).on(name, delegate);
          eventRootDelegates[name] = true;
        }
        nativeEvents[name] = false;
      }
    }
  }
  var Control$1 = Control;

  var hasTabstopData = function (elm) {
    return elm.getAttribute('data-mce-tabstop') ? true : false;
  };
  var KeyboardNavigation = function (settings) {
    var root = settings.root;
    var focusedElement, focusedControl;
    function isElement(node) {
      return node && node.nodeType === 1;
    }
    try {
      focusedElement = document.activeElement;
    } catch (ex) {
      focusedElement = document.body;
    }
    focusedControl = root.getParentCtrl(focusedElement);
    function getRole(elm) {
      elm = elm || focusedElement;
      if (isElement(elm)) {
        return elm.getAttribute('role');
      }
      return null;
    }
    function getParentRole(elm) {
      var role, parent = elm || focusedElement;
      while (parent = parent.parentNode) {
        if (role = getRole(parent)) {
          return role;
        }
      }
    }
    function getAriaProp(name) {
      var elm = focusedElement;
      if (isElement(elm)) {
        return elm.getAttribute('aria-' + name);
      }
    }
    function isTextInputElement(elm) {
      var tagName = elm.tagName.toUpperCase();
      return tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT';
    }
    function canFocus(elm) {
      if (isTextInputElement(elm) && !elm.hidden) {
        return true;
      }
      if (hasTabstopData(elm)) {
        return true;
      }
      if (/^(button|menuitem|checkbox|tab|menuitemcheckbox|option|gridcell|slider)$/.test(getRole(elm))) {
        return true;
      }
      return false;
    }
    function getFocusElements(elm) {
      var elements = [];
      function collect(elm) {
        if (elm.nodeType !== 1 || elm.style.display === 'none' || elm.disabled) {
          return;
        }
        if (canFocus(elm)) {
          elements.push(elm);
        }
        for (var i = 0; i < elm.childNodes.length; i++) {
          collect(elm.childNodes[i]);
        }
      }
      collect(elm || root.getEl());
      return elements;
    }
    function getNavigationRoot(targetControl) {
      var navigationRoot, controls;
      targetControl = targetControl || focusedControl;
      controls = targetControl.parents().toArray();
      controls.unshift(targetControl);
      for (var i = 0; i < controls.length; i++) {
        navigationRoot = controls[i];
        if (navigationRoot.settings.ariaRoot) {
          break;
        }
      }
      return navigationRoot;
    }
    function focusFirst(targetControl) {
      var navigationRoot = getNavigationRoot(targetControl);
      var focusElements = getFocusElements(navigationRoot.getEl());
      if (navigationRoot.settings.ariaRemember && 'lastAriaIndex' in navigationRoot) {
        moveFocusToIndex(navigationRoot.lastAriaIndex, focusElements);
      } else {
        moveFocusToIndex(0, focusElements);
      }
    }
    function moveFocusToIndex(idx, elements) {
      if (idx < 0) {
        idx = elements.length - 1;
      } else if (idx >= elements.length) {
        idx = 0;
      }
      if (elements[idx]) {
        elements[idx].focus();
      }
      return idx;
    }
    function moveFocus(dir, elements) {
      var idx = -1;
      var navigationRoot = getNavigationRoot();
      elements = elements || getFocusElements(navigationRoot.getEl());
      for (var i = 0; i < elements.length; i++) {
        if (elements[i] === focusedElement) {
          idx = i;
        }
      }
      idx += dir;
      navigationRoot.lastAriaIndex = moveFocusToIndex(idx, elements);
    }
    function left() {
      var parentRole = getParentRole();
      if (parentRole === 'tablist') {
        moveFocus(-1, getFocusElements(focusedElement.parentNode));
      } else if (focusedControl.parent().submenu) {
        cancel();
      } else {
        moveFocus(-1);
      }
    }
    function right() {
      var role = getRole(), parentRole = getParentRole();
      if (parentRole === 'tablist') {
        moveFocus(1, getFocusElements(focusedElement.parentNode));
      } else if (role === 'menuitem' && parentRole === 'menu' && getAriaProp('haspopup')) {
        enter();
      } else {
        moveFocus(1);
      }
    }
    function up() {
      moveFocus(-1);
    }
    function down() {
      var role = getRole(), parentRole = getParentRole();
      if (role === 'menuitem' && parentRole === 'menubar') {
        enter();
      } else if (role === 'button' && getAriaProp('haspopup')) {
        enter({ key: 'down' });
      } else {
        moveFocus(1);
      }
    }
    function tab(e) {
      var parentRole = getParentRole();
      if (parentRole === 'tablist') {
        var elm = getFocusElements(focusedControl.getEl('body'))[0];
        if (elm) {
          elm.focus();
        }
      } else {
        moveFocus(e.shiftKey ? -1 : 1);
      }
    }
    function cancel() {
      focusedControl.fire('cancel');
    }
    function enter(aria) {
      aria = aria || {};
      focusedControl.fire('click', {
        target: focusedElement,
        aria: aria
      });
    }
    root.on('keydown', function (e) {
      function handleNonTabOrEscEvent(e, handler) {
        if (isTextInputElement(focusedElement) || hasTabstopData(focusedElement)) {
          return;
        }
        if (getRole(focusedElement) === 'slider') {
          return;
        }
        if (handler(e) !== false) {
          e.preventDefault();
        }
      }
      if (e.isDefaultPrevented()) {
        return;
      }
      switch (e.keyCode) {
      case 37:
        handleNonTabOrEscEvent(e, left);
        break;
      case 39:
        handleNonTabOrEscEvent(e, right);
        break;
      case 38:
        handleNonTabOrEscEvent(e, up);
        break;
      case 40:
        handleNonTabOrEscEvent(e, down);
        break;
      case 27:
        cancel();
        break;
      case 14:
      case 13:
      case 32:
        handleNonTabOrEscEvent(e, enter);
        break;
      case 9:
        tab(e);
        e.preventDefault();
        break;
      }
    });
    root.on('focusin', function (e) {
      focusedElement = e.target;
      focusedControl = e.control;
    });
    return { focusFirst: focusFirst };
  };

  var selectorCache = {};
  var Container = Control$1.extend({
    init: function (settings) {
      var self = this;
      self._super(settings);
      settings = self.settings;
      if (settings.fixed) {
        self.state.set('fixed', true);
      }
      self._items = new Collection$1();
      if (self.isRtl()) {
        self.classes.add('rtl');
      }
      self.bodyClasses = new ClassList(function () {
        if (self.state.get('rendered')) {
          self.getEl('body').className = this.toString();
        }
      });
      self.bodyClasses.prefix = self.classPrefix;
      self.classes.add('container');
      self.bodyClasses.add('container-body');
      if (settings.containerCls) {
        self.classes.add(settings.containerCls);
      }
      self._layout = Factory.create((settings.layout || '') + 'layout');
      if (self.settings.items) {
        self.add(self.settings.items);
      } else {
        self.add(self.render());
      }
      self._hasBody = true;
    },
    items: function () {
      return this._items;
    },
    find: function (selector) {
      selector = selectorCache[selector] = selectorCache[selector] || new Selector(selector);
      return selector.find(this);
    },
    add: function (items) {
      var self = this;
      self.items().add(self.create(items)).parent(self);
      return self;
    },
    focus: function (keyboard) {
      var self = this;
      var focusCtrl, keyboardNav, items;
      if (keyboard) {
        keyboardNav = self.keyboardNav || self.parents().eq(-1)[0].keyboardNav;
        if (keyboardNav) {
          keyboardNav.focusFirst(self);
          return;
        }
      }
      items = self.find('*');
      if (self.statusbar) {
        items.add(self.statusbar.items());
      }
      items.each(function (ctrl) {
        if (ctrl.settings.autofocus) {
          focusCtrl = null;
          return false;
        }
        if (ctrl.canFocus) {
          focusCtrl = focusCtrl || ctrl;
        }
      });
      if (focusCtrl) {
        focusCtrl.focus();
      }
      return self;
    },
    replace: function (oldItem, newItem) {
      var ctrlElm;
      var items = this.items();
      var i = items.length;
      while (i--) {
        if (items[i] === oldItem) {
          items[i] = newItem;
          break;
        }
      }
      if (i >= 0) {
        ctrlElm = newItem.getEl();
        if (ctrlElm) {
          ctrlElm.parentNode.removeChild(ctrlElm);
        }
        ctrlElm = oldItem.getEl();
        if (ctrlElm) {
          ctrlElm.parentNode.removeChild(ctrlElm);
        }
      }
      newItem.parent(this);
    },
    create: function (items) {
      var self = this;
      var settings;
      var ctrlItems = [];
      if (!Tools.isArray(items)) {
        items = [items];
      }
      Tools.each(items, function (item) {
        if (item) {
          if (!(item instanceof Control$1)) {
            if (typeof item === 'string') {
              item = { type: item };
            }
            settings = Tools.extend({}, self.settings.defaults, item);
            item.type = settings.type = settings.type || item.type || self.settings.defaultType || (settings.defaults ? settings.defaults.type : null);
            item = Factory.create(settings);
          }
          ctrlItems.push(item);
        }
      });
      return ctrlItems;
    },
    renderNew: function () {
      var self = this;
      self.items().each(function (ctrl, index) {
        var containerElm;
        ctrl.parent(self);
        if (!ctrl.state.get('rendered')) {
          containerElm = self.getEl('body');
          if (containerElm.hasChildNodes() && index <= containerElm.childNodes.length - 1) {
            $(containerElm.childNodes[index]).before(ctrl.renderHtml());
          } else {
            $(containerElm).append(ctrl.renderHtml());
          }
          ctrl.postRender();
          $_5bnmeot3jcq8h9fb.add(ctrl);
        }
      });
      self._layout.applyClasses(self.items().filter(':visible'));
      self._lastRect = null;
      return self;
    },
    append: function (items) {
      return this.add(items).renderNew();
    },
    prepend: function (items) {
      var self = this;
      self.items().set(self.create(items).concat(self.items().toArray()));
      return self.renderNew();
    },
    insert: function (items, index, before) {
      var self = this;
      var curItems, beforeItems, afterItems;
      items = self.create(items);
      curItems = self.items();
      if (!before && index < curItems.length - 1) {
        index += 1;
      }
      if (index >= 0 && index < curItems.length) {
        beforeItems = curItems.slice(0, index).toArray();
        afterItems = curItems.slice(index).toArray();
        curItems.set(beforeItems.concat(items, afterItems));
      }
      return self.renderNew();
    },
    fromJSON: function (data) {
      var self = this;
      for (var name_1 in data) {
        self.find('#' + name_1).value(data[name_1]);
      }
      return self;
    },
    toJSON: function () {
      var self = this, data = {};
      self.find('*').each(function (ctrl) {
        var name = ctrl.name(), value = ctrl.value();
        if (name && typeof value !== 'undefined') {
          data[name] = value;
        }
      });
      return data;
    },
    renderHtml: function () {
      var self = this, layout = self._layout, role = this.settings.role;
      self.preRender();
      layout.preRender(self);
      return '<div id="' + self._id + '" class="' + self.classes + '"' + (role ? ' role="' + this.settings.role + '"' : '') + '>' + '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</div>';
    },
    postRender: function () {
      var self = this;
      var box;
      self.items().exec('postRender');
      self._super();
      self._layout.postRender(self);
      self.state.set('rendered', true);
      if (self.settings.style) {
        self.$el.css(self.settings.style);
      }
      if (self.settings.border) {
        box = self.borderBox;
        self.$el.css({
          'border-top-width': box.top,
          'border-right-width': box.right,
          'border-bottom-width': box.bottom,
          'border-left-width': box.left
        });
      }
      if (!self.parent()) {
        self.keyboardNav = KeyboardNavigation({ root: self });
      }
      return self;
    },
    initLayoutRect: function () {
      var self = this, layoutRect = self._super();
      self._layout.recalc(self);
      return layoutRect;
    },
    recalc: function () {
      var self = this;
      var rect = self._layoutRect;
      var lastRect = self._lastRect;
      if (!lastRect || lastRect.w !== rect.w || lastRect.h !== rect.h) {
        self._layout.recalc(self);
        rect = self.layoutRect();
        self._lastRect = {
          x: rect.x,
          y: rect.y,
          w: rect.w,
          h: rect.h
        };
        return true;
      }
    },
    reflow: function () {
      var i;
      $_5bnmeot3jcq8h9fb.remove(this);
      if (this.visible()) {
        Control$1.repaintControls = [];
        Control$1.repaintControls.map = {};
        this.recalc();
        i = Control$1.repaintControls.length;
        while (i--) {
          Control$1.repaintControls[i].repaint();
        }
        if (this.settings.layout !== 'flow' && this.settings.layout !== 'stack') {
          this.repaint();
        }
        Control$1.repaintControls = [];
      }
      return this;
    }
  });

  function getDocumentSize(doc) {
    var documentElement, body, scrollWidth, clientWidth;
    var offsetWidth, scrollHeight, clientHeight, offsetHeight;
    var max = Math.max;
    documentElement = doc.documentElement;
    body = doc.body;
    scrollWidth = max(documentElement.scrollWidth, body.scrollWidth);
    clientWidth = max(documentElement.clientWidth, body.clientWidth);
    offsetWidth = max(documentElement.offsetWidth, body.offsetWidth);
    scrollHeight = max(documentElement.scrollHeight, body.scrollHeight);
    clientHeight = max(documentElement.clientHeight, body.clientHeight);
    offsetHeight = max(documentElement.offsetHeight, body.offsetHeight);
    return {
      width: scrollWidth < offsetWidth ? clientWidth : scrollWidth,
      height: scrollHeight < offsetHeight ? clientHeight : scrollHeight
    };
  }
  function updateWithTouchData(e) {
    var keys, i;
    if (e.changedTouches) {
      keys = 'screenX screenY pageX pageY clientX clientY'.split(' ');
      for (i = 0; i < keys.length; i++) {
        e[keys[i]] = e.changedTouches[0][keys[i]];
      }
    }
  }
  var DragHelper = function (id, settings) {
    var $eventOverlay;
    var doc = settings.document || document;
    var downButton;
    var start, stop, drag, startX, startY;
    settings = settings || {};
    function getHandleElm() {
      return doc.getElementById(settings.handle || id);
    }
    start = function (e) {
      var docSize = getDocumentSize(doc);
      var handleElm, cursor;
      updateWithTouchData(e);
      e.preventDefault();
      downButton = e.button;
      handleElm = getHandleElm();
      startX = e.screenX;
      startY = e.screenY;
      if (window.getComputedStyle) {
        cursor = window.getComputedStyle(handleElm, null).getPropertyValue('cursor');
      } else {
        cursor = handleElm.runtimeStyle.cursor;
      }
      $eventOverlay = $('<div></div>').css({
        position: 'absolute',
        top: 0,
        left: 0,
        width: docSize.width,
        height: docSize.height,
        zIndex: 2147483647,
        opacity: 0.0001,
        cursor: cursor
      }).appendTo(doc.body);
      $(doc).on('mousemove touchmove', drag).on('mouseup touchend', stop);
      settings.start(e);
    };
    drag = function (e) {
      updateWithTouchData(e);
      if (e.button !== downButton) {
        return stop(e);
      }
      e.deltaX = e.screenX - startX;
      e.deltaY = e.screenY - startY;
      e.preventDefault();
      settings.drag(e);
    };
    stop = function (e) {
      updateWithTouchData(e);
      $(doc).off('mousemove touchmove', drag).off('mouseup touchend', stop);
      $eventOverlay.remove();
      if (settings.stop) {
        settings.stop(e);
      }
    };
    this.destroy = function () {
      $(getHandleElm()).off();
    };
    $(getHandleElm()).on('mousedown touchstart', start);
  };

  var $_2xkiq7t5jcq8h9fi = {
    init: function () {
      var self = this;
      self.on('repaint', self.renderScroll);
    },
    renderScroll: function () {
      var self = this, margin = 2;
      function repaintScroll() {
        var hasScrollH, hasScrollV, bodyElm;
        function repaintAxis(axisName, posName, sizeName, contentSizeName, hasScroll, ax) {
          var containerElm, scrollBarElm, scrollThumbElm;
          var containerSize, scrollSize, ratio, rect;
          var posNameLower, sizeNameLower;
          scrollBarElm = self.getEl('scroll' + axisName);
          if (scrollBarElm) {
            posNameLower = posName.toLowerCase();
            sizeNameLower = sizeName.toLowerCase();
            $(self.getEl('absend')).css(posNameLower, self.layoutRect()[contentSizeName] - 1);
            if (!hasScroll) {
              $(scrollBarElm).css('display', 'none');
              return;
            }
            $(scrollBarElm).css('display', 'block');
            containerElm = self.getEl('body');
            scrollThumbElm = self.getEl('scroll' + axisName + 't');
            containerSize = containerElm['client' + sizeName] - margin * 2;
            containerSize -= hasScrollH && hasScrollV ? scrollBarElm['client' + ax] : 0;
            scrollSize = containerElm['scroll' + sizeName];
            ratio = containerSize / scrollSize;
            rect = {};
            rect[posNameLower] = containerElm['offset' + posName] + margin;
            rect[sizeNameLower] = containerSize;
            $(scrollBarElm).css(rect);
            rect = {};
            rect[posNameLower] = containerElm['scroll' + posName] * ratio;
            rect[sizeNameLower] = containerSize * ratio;
            $(scrollThumbElm).css(rect);
          }
        }
        bodyElm = self.getEl('body');
        hasScrollH = bodyElm.scrollWidth > bodyElm.clientWidth;
        hasScrollV = bodyElm.scrollHeight > bodyElm.clientHeight;
        repaintAxis('h', 'Left', 'Width', 'contentW', hasScrollH, 'Height');
        repaintAxis('v', 'Top', 'Height', 'contentH', hasScrollV, 'Width');
      }
      function addScroll() {
        function addScrollAxis(axisName, posName, sizeName, deltaPosName, ax) {
          var scrollStart;
          var axisId = self._id + '-scroll' + axisName, prefix = self.classPrefix;
          $(self.getEl()).append('<div id="' + axisId + '" class="' + prefix + 'scrollbar ' + prefix + 'scrollbar-' + axisName + '">' + '<div id="' + axisId + 't" class="' + prefix + 'scrollbar-thumb"></div>' + '</div>');
          self.draghelper = new DragHelper(axisId + 't', {
            start: function () {
              scrollStart = self.getEl('body')['scroll' + posName];
              $('#' + axisId).addClass(prefix + 'active');
            },
            drag: function (e) {
              var ratio, hasScrollH, hasScrollV, containerSize;
              var layoutRect = self.layoutRect();
              hasScrollH = layoutRect.contentW > layoutRect.innerW;
              hasScrollV = layoutRect.contentH > layoutRect.innerH;
              containerSize = self.getEl('body')['client' + sizeName] - margin * 2;
              containerSize -= hasScrollH && hasScrollV ? self.getEl('scroll' + axisName)['client' + ax] : 0;
              ratio = containerSize / self.getEl('body')['scroll' + sizeName];
              self.getEl('body')['scroll' + posName] = scrollStart + e['delta' + deltaPosName] / ratio;
            },
            stop: function () {
              $('#' + axisId).removeClass(prefix + 'active');
            }
          });
        }
        self.classes.add('scroll');
        addScrollAxis('v', 'Top', 'Height', 'Y', 'Width');
        addScrollAxis('h', 'Left', 'Width', 'X', 'Height');
      }
      if (self.settings.autoScroll) {
        if (!self._hasScroll) {
          self._hasScroll = true;
          addScroll();
          self.on('wheel', function (e) {
            var bodyEl = self.getEl('body');
            bodyEl.scrollLeft += (e.deltaX || 0) * 10;
            bodyEl.scrollTop += e.deltaY * 10;
            repaintScroll();
          });
          $(self.getEl('body')).on('scroll', repaintScroll);
        }
        repaintScroll();
      }
    }
  };

  var Panel = Container.extend({
    Defaults: {
      layout: 'fit',
      containerCls: 'panel'
    },
    Mixins: [$_2xkiq7t5jcq8h9fi],
    renderHtml: function () {
      var self = this;
      var layout = self._layout;
      var innerHtml = self.settings.html;
      self.preRender();
      layout.preRender(self);
      if (typeof innerHtml === 'undefined') {
        innerHtml = '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + layout.renderHtml(self) + '</div>';
      } else {
        if (typeof innerHtml === 'function') {
          innerHtml = innerHtml.call(self);
        }
        self._hasBody = false;
      }
      return '<div id="' + self._id + '" class="' + self.classes + '" hidefocus="1" tabindex="-1" role="group">' + (self._preBodyHtml || '') + innerHtml + '</div>';
    }
  });

  var $_196mjit7jcq8h9fo = {
    resizeToContent: function () {
      this._layoutRect.autoResize = true;
      this._lastRect = null;
      this.reflow();
    },
    resizeTo: function (w, h) {
      if (w <= 1 || h <= 1) {
        var rect = funcs.getWindowSize();
        w = w <= 1 ? w * rect.w : w;
        h = h <= 1 ? h * rect.h : h;
      }
      this._layoutRect.autoResize = false;
      return this.layoutRect({
        minW: w,
        minH: h,
        w: w,
        h: h
      }).reflow();
    },
    resizeBy: function (dw, dh) {
      var self = this, rect = self.layoutRect();
      return self.resizeTo(rect.w + dw, rect.h + dh);
    }
  };

  var documentClickHandler;
  var documentScrollHandler;
  var windowResizeHandler;
  var visiblePanels = [];
  var zOrder = [];
  var hasModal;
  function isChildOf(ctrl, parent) {
    while (ctrl) {
      if (ctrl === parent) {
        return true;
      }
      ctrl = ctrl.parent();
    }
  }
  function skipOrHidePanels(e) {
    var i = visiblePanels.length;
    while (i--) {
      var panel = visiblePanels[i], clickCtrl = panel.getParentCtrl(e.target);
      if (panel.settings.autohide) {
        if (clickCtrl) {
          if (isChildOf(clickCtrl, panel) || panel.parent() === clickCtrl) {
            continue;
          }
        }
        e = panel.fire('autohide', { target: e.target });
        if (!e.isDefaultPrevented()) {
          panel.hide();
        }
      }
    }
  }
  function bindDocumentClickHandler() {
    if (!documentClickHandler) {
      documentClickHandler = function (e) {
        if (e.button === 2) {
          return;
        }
        skipOrHidePanels(e);
      };
      $(document).on('click touchstart', documentClickHandler);
    }
  }
  function bindDocumentScrollHandler() {
    if (!documentScrollHandler) {
      documentScrollHandler = function () {
        var i;
        i = visiblePanels.length;
        while (i--) {
          repositionPanel(visiblePanels[i]);
        }
      };
      $(window).on('scroll', documentScrollHandler);
    }
  }
  function bindWindowResizeHandler() {
    if (!windowResizeHandler) {
      var docElm_1 = document.documentElement;
      var clientWidth_1 = docElm_1.clientWidth, clientHeight_1 = docElm_1.clientHeight;
      windowResizeHandler = function () {
        if (!document.all || clientWidth_1 !== docElm_1.clientWidth || clientHeight_1 !== docElm_1.clientHeight) {
          clientWidth_1 = docElm_1.clientWidth;
          clientHeight_1 = docElm_1.clientHeight;
          FloatPanel.hideAll();
        }
      };
      $(window).on('resize', windowResizeHandler);
    }
  }
  function repositionPanel(panel) {
    var scrollY = funcs.getViewPort().y;
    function toggleFixedChildPanels(fixed, deltaY) {
      var parent;
      for (var i = 0; i < visiblePanels.length; i++) {
        if (visiblePanels[i] !== panel) {
          parent = visiblePanels[i].parent();
          while (parent && (parent = parent.parent())) {
            if (parent === panel) {
              visiblePanels[i].fixed(fixed).moveBy(0, deltaY).repaint();
            }
          }
        }
      }
    }
    if (panel.settings.autofix) {
      if (!panel.state.get('fixed')) {
        panel._autoFixY = panel.layoutRect().y;
        if (panel._autoFixY < scrollY) {
          panel.fixed(true).layoutRect({ y: 0 }).repaint();
          toggleFixedChildPanels(true, scrollY - panel._autoFixY);
        }
      } else {
        if (panel._autoFixY > scrollY) {
          panel.fixed(false).layoutRect({ y: panel._autoFixY }).repaint();
          toggleFixedChildPanels(false, panel._autoFixY - scrollY);
        }
      }
    }
  }
  function addRemove(add, ctrl) {
    var i, zIndex = FloatPanel.zIndex || 65535, topModal;
    if (add) {
      zOrder.push(ctrl);
    } else {
      i = zOrder.length;
      while (i--) {
        if (zOrder[i] === ctrl) {
          zOrder.splice(i, 1);
        }
      }
    }
    if (zOrder.length) {
      for (i = 0; i < zOrder.length; i++) {
        if (zOrder[i].modal) {
          zIndex++;
          topModal = zOrder[i];
        }
        zOrder[i].getEl().style.zIndex = zIndex;
        zOrder[i].zIndex = zIndex;
        zIndex++;
      }
    }
    var modalBlockEl = $('#' + ctrl.classPrefix + 'modal-block', ctrl.getContainerElm())[0];
    if (topModal) {
      $(modalBlockEl).css('z-index', topModal.zIndex - 1);
    } else if (modalBlockEl) {
      modalBlockEl.parentNode.removeChild(modalBlockEl);
      hasModal = false;
    }
    FloatPanel.currentZIndex = zIndex;
  }
  var FloatPanel = Panel.extend({
    Mixins: [
      $_dvdzmdsqjcq8h9dn,
      $_196mjit7jcq8h9fo
    ],
    init: function (settings) {
      var self = this;
      self._super(settings);
      self._eventsRoot = self;
      self.classes.add('floatpanel');
      if (settings.autohide) {
        bindDocumentClickHandler();
        bindWindowResizeHandler();
        visiblePanels.push(self);
      }
      if (settings.autofix) {
        bindDocumentScrollHandler();
        self.on('move', function () {
          repositionPanel(this);
        });
      }
      self.on('postrender show', function (e) {
        if (e.control === self) {
          var $modalBlockEl_1;
          var prefix_1 = self.classPrefix;
          if (self.modal && !hasModal) {
            $modalBlockEl_1 = $('#' + prefix_1 + 'modal-block', self.getContainerElm());
            if (!$modalBlockEl_1[0]) {
              $modalBlockEl_1 = $('<div id="' + prefix_1 + 'modal-block" class="' + prefix_1 + 'reset ' + prefix_1 + 'fade"></div>').appendTo(self.getContainerElm());
            }
            Delay.setTimeout(function () {
              $modalBlockEl_1.addClass(prefix_1 + 'in');
              $(self.getEl()).addClass(prefix_1 + 'in');
            });
            hasModal = true;
          }
          addRemove(true, self);
        }
      });
      self.on('show', function () {
        self.parents().each(function (ctrl) {
          if (ctrl.state.get('fixed')) {
            self.fixed(true);
            return false;
          }
        });
      });
      if (settings.popover) {
        self._preBodyHtml = '<div class="' + self.classPrefix + 'arrow"></div>';
        self.classes.add('popover').add('bottom').add(self.isRtl() ? 'end' : 'start');
      }
      self.aria('label', settings.ariaLabel);
      self.aria('labelledby', self._id);
      self.aria('describedby', self.describedBy || self._id + '-none');
    },
    fixed: function (state) {
      var self = this;
      if (self.state.get('fixed') !== state) {
        if (self.state.get('rendered')) {
          var viewport = funcs.getViewPort();
          if (state) {
            self.layoutRect().y -= viewport.y;
          } else {
            self.layoutRect().y += viewport.y;
          }
        }
        self.classes.toggle('fixed', state);
        self.state.set('fixed', state);
      }
      return self;
    },
    show: function () {
      var self = this;
      var i;
      var state = self._super();
      i = visiblePanels.length;
      while (i--) {
        if (visiblePanels[i] === self) {
          break;
        }
      }
      if (i === -1) {
        visiblePanels.push(self);
      }
      return state;
    },
    hide: function () {
      removeVisiblePanel(this);
      addRemove(false, this);
      return this._super();
    },
    hideAll: function () {
      FloatPanel.hideAll();
    },
    close: function () {
      var self = this;
      if (!self.fire('close').isDefaultPrevented()) {
        self.remove();
        addRemove(false, self);
      }
      return self;
    },
    remove: function () {
      removeVisiblePanel(this);
      this._super();
    },
    postRender: function () {
      var self = this;
      if (self.settings.bodyRole) {
        this.getEl('body').setAttribute('role', self.settings.bodyRole);
      }
      return self._super();
    }
  });
  FloatPanel.hideAll = function () {
    var i = visiblePanels.length;
    while (i--) {
      var panel = visiblePanels[i];
      if (panel && panel.settings.autohide) {
        panel.hide();
        visiblePanels.splice(i, 1);
      }
    }
  };
  function removeVisiblePanel(panel) {
    var i;
    i = visiblePanels.length;
    while (i--) {
      if (visiblePanels[i] === panel) {
        visiblePanels.splice(i, 1);
      }
    }
    i = zOrder.length;
    while (i--) {
      if (zOrder[i] === panel) {
        zOrder.splice(i, 1);
      }
    }
  }

  var isFixed = function (inlineToolbarContainer) {
    return !!(inlineToolbarContainer && !Env.container);
  };
  var render$1 = function (editor, theme, args) {
    var panel, inlineToolbarContainer;
    var DOM = DOMUtils.DOM;
    var fixedToolbarContainer = getFixedToolbarContainer(editor);
    if (fixedToolbarContainer) {
      inlineToolbarContainer = DOM.select(fixedToolbarContainer)[0];
    }
    var reposition = function () {
      if (panel && panel.moveRel && panel.visible() && !panel._fixed) {
        var scrollContainer = editor.selection.getScrollContainer(), body = editor.getBody();
        var deltaX = 0, deltaY = 0;
        if (scrollContainer) {
          var bodyPos = DOM.getPos(body), scrollContainerPos = DOM.getPos(scrollContainer);
          deltaX = Math.max(0, scrollContainerPos.x - bodyPos.x);
          deltaY = Math.max(0, scrollContainerPos.y - bodyPos.y);
        }
        panel.fixed(false).moveRel(body, editor.rtl ? [
          'tr-br',
          'br-tr'
        ] : [
          'tl-bl',
          'bl-tl',
          'tr-br'
        ]).moveBy(deltaX, deltaY);
      }
    };
    var show = function () {
      if (panel) {
        panel.show();
        reposition();
        DOM.addClass(editor.getBody(), 'mce-edit-focus');
      }
    };
    var hide = function () {
      if (panel) {
        panel.hide();
        FloatPanel.hideAll();
        DOM.removeClass(editor.getBody(), 'mce-edit-focus');
      }
    };
    var render = function () {
      if (panel) {
        if (!panel.visible()) {
          show();
        }
        return;
      }
      panel = theme.panel = Factory.create({
        type: inlineToolbarContainer ? 'panel' : 'floatpanel',
        role: 'application',
        classes: 'tinymce tinymce-inline',
        layout: 'flex',
        direction: 'column',
        align: 'stretch',
        autohide: false,
        autofix: isFixed(inlineToolbarContainer),
        fixed: isFixed(inlineToolbarContainer),
        border: 1,
        items: [
          hasMenubar(editor) === false ? null : {
            type: 'menubar',
            border: '0 0 1 0',
            items: $_1q58jdshjcq8h9cl.createMenuButtons(editor)
          },
          $_chv6mlsgjcq8h9ch.createToolbars(editor, getToolbarSize(editor))
        ]
      });
      $_7bp6cis7jcq8h9by.fireBeforeRenderUI(editor);
      if (inlineToolbarContainer) {
        panel.renderTo(inlineToolbarContainer).reflow();
      } else {
        panel.renderTo().reflow();
      }
      $_fbv7ubs8jcq8h9bz.addKeys(editor, panel);
      show();
      $_4su53as9jcq8h9c1.addContextualToolbars(editor);
      editor.on('nodeChange', reposition);
      editor.on('ResizeWindow', reposition);
      editor.on('activate', show);
      editor.on('deactivate', hide);
      editor.nodeChanged();
    };
    editor.settings.content_editable = true;
    editor.on('focus', function () {
      if (isSkinDisabled(editor) === false && args.skinUiCss) {
        DOM.styleSheetLoader.load(args.skinUiCss, render, render);
      } else {
        render();
      }
    });
    editor.on('blur hide', hide);
    editor.on('remove', function () {
      if (panel) {
        panel.remove();
        panel = null;
      }
    });
    if (isSkinDisabled(editor) === false && args.skinUiCss) {
      DOM.styleSheetLoader.load(args.skinUiCss, $_awx04msljcq8h9d7.fireSkinLoaded(editor));
    } else {
      $_awx04msljcq8h9d7.fireSkinLoaded(editor)();
    }
    return {};
  };
  var $_c8boc8smjcq8h9d9 = { render: render$1 };

  var Throbber = function (elm, inline) {
    var self = this;
    var state;
    var classPrefix = Control$1.classPrefix;
    var timer;
    self.show = function (time, callback) {
      function render() {
        if (state) {
          $(elm).append('<div class="' + classPrefix + 'throbber' + (inline ? ' ' + classPrefix + 'throbber-inline' : '') + '"></div>');
          if (callback) {
            callback();
          }
        }
      }
      self.hide();
      state = true;
      if (time) {
        timer = Delay.setTimeout(render, time);
      } else {
        render();
      }
      return self;
    };
    self.hide = function () {
      var child = elm.lastChild;
      Delay.clearTimeout(timer);
      if (child && child.className.indexOf('throbber') !== -1) {
        child.parentNode.removeChild(child);
      }
      state = false;
      return self;
    };
  };

  var setup = function (editor, theme) {
    var throbber;
    editor.on('ProgressState', function (e) {
      throbber = throbber || new Throbber(theme.panel.getEl('body'));
      if (e.state) {
        throbber.show(e.time);
      } else {
        throbber.hide();
      }
    });
  };
  var $_58ahet8jcq8h9fp = { setup: setup };

  var renderUI = function (editor, theme, args) {
    var skinUrl = getSkinUrl(editor);
    if (skinUrl) {
      args.skinUiCss = skinUrl + '/skin.min.css';
      editor.contentCSS.push(skinUrl + '/content' + (editor.inline ? '.inline' : '') + '.min.css');
    }
    $_58ahet8jcq8h9fp.setup(editor, theme);
    return isInline(editor) ? $_c8boc8smjcq8h9d9.render(editor, theme, args) : $_djafeys3jcq8h9bu.render(editor, theme, args);
  };
  var $_d6ls93rzjcq8h9bo = { renderUI: renderUI };

  var Tooltip = Control$1.extend({
    Mixins: [$_dvdzmdsqjcq8h9dn],
    Defaults: { classes: 'widget tooltip tooltip-n' },
    renderHtml: function () {
      var self = this, prefix = self.classPrefix;
      return '<div id="' + self._id + '" class="' + self.classes + '" role="presentation">' + '<div class="' + prefix + 'tooltip-arrow"></div>' + '<div class="' + prefix + 'tooltip-inner">' + self.encode(self.state.get('text')) + '</div>' + '</div>';
    },
    bindStates: function () {
      var self = this;
      self.state.on('change:text', function (e) {
        self.getEl().lastChild.innerHTML = self.encode(e.value);
      });
      return self._super();
    },
    repaint: function () {
      var self = this;
      var style, rect;
      style = self.getEl().style;
      rect = self._layoutRect;
      style.left = rect.x + 'px';
      style.top = rect.y + 'px';
      style.zIndex = 65535 + 65535;
    }
  });

  var tooltip;
  var Widget = Control$1.extend({
    init: function (settings) {
      var self = this;
      self._super(settings);
      settings = self.settings;
      self.canFocus = true;
      if (settings.tooltip && Widget.tooltips !== false) {
        self.on('mouseenter', function (e) {
          var tooltip = self.tooltip().moveTo(-65535);
          if (e.control === self) {
            var rel = tooltip.text(settings.tooltip).show().testMoveRel(self.getEl(), [
              'bc-tc',
              'bc-tl',
              'bc-tr'
            ]);
            tooltip.classes.toggle('tooltip-n', rel === 'bc-tc');
            tooltip.classes.toggle('tooltip-nw', rel === 'bc-tl');
            tooltip.classes.toggle('tooltip-ne', rel === 'bc-tr');
            tooltip.moveRel(self.getEl(), rel);
          } else {
            tooltip.hide();
          }
        });
        self.on('mouseleave mousedown click', function () {
          self.tooltip().hide();
        });
      }
      self.aria('label', settings.ariaLabel || settings.tooltip);
    },
    tooltip: function () {
      if (!tooltip) {
        tooltip = new Tooltip({ type: 'tooltip' });
        tooltip.renderTo();
      }
      return tooltip;
    },
    postRender: function () {
      var self = this, settings = self.settings;
      self._super();
      if (!self.parent() && (settings.width || settings.height)) {
        self.initLayoutRect();
        self.repaint();
      }
      if (settings.autofocus) {
        self.focus();
      }
    },
    bindStates: function () {
      var self = this;
      function disable(state) {
        self.aria('disabled', state);
        self.classes.toggle('disabled', state);
      }
      function active(state) {
        self.aria('pressed', state);
        self.classes.toggle('active', state);
      }
      self.state.on('change:disabled', function (e) {
        disable(e.value);
      });
      self.state.on('change:active', function (e) {
        active(e.value);
      });
      if (self.state.get('disabled')) {
        disable(true);
      }
      if (self.state.get('active')) {
        active(true);
      }
      return self._super();
    },
    remove: function () {
      this._super();
      if (tooltip) {
        tooltip.remove();
        tooltip = null;
      }
    }
  });

  var Progress = Widget.extend({
    Defaults: { value: 0 },
    init: function (settings) {
      var self = this;
      self._super(settings);
      self.classes.add('progress');
      if (!self.settings.filter) {
        self.settings.filter = function (value) {
          return Math.round(value);
        };
      }
    },
    renderHtml: function () {
      var self = this, id = self._id, prefix = this.classPrefix;
      return '<div id="' + id + '" class="' + self.classes + '">' + '<div class="' + prefix + 'bar-container">' + '<div class="' + prefix + 'bar"></div>' + '</div>' + '<div class="' + prefix + 'text">0%</div>' + '</div>';
    },
    postRender: function () {
      var self = this;
      self._super();
      self.value(self.settings.value);
      return self;
    },
    bindStates: function () {
      var self = this;
      function setValue(value) {
        value = self.settings.filter(value);
        self.getEl().lastChild.innerHTML = value + '%';
        self.getEl().firstChild.firstChild.style.width = value + '%';
      }
      self.state.on('change:value', function (e) {
        setValue(e.value);
      });
      setValue(self.state.get('value'));
      return self._super();
    }
  });

  var updateLiveRegion = function (ctx, text) {
    ctx.getEl().lastChild.textContent = text + (ctx.progressBar ? ' ' + ctx.progressBar.value() + '%' : '');
  };
  var Notification = Control$1.extend({
    Mixins: [$_dvdzmdsqjcq8h9dn],
    Defaults: { classes: 'widget notification' },
    init: function (settings) {
      var self = this;
      self._super(settings);
      self.maxWidth = settings.maxWidth;
      if (settings.text) {
        self.text(settings.text);
      }
      if (settings.icon) {
        self.icon = settings.icon;
      }
      if (settings.color) {
        self.color = settings.color;
      }
      if (settings.type) {
        self.classes.add('notification-' + settings.type);
      }
      if (settings.timeout && (settings.timeout < 0 || settings.timeout > 0) && !settings.closeButton) {
        self.closeButton = false;
      } else {
        self.classes.add('has-close');
        self.closeButton = true;
      }
      if (settings.progressBar) {
        self.progressBar = new Progress();
      }
      self.on('click', function (e) {
        if (e.target.className.indexOf(self.classPrefix + 'close') !== -1) {
          self.close();
        }
      });
    },
    renderHtml: function () {
      var self = this;
      var prefix = self.classPrefix;
      var icon = '', closeButton = '', progressBar = '', notificationStyle = '';
      if (self.icon) {
        icon = '<i class="' + prefix + 'ico' + ' ' + prefix + 'i-' + self.icon + '"></i>';
      }
      notificationStyle = ' style="max-width: ' + self.maxWidth + 'px;' + (self.color ? 'background-color: ' + self.color + ';"' : '"');
      if (self.closeButton) {
        closeButton = '<button type="button" class="' + prefix + 'close" aria-hidden="true">\xD7</button>';
      }
      if (self.progressBar) {
        progressBar = self.progressBar.renderHtml();
      }
      return '<div id="' + self._id + '" class="' + self.classes + '"' + notificationStyle + ' role="presentation">' + icon + '<div class="' + prefix + 'notification-inner">' + self.state.get('text') + '</div>' + progressBar + closeButton + '<div style="clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;width: 1px;"' + ' aria-live="assertive" aria-relevant="additions" aria-atomic="true"></div>' + '</div>';
    },
    postRender: function () {
      var self = this;
      Delay.setTimeout(function () {
        self.$el.addClass(self.classPrefix + 'in');
        updateLiveRegion(self, self.state.get('text'));
      }, 100);
      return self._super();
    },
    bindStates: function () {
      var self = this;
      self.state.on('change:text', function (e) {
        self.getEl().firstChild.innerHTML = e.value;
        updateLiveRegion(self, e.value);
      });
      if (self.progressBar) {
        self.progressBar.bindStates();
        self.progressBar.state.on('change:value', function (e) {
          updateLiveRegion(self, self.state.get('text'));
        });
      }
      return self._super();
    },
    close: function () {
      var self = this;
      if (!self.fire('close').isDefaultPrevented()) {
        self.remove();
      }
      return self;
    },
    repaint: function () {
      var self = this;
      var style, rect;
      style = self.getEl().style;
      rect = self._layoutRect;
      style.left = rect.x + 'px';
      style.top = rect.y + 'px';
      style.zIndex = 65535 - 1;
    }
  });

  var NotificationManagerImpl = function (editor) {
    var getEditorContainer = function (editor) {
      return editor.inline ? editor.getElement() : editor.getContentAreaContainer();
    };
    var getContainerWidth = function () {
      var container = getEditorContainer(editor);
      return funcs.getSize(container).width;
    };
    var prePositionNotifications = function (notifications) {
      $_flnht0sijcq8h9cx.each(notifications, function (notification) {
        notification.moveTo(0, 0);
      });
    };
    var positionNotifications = function (notifications) {
      if (notifications.length > 0) {
        var firstItem = notifications.slice(0, 1)[0];
        var container = getEditorContainer(editor);
        firstItem.moveRel(container, 'tc-tc');
        $_flnht0sijcq8h9cx.each(notifications, function (notification, index) {
          if (index > 0) {
            notification.moveRel(notifications[index - 1].getEl(), 'bc-tc');
          }
        });
      }
    };
    var reposition = function (notifications) {
      prePositionNotifications(notifications);
      positionNotifications(notifications);
    };
    var open = function (args, closeCallback) {
      var extendedArgs = Tools.extend(args, { maxWidth: getContainerWidth() });
      var notif = new Notification(extendedArgs);
      notif.args = extendedArgs;
      if (extendedArgs.timeout > 0) {
        notif.timer = setTimeout(function () {
          notif.close();
          closeCallback();
        }, extendedArgs.timeout);
      }
      notif.on('close', function () {
        closeCallback();
      });
      notif.renderTo();
      return notif;
    };
    var close = function (notification) {
      notification.close();
    };
    var getArgs = function (notification) {
      return notification.args;
    };
    return {
      open: open,
      close: close,
      reposition: reposition,
      getArgs: getArgs
    };
  };

  var windows = [];
  var oldMetaValue = '';
  function toggleFullScreenState(state) {
    var noScaleMetaValue = 'width=device-width,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0';
    var viewport = $('meta[name=viewport]')[0], contentValue;
    if (Env.overrideViewPort === false) {
      return;
    }
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.getElementsByTagName('head')[0].appendChild(viewport);
    }
    contentValue = viewport.getAttribute('content');
    if (contentValue && typeof oldMetaValue !== 'undefined') {
      oldMetaValue = contentValue;
    }
    viewport.setAttribute('content', state ? noScaleMetaValue : oldMetaValue);
  }
  function toggleBodyFullScreenClasses(classPrefix, state) {
    if (checkFullscreenWindows() && state === false) {
      $([
        document.documentElement,
        document.body
      ]).removeClass(classPrefix + 'fullscreen');
    }
  }
  function checkFullscreenWindows() {
    for (var i = 0; i < windows.length; i++) {
      if (windows[i]._fullscreen) {
        return true;
      }
    }
    return false;
  }
  function handleWindowResize() {
    if (!Env.desktop) {
      var lastSize_1 = {
        w: window.innerWidth,
        h: window.innerHeight
      };
      Delay.setInterval(function () {
        var w = window.innerWidth, h = window.innerHeight;
        if (lastSize_1.w !== w || lastSize_1.h !== h) {
          lastSize_1 = {
            w: w,
            h: h
          };
          $(window).trigger('resize');
        }
      }, 100);
    }
    function reposition() {
      var i;
      var rect = funcs.getWindowSize();
      var layoutRect;
      for (i = 0; i < windows.length; i++) {
        layoutRect = windows[i].layoutRect();
        windows[i].moveTo(windows[i].settings.x || Math.max(0, rect.w / 2 - layoutRect.w / 2), windows[i].settings.y || Math.max(0, rect.h / 2 - layoutRect.h / 2));
      }
    }
    $(window).on('resize', reposition);
  }
  var Window = FloatPanel.extend({
    modal: true,
    Defaults: {
      border: 1,
      layout: 'flex',
      containerCls: 'panel',
      role: 'dialog',
      callbacks: {
        submit: function () {
          this.fire('submit', { data: this.toJSON() });
        },
        close: function () {
          this.close();
        }
      }
    },
    init: function (settings) {
      var self = this;
      self._super(settings);
      if (self.isRtl()) {
        self.classes.add('rtl');
      }
      self.classes.add('window');
      self.bodyClasses.add('window-body');
      self.state.set('fixed', true);
      if (settings.buttons) {
        self.statusbar = new Panel({
          layout: 'flex',
          border: '1 0 0 0',
          spacing: 3,
          padding: 10,
          align: 'center',
          pack: self.isRtl() ? 'start' : 'end',
          defaults: { type: 'button' },
          items: settings.buttons
        });
        self.statusbar.classes.add('foot');
        self.statusbar.parent(self);
      }
      self.on('click', function (e) {
        var closeClass = self.classPrefix + 'close';
        if (funcs.hasClass(e.target, closeClass) || funcs.hasClass(e.target.parentNode, closeClass)) {
          self.close();
        }
      });
      self.on('cancel', function () {
        self.close();
      });
      self.aria('describedby', self.describedBy || self._id + '-none');
      self.aria('label', settings.title);
      self._fullscreen = false;
    },
    recalc: function () {
      var self = this;
      var statusbar = self.statusbar;
      var layoutRect, width, x, needsRecalc;
      if (self._fullscreen) {
        self.layoutRect(funcs.getWindowSize());
        self.layoutRect().contentH = self.layoutRect().innerH;
      }
      self._super();
      layoutRect = self.layoutRect();
      if (self.settings.title && !self._fullscreen) {
        width = layoutRect.headerW;
        if (width > layoutRect.w) {
          x = layoutRect.x - Math.max(0, width / 2);
          self.layoutRect({
            w: width,
            x: x
          });
          needsRecalc = true;
        }
      }
      if (statusbar) {
        statusbar.layoutRect({ w: self.layoutRect().innerW }).recalc();
        width = statusbar.layoutRect().minW + layoutRect.deltaW;
        if (width > layoutRect.w) {
          x = layoutRect.x - Math.max(0, width - layoutRect.w);
          self.layoutRect({
            w: width,
            x: x
          });
          needsRecalc = true;
        }
      }
      if (needsRecalc) {
        self.recalc();
      }
    },
    initLayoutRect: function () {
      var self = this;
      var layoutRect = self._super();
      var deltaH = 0, headEl;
      if (self.settings.title && !self._fullscreen) {
        headEl = self.getEl('head');
        var size = funcs.getSize(headEl);
        layoutRect.headerW = size.width;
        layoutRect.headerH = size.height;
        deltaH += layoutRect.headerH;
      }
      if (self.statusbar) {
        deltaH += self.statusbar.layoutRect().h;
      }
      layoutRect.deltaH += deltaH;
      layoutRect.minH += deltaH;
      layoutRect.h += deltaH;
      var rect = funcs.getWindowSize();
      layoutRect.x = self.settings.x || Math.max(0, rect.w / 2 - layoutRect.w / 2);
      layoutRect.y = self.settings.y || Math.max(0, rect.h / 2 - layoutRect.h / 2);
      return layoutRect;
    },
    renderHtml: function () {
      var self = this, layout = self._layout, id = self._id, prefix = self.classPrefix;
      var settings = self.settings;
      var headerHtml = '', footerHtml = '', html = settings.html;
      self.preRender();
      layout.preRender(self);
      if (settings.title) {
        headerHtml = '<div id="' + id + '-head" class="' + prefix + 'window-head">' + '<div id="' + id + '-title" class="' + prefix + 'title">' + self.encode(settings.title) + '</div>' + '<div id="' + id + '-dragh" class="' + prefix + 'dragh"></div>' + '<button type="button" class="' + prefix + 'close" aria-hidden="true">' + '<i class="mce-ico mce-i-remove"></i>' + '</button>' + '</div>';
      }
      if (settings.url) {
        html = '<iframe src="' + settings.url + '" tabindex="-1"></iframe>';
      }
      if (typeof html === 'undefined') {
        html = layout.renderHtml(self);
      }
      if (self.statusbar) {
        footerHtml = self.statusbar.renderHtml();
      }
      return '<div id="' + id + '" class="' + self.classes + '" hidefocus="1">' + '<div class="' + self.classPrefix + 'reset" role="application">' + headerHtml + '<div id="' + id + '-body" class="' + self.bodyClasses + '">' + html + '</div>' + footerHtml + '</div>' + '</div>';
    },
    fullscreen: function (state) {
      var self = this;
      var documentElement = document.documentElement;
      var slowRendering;
      var prefix = self.classPrefix;
      var layoutRect;
      if (state !== self._fullscreen) {
        $(window).on('resize', function () {
          var time;
          if (self._fullscreen) {
            if (!slowRendering) {
              time = new Date().getTime();
              var rect = funcs.getWindowSize();
              self.moveTo(0, 0).resizeTo(rect.w, rect.h);
              if (new Date().getTime() - time > 50) {
                slowRendering = true;
              }
            } else {
              if (!self._timer) {
                self._timer = Delay.setTimeout(function () {
                  var rect = funcs.getWindowSize();
                  self.moveTo(0, 0).resizeTo(rect.w, rect.h);
                  self._timer = 0;
                }, 50);
              }
            }
          }
        });
        layoutRect = self.layoutRect();
        self._fullscreen = state;
        if (!state) {
          self.borderBox = $_3xgdaaswjcq8h9et.parseBox(self.settings.border);
          self.getEl('head').style.display = '';
          layoutRect.deltaH += layoutRect.headerH;
          $([
            documentElement,
            document.body
          ]).removeClass(prefix + 'fullscreen');
          self.classes.remove('fullscreen');
          self.moveTo(self._initial.x, self._initial.y).resizeTo(self._initial.w, self._initial.h);
        } else {
          self._initial = {
            x: layoutRect.x,
            y: layoutRect.y,
            w: layoutRect.w,
            h: layoutRect.h
          };
          self.borderBox = $_3xgdaaswjcq8h9et.parseBox('0');
          self.getEl('head').style.display = 'none';
          layoutRect.deltaH -= layoutRect.headerH + 2;
          $([
            documentElement,
            document.body
          ]).addClass(prefix + 'fullscreen');
          self.classes.add('fullscreen');
          var rect = funcs.getWindowSize();
          self.moveTo(0, 0).resizeTo(rect.w, rect.h);
        }
      }
      return self.reflow();
    },
    postRender: function () {
      var self = this;
      var startPos;
      setTimeout(function () {
        self.classes.add('in');
        self.fire('open');
      }, 0);
      self._super();
      if (self.statusbar) {
        self.statusbar.postRender();
      }
      self.focus();
      this.dragHelper = new DragHelper(self._id + '-dragh', {
        start: function () {
          startPos = {
            x: self.layoutRect().x,
            y: self.layoutRect().y
          };
        },
        drag: function (e) {
          self.moveTo(startPos.x + e.deltaX, startPos.y + e.deltaY);
        }
      });
      self.on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
          self.close();
        }
      });
      windows.push(self);
      toggleFullScreenState(true);
    },
    submit: function () {
      return this.fire('submit', { data: this.toJSON() });
    },
    remove: function () {
      var self = this;
      var i;
      self.dragHelper.destroy();
      self._super();
      if (self.statusbar) {
        this.statusbar.remove();
      }
      toggleBodyFullScreenClasses(self.classPrefix, false);
      i = windows.length;
      while (i--) {
        if (windows[i] === self) {
          windows.splice(i, 1);
        }
      }
      toggleFullScreenState(windows.length > 0);
    },
    getContentWindow: function () {
      var ifr = this.getEl().getElementsByTagName('iframe')[0];
      return ifr ? ifr.contentWindow : null;
    }
  });
  handleWindowResize();

  var MessageBox = Window.extend({
    init: function (settings) {
      settings = {
        border: 1,
        padding: 20,
        layout: 'flex',
        pack: 'center',
        align: 'center',
        containerCls: 'panel',
        autoScroll: true,
        buttons: {
          type: 'button',
          text: 'Ok',
          action: 'ok'
        },
        items: {
          type: 'label',
          multiline: true,
          maxWidth: 500,
          maxHeight: 200
        }
      };
      this._super(settings);
    },
    Statics: {
      OK: 1,
      OK_CANCEL: 2,
      YES_NO: 3,
      YES_NO_CANCEL: 4,
      msgBox: function (settings) {
        var buttons;
        var callback = settings.callback || function () {
        };
        function createButton(text, status, primary) {
          return {
            type: 'button',
            text: text,
            subtype: primary ? 'primary' : '',
            onClick: function (e) {
              e.control.parents()[1].close();
              callback(status);
            }
          };
        }
        switch (settings.buttons) {
        case MessageBox.OK_CANCEL:
          buttons = [
            createButton('Ok', true, true),
            createButton('Cancel', false)
          ];
          break;
        case MessageBox.YES_NO:
        case MessageBox.YES_NO_CANCEL:
          buttons = [
            createButton('Yes', 1, true),
            createButton('No', 0)
          ];
          if (settings.buttons === MessageBox.YES_NO_CANCEL) {
            buttons.push(createButton('Cancel', -1));
          }
          break;
        default:
          buttons = [createButton('Ok', true, true)];
          break;
        }
        return new Window({
          padding: 20,
          x: settings.x,
          y: settings.y,
          minWidth: 300,
          minHeight: 100,
          layout: 'flex',
          pack: 'center',
          align: 'center',
          buttons: buttons,
          title: settings.title,
          role: 'alertdialog',
          items: {
            type: 'label',
            multiline: true,
            maxWidth: 500,
            maxHeight: 200,
            text: settings.text
          },
          onPostRender: function () {
            this.aria('describedby', this.items()[0]._id);
          },
          onClose: settings.onClose,
          onCancel: function () {
            callback(false);
          }
        }).renderTo(document.body).reflow();
      },
      alert: function (settings, callback) {
        if (typeof settings === 'string') {
          settings = { text: settings };
        }
        settings.callback = callback;
        return MessageBox.msgBox(settings);
      },
      confirm: function (settings, callback) {
        if (typeof settings === 'string') {
          settings = { text: settings };
        }
        settings.callback = callback;
        settings.buttons = MessageBox.OK_CANCEL;
        return MessageBox.msgBox(settings);
      }
    }
  });

  var WindowManagerImpl = function (editor) {
    var open = function (args, params, closeCallback) {
      var win;
      args.title = args.title || ' ';
      args.url = args.url || args.file;
      if (args.url) {
        args.width = parseInt(args.width || 320, 10);
        args.height = parseInt(args.height || 240, 10);
      }
      if (args.body) {
        args.items = {
          defaults: args.defaults,
          type: args.bodyType || 'form',
          items: args.body,
          data: args.data,
          callbacks: args.commands
        };
      }
      if (!args.url && !args.buttons) {
        args.buttons = [
          {
            text: 'Ok',
            subtype: 'primary',
            onclick: function () {
              win.find('form')[0].submit();
            }
          },
          {
            text: 'Cancel',
            onclick: function () {
              win.close();
            }
          }
        ];
      }
      win = new Window(args);
      win.on('close', function () {
        closeCallback(win);
      });
      if (args.data) {
        win.on('postRender', function () {
          this.find('*').each(function (ctrl) {
            var name = ctrl.name();
            if (name in args.data) {
              ctrl.value(args.data[name]);
            }
          });
        });
      }
      win.features = args || {};
      win.params = params || {};
      win = win.renderTo().reflow();
      return win;
    };
    var alert = function (message, choiceCallback, closeCallback) {
      var win;
      win = MessageBox.alert(message, function () {
        choiceCallback();
      });
      win.on('close', function () {
        closeCallback(win);
      });
      return win;
    };
    var confirm = function (message, choiceCallback, closeCallback) {
      var win;
      win = MessageBox.confirm(message, function (state) {
        choiceCallback(state);
      });
      win.on('close', function () {
        closeCallback(win);
      });
      return win;
    };
    var close = function (window) {
      window.close();
    };
    var getParams = function (window) {
      return window.params;
    };
    var setParams = function (window, params) {
      window.params = params;
    };
    return {
      open: open,
      alert: alert,
      confirm: confirm,
      close: close,
      getParams: getParams,
      setParams: setParams
    };
  };

  var get = function (editor) {
    var renderUI = function (args) {
      return $_d6ls93rzjcq8h9bo.renderUI(editor, this, args);
    };
    var resizeTo = function (w, h) {
      return $_50isi6sjjcq8h9d2.resizeTo(editor, w, h);
    };
    var resizeBy = function (dw, dh) {
      return $_50isi6sjjcq8h9d2.resizeBy(editor, dw, dh);
    };
    var getNotificationManagerImpl = function () {
      return NotificationManagerImpl(editor);
    };
    var getWindowManagerImpl = function () {
      return WindowManagerImpl(editor);
    };
    return {
      renderUI: renderUI,
      resizeTo: resizeTo,
      resizeBy: resizeBy,
      getNotificationManagerImpl: getNotificationManagerImpl,
      getWindowManagerImpl: getWindowManagerImpl
    };
  };
  var $_1zr8coryjcq8h9bn = { get: get };

  var Layout = Class.extend({
    Defaults: {
      firstControlClass: 'first',
      lastControlClass: 'last'
    },
    init: function (settings) {
      this.settings = Tools.extend({}, this.Defaults, settings);
    },
    preRender: function (container) {
      container.bodyClasses.add(this.settings.containerClass);
    },
    applyClasses: function (items) {
      var self = this;
      var settings = self.settings;
      var firstClass, lastClass, firstItem, lastItem;
      firstClass = settings.firstControlClass;
      lastClass = settings.lastControlClass;
      items.each(function (item) {
        item.classes.remove(firstClass).remove(lastClass).add(settings.controlClass);
        if (item.visible()) {
          if (!firstItem) {
            firstItem = item;
          }
          lastItem = item;
        }
      });
      if (firstItem) {
        firstItem.classes.add(firstClass);
      }
      if (lastItem) {
        lastItem.classes.add(lastClass);
      }
    },
    renderHtml: function (container) {
      var self = this;
      var html = '';
      self.applyClasses(container.items());
      container.items().each(function (item) {
        html += item.renderHtml();
      });
      return html;
    },
    recalc: function () {
    },
    postRender: function () {
    },
    isNative: function () {
      return false;
    }
  });

  var AbsoluteLayout = Layout.extend({
    Defaults: {
      containerClass: 'abs-layout',
      controlClass: 'abs-layout-item'
    },
    recalc: function (container) {
      container.items().filter(':visible').each(function (ctrl) {
        var settings = ctrl.settings;
        ctrl.layoutRect({
          x: settings.x,
          y: settings.y,
          w: settings.w,
          h: settings.h
        });
        if (ctrl.recalc) {
          ctrl.recalc();
        }
      });
    },
    renderHtml: function (container) {
      return '<div id="' + container._id + '-absend" class="' + container.classPrefix + 'abs-end"></div>' + this._super(container);
    }
  });

  var Button = Widget.extend({
    Defaults: {
      classes: 'widget btn',
      role: 'button'
    },
    init: function (settings) {
      var self = this;
      var size;
      self._super(settings);
      settings = self.settings;
      size = self.settings.size;
      self.on('click mousedown', function (e) {
        e.preventDefault();
      });
      self.on('touchstart', function (e) {
        self.fire('click', e);
        e.preventDefault();
      });
      if (settings.subtype) {
        self.classes.add(settings.subtype);
      }
      if (size) {
        self.classes.add('btn-' + size);
      }
      if (settings.icon) {
        self.icon(settings.icon);
      }
    },
    icon: function (icon) {
      if (!arguments.length) {
        return this.state.get('icon');
      }
      this.state.set('icon', icon);
      return this;
    },
    repaint: function () {
      var btnElm = this.getEl().firstChild;
      var btnStyle;
      if (btnElm) {
        btnStyle = btnElm.style;
        btnStyle.width = btnStyle.height = '100%';
      }
      this._super();
    },
    renderHtml: function () {
      var self = this, id = self._id, prefix = self.classPrefix;
      var icon = self.state.get('icon'), image;
      var text = self.state.get('text');
      var textHtml = '';
      var ariaPressed;
      var settings = self.settings;
      image = settings.image;
      if (image) {
        icon = 'none';
        if (typeof image !== 'string') {
          image = window.getSelection ? image[0] : image[1];
        }
        image = ' style="background-image: url(\'' + image + '\')"';
      } else {
        image = '';
      }
      if (text) {
        self.classes.add('btn-has-text');
        textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>';
      }
      icon = icon ? prefix + 'ico ' + prefix + 'i-' + icon : '';
      ariaPressed = typeof settings.active === 'boolean' ? ' aria-pressed="' + settings.active + '"' : '';
      return '<div id="' + id + '" class="' + self.classes + '" tabindex="-1"' + ariaPressed + '>' + '<button id="' + id + '-button" role="presentation" type="button" tabindex="-1">' + (icon ? '<i class="' + icon + '"' + image + '></i>' : '') + textHtml + '</button>' + '</div>';
    },
    bindStates: function () {
      var self = this, $ = self.$, textCls = self.classPrefix + 'txt';
      function setButtonText(text) {
        var $span = $('span.' + textCls, self.getEl());
        if (text) {
          if (!$span[0]) {
            $('button:first', self.getEl()).append('<span class="' + textCls + '"></span>');
            $span = $('span.' + textCls, self.getEl());
          }
          $span.html(self.encode(text));
        } else {
          $span.remove();
        }
        self.classes.toggle('btn-has-text', !!text);
      }
      self.state.on('change:text', function (e) {
        setButtonText(e.value);
      });
      self.state.on('change:icon', function (e) {
        var icon = e.value;
        var prefix = self.classPrefix;
        self.settings.icon = icon;
        icon = icon ? prefix + 'ico ' + prefix + 'i-' + self.settings.icon : '';
        var btnElm = self.getEl().firstChild;
        var iconElm = btnElm.getElementsByTagName('i')[0];
        if (icon) {
          if (!iconElm || iconElm !== btnElm.firstChild) {
            iconElm = document.createElement('i');
            btnElm.insertBefore(iconElm, btnElm.firstChild);
          }
          iconElm.className = icon;
        } else if (iconElm) {
          btnElm.removeChild(iconElm);
        }
        setButtonText(self.state.get('text'));
      });
      return self._super();
    }
  });

  var BrowseButton = Button.extend({
    init: function (settings) {
      var self = this;
      settings = Tools.extend({
        text: 'Browse...',
        multiple: false,
        accept: null
      }, settings);
      self._super(settings);
      self.classes.add('browsebutton');
      if (settings.multiple) {
        self.classes.add('multiple');
      }
    },
    postRender: function () {
      var self = this;
      var input = funcs.create('input', {
        type: 'file',
        id: self._id + '-browse',
        accept: self.settings.accept
      });
      self._super();
      $(input).on('change', function (e) {
        var files = e.target.files;
        self.value = function () {
          if (!files.length) {
            return null;
          } else if (self.settings.multiple) {
            return files;
          } else {
            return files[0];
          }
        };
        e.preventDefault();
        if (files.length) {
          self.fire('change', e);
        }
      });
      $(input).on('click', function (e) {
        e.stopPropagation();
      });
      $(self.getEl('button')).on('click', function (e) {
        e.stopPropagation();
        input.click();
      });
      self.getEl().appendChild(input);
    },
    remove: function () {
      $(this.getEl('button')).off();
      $(this.getEl('input')).off();
      this._super();
    }
  });

  var ButtonGroup = Container.extend({
    Defaults: {
      defaultType: 'button',
      role: 'group'
    },
    renderHtml: function () {
      var self = this, layout = self._layout;
      self.classes.add('btn-group');
      self.preRender();
      layout.preRender(self);
      return '<div id="' + self._id + '" class="' + self.classes + '">' + '<div id="' + self._id + '-body">' + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</div>';
    }
  });

  var Checkbox = Widget.extend({
    Defaults: {
      classes: 'checkbox',
      role: 'checkbox',
      checked: false
    },
    init: function (settings) {
      var self = this;
      self._super(settings);
      self.on('click mousedown', function (e) {
        e.preventDefault();
      });
      self.on('click', function (e) {
        e.preventDefault();
        if (!self.disabled()) {
          self.checked(!self.checked());
        }
      });
      self.checked(self.settings.checked);
    },
    checked: function (state) {
      if (!arguments.length) {
        return this.state.get('checked');
      }
      this.state.set('checked', state);
      return this;
    },
    value: function (state) {
      if (!arguments.length) {
        return this.checked();
      }
      return this.checked(state);
    },
    renderHtml: function () {
      var self = this, id = self._id, prefix = self.classPrefix;
      return '<div id="' + id + '" class="' + self.classes + '" unselectable="on" aria-labelledby="' + id + '-al" tabindex="-1">' + '<i class="' + prefix + 'ico ' + prefix + 'i-checkbox"></i>' + '<span id="' + id + '-al" class="' + prefix + 'label">' + self.encode(self.state.get('text')) + '</span>' + '</div>';
    },
    bindStates: function () {
      var self = this;
      function checked(state) {
        self.classes.toggle('checked', state);
        self.aria('checked', state);
      }
      self.state.on('change:text', function (e) {
        self.getEl('al').firstChild.data = self.translate(e.value);
      });
      self.state.on('change:checked change:value', function (e) {
        self.fire('change');
        checked(e.value);
      });
      self.state.on('change:icon', function (e) {
        var icon = e.value;
        var prefix = self.classPrefix;
        if (typeof icon === 'undefined') {
          return self.settings.icon;
        }
        self.settings.icon = icon;
        icon = icon ? prefix + 'ico ' + prefix + 'i-' + self.settings.icon : '';
        var btnElm = self.getEl().firstChild;
        var iconElm = btnElm.getElementsByTagName('i')[0];
        if (icon) {
          if (!iconElm || iconElm !== btnElm.firstChild) {
            iconElm = document.createElement('i');
            btnElm.insertBefore(iconElm, btnElm.firstChild);
          }
          iconElm.className = icon;
        } else if (iconElm) {
          btnElm.removeChild(iconElm);
        }
      });
      if (self.state.get('checked')) {
        checked(true);
      }
      return self._super();
    }
  });

  var VK = tinymce.util.Tools.resolve('tinymce.util.VK');

  var ComboBox = Widget.extend({
    init: function (settings) {
      var self = this;
      self._super(settings);
      settings = self.settings;
      self.classes.add('combobox');
      self.subinput = true;
      self.ariaTarget = 'inp';
      settings.menu = settings.menu || settings.values;
      if (settings.menu) {
        settings.icon = 'caret';
      }
      self.on('click', function (e) {
        var elm = e.target;
        var root = self.getEl();
        if (!$.contains(root, elm) && elm !== root) {
          return;
        }
        while (elm && elm !== root) {
          if (elm.id && elm.id.indexOf('-open') !== -1) {
            self.fire('action');
            if (settings.menu) {
              self.showMenu();
              if (e.aria) {
                self.menu.items()[0].focus();
              }
            }
          }
          elm = elm.parentNode;
        }
      });
      self.on('keydown', function (e) {
        var rootControl;
        if (e.keyCode === 13 && e.target.nodeName === 'INPUT') {
          e.preventDefault();
          self.parents().reverse().each(function (ctrl) {
            if (ctrl.toJSON) {
              rootControl = ctrl;
              return false;
            }
          });
          self.fire('submit', { data: rootControl.toJSON() });
        }
      });
      self.on('keyup', function (e) {
        if (e.target.nodeName === 'INPUT') {
          var oldValue = self.state.get('value');
          var newValue = e.target.value;
          if (newValue !== oldValue) {
            self.state.set('value', newValue);
            self.fire('autocomplete', e);
          }
        }
      });
      self.on('mouseover', function (e) {
        var tooltip = self.tooltip().moveTo(-65535);
        if (self.statusLevel() && e.target.className.indexOf(self.classPrefix + 'status') !== -1) {
          var statusMessage = self.statusMessage() || 'Ok';
          var rel = tooltip.text(statusMessage).show().testMoveRel(e.target, [
            'bc-tc',
            'bc-tl',
            'bc-tr'
          ]);
          tooltip.classes.toggle('tooltip-n', rel === 'bc-tc');
          tooltip.classes.toggle('tooltip-nw', rel === 'bc-tl');
          tooltip.classes.toggle('tooltip-ne', rel === 'bc-tr');
          tooltip.moveRel(e.target, rel);
        }
      });
    },
    statusLevel: function (value) {
      if (arguments.length > 0) {
        this.state.set('statusLevel', value);
      }
      return this.state.get('statusLevel');
    },
    statusMessage: function (value) {
      if (arguments.length > 0) {
        this.state.set('statusMessage', value);
      }
      return this.state.get('statusMessage');
    },
    showMenu: function () {
      var self = this;
      var settings = self.settings;
      var menu;
      if (!self.menu) {
        menu = settings.menu || [];
        if (menu.length) {
          menu = {
            type: 'menu',
            items: menu
          };
        } else {
          menu.type = menu.type || 'menu';
        }
        self.menu = Factory.create(menu).parent(self).renderTo(self.getContainerElm());
        self.fire('createmenu');
        self.menu.reflow();
        self.menu.on('cancel', function (e) {
          if (e.control === self.menu) {
            self.focus();
          }
        });
        self.menu.on('show hide', function (e) {
          e.control.items().each(function (ctrl) {
            ctrl.active(ctrl.value() === self.value());
          });
        }).fire('show');
        self.menu.on('select', function (e) {
          self.value(e.control.value());
        });
        self.on('focusin', function (e) {
          if (e.target.tagName.toUpperCase() === 'INPUT') {
            self.menu.hide();
          }
        });
        self.aria('expanded', true);
      }
      self.menu.show();
      self.menu.layoutRect({ w: self.layoutRect().w });
      self.menu.moveRel(self.getEl(), self.isRtl() ? [
        'br-tr',
        'tr-br'
      ] : [
        'bl-tl',
        'tl-bl'
      ]);
    },
    focus: function () {
      this.getEl('inp').focus();
    },
    repaint: function () {
      var self = this, elm = self.getEl(), openElm = self.getEl('open'), rect = self.layoutRect();
      var width, lineHeight, innerPadding = 0;
      var inputElm = elm.firstChild;
      if (self.statusLevel() && self.statusLevel() !== 'none') {
        innerPadding = parseInt(funcs.getRuntimeStyle(inputElm, 'padding-right'), 10) - parseInt(funcs.getRuntimeStyle(inputElm, 'padding-left'), 10);
      }
      if (openElm) {
        width = rect.w - funcs.getSize(openElm).width - 10;
      } else {
        width = rect.w - 10;
      }
      var doc = document;
      if (doc.all && (!doc.documentMode || doc.documentMode <= 8)) {
        lineHeight = self.layoutRect().h - 2 + 'px';
      }
      $(inputElm).css({
        width: width - innerPadding,
        lineHeight: lineHeight
      });
      self._super();
      return self;
    },
    postRender: function () {
      var self = this;
      $(this.getEl('inp')).on('change', function (e) {
        self.state.set('value', e.target.value);
        self.fire('change', e);
      });
      return self._super();
    },
    renderHtml: function () {
      var self = this, id = self._id, settings = self.settings, prefix = self.classPrefix;
      var value = self.state.get('value') || '';
      var icon, text, openBtnHtml = '', extraAttrs = '', statusHtml = '';
      if ('spellcheck' in settings) {
        extraAttrs += ' spellcheck="' + settings.spellcheck + '"';
      }
      if (settings.maxLength) {
        extraAttrs += ' maxlength="' + settings.maxLength + '"';
      }
      if (settings.size) {
        extraAttrs += ' size="' + settings.size + '"';
      }
      if (settings.subtype) {
        extraAttrs += ' type="' + settings.subtype + '"';
      }
      statusHtml = '<i id="' + id + '-status" class="mce-status mce-ico" style="display: none"></i>';
      if (self.disabled()) {
        extraAttrs += ' disabled="disabled"';
      }
      icon = settings.icon;
      if (icon && icon !== 'caret') {
        icon = prefix + 'ico ' + prefix + 'i-' + settings.icon;
      }
      text = self.state.get('text');
      if (icon || text) {
        openBtnHtml = '<div id="' + id + '-open" class="' + prefix + 'btn ' + prefix + 'open" tabIndex="-1" role="button">' + '<button id="' + id + '-action" type="button" hidefocus="1" tabindex="-1">' + (icon !== 'caret' ? '<i class="' + icon + '"></i>' : '<i class="' + prefix + 'caret"></i>') + (text ? (icon ? ' ' : '') + text : '') + '</button>' + '</div>';
        self.classes.add('has-open');
      }
      return '<div id="' + id + '" class="' + self.classes + '">' + '<input id="' + id + '-inp" class="' + prefix + 'textbox" value="' + self.encode(value, false) + '" hidefocus="1"' + extraAttrs + ' placeholder="' + self.encode(settings.placeholder) + '" />' + statusHtml + openBtnHtml + '</div>';
    },
    value: function (value) {
      if (arguments.length) {
        this.state.set('value', value);
        return this;
      }
      if (this.state.get('rendered')) {
        this.state.set('value', this.getEl('inp').value);
      }
      return this.state.get('value');
    },
    showAutoComplete: function (items, term) {
      var self = this;
      if (items.length === 0) {
        self.hideMenu();
        return;
      }
      var insert = function (value, title) {
        return function () {
          self.fire('selectitem', {
            title: title,
            value: value
          });
        };
      };
      if (self.menu) {
        self.menu.items().remove();
      } else {
        self.menu = Factory.create({
          type: 'menu',
          classes: 'combobox-menu',
          layout: 'flow'
        }).parent(self).renderTo();
      }
      Tools.each(items, function (item) {
        self.menu.add({
          text: item.title,
          url: item.previewUrl,
          match: term,
          classes: 'menu-item-ellipsis',
          onclick: insert(item.value, item.title)
        });
      });
      self.menu.renderNew();
      self.hideMenu();
      self.menu.on('cancel', function (e) {
        if (e.control.parent() === self.menu) {
          e.stopPropagation();
          self.focus();
          self.hideMenu();
        }
      });
      self.menu.on('select', function () {
        self.focus();
      });
      var maxW = self.layoutRect().w;
      self.menu.layoutRect({
        w: maxW,
        minW: 0,
        maxW: maxW
      });
      self.menu.repaint();
      self.menu.reflow();
      self.menu.show();
      self.menu.moveRel(self.getEl(), self.isRtl() ? [
        'br-tr',
        'tr-br'
      ] : [
        'bl-tl',
        'tl-bl'
      ]);
    },
    hideMenu: function () {
      if (this.menu) {
        this.menu.hide();
      }
    },
    bindStates: function () {
      var self = this;
      self.state.on('change:value', function (e) {
        if (self.getEl('inp').value !== e.value) {
          self.getEl('inp').value = e.value;
        }
      });
      self.state.on('change:disabled', function (e) {
        self.getEl('inp').disabled = e.value;
      });
      self.state.on('change:statusLevel', function (e) {
        var statusIconElm = self.getEl('status');
        var prefix = self.classPrefix, value = e.value;
        funcs.css(statusIconElm, 'display', value === 'none' ? 'none' : '');
        funcs.toggleClass(statusIconElm, prefix + 'i-checkmark', value === 'ok');
        funcs.toggleClass(statusIconElm, prefix + 'i-warning', value === 'warn');
        funcs.toggleClass(statusIconElm, prefix + 'i-error', value === 'error');
        self.classes.toggle('has-status', value !== 'none');
        self.repaint();
      });
      funcs.on(self.getEl('status'), 'mouseleave', function () {
        self.tooltip().hide();
      });
      self.on('cancel', function (e) {
        if (self.menu && self.menu.visible()) {
          e.stopPropagation();
          self.hideMenu();
        }
      });
      var focusIdx = function (idx, menu) {
        if (menu && menu.items().length > 0) {
          menu.items().eq(idx)[0].focus();
        }
      };
      self.on('keydown', function (e) {
        var keyCode = e.keyCode;
        if (e.target.nodeName === 'INPUT') {
          if (keyCode === VK.DOWN) {
            e.preventDefault();
            self.fire('autocomplete');
            focusIdx(0, self.menu);
          } else if (keyCode === VK.UP) {
            e.preventDefault();
            focusIdx(-1, self.menu);
          }
        }
      });
      return self._super();
    },
    remove: function () {
      $(this.getEl('inp')).off();
      if (this.menu) {
        this.menu.remove();
      }
      this._super();
    }
  });

  var ColorBox = ComboBox.extend({
    init: function (settings) {
      var self = this;
      settings.spellcheck = false;
      if (settings.onaction) {
        settings.icon = 'none';
      }
      self._super(settings);
      self.classes.add('colorbox');
      self.on('change keyup postrender', function () {
        self.repaintColor(self.value());
      });
    },
    repaintColor: function (value) {
      var openElm = this.getEl('open');
      var elm = openElm ? openElm.getElementsByTagName('i')[0] : null;
      if (elm) {
        try {
          elm.style.background = value;
        } catch (ex) {
        }
      }
    },
    bindStates: function () {
      var self = this;
      self.state.on('change:value', function (e) {
        if (self.state.get('rendered')) {
          self.repaintColor(e.value);
        }
      });
      return self._super();
    }
  });

  var PanelButton = Button.extend({
    showPanel: function () {
      var self = this, settings = self.settings;
      self.classes.add('opened');
      if (!self.panel) {
        var panelSettings = settings.panel;
        if (panelSettings.type) {
          panelSettings = {
            layout: 'grid',
            items: panelSettings
          };
        }
        panelSettings.role = panelSettings.role || 'dialog';
        panelSettings.popover = true;
        panelSettings.autohide = true;
        panelSettings.ariaRoot = true;
        self.panel = new FloatPanel(panelSettings).on('hide', function () {
          self.classes.remove('opened');
        }).on('cancel', function (e) {
          e.stopPropagation();
          self.focus();
          self.hidePanel();
        }).parent(self).renderTo(self.getContainerElm());
        self.panel.fire('show');
        self.panel.reflow();
      } else {
        self.panel.show();
      }
      var rel = self.panel.testMoveRel(self.getEl(), settings.popoverAlign || (self.isRtl() ? [
        'bc-tc',
        'bc-tl',
        'bc-tr'
      ] : [
        'bc-tc',
        'bc-tr',
        'bc-tl'
      ]));
      self.panel.classes.toggle('start', rel === 'bc-tl');
      self.panel.classes.toggle('end', rel === 'bc-tr');
      self.panel.moveRel(self.getEl(), rel);
    },
    hidePanel: function () {
      var self = this;
      if (self.panel) {
        self.panel.hide();
      }
    },
    postRender: function () {
      var self = this;
      self.aria('haspopup', true);
      self.on('click', function (e) {
        if (e.control === self) {
          if (self.panel && self.panel.visible()) {
            self.hidePanel();
          } else {
            self.showPanel();
            self.panel.focus(!!e.aria);
          }
        }
      });
      return self._super();
    },
    remove: function () {
      if (this.panel) {
        this.panel.remove();
        this.panel = null;
      }
      return this._super();
    }
  });

  var DOM$3 = DOMUtils.DOM;
  var ColorButton = PanelButton.extend({
    init: function (settings) {
      this._super(settings);
      this.classes.add('splitbtn');
      this.classes.add('colorbutton');
    },
    color: function (color) {
      if (color) {
        this._color = color;
        this.getEl('preview').style.backgroundColor = color;
        return this;
      }
      return this._color;
    },
    resetColor: function () {
      this._color = null;
      this.getEl('preview').style.backgroundColor = null;
      return this;
    },
    renderHtml: function () {
      var self = this, id = self._id, prefix = self.classPrefix, text = self.state.get('text');
      var icon = self.settings.icon ? prefix + 'ico ' + prefix + 'i-' + self.settings.icon : '';
      var image = self.settings.image ? ' style="background-image: url(\'' + self.settings.image + '\')"' : '';
      var textHtml = '';
      if (text) {
        self.classes.add('btn-has-text');
        textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>';
      }
      return '<div id="' + id + '" class="' + self.classes + '" role="button" tabindex="-1" aria-haspopup="true">' + '<button role="presentation" hidefocus="1" type="button" tabindex="-1">' + (icon ? '<i class="' + icon + '"' + image + '></i>' : '') + '<span id="' + id + '-preview" class="' + prefix + 'preview"></span>' + textHtml + '</button>' + '<button type="button" class="' + prefix + 'open" hidefocus="1" tabindex="-1">' + ' <i class="' + prefix + 'caret"></i>' + '</button>' + '</div>';
    },
    postRender: function () {
      var self = this, onClickHandler = self.settings.onclick;
      self.on('click', function (e) {
        if (e.aria && e.aria.key === 'down') {
          return;
        }
        if (e.control === self && !DOM$3.getParent(e.target, '.' + self.classPrefix + 'open')) {
          e.stopImmediatePropagation();
          onClickHandler.call(self, e);
        }
      });
      delete self.settings.onclick;
      return self._super();
    }
  });

  var Color = tinymce.util.Tools.resolve('tinymce.util.Color');

  var ColorPicker = Widget.extend({
    Defaults: { classes: 'widget colorpicker' },
    init: function (settings) {
      this._super(settings);
    },
    postRender: function () {
      var self = this;
      var color = self.color();
      var hsv, hueRootElm, huePointElm, svRootElm, svPointElm;
      hueRootElm = self.getEl('h');
      huePointElm = self.getEl('hp');
      svRootElm = self.getEl('sv');
      svPointElm = self.getEl('svp');
      function getPos(elm, event) {
        var pos = funcs.getPos(elm);
        var x, y;
        x = event.pageX - pos.x;
        y = event.pageY - pos.y;
        x = Math.max(0, Math.min(x / elm.clientWidth, 1));
        y = Math.max(0, Math.min(y / elm.clientHeight, 1));
        return {
          x: x,
          y: y
        };
      }
      function updateColor(hsv, hueUpdate) {
        var hue = (360 - hsv.h) / 360;
        funcs.css(huePointElm, { top: hue * 100 + '%' });
        if (!hueUpdate) {
          funcs.css(svPointElm, {
            left: hsv.s + '%',
            top: 100 - hsv.v + '%'
          });
        }
        svRootElm.style.background = Color({
          s: 100,
          v: 100,
          h: hsv.h
        }).toHex();
        self.color().parse({
          s: hsv.s,
          v: hsv.v,
          h: hsv.h
        });
      }
      function updateSaturationAndValue(e) {
        var pos;
        pos = getPos(svRootElm, e);
        hsv.s = pos.x * 100;
        hsv.v = (1 - pos.y) * 100;
        updateColor(hsv);
        self.fire('change');
      }
      function updateHue(e) {
        var pos;
        pos = getPos(hueRootElm, e);
        hsv = color.toHsv();
        hsv.h = (1 - pos.y) * 360;
        updateColor(hsv, true);
        self.fire('change');
      }
      self._repaint = function () {
        hsv = color.toHsv();
        updateColor(hsv);
      };
      self._super();
      self._svdraghelper = new DragHelper(self._id + '-sv', {
        start: updateSaturationAndValue,
        drag: updateSaturationAndValue
      });
      self._hdraghelper = new DragHelper(self._id + '-h', {
        start: updateHue,
        drag: updateHue
      });
      self._repaint();
    },
    rgb: function () {
      return this.color().toRgb();
    },
    value: function (value) {
      var self = this;
      if (arguments.length) {
        self.color().parse(value);
        if (self._rendered) {
          self._repaint();
        }
      } else {
        return self.color().toHex();
      }
    },
    color: function () {
      if (!this._color) {
        this._color = Color();
      }
      return this._color;
    },
    renderHtml: function () {
      var self = this;
      var id = self._id;
      var prefix = self.classPrefix;
      var hueHtml;
      var stops = '#ff0000,#ff0080,#ff00ff,#8000ff,#0000ff,#0080ff,#00ffff,#00ff80,#00ff00,#80ff00,#ffff00,#ff8000,#ff0000';
      function getOldIeFallbackHtml() {
        var i, l, html = '', gradientPrefix, stopsList;
        gradientPrefix = 'filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=';
        stopsList = stops.split(',');
        for (i = 0, l = stopsList.length - 1; i < l; i++) {
          html += '<div class="' + prefix + 'colorpicker-h-chunk" style="' + 'height:' + 100 / l + '%;' + gradientPrefix + stopsList[i] + ',endColorstr=' + stopsList[i + 1] + ');' + '-ms-' + gradientPrefix + stopsList[i] + ',endColorstr=' + stopsList[i + 1] + ')' + '"></div>';
        }
        return html;
      }
      var gradientCssText = 'background: -ms-linear-gradient(top,' + stops + ');' + 'background: linear-gradient(to bottom,' + stops + ');';
      hueHtml = '<div id="' + id + '-h" class="' + prefix + 'colorpicker-h" style="' + gradientCssText + '">' + getOldIeFallbackHtml() + '<div id="' + id + '-hp" class="' + prefix + 'colorpicker-h-marker"></div>' + '</div>';
      return '<div id="' + id + '" class="' + self.classes + '">' + '<div id="' + id + '-sv" class="' + prefix + 'colorpicker-sv">' + '<div class="' + prefix + 'colorpicker-overlay1">' + '<div class="' + prefix + 'colorpicker-overlay2">' + '<div id="' + id + '-svp" class="' + prefix + 'colorpicker-selector1">' + '<div class="' + prefix + 'colorpicker-selector2"></div>' + '</div>' + '</div>' + '</div>' + '</div>' + hueHtml + '</div>';
    }
  });

  var DropZone = Widget.extend({
    init: function (settings) {
      var self = this;
      settings = Tools.extend({
        height: 100,
        text: 'Drop an image here',
        multiple: false,
        accept: null
      }, settings);
      self._super(settings);
      self.classes.add('dropzone');
      if (settings.multiple) {
        self.classes.add('multiple');
      }
    },
    renderHtml: function () {
      var self = this;
      var attrs, elm;
      var cfg = self.settings;
      attrs = {
        id: self._id,
        hidefocus: '1'
      };
      elm = funcs.create('div', attrs, '<span>' + this.translate(cfg.text) + '</span>');
      if (cfg.height) {
        funcs.css(elm, 'height', cfg.height + 'px');
      }
      if (cfg.width) {
        funcs.css(elm, 'width', cfg.width + 'px');
      }
      elm.className = self.classes;
      return elm.outerHTML;
    },
    postRender: function () {
      var self = this;
      var toggleDragClass = function (e) {
        e.preventDefault();
        self.classes.toggle('dragenter');
        self.getEl().className = self.classes;
      };
      var filter = function (files) {
        var accept = self.settings.accept;
        if (typeof accept !== 'string') {
          return files;
        }
        var re = new RegExp('(' + accept.split(/\s*,\s*/).join('|') + ')$', 'i');
        return Tools.grep(files, function (file) {
          return re.test(file.name);
        });
      };
      self._super();
      self.$el.on('dragover', function (e) {
        e.preventDefault();
      });
      self.$el.on('dragenter', toggleDragClass);
      self.$el.on('dragleave', toggleDragClass);
      self.$el.on('drop', function (e) {
        e.preventDefault();
        if (self.state.get('disabled')) {
          return;
        }
        var files = filter(e.dataTransfer.files);
        self.value = function () {
          if (!files.length) {
            return null;
          } else if (self.settings.multiple) {
            return files;
          } else {
            return files[0];
          }
        };
        if (files.length) {
          self.fire('change', e);
        }
      });
    },
    remove: function () {
      this.$el.off();
      this._super();
    }
  });

  var Path = Widget.extend({
    init: function (settings) {
      var self = this;
      if (!settings.delimiter) {
        settings.delimiter = '\xBB';
      }
      self._super(settings);
      self.classes.add('path');
      self.canFocus = true;
      self.on('click', function (e) {
        var index;
        var target = e.target;
        if (index = target.getAttribute('data-index')) {
          self.fire('select', {
            value: self.row()[index],
            index: index
          });
        }
      });
      self.row(self.settings.row);
    },
    focus: function () {
      var self = this;
      self.getEl().firstChild.focus();
      return self;
    },
    row: function (row) {
      if (!arguments.length) {
        return this.state.get('row');
      }
      this.state.set('row', row);
      return this;
    },
    renderHtml: function () {
      var self = this;
      return '<div id="' + self._id + '" class="' + self.classes + '">' + self._getDataPathHtml(self.state.get('row')) + '</div>';
    },
    bindStates: function () {
      var self = this;
      self.state.on('change:row', function (e) {
        self.innerHtml(self._getDataPathHtml(e.value));
      });
      return self._super();
    },
    _getDataPathHtml: function (data) {
      var self = this;
      var parts = data || [];
      var i, l, html = '';
      var prefix = self.classPrefix;
      for (i = 0, l = parts.length; i < l; i++) {
        html += (i > 0 ? '<div class="' + prefix + 'divider" aria-hidden="true"> ' + self.settings.delimiter + ' </div>' : '') + '<div role="button" class="' + prefix + 'path-item' + (i === l - 1 ? ' ' + prefix + 'last' : '') + '" data-index="' + i + '" tabindex="-1" id="' + self._id + '-' + i + '" aria-level="' + (i + 1) + '">' + parts[i].name + '</div>';
      }
      if (!html) {
        html = '<div class="' + prefix + 'path-item">\xA0</div>';
      }
      return html;
    }
  });

  var ElementPath = Path.extend({
    postRender: function () {
      var self = this, editor = self.settings.editor;
      function isHidden(elm) {
        if (elm.nodeType === 1) {
          if (elm.nodeName === 'BR' || !!elm.getAttribute('data-mce-bogus')) {
            return true;
          }
          if (elm.getAttribute('data-mce-type') === 'bookmark') {
            return true;
          }
        }
        return false;
      }
      if (editor.settings.elementpath !== false) {
        self.on('select', function (e) {
          editor.focus();
          editor.selection.select(this.row()[e.index].element);
          editor.nodeChanged();
        });
        editor.on('nodeChange', function (e) {
          var outParents = [];
          var parents = e.parents;
          var i = parents.length;
          while (i--) {
            if (parents[i].nodeType === 1 && !isHidden(parents[i])) {
              var args = editor.fire('ResolveName', {
                name: parents[i].nodeName.toLowerCase(),
                target: parents[i]
              });
              if (!args.isDefaultPrevented()) {
                outParents.push({
                  name: args.name,
                  element: parents[i]
                });
              }
              if (args.isPropagationStopped()) {
                break;
              }
            }
          }
          self.row(outParents);
        });
      }
      return self._super();
    }
  });

  var FormItem = Container.extend({
    Defaults: {
      layout: 'flex',
      align: 'center',
      defaults: { flex: 1 }
    },
    renderHtml: function () {
      var self = this, layout = self._layout, prefix = self.classPrefix;
      self.classes.add('formitem');
      layout.preRender(self);
      return '<div id="' + self._id + '" class="' + self.classes + '" hidefocus="1" tabindex="-1">' + (self.settings.title ? '<div id="' + self._id + '-title" class="' + prefix + 'title">' + self.settings.title + '</div>' : '') + '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</div>';
    }
  });

  var Form = Container.extend({
    Defaults: {
      containerCls: 'form',
      layout: 'flex',
      direction: 'column',
      align: 'stretch',
      flex: 1,
      padding: 15,
      labelGap: 30,
      spacing: 10,
      callbacks: {
        submit: function () {
          this.submit();
        }
      }
    },
    preRender: function () {
      var self = this, items = self.items();
      if (!self.settings.formItemDefaults) {
        self.settings.formItemDefaults = {
          layout: 'flex',
          autoResize: 'overflow',
          defaults: { flex: 1 }
        };
      }
      items.each(function (ctrl) {
        var formItem;
        var label = ctrl.settings.label;
        if (label) {
          formItem = new FormItem(Tools.extend({
            items: {
              type: 'label',
              id: ctrl._id + '-l',
              text: label,
              flex: 0,
              forId: ctrl._id,
              disabled: ctrl.disabled()
            }
          }, self.settings.formItemDefaults));
          formItem.type = 'formitem';
          ctrl.aria('labelledby', ctrl._id + '-l');
          if (typeof ctrl.settings.flex === 'undefined') {
            ctrl.settings.flex = 1;
          }
          self.replace(ctrl, formItem);
          formItem.add(ctrl);
        }
      });
    },
    submit: function () {
      return this.fire('submit', { data: this.toJSON() });
    },
    postRender: function () {
      var self = this;
      self._super();
      self.fromJSON(self.settings.data);
    },
    bindStates: function () {
      var self = this;
      self._super();
      function recalcLabels() {
        var maxLabelWidth = 0;
        var labels = [];
        var i, labelGap, items;
        if (self.settings.labelGapCalc === false) {
          return;
        }
        if (self.settings.labelGapCalc === 'children') {
          items = self.find('formitem');
        } else {
          items = self.items();
        }
        items.filter('formitem').each(function (item) {
          var labelCtrl = item.items()[0], labelWidth = labelCtrl.getEl().clientWidth;
          maxLabelWidth = labelWidth > maxLabelWidth ? labelWidth : maxLabelWidth;
          labels.push(labelCtrl);
        });
        labelGap = self.settings.labelGap || 0;
        i = labels.length;
        while (i--) {
          labels[i].settings.minWidth = maxLabelWidth + labelGap;
        }
      }
      self.on('show', recalcLabels);
      recalcLabels();
    }
  });

  var FieldSet = Form.extend({
    Defaults: {
      containerCls: 'fieldset',
      layout: 'flex',
      direction: 'column',
      align: 'stretch',
      flex: 1,
      padding: '25 15 5 15',
      labelGap: 30,
      spacing: 10,
      border: 1
    },
    renderHtml: function () {
      var self = this, layout = self._layout, prefix = self.classPrefix;
      self.preRender();
      layout.preRender(self);
      return '<fieldset id="' + self._id + '" class="' + self.classes + '" hidefocus="1" tabindex="-1">' + (self.settings.title ? '<legend id="' + self._id + '-title" class="' + prefix + 'fieldset-title">' + self.settings.title + '</legend>' : '') + '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + (self.settings.html || '') + layout.renderHtml(self) + '</div>' + '</fieldset>';
    }
  });

  var unique$1 = 0;
  var generate = function (prefix) {
    var date = new Date();
    var time = date.getTime();
    var random = Math.floor(Math.random() * 1000000000);
    unique$1++;
    return prefix + '_' + random + unique$1 + String(time);
  };
  var $_bid1c5u4jcq8h9iw = { generate: generate };

  var fromHtml = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    if (!div.hasChildNodes() || div.childNodes.length > 1) {
      console.error('HTML does not have a single root node', html);
      throw 'HTML must have a single root node';
    }
    return fromDom(div.childNodes[0]);
  };
  var fromTag = function (tag, scope) {
    var doc = scope || document;
    var node = doc.createElement(tag);
    return fromDom(node);
  };
  var fromText = function (text, scope) {
    var doc = scope || document;
    var node = doc.createTextNode(text);
    return fromDom(node);
  };
  var fromDom = function (node) {
    if (node === null || node === undefined)
      throw new Error('Node cannot be null or undefined');
    return { dom: $_1amajisfjcq8h9cd.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return $_eol4yusejcq8h9cb.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_4skodxu5jcq8h9ix = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var cached = function (f) {
    var called = false;
    var r;
    return function () {
      if (!called) {
        called = true;
        r = f.apply(null, arguments);
      }
      return r;
    };
  };
  var $_7svenlu9jcq8h9jh = { cached: cached };

  var $_5q8amdubjcq8h9jk = {
    ATTRIBUTE: 2,
    CDATA_SECTION: 4,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    ELEMENT: 1,
    TEXT: 3,
    PROCESSING_INSTRUCTION: 7,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    NOTATION: 12
  };

  var name = function (element) {
    var r = element.dom().nodeName;
    return r.toLowerCase();
  };
  var type = function (element) {
    return element.dom().nodeType;
  };
  var value = function (element) {
    return element.dom().nodeValue;
  };
  var isType = function (t) {
    return function (element) {
      return type(element) === t;
    };
  };
  var isComment = function (element) {
    return type(element) === $_5q8amdubjcq8h9jk.COMMENT || name(element) === '#comment';
  };
  var isElement = isType($_5q8amdubjcq8h9jk.ELEMENT);
  var isText = isType($_5q8amdubjcq8h9jk.TEXT);
  var isDocument = isType($_5q8amdubjcq8h9jk.DOCUMENT);
  var $_cbxoqmuajcq8h9jj = {
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var inBody = function (element) {
    var dom = $_cbxoqmuajcq8h9jj.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_7svenlu9jcq8h9jh.cached(function () {
    return getBody($_4skodxu5jcq8h9ix.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_4skodxu5jcq8h9ix.fromDom(body);
  };
  var $_xsdazu8jcq8h9j4 = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var typeOf = function (x) {
    if (x === null)
      return 'null';
    var t = typeof x;
    if (t === 'object' && Array.prototype.isPrototypeOf(x))
      return 'array';
    if (t === 'object' && String.prototype.isPrototypeOf(x))
      return 'string';
    return t;
  };
  var isType$1 = function (type) {
    return function (value) {
      return typeOf(value) === type;
    };
  };
  var $_12jp0rudjcq8h9ju = {
    isString: isType$1('string'),
    isObject: isType$1('object'),
    isArray: isType$1('array'),
    isNull: isType$1('null'),
    isBoolean: isType$1('boolean'),
    isUndefined: isType$1('undefined'),
    isFunction: isType$1('function'),
    isNumber: isType$1('number')
  };

  var Immutable = function () {
    var fields = arguments;
    return function () {
      var values = new Array(arguments.length);
      for (var i = 0; i < values.length; i++)
        values[i] = arguments[i];
      if (fields.length !== values.length)
        throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
      var struct = {};
      $_flnht0sijcq8h9cx.each(fields, function (name, i) {
        struct[name] = $_1amajisfjcq8h9cd.constant(values[i]);
      });
      return struct;
    };
  };

  var keys = function () {
    var fastKeys = Object.keys;
    var slowKeys = function (o) {
      var r = [];
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          r.push(i);
        }
      }
      return r;
    };
    return fastKeys === undefined ? slowKeys : fastKeys;
  }();
  var each$1 = function (obj, f) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      f(x, i, obj);
    }
  };
  var objectMap = function (obj, f) {
    return tupleMap(obj, function (x, i, obj) {
      return {
        k: i,
        v: f(x, i, obj)
      };
    });
  };
  var tupleMap = function (obj, f) {
    var r = {};
    each$1(obj, function (x, i) {
      var tuple = f(x, i, obj);
      r[tuple.k] = tuple.v;
    });
    return r;
  };
  var bifilter = function (obj, pred) {
    var t = {};
    var f = {};
    each$1(obj, function (x, i) {
      var branch = pred(x, i) ? t : f;
      branch[i] = x;
    });
    return {
      t: t,
      f: f
    };
  };
  var mapToArray = function (obj, f) {
    var r = [];
    each$1(obj, function (value, name) {
      r.push(f(value, name));
    });
    return r;
  };
  var find$2 = function (obj, pred) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      if (pred(x, i, obj)) {
        return $_eol4yusejcq8h9cb.some(x);
      }
    }
    return $_eol4yusejcq8h9cb.none();
  };
  var values = function (obj) {
    return mapToArray(obj, function (v) {
      return v;
    });
  };
  var size = function (obj) {
    return values(obj).length;
  };
  var $_gf7nq7uhjcq8h9jz = {
    bifilter: bifilter,
    each: each$1,
    map: objectMap,
    mapToArray: mapToArray,
    tupleMap: tupleMap,
    find: find$2,
    keys: keys,
    values: values,
    size: size
  };

  var sort$1 = function (arr) {
    return arr.slice(0).sort();
  };
  var reqMessage = function (required, keys) {
    throw new Error('All required keys (' + sort$1(required).join(', ') + ') were not specified. Specified keys were: ' + sort$1(keys).join(', ') + '.');
  };
  var unsuppMessage = function (unsupported) {
    throw new Error('Unsupported keys for object: ' + sort$1(unsupported).join(', '));
  };
  var validateStrArr = function (label, array) {
    if (!$_12jp0rudjcq8h9ju.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_flnht0sijcq8h9cx.each(array, function (a) {
      if (!$_12jp0rudjcq8h9ju.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_flnht0sijcq8h9cx.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_d0gfimuijcq8h9k2 = {
    sort: sort$1,
    reqMessage: reqMessage,
    unsuppMessage: unsuppMessage,
    validateStrArr: validateStrArr,
    invalidTypeMessage: invalidTypeMessage,
    checkDupes: checkDupes
  };

  var MixedBag = function (required, optional) {
    var everything = required.concat(optional);
    if (everything.length === 0)
      throw new Error('You must specify at least one required or optional field.');
    $_d0gfimuijcq8h9k2.validateStrArr('required', required);
    $_d0gfimuijcq8h9k2.validateStrArr('optional', optional);
    $_d0gfimuijcq8h9k2.checkDupes(everything);
    return function (obj) {
      var keys = $_gf7nq7uhjcq8h9jz.keys(obj);
      var allReqd = $_flnht0sijcq8h9cx.forall(required, function (req) {
        return $_flnht0sijcq8h9cx.contains(keys, req);
      });
      if (!allReqd)
        $_d0gfimuijcq8h9k2.reqMessage(required, keys);
      var unsupported = $_flnht0sijcq8h9cx.filter(keys, function (key) {
        return !$_flnht0sijcq8h9cx.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_d0gfimuijcq8h9k2.unsuppMessage(unsupported);
      var r = {};
      $_flnht0sijcq8h9cx.each(required, function (req) {
        r[req] = $_1amajisfjcq8h9cd.constant(obj[req]);
      });
      $_flnht0sijcq8h9cx.each(optional, function (opt) {
        r[opt] = $_1amajisfjcq8h9cd.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? $_eol4yusejcq8h9cb.some(obj[opt]) : $_eol4yusejcq8h9cb.none());
      });
      return r;
    };
  };

  var $_632cxsuejcq8h9jv = {
    immutable: Immutable,
    immutableBag: MixedBag
  };

  var toArray = function (target, f) {
    var r = [];
    var recurse = function (e) {
      r.push(e);
      return f(e);
    };
    var cur = f(target);
    do {
      cur = cur.bind(recurse);
    } while (cur.isSome());
    return r;
  };
  var $_csooqaujjcq8h9k4 = { toArray: toArray };

  var global = typeof window !== 'undefined' ? window : Function('return this;')();

  var path = function (parts, scope) {
    var o = scope !== undefined && scope !== null ? scope : global;
    for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
      o = o[parts[i]];
    return o;
  };
  var resolve = function (p, scope) {
    var parts = p.split('.');
    return path(parts, scope);
  };
  var step = function (o, part) {
    if (o[part] === undefined || o[part] === null)
      o[part] = {};
    return o[part];
  };
  var forge = function (parts, target) {
    var o = target !== undefined ? target : global;
    for (var i = 0; i < parts.length; ++i)
      o = step(o, parts[i]);
    return o;
  };
  var namespace = function (name, target) {
    var parts = name.split('.');
    return forge(parts, target);
  };
  var $_6htu4wunjcq8h9ke = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_6htu4wunjcq8h9ke.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_dcndzpumjcq8h9kc = { getOrDie: getOrDie };

  var node = function () {
    var f = $_dcndzpumjcq8h9kc.getOrDie('Node');
    return f;
  };
  var compareDocumentPosition = function (a, b, match) {
    return (a.compareDocumentPosition(b) & match) !== 0;
  };
  var documentPositionPreceding = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING);
  };
  var documentPositionContainedBy = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY);
  };
  var $_2toa23uljcq8h9kb = {
    documentPositionPreceding: documentPositionPreceding,
    documentPositionContainedBy: documentPositionContainedBy
  };

  var firstMatch = function (regexes, s) {
    for (var i = 0; i < regexes.length; i++) {
      var x = regexes[i];
      if (x.test(s))
        return x;
    }
    return undefined;
  };
  var find$3 = function (regexes, agent) {
    var r = firstMatch(regexes, agent);
    if (!r)
      return {
        major: 0,
        minor: 0
      };
    var group = function (i) {
      return Number(agent.replace(r, '$' + i));
    };
    return nu$1(group(1), group(2));
  };
  var detect$2 = function (versionRegexes, agent) {
    var cleanedAgent = String(agent).toLowerCase();
    if (versionRegexes.length === 0)
      return unknown$1();
    return find$3(versionRegexes, cleanedAgent);
  };
  var unknown$1 = function () {
    return nu$1(0, 0);
  };
  var nu$1 = function (major, minor) {
    return {
      major: major,
      minor: minor
    };
  };
  var $_600o2cusjcq8h9km = {
    nu: nu$1,
    detect: detect$2,
    unknown: unknown$1
  };

  var edge = 'Edge';
  var chrome = 'Chrome';
  var ie = 'IE';
  var opera = 'Opera';
  var firefox = 'Firefox';
  var safari = 'Safari';
  var isBrowser = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown = function () {
    return nu({
      current: undefined,
      version: $_600o2cusjcq8h9km.unknown()
    });
  };
  var nu = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isEdge: isBrowser(edge, current),
      isChrome: isBrowser(chrome, current),
      isIE: isBrowser(ie, current),
      isOpera: isBrowser(opera, current),
      isFirefox: isBrowser(firefox, current),
      isSafari: isBrowser(safari, current)
    };
  };
  var $_53wfzmurjcq8h9kj = {
    unknown: unknown,
    nu: nu,
    edge: $_1amajisfjcq8h9cd.constant(edge),
    chrome: $_1amajisfjcq8h9cd.constant(chrome),
    ie: $_1amajisfjcq8h9cd.constant(ie),
    opera: $_1amajisfjcq8h9cd.constant(opera),
    firefox: $_1amajisfjcq8h9cd.constant(firefox),
    safari: $_1amajisfjcq8h9cd.constant(safari)
  };

  var windows$1 = 'Windows';
  var ios = 'iOS';
  var android = 'Android';
  var linux = 'Linux';
  var osx = 'OSX';
  var solaris = 'Solaris';
  var freebsd = 'FreeBSD';
  var isOS = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown$2 = function () {
    return nu$2({
      current: undefined,
      version: $_600o2cusjcq8h9km.unknown()
    });
  };
  var nu$2 = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isWindows: isOS(windows$1, current),
      isiOS: isOS(ios, current),
      isAndroid: isOS(android, current),
      isOSX: isOS(osx, current),
      isLinux: isOS(linux, current),
      isSolaris: isOS(solaris, current),
      isFreeBSD: isOS(freebsd, current)
    };
  };
  var $_ebc3bzutjcq8h9kn = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_1amajisfjcq8h9cd.constant(windows$1),
    ios: $_1amajisfjcq8h9cd.constant(ios),
    android: $_1amajisfjcq8h9cd.constant(android),
    linux: $_1amajisfjcq8h9cd.constant(linux),
    osx: $_1amajisfjcq8h9cd.constant(osx),
    solaris: $_1amajisfjcq8h9cd.constant(solaris),
    freebsd: $_1amajisfjcq8h9cd.constant(freebsd)
  };

  var DeviceType = function (os, browser, userAgent) {
    var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
    var isiPhone = os.isiOS() && !isiPad;
    var isAndroid3 = os.isAndroid() && os.version.major === 3;
    var isAndroid4 = os.isAndroid() && os.version.major === 4;
    var isTablet = isiPad || isAndroid3 || isAndroid4 && /mobile/i.test(userAgent) === true;
    var isTouch = os.isiOS() || os.isAndroid();
    var isPhone = isTouch && !isTablet;
    var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
    return {
      isiPad: $_1amajisfjcq8h9cd.constant(isiPad),
      isiPhone: $_1amajisfjcq8h9cd.constant(isiPhone),
      isTablet: $_1amajisfjcq8h9cd.constant(isTablet),
      isPhone: $_1amajisfjcq8h9cd.constant(isPhone),
      isTouch: $_1amajisfjcq8h9cd.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_1amajisfjcq8h9cd.constant(iOSwebview)
    };
  };

  var detect$3 = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return $_flnht0sijcq8h9cx.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$3(browsers, userAgent).map(function (browser) {
      var version = $_600o2cusjcq8h9km.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$3(oses, userAgent).map(function (os) {
      var version = $_600o2cusjcq8h9km.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_6qg6ypuvjcq8h9ks = {
    detectBrowser: detectBrowser,
    detectOs: detectOs
  };

  var addToStart = function (str, prefix) {
    return prefix + str;
  };
  var addToEnd = function (str, suffix) {
    return str + suffix;
  };
  var removeFromStart = function (str, numChars) {
    return str.substring(numChars);
  };
  var removeFromEnd = function (str, numChars) {
    return str.substring(0, str.length - numChars);
  };
  var $_9rngsuuyjcq8h9l1 = {
    addToStart: addToStart,
    addToEnd: addToEnd,
    removeFromStart: removeFromStart,
    removeFromEnd: removeFromEnd
  };

  var first = function (str, count) {
    return str.substr(0, count);
  };
  var last$1 = function (str, count) {
    return str.substr(str.length - count, str.length);
  };
  var head$1 = function (str) {
    return str === '' ? $_eol4yusejcq8h9cb.none() : $_eol4yusejcq8h9cb.some(str.substr(0, 1));
  };
  var tail = function (str) {
    return str === '' ? $_eol4yusejcq8h9cb.none() : $_eol4yusejcq8h9cb.some(str.substring(1));
  };
  var $_67syxhuzjcq8h9l2 = {
    first: first,
    last: last$1,
    head: head$1,
    tail: tail
  };

  var checkRange = function (str, substr, start) {
    if (substr === '')
      return true;
    if (str.length < substr.length)
      return false;
    var x = str.substr(start, start + substr.length);
    return x === substr;
  };
  var supplant = function (str, obj) {
    var isStringOrNumber = function (a) {
      var t = typeof a;
      return t === 'string' || t === 'number';
    };
    return str.replace(/\${([^{}]*)}/g, function (a, b) {
      var value = obj[b];
      return isStringOrNumber(value) ? value : a;
    });
  };
  var removeLeading = function (str, prefix) {
    return startsWith(str, prefix) ? $_9rngsuuyjcq8h9l1.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_9rngsuuyjcq8h9l1.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_9rngsuuyjcq8h9l1.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_9rngsuuyjcq8h9l1.addToEnd(str, prefix);
  };
  var contains$2 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_67syxhuzjcq8h9l2.head(str).bind(function (head) {
      return $_67syxhuzjcq8h9l2.tail(str).map(function (tail) {
        return head.toUpperCase() + tail;
      });
    }).getOr(str);
  };
  var startsWith = function (str, prefix) {
    return checkRange(str, prefix, 0);
  };
  var endsWith = function (str, suffix) {
    return checkRange(str, suffix, str.length - suffix.length);
  };
  var trim$1 = function (str) {
    return str.replace(/^\s+|\s+$/g, '');
  };
  var lTrim = function (str) {
    return str.replace(/^\s+/g, '');
  };
  var rTrim = function (str) {
    return str.replace(/\s+$/g, '');
  };
  var $_7iyvjfuxjcq8h9kz = {
    supplant: supplant,
    startsWith: startsWith,
    removeLeading: removeLeading,
    removeTrailing: removeTrailing,
    ensureLeading: ensureLeading,
    ensureTrailing: ensureTrailing,
    endsWith: endsWith,
    contains: contains$2,
    trim: trim$1,
    lTrim: lTrim,
    rTrim: rTrim,
    capitalize: capitalize
  };

  var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
  var checkContains = function (target) {
    return function (uastring) {
      return $_7iyvjfuxjcq8h9kz.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_7iyvjfuxjcq8h9kz.contains(uastring, 'edge/') && $_7iyvjfuxjcq8h9kz.contains(uastring, 'chrome') && $_7iyvjfuxjcq8h9kz.contains(uastring, 'safari') && $_7iyvjfuxjcq8h9kz.contains(uastring, 'applewebkit');
        return monstrosity;
      }
    },
    {
      name: 'Chrome',
      versionRegexes: [
        /.*?chrome\/([0-9]+)\.([0-9]+).*/,
        normalVersionRegex
      ],
      search: function (uastring) {
        return $_7iyvjfuxjcq8h9kz.contains(uastring, 'chrome') && !$_7iyvjfuxjcq8h9kz.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_7iyvjfuxjcq8h9kz.contains(uastring, 'msie') || $_7iyvjfuxjcq8h9kz.contains(uastring, 'trident');
      }
    },
    {
      name: 'Opera',
      versionRegexes: [
        normalVersionRegex,
        /.*?opera\/([0-9]+)\.([0-9]+).*/
      ],
      search: checkContains('opera')
    },
    {
      name: 'Firefox',
      versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
      search: checkContains('firefox')
    },
    {
      name: 'Safari',
      versionRegexes: [
        normalVersionRegex,
        /.*?cpu os ([0-9]+)_([0-9]+).*/
      ],
      search: function (uastring) {
        return ($_7iyvjfuxjcq8h9kz.contains(uastring, 'safari') || $_7iyvjfuxjcq8h9kz.contains(uastring, 'mobile/')) && $_7iyvjfuxjcq8h9kz.contains(uastring, 'applewebkit');
      }
    }
  ];
  var oses = [
    {
      name: 'Windows',
      search: checkContains('win'),
      versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'iOS',
      search: function (uastring) {
        return $_7iyvjfuxjcq8h9kz.contains(uastring, 'iphone') || $_7iyvjfuxjcq8h9kz.contains(uastring, 'ipad');
      },
      versionRegexes: [
        /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
        /.*cpu os ([0-9]+)_([0-9]+).*/,
        /.*cpu iphone os ([0-9]+)_([0-9]+).*/
      ]
    },
    {
      name: 'Android',
      search: checkContains('android'),
      versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'OSX',
      search: checkContains('os x'),
      versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
    },
    {
      name: 'Linux',
      search: checkContains('linux'),
      versionRegexes: []
    },
    {
      name: 'Solaris',
      search: checkContains('sunos'),
      versionRegexes: []
    },
    {
      name: 'FreeBSD',
      search: checkContains('freebsd'),
      versionRegexes: []
    }
  ];
  var $_a2zmusuwjcq8h9kv = {
    browsers: $_1amajisfjcq8h9cd.constant(browsers),
    oses: $_1amajisfjcq8h9cd.constant(oses)
  };

  var detect$1 = function (userAgent) {
    var browsers = $_a2zmusuwjcq8h9kv.browsers();
    var oses = $_a2zmusuwjcq8h9kv.oses();
    var browser = $_6qg6ypuvjcq8h9ks.detectBrowser(browsers, userAgent).fold($_53wfzmurjcq8h9kj.unknown, $_53wfzmurjcq8h9kj.nu);
    var os = $_6qg6ypuvjcq8h9ks.detectOs(oses, userAgent).fold($_ebc3bzutjcq8h9kn.unknown, $_ebc3bzutjcq8h9kn.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_98nv53uqjcq8h9ki = { detect: detect$1 };

  var detect = $_7svenlu9jcq8h9jh.cached(function () {
    var userAgent = navigator.userAgent;
    return $_98nv53uqjcq8h9ki.detect(userAgent);
  });
  var $_23w5s2upjcq8h9kg = { detect: detect };

  var ELEMENT = $_5q8amdubjcq8h9jk.ELEMENT;
  var DOCUMENT = $_5q8amdubjcq8h9jk.DOCUMENT;
  var is = function (element, selector) {
    var elem = element.dom();
    if (elem.nodeType !== ELEMENT)
      return false;
    else if (elem.matches !== undefined)
      return elem.matches(selector);
    else if (elem.msMatchesSelector !== undefined)
      return elem.msMatchesSelector(selector);
    else if (elem.webkitMatchesSelector !== undefined)
      return elem.webkitMatchesSelector(selector);
    else if (elem.mozMatchesSelector !== undefined)
      return elem.mozMatchesSelector(selector);
    else
      throw new Error('Browser lacks native selectors');
  };
  var bypassSelector = function (dom) {
    return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT || dom.childElementCount === 0;
  };
  var all$2 = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? [] : $_flnht0sijcq8h9cx.map(base.querySelectorAll(selector), $_4skodxu5jcq8h9ix.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? $_eol4yusejcq8h9cb.none() : $_eol4yusejcq8h9cb.from(base.querySelector(selector)).map($_4skodxu5jcq8h9ix.fromDom);
  };
  var $_bxp7liv0jcq8h9l4 = {
    all: all$2,
    is: is,
    one: one
  };

  var eq = function (e1, e2) {
    return e1.dom() === e2.dom();
  };
  var isEqualNode = function (e1, e2) {
    return e1.dom().isEqualNode(e2.dom());
  };
  var member = function (element, elements) {
    return $_flnht0sijcq8h9cx.exists(elements, $_1amajisfjcq8h9cd.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_2toa23uljcq8h9kb.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_23w5s2upjcq8h9kg.detect().browser;
  var contains$1 = browser.isIE() ? ieContains : regularContains;
  var $_bkm3rfukjcq8h9k5 = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains$1,
    is: $_bxp7liv0jcq8h9l4.is
  };

  var owner = function (element) {
    return $_4skodxu5jcq8h9ix.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_4skodxu5jcq8h9ix.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_4skodxu5jcq8h9ix.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return $_eol4yusejcq8h9cb.from(dom.parentNode).map($_4skodxu5jcq8h9ix.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children$2(p);
      return $_flnht0sijcq8h9cx.findIndex(kin, function (elem) {
        return $_bkm3rfukjcq8h9k5.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_12jp0rudjcq8h9ju.isFunction(isRoot) ? isRoot : $_1amajisfjcq8h9cd.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_4skodxu5jcq8h9ix.fromDom(rawParent);
      ret.push(parent);
      if (stop(parent) === true)
        break;
      else
        dom = rawParent;
    }
    return ret;
  };
  var siblings$2 = function (element) {
    var filterSelf = function (elements) {
      return $_flnht0sijcq8h9cx.filter(elements, function (x) {
        return !$_bkm3rfukjcq8h9k5.eq(element, x);
      });
    };
    return parent(element).map(children$2).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return $_eol4yusejcq8h9cb.from(dom.offsetParent).map($_4skodxu5jcq8h9ix.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return $_eol4yusejcq8h9cb.from(dom.previousSibling).map($_4skodxu5jcq8h9ix.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return $_eol4yusejcq8h9cb.from(dom.nextSibling).map($_4skodxu5jcq8h9ix.fromDom);
  };
  var prevSiblings = function (element) {
    return $_flnht0sijcq8h9cx.reverse($_csooqaujjcq8h9k4.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_csooqaujjcq8h9k4.toArray(element, nextSibling);
  };
  var children$2 = function (element) {
    var dom = element.dom();
    return $_flnht0sijcq8h9cx.map(dom.childNodes, $_4skodxu5jcq8h9ix.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return $_eol4yusejcq8h9cb.from(children[index]).map($_4skodxu5jcq8h9ix.fromDom);
  };
  var firstChild = function (element) {
    return child(element, 0);
  };
  var lastChild = function (element) {
    return child(element, element.dom().childNodes.length - 1);
  };
  var childNodesCount = function (element) {
    return element.dom().childNodes.length;
  };
  var hasChildNodes = function (element) {
    return element.dom().hasChildNodes();
  };
  var spot = $_632cxsuejcq8h9jv.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children$2(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_4rmxs1ucjcq8h9jl = {
    owner: owner,
    defaultView: defaultView,
    documentElement: documentElement,
    parent: parent,
    findIndex: findIndex$1,
    parents: parents,
    siblings: siblings$2,
    prevSibling: prevSibling,
    offsetParent: offsetParent,
    prevSiblings: prevSiblings,
    nextSibling: nextSibling,
    nextSiblings: nextSiblings,
    children: children$2,
    child: child,
    firstChild: firstChild,
    lastChild: lastChild,
    childNodesCount: childNodesCount,
    hasChildNodes: hasChildNodes,
    leaf: leaf
  };

  var all$1 = function (predicate) {
    return descendants$1($_xsdazu8jcq8h9j4.body(), predicate);
  };
  var ancestors$1 = function (scope, predicate, isRoot) {
    return $_flnht0sijcq8h9cx.filter($_4rmxs1ucjcq8h9jl.parents(scope, isRoot), predicate);
  };
  var siblings$1 = function (scope, predicate) {
    return $_flnht0sijcq8h9cx.filter($_4rmxs1ucjcq8h9jl.siblings(scope), predicate);
  };
  var children$1 = function (scope, predicate) {
    return $_flnht0sijcq8h9cx.filter($_4rmxs1ucjcq8h9jl.children(scope), predicate);
  };
  var descendants$1 = function (scope, predicate) {
    var result = [];
    $_flnht0sijcq8h9cx.each($_4rmxs1ucjcq8h9jl.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants$1(x, predicate));
    });
    return result;
  };
  var $_bp8zcgu7jcq8h9j2 = {
    all: all$1,
    ancestors: ancestors$1,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants$1
  };

  var all = function (selector) {
    return $_bxp7liv0jcq8h9l4.all(selector);
  };
  var ancestors = function (scope, selector, isRoot) {
    return $_bp8zcgu7jcq8h9j2.ancestors(scope, function (e) {
      return $_bxp7liv0jcq8h9l4.is(e, selector);
    }, isRoot);
  };
  var siblings = function (scope, selector) {
    return $_bp8zcgu7jcq8h9j2.siblings(scope, function (e) {
      return $_bxp7liv0jcq8h9l4.is(e, selector);
    });
  };
  var children = function (scope, selector) {
    return $_bp8zcgu7jcq8h9j2.children(scope, function (e) {
      return $_bxp7liv0jcq8h9l4.is(e, selector);
    });
  };
  var descendants = function (scope, selector) {
    return $_bxp7liv0jcq8h9l4.all(selector, scope);
  };
  var $_3jt42fu6jcq8h9j1 = {
    all: all,
    ancestors: ancestors,
    siblings: siblings,
    children: children,
    descendants: descendants
  };

  var trim = Tools.trim;
  var hasContentEditableState = function (value) {
    return function (node) {
      if (node && node.nodeType === 1) {
        if (node.contentEditable === value) {
          return true;
        }
        if (node.getAttribute('data-mce-contenteditable') === value) {
          return true;
        }
      }
      return false;
    };
  };
  var isContentEditableTrue = hasContentEditableState('true');
  var isContentEditableFalse = hasContentEditableState('false');
  var create = function (type, title, url, level, attach) {
    return {
      type: type,
      title: title,
      url: url,
      level: level,
      attach: attach
    };
  };
  var isChildOfContentEditableTrue = function (node) {
    while (node = node.parentNode) {
      var value = node.contentEditable;
      if (value && value !== 'inherit') {
        return isContentEditableTrue(node);
      }
    }
    return false;
  };
  var select = function (selector, root) {
    return $_flnht0sijcq8h9cx.map($_3jt42fu6jcq8h9j1.descendants($_4skodxu5jcq8h9ix.fromDom(root), selector), function (element) {
      return element.dom();
    });
  };
  var getElementText = function (elm) {
    return elm.innerText || elm.textContent;
  };
  var getOrGenerateId = function (elm) {
    return elm.id ? elm.id : $_bid1c5u4jcq8h9iw.generate('h');
  };
  var isAnchor = function (elm) {
    return elm && elm.nodeName === 'A' && (elm.id || elm.name);
  };
  var isValidAnchor = function (elm) {
    return isAnchor(elm) && isEditable(elm);
  };
  var isHeader = function (elm) {
    return elm && /^(H[1-6])$/.test(elm.nodeName);
  };
  var isEditable = function (elm) {
    return isChildOfContentEditableTrue(elm) && !isContentEditableFalse(elm);
  };
  var isValidHeader = function (elm) {
    return isHeader(elm) && isEditable(elm);
  };
  var getLevel = function (elm) {
    return isHeader(elm) ? parseInt(elm.nodeName.substr(1), 10) : 0;
  };
  var headerTarget = function (elm) {
    var headerId = getOrGenerateId(elm);
    var attach = function () {
      elm.id = headerId;
    };
    return create('header', getElementText(elm), '#' + headerId, getLevel(elm), attach);
  };
  var anchorTarget = function (elm) {
    var anchorId = elm.id || elm.name;
    var anchorText = getElementText(elm);
    return create('anchor', anchorText ? anchorText : '#' + anchorId, '#' + anchorId, 0, $_1amajisfjcq8h9cd.noop);
  };
  var getHeaderTargets = function (elms) {
    return $_flnht0sijcq8h9cx.map($_flnht0sijcq8h9cx.filter(elms, isValidHeader), headerTarget);
  };
  var getAnchorTargets = function (elms) {
    return $_flnht0sijcq8h9cx.map($_flnht0sijcq8h9cx.filter(elms, isValidAnchor), anchorTarget);
  };
  var getTargetElements = function (elm) {
    var elms = select('h1,h2,h3,h4,h5,h6,a:not([href])', elm);
    return elms;
  };
  var hasTitle = function (target) {
    return trim(target.title).length > 0;
  };
  var find$1 = function (elm) {
    var elms = getTargetElements(elm);
    return $_flnht0sijcq8h9cx.filter(getHeaderTargets(elms).concat(getAnchorTargets(elms)), hasTitle);
  };
  var $_1sgnr1u3jcq8h9iq = { find: find$1 };

  var getActiveEditor = function () {
    return window.tinymce ? window.tinymce.activeEditor : EditorManager.activeEditor;
  };
  var history = {};
  var HISTORY_LENGTH = 5;
  var clearHistory = function () {
    history = {};
  };
  var toMenuItem = function (target) {
    return {
      title: target.title,
      value: {
        title: { raw: target.title },
        url: target.url,
        attach: target.attach
      }
    };
  };
  var toMenuItems = function (targets) {
    return Tools.map(targets, toMenuItem);
  };
  var staticMenuItem = function (title, url) {
    return {
      title: title,
      value: {
        title: title,
        url: url,
        attach: $_1amajisfjcq8h9cd.noop
      }
    };
  };
  var isUniqueUrl = function (url, targets) {
    var foundTarget = $_flnht0sijcq8h9cx.exists(targets, function (target) {
      return target.url === url;
    });
    return !foundTarget;
  };
  var getSetting = function (editorSettings, name, defaultValue) {
    var value = name in editorSettings ? editorSettings[name] : defaultValue;
    return value === false ? null : value;
  };
  var createMenuItems = function (term, targets, fileType, editorSettings) {
    var separator = { title: '-' };
    var fromHistoryMenuItems = function (history) {
      var historyItems = history.hasOwnProperty(fileType) ? history[fileType] : [];
      var uniqueHistory = $_flnht0sijcq8h9cx.filter(historyItems, function (url) {
        return isUniqueUrl(url, targets);
      });
      return Tools.map(uniqueHistory, function (url) {
        return {
          title: url,
          value: {
            title: url,
            url: url,
            attach: $_1amajisfjcq8h9cd.noop
          }
        };
      });
    };
    var fromMenuItems = function (type) {
      var filteredTargets = $_flnht0sijcq8h9cx.filter(targets, function (target) {
        return target.type === type;
      });
      return toMenuItems(filteredTargets);
    };
    var anchorMenuItems = function () {
      var anchorMenuItems = fromMenuItems('anchor');
      var topAnchor = getSetting(editorSettings, 'anchor_top', '#top');
      var bottomAchor = getSetting(editorSettings, 'anchor_bottom', '#bottom');
      if (topAnchor !== null) {
        anchorMenuItems.unshift(staticMenuItem('<top>', topAnchor));
      }
      if (bottomAchor !== null) {
        anchorMenuItems.push(staticMenuItem('<bottom>', bottomAchor));
      }
      return anchorMenuItems;
    };
    var join = function (items) {
      return $_flnht0sijcq8h9cx.foldl(items, function (a, b) {
        var bothEmpty = a.length === 0 || b.length === 0;
        return bothEmpty ? a.concat(b) : a.concat(separator, b);
      }, []);
    };
    if (editorSettings.typeahead_urls === false) {
      return [];
    }
    return fileType === 'file' ? join([
      filterByQuery(term, fromHistoryMenuItems(history)),
      filterByQuery(term, fromMenuItems('header')),
      filterByQuery(term, anchorMenuItems())
    ]) : filterByQuery(term, fromHistoryMenuItems(history));
  };
  var addToHistory = function (url, fileType) {
    var items = history[fileType];
    if (!/^https?/.test(url)) {
      return;
    }
    if (items) {
      if ($_flnht0sijcq8h9cx.indexOf(items, url) === -1) {
        history[fileType] = items.slice(0, HISTORY_LENGTH).concat(url);
      }
    } else {
      history[fileType] = [url];
    }
  };
  var filterByQuery = function (term, menuItems) {
    var lowerCaseTerm = term.toLowerCase();
    var result = Tools.grep(menuItems, function (item) {
      return item.title.toLowerCase().indexOf(lowerCaseTerm) !== -1;
    });
    return result.length === 1 && result[0].title === term ? [] : result;
  };
  var getTitle = function (linkDetails) {
    var title = linkDetails.title;
    return title.raw ? title.raw : title;
  };
  var setupAutoCompleteHandler = function (ctrl, editorSettings, bodyElm, fileType) {
    var autocomplete = function (term) {
      var linkTargets = $_1sgnr1u3jcq8h9iq.find(bodyElm);
      var menuItems = createMenuItems(term, linkTargets, fileType, editorSettings);
      ctrl.showAutoComplete(menuItems, term);
    };
    ctrl.on('autocomplete', function () {
      autocomplete(ctrl.value());
    });
    ctrl.on('selectitem', function (e) {
      var linkDetails = e.value;
      ctrl.value(linkDetails.url);
      var title = getTitle(linkDetails);
      if (fileType === 'image') {
        ctrl.fire('change', {
          meta: {
            alt: title,
            attach: linkDetails.attach
          }
        });
      } else {
        ctrl.fire('change', {
          meta: {
            text: title,
            attach: linkDetails.attach
          }
        });
      }
      ctrl.focus();
    });
    ctrl.on('click', function (e) {
      if (ctrl.value().length === 0 && e.target.nodeName === 'INPUT') {
        autocomplete('');
      }
    });
    ctrl.on('PostRender', function () {
      ctrl.getRoot().on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
          addToHistory(ctrl.value(), fileType);
        }
      });
    });
  };
  var statusToUiState = function (result) {
    var status = result.status, message = result.message;
    if (status === 'valid') {
      return {
        status: 'ok',
        message: message
      };
    } else if (status === 'unknown') {
      return {
        status: 'warn',
        message: message
      };
    } else if (status === 'invalid') {
      return {
        status: 'warn',
        message: message
      };
    } else {
      return {
        status: 'none',
        message: ''
      };
    }
  };
  var setupLinkValidatorHandler = function (ctrl, editorSettings, fileType) {
    var validatorHandler = editorSettings.filepicker_validator_handler;
    if (validatorHandler) {
      var validateUrl_1 = function (url) {
        if (url.length === 0) {
          ctrl.statusLevel('none');
          return;
        }
        validatorHandler({
          url: url,
          type: fileType
        }, function (result) {
          var uiState = statusToUiState(result);
          ctrl.statusMessage(uiState.message);
          ctrl.statusLevel(uiState.status);
        });
      };
      ctrl.state.on('change:value', function (e) {
        validateUrl_1(e.value);
      });
    }
  };
  var FilePicker = ComboBox.extend({
    Statics: { clearHistory: clearHistory },
    init: function (settings) {
      var self = this, editor = getActiveEditor(), editorSettings = editor.settings;
      var actionCallback, fileBrowserCallback, fileBrowserCallbackTypes;
      var fileType = settings.filetype;
      settings.spellcheck = false;
      fileBrowserCallbackTypes = editorSettings.file_picker_types || editorSettings.file_browser_callback_types;
      if (fileBrowserCallbackTypes) {
        fileBrowserCallbackTypes = Tools.makeMap(fileBrowserCallbackTypes, /[, ]/);
      }
      if (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[fileType]) {
        fileBrowserCallback = editorSettings.file_picker_callback;
        if (fileBrowserCallback && (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[fileType])) {
          actionCallback = function () {
            var meta = self.fire('beforecall').meta;
            meta = Tools.extend({ filetype: fileType }, meta);
            fileBrowserCallback.call(editor, function (value, meta) {
              self.value(value).fire('change', { meta: meta });
            }, self.value(), meta);
          };
        } else {
          fileBrowserCallback = editorSettings.file_browser_callback;
          if (fileBrowserCallback && (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[fileType])) {
            actionCallback = function () {
              fileBrowserCallback(self.getEl('inp').id, self.value(), fileType, window);
            };
          }
        }
      }
      if (actionCallback) {
        settings.icon = 'browse';
        settings.onaction = actionCallback;
      }
      self._super(settings);
      self.classes.add('filepicker');
      setupAutoCompleteHandler(self, editorSettings, editor.getBody(), fileType);
      setupLinkValidatorHandler(self, editorSettings, fileType);
    }
  });

  var FitLayout = AbsoluteLayout.extend({
    recalc: function (container) {
      var contLayoutRect = container.layoutRect(), paddingBox = container.paddingBox;
      container.items().filter(':visible').each(function (ctrl) {
        ctrl.layoutRect({
          x: paddingBox.left,
          y: paddingBox.top,
          w: contLayoutRect.innerW - paddingBox.right - paddingBox.left,
          h: contLayoutRect.innerH - paddingBox.top - paddingBox.bottom
        });
        if (ctrl.recalc) {
          ctrl.recalc();
        }
      });
    }
  });

  var FlexLayout = AbsoluteLayout.extend({
    recalc: function (container) {
      var i, l, items, contLayoutRect, contPaddingBox, contSettings, align, pack, spacing, totalFlex, availableSpace, direction;
      var ctrl, ctrlLayoutRect, ctrlSettings, flex;
      var maxSizeItems = [];
      var size, maxSize, ratio, rect, pos, maxAlignEndPos;
      var sizeName, minSizeName, posName, maxSizeName, beforeName, innerSizeName, deltaSizeName, contentSizeName;
      var alignAxisName, alignInnerSizeName, alignSizeName, alignMinSizeName, alignBeforeName, alignAfterName;
      var alignDeltaSizeName, alignContentSizeName;
      var max = Math.max, min = Math.min;
      items = container.items().filter(':visible');
      contLayoutRect = container.layoutRect();
      contPaddingBox = container.paddingBox;
      contSettings = container.settings;
      direction = container.isRtl() ? contSettings.direction || 'row-reversed' : contSettings.direction;
      align = contSettings.align;
      pack = container.isRtl() ? contSettings.pack || 'end' : contSettings.pack;
      spacing = contSettings.spacing || 0;
      if (direction === 'row-reversed' || direction === 'column-reverse') {
        items = items.set(items.toArray().reverse());
        direction = direction.split('-')[0];
      }
      if (direction === 'column') {
        posName = 'y';
        sizeName = 'h';
        minSizeName = 'minH';
        maxSizeName = 'maxH';
        innerSizeName = 'innerH';
        beforeName = 'top';
        deltaSizeName = 'deltaH';
        contentSizeName = 'contentH';
        alignBeforeName = 'left';
        alignSizeName = 'w';
        alignAxisName = 'x';
        alignInnerSizeName = 'innerW';
        alignMinSizeName = 'minW';
        alignAfterName = 'right';
        alignDeltaSizeName = 'deltaW';
        alignContentSizeName = 'contentW';
      } else {
        posName = 'x';
        sizeName = 'w';
        minSizeName = 'minW';
        maxSizeName = 'maxW';
        innerSizeName = 'innerW';
        beforeName = 'left';
        deltaSizeName = 'deltaW';
        contentSizeName = 'contentW';
        alignBeforeName = 'top';
        alignSizeName = 'h';
        alignAxisName = 'y';
        alignInnerSizeName = 'innerH';
        alignMinSizeName = 'minH';
        alignAfterName = 'bottom';
        alignDeltaSizeName = 'deltaH';
        alignContentSizeName = 'contentH';
      }
      availableSpace = contLayoutRect[innerSizeName] - contPaddingBox[beforeName] - contPaddingBox[beforeName];
      maxAlignEndPos = totalFlex = 0;
      for (i = 0, l = items.length; i < l; i++) {
        ctrl = items[i];
        ctrlLayoutRect = ctrl.layoutRect();
        ctrlSettings = ctrl.settings;
        flex = ctrlSettings.flex;
        availableSpace -= i < l - 1 ? spacing : 0;
        if (flex > 0) {
          totalFlex += flex;
          if (ctrlLayoutRect[maxSizeName]) {
            maxSizeItems.push(ctrl);
          }
          ctrlLayoutRect.flex = flex;
        }
        availableSpace -= ctrlLayoutRect[minSizeName];
        size = contPaddingBox[alignBeforeName] + ctrlLayoutRect[alignMinSizeName] + contPaddingBox[alignAfterName];
        if (size > maxAlignEndPos) {
          maxAlignEndPos = size;
        }
      }
      rect = {};
      if (availableSpace < 0) {
        rect[minSizeName] = contLayoutRect[minSizeName] - availableSpace + contLayoutRect[deltaSizeName];
      } else {
        rect[minSizeName] = contLayoutRect[innerSizeName] - availableSpace + contLayoutRect[deltaSizeName];
      }
      rect[alignMinSizeName] = maxAlignEndPos + contLayoutRect[alignDeltaSizeName];
      rect[contentSizeName] = contLayoutRect[innerSizeName] - availableSpace;
      rect[alignContentSizeName] = maxAlignEndPos;
      rect.minW = min(rect.minW, contLayoutRect.maxW);
      rect.minH = min(rect.minH, contLayoutRect.maxH);
      rect.minW = max(rect.minW, contLayoutRect.startMinWidth);
      rect.minH = max(rect.minH, contLayoutRect.startMinHeight);
      if (contLayoutRect.autoResize && (rect.minW !== contLayoutRect.minW || rect.minH !== contLayoutRect.minH)) {
        rect.w = rect.minW;
        rect.h = rect.minH;
        container.layoutRect(rect);
        this.recalc(container);
        if (container._lastRect === null) {
          var parentCtrl = container.parent();
          if (parentCtrl) {
            parentCtrl._lastRect = null;
            parentCtrl.recalc();
          }
        }
        return;
      }
      ratio = availableSpace / totalFlex;
      for (i = 0, l = maxSizeItems.length; i < l; i++) {
        ctrl = maxSizeItems[i];
        ctrlLayoutRect = ctrl.layoutRect();
        maxSize = ctrlLayoutRect[maxSizeName];
        size = ctrlLayoutRect[minSizeName] + ctrlLayoutRect.flex * ratio;
        if (size > maxSize) {
          availableSpace -= ctrlLayoutRect[maxSizeName] - ctrlLayoutRect[minSizeName];
          totalFlex -= ctrlLayoutRect.flex;
          ctrlLayoutRect.flex = 0;
          ctrlLayoutRect.maxFlexSize = maxSize;
        } else {
          ctrlLayoutRect.maxFlexSize = 0;
        }
      }
      ratio = availableSpace / totalFlex;
      pos = contPaddingBox[beforeName];
      rect = {};
      if (totalFlex === 0) {
        if (pack === 'end') {
          pos = availableSpace + contPaddingBox[beforeName];
        } else if (pack === 'center') {
          pos = Math.round(contLayoutRect[innerSizeName] / 2 - (contLayoutRect[innerSizeName] - availableSpace) / 2) + contPaddingBox[beforeName];
          if (pos < 0) {
            pos = contPaddingBox[beforeName];
          }
        } else if (pack === 'justify') {
          pos = contPaddingBox[beforeName];
          spacing = Math.floor(availableSpace / (items.length - 1));
        }
      }
      rect[alignAxisName] = contPaddingBox[alignBeforeName];
      for (i = 0, l = items.length; i < l; i++) {
        ctrl = items[i];
        ctrlLayoutRect = ctrl.layoutRect();
        size = ctrlLayoutRect.maxFlexSize || ctrlLayoutRect[minSizeName];
        if (align === 'center') {
          rect[alignAxisName] = Math.round(contLayoutRect[alignInnerSizeName] / 2 - ctrlLayoutRect[alignSizeName] / 2);
        } else if (align === 'stretch') {
          rect[alignSizeName] = max(ctrlLayoutRect[alignMinSizeName] || 0, contLayoutRect[alignInnerSizeName] - contPaddingBox[alignBeforeName] - contPaddingBox[alignAfterName]);
          rect[alignAxisName] = contPaddingBox[alignBeforeName];
        } else if (align === 'end') {
          rect[alignAxisName] = contLayoutRect[alignInnerSizeName] - ctrlLayoutRect[alignSizeName] - contPaddingBox.top;
        }
        if (ctrlLayoutRect.flex > 0) {
          size += ctrlLayoutRect.flex * ratio;
        }
        rect[sizeName] = size;
        rect[posName] = pos;
        ctrl.layoutRect(rect);
        if (ctrl.recalc) {
          ctrl.recalc();
        }
        pos += size + spacing;
      }
    }
  });

  var FlowLayout = Layout.extend({
    Defaults: {
      containerClass: 'flow-layout',
      controlClass: 'flow-layout-item',
      endClass: 'break'
    },
    recalc: function (container) {
      container.items().filter(':visible').each(function (ctrl) {
        if (ctrl.recalc) {
          ctrl.recalc();
        }
      });
    },
    isNative: function () {
      return true;
    }
  });

  var ClosestOrAncestor = function (is, ancestor, scope, a, isRoot) {
    return is(scope, a) ? $_eol4yusejcq8h9cb.some(scope) : $_12jp0rudjcq8h9ju.isFunction(isRoot) && isRoot(scope) ? $_eol4yusejcq8h9cb.none() : ancestor(scope, a, isRoot);
  };

  var first$2 = function (predicate) {
    return descendant$1($_xsdazu8jcq8h9j4.body(), predicate);
  };
  var ancestor$1 = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_12jp0rudjcq8h9ju.isFunction(isRoot) ? isRoot : $_1amajisfjcq8h9cd.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_4skodxu5jcq8h9ix.fromDom(element);
      if (predicate(el))
        return $_eol4yusejcq8h9cb.some(el);
      else if (stop(el))
        break;
    }
    return $_eol4yusejcq8h9cb.none();
  };
  var closest$1 = function (scope, predicate, isRoot) {
    var is = function (scope) {
      return predicate(scope);
    };
    return ClosestOrAncestor(is, ancestor$1, scope, predicate, isRoot);
  };
  var sibling$1 = function (scope, predicate) {
    var element = scope.dom();
    if (!element.parentNode)
      return $_eol4yusejcq8h9cb.none();
    return child$2($_4skodxu5jcq8h9ix.fromDom(element.parentNode), function (x) {
      return !$_bkm3rfukjcq8h9k5.eq(scope, x) && predicate(x);
    });
  };
  var child$2 = function (scope, predicate) {
    var result = $_flnht0sijcq8h9cx.find(scope.dom().childNodes, $_1amajisfjcq8h9cd.compose(predicate, $_4skodxu5jcq8h9ix.fromDom));
    return result.map($_4skodxu5jcq8h9ix.fromDom);
  };
  var descendant$1 = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_4skodxu5jcq8h9ix.fromDom(element.childNodes[i])))
          return $_eol4yusejcq8h9cb.some($_4skodxu5jcq8h9ix.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return $_eol4yusejcq8h9cb.none();
    };
    return descend(scope.dom());
  };
  var $_b4ti5iv6jcq8h9lt = {
    first: first$2,
    ancestor: ancestor$1,
    closest: closest$1,
    sibling: sibling$1,
    child: child$2,
    descendant: descendant$1
  };

  var first$1 = function (selector) {
    return $_bxp7liv0jcq8h9l4.one(selector);
  };
  var ancestor = function (scope, selector, isRoot) {
    return $_b4ti5iv6jcq8h9lt.ancestor(scope, function (e) {
      return $_bxp7liv0jcq8h9l4.is(e, selector);
    }, isRoot);
  };
  var sibling = function (scope, selector) {
    return $_b4ti5iv6jcq8h9lt.sibling(scope, function (e) {
      return $_bxp7liv0jcq8h9l4.is(e, selector);
    });
  };
  var child$1 = function (scope, selector) {
    return $_b4ti5iv6jcq8h9lt.child(scope, function (e) {
      return $_bxp7liv0jcq8h9l4.is(e, selector);
    });
  };
  var descendant = function (scope, selector) {
    return $_bxp7liv0jcq8h9l4.one(selector, scope);
  };
  var closest = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_bxp7liv0jcq8h9l4.is, ancestor, scope, selector, isRoot);
  };
  var $_11itigv5jcq8h9ls = {
    first: first$1,
    ancestor: ancestor,
    sibling: sibling,
    child: child$1,
    descendant: descendant,
    closest: closest
  };

  var toggleFormat = function (editor, fmt) {
    return function () {
      editor.execCommand('mceToggleFormat', false, fmt);
    };
  };
  var postRenderFormat = function (editor, name) {
    return function () {
      var self = this;
      if (editor.formatter) {
        editor.formatter.formatChanged(name, function (state) {
          self.active(state);
        });
      } else {
        editor.on('init', function () {
          editor.formatter.formatChanged(name, function (state) {
            self.active(state);
          });
        });
      }
    };
  };
  var $_7kzplcv9jcq8h9m4 = {
    toggleFormat: toggleFormat,
    postRenderFormat: postRenderFormat
  };

  var register = function (editor) {
    editor.addMenuItem('align', {
      text: 'Align',
      menu: [
        {
          text: 'Left',
          icon: 'alignleft',
          onclick: $_7kzplcv9jcq8h9m4.toggleFormat(editor, 'alignleft')
        },
        {
          text: 'Center',
          icon: 'aligncenter',
          onclick: $_7kzplcv9jcq8h9m4.toggleFormat(editor, 'aligncenter')
        },
        {
          text: 'Right',
          icon: 'alignright',
          onclick: $_7kzplcv9jcq8h9m4.toggleFormat(editor, 'alignright')
        },
        {
          text: 'Justify',
          icon: 'alignjustify',
          onclick: $_7kzplcv9jcq8h9m4.toggleFormat(editor, 'alignjustify')
        }
      ]
    });
    Tools.each({
      alignleft: [
        'Align left',
        'JustifyLeft'
      ],
      aligncenter: [
        'Align center',
        'JustifyCenter'
      ],
      alignright: [
        'Align right',
        'JustifyRight'
      ],
      alignjustify: [
        'Justify',
        'JustifyFull'
      ],
      alignnone: [
        'No alignment',
        'JustifyNone'
      ]
    }, function (item, name) {
      editor.addButton(name, {
        active: false,
        tooltip: item[0],
        cmd: item[1],
        onPostRender: $_7kzplcv9jcq8h9m4.postRenderFormat(editor, name)
      });
    });
  };
  var $_8s51wcv8jcq8h9m3 = { register: register };

  var getSpecifiedFontProp = function (propName, rootElm, elm) {
    while (elm !== rootElm) {
      if (elm.style[propName]) {
        var foundStyle = elm.style[propName];
        return foundStyle !== '' ? $_eol4yusejcq8h9cb.some(foundStyle) : $_eol4yusejcq8h9cb.none();
      }
      elm = elm.parentNode;
    }
    return $_eol4yusejcq8h9cb.none();
  };
  var round = function (number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  };
  var toPt = function (fontSize, precision) {
    if (/[0-9.]+px$/.test(fontSize)) {
      return round(parseInt(fontSize, 10) * 72 / 96, precision || 0) + 'pt';
    }
    return fontSize;
  };
  var normalizeFontFamily = function (fontFamily) {
    return fontFamily.replace(/[\'\"]/g, '').replace(/,\s+/g, ',');
  };
  var getComputedFontProp = function (propName, elm) {
    return $_eol4yusejcq8h9cb.from(DOMUtils.DOM.getStyle(elm, propName, true));
  };
  var getFontProp = function (propName) {
    return function (rootElm, elm) {
      return $_eol4yusejcq8h9cb.from(elm).map($_4skodxu5jcq8h9ix.fromDom).filter($_cbxoqmuajcq8h9jj.isElement).bind(function (element) {
        return getSpecifiedFontProp(propName, rootElm, element.dom()).or(getComputedFontProp(propName, element.dom()));
      }).getOr('');
    };
  };
  var $_8oiedqvbjcq8h9m8 = {
    getFontSize: getFontProp('fontSize'),
    getFontFamily: $_1amajisfjcq8h9cd.compose(normalizeFontFamily, getFontProp('fontFamily')),
    toPt: toPt
  };

  var getFirstFont = function (fontFamily) {
    return fontFamily ? fontFamily.split(',')[0] : '';
  };
  var findMatchingValue = function (items, fontFamily) {
    var value;
    Tools.each(items, function (item) {
      if (item.value.toLowerCase() === fontFamily.toLowerCase()) {
        value = item.value;
      }
    });
    Tools.each(items, function (item) {
      if (!value && getFirstFont(item.value).toLowerCase() === getFirstFont(fontFamily).toLowerCase()) {
        value = item.value;
      }
    });
    return value;
  };
  var createFontNameListBoxChangeHandler = function (editor, items) {
    return function () {
      var self = this;
      editor.on('init nodeChange', function (e) {
        var fontFamily = $_8oiedqvbjcq8h9m8.getFontFamily(editor.getBody(), e.element);
        var match = findMatchingValue(items, fontFamily);
        self.value(match ? match : null);
        if (!match && fontFamily) {
          self.text(getFirstFont(fontFamily));
        }
      });
    };
  };
  var createFormats = function (formats) {
    formats = formats.replace(/;$/, '').split(';');
    var i = formats.length;
    while (i--) {
      formats[i] = formats[i].split('=');
    }
    return formats;
  };
  var getFontItems = function (editor) {
    var defaultFontsFormats = 'Andale Mono=andale mono,monospace;' + 'Arial=arial,helvetica,sans-serif;' + 'Arial Black=arial black,sans-serif;' + 'Book Antiqua=book antiqua,palatino,serif;' + 'Comic Sans MS=comic sans ms,sans-serif;' + 'Courier New=courier new,courier,monospace;' + 'Georgia=georgia,palatino,serif;' + 'Helvetica=helvetica,arial,sans-serif;' + 'Impact=impact,sans-serif;' + 'Symbol=symbol;' + 'Tahoma=tahoma,arial,helvetica,sans-serif;' + 'Terminal=terminal,monaco,monospace;' + 'Times New Roman=times new roman,times,serif;' + 'Trebuchet MS=trebuchet ms,geneva,sans-serif;' + 'Verdana=verdana,geneva,sans-serif;' + 'Webdings=webdings;' + 'Wingdings=wingdings,zapf dingbats';
    var fonts = createFormats(editor.settings.font_formats || defaultFontsFormats);
    return Tools.map(fonts, function (font) {
      return {
        text: { raw: font[0] },
        value: font[1],
        textStyle: font[1].indexOf('dings') === -1 ? 'font-family:' + font[1] : ''
      };
    });
  };
  var registerButtons = function (editor) {
    editor.addButton('fontselect', function () {
      var items = getFontItems(editor);
      return {
        type: 'listbox',
        text: 'Font Family',
        tooltip: 'Font Family',
        values: items,
        fixedWidth: true,
        onPostRender: createFontNameListBoxChangeHandler(editor, items),
        onselect: function (e) {
          if (e.control.settings.value) {
            editor.execCommand('FontName', false, e.control.settings.value);
          }
        }
      };
    });
  };
  var register$1 = function (editor) {
    registerButtons(editor);
  };
  var $_3xq8lxvajcq8h9m5 = { register: register$1 };

  var findMatchingValue$1 = function (items, pt, px) {
    var value;
    Tools.each(items, function (item) {
      if (item.value === px) {
        value = px;
      } else if (item.value === pt) {
        value = pt;
      }
    });
    return value;
  };
  var createFontSizeListBoxChangeHandler = function (editor, items) {
    return function () {
      var self = this;
      editor.on('init nodeChange', function (e) {
        var px, pt, precision, match;
        px = $_8oiedqvbjcq8h9m8.getFontSize(editor.getBody(), e.element);
        if (px) {
          for (precision = 3; !match && precision >= 0; precision--) {
            pt = $_8oiedqvbjcq8h9m8.toPt(px, precision);
            match = findMatchingValue$1(items, pt, px);
          }
        }
        self.value(match ? match : null);
        if (!match) {
          self.text(pt);
        }
      });
    };
  };
  var getFontSizeItems = function (editor) {
    var defaultFontsizeFormats = '8pt 10pt 12pt 14pt 18pt 24pt 36pt';
    var fontsizeFormats = editor.settings.fontsize_formats || defaultFontsizeFormats;
    return Tools.map(fontsizeFormats.split(' '), function (item) {
      var text = item, value = item;
      var values = item.split('=');
      if (values.length > 1) {
        text = values[0];
        value = values[1];
      }
      return {
        text: text,
        value: value
      };
    });
  };
  var registerButtons$1 = function (editor) {
    editor.addButton('fontsizeselect', function () {
      var items = getFontSizeItems(editor);
      return {
        type: 'listbox',
        text: 'Font Sizes',
        tooltip: 'Font Sizes',
        values: items,
        fixedWidth: true,
        onPostRender: createFontSizeListBoxChangeHandler(editor, items),
        onclick: function (e) {
          if (e.control.settings.value) {
            editor.execCommand('FontSize', false, e.control.settings.value);
          }
        }
      };
    });
  };
  var register$2 = function (editor) {
    registerButtons$1(editor);
  };
  var $_e323drvcjcq8h9md = { register: register$2 };

  var defaultBlocks = 'Paragraph=p;' + 'Heading 1=h1;' + 'Heading 2=h2;' + 'Heading 3=h3;' + 'Heading 4=h4;' + 'Heading 5=h5;' + 'Heading 6=h6;' + 'Preformatted=pre';
  var createFormats$1 = function (formats) {
    formats = formats.replace(/;$/, '').split(';');
    var i = formats.length;
    while (i--) {
      formats[i] = formats[i].split('=');
    }
    return formats;
  };
  var createListBoxChangeHandler = function (editor, items, formatName) {
    return function () {
      var self = this;
      editor.on('nodeChange', function (e) {
        var formatter = editor.formatter;
        var value = null;
        Tools.each(e.parents, function (node) {
          Tools.each(items, function (item) {
            if (formatName) {
              if (formatter.matchNode(node, formatName, { value: item.value })) {
                value = item.value;
              }
            } else {
              if (formatter.matchNode(node, item.value)) {
                value = item.value;
              }
            }
            if (value) {
              return false;
            }
          });
          if (value) {
            return false;
          }
        });
        self.value(value);
      });
    };
  };
  var lazyFormatSelectBoxItems = function (editor, blocks) {
    return function () {
      var items = [];
      Tools.each(blocks, function (block) {
        items.push({
          text: block[0],
          value: block[1],
          textStyle: function () {
            return editor.formatter.getCssText(block[1]);
          }
        });
      });
      return {
        type: 'listbox',
        text: blocks[0][0],
        values: items,
        fixedWidth: true,
        onselect: function (e) {
          if (e.control) {
            var fmt = e.control.value();
            $_7kzplcv9jcq8h9m4.toggleFormat(editor, fmt)();
          }
        },
        onPostRender: createListBoxChangeHandler(editor, items)
      };
    };
  };
  var buildMenuItems = function (editor, blocks) {
    return Tools.map(blocks, function (block) {
      return {
        text: block[0],
        onclick: $_7kzplcv9jcq8h9m4.toggleFormat(editor, block[1]),
        textStyle: function () {
          return editor.formatter.getCssText(block[1]);
        }
      };
    });
  };
  var register$3 = function (editor) {
    var blocks = createFormats$1(editor.settings.block_formats || defaultBlocks);
    editor.addMenuItem('blockformats', {
      text: 'Blocks',
      menu: buildMenuItems(editor, blocks)
    });
    editor.addButton('formatselect', lazyFormatSelectBoxItems(editor, blocks));
  };
  var $_3ogxarvdjcq8h9mf = { register: register$3 };

  var hideMenuObjects = function (editor, menu) {
    var count = menu.length;
    Tools.each(menu, function (item) {
      if (item.menu) {
        item.hidden = hideMenuObjects(editor, item.menu) === 0;
      }
      var formatName = item.format;
      if (formatName) {
        item.hidden = !editor.formatter.canApply(formatName);
      }
      if (item.hidden) {
        count--;
      }
    });
    return count;
  };
  var hideFormatMenuItems = function (editor, menu) {
    var count = menu.items().length;
    menu.items().each(function (item) {
      if (item.menu) {
        item.visible(hideFormatMenuItems(editor, item.menu) > 0);
      }
      if (!item.menu && item.settings.menu) {
        item.visible(hideMenuObjects(editor, item.settings.menu) > 0);
      }
      var formatName = item.settings.format;
      if (formatName) {
        item.visible(editor.formatter.canApply(formatName));
      }
      if (!item.visible()) {
        count--;
      }
    });
    return count;
  };
  var createFormatMenu = function (editor) {
    var count = 0;
    var newFormats = [];
    var defaultStyleFormats = [
      {
        title: 'Headings',
        items: [
          {
            title: 'Heading 1',
            format: 'h1'
          },
          {
            title: 'Heading 2',
            format: 'h2'
          },
          {
            title: 'Heading 3',
            format: 'h3'
          },
          {
            title: 'Heading 4',
            format: 'h4'
          },
          {
            title: 'Heading 5',
            format: 'h5'
          },
          {
            title: 'Heading 6',
            format: 'h6'
          }
        ]
      },
      {
        title: 'Inline',
        items: [
          {
            title: 'Bold',
            icon: 'bold',
            format: 'bold'
          },
          {
            title: 'Italic',
            icon: 'italic',
            format: 'italic'
          },
          {
            title: 'Underline',
            icon: 'underline',
            format: 'underline'
          },
          {
            title: 'Strikethrough',
            icon: 'strikethrough',
            format: 'strikethrough'
          },
          {
            title: 'Superscript',
            icon: 'superscript',
            format: 'superscript'
          },
          {
            title: 'Subscript',
            icon: 'subscript',
            format: 'subscript'
          },
          {
            title: 'Code',
            icon: 'code',
            format: 'code'
          }
        ]
      },
      {
        title: 'Blocks',
        items: [
          {
            title: 'Paragraph',
            format: 'p'
          },
          {
            title: 'Blockquote',
            format: 'blockquote'
          },
          {
            title: 'Div',
            format: 'div'
          },
          {
            title: 'Pre',
            format: 'pre'
          }
        ]
      },
      {
        title: 'Alignment',
        items: [
          {
            title: 'Left',
            icon: 'alignleft',
            format: 'alignleft'
          },
          {
            title: 'Center',
            icon: 'aligncenter',
            format: 'aligncenter'
          },
          {
            title: 'Right',
            icon: 'alignright',
            format: 'alignright'
          },
          {
            title: 'Justify',
            icon: 'alignjustify',
            format: 'alignjustify'
          }
        ]
      }
    ];
    var createMenu = function (formats) {
      var menu = [];
      if (!formats) {
        return;
      }
      Tools.each(formats, function (format) {
        var menuItem = {
          text: format.title,
          icon: format.icon
        };
        if (format.items) {
          menuItem.menu = createMenu(format.items);
        } else {
          var formatName = format.format || 'custom' + count++;
          if (!format.format) {
            format.name = formatName;
            newFormats.push(format);
          }
          menuItem.format = formatName;
          menuItem.cmd = format.cmd;
        }
        menu.push(menuItem);
      });
      return menu;
    };
    var createStylesMenu = function () {
      var menu;
      if (editor.settings.style_formats_merge) {
        if (editor.settings.style_formats) {
          menu = createMenu(defaultStyleFormats.concat(editor.settings.style_formats));
        } else {
          menu = createMenu(defaultStyleFormats);
        }
      } else {
        menu = createMenu(editor.settings.style_formats || defaultStyleFormats);
      }
      return menu;
    };
    editor.on('init', function () {
      Tools.each(newFormats, function (format) {
        editor.formatter.register(format.name, format);
      });
    });
    return {
      type: 'menu',
      items: createStylesMenu(),
      onPostRender: function (e) {
        editor.fire('renderFormatsMenu', { control: e.control });
      },
      itemDefaults: {
        preview: true,
        textStyle: function () {
          if (this.settings.format) {
            return editor.formatter.getCssText(this.settings.format);
          }
        },
        onPostRender: function () {
          var self = this;
          self.parent().on('show', function () {
            var formatName, command;
            formatName = self.settings.format;
            if (formatName) {
              self.disabled(!editor.formatter.canApply(formatName));
              self.active(editor.formatter.match(formatName));
            }
            command = self.settings.cmd;
            if (command) {
              self.active(editor.queryCommandState(command));
            }
          });
        },
        onclick: function () {
          if (this.settings.format) {
            $_7kzplcv9jcq8h9m4.toggleFormat(editor, this.settings.format)();
          }
          if (this.settings.cmd) {
            editor.execCommand(this.settings.cmd);
          }
        }
      }
    };
  };
  var registerMenuItems = function (editor, formatMenu) {
    editor.addMenuItem('formats', {
      text: 'Formats',
      menu: formatMenu
    });
  };
  var registerButtons$2 = function (editor, formatMenu) {
    editor.addButton('styleselect', {
      type: 'menubutton',
      text: 'Formats',
      menu: formatMenu,
      onShowMenu: function () {
        if (editor.settings.style_formats_autohide) {
          hideFormatMenuItems(editor, this.menu);
        }
      }
    });
  };
  var register$4 = function (editor) {
    var formatMenu = createFormatMenu(editor);
    registerMenuItems(editor, formatMenu);
    registerButtons$2(editor, formatMenu);
  };
  var $_5cc93avejcq8h9mi = { register: register$4 };

  var createCustomMenuItems = function (editor, names) {
    var items, nameList;
    if (typeof names === 'string') {
      nameList = names.split(' ');
    } else if (Tools.isArray(names)) {
      return $_flnht0sijcq8h9cx.flatten(Tools.map(names, function (names) {
        return createCustomMenuItems(editor, names);
      }));
    }
    items = Tools.grep(nameList, function (name) {
      return name === '|' || name in editor.menuItems;
    });
    return Tools.map(items, function (name) {
      return name === '|' ? { text: '-' } : editor.menuItems[name];
    });
  };
  var isSeparator$1 = function (menuItem) {
    return menuItem && menuItem.text === '-';
  };
  var trimMenuItems = function (menuItems) {
    var menuItems2 = $_flnht0sijcq8h9cx.filter(menuItems, function (menuItem, i, menuItems) {
      return !isSeparator$1(menuItem) || !isSeparator$1(menuItems[i - 1]);
    });
    return $_flnht0sijcq8h9cx.filter(menuItems2, function (menuItem, i, menuItems) {
      return !isSeparator$1(menuItem) || i > 0 && i < menuItems.length - 1;
    });
  };
  var createContextMenuItems = function (editor, context) {
    var outputMenuItems = [{ text: '-' }];
    var menuItems = Tools.grep(editor.menuItems, function (menuItem) {
      return menuItem.context === context;
    });
    Tools.each(menuItems, function (menuItem) {
      if (menuItem.separator === 'before') {
        outputMenuItems.push({ text: '|' });
      }
      if (menuItem.prependToContext) {
        outputMenuItems.unshift(menuItem);
      } else {
        outputMenuItems.push(menuItem);
      }
      if (menuItem.separator === 'after') {
        outputMenuItems.push({ text: '|' });
      }
    });
    return outputMenuItems;
  };
  var createInsertMenu = function (editor) {
    var insertButtonItems = editor.settings.insert_button_items;
    if (insertButtonItems) {
      return trimMenuItems(createCustomMenuItems(editor, insertButtonItems));
    } else {
      return trimMenuItems(createContextMenuItems(editor, 'insert'));
    }
  };
  var registerButtons$3 = function (editor) {
    editor.addButton('insert', {
      type: 'menubutton',
      icon: 'insert',
      menu: [],
      oncreatemenu: function () {
        this.menu.add(createInsertMenu(editor));
        this.menu.renderNew();
      }
    });
  };
  var register$5 = function (editor) {
    registerButtons$3(editor);
  };
  var $_blieqbvfjcq8h9mm = { register: register$5 };

  var registerFormatButtons = function (editor) {
    Tools.each({
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      strikethrough: 'Strikethrough',
      subscript: 'Subscript',
      superscript: 'Superscript'
    }, function (text, name) {
      editor.addButton(name, {
        active: false,
        tooltip: text,
        onPostRender: $_7kzplcv9jcq8h9m4.postRenderFormat(editor, name),
        onclick: $_7kzplcv9jcq8h9m4.toggleFormat(editor, name)
      });
    });
  };
  var registerCommandButtons = function (editor) {
    Tools.each({
      outdent: [
        'Decrease indent',
        'Outdent'
      ],
      indent: [
        'Increase indent',
        'Indent'
      ],
      cut: [
        'Cut',
        'Cut'
      ],
      copy: [
        'Copy',
        'Copy'
      ],
      paste: [
        'Paste',
        'Paste'
      ],
      help: [
        'Help',
        'mceHelp'
      ],
      selectall: [
        'Select all',
        'SelectAll'
      ],
      visualaid: [
        'Visual aids',
        'mceToggleVisualAid'
      ],
      newdocument: [
        'New document',
        'mceNewDocument'
      ],
      removeformat: [
        'Clear formatting',
        'RemoveFormat'
      ],
      remove: [
        'Remove',
        'Delete'
      ]
    }, function (item, name) {
      editor.addButton(name, {
        tooltip: item[0],
        cmd: item[1]
      });
    });
  };
  var registerCommandToggleButtons = function (editor) {
    Tools.each({
      blockquote: [
        'Blockquote',
        'mceBlockQuote'
      ],
      subscript: [
        'Subscript',
        'Subscript'
      ],
      superscript: [
        'Superscript',
        'Superscript'
      ]
    }, function (item, name) {
      editor.addButton(name, {
        active: false,
        tooltip: item[0],
        cmd: item[1],
        onPostRender: $_7kzplcv9jcq8h9m4.postRenderFormat(editor, name)
      });
    });
  };
  var registerButtons$4 = function (editor) {
    registerFormatButtons(editor);
    registerCommandButtons(editor);
    registerCommandToggleButtons(editor);
  };
  var registerMenuItems$1 = function (editor) {
    Tools.each({
      bold: [
        'Bold',
        'Bold',
        'Meta+B'
      ],
      italic: [
        'Italic',
        'Italic',
        'Meta+I'
      ],
      underline: [
        'Underline',
        'Underline',
        'Meta+U'
      ],
      strikethrough: [
        'Strikethrough',
        'Strikethrough'
      ],
      subscript: [
        'Subscript',
        'Subscript'
      ],
      superscript: [
        'Superscript',
        'Superscript'
      ],
      removeformat: [
        'Clear formatting',
        'RemoveFormat'
      ],
      newdocument: [
        'New document',
        'mceNewDocument'
      ],
      cut: [
        'Cut',
        'Cut',
        'Meta+X'
      ],
      copy: [
        'Copy',
        'Copy',
        'Meta+C'
      ],
      paste: [
        'Paste',
        'Paste',
        'Meta+V'
      ],
      selectall: [
        'Select all',
        'SelectAll',
        'Meta+A'
      ]
    }, function (item, name) {
      editor.addMenuItem(name, {
        text: item[0],
        icon: name,
        shortcut: item[2],
        cmd: item[1]
      });
    });
    editor.addMenuItem('codeformat', {
      text: 'Code',
      icon: 'code',
      onclick: $_7kzplcv9jcq8h9m4.toggleFormat(editor, 'code')
    });
  };
  var register$6 = function (editor) {
    registerButtons$4(editor);
    registerMenuItems$1(editor);
  };
  var $_5q4rtevgjcq8h9mt = { register: register$6 };

  var toggleUndoRedoState = function (editor, type) {
    return function () {
      var self = this;
      var checkState = function () {
        var typeFn = type === 'redo' ? 'hasRedo' : 'hasUndo';
        return editor.undoManager ? editor.undoManager[typeFn]() : false;
      };
      self.disabled(!checkState());
      editor.on('Undo Redo AddUndo TypingUndo ClearUndos SwitchMode', function () {
        self.disabled(editor.readonly || !checkState());
      });
    };
  };
  var registerMenuItems$2 = function (editor) {
    editor.addMenuItem('undo', {
      text: 'Undo',
      icon: 'undo',
      shortcut: 'Meta+Z',
      onPostRender: toggleUndoRedoState(editor, 'undo'),
      cmd: 'undo'
    });
    editor.addMenuItem('redo', {
      text: 'Redo',
      icon: 'redo',
      shortcut: 'Meta+Y',
      onPostRender: toggleUndoRedoState(editor, 'redo'),
      cmd: 'redo'
    });
  };
  var registerButtons$5 = function (editor) {
    editor.addButton('undo', {
      tooltip: 'Undo',
      onPostRender: toggleUndoRedoState(editor, 'undo'),
      cmd: 'undo'
    });
    editor.addButton('redo', {
      tooltip: 'Redo',
      onPostRender: toggleUndoRedoState(editor, 'redo'),
      cmd: 'redo'
    });
  };
  var register$7 = function (editor) {
    registerMenuItems$2(editor);
    registerButtons$5(editor);
  };
  var $_21dm2yvhjcq8h9n5 = { register: register$7 };

  var toggleVisualAidState = function (editor) {
    return function () {
      var self = this;
      editor.on('VisualAid', function (e) {
        self.active(e.hasVisual);
      });
      self.active(editor.hasVisual);
    };
  };
  var registerMenuItems$3 = function (editor) {
    editor.addMenuItem('visualaid', {
      text: 'Visual aids',
      selectable: true,
      onPostRender: toggleVisualAidState(editor),
      cmd: 'mceToggleVisualAid'
    });
  };
  var register$8 = function (editor) {
    registerMenuItems$3(editor);
  };
  var $_2l2916vijcq8h9n7 = { register: register$8 };

  var setupEnvironment = function () {
    Widget.tooltips = !Env.iOS;
    Control$1.translate = function (text) {
      return EditorManager.translate(text);
    };
  };
  var setupUiContainer = function (editor) {
    if (editor.settings.ui_container) {
      Env.container = $_11itigv5jcq8h9ls.descendant($_4skodxu5jcq8h9ix.fromDom(document.body), editor.settings.ui_container).fold($_1amajisfjcq8h9cd.constant(null), function (elm) {
        return elm.dom();
      });
    }
  };
  var setupRtlMode = function (editor) {
    if (editor.rtl) {
      Control$1.rtl = true;
    }
  };
  var setupHideFloatPanels = function (editor) {
    editor.on('mousedown', function () {
      FloatPanel.hideAll();
    });
  };
  var setup$1 = function (editor) {
    setupRtlMode(editor);
    setupHideFloatPanels(editor);
    setupUiContainer(editor);
    setupEnvironment();
    $_3ogxarvdjcq8h9mf.register(editor);
    $_8s51wcv8jcq8h9m3.register(editor);
    $_5q4rtevgjcq8h9mt.register(editor);
    $_21dm2yvhjcq8h9n5.register(editor);
    $_e323drvcjcq8h9md.register(editor);
    $_3xq8lxvajcq8h9m5.register(editor);
    $_5cc93avejcq8h9mi.register(editor);
    $_2l2916vijcq8h9n7.register(editor);
    $_blieqbvfjcq8h9mm.register(editor);
  };
  var $_4y9pxv4jcq8h9lo = { setup: setup$1 };

  var GridLayout = AbsoluteLayout.extend({
    recalc: function (container) {
      var settings, rows, cols, items, contLayoutRect, width, height, rect, ctrlLayoutRect, ctrl, x, y, posX, posY, ctrlSettings, contPaddingBox, align, spacingH, spacingV, alignH, alignV, maxX, maxY;
      var colWidths = [];
      var rowHeights = [];
      var ctrlMinWidth, ctrlMinHeight, availableWidth, availableHeight, reverseRows, idx;
      settings = container.settings;
      items = container.items().filter(':visible');
      contLayoutRect = container.layoutRect();
      cols = settings.columns || Math.ceil(Math.sqrt(items.length));
      rows = Math.ceil(items.length / cols);
      spacingH = settings.spacingH || settings.spacing || 0;
      spacingV = settings.spacingV || settings.spacing || 0;
      alignH = settings.alignH || settings.align;
      alignV = settings.alignV || settings.align;
      contPaddingBox = container.paddingBox;
      reverseRows = 'reverseRows' in settings ? settings.reverseRows : container.isRtl();
      if (alignH && typeof alignH === 'string') {
        alignH = [alignH];
      }
      if (alignV && typeof alignV === 'string') {
        alignV = [alignV];
      }
      for (x = 0; x < cols; x++) {
        colWidths.push(0);
      }
      for (y = 0; y < rows; y++) {
        rowHeights.push(0);
      }
      for (y = 0; y < rows; y++) {
        for (x = 0; x < cols; x++) {
          ctrl = items[y * cols + x];
          if (!ctrl) {
            break;
          }
          ctrlLayoutRect = ctrl.layoutRect();
          ctrlMinWidth = ctrlLayoutRect.minW;
          ctrlMinHeight = ctrlLayoutRect.minH;
          colWidths[x] = ctrlMinWidth > colWidths[x] ? ctrlMinWidth : colWidths[x];
          rowHeights[y] = ctrlMinHeight > rowHeights[y] ? ctrlMinHeight : rowHeights[y];
        }
      }
      availableWidth = contLayoutRect.innerW - contPaddingBox.left - contPaddingBox.right;
      for (maxX = 0, x = 0; x < cols; x++) {
        maxX += colWidths[x] + (x > 0 ? spacingH : 0);
        availableWidth -= (x > 0 ? spacingH : 0) + colWidths[x];
      }
      availableHeight = contLayoutRect.innerH - contPaddingBox.top - contPaddingBox.bottom;
      for (maxY = 0, y = 0; y < rows; y++) {
        maxY += rowHeights[y] + (y > 0 ? spacingV : 0);
        availableHeight -= (y > 0 ? spacingV : 0) + rowHeights[y];
      }
      maxX += contPaddingBox.left + contPaddingBox.right;
      maxY += contPaddingBox.top + contPaddingBox.bottom;
      rect = {};
      rect.minW = maxX + (contLayoutRect.w - contLayoutRect.innerW);
      rect.minH = maxY + (contLayoutRect.h - contLayoutRect.innerH);
      rect.contentW = rect.minW - contLayoutRect.deltaW;
      rect.contentH = rect.minH - contLayoutRect.deltaH;
      rect.minW = Math.min(rect.minW, contLayoutRect.maxW);
      rect.minH = Math.min(rect.minH, contLayoutRect.maxH);
      rect.minW = Math.max(rect.minW, contLayoutRect.startMinWidth);
      rect.minH = Math.max(rect.minH, contLayoutRect.startMinHeight);
      if (contLayoutRect.autoResize && (rect.minW !== contLayoutRect.minW || rect.minH !== contLayoutRect.minH)) {
        rect.w = rect.minW;
        rect.h = rect.minH;
        container.layoutRect(rect);
        this.recalc(container);
        if (container._lastRect === null) {
          var parentCtrl = container.parent();
          if (parentCtrl) {
            parentCtrl._lastRect = null;
            parentCtrl.recalc();
          }
        }
        return;
      }
      if (contLayoutRect.autoResize) {
        rect = container.layoutRect(rect);
        rect.contentW = rect.minW - contLayoutRect.deltaW;
        rect.contentH = rect.minH - contLayoutRect.deltaH;
      }
      var flexV;
      if (settings.packV === 'start') {
        flexV = 0;
      } else {
        flexV = availableHeight > 0 ? Math.floor(availableHeight / rows) : 0;
      }
      var totalFlex = 0;
      var flexWidths = settings.flexWidths;
      if (flexWidths) {
        for (x = 0; x < flexWidths.length; x++) {
          totalFlex += flexWidths[x];
        }
      } else {
        totalFlex = cols;
      }
      var ratio = availableWidth / totalFlex;
      for (x = 0; x < cols; x++) {
        colWidths[x] += flexWidths ? flexWidths[x] * ratio : ratio;
      }
      posY = contPaddingBox.top;
      for (y = 0; y < rows; y++) {
        posX = contPaddingBox.left;
        height = rowHeights[y] + flexV;
        for (x = 0; x < cols; x++) {
          if (reverseRows) {
            idx = y * cols + cols - 1 - x;
          } else {
            idx = y * cols + x;
          }
          ctrl = items[idx];
          if (!ctrl) {
            break;
          }
          ctrlSettings = ctrl.settings;
          ctrlLayoutRect = ctrl.layoutRect();
          width = Math.max(colWidths[x], ctrlLayoutRect.startMinWidth);
          ctrlLayoutRect.x = posX;
          ctrlLayoutRect.y = posY;
          align = ctrlSettings.alignH || (alignH ? alignH[x] || alignH[0] : null);
          if (align === 'center') {
            ctrlLayoutRect.x = posX + width / 2 - ctrlLayoutRect.w / 2;
          } else if (align === 'right') {
            ctrlLayoutRect.x = posX + width - ctrlLayoutRect.w;
          } else if (align === 'stretch') {
            ctrlLayoutRect.w = width;
          }
          align = ctrlSettings.alignV || (alignV ? alignV[x] || alignV[0] : null);
          if (align === 'center') {
            ctrlLayoutRect.y = posY + height / 2 - ctrlLayoutRect.h / 2;
          } else if (align === 'bottom') {
            ctrlLayoutRect.y = posY + height - ctrlLayoutRect.h;
          } else if (align === 'stretch') {
            ctrlLayoutRect.h = height;
          }
          ctrl.layoutRect(ctrlLayoutRect);
          posX += width + spacingH;
          if (ctrl.recalc) {
            ctrl.recalc();
          }
        }
        posY += height + spacingV;
      }
    }
  });

  var Iframe$1 = Widget.extend({
    renderHtml: function () {
      var self = this;
      self.classes.add('iframe');
      self.canFocus = false;
      return '<iframe id="' + self._id + '" class="' + self.classes + '" tabindex="-1" src="' + (self.settings.url || 'javascript:\'\'') + '" frameborder="0"></iframe>';
    },
    src: function (src) {
      this.getEl().src = src;
    },
    html: function (html, callback) {
      var self = this, body = this.getEl().contentWindow.document.body;
      if (!body) {
        Delay.setTimeout(function () {
          self.html(html);
        });
      } else {
        body.innerHTML = html;
        if (callback) {
          callback();
        }
      }
      return this;
    }
  });

  var InfoBox = Widget.extend({
    init: function (settings) {
      var self = this;
      self._super(settings);
      self.classes.add('widget').add('infobox');
      self.canFocus = false;
    },
    severity: function (level) {
      this.classes.remove('error');
      this.classes.remove('warning');
      this.classes.remove('success');
      this.classes.add(level);
    },
    help: function (state) {
      this.state.set('help', state);
    },
    renderHtml: function () {
      var self = this, prefix = self.classPrefix;
      return '<div id="' + self._id + '" class="' + self.classes + '">' + '<div id="' + self._id + '-body">' + self.encode(self.state.get('text')) + '<button role="button" tabindex="-1">' + '<i class="' + prefix + 'ico ' + prefix + 'i-help"></i>' + '</button>' + '</div>' + '</div>';
    },
    bindStates: function () {
      var self = this;
      self.state.on('change:text', function (e) {
        self.getEl('body').firstChild.data = self.encode(e.value);
        if (self.state.get('rendered')) {
          self.updateLayoutRect();
        }
      });
      self.state.on('change:help', function (e) {
        self.classes.toggle('has-help', e.value);
        if (self.state.get('rendered')) {
          self.updateLayoutRect();
        }
      });
      return self._super();
    }
  });

  var Label = Widget.extend({
    init: function (settings) {
      var self = this;
      self._super(settings);
      self.classes.add('widget').add('label');
      self.canFocus = false;
      if (settings.multiline) {
        self.classes.add('autoscroll');
      }
      if (settings.strong) {
        self.classes.add('strong');
      }
    },
    initLayoutRect: function () {
      var self = this, layoutRect = self._super();
      if (self.settings.multiline) {
        var size = funcs.getSize(self.getEl());
        if (size.width > layoutRect.maxW) {
          layoutRect.minW = layoutRect.maxW;
          self.classes.add('multiline');
        }
        self.getEl().style.width = layoutRect.minW + 'px';
        layoutRect.startMinH = layoutRect.h = layoutRect.minH = Math.min(layoutRect.maxH, funcs.getSize(self.getEl()).height);
      }
      return layoutRect;
    },
    repaint: function () {
      var self = this;
      if (!self.settings.multiline) {
        self.getEl().style.lineHeight = self.layoutRect().h + 'px';
      }
      return self._super();
    },
    severity: function (level) {
      this.classes.remove('error');
      this.classes.remove('warning');
      this.classes.remove('success');
      this.classes.add(level);
    },
    renderHtml: function () {
      var self = this;
      var targetCtrl, forName, forId = self.settings.forId;
      var text = self.settings.html ? self.settings.html : self.encode(self.state.get('text'));
      if (!forId && (forName = self.settings.forName)) {
        targetCtrl = self.getRoot().find('#' + forName)[0];
        if (targetCtrl) {
          forId = targetCtrl._id;
        }
      }
      if (forId) {
        return '<label id="' + self._id + '" class="' + self.classes + '"' + (forId ? ' for="' + forId + '"' : '') + '>' + text + '</label>';
      }
      return '<span id="' + self._id + '" class="' + self.classes + '">' + text + '</span>';
    },
    bindStates: function () {
      var self = this;
      self.state.on('change:text', function (e) {
        self.innerHtml(self.encode(e.value));
        if (self.state.get('rendered')) {
          self.updateLayoutRect();
        }
      });
      return self._super();
    }
  });

  var Toolbar$1 = Container.extend({
    Defaults: {
      role: 'toolbar',
      layout: 'flow'
    },
    init: function (settings) {
      var self = this;
      self._super(settings);
      self.classes.add('toolbar');
    },
    postRender: function () {
      var self = this;
      self.items().each(function (ctrl) {
        ctrl.classes.add('toolbar-item');
      });
      return self._super();
    }
  });

  var MenuBar = Toolbar$1.extend({
    Defaults: {
      role: 'menubar',
      containerCls: 'menubar',
      ariaRoot: true,
      defaults: { type: 'menubutton' }
    }
  });

  function isChildOf$1(node, parent) {
    while (node) {
      if (parent === node) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
  var MenuButton = Button.extend({
    init: function (settings) {
      var self = this;
      self._renderOpen = true;
      self._super(settings);
      settings = self.settings;
      self.classes.add('menubtn');
      if (settings.fixedWidth) {
        self.classes.add('fixed-width');
      }
      self.aria('haspopup', true);
      self.state.set('menu', settings.menu || self.render());
    },
    showMenu: function (toggle) {
      var self = this;
      var menu;
      if (self.menu && self.menu.visible() && toggle !== false) {
        return self.hideMenu();
      }
      if (!self.menu) {
        menu = self.state.get('menu') || [];
        self.classes.add('opened');
        if (menu.length) {
          menu = {
            type: 'menu',
            animate: true,
            items: menu
          };
        } else {
          menu.type = menu.type || 'menu';
          menu.animate = true;
        }
        if (!menu.renderTo) {
          self.menu = Factory.create(menu).parent(self).renderTo();
        } else {
          self.menu = menu.parent(self).show().renderTo();
        }
        self.fire('createmenu');
        self.menu.reflow();
        self.menu.on('cancel', function (e) {
          if (e.control.parent() === self.menu) {
            e.stopPropagation();
            self.focus();
            self.hideMenu();
          }
        });
        self.menu.on('select', function () {
          self.focus();
        });
        self.menu.on('show hide', function (e) {
          if (e.control === self.menu) {
            self.activeMenu(e.type === 'show');
            self.classes.toggle('opened', e.type === 'show');
          }
          self.aria('expanded', e.type === 'show');
        }).fire('show');
      }
      self.menu.show();
      self.menu.layoutRect({ w: self.layoutRect().w });
      self.menu.repaint();
      self.menu.moveRel(self.getEl(), self.isRtl() ? [
        'br-tr',
        'tr-br'
      ] : [
        'bl-tl',
        'tl-bl'
      ]);
      self.fire('showmenu');
    },
    hideMenu: function () {
      var self = this;
      if (self.menu) {
        self.menu.items().each(function (item) {
          if (item.hideMenu) {
            item.hideMenu();
          }
        });
        self.menu.hide();
      }
    },
    activeMenu: function (state) {
      this.classes.toggle('active', state);
    },
    renderHtml: function () {
      var self = this, id = self._id, prefix = self.classPrefix;
      var icon = self.settings.icon, image;
      var text = self.state.get('text');
      var textHtml = '';
      image = self.settings.image;
      if (image) {
        icon = 'none';
        if (typeof image !== 'string') {
          image = window.getSelection ? image[0] : image[1];
        }
        image = ' style="background-image: url(\'' + image + '\')"';
      } else {
        image = '';
      }
      if (text) {
        self.classes.add('btn-has-text');
        textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>';
      }
      icon = self.settings.icon ? prefix + 'ico ' + prefix + 'i-' + icon : '';
      self.aria('role', self.parent() instanceof MenuBar ? 'menuitem' : 'button');
      return '<div id="' + id + '" class="' + self.classes + '" tabindex="-1" aria-labelledby="' + id + '">' + '<button id="' + id + '-open" role="presentation" type="button" tabindex="-1">' + (icon ? '<i class="' + icon + '"' + image + '></i>' : '') + textHtml + ' <i class="' + prefix + 'caret"></i>' + '</button>' + '</div>';
    },
    postRender: function () {
      var self = this;
      self.on('click', function (e) {
        if (e.control === self && isChildOf$1(e.target, self.getEl())) {
          self.focus();
          self.showMenu(!e.aria);
          if (e.aria) {
            self.menu.items().filter(':visible')[0].focus();
          }
        }
      });
      self.on('mouseenter', function (e) {
        var overCtrl = e.control;
        var parent = self.parent();
        var hasVisibleSiblingMenu;
        if (overCtrl && parent && overCtrl instanceof MenuButton && overCtrl.parent() === parent) {
          parent.items().filter('MenuButton').each(function (ctrl) {
            if (ctrl.hideMenu && ctrl !== overCtrl) {
              if (ctrl.menu && ctrl.menu.visible()) {
                hasVisibleSiblingMenu = true;
              }
              ctrl.hideMenu();
            }
          });
          if (hasVisibleSiblingMenu) {
            overCtrl.focus();
            overCtrl.showMenu();
          }
        }
      });
      return self._super();
    },
    bindStates: function () {
      var self = this;
      self.state.on('change:menu', function () {
        if (self.menu) {
          self.menu.remove();
        }
        self.menu = null;
      });
      return self._super();
    },
    remove: function () {
      this._super();
      if (this.menu) {
        this.menu.remove();
      }
    }
  });

  var Menu = FloatPanel.extend({
    Defaults: {
      defaultType: 'menuitem',
      border: 1,
      layout: 'stack',
      role: 'application',
      bodyRole: 'menu',
      ariaRoot: true
    },
    init: function (settings) {
      var self = this;
      settings.autohide = true;
      settings.constrainToViewport = true;
      if (typeof settings.items === 'function') {
        settings.itemsFactory = settings.items;
        settings.items = [];
      }
      if (settings.itemDefaults) {
        var items = settings.items;
        var i = items.length;
        while (i--) {
          items[i] = Tools.extend({}, settings.itemDefaults, items[i]);
        }
      }
      self._super(settings);
      self.classes.add('menu');
      if (settings.animate && Env.ie !== 11) {
        self.classes.add('animate');
      }
    },
    repaint: function () {
      this.classes.toggle('menu-align', true);
      this._super();
      this.getEl().style.height = '';
      this.getEl('body').style.height = '';
      return this;
    },
    cancel: function () {
      var self = this;
      self.hideAll();
      self.fire('select');
    },
    load: function () {
      var self = this;
      var time, factory;
      function hideThrobber() {
        if (self.throbber) {
          self.throbber.hide();
          self.throbber = null;
        }
      }
      factory = self.settings.itemsFactory;
      if (!factory) {
        return;
      }
      if (!self.throbber) {
        self.throbber = new Throbber(self.getEl('body'), true);
        if (self.items().length === 0) {
          self.throbber.show();
          self.fire('loading');
        } else {
          self.throbber.show(100, function () {
            self.items().remove();
            self.fire('loading');
          });
        }
        self.on('hide close', hideThrobber);
      }
      self.requestTime = time = new Date().getTime();
      self.settings.itemsFactory(function (items) {
        if (items.length === 0) {
          self.hide();
          return;
        }
        if (self.requestTime !== time) {
          return;
        }
        self.getEl().style.width = '';
        self.getEl('body').style.width = '';
        hideThrobber();
        self.items().remove();
        self.getEl('body').innerHTML = '';
        self.add(items);
        self.renderNew();
        self.fire('loaded');
      });
    },
    hideAll: function () {
      var self = this;
      this.find('menuitem').exec('hideMenu');
      return self._super();
    },
    preRender: function () {
      var self = this;
      self.items().each(function (ctrl) {
        var settings = ctrl.settings;
        if (settings.icon || settings.image || settings.selectable) {
          self._hasIcons = true;
          return false;
        }
      });
      if (self.settings.itemsFactory) {
        self.on('postrender', function () {
          if (self.settings.itemsFactory) {
            self.load();
          }
        });
      }
      self.on('show hide', function (e) {
        if (e.control === self) {
          if (e.type === 'show') {
            Delay.setTimeout(function () {
              self.classes.add('in');
            }, 0);
          } else {
            self.classes.remove('in');
          }
        }
      });
      return self._super();
    }
  });

  var ListBox = MenuButton.extend({
    init: function (settings) {
      var self = this;
      var values, selected, selectedText, lastItemCtrl;
      function setSelected(menuValues) {
        for (var i = 0; i < menuValues.length; i++) {
          selected = menuValues[i].selected || settings.value === menuValues[i].value;
          if (selected) {
            selectedText = selectedText || menuValues[i].text;
            self.state.set('value', menuValues[i].value);
            return true;
          }
          if (menuValues[i].menu) {
            if (setSelected(menuValues[i].menu)) {
              return true;
            }
          }
        }
      }
      self._super(settings);
      settings = self.settings;
      self._values = values = settings.values;
      if (values) {
        if (typeof settings.value !== 'undefined') {
          setSelected(values);
        }
        if (!selected && values.length > 0) {
          selectedText = values[0].text;
          self.state.set('value', values[0].value);
        }
        self.state.set('menu', values);
      }
      self.state.set('text', settings.text || selectedText);
      self.classes.add('listbox');
      self.on('select', function (e) {
        var ctrl = e.control;
        if (lastItemCtrl) {
          e.lastControl = lastItemCtrl;
        }
        if (settings.multiple) {
          ctrl.active(!ctrl.active());
        } else {
          self.value(e.control.value());
        }
        lastItemCtrl = ctrl;
      });
    },
    bindStates: function () {
      var self = this;
      function activateMenuItemsByValue(menu, value) {
        if (menu instanceof Menu) {
          menu.items().each(function (ctrl) {
            if (!ctrl.hasMenus()) {
              ctrl.active(ctrl.value() === value);
            }
          });
        }
      }
      function getSelectedItem(menuValues, value) {
        var selectedItem;
        if (!menuValues) {
          return;
        }
        for (var i = 0; i < menuValues.length; i++) {
          if (menuValues[i].value === value) {
            return menuValues[i];
          }
          if (menuValues[i].menu) {
            selectedItem = getSelectedItem(menuValues[i].menu, value);
            if (selectedItem) {
              return selectedItem;
            }
          }
        }
      }
      self.on('show', function (e) {
        activateMenuItemsByValue(e.control, self.value());
      });
      self.state.on('change:value', function (e) {
        var selectedItem = getSelectedItem(self.state.get('menu'), e.value);
        if (selectedItem) {
          self.text(selectedItem.text);
        } else {
          self.text(self.settings.text);
        }
      });
      return self._super();
    }
  });

  var toggleTextStyle = function (ctrl, state) {
    var textStyle = ctrl._textStyle;
    if (textStyle) {
      var textElm = ctrl.getEl('text');
      textElm.setAttribute('style', textStyle);
      if (state) {
        textElm.style.color = '';
        textElm.style.backgroundColor = '';
      }
    }
  };
  var MenuItem = Widget.extend({
    Defaults: {
      border: 0,
      role: 'menuitem'
    },
    init: function (settings) {
      var self = this;
      var text;
      self._super(settings);
      settings = self.settings;
      self.classes.add('menu-item');
      if (settings.menu) {
        self.classes.add('menu-item-expand');
      }
      if (settings.preview) {
        self.classes.add('menu-item-preview');
      }
      text = self.state.get('text');
      if (text === '-' || text === '|') {
        self.classes.add('menu-item-sep');
        self.aria('role', 'separator');
        self.state.set('text', '-');
      }
      if (settings.selectable) {
        self.aria('role', 'menuitemcheckbox');
        self.classes.add('menu-item-checkbox');
        settings.icon = 'selected';
      }
      if (!settings.preview && !settings.selectable) {
        self.classes.add('menu-item-normal');
      }
      self.on('mousedown', function (e) {
        e.preventDefault();
      });
      if (settings.menu && !settings.ariaHideMenu) {
        self.aria('haspopup', true);
      }
    },
    hasMenus: function () {
      return !!this.settings.menu;
    },
    showMenu: function () {
      var self = this;
      var settings = self.settings;
      var menu;
      var parent = self.parent();
      parent.items().each(function (ctrl) {
        if (ctrl !== self) {
          ctrl.hideMenu();
        }
      });
      if (settings.menu) {
        menu = self.menu;
        if (!menu) {
          menu = settings.menu;
          if (menu.length) {
            menu = {
              type: 'menu',
              animate: true,
              items: menu
            };
          } else {
            menu.type = menu.type || 'menu';
            menu.animate = true;
          }
          if (parent.settings.itemDefaults) {
            menu.itemDefaults = parent.settings.itemDefaults;
          }
          menu = self.menu = Factory.create(menu).parent(self).renderTo();
          menu.reflow();
          menu.on('cancel', function (e) {
            e.stopPropagation();
            self.focus();
            menu.hide();
          });
          menu.on('show hide', function (e) {
            if (e.control.items) {
              e.control.items().each(function (ctrl) {
                ctrl.active(ctrl.settings.selected);
              });
            }
          }).fire('show');
          menu.on('hide', function (e) {
            if (e.control === menu) {
              self.classes.remove('selected');
            }
          });
          menu.submenu = true;
        } else {
          menu.show();
        }
        menu._parentMenu = parent;
        menu.classes.add('menu-sub');
        var rel = menu.testMoveRel(self.getEl(), self.isRtl() ? [
          'tl-tr',
          'bl-br',
          'tr-tl',
          'br-bl'
        ] : [
          'tr-tl',
          'br-bl',
          'tl-tr',
          'bl-br'
        ]);
        menu.moveRel(self.getEl(), rel);
        menu.rel = rel;
        rel = 'menu-sub-' + rel;
        menu.classes.remove(menu._lastRel).add(rel);
        menu._lastRel = rel;
        self.classes.add('selected');
        self.aria('expanded', true);
      }
    },
    hideMenu: function () {
      var self = this;
      if (self.menu) {
        self.menu.items().each(function (item) {
          if (item.hideMenu) {
            item.hideMenu();
          }
        });
        self.menu.hide();
        self.aria('expanded', false);
      }
      return self;
    },
    renderHtml: function () {
      var self = this;
      var id = self._id;
      var settings = self.settings;
      var prefix = self.classPrefix;
      var text = self.state.get('text');
      var icon = self.settings.icon, image = '', shortcut = settings.shortcut;
      var url = self.encode(settings.url), iconHtml = '';
      function convertShortcut(shortcut) {
        var i, value, replace = {};
        if (Env.mac) {
          replace = {
            alt: '&#x2325;',
            ctrl: '&#x2318;',
            shift: '&#x21E7;',
            meta: '&#x2318;'
          };
        } else {
          replace = { meta: 'Ctrl' };
        }
        shortcut = shortcut.split('+');
        for (i = 0; i < shortcut.length; i++) {
          value = replace[shortcut[i].toLowerCase()];
          if (value) {
            shortcut[i] = value;
          }
        }
        return shortcut.join('+');
      }
      function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      function markMatches(text) {
        var match = settings.match || '';
        return match ? text.replace(new RegExp(escapeRegExp(match), 'gi'), function (match) {
          return '!mce~match[' + match + ']mce~match!';
        }) : text;
      }
      function boldMatches(text) {
        return text.replace(new RegExp(escapeRegExp('!mce~match['), 'g'), '<b>').replace(new RegExp(escapeRegExp(']mce~match!'), 'g'), '</b>');
      }
      if (icon) {
        self.parent().classes.add('menu-has-icons');
      }
      if (settings.image) {
        image = ' style="background-image: url(\'' + settings.image + '\')"';
      }
      if (shortcut) {
        shortcut = convertShortcut(shortcut);
      }
      icon = prefix + 'ico ' + prefix + 'i-' + (self.settings.icon || 'none');
      iconHtml = text !== '-' ? '<i class="' + icon + '"' + image + '></i>\xA0' : '';
      text = boldMatches(self.encode(markMatches(text)));
      url = boldMatches(self.encode(markMatches(url)));
      return '<div id="' + id + '" class="' + self.classes + '" tabindex="-1">' + iconHtml + (text !== '-' ? '<span id="' + id + '-text" class="' + prefix + 'text">' + text + '</span>' : '') + (shortcut ? '<div id="' + id + '-shortcut" class="' + prefix + 'menu-shortcut">' + shortcut + '</div>' : '') + (settings.menu ? '<div class="' + prefix + 'caret"></div>' : '') + (url ? '<div class="' + prefix + 'menu-item-link">' + url + '</div>' : '') + '</div>';
    },
    postRender: function () {
      var self = this, settings = self.settings;
      var textStyle = settings.textStyle;
      if (typeof textStyle === 'function') {
        textStyle = textStyle.call(this);
      }
      if (textStyle) {
        var textElm = self.getEl('text');
        if (textElm) {
          textElm.setAttribute('style', textStyle);
          self._textStyle = textStyle;
        }
      }
      self.on('mouseenter click', function (e) {
        if (e.control === self) {
          if (!settings.menu && e.type === 'click') {
            self.fire('select');
            Delay.requestAnimationFrame(function () {
              self.parent().hideAll();
            });
          } else {
            self.showMenu();
            if (e.aria) {
              self.menu.focus(true);
            }
          }
        }
      });
      self._super();
      return self;
    },
    hover: function () {
      var self = this;
      self.parent().items().each(function (ctrl) {
        ctrl.classes.remove('selected');
      });
      self.classes.toggle('selected', true);
      return self;
    },
    active: function (state) {
      toggleTextStyle(this, state);
      if (typeof state !== 'undefined') {
        this.aria('checked', state);
      }
      return this._super(state);
    },
    remove: function () {
      this._super();
      if (this.menu) {
        this.menu.remove();
      }
    }
  });

  var Radio = Checkbox.extend({
    Defaults: {
      classes: 'radio',
      role: 'radio'
    }
  });

  var ResizeHandle = Widget.extend({
    renderHtml: function () {
      var self = this, prefix = self.classPrefix;
      self.classes.add('resizehandle');
      if (self.settings.direction === 'both') {
        self.classes.add('resizehandle-both');
      }
      self.canFocus = false;
      return '<div id="' + self._id + '" class="' + self.classes + '">' + '<i class="' + prefix + 'ico ' + prefix + 'i-resize"></i>' + '</div>';
    },
    postRender: function () {
      var self = this;
      self._super();
      self.resizeDragHelper = new DragHelper(this._id, {
        start: function () {
          self.fire('ResizeStart');
        },
        drag: function (e) {
          if (self.settings.direction !== 'both') {
            e.deltaX = 0;
          }
          self.fire('Resize', e);
        },
        stop: function () {
          self.fire('ResizeEnd');
        }
      });
    },
    remove: function () {
      if (this.resizeDragHelper) {
        this.resizeDragHelper.destroy();
      }
      return this._super();
    }
  });

  function createOptions(options) {
    var strOptions = '';
    if (options) {
      for (var i = 0; i < options.length; i++) {
        strOptions += '<option value="' + options[i] + '">' + options[i] + '</option>';
      }
    }
    return strOptions;
  }
  var SelectBox = Widget.extend({
    Defaults: {
      classes: 'selectbox',
      role: 'selectbox',
      options: []
    },
    init: function (settings) {
      var self = this;
      self._super(settings);
      if (self.settings.size) {
        self.size = self.settings.size;
      }
      if (self.settings.options) {
        self._options = self.settings.options;
      }
      self.on('keydown', function (e) {
        var rootControl;
        if (e.keyCode === 13) {
          e.preventDefault();
          self.parents().reverse().each(function (ctrl) {
            if (ctrl.toJSON) {
              rootControl = ctrl;
              return false;
            }
          });
          self.fire('submit', { data: rootControl.toJSON() });
        }
      });
    },
    options: function (state) {
      if (!arguments.length) {
        return this.state.get('options');
      }
      this.state.set('options', state);
      return this;
    },
    renderHtml: function () {
      var self = this;
      var options, size = '';
      options = createOptions(self._options);
      if (self.size) {
        size = ' size = "' + self.size + '"';
      }
      return '<select id="' + self._id + '" class="' + self.classes + '"' + size + '>' + options + '</select>';
    },
    bindStates: function () {
      var self = this;
      self.state.on('change:options', function (e) {
        self.getEl().innerHTML = createOptions(e.value);
      });
      return self._super();
    }
  });

  function constrain(value, minVal, maxVal) {
    if (value < minVal) {
      value = minVal;
    }
    if (value > maxVal) {
      value = maxVal;
    }
    return value;
  }
  function setAriaProp(el, name, value) {
    el.setAttribute('aria-' + name, value);
  }
  function updateSliderHandle(ctrl, value) {
    var maxHandlePos, shortSizeName, sizeName, stylePosName, styleValue, handleEl;
    if (ctrl.settings.orientation === 'v') {
      stylePosName = 'top';
      sizeName = 'height';
      shortSizeName = 'h';
    } else {
      stylePosName = 'left';
      sizeName = 'width';
      shortSizeName = 'w';
    }
    handleEl = ctrl.getEl('handle');
    maxHandlePos = (ctrl.layoutRect()[shortSizeName] || 100) - funcs.getSize(handleEl)[sizeName];
    styleValue = maxHandlePos * ((value - ctrl._minValue) / (ctrl._maxValue - ctrl._minValue)) + 'px';
    handleEl.style[stylePosName] = styleValue;
    handleEl.style.height = ctrl.layoutRect().h + 'px';
    setAriaProp(handleEl, 'valuenow', value);
    setAriaProp(handleEl, 'valuetext', '' + ctrl.settings.previewFilter(value));
    setAriaProp(handleEl, 'valuemin', ctrl._minValue);
    setAriaProp(handleEl, 'valuemax', ctrl._maxValue);
  }
  var Slider = Widget.extend({
    init: function (settings) {
      var self = this;
      if (!settings.previewFilter) {
        settings.previewFilter = function (value) {
          return Math.round(value * 100) / 100;
        };
      }
      self._super(settings);
      self.classes.add('slider');
      if (settings.orientation === 'v') {
        self.classes.add('vertical');
      }
      self._minValue = settings.minValue || 0;
      self._maxValue = settings.maxValue || 100;
      self._initValue = self.state.get('value');
    },
    renderHtml: function () {
      var self = this, id = self._id, prefix = self.classPrefix;
      return '<div id="' + id + '" class="' + self.classes + '">' + '<div id="' + id + '-handle" class="' + prefix + 'slider-handle" role="slider" tabindex="-1"></div>' + '</div>';
    },
    reset: function () {
      this.value(this._initValue).repaint();
    },
    postRender: function () {
      var self = this;
      var minValue, maxValue, screenCordName, stylePosName, sizeName, shortSizeName;
      function toFraction(min, max, val) {
        return (val + min) / (max - min);
      }
      function fromFraction(min, max, val) {
        return val * (max - min) - min;
      }
      function handleKeyboard(minValue, maxValue) {
        function alter(delta) {
          var value;
          value = self.value();
          value = fromFraction(minValue, maxValue, toFraction(minValue, maxValue, value) + delta * 0.05);
          value = constrain(value, minValue, maxValue);
          self.value(value);
          self.fire('dragstart', { value: value });
          self.fire('drag', { value: value });
          self.fire('dragend', { value: value });
        }
        self.on('keydown', function (e) {
          switch (e.keyCode) {
          case 37:
          case 38:
            alter(-1);
            break;
          case 39:
          case 40:
            alter(1);
            break;
          }
        });
      }
      function handleDrag(minValue, maxValue, handleEl) {
        var startPos, startHandlePos, maxHandlePos, handlePos, value;
        self._dragHelper = new DragHelper(self._id, {
          handle: self._id + '-handle',
          start: function (e) {
            startPos = e[screenCordName];
            startHandlePos = parseInt(self.getEl('handle').style[stylePosName], 10);
            maxHandlePos = (self.layoutRect()[shortSizeName] || 100) - funcs.getSize(handleEl)[sizeName];
            self.fire('dragstart', { value: value });
          },
          drag: function (e) {
            var delta = e[screenCordName] - startPos;
            handlePos = constrain(startHandlePos + delta, 0, maxHandlePos);
            handleEl.style[stylePosName] = handlePos + 'px';
            value = minValue + handlePos / maxHandlePos * (maxValue - minValue);
            self.value(value);
            self.tooltip().text('' + self.settings.previewFilter(value)).show().moveRel(handleEl, 'bc tc');
            self.fire('drag', { value: value });
          },
          stop: function () {
            self.tooltip().hide();
            self.fire('dragend', { value: value });
          }
        });
      }
      minValue = self._minValue;
      maxValue = self._maxValue;
      if (self.settings.orientation === 'v') {
        screenCordName = 'screenY';
        stylePosName = 'top';
        sizeName = 'height';
        shortSizeName = 'h';
      } else {
        screenCordName = 'screenX';
        stylePosName = 'left';
        sizeName = 'width';
        shortSizeName = 'w';
      }
      self._super();
      handleKeyboard(minValue, maxValue);
      handleDrag(minValue, maxValue, self.getEl('handle'));
    },
    repaint: function () {
      this._super();
      updateSliderHandle(this, this.value());
    },
    bindStates: function () {
      var self = this;
      self.state.on('change:value', function (e) {
        updateSliderHandle(self, e.value);
      });
      return self._super();
    }
  });

  var Spacer = Widget.extend({
    renderHtml: function () {
      var self = this;
      self.classes.add('spacer');
      self.canFocus = false;
      return '<div id="' + self._id + '" class="' + self.classes + '"></div>';
    }
  });

  var SplitButton = MenuButton.extend({
    Defaults: {
      classes: 'widget btn splitbtn',
      role: 'button'
    },
    repaint: function () {
      var self = this;
      var elm = self.getEl();
      var rect = self.layoutRect();
      var mainButtonElm, menuButtonElm;
      self._super();
      mainButtonElm = elm.firstChild;
      menuButtonElm = elm.lastChild;
      $(mainButtonElm).css({
        width: rect.w - funcs.getSize(menuButtonElm).width,
        height: rect.h - 2
      });
      $(menuButtonElm).css({ height: rect.h - 2 });
      return self;
    },
    activeMenu: function (state) {
      var self = this;
      $(self.getEl().lastChild).toggleClass(self.classPrefix + 'active', state);
    },
    renderHtml: function () {
      var self = this;
      var id = self._id;
      var prefix = self.classPrefix;
      var image;
      var icon = self.state.get('icon');
      var text = self.state.get('text');
      var settings = self.settings;
      var textHtml = '', ariaPressed;
      image = settings.image;
      if (image) {
        icon = 'none';
        if (typeof image !== 'string') {
          image = window.getSelection ? image[0] : image[1];
        }
        image = ' style="background-image: url(\'' + image + '\')"';
      } else {
        image = '';
      }
      icon = settings.icon ? prefix + 'ico ' + prefix + 'i-' + icon : '';
      if (text) {
        self.classes.add('btn-has-text');
        textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>';
      }
      ariaPressed = typeof settings.active === 'boolean' ? ' aria-pressed="' + settings.active + '"' : '';
      return '<div id="' + id + '" class="' + self.classes + '" role="button"' + ariaPressed + ' tabindex="-1">' + '<button type="button" hidefocus="1" tabindex="-1">' + (icon ? '<i class="' + icon + '"' + image + '></i>' : '') + textHtml + '</button>' + '<button type="button" class="' + prefix + 'open" hidefocus="1" tabindex="-1">' + (self._menuBtnText ? (icon ? '\xA0' : '') + self._menuBtnText : '') + ' <i class="' + prefix + 'caret"></i>' + '</button>' + '</div>';
    },
    postRender: function () {
      var self = this, onClickHandler = self.settings.onclick;
      self.on('click', function (e) {
        var node = e.target;
        if (e.control === this) {
          while (node) {
            if (e.aria && e.aria.key !== 'down' || node.nodeName === 'BUTTON' && node.className.indexOf('open') === -1) {
              e.stopImmediatePropagation();
              if (onClickHandler) {
                onClickHandler.call(this, e);
              }
              return;
            }
            node = node.parentNode;
          }
        }
      });
      delete self.settings.onclick;
      return self._super();
    }
  });

  var StackLayout = FlowLayout.extend({
    Defaults: {
      containerClass: 'stack-layout',
      controlClass: 'stack-layout-item',
      endClass: 'break'
    },
    isNative: function () {
      return true;
    }
  });

  var TabPanel = Panel.extend({
    Defaults: {
      layout: 'absolute',
      defaults: { type: 'panel' }
    },
    activateTab: function (idx) {
      var activeTabElm;
      if (this.activeTabId) {
        activeTabElm = this.getEl(this.activeTabId);
        $(activeTabElm).removeClass(this.classPrefix + 'active');
        activeTabElm.setAttribute('aria-selected', 'false');
      }
      this.activeTabId = 't' + idx;
      activeTabElm = this.getEl('t' + idx);
      activeTabElm.setAttribute('aria-selected', 'true');
      $(activeTabElm).addClass(this.classPrefix + 'active');
      this.items()[idx].show().fire('showtab');
      this.reflow();
      this.items().each(function (item, i) {
        if (idx !== i) {
          item.hide();
        }
      });
    },
    renderHtml: function () {
      var self = this;
      var layout = self._layout;
      var tabsHtml = '';
      var prefix = self.classPrefix;
      self.preRender();
      layout.preRender(self);
      self.items().each(function (ctrl, i) {
        var id = self._id + '-t' + i;
        ctrl.aria('role', 'tabpanel');
        ctrl.aria('labelledby', id);
        tabsHtml += '<div id="' + id + '" class="' + prefix + 'tab" ' + 'unselectable="on" role="tab" aria-controls="' + ctrl._id + '" aria-selected="false" tabIndex="-1">' + self.encode(ctrl.settings.title) + '</div>';
      });
      return '<div id="' + self._id + '" class="' + self.classes + '" hidefocus="1" tabindex="-1">' + '<div id="' + self._id + '-head" class="' + prefix + 'tabs" role="tablist">' + tabsHtml + '</div>' + '<div id="' + self._id + '-body" class="' + self.bodyClasses + '">' + layout.renderHtml(self) + '</div>' + '</div>';
    },
    postRender: function () {
      var self = this;
      self._super();
      self.settings.activeTab = self.settings.activeTab || 0;
      self.activateTab(self.settings.activeTab);
      this.on('click', function (e) {
        var targetParent = e.target.parentNode;
        if (targetParent && targetParent.id === self._id + '-head') {
          var i = targetParent.childNodes.length;
          while (i--) {
            if (targetParent.childNodes[i] === e.target) {
              self.activateTab(i);
            }
          }
        }
      });
    },
    initLayoutRect: function () {
      var self = this;
      var rect, minW, minH;
      minW = funcs.getSize(self.getEl('head')).width;
      minW = minW < 0 ? 0 : minW;
      minH = 0;
      self.items().each(function (item) {
        minW = Math.max(minW, item.layoutRect().minW);
        minH = Math.max(minH, item.layoutRect().minH);
      });
      self.items().each(function (ctrl) {
        ctrl.settings.x = 0;
        ctrl.settings.y = 0;
        ctrl.settings.w = minW;
        ctrl.settings.h = minH;
        ctrl.layoutRect({
          x: 0,
          y: 0,
          w: minW,
          h: minH
        });
      });
      var headH = funcs.getSize(self.getEl('head')).height;
      self.settings.minWidth = minW;
      self.settings.minHeight = minH + headH;
      rect = self._super();
      rect.deltaH += headH;
      rect.innerH = rect.h - rect.deltaH;
      return rect;
    }
  });

  var TextBox = Widget.extend({
    init: function (settings) {
      var self = this;
      self._super(settings);
      self.classes.add('textbox');
      if (settings.multiline) {
        self.classes.add('multiline');
      } else {
        self.on('keydown', function (e) {
          var rootControl;
          if (e.keyCode === 13) {
            e.preventDefault();
            self.parents().reverse().each(function (ctrl) {
              if (ctrl.toJSON) {
                rootControl = ctrl;
                return false;
              }
            });
            self.fire('submit', { data: rootControl.toJSON() });
          }
        });
        self.on('keyup', function (e) {
          self.state.set('value', e.target.value);
        });
      }
    },
    repaint: function () {
      var self = this;
      var style, rect, borderBox, borderW, borderH = 0, lastRepaintRect;
      style = self.getEl().style;
      rect = self._layoutRect;
      lastRepaintRect = self._lastRepaintRect || {};
      var doc = document;
      if (!self.settings.multiline && doc.all && (!doc.documentMode || doc.documentMode <= 8)) {
        style.lineHeight = rect.h - borderH + 'px';
      }
      borderBox = self.borderBox;
      borderW = borderBox.left + borderBox.right + 8;
      borderH = borderBox.top + borderBox.bottom + (self.settings.multiline ? 8 : 0);
      if (rect.x !== lastRepaintRect.x) {
        style.left = rect.x + 'px';
        lastRepaintRect.x = rect.x;
      }
      if (rect.y !== lastRepaintRect.y) {
        style.top = rect.y + 'px';
        lastRepaintRect.y = rect.y;
      }
      if (rect.w !== lastRepaintRect.w) {
        style.width = rect.w - borderW + 'px';
        lastRepaintRect.w = rect.w;
      }
      if (rect.h !== lastRepaintRect.h) {
        style.height = rect.h - borderH + 'px';
        lastRepaintRect.h = rect.h;
      }
      self._lastRepaintRect = lastRepaintRect;
      self.fire('repaint', {}, false);
      return self;
    },
    renderHtml: function () {
      var self = this;
      var settings = self.settings;
      var attrs, elm;
      attrs = {
        id: self._id,
        hidefocus: '1'
      };
      Tools.each([
        'rows',
        'spellcheck',
        'maxLength',
        'size',
        'readonly',
        'min',
        'max',
        'step',
        'list',
        'pattern',
        'placeholder',
        'required',
        'multiple'
      ], function (name) {
        attrs[name] = settings[name];
      });
      if (self.disabled()) {
        attrs.disabled = 'disabled';
      }
      if (settings.subtype) {
        attrs.type = settings.subtype;
      }
      elm = funcs.create(settings.multiline ? 'textarea' : 'input', attrs);
      elm.value = self.state.get('value');
      elm.className = self.classes;
      return elm.outerHTML;
    },
    value: function (value) {
      if (arguments.length) {
        this.state.set('value', value);
        return this;
      }
      if (this.state.get('rendered')) {
        this.state.set('value', this.getEl().value);
      }
      return this.state.get('value');
    },
    postRender: function () {
      var self = this;
      self.getEl().value = self.state.get('value');
      self._super();
      self.$el.on('change', function (e) {
        self.state.set('value', e.target.value);
        self.fire('change', e);
      });
    },
    bindStates: function () {
      var self = this;
      self.state.on('change:value', function (e) {
        if (self.getEl().value !== e.value) {
          self.getEl().value = e.value;
        }
      });
      self.state.on('change:disabled', function (e) {
        self.getEl().disabled = e.value;
      });
      return self._super();
    },
    remove: function () {
      this.$el.off();
      this._super();
    }
  });

  var getApi = function () {
    return {
      Selector: Selector,
      Collection: Collection$1,
      ReflowQueue: $_5bnmeot3jcq8h9fb,
      Control: Control$1,
      Factory: Factory,
      KeyboardNavigation: KeyboardNavigation,
      Container: Container,
      DragHelper: DragHelper,
      Scrollable: $_2xkiq7t5jcq8h9fi,
      Panel: Panel,
      Movable: $_dvdzmdsqjcq8h9dn,
      Resizable: $_196mjit7jcq8h9fo,
      FloatPanel: FloatPanel,
      Window: Window,
      MessageBox: MessageBox,
      Tooltip: Tooltip,
      Widget: Widget,
      Progress: Progress,
      Notification: Notification,
      Layout: Layout,
      AbsoluteLayout: AbsoluteLayout,
      Button: Button,
      ButtonGroup: ButtonGroup,
      Checkbox: Checkbox,
      ComboBox: ComboBox,
      ColorBox: ColorBox,
      PanelButton: PanelButton,
      ColorButton: ColorButton,
      ColorPicker: ColorPicker,
      Path: Path,
      ElementPath: ElementPath,
      FormItem: FormItem,
      Form: Form,
      FieldSet: FieldSet,
      FilePicker: FilePicker,
      FitLayout: FitLayout,
      FlexLayout: FlexLayout,
      FlowLayout: FlowLayout,
      FormatControls: $_4y9pxv4jcq8h9lo,
      GridLayout: GridLayout,
      Iframe: Iframe$1,
      InfoBox: InfoBox,
      Label: Label,
      Toolbar: Toolbar$1,
      MenuBar: MenuBar,
      MenuButton: MenuButton,
      MenuItem: MenuItem,
      Throbber: Throbber,
      Menu: Menu,
      ListBox: ListBox,
      Radio: Radio,
      ResizeHandle: ResizeHandle,
      SelectBox: SelectBox,
      Slider: Slider,
      Spacer: Spacer,
      SplitButton: SplitButton,
      StackLayout: StackLayout,
      TabPanel: TabPanel,
      TextBox: TextBox,
      DropZone: DropZone,
      BrowseButton: BrowseButton
    };
  };
  var appendTo = function (target) {
    if (target.ui) {
      Tools.each(getApi(), function (ref, key) {
        target.ui[key] = ref;
      });
    } else {
      target.ui = getApi();
    }
  };
  var registerToFactory = function () {
    Tools.each(getApi(), function (ref, key) {
      Factory.add(key, ref);
    });
  };
  var Api = {
    appendTo: appendTo,
    registerToFactory: registerToFactory
  };

  Api.registerToFactory();
  Api.appendTo(window.tinymce ? window.tinymce : {});
  ThemeManager.add('modern', function (editor) {
    $_4y9pxv4jcq8h9lo.setup(editor);
    return $_1zr8coryjcq8h9bn.get(editor);
  });
  var Theme = function () {
  };

  return Theme;

}());
})()


/***/ }),

/***/ "./node_modules/tinymce/tinymce.min.js":
/*!*********************************************!*\
  !*** ./node_modules/tinymce/tinymce.min.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {// 4.7.5 (2018-01-22)
!function(){"use strict";var e,t,n,r,o,i,a,s,u,c,l,f,d,m,p,g,h,v=function(e){return function(){return e}},y={noop:function(){},noarg:function(e){return function(){return e()}},compose:function(e,t){return function(){return e(t.apply(null,arguments))}},constant:v,identity:function(e){return e},tripleEquals:function(e,t){return e===t},curry:function(e){for(var t=new Array(arguments.length-1),n=1;n<arguments.length;n++)t[n-1]=arguments[n];return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];var o=t.concat(n);return e.apply(null,o)}},not:function(e){return function(){return!e.apply(null,arguments)}},die:function(e){return function(){throw new Error(e)}},apply:function(e){return e()},call:function(e){e()},never:v(!1),always:v(!0)},b=y.never,C=y.always,x=function(){return w},w=(r={fold:function(e,t){return e()},is:b,isSome:b,isNone:C,getOr:n=function(e){return e},getOrThunk:t=function(e){return e()},getOrDie:function(e){throw new Error(e||"error: getOrDie called on none.")},or:n,orThunk:t,map:x,ap:x,each:function(){},bind:x,flatten:x,exists:b,forall:C,filter:x,equals:e=function(e){return e.isNone()},equals_:e,toArray:function(){return[]},toString:y.constant("none()")},Object.freeze&&Object.freeze(r),r),N=function(e){var t=function(){return e},n=function(){return o},r=function(t){return t(e)},o={fold:function(t,n){return n(e)},is:function(t){return e===t},isSome:C,isNone:b,getOr:t,getOrThunk:t,getOrDie:t,or:n,orThunk:n,map:function(t){return N(t(e))},ap:function(t){return t.fold(x,function(t){return N(t(e))})},each:function(t){t(e)},bind:r,flatten:t,exists:r,forall:r,filter:function(t){return t(e)?o:w},equals:function(t){return t.is(e)},equals_:function(t,n){return t.fold(b,function(t){return n(e,t)})},toArray:function(){return[e]},toString:function(){return"some("+e+")"}};return o},E={some:N,none:x,from:function(e){return null===e||e===undefined?w:N(e)}},S=(o=Array.prototype.indexOf)===undefined?function(e,t){return D(e,t)}:function(e,t){return o.call(e,t)},k=function(e,t){return S(e,t)>-1},T=function(e,t){for(var n=e.length,r=new Array(n),o=0;o<n;o++){var i=e[o];r[o]=t(i,o,e)}return r},A=function(e,t){for(var n=0,r=e.length;n<r;n++)t(e[n],n,e)},_=function(e,t){for(var n=e.length-1;n>=0;n--)t(e[n],n,e)},B=function(e,t){for(var n=[],r=0,o=e.length;r<o;r++){var i=e[r];t(i,r,e)&&n.push(i)}return n},R=function(e,t){for(var n=0,r=e.length;n<r;n++)if(t(e[n],n,e))return E.some(n);return E.none()},D=function(e,t){for(var n=0,r=e.length;n<r;++n)if(e[n]===t)return n;return-1},O=Array.prototype.push,P=function(e){for(var t=[],n=0,r=e.length;n<r;++n){if(!Array.prototype.isPrototypeOf(e[n]))throw new Error("Arr.flatten item "+n+" was not an array, input: "+e);O.apply(t,e[n])}return t},I=function(e,t){for(var n=0,r=e.length;n<r;++n)if(!0!==t(e[n],n,e))return!1;return!0},L=Array.prototype.slice,M={map:T,each:A,eachr:_,partition:function(e,t){for(var n=[],r=[],o=0,i=e.length;o<i;o++){var a=e[o];(t(a,o,e)?n:r).push(a)}return{pass:n,fail:r}},filter:B,groupBy:function(e,t){if(0===e.length)return[];for(var n=t(e[0]),r=[],o=[],i=0,a=e.length;i<a;i++){var s=e[i],u=t(s);u!==n&&(r.push(o),o=[]),n=u,o.push(s)}return 0!==o.length&&r.push(o),r},indexOf:function(e,t){var n=S(e,t);return-1===n?E.none():E.some(n)},foldr:function(e,t,n){return _(e,function(e){n=t(n,e)}),n},foldl:function(e,t,n){return A(e,function(e){n=t(n,e)}),n},find:function(e,t){for(var n=0,r=e.length;n<r;n++){var o=e[n];if(t(o,n,e))return E.some(o)}return E.none()},findIndex:R,flatten:P,bind:function(e,t){var n=T(e,t);return P(n)},forall:I,exists:function(e,t){return R(e,t).isSome()},contains:k,equal:function(e,t){return e.length===t.length&&I(e,function(e,n){return e===t[n]})},reverse:function(e){var t=L.call(e,0);return t.reverse(),t},chunk:function(e,t){for(var n=[],r=0;r<e.length;r+=t){var o=e.slice(r,r+t);n.push(o)}return n},difference:function(e,t){return B(e,function(e){return!k(t,e)})},mapToObject:function(e,t){for(var n={},r=0,o=e.length;r<o;r++){var i=e[r];n[String(i)]=t(i,r)}return n},pure:function(e){return[e]},sort:function(e,t){var n=L.call(e,0);return n.sort(t),n},range:function(e,t){for(var n=[],r=0;r<e;r++)n.push(t(r));return n},head:function(e){return 0===e.length?E.none():E.some(e[0])},last:function(e){return 0===e.length?E.none():E.some(e[e.length-1])}},F="undefined"!=typeof window?window:Function("return this;")(),z=function(e,t){for(var n=t!==undefined&&null!==t?t:F,r=0;r<e.length&&n!==undefined&&null!==n;++r)n=n[e[r]];return n},U=function(e,t){var n=e.split(".");return z(n,t)},V=function(e,t){var n=U(e,t);if(n===undefined||null===n)throw e+" not available on this browser";return n},H=function(){return V("URL")},q=function(e){return H().createObjectURL(e)},j=function(e){H().revokeObjectURL(e)},$=navigator,W=$.userAgent,K=function(e){return"matchMedia"in window&&matchMedia(e).matches};d=/Android/.test(W),a=(a=!(i=/WebKit/.test(W))&&/MSIE/gi.test(W)&&/Explorer/gi.test($.appName))&&/MSIE (\w+)\./.exec(W)[1],s=-1!==W.indexOf("Trident/")&&(-1!==W.indexOf("rv:")||-1!==$.appName.indexOf("Netscape"))&&11,u=-1!==W.indexOf("Edge/")&&!a&&!s&&12,a=a||s||u,c=!i&&!s&&/Gecko/.test(W),l=-1!==W.indexOf("Mac"),f=/(iPad|iPhone)/.test(W),m="FormData"in window&&"FileReader"in window&&"URL"in window&&!!q,p=K("only screen and (max-device-width: 480px)")&&(d||f),g=K("only screen and (min-width: 800px)")&&(d||f),h=-1!==W.indexOf("Windows Phone"),u&&(i=!1);var X,Y,G,J,Q,Z,ee,te,ne,re,oe,ie,ae,se,ue,ce,le,fe,de,me={opera:!1,webkit:i,ie:a,gecko:c,mac:l,iOS:f,android:d,contentEditable:!f||m||parseInt(W.match(/AppleWebKit\/(\d*)/)[1],10)>=534,transparentSrc:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",caretAfter:8!==a,range:window.getSelection&&"Range"in window,documentMode:a&&!u?document.documentMode||7:10,fileApi:m,ceFalse:!1===a||a>8,cacheSuffix:"",container:null,overrideViewPort:null,experimentalShadowDom:!1,canHaveCSP:!1===a||a>11,desktop:!p&&!g,windowsPhone:h},pe=window.Promise?window.Promise:function(){function e(e,t){return function(){e.apply(t,arguments)}}var t=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},n=function(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],u(t,e(i,this),e(a,this))},r=n.immediateFn||"function"==typeof setImmediate&&setImmediate||function(e){setTimeout(e,1)};function o(e){var t=this;null!==this._state?r(function(){var n=t._state?e.onFulfilled:e.onRejected;if(null!==n){var r;try{r=n(t._value)}catch(o){return void e.reject(o)}e.resolve(r)}else(t._state?e.resolve:e.reject)(t._value)}):this._deferreds.push(e)}function i(t){try{if(t===this)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if("function"==typeof n)return void u(e(n,t),e(i,this),e(a,this))}this._state=!0,this._value=t,s.call(this)}catch(r){a.call(this,r)}}function a(e){this._state=!1,this._value=e,s.call(this)}function s(){for(var e=0,t=this._deferreds.length;e<t;e++)o.call(this,this._deferreds[e]);this._deferreds=null}function u(e,t,n){var r=!1;try{e(function(e){r||(r=!0,t(e))},function(e){r||(r=!0,n(e))})}catch(o){if(r)return;r=!0,n(o)}}return n.prototype["catch"]=function(e){return this.then(null,e)},n.prototype.then=function(e,t){var r=this;return new n(function(n,i){o.call(r,new function(e,t,n,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.resolve=n,this.reject=r}(e,t,n,i))})},n.all=function(){var e=Array.prototype.slice.call(1===arguments.length&&t(arguments[0])?arguments[0]:arguments);return new n(function(t,n){if(0===e.length)return t([]);var r=e.length;function o(i,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(e){o(i,e)},n)}e[i]=a,0==--r&&t(e)}catch(u){n(u)}}for(var i=0;i<e.length;i++)o(i,e[i])})},n.resolve=function(e){return e&&"object"==typeof e&&e.constructor===n?e:new n(function(t){t(e)})},n.reject=function(e){return new n(function(t,n){n(e)})},n.race=function(e){return new n(function(t,n){for(var r=0,o=e.length;r<o;r++)e[r].then(t,n)})},n}(),ge=function(e,t){return"number"!=typeof t&&(t=0),setTimeout(e,t)},he=function(e,t){return"number"!=typeof t&&(t=1),setInterval(e,t)},ve=function(e,t){var n,r;return(r=function(){var r=arguments;clearTimeout(n),n=ge(function(){e.apply(this,r)},t)}).stop=function(){clearTimeout(n)},r},ye={requestAnimationFrame:function(e,t){X?X.then(e):X=new pe(function(e){t||(t=document.body),function(e,t){var n,r=window.requestAnimationFrame,o=["ms","moz","webkit"];for(n=0;n<o.length&&!r;n++)r=window[o[n]+"RequestAnimationFrame"];r||(r=function(e){window.setTimeout(e,0)}),r(e,t)}(e,t)}).then(e)},setTimeout:ge,setInterval:he,setEditorTimeout:function(e,t,n){return ge(function(){e.removed||t()},n)},setEditorInterval:function(e,t,n){var r;return r=he(function(){e.removed?clearInterval(r):t()},n)},debounce:ve,throttle:ve,clearInterval:function(e){return clearInterval(e)},clearTimeout:function(e){return clearTimeout(e)}},be=/^(?:mouse|contextmenu)|click/,Ce={keyLocation:1,layerX:1,layerY:1,returnValue:1,webkitMovementX:1,webkitMovementY:1,keyIdentifier:1},xe=function(){return!1},we=function(){return!0},Ne=function(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r||!1):e.attachEvent&&e.attachEvent("on"+t,n)},Ee=function(e,t,n,r){e.removeEventListener?e.removeEventListener(t,n,r||!1):e.detachEvent&&e.detachEvent("on"+t,n)},Se=function(e,t){var n,r,o,i,a,s,u=t||{};for(n in e)Ce[n]||(u[n]=e[n]);if(u.target||(u.target=u.srcElement||document),me.experimentalShadowDom&&(u.target=(r=e,o=u.target,a=o,(i=r.path)&&i.length>0&&(a=i[0]),r.deepPath&&(i=r.deepPath())&&i.length>0&&(a=i[0]),a)),e&&be.test(e.type)&&e.pageX===undefined&&e.clientX!==undefined){var c=u.target.ownerDocument||document,l=c.documentElement,f=c.body;u.pageX=e.clientX+(l&&l.scrollLeft||f&&f.scrollLeft||0)-(l&&l.clientLeft||f&&f.clientLeft||0),u.pageY=e.clientY+(l&&l.scrollTop||f&&f.scrollTop||0)-(l&&l.clientTop||f&&f.clientTop||0)}return u.preventDefault=function(){u.isDefaultPrevented=we,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},u.stopPropagation=function(){u.isPropagationStopped=we,e&&(e.stopPropagation?e.stopPropagation():e.cancelBubble=!0)},u.stopImmediatePropagation=function(){u.isImmediatePropagationStopped=we,u.stopPropagation()},0==((s=u).isDefaultPrevented===we||s.isDefaultPrevented===xe)&&(u.isDefaultPrevented=xe,u.isPropagationStopped=xe,u.isImmediatePropagationStopped=xe),"undefined"==typeof u.metaKey&&(u.metaKey=!1),u},ke=function(e,t,n){var r=e.document,o={type:"ready"};if(n.domLoaded)t(o);else{var i=function(){return"complete"===r.readyState||"interactive"===r.readyState&&r.body},a=function(){n.domLoaded||(n.domLoaded=!0,t(o))},s=function(){i()&&(Ee(r,"readystatechange",s),a())},u=function(){try{r.documentElement.doScroll("left")}catch(e){return void ye.setTimeout(u)}a()};!r.addEventListener||me.ie&&me.ie<11?(Ne(r,"readystatechange",s),r.documentElement.doScroll&&e.self===e.top&&u()):i()?a():Ne(e,"DOMContentLoaded",a),Ne(e,"load",a)}},Te=function(){var e,t,n,r,o,i=this,a={};t="mce-data-"+(+new Date).toString(32),r="onmouseenter"in document.documentElement,n="onfocusin"in document.documentElement,o={mouseenter:"mouseover",mouseleave:"mouseout"},e=1,i.domLoaded=!1,i.events=a;var s=function(e,t){var n,r,o,i,s=a[t];if(n=s&&s[e.type])for(r=0,o=n.length;r<o;r++)if((i=n[r])&&!1===i.func.call(i.scope,e)&&e.preventDefault(),e.isImmediatePropagationStopped())return};i.bind=function(u,c,l,f){var d,m,p,g,h,v,y,b=window,C=function(e){s(Se(e||b.event),d)};if(u&&3!==u.nodeType&&8!==u.nodeType){for(u[t]?d=u[t]:(d=e++,u[t]=d,a[d]={}),f=f||u,p=(c=c.split(" ")).length;p--;)v=C,h=y=!1,"DOMContentLoaded"===(g=c[p])&&(g="ready"),i.domLoaded&&"ready"===g&&"complete"===u.readyState?l.call(f,Se({type:g})):(r||(h=o[g])&&(v=function(e){var t,n;if(t=e.currentTarget,(n=e.relatedTarget)&&t.contains)n=t.contains(n);else for(;n&&n!==t;)n=n.parentNode;n||((e=Se(e||b.event)).type="mouseout"===e.type?"mouseleave":"mouseenter",e.target=t,s(e,d))}),n||"focusin"!==g&&"focusout"!==g||(y=!0,h="focusin"===g?"focus":"blur",v=function(e){(e=Se(e||b.event)).type="focus"===e.type?"focusin":"focusout",s(e,d)}),(m=a[d][g])?"ready"===g&&i.domLoaded?l({type:g}):m.push({func:l,scope:f}):(a[d][g]=m=[{func:l,scope:f}],m.fakeName=h,m.capture=y,m.nativeHandler=v,"ready"===g?ke(u,v,i):Ne(u,h||g,v,y)));return u=m=0,l}},i.unbind=function(e,n,r){var o,s,u,c,l,f;if(!e||3===e.nodeType||8===e.nodeType)return i;if(o=e[t]){if(f=a[o],n){for(u=(n=n.split(" ")).length;u--;)if(s=f[l=n[u]]){if(r)for(c=s.length;c--;)if(s[c].func===r){var d=s.nativeHandler,m=s.fakeName,p=s.capture;(s=s.slice(0,c).concat(s.slice(c+1))).nativeHandler=d,s.fakeName=m,s.capture=p,f[l]=s}r&&0!==s.length||(delete f[l],Ee(e,s.fakeName||l,s.nativeHandler,s.capture))}}else{for(l in f)s=f[l],Ee(e,s.fakeName||l,s.nativeHandler,s.capture);f={}}for(l in f)return i;delete a[o];try{delete e[t]}catch(g){e[t]=null}}return i},i.fire=function(e,n,r){var o;if(!e||3===e.nodeType||8===e.nodeType)return i;(r=Se(null,r)).type=n,r.target=e;do{(o=e[t])&&s(r,o),e=e.parentNode||e.ownerDocument||e.defaultView||e.parentWindow}while(e&&!r.isPropagationStopped());return i},i.clean=function(e){var n,r,o=i.unbind;if(!e||3===e.nodeType||8===e.nodeType)return i;if(e[t]&&o(e),e.getElementsByTagName||(e=e.document),e&&e.getElementsByTagName)for(o(e),n=(r=e.getElementsByTagName("*")).length;n--;)(e=r[n])[t]&&o(e);return i},i.destroy=function(){a={}},i.cancel=function(e){return e&&(e.preventDefault(),e.stopImmediatePropagation()),!1}};(Te.Event=new Te).bind(window,"ready",function(){});var Ae="sizzle"+-new Date,_e=window.document,Be=0,Re=0,De=ft(),Oe=ft(),Pe=ft(),Ie=function(e,t){return e===t&&(ie=!0),0},Le=typeof undefined,Me=1<<31,Fe={}.hasOwnProperty,ze=[],Ue=ze.pop,Ve=ze.push,He=ze.push,qe=ze.slice,je=ze.indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(this[t]===e)return t;return-1},$e="[\\x20\\t\\r\\n\\f]",We="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",Ke="\\["+$e+"*("+We+")(?:"+$e+"*([*^$|!~]?=)"+$e+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+We+"))|)"+$e+"*\\]",Xe=":("+We+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+Ke+")*)|.*)\\)|)",Ye=new RegExp("^"+$e+"+|((?:^|[^\\\\])(?:\\\\.)*)"+$e+"+$","g"),Ge=new RegExp("^"+$e+"*,"+$e+"*"),Je=new RegExp("^"+$e+"*([>+~]|"+$e+")"+$e+"*"),Qe=new RegExp("="+$e+"*([^\\]'\"]*?)"+$e+"*\\]","g"),Ze=new RegExp(Xe),et=new RegExp("^"+We+"$"),tt={ID:new RegExp("^#("+We+")"),CLASS:new RegExp("^\\.("+We+")"),TAG:new RegExp("^("+We+"|[*])"),ATTR:new RegExp("^"+Ke),PSEUDO:new RegExp("^"+Xe),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+$e+"*(even|odd|(([+-]|)(\\d*)n|)"+$e+"*(?:([+-]|)"+$e+"*(\\d+)|))"+$e+"*\\)|)","i"),bool:new RegExp("^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$","i"),needsContext:new RegExp("^"+$e+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+$e+"*((?:-\\d)?\\d*)"+$e+"*\\)|)(?=[^-]|$)","i")},nt=/^(?:input|select|textarea|button)$/i,rt=/^h\d$/i,ot=/^[^{]+\{\s*\[native \w/,it=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,at=/[+~]/,st=/'|\\/g,ut=new RegExp("\\\\([\\da-f]{1,6}"+$e+"?|("+$e+")|.)","ig"),ct=function(e,t,n){var r="0x"+t-65536;return r!=r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)};try{He.apply(ze=qe.call(_e.childNodes),_e.childNodes),ze[_e.childNodes.length].nodeType}catch(yC){He={apply:ze.length?function(e,t){Ve.apply(e,qe.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}var lt=function(e,t,n,r){var o,i,a,s,u,c,l,f,d,m;if((t?t.ownerDocument||t:_e)!==se&&ae(t),t=t||se,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(ce&&!r){if(o=it.exec(e))if(a=o[1]){if(9===s){if(!(i=t.getElementById(a))||!i.parentNode)return n;if(i.id===a)return n.push(i),n}else if(t.ownerDocument&&(i=t.ownerDocument.getElementById(a))&&de(t,i)&&i.id===a)return n.push(i),n}else{if(o[2])return He.apply(n,t.getElementsByTagName(e)),n;if((a=o[3])&&G.getElementsByClassName)return He.apply(n,t.getElementsByClassName(a)),n}if(G.qsa&&(!le||!le.test(e))){if(f=l=Ae,d=t,m=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){for(c=ee(e),(l=t.getAttribute("id"))?f=l.replace(st,"\\$&"):t.setAttribute("id",f),f="[id='"+f+"'] ",u=c.length;u--;)c[u]=f+bt(c[u]);d=at.test(e)&&vt(t.parentNode)||t,m=c.join(",")}if(m)try{return He.apply(n,d.querySelectorAll(m)),n}catch(p){}finally{l||t.removeAttribute("id")}}}return ne(e.replace(Ye,"$1"),t,n,r)};function ft(){var e=[];return function t(n,r){return e.push(n+" ")>J.cacheLength&&delete t[e.shift()],t[n+" "]=r}}function dt(e){return e[Ae]=!0,e}function mt(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||Me)-(~e.sourceIndex||Me);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function pt(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function gt(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return dt(function(t){return t=+t,dt(function(n,r){for(var o,i=e([],n.length,t),a=i.length;a--;)n[o=i[a]]&&(n[o]=!(r[o]=n[o]))})})}function vt(e){return e&&typeof e.getElementsByTagName!==Le&&e}for(Y in G=lt.support={},Z=lt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},ae=lt.setDocument=function(e){var t,n=e?e.ownerDocument||e:_e,r=n.defaultView;return n!==se&&9===n.nodeType&&n.documentElement?(se=n,ue=n.documentElement,ce=!Z(n),r&&r!==function(e){try{return e.top}catch(t){}return null}(r)&&(r.addEventListener?r.addEventListener("unload",function(){ae()},!1):r.attachEvent&&r.attachEvent("onunload",function(){ae()})),G.attributes=!0,G.getElementsByTagName=!0,G.getElementsByClassName=ot.test(n.getElementsByClassName),G.getById=!0,J.find.ID=function(e,t){if(typeof t.getElementById!==Le&&ce){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},J.filter.ID=function(e){var t=e.replace(ut,ct);return function(e){return e.getAttribute("id")===t}},J.find.TAG=G.getElementsByTagName?function(e,t){if(typeof t.getElementsByTagName!==Le)return t.getElementsByTagName(e)}:function(e,t){var n,r=[],o=0,i=t.getElementsByTagName(e);if("*"===e){for(;n=i[o++];)1===n.nodeType&&r.push(n);return r}return i},J.find.CLASS=G.getElementsByClassName&&function(e,t){if(ce)return t.getElementsByClassName(e)},fe=[],le=[],G.disconnectedMatch=!0,le=le.length&&new RegExp(le.join("|")),fe=fe.length&&new RegExp(fe.join("|")),t=ot.test(ue.compareDocumentPosition),de=t||ot.test(ue.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},Ie=t?function(e,t){if(e===t)return ie=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r||(1&(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!G.sortDetached&&t.compareDocumentPosition(e)===r?e===n||e.ownerDocument===_e&&de(_e,e)?-1:t===n||t.ownerDocument===_e&&de(_e,t)?1:oe?je.call(oe,e)-je.call(oe,t):0:4&r?-1:1)}:function(e,t){if(e===t)return ie=!0,0;var r,o=0,i=e.parentNode,a=t.parentNode,s=[e],u=[t];if(!i||!a)return e===n?-1:t===n?1:i?-1:a?1:oe?je.call(oe,e)-je.call(oe,t):0;if(i===a)return mt(e,t);for(r=e;r=r.parentNode;)s.unshift(r);for(r=t;r=r.parentNode;)u.unshift(r);for(;s[o]===u[o];)o++;return o?mt(s[o],u[o]):s[o]===_e?-1:u[o]===_e?1:0},n):se},lt.matches=function(e,t){return lt(e,null,null,t)},lt.matchesSelector=function(e,t){if((e.ownerDocument||e)!==se&&ae(e),t=t.replace(Qe,"='$1']"),G.matchesSelector&&ce&&(!fe||!fe.test(t))&&(!le||!le.test(t)))try{var n=(void 0).call(e,t);if(n||G.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(yC){}return lt(t,se,null,[e]).length>0},lt.contains=function(e,t){return(e.ownerDocument||e)!==se&&ae(e),de(e,t)},lt.attr=function(e,t){(e.ownerDocument||e)!==se&&ae(e);var n=J.attrHandle[t.toLowerCase()],r=n&&Fe.call(J.attrHandle,t.toLowerCase())?n(e,t,!ce):undefined;return r!==undefined?r:G.attributes||!ce?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},lt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},lt.uniqueSort=function(e){var t,n=[],r=0,o=0;if(ie=!G.detectDuplicates,oe=!G.sortStable&&e.slice(0),e.sort(Ie),ie){for(;t=e[o++];)t===e[o]&&(r=n.push(o));for(;r--;)e.splice(n[r],1)}return oe=null,e},Q=lt.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=Q(e)}else if(3===o||4===o)return e.nodeValue}else for(;t=e[r++];)n+=Q(t);return n},(J=lt.selectors={cacheLength:50,createPseudo:dt,match:tt,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(ut,ct),e[3]=(e[3]||e[4]||e[5]||"").replace(ut,ct),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||lt.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&lt.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return tt.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&Ze.test(n)&&(t=ee(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(ut,ct).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=De[e+" "];return t||(t=new RegExp("(^|"+$e+")"+e+"("+$e+"|$)"))&&De(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==Le&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var o=lt.attr(r,e);return null==o?"!="===t:!t||(o+="","="===t?o===n:"!="===t?o!==n:"^="===t?n&&0===o.indexOf(n):"*="===t?n&&o.indexOf(n)>-1:"$="===t?n&&o.slice(-n.length)===n:"~="===t?(" "+o+" ").indexOf(n)>-1:"|="===t&&(o===n||o.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,o){var i="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===o?function(e){return!!e.parentNode}:function(t,n,u){var c,l,f,d,m,p,g=i!==a?"nextSibling":"previousSibling",h=t.parentNode,v=s&&t.nodeName.toLowerCase(),y=!u&&!s;if(h){if(i){for(;g;){for(f=t;f=f[g];)if(s?f.nodeName.toLowerCase()===v:1===f.nodeType)return!1;p=g="only"===e&&!p&&"nextSibling"}return!0}if(p=[a?h.firstChild:h.lastChild],a&&y){for(m=(c=(l=h[Ae]||(h[Ae]={}))[e]||[])[0]===Be&&c[1],d=c[0]===Be&&c[2],f=m&&h.childNodes[m];f=++m&&f&&f[g]||(d=m=0)||p.pop();)if(1===f.nodeType&&++d&&f===t){l[e]=[Be,m,d];break}}else if(y&&(c=(t[Ae]||(t[Ae]={}))[e])&&c[0]===Be)d=c[1];else for(;(f=++m&&f&&f[g]||(d=m=0)||p.pop())&&((s?f.nodeName.toLowerCase()!==v:1!==f.nodeType)||!++d||(y&&((f[Ae]||(f[Ae]={}))[e]=[Be,d]),f!==t)););return(d-=o)===r||d%r==0&&d/r>=0}}},PSEUDO:function(e,t){var n,r=J.pseudos[e]||J.setFilters[e.toLowerCase()]||lt.error("unsupported pseudo: "+e);return r[Ae]?r(t):r.length>1?(n=[e,e,"",t],J.setFilters.hasOwnProperty(e.toLowerCase())?dt(function(e,n){for(var o,i=r(e,t),a=i.length;a--;)e[o=je.call(e,i[a])]=!(n[o]=i[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:dt(function(e){var t=[],n=[],r=te(e.replace(Ye,"$1"));return r[Ae]?dt(function(e,t,n,o){for(var i,a=r(e,null,o,[]),s=e.length;s--;)(i=a[s])&&(e[s]=!(t[s]=i))}):function(e,o,i){return t[0]=e,r(t,null,i,n),!n.pop()}}),has:dt(function(e){return function(t){return lt(e,t).length>0}}),contains:dt(function(e){return e=e.replace(ut,ct),function(t){return(t.textContent||t.innerText||Q(t)).indexOf(e)>-1}}),lang:dt(function(e){return et.test(e||"")||lt.error("unsupported lang: "+e),e=e.replace(ut,ct).toLowerCase(),function(t){var n;do{if(n=ce?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(e){var t=window.location&&window.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===ue},focus:function(e){return e===se.activeElement&&(!se.hasFocus||se.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return!1===e.disabled},disabled:function(e){return!0===e.disabled},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!J.pseudos.empty(e)},header:function(e){return rt.test(e.nodeName)},input:function(e){return nt.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[n<0?n+t:n]}),even:ht(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ht(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=J.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})J.pseudos[Y]=pt(Y);for(Y in{submit:!0,reset:!0})J.pseudos[Y]=gt(Y);function yt(){}function bt(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function Ct(e,t,n){var r=t.dir,o=n&&"parentNode"===r,i=Re++;return t.first?function(t,n,i){for(;t=t[r];)if(1===t.nodeType||o)return e(t,n,i)}:function(t,n,a){var s,u,c=[Be,i];if(a){for(;t=t[r];)if((1===t.nodeType||o)&&e(t,n,a))return!0}else for(;t=t[r];)if(1===t.nodeType||o){if((s=(u=t[Ae]||(t[Ae]={}))[r])&&s[0]===Be&&s[1]===i)return c[2]=s[2];if(u[r]=c,c[2]=e(t,n,a))return!0}}}function xt(e){return e.length>1?function(t,n,r){for(var o=e.length;o--;)if(!e[o](t,n,r))return!1;return!0}:e[0]}function wt(e,t,n,r,o){for(var i,a=[],s=0,u=e.length,c=null!=t;s<u;s++)(i=e[s])&&(n&&!n(i,r,o)||(a.push(i),c&&t.push(s)));return a}function Nt(e,t,n,r,o,i){return r&&!r[Ae]&&(r=Nt(r)),o&&!o[Ae]&&(o=Nt(o,i)),dt(function(i,a,s,u){var c,l,f,d=[],m=[],p=a.length,g=i||function(e,t,n){for(var r=0,o=t.length;r<o;r++)lt(e,t[r],n);return n}(t||"*",s.nodeType?[s]:s,[]),h=!e||!i&&t?g:wt(g,d,e,s,u),v=n?o||(i?e:p||r)?[]:a:h;if(n&&n(h,v,s,u),r)for(c=wt(v,m),r(c,[],s,u),l=c.length;l--;)(f=c[l])&&(v[m[l]]=!(h[m[l]]=f));if(i){if(o||e){if(o){for(c=[],l=v.length;l--;)(f=v[l])&&c.push(h[l]=f);o(null,v=[],c,u)}for(l=v.length;l--;)(f=v[l])&&(c=o?je.call(i,f):d[l])>-1&&(i[c]=!(a[c]=f))}}else v=wt(v===a?v.splice(p,v.length):v),o?o(null,a,v,u):He.apply(a,v)})}function Et(e){for(var t,n,r,o=e.length,i=J.relative[e[0].type],a=i||J.relative[" "],s=i?1:0,u=Ct(function(e){return e===t},a,!0),c=Ct(function(e){return je.call(t,e)>-1},a,!0),l=[function(e,n,r){return!i&&(r||n!==re)||((t=n).nodeType?u(e,n,r):c(e,n,r))}];s<o;s++)if(n=J.relative[e[s].type])l=[Ct(xt(l),n)];else{if((n=J.filter[e[s].type].apply(null,e[s].matches))[Ae]){for(r=++s;r<o&&!J.relative[e[r].type];r++);return Nt(s>1&&xt(l),s>1&&bt(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(Ye,"$1"),n,s<r&&Et(e.slice(s,r)),r<o&&Et(e=e.slice(r)),r<o&&bt(e))}l.push(n)}return xt(l)}yt.prototype=J.filters=J.pseudos,J.setFilters=new yt,ee=lt.tokenize=function(e,t){var n,r,o,i,a,s,u,c=Oe[e+" "];if(c)return t?0:c.slice(0);for(a=e,s=[],u=J.preFilter;a;){for(i in n&&!(r=Ge.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(o=[])),n=!1,(r=Je.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(Ye," ")}),a=a.slice(n.length)),J.filter)!(r=tt[i].exec(a))||u[i]&&!(r=u[i](r))||(n=r.shift(),o.push({value:n,type:i,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?lt.error(e):Oe(e,s).slice(0)},te=lt.compile=function(e,t){var n,r,o,i,a,s,u=[],c=[],l=Pe[e+" "];if(!l){for(t||(t=ee(e)),n=t.length;n--;)(l=Et(t[n]))[Ae]?u.push(l):c.push(l);(l=Pe(e,(r=c,i=(o=u).length>0,a=r.length>0,s=function(e,t,n,s,u){var c,l,f,d=0,m="0",p=e&&[],g=[],h=re,v=e||a&&J.find.TAG("*",u),y=Be+=null==h?1:Math.random()||.1,b=v.length;for(u&&(re=t!==se&&t);m!==b&&null!=(c=v[m]);m++){if(a&&c){for(l=0;f=r[l++];)if(f(c,t,n)){s.push(c);break}u&&(Be=y)}i&&((c=!f&&c)&&d--,e&&p.push(c))}if(d+=m,i&&m!==d){for(l=0;f=o[l++];)f(p,g,t,n);if(e){if(d>0)for(;m--;)p[m]||g[m]||(g[m]=Ue.call(s));g=wt(g)}He.apply(s,g),u&&!e&&g.length>0&&d+o.length>1&&lt.uniqueSort(s)}return u&&(Be=y,re=h),p},i?dt(s):s))).selector=e}return l},ne=lt.select=function(e,t,n,r){var o,i,a,s,u,c="function"==typeof e&&e,l=!r&&ee(e=c.selector||e);if(n=n||[],1===l.length){if((i=l[0]=l[0].slice(0)).length>2&&"ID"===(a=i[0]).type&&G.getById&&9===t.nodeType&&ce&&J.relative[i[1].type]){if(!(t=(J.find.ID(a.matches[0].replace(ut,ct),t)||[])[0]))return n;c&&(t=t.parentNode),e=e.slice(i.shift().value.length)}for(o=tt.needsContext.test(e)?0:i.length;o--&&(a=i[o],!J.relative[s=a.type]);)if((u=J.find[s])&&(r=u(a.matches[0].replace(ut,ct),at.test(i[0].type)&&vt(t.parentNode)||t))){if(i.splice(o,1),!(e=r.length&&bt(i)))return He.apply(n,r),n;break}}return(c||te(e,l))(r,t,!ce,n,at.test(e)&&vt(t.parentNode)||t),n},G.sortStable=Ae.split("").sort(Ie).join("")===Ae,G.detectDuplicates=!!ie,ae(),G.sortDetached=!0;var St=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},kt=function(e,t,n){var r,o;if(!e)return 0;if(n=n||e,e.length!==undefined){for(r=0,o=e.length;r<o;r++)if(!1===t.call(n,e[r],r,e))return 0}else for(r in e)if(e.hasOwnProperty(r)&&!1===t.call(n,e[r],r,e))return 0;return 1},Tt=function(e,t,n){var r,o;for(r=0,o=e.length;r<o;r++)if(t.call(n,e[r],r,e))return r;return-1},At={isArray:St,toArray:function(e){var t,n,r=e;if(!St(e))for(r=[],t=0,n=e.length;t<n;t++)r[t]=e[t];return r},each:kt,map:function(e,t){var n=[];return kt(e,function(r,o){n.push(t(r,o,e))}),n},filter:function(e,t){var n=[];return kt(e,function(r,o){t&&!t(r,o,e)||n.push(r)}),n},indexOf:function(e,t){var n,r;if(e)for(n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},reduce:function(e,t,n,r){var o=0;for(arguments.length<3&&(n=e[0]);o<e.length;o++)n=t.call(r,n,e[o],o);return n},findIndex:Tt,find:function(e,t,n){var r=Tt(e,t,n);return-1!==r?e[r]:undefined},last:function(e){return e[e.length-1]}},_t=/^\s*|\s*$/g,Bt=function(e){return null===e||e===undefined?"":(""+e).replace(_t,"")},Rt=function(e,t){return t?!("array"!==t||!At.isArray(e))||typeof e===t:e!==undefined},Dt=function(e,t,n,r){r=r||this,e&&(n&&(e=e[n]),At.each(e,function(e,o){if(!1===t.call(r,e,o,n))return!1;Dt(e,t,n,r)}))},Ot={trim:Bt,isArray:At.isArray,is:Rt,toArray:At.toArray,makeMap:function(e,t,n){var r;for(e=e||[],t=t||",","string"==typeof e&&(e=e.split(t)),n=n||{},r=e.length;r--;)n[e[r]]={};return n},each:At.each,map:At.map,grep:At.filter,inArray:At.indexOf,hasOwn:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},extend:function(e,t){for(var n,r,o,i=[],a=2;a<arguments.length;a++)i[a-2]=arguments[a];var s,u=arguments;for(n=1,r=u.length;n<r;n++)for(o in t=u[n])t.hasOwnProperty(o)&&(s=t[o])!==undefined&&(e[o]=s);return e},create:function(e,t,n){var r,o,i,a,s,u=this,c=0;if(e=/^((static) )?([\w.]+)(:([\w.]+))?/.exec(e),i=e[3].match(/(^|\.)(\w+)$/i)[2],!(o=u.createNS(e[3].replace(/\.\w+$/,""),n))[i]){if("static"===e[2])return o[i]=t,void(this.onCreate&&this.onCreate(e[2],e[3],o[i]));t[i]||(t[i]=function(){},c=1),o[i]=t[i],u.extend(o[i].prototype,t),e[5]&&(r=u.resolve(e[5]).prototype,a=e[5].match(/\.(\w+)$/i)[1],s=o[i],o[i]=c?function(){return r[a].apply(this,arguments)}:function(){return this.parent=r[a],s.apply(this,arguments)},o[i].prototype[i]=o[i],u.each(r,function(e,t){o[i].prototype[t]=r[t]}),u.each(t,function(e,t){r[t]?o[i].prototype[t]=function(){return this.parent=r[t],e.apply(this,arguments)}:t!==i&&(o[i].prototype[t]=e)})),u.each(t["static"],function(e,t){o[i][t]=e})}},walk:Dt,createNS:function(e,t){var n,r;for(t=t||window,e=e.split("."),n=0;n<e.length;n++)t[r=e[n]]||(t[r]={}),t=t[r];return t},resolve:function(e,t){var n,r;for(t=t||window,n=0,r=(e=e.split(".")).length;n<r&&(t=t[e[n]]);n++);return t},explode:function(e,t){return!e||Rt(e,"array")?e:At.map(e.split(t||","),Bt)},_addCacheSuffix:function(e){var t=me.cacheSuffix;return t&&(e+=(-1===e.indexOf("?")?"?":"&")+t),e}},Pt=document,It=Array.prototype.push,Lt=Array.prototype.slice,Mt=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,Ft=Te.Event,zt=Ot.makeMap("children,contents,next,prev"),Ut=function(e){return void 0!==e},Vt=function(e){return"string"==typeof e},Ht=function(e,t){var n,r,o;for(o=(t=t||Pt).createElement("div"),n=t.createDocumentFragment(),o.innerHTML=e;r=o.firstChild;)n.appendChild(r);return n},qt=function(e,t,n,r){var o;if(Vt(t))t=Ht(t,rn(e[0]));else if(t.length&&!t.nodeType){if(t=Qt.makeArray(t),r)for(o=t.length-1;o>=0;o--)qt(e,t[o],n,r);else for(o=0;o<t.length;o++)qt(e,t[o],n,r);return e}if(t.nodeType)for(o=e.length;o--;)n.call(e[o],t);return e},jt=function(e,t){return e&&t&&-1!==(" "+e.className+" ").indexOf(" "+t+" ")},$t=function(e,t,n){var r,o;return t=Qt(t)[0],e.each(function(){var e=this;n&&r===e.parentNode?o.appendChild(e):(r=e.parentNode,o=t.cloneNode(!1),e.parentNode.insertBefore(o,e),o.appendChild(e))}),e},Wt=Ot.makeMap("fillOpacity fontWeight lineHeight opacity orphans widows zIndex zoom"," "),Kt=Ot.makeMap("checked compact declare defer disabled ismap multiple nohref noshade nowrap readonly selected"," "),Xt={"for":"htmlFor","class":"className",readonly:"readOnly"},Yt={"float":"cssFloat"},Gt={},Jt={},Qt=function(e,t){return new Qt.fn.init(e,t)},Zt=/^\s*|\s*$/g,en=function(e){return null===e||e===undefined?"":(""+e).replace(Zt,"")},tn=function(e,t){var n,r,o,i;if(e)if((n=e.length)===undefined){for(r in e)if(e.hasOwnProperty(r)&&(i=e[r],!1===t.call(i,r,i)))break}else for(o=0;o<n&&(i=e[o],!1!==t.call(i,o,i));o++);return e},nn=function(e,t){var n=[];return tn(e,function(e,r){t(r,e)&&n.push(r)}),n},rn=function(e){return e?9===e.nodeType?e:e.ownerDocument:Pt};Qt.fn=Qt.prototype={constructor:Qt,selector:"",context:null,length:0,init:function(e,t){var n,r,o=this;if(!e)return o;if(e.nodeType)return o.context=o[0]=e,o.length=1,o;if(t&&t.nodeType)o.context=t;else{if(t)return Qt(e).attr(t);o.context=t=document}if(Vt(e)){if(o.selector=e,!(n="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:Mt.exec(e)))return Qt(t).find(e);if(n[1])for(r=Ht(e,rn(t)).firstChild;r;)It.call(o,r),r=r.nextSibling;else{if(!(r=rn(t).getElementById(n[2])))return o;if(r.id!==n[2])return o.find(e);o.length=1,o[0]=r}}else this.add(e,!1);return o},toArray:function(){return Ot.toArray(this)},add:function(e,t){var n,r,o=this;if(Vt(e))return o.add(Qt(e));if(!1!==t)for(n=Qt.unique(o.toArray().concat(Qt.makeArray(e))),o.length=n.length,r=0;r<n.length;r++)o[r]=n[r];else It.apply(o,Qt.makeArray(e));return o},attr:function(e,t){var n,r=this;if("object"==typeof e)tn(e,function(e,t){r.attr(e,t)});else{if(!Ut(t)){if(r[0]&&1===r[0].nodeType){if((n=Gt[e])&&n.get)return n.get(r[0],e);if(Kt[e])return r.prop(e)?e:undefined;null===(t=r[0].getAttribute(e,2))&&(t=undefined)}return t}this.each(function(){var n;if(1===this.nodeType){if((n=Gt[e])&&n.set)return void n.set(this,t);null===t?this.removeAttribute(e,2):this.setAttribute(e,t,2)}})}return r},removeAttr:function(e){return this.attr(e,null)},prop:function(e,t){var n=this;if("object"==typeof(e=Xt[e]||e))tn(e,function(e,t){n.prop(e,t)});else{if(!Ut(t))return n[0]&&n[0].nodeType&&e in n[0]?n[0][e]:t;this.each(function(){1===this.nodeType&&(this[e]=t)})}return n},css:function(e,t){var n,r,o=this,i=function(e){return e.replace(/-(\D)/g,function(e,t){return t.toUpperCase()})},a=function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e})};if("object"==typeof e)tn(e,function(e,t){o.css(e,t)});else if(Ut(t))e=i(e),"number"!=typeof t||Wt[e]||(t=t.toString()+"px"),o.each(function(){var n=this.style;if((r=Jt[e])&&r.set)r.set(this,t);else{try{this.style[Yt[e]||e]=t}catch(o){}null!==t&&""!==t||(n.removeProperty?n.removeProperty(a(e)):n.removeAttribute(e))}});else{if(n=o[0],(r=Jt[e])&&r.get)return r.get(n);if(n.ownerDocument.defaultView)try{return n.ownerDocument.defaultView.getComputedStyle(n,null).getPropertyValue(a(e))}catch(s){return undefined}else if(n.currentStyle)return n.currentStyle[i(e)]}return o},remove:function(){for(var e,t=this.length;t--;)e=this[t],Ft.clean(e),e.parentNode&&e.parentNode.removeChild(e);return this},empty:function(){for(var e,t=this.length;t--;)for(e=this[t];e.firstChild;)e.removeChild(e.firstChild);return this},html:function(e){var t,n=this;if(Ut(e)){t=n.length;try{for(;t--;)n[t].innerHTML=e}catch(r){Qt(n[t]).empty().append(e)}return n}return n[0]?n[0].innerHTML:""},text:function(e){var t,n=this;if(Ut(e)){for(t=n.length;t--;)"innerText"in n[t]?n[t].innerText=e:n[0].textContent=e;return n}return n[0]?n[0].innerText||n[0].textContent:""},append:function(){return qt(this,arguments,function(e){(1===this.nodeType||this.host&&1===this.host.nodeType)&&this.appendChild(e)})},prepend:function(){return qt(this,arguments,function(e){(1===this.nodeType||this.host&&1===this.host.nodeType)&&this.insertBefore(e,this.firstChild)},!0)},before:function(){return this[0]&&this[0].parentNode?qt(this,arguments,function(e){this.parentNode.insertBefore(e,this)}):this},after:function(){return this[0]&&this[0].parentNode?qt(this,arguments,function(e){this.parentNode.insertBefore(e,this.nextSibling)},!0):this},appendTo:function(e){return Qt(e).append(this),this},prependTo:function(e){return Qt(e).prepend(this),this},replaceWith:function(e){return this.before(e).remove()},wrap:function(e){return $t(this,e)},wrapAll:function(e){return $t(this,e,!0)},wrapInner:function(e){return this.each(function(){Qt(this).contents().wrapAll(e)}),this},unwrap:function(){return this.parent().each(function(){Qt(this).replaceWith(this.childNodes)})},clone:function(){var e=[];return this.each(function(){e.push(this.cloneNode(!0))}),Qt(e)},addClass:function(e){return this.toggleClass(e,!0)},removeClass:function(e){return this.toggleClass(e,!1)},toggleClass:function(e,t){var n=this;return"string"!=typeof e?n:(-1!==e.indexOf(" ")?tn(e.split(" "),function(){n.toggleClass(this,t)}):n.each(function(n,r){var o,i;(i=jt(r,e))!==t&&(o=r.className,i?r.className=en((" "+o+" ").replace(" "+e+" "," ")):r.className+=o?" "+e:e)}),n)},hasClass:function(e){return jt(this[0],e)},each:function(e){return tn(this,e)},on:function(e,t){return this.each(function(){Ft.bind(this,e,t)})},off:function(e,t){return this.each(function(){Ft.unbind(this,e,t)})},trigger:function(e){return this.each(function(){"object"==typeof e?Ft.fire(this,e.type,e):Ft.fire(this,e)})},show:function(){return this.css("display","")},hide:function(){return this.css("display","none")},slice:function(){return new Qt(Lt.apply(this,arguments))},eq:function(e){return-1===e?this.slice(e):this.slice(e,+e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},find:function(e){var t,n,r=[];for(t=0,n=this.length;t<n;t++)Qt.find(e,this[t],r);return Qt(r)},filter:function(e){return Qt("function"==typeof e?nn(this.toArray(),function(t,n){return e(n,t)}):Qt.filter(e,this.toArray()))},closest:function(e){var t=[];return e instanceof Qt&&(e=e[0]),this.each(function(n,r){for(;r;){if("string"==typeof e&&Qt(r).is(e)){t.push(r);break}if(r===e){t.push(r);break}r=r.parentNode}}),Qt(t)},offset:function(e){var t,n,r,o,i=0,a=0;return e?this.css(e):((t=this[0])&&(r=(n=t.ownerDocument).documentElement,t.getBoundingClientRect&&(i=(o=t.getBoundingClientRect()).left+(r.scrollLeft||n.body.scrollLeft)-r.clientLeft,a=o.top+(r.scrollTop||n.body.scrollTop)-r.clientTop)),{left:i,top:a})},push:It,sort:[].sort,splice:[].splice},Ot.extend(Qt,{extend:Ot.extend,makeArray:function(e){return(t=e)&&t===t.window||e.nodeType?[e]:Ot.toArray(e);var t},inArray:function(e,t){var n;if(t.indexOf)return t.indexOf(e);for(n=t.length;n--;)if(t[n]===e)return n;return-1},isArray:Ot.isArray,each:tn,trim:en,grep:nn,find:lt,expr:lt.selectors,unique:lt.uniqueSort,text:lt.getText,contains:lt.contains,filter:function(e,t,n){var r=t.length;for(n&&(e=":not("+e+")");r--;)1!==t[r].nodeType&&t.splice(r,1);return t=1===t.length?Qt.find.matchesSelector(t[0],e)?[t[0]]:[]:Qt.find.matches(e,t)}});var on=function(e,t,n){var r=[],o=e[t];for("string"!=typeof n&&n instanceof Qt&&(n=n[0]);o&&9!==o.nodeType;){if(n!==undefined){if(o===n)break;if("string"==typeof n&&Qt(o).is(n))break}1===o.nodeType&&r.push(o),o=o[t]}return r},an=function(e,t,n,r){var o=[];for(r instanceof Qt&&(r=r[0]);e;e=e[t])if(!n||e.nodeType===n){if(r!==undefined){if(e===r)break;if("string"==typeof r&&Qt(e).is(r))break}o.push(e)}return o},sn=function(e,t,n){for(e=e[t];e;e=e[t])if(e.nodeType===n)return e;return null};tn({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return on(e,"parentNode")},next:function(e){return sn(e,"nextSibling",1)},prev:function(e){return sn(e,"previousSibling",1)},children:function(e){return an(e.firstChild,"nextSibling",1)},contents:function(e){return Ot.toArray(("iframe"===e.nodeName?e.contentDocument||e.contentWindow.document:e).childNodes)}},function(e,t){Qt.fn[e]=function(n){var r=[];return this.each(function(){var e=t.call(r,this,n,r);e&&(Qt.isArray(e)?r.push.apply(r,e):r.push(e))}),this.length>1&&(zt[e]||(r=Qt.unique(r)),0===e.indexOf("parents")&&(r=r.reverse())),r=Qt(r),n?r.filter(n):r}}),tn({parentsUntil:function(e,t){return on(e,"parentNode",t)},nextUntil:function(e,t){return an(e,"nextSibling",1,t).slice(1)},prevUntil:function(e,t){return an(e,"previousSibling",1,t).slice(1)}},function(e,t){Qt.fn[e]=function(n,r){var o=[];return this.each(function(){var e=t.call(o,this,n,o);e&&(Qt.isArray(e)?o.push.apply(o,e):o.push(e))}),this.length>1&&(o=Qt.unique(o),0!==e.indexOf("parents")&&"prevUntil"!==e||(o=o.reverse())),o=Qt(o),r?o.filter(r):o}}),Qt.fn.is=function(e){return!!e&&this.filter(e).length>0},Qt.fn.init.prototype=Qt.fn,Qt.overrideDefaults=function(e){var t,n=function(r,o){return t=t||e(),0===arguments.length&&(r=t.element),o||(o=t.context),new n.fn.init(r,o)};return Qt.extend(n,this),n};var un=function(e,t,n){tn(n,function(n,r){e[n]=e[n]||{},e[n][t]=r})};me.ie&&me.ie<8&&(un(Gt,"get",{maxlength:function(e){var t=e.maxLength;return 2147483647===t?undefined:t},size:function(e){var t=e.size;return 20===t?undefined:t},"class":function(e){return e.className},style:function(e){var t=e.style.cssText;return 0===t.length?undefined:t}}),un(Gt,"set",{"class":function(e,t){e.className=t},style:function(e,t){e.style.cssText=t}})),me.ie&&me.ie<9&&(Yt["float"]="styleFloat",un(Jt,"set",{opacity:function(e,t){var n=e.style;null===t||""===t?n.removeAttribute("filter"):(n.zoom=1,n.filter="alpha(opacity="+100*t+")")}})),Qt.attrHooks=Gt,Qt.cssHooks=Jt;var cn,ln,fn,dn,mn=function(e){var t,n=!1;return function(){return n||(n=!0,t=e.apply(null,arguments)),t}},pn=function(e,t){var n=function(e,t){for(var n=0;n<e.length;n++){var r=e[n];if(r.test(t))return r}return undefined}(e,t);if(!n)return{major:0,minor:0};var r=function(e){return Number(t.replace(n,"$"+e))};return hn(r(1),r(2))},gn=function(){return hn(0,0)},hn=function(e,t){return{major:e,minor:t}},vn={nu:hn,detect:function(e,t){var n=String(t).toLowerCase();return 0===e.length?gn():pn(e,n)},unknown:gn},yn="Firefox",bn=function(e,t){return function(){return t===e}},Cn=function(e){var t=e.current;return{current:t,version:e.version,isEdge:bn("Edge",t),isChrome:bn("Chrome",t),isIE:bn("IE",t),isOpera:bn("Opera",t),isFirefox:bn(yn,t),isSafari:bn("Safari",t)}},xn={unknown:function(){return Cn({current:undefined,version:vn.unknown()})},nu:Cn,edge:y.constant("Edge"),chrome:y.constant("Chrome"),ie:y.constant("IE"),opera:y.constant("Opera"),firefox:y.constant(yn),safari:y.constant("Safari")},wn="Windows",Nn="Android",En="Solaris",Sn="FreeBSD",kn=function(e,t){return function(){return t===e}},Tn=function(e){var t=e.current;return{current:t,version:e.version,isWindows:kn(wn,t),isiOS:kn("iOS",t),isAndroid:kn(Nn,t),isOSX:kn("OSX",t),isLinux:kn("Linux",t),isSolaris:kn(En,t),isFreeBSD:kn(Sn,t)}},An={unknown:function(){return Tn({current:undefined,version:vn.unknown()})},nu:Tn,windows:y.constant(wn),ios:y.constant("iOS"),android:y.constant(Nn),linux:y.constant("Linux"),osx:y.constant("OSX"),solaris:y.constant(En),freebsd:y.constant(Sn)},_n=function(e,t){var n=String(t).toLowerCase();return M.find(e,function(e){return e.search(n)})},Bn=function(e,t){return _n(e,t).map(function(e){var n=vn.detect(e.versionRegexes,t);return{current:e.name,version:n}})},Rn=function(e,t){return _n(e,t).map(function(e){var n=vn.detect(e.versionRegexes,t);return{current:e.name,version:n}})},Dn=function(e,t){return-1!==e.indexOf(t)},On=function(e){return e.replace(/^\s+|\s+$/g,"")},Pn=/.*?version\/\ ?([0-9]+)\.([0-9]+).*/,In=function(e){return function(t){return Dn(t,e)}},Ln=[{name:"Edge",versionRegexes:[/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],search:function(e){return Dn(e,"edge/")&&Dn(e,"chrome")&&Dn(e,"safari")&&Dn(e,"applewebkit")}},{name:"Chrome",versionRegexes:[/.*?chrome\/([0-9]+)\.([0-9]+).*/,Pn],search:function(e){return Dn(e,"chrome")&&!Dn(e,"chromeframe")}},{name:"IE",versionRegexes:[/.*?msie\ ?([0-9]+)\.([0-9]+).*/,/.*?rv:([0-9]+)\.([0-9]+).*/],search:function(e){return Dn(e,"msie")||Dn(e,"trident")}},{name:"Opera",versionRegexes:[Pn,/.*?opera\/([0-9]+)\.([0-9]+).*/],search:In("opera")},{name:"Firefox",versionRegexes:[/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],search:In("firefox")},{name:"Safari",versionRegexes:[Pn,/.*?cpu os ([0-9]+)_([0-9]+).*/],search:function(e){return(Dn(e,"safari")||Dn(e,"mobile/"))&&Dn(e,"applewebkit")}}],Mn=[{name:"Windows",search:In("win"),versionRegexes:[/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]},{name:"iOS",search:function(e){return Dn(e,"iphone")||Dn(e,"ipad")},versionRegexes:[/.*?version\/\ ?([0-9]+)\.([0-9]+).*/,/.*cpu os ([0-9]+)_([0-9]+).*/,/.*cpu iphone os ([0-9]+)_([0-9]+).*/]},{name:"Android",search:In("android"),versionRegexes:[/.*?android\ ?([0-9]+)\.([0-9]+).*/]},{name:"OSX",search:In("os x"),versionRegexes:[/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]},{name:"Linux",search:In("linux"),versionRegexes:[]},{name:"Solaris",search:In("sunos"),versionRegexes:[]},{name:"FreeBSD",search:In("freebsd"),versionRegexes:[]}],Fn={browsers:y.constant(Ln),oses:y.constant(Mn)},zn=function(e){var t,n,r,o,i,a,s,u,c,l,f,d=Fn.browsers(),m=Fn.oses(),p=Bn(d,e).fold(xn.unknown,xn.nu),g=Rn(m,e).fold(An.unknown,An.nu);return{browser:p,os:g,deviceType:(n=p,r=e,o=(t=g).isiOS()&&!0===/ipad/i.test(r),i=t.isiOS()&&!o,a=t.isAndroid()&&3===t.version.major,s=t.isAndroid()&&4===t.version.major,u=o||a||s&&!0===/mobile/i.test(r),c=t.isiOS()||t.isAndroid(),l=c&&!u,f=n.isSafari()&&t.isiOS()&&!1===/safari/i.test(r),{isiPad:y.constant(o),isiPhone:y.constant(i),isTablet:y.constant(u),isPhone:y.constant(l),isTouch:y.constant(c),isAndroid:t.isAndroid,isiOS:t.isiOS,isWebView:y.constant(f)})}},Un={detect:mn(function(){var e=navigator.userAgent;return zn(e)})},Vn=function(e){if(null===e||e===undefined)throw new Error("Node cannot be null or undefined");return{dom:y.constant(e)}},Hn={fromHtml:function(e,t){var n=(t||document).createElement("div");if(n.innerHTML=e,!n.hasChildNodes()||n.childNodes.length>1)throw console.error("HTML does not have a single root node",e),"HTML must have a single root node";return Vn(n.childNodes[0])},fromTag:function(e,t){var n=(t||document).createElement(e);return Vn(n)},fromText:function(e,t){var n=(t||document).createTextNode(e);return Vn(n)},fromDom:Vn,fromPoint:function(e,t,n){return E.from(e.dom().elementFromPoint(t,n)).map(Vn)}},qn=8,jn=9,$n=1,Wn=3,Kn=function(e){return e.dom().nodeName.toLowerCase()},Xn=function(e){return e.dom().nodeType},Yn=function(e){return function(t){return Xn(t)===e}},Gn=Yn($n),Jn=Yn(Wn),Qn=Yn(jn),Zn={name:Kn,type:Xn,value:function(e){return e.dom().nodeValue},isElement:Gn,isText:Jn,isDocument:Qn,isComment:function(e){return Xn(e)===qn||"#comment"===Kn(e)}},er=function(e){return function(t){return function(e){if(null===e)return"null";var t=typeof e;return"object"===t&&Array.prototype.isPrototypeOf(e)?"array":"object"===t&&String.prototype.isPrototypeOf(e)?"string":t}(t)===e}},tr={isString:er("string"),isObject:er("object"),isArray:er("array"),isNull:er("null"),isBoolean:er("boolean"),isUndefined:er("undefined"),isFunction:er("function"),isNumber:er("number")},nr=(cn=Object.keys)===undefined?function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t}:cn,rr=function(e,t){for(var n=nr(e),r=0,o=n.length;r<o;r++){var i=n[r];t(e[i],i,e)}},or=function(e,t){var n={};return rr(e,function(r,o){var i=t(r,o,e);n[i.k]=i.v}),n},ir=function(e,t){var n=[];return rr(e,function(e,r){n.push(t(e,r))}),n},ar=function(e){return ir(e,function(e){return e})},sr={bifilter:function(e,t){var n={},r={};return rr(e,function(e,o){(t(e,o)?n:r)[o]=e}),{t:n,f:r}},each:rr,map:function(e,t){return or(e,function(e,n,r){return{k:n,v:t(e,n,r)}})},mapToArray:ir,tupleMap:or,find:function(e,t){for(var n=nr(e),r=0,o=n.length;r<o;r++){var i=n[r],a=e[i];if(t(a,i,e))return E.some(a)}return E.none()},keys:nr,values:ar,size:function(e){return ar(e).length}},ur=function(e,t,n){if(!(tr.isString(n)||tr.isBoolean(n)||tr.isNumber(n)))throw console.error("Invalid call to Attr.set. Key ",t,":: Value ",n,":: Element ",e),new Error("Attribute value was not simple");e.setAttribute(t,n+"")},cr=function(e,t,n){ur(e.dom(),t,n)},lr=function(e,t){var n=e.dom().getAttribute(t);return null===n?undefined:n},fr=function(e,t){var n=e.dom();return!(!n||!n.hasAttribute)&&n.hasAttribute(t)},dr={clone:function(e){return M.foldl(e.dom().attributes,function(e,t){return e[t.name]=t.value,e},{})},set:cr,setAll:function(e,t){var n=e.dom();sr.each(t,function(e,t){ur(n,t,e)})},get:lr,has:fr,remove:function(e,t){e.dom().removeAttribute(t)},hasNone:function(e){var t=e.dom().attributes;return t===undefined||null===t||0===t.length},transfer:function(e,t,n){Zn.isElement(e)&&Zn.isElement(t)&&M.each(n,function(n){var r,o,i;o=t,fr(r=e,i=n)&&!fr(o,i)&&cr(o,i,lr(r,i))})}},mr=mn(function(){return pr(Hn.fromDom(document))}),pr=function(e){var t=e.dom().body;if(null===t||t===undefined)throw"Body is not available yet";return Hn.fromDom(t)},gr={body:mr,getBody:pr,inBody:function(e){var t=Zn.isText(e)?e.dom().parentNode:e.dom();return t!==undefined&&null!==t&&t.ownerDocument.body.contains(t)}},hr=function(e){return e.style!==undefined},vr=function(e,t,n){if(!tr.isString(n))throw console.error("Invalid call to CSS.set. Property ",t,":: Value ",n,":: Element ",e),new Error("CSS value must be a string: "+n);hr(e)&&e.style.setProperty(t,n)},yr=function(e,t){return hr(e)?e.style.getPropertyValue(t):""},br=function(e,t){var n=e.dom();sr.each(t,function(e,t){vr(n,t,e)})},Cr=function(e,t){var n=e.dom(),r=window.getComputedStyle(n).getPropertyValue(t),o=""!==r||gr.inBody(e)?r:yr(n,t);return null===o?undefined:o},xr=function(){var e=arguments;return function(){for(var t=new Array(arguments.length),n=0;n<t.length;n++)t[n]=arguments[n];if(e.length!==t.length)throw new Error('Wrong number of arguments to struct. Expected "['+e.length+']", got '+t.length+" arguments");var r={};return M.each(e,function(e,n){r[e]=y.constant(t[n])}),r}},wr=function(e,t){var n=[],r=function(e){return n.push(e),t(e)},o=t(e);do{o=o.bind(r)}while(o.isSome());return n},Nr=function(){return V("Node")},Er=function(e,t,n){return 0!=(e.compareDocumentPosition(t)&n)},Sr=function(e,t){return Er(e,t,Nr().DOCUMENT_POSITION_CONTAINED_BY)},kr=$n,Tr=jn,Ar=function(e){return e.nodeType!==kr&&e.nodeType!==Tr||0===e.childElementCount},_r={all:function(e,t){var n=t===undefined?document:t.dom();return Ar(n)?[]:M.map(n.querySelectorAll(e),Hn.fromDom)},is:function(e,t){var n=e.dom();if(n.nodeType!==kr)return!1;if(n.matches!==undefined)return n.matches(t);if(n.msMatchesSelector!==undefined)return n.msMatchesSelector(t);if(n.webkitMatchesSelector!==undefined)return n.webkitMatchesSelector(t);if(n.mozMatchesSelector!==undefined)return n.mozMatchesSelector(t);throw new Error("Browser lacks native selectors")},one:function(e,t){var n=t===undefined?document:t.dom();return Ar(n)?E.none():E.from(n.querySelector(e)).map(Hn.fromDom)}},Br=function(e,t){return e.dom()===t.dom()},Rr=Un.detect().browser.isIE()?function(e,t){return Sr(e.dom(),t.dom())}:function(e,t){var n=e.dom(),r=t.dom();return n!==r&&n.contains(r)},Dr={eq:Br,isEqualNode:function(e,t){return e.dom().isEqualNode(t.dom())},member:function(e,t){return M.exists(t,y.curry(Br,e))},contains:Rr,is:_r.is},Or=function(e){return Hn.fromDom(e.dom().ownerDocument)},Pr=function(e){var t=e.dom();return E.from(t.parentNode).map(Hn.fromDom)},Ir=function(e){var t=e.dom();return E.from(t.previousSibling).map(Hn.fromDom)},Lr=function(e){var t=e.dom();return E.from(t.nextSibling).map(Hn.fromDom)},Mr=function(e){var t=e.dom();return M.map(t.childNodes,Hn.fromDom)},Fr=function(e,t){var n=e.dom().childNodes;return E.from(n[t]).map(Hn.fromDom)},zr=xr("element","offset"),Ur={owner:Or,defaultView:function(e){var t=e.dom().ownerDocument.defaultView;return Hn.fromDom(t)},documentElement:function(e){var t=Or(e);return Hn.fromDom(t.dom().documentElement)},parent:Pr,findIndex:function(e){return Pr(e).bind(function(t){var n=Mr(t);return M.findIndex(n,function(t){return Dr.eq(e,t)})})},parents:function(e,t){for(var n=tr.isFunction(t)?t:y.constant(!1),r=e.dom(),o=[];null!==r.parentNode&&r.parentNode!==undefined;){var i=r.parentNode,a=Hn.fromDom(i);if(o.push(a),!0===n(a))break;r=i}return o},siblings:function(e){return Pr(e).map(Mr).map(function(t){return M.filter(t,function(t){return!Dr.eq(e,t)})}).getOr([])},prevSibling:Ir,offsetParent:function(e){var t=e.dom();return E.from(t.offsetParent).map(Hn.fromDom)},prevSiblings:function(e){return M.reverse(wr(e,Ir))},nextSibling:Lr,nextSiblings:function(e){return wr(e,Lr)},children:Mr,child:Fr,firstChild:function(e){return Fr(e,0)},lastChild:function(e){return Fr(e,e.dom().childNodes.length-1)},childNodesCount:function(e){return e.dom().childNodes.length},hasChildNodes:function(e){return e.dom().hasChildNodes()},leaf:function(e,t){var n=Mr(e);return n.length>0&&t<n.length?zr(n[t],0):zr(e,t)}},Vr=Un.detect().browser,Hr=function(e){return M.find(e,Zn.isElement)},qr=function(e,t,n){var r,o,i,a=0,s=0,u=e.ownerDocument;if(n=n||e,t){if(n===e&&t.getBoundingClientRect&&"static"===Cr(Hn.fromDom(e),"position"))return{x:a=(o=t.getBoundingClientRect()).left+(u.documentElement.scrollLeft||e.scrollLeft)-u.documentElement.clientLeft,y:s=o.top+(u.documentElement.scrollTop||e.scrollTop)-u.documentElement.clientTop};for(r=t;r&&r!==n&&r.nodeType;)a+=r.offsetLeft||0,s+=r.offsetTop||0,r=r.offsetParent;for(r=t.parentNode;r&&r!==n&&r.nodeType;)a-=r.scrollLeft||0,s-=r.scrollTop||0,r=r.parentNode;s+=(i=Hn.fromDom(t),Vr.isFirefox()&&"table"===Zn.name(i)?Hr(Ur.children(i)).filter(function(e){return"caption"===Zn.name(e)}).bind(function(e){return Hr(Ur.nextSiblings(e)).map(function(t){var n=t.dom().offsetTop,r=e.dom().offsetTop,o=e.dom().offsetHeight;return n<=r?-o:0})}).getOr(0):0)}return{x:a,y:s}},jr=function(e){var t=E.none(),n=[],r=function(e){o()?a(e):n.push(e)},o=function(){return t.isSome()},i=function(e){M.each(e,a)},a=function(e){t.each(function(t){setTimeout(function(){e(t)},0)})};return e(function(e){t=E.some(e),i(n),n=[]}),{get:r,map:function(e){return jr(function(t){r(function(n){t(e(n))})})},isReady:o}},$r={nu:jr,pure:function(e){return jr(function(t){t(e)})}},Wr=function(e){return function(){var t=Array.prototype.slice.call(arguments),n=this;setTimeout(function(){e.apply(n,t)},0)}},Kr=function(e){var t=function(t){e(Wr(t))};return{map:function(e){return Kr(function(n){t(function(t){var r=e(t);n(r)})})},bind:function(e){return Kr(function(n){t(function(t){e(t).get(n)})})},anonBind:function(e){return Kr(function(n){t(function(t){e.get(n)})})},toLazy:function(){return $r.nu(t)},get:t}},Xr={nu:Kr,pure:function(e){return Kr(function(t){t(e)})}},Yr=function(e,t){return t(function(t){var n=[],r=0;0===e.length?t([]):M.each(e,function(o,i){var a;o.get((a=i,function(o){n[a]=o,++r>=e.length&&t(n)}))})})},Gr=function(e){return Yr(e,Xr.nu)},Jr=Gr,Qr=function(e){return{is:function(t){return e===t},isValue:y.constant(!0),isError:y.constant(!1),getOr:y.constant(e),getOrThunk:y.constant(e),getOrDie:y.constant(e),or:function(t){return Qr(e)},orThunk:function(t){return Qr(e)},fold:function(t,n){return n(e)},map:function(t){return Qr(t(e))},each:function(t){t(e)},bind:function(t){return t(e)},exists:function(t){return t(e)},forall:function(t){return t(e)},toOption:function(){return E.some(e)}}},Zr=function(e){return{is:y.constant(!1),isValue:y.constant(!1),isError:y.constant(!0),getOr:y.identity,getOrThunk:function(e){return e()},getOrDie:function(){return y.die(e)()},or:function(e){return e},orThunk:function(e){return e()},fold:function(t,n){return t(e)},map:function(t){return Zr(e)},each:y.noop,bind:function(t){return Zr(e)},exists:y.constant(!1),forall:y.constant(!0),toOption:E.none}},eo={value:Qr,error:Zr},to=function(e,t){var n=e,r=function(e,n,r,o){var i,a;if(e){if(!o&&e[n])return e[n];if(e!==t){if(i=e[r])return i;for(a=e.parentNode;a&&a!==t;a=a.parentNode)if(i=a[r])return i}}};this.current=function(){return n},this.next=function(e){return n=r(n,"firstChild","nextSibling",e)},this.prev=function(e){return n=r(n,"lastChild","previousSibling",e)},this.prev2=function(e){return n=function(e,n,r,o){var i,a,s;if(e){if(i=e[r],t&&i===t)return;if(i){if(!o)for(s=i[n];s;s=s[n])if(!s[n])return s;return i}if((a=e.parentNode)&&a!==t)return a}}(n,"lastChild","previousSibling",e)}},no=function(e){var t;return function(n){return(t=t||M.mapToObject(e,y.constant(!0))).hasOwnProperty(Zn.name(n))}},ro=no(["h1","h2","h3","h4","h5","h6"]),oo=no(["article","aside","details","div","dt","figcaption","footer","form","fieldset","header","hgroup","html","main","nav","section","summary","body","p","dl","multicol","dd","figure","address","center","blockquote","h1","h2","h3","h4","h5","h6","listing","xmp","pre","plaintext","menu","dir","ul","ol","li","hr","table","tbody","thead","tfoot","th","tr","td","caption"]),io={isBlock:oo,isInline:function(e){return Zn.isElement(e)&&!oo(e)},isHeading:ro,isTextBlock:no(["h1","h2","h3","h4","h5","h6","p","div","address","pre","form","blockquote","center","dir","fieldset","header","footer","article","section","hgroup","aside","nav","figure"]),isList:no(["ul","ol","dl"]),isListItem:no(["li","dd","dt"]),isVoid:no(["area","base","basefont","br","col","frame","hr","img","input","isindex","link","meta","param","embed","source","wbr","track"]),isTableSection:no(["thead","tbody","tfoot"]),isTableCell:no(["td","th"]),isBr:function(e){return Zn.isElement(e)&&"br"===Zn.name(e)}},ao=function(e){return function(t){return!!t&&t.nodeType===e}},so=ao(1),uo=function(e){var t=e.toLowerCase().split(" ");return function(e){var n,r;if(e&&e.nodeType)for(r=e.nodeName.toLowerCase(),n=0;n<t.length;n++)if(r===t[n])return!0;return!1}},co=function(e){return function(t){if(so(t)){if(t.contentEditable===e)return!0;if(t.getAttribute("data-mce-contenteditable")===e)return!0}return!1}},lo=ao(3),fo=ao(8),mo=ao(9),po=uo("br"),go=co("true"),ho=co("false"),vo={isText:lo,isElement:so,isComment:fo,isDocument:mo,isBr:po,isContentEditableTrue:go,isContentEditableFalse:ho,matchNodeNames:uo,hasPropValue:function(e,t){return function(n){return so(n)&&n[e]===t}},hasAttribute:function(e,t){return function(t){return so(t)&&t.hasAttribute(e)}},hasAttributeValue:function(e,t){return function(n){return so(n)&&n.getAttribute(e)===t}},matchStyleValues:function(e,t){var n=t.toLowerCase().split(" ");return function(t){var r;if(so(t))for(r=0;r<n.length;r++)if(t.ownerDocument.defaultView.getComputedStyle(t,null).getPropertyValue(e)===n[r])return!0;return!1}},isBogus:function(e){return so(e)&&e.hasAttribute("data-mce-bogus")}},yo=function(e){return e&&"SPAN"===e.tagName&&"bookmark"===e.getAttribute("data-mce-type")},bo=function(e,t){var n,r=t.childNodes;if(!vo.isElement(t)||!yo(t)){for(n=r.length-1;n>=0;n--)bo(e,r[n]);if(!1===vo.isDocument(t)){if(vo.isText(t)&&t.nodeValue.length>0){var o=Ot.trim(t.nodeValue).length;if(e.isBlock(t.parentNode)||o>0)return;if(0===o&&(a=(i=t).previousSibling&&"SPAN"===i.previousSibling.nodeName,s=i.nextSibling&&"SPAN"===i.nextSibling.nodeName,a&&s))return}else if(vo.isElement(t)&&(1===(r=t.childNodes).length&&yo(r[0])&&t.parentNode.insertBefore(r[0],t),r.length||io.isVoid(Hn.fromDom(t))))return;e.remove(t)}var i,a,s;return t}},Co={trimNode:bo},xo=Ot.makeMap,wo=/[&<>\"\u0060\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,No=/[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,Eo=/[<>&\"\']/g,So=/&#([a-z0-9]+);?|&([a-z0-9]+);/gi,ko={128:"\u20ac",130:"\u201a",131:"\u0192",132:"\u201e",133:"\u2026",134:"\u2020",135:"\u2021",136:"\u02c6",137:"\u2030",138:"\u0160",139:"\u2039",140:"\u0152",142:"\u017d",145:"\u2018",146:"\u2019",147:"\u201c",148:"\u201d",149:"\u2022",150:"\u2013",151:"\u2014",152:"\u02dc",153:"\u2122",154:"\u0161",155:"\u203a",156:"\u0153",158:"\u017e",159:"\u0178"};fn={'"':"&quot;","'":"&#39;","<":"&lt;",">":"&gt;","&":"&amp;","`":"&#96;"},dn={"&lt;":"<","&gt;":">","&amp;":"&","&quot;":'"',"&apos;":"'"};var To=function(e,t){var n,r,o,i={};if(e){for(e=e.split(","),t=t||10,n=0;n<e.length;n+=2)r=String.fromCharCode(parseInt(e[n],t)),fn[r]||(o="&"+e[n+1]+";",i[r]=o,i[o]=r);return i}};ln=To("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro",32);var Ao={encodeRaw:function(e,t){return e.replace(t?wo:No,function(e){return fn[e]||e})},encodeAllRaw:function(e){return(""+e).replace(Eo,function(e){return fn[e]||e})},encodeNumeric:function(e,t){return e.replace(t?wo:No,function(e){return e.length>1?"&#"+(1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320)+65536)+";":fn[e]||"&#"+e.charCodeAt(0)+";"})},encodeNamed:function(e,t,n){return n=n||ln,e.replace(t?wo:No,function(e){return fn[e]||n[e]||e})},getEncodeFunc:function(e,t){return t=To(t)||ln,(e=xo(e.replace(/\+/g,","))).named&&e.numeric?function(e,n){return e.replace(n?wo:No,function(e){return fn[e]!==undefined?fn[e]:t[e]!==undefined?t[e]:e.length>1?"&#"+(1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320)+65536)+";":"&#"+e.charCodeAt(0)+";"})}:e.named?t?function(e,n){return Ao.encodeNamed(e,n,t)}:Ao.encodeNamed:e.numeric?Ao.encodeNumeric:Ao.encodeRaw},decode:function(e){return e.replace(So,function(e,t){return t?(t="x"===t.charAt(0).toLowerCase()?parseInt(t.substr(1),16):parseInt(t,10))>65535?(t-=65536,String.fromCharCode(55296+(t>>10),56320+(1023&t))):ko[t]||String.fromCharCode(t):dn[e]||ln[e]||(n=e,(r=Hn.fromTag("div").dom()).innerHTML=n,r.textContent||r.innerText||n);var n,r})}},_o={},Bo={},Ro=Ot.makeMap,Do=Ot.each,Oo=Ot.extend,Po=Ot.explode,Io=Ot.inArray,Lo=function(e,t){return(e=Ot.trim(e))?e.split(t||" "):[]},Mo=function(e,t){var n;return e&&(n={},"string"==typeof e&&(e={"*":e}),Do(e,function(e,r){n[r]=n[r.toUpperCase()]="map"===t?Ro(e,/[, ]/):Po(e,/[, ]/)})),n},Fo=function(e){var t,n,r,o,i,a,s,u,c,l,f,d,m,p,g,h,v,y,b,C,x,w,N,E={},S={},k={},T=[],A={},_={},B=function(t,n,r){var o=e[t];return o?o=Ro(o,/[, ]/,Ro(o.toUpperCase(),/[, ]/)):(o=_o[t])||(o=Ro(n," ",Ro(n.toUpperCase()," ")),o=Oo(o,r),_o[t]=o),o};p=(e=e||{}).schema,x={},w=function(e,t,n){var r,o,i,a=function(e,t){var n,r,o={};for(n=0,r=e.length;n<r;n++)o[e[n]]=t||{};return o};for(n=n||[],t=t||"","string"==typeof n&&(n=Lo(n)),r=(e=Lo(e)).length;r--;)i={attributes:a(o=Lo([g,t].join(" "))),attributesOrder:o,children:a(n,Bo)},x[e[r]]=i},N=function(e,t){var n,r,o,i;for(n=(e=Lo(e)).length,t=Lo(t);n--;)for(r=x[e[n]],o=0,i=t.length;o<i;o++)r.attributes[t[o]]={},r.attributesOrder.push(t[o])},r=_o[p]?_o[p]:(g="id accesskey class dir lang style tabindex title role",h="address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr menu ol p pre table ul",v="a abbr b bdo br button cite code del dfn em embed i iframe img input ins kbd label map noscript object q s samp script select small span strong sub sup textarea u var #text #comment","html4"!==p&&(g+=" contenteditable contextmenu draggable dropzone hidden spellcheck translate",h+=" article aside details dialog figure header footer hgroup section nav",v+=" audio canvas command datalist mark meter output picture progress time wbr video ruby bdi keygen"),"html5-strict"!==p&&(g+=" xml:lang",v=[v,C="acronym applet basefont big font strike tt"].join(" "),Do(Lo(C),function(e){w(e,"",v)}),h=[h,b="center dir isindex noframes"].join(" "),y=[h,v].join(" "),Do(Lo(b),function(e){w(e,"",y)})),y=y||[h,v].join(" "),w("html","manifest","head body"),w("head","","base command link meta noscript script style title"),w("title hr noscript br"),w("base","href target"),w("link","href rel media hreflang type sizes hreflang"),w("meta","name http-equiv content charset"),w("style","media type scoped"),w("script","src async defer type charset"),w("body","onafterprint onbeforeprint onbeforeunload onblur onerror onfocus onhashchange onload onmessage onoffline ononline onpagehide onpageshow onpopstate onresize onscroll onstorage onunload",y),w("address dt dd div caption","",y),w("h1 h2 h3 h4 h5 h6 pre p abbr code var samp kbd sub sup i b u bdo span legend em strong small s cite dfn","",v),w("blockquote","cite",y),w("ol","reversed start type","li"),w("ul","","li"),w("li","value",y),w("dl","","dt dd"),w("a","href target rel media hreflang type",v),w("q","cite",v),w("ins del","cite datetime",y),w("img","src sizes srcset alt usemap ismap width height"),w("iframe","src name width height",y),w("embed","src type width height"),w("object","data type typemustmatch name usemap form width height",[y,"param"].join(" ")),w("param","name value"),w("map","name",[y,"area"].join(" ")),w("area","alt coords shape href target rel media hreflang type"),w("table","border","caption colgroup thead tfoot tbody tr"+("html4"===p?" col":"")),w("colgroup","span","col"),w("col","span"),w("tbody thead tfoot","","tr"),w("tr","","td th"),w("td","colspan rowspan headers",y),w("th","colspan rowspan headers scope abbr",y),w("form","accept-charset action autocomplete enctype method name novalidate target",y),w("fieldset","disabled form name",[y,"legend"].join(" ")),w("label","form for",v),w("input","accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate formtarget height list max maxlength min multiple name pattern readonly required size src step type value width"),w("button","disabled form formaction formenctype formmethod formnovalidate formtarget name type value","html4"===p?y:v),w("select","disabled form multiple name required size","option optgroup"),w("optgroup","disabled label","option"),w("option","disabled label selected value"),w("textarea","cols dirname disabled form maxlength name readonly required rows wrap"),w("menu","type label",[y,"li"].join(" ")),w("noscript","",y),"html4"!==p&&(w("wbr"),w("ruby","",[v,"rt rp"].join(" ")),w("figcaption","",y),w("mark rt rp summary bdi","",v),w("canvas","width height",y),w("video","src crossorigin poster preload autoplay mediagroup loop muted controls width height buffered",[y,"track source"].join(" ")),w("audio","src crossorigin preload autoplay mediagroup loop muted controls buffered volume",[y,"track source"].join(" ")),w("picture","","img source"),w("source","src srcset type media sizes"),w("track","kind src srclang label default"),w("datalist","",[v,"option"].join(" ")),w("article section nav aside header footer","",y),w("hgroup","","h1 h2 h3 h4 h5 h6"),w("figure","",[y,"figcaption"].join(" ")),w("time","datetime",v),w("dialog","open",y),w("command","type label icon disabled checked radiogroup command"),w("output","for form name",v),w("progress","value max",v),w("meter","value min max low high optimum",v),w("details","open",[y,"summary"].join(" ")),w("keygen","autofocus challenge disabled form keytype name")),"html5-strict"!==p&&(N("script","language xml:space"),N("style","xml:space"),N("object","declare classid code codebase codetype archive standby align border hspace vspace"),N("embed","align name hspace vspace"),N("param","valuetype type"),N("a","charset name rev shape coords"),N("br","clear"),N("applet","codebase archive code object alt name width height align hspace vspace"),N("img","name longdesc align border hspace vspace"),N("iframe","longdesc frameborder marginwidth marginheight scrolling align"),N("font basefont","size color face"),N("input","usemap align"),N("select","onchange"),N("textarea"),N("h1 h2 h3 h4 h5 h6 div p legend caption","align"),N("ul","type compact"),N("li","type"),N("ol dl menu dir","compact"),N("pre","width xml:space"),N("hr","align noshade size width"),N("isindex","prompt"),N("table","summary width frame rules cellspacing cellpadding align bgcolor"),N("col","width align char charoff valign"),N("colgroup","width align char charoff valign"),N("thead","align char charoff valign"),N("tr","align char charoff valign bgcolor"),N("th","axis align char charoff valign nowrap bgcolor width height"),N("form","accept"),N("td","abbr axis scope align char charoff valign nowrap bgcolor width height"),N("tfoot","align char charoff valign"),N("tbody","align char charoff valign"),N("area","nohref"),N("body","background bgcolor text link vlink alink")),"html4"!==p&&(N("input button select textarea","autofocus"),N("input textarea","placeholder"),N("a","download"),N("link script img","crossorigin"),N("iframe","sandbox seamless allowfullscreen")),Do(Lo("a form meter progress dfn"),function(e){x[e]&&delete x[e].children[e]}),delete x.caption.children.table,delete x.script,_o[p]=x,x),!1===e.verify_html&&(e.valid_elements="*[*]"),t=Mo(e.valid_styles),n=Mo(e.invalid_styles,"map"),u=Mo(e.valid_classes,"map"),o=B("whitespace_elements","pre script noscript style textarea video audio iframe object code"),i=B("self_closing_elements","colgroup dd dt li option p td tfoot th thead tr"),a=B("short_ended_elements","area base basefont br col frame hr img input isindex link meta param embed source wbr track"),s=B("boolean_attributes","checked compact declare defer disabled ismap multiple nohref noresize noshade nowrap readonly selected autoplay loop controls"),l=B("non_empty_elements","td th iframe video audio object script pre code",a),f=B("move_caret_before_on_enter_elements","table",l),d=B("text_block_elements","h1 h2 h3 h4 h5 h6 p div address pre form blockquote center dir fieldset header footer article section hgroup aside nav figure"),c=B("block_elements","hr table tbody thead tfoot th tr td li ol ul caption dl dt dd noscript menu isindex option datalist select optgroup figcaption",d),m=B("text_inline_elements","span strong b em i font strike u var cite dfn code mark q sup sub samp"),Do((e.special||"script noscript noframes noembed title style textarea xmp").split(" "),function(e){_[e]=new RegExp("</"+e+"[^>]*>","gi")});var R=function(e){return new RegExp("^"+e.replace(/([?+*])/g,".$1")+"$")},D=function(e){var t,n,r,o,i,a,s,u,c,l,f,d,m,p,g,h,v,y,b,C=/^([#+\-])?([^\[!\/]+)(?:\/([^\[!]+))?(?:(!?)\[([^\]]+)\])?$/,x=/^([!\-])?(\w+[\\:]:\w+|[^=:<]+)?(?:([=:<])(.*))?$/,w=/[*?+]/;if(e)for(e=Lo(e,","),S["@"]&&(h=S["@"].attributes,v=S["@"].attributesOrder),t=0,n=e.length;t<n;t++)if(i=C.exec(e[t])){if(p=i[1],c=i[2],g=i[3],u=i[5],a={attributes:d={},attributesOrder:m=[]},"#"===p&&(a.paddEmpty=!0),"-"===p&&(a.removeEmpty=!0),"!"===i[4]&&(a.removeEmptyAttrs=!0),h){for(y in h)d[y]=h[y];m.push.apply(m,v)}if(u)for(r=0,o=(u=Lo(u,"|")).length;r<o;r++)if(i=x.exec(u[r])){if(s={},f=i[1],l=i[2].replace(/[\\:]:/g,":"),p=i[3],b=i[4],"!"===f&&(a.attributesRequired=a.attributesRequired||[],a.attributesRequired.push(l),s.required=!0),"-"===f){delete d[l],m.splice(Io(m,l),1);continue}p&&("="===p&&(a.attributesDefault=a.attributesDefault||[],a.attributesDefault.push({name:l,value:b}),s.defaultValue=b),":"===p&&(a.attributesForced=a.attributesForced||[],a.attributesForced.push({name:l,value:b}),s.forcedValue=b),"<"===p&&(s.validValues=Ro(b,"?"))),w.test(l)?(a.attributePatterns=a.attributePatterns||[],s.pattern=R(l),a.attributePatterns.push(s)):(d[l]||m.push(l),d[l]=s)}h||"@"!==c||(h=d,v=m),g&&(a.outputName=c,S[g]=a),w.test(c)?(a.pattern=R(c),T.push(a)):S[c]=a}},O=function(e){S={},T=[],D(e),Do(r,function(e,t){k[t]=e.children})},P=function(e){var t=/^(~)?(.+)$/;e&&(_o.text_block_elements=_o.block_elements=null,Do(Lo(e,","),function(e){var n=t.exec(e),r="~"===n[1],o=r?"span":"div",i=n[2];if(k[i]=k[o],A[i]=o,r||(c[i.toUpperCase()]={},c[i]={}),!S[i]){var a=S[o];delete(a=Oo({},a)).removeEmptyAttrs,delete a.removeEmpty,S[i]=a}Do(k,function(e,t){e[o]&&(k[t]=e=Oo({},k[t]),e[i]=e[o])})}))},I=function(t){var n=/^([+\-]?)(\w+)\[([^\]]+)\]$/;_o[e.schema]=null,t&&Do(Lo(t,","),function(e){var t,r,o=n.exec(e);o&&(r=o[1],t=r?k[o[2]]:k[o[2]]={"#comment":{}},t=k[o[2]],Do(Lo(o[3],"|"),function(e){"-"===r?delete t[e]:t[e]={}}))})},L=function(e){var t,n=S[e];if(n)return n;for(t=T.length;t--;)if((n=T[t]).pattern.test(e))return n};return e.valid_elements?O(e.valid_elements):(Do(r,function(e,t){S[t]={attributes:e.attributes,attributesOrder:e.attributesOrder},k[t]=e.children}),"html5"!==e.schema&&Do(Lo("strong/b em/i"),function(e){e=Lo(e,"/"),S[e[1]].outputName=e[0]}),Do(Lo("ol ul sub sup blockquote span font a table tbody tr strong em b i"),function(e){S[e]&&(S[e].removeEmpty=!0)}),Do(Lo("p h1 h2 h3 h4 h5 h6 th td pre div address caption li"),function(e){S[e].paddEmpty=!0}),Do(Lo("span"),function(e){S[e].removeEmptyAttrs=!0})),P(e.custom_elements),I(e.valid_children),D(e.extended_valid_elements),I("+ol[ul|ol],+ul[ul|ol]"),Do({dd:"dl",dt:"dl",li:"ul ol",td:"tr",th:"tr",tr:"tbody thead tfoot",tbody:"table",thead:"table",tfoot:"table",legend:"fieldset",area:"map",param:"video audio object"},function(e,t){S[t]&&(S[t].parentsRequired=Lo(e))}),e.invalid_elements&&Do(Po(e.invalid_elements),function(e){S[e]&&delete S[e]}),L("span")||D("span[!data-mce-type|*]"),E.children=k,E.getValidStyles=function(){return t},E.getInvalidStyles=function(){return n},E.getValidClasses=function(){return u},E.getBoolAttrs=function(){return s},E.getBlockElements=function(){return c},E.getTextBlockElements=function(){return d},E.getTextInlineElements=function(){return m},E.getShortEndedElements=function(){return a},E.getSelfClosingElements=function(){return i},E.getNonEmptyElements=function(){return l},E.getMoveCaretBeforeOnEnterElements=function(){return f},E.getWhiteSpaceElements=function(){return o},E.getSpecialElements=function(){return _},E.isValidChild=function(e,t){var n=k[e.toLowerCase()];return!(!n||!n[t.toLowerCase()])},E.isValid=function(e,t){var n,r,o=L(e);if(o){if(!t)return!0;if(o.attributes[t])return!0;if(n=o.attributePatterns)for(r=n.length;r--;)if(n[r].pattern.test(e))return!0}return!1},E.getElementRule=L,E.getCustomElements=function(){return A},E.addValidElements=D,E.setValidElements=O,E.addCustomElements=P,E.addValidChildren=I,E.elements=S,E},zo=function(e,t){var n,r,o,i,a=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,s=/(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,u=/\s*([^:]+):\s*([^;]+);?/g,c=/\s+$/,l={},f="\ufeff";for(e=e||{},t&&(o=t.getValidStyles(),i=t.getInvalidStyles()),r=("\\\" \\' \\; \\: ; : "+f).split(" "),n=0;n<r.length;n++)l[r[n]]=f+n,l[f+n]=r[n];var d=function(e,t,n,r){var o=function(e){return(e=parseInt(e,10).toString(16)).length>1?e:"0"+e};return"#"+o(t)+o(n)+o(r)};return{toHex:function(e){return e.replace(a,d)},parse:function(t){var r,o,i,m,p,g,h,v,y={},b=e.url_converter,C=e.url_converter_scope||this,x=function(e,t,r){var o,i,a,s;if((o=y[e+"-top"+t])&&(i=y[e+"-right"+t])&&(a=y[e+"-bottom"+t])&&(s=y[e+"-left"+t])){var u=[o,i,a,s];for(n=u.length-1;n--&&u[n]===u[n+1];);n>-1&&r||(y[e+t]=-1===n?u[0]:u.join(" "),delete y[e+"-top"+t],delete y[e+"-right"+t],delete y[e+"-bottom"+t],delete y[e+"-left"+t])}},w=function(e){var t,n=y[e];if(n){for(t=(n=n.split(" ")).length;t--;)if(n[t]!==n[0])return!1;return y[e]=n[0],!0}},N=function(e){return m=!0,l[e]},E=function(e,t){return m&&(e=e.replace(/\uFEFF[0-9]/g,function(e){return l[e]})),t||(e=e.replace(/\\([\'\";:])/g,"$1")),e},S=function(e){return String.fromCharCode(parseInt(e.slice(1),16))},k=function(e){return e.replace(/\\[0-9a-f]+/gi,S)},T=function(t,n,r,o,i,a){if(i=i||a)return"'"+(i=E(i)).replace(/\'/g,"\\'")+"'";if(n=E(n||r||o),!e.allow_script_urls){var s=n.replace(/[\s\r\n]+/g,"");if(/(java|vb)script:/i.test(s))return"";if(!e.allow_svg_data_urls&&/^data:image\/svg/i.test(s))return""}return b&&(n=b.call(C,n,"style")),"url('"+n.replace(/\'/g,"\\'")+"')"};if(t){for(t=(t=t.replace(/[\u0000-\u001F]/g,"")).replace(/\\[\"\';:\uFEFF]/g,N).replace(/\"[^\"]+\"|\'[^\']+\'/g,function(e){return e.replace(/[;:]/g,N)});r=u.exec(t);)if(u.lastIndex=r.index+r[0].length,o=r[1].replace(c,"").toLowerCase(),i=r[2].replace(c,""),o&&i){if(o=k(o),i=k(i),-1!==o.indexOf(f)||-1!==o.indexOf('"'))continue;if(!e.allow_script_urls&&("behavior"===o||/expression\s*\(|\/\*|\*\//.test(i)))continue;"font-weight"===o&&"700"===i?i="bold":"color"!==o&&"background-color"!==o||(i=i.toLowerCase()),i=(i=i.replace(a,d)).replace(s,T),y[o]=m?E(i,!0):i}x("border","",!0),x("border","-width"),x("border","-color"),x("border","-style"),x("padding",""),x("margin",""),p="border",h="border-style",v="border-color",w(g="border-width")&&w(h)&&w(v)&&(y[p]=y[g]+" "+y[h]+" "+y[v],delete y[g],delete y[h],delete y[v]),"medium none"===y.border&&delete y.border,"none"===y["border-image"]&&delete y["border-image"]}return y},serialize:function(e,t){var n,r,a,s,u,c="",l=function(t){var n,r,i,a;if(n=o[t])for(r=0,i=n.length;r<i;r++)t=n[r],(a=e[t])&&(c+=(c.length>0?" ":"")+t+": "+a+";")};if(t&&o)l("*"),l(t);else for(n in e)!(r=e[n])||i&&(a=n,s=t,u=void 0,(u=i["*"])&&u[a]||(u=i[s])&&u[a])||(c+=(c.length>0?" ":"")+n+": "+r+";");return c}}},Uo=Ot.each,Vo=Ot.is,Ho=Ot.grep,qo=me.ie,jo=/^([a-z0-9],?)+$/i,$o=/^[ \t\r\n]*$/,Wo=function(e,t){var n=t.attr("style");(n=e.serializeStyle(e.parseStyle(n),t[0].nodeName))||(n=null),t.attr("data-mce-style",n)},Ko=function(e,t){var n,r,o=0;if(e)for(n=e.nodeType,e=e.previousSibling;e;e=e.previousSibling)r=e.nodeType,(!t||3!==r||r!==n&&e.nodeValue.length)&&(o++,n=r);return o},Xo=function(e,t){var n,r,o,i,a,s,u=this;u.doc=e,u.win=window,u.files={},u.counter=0,u.stdMode=!qo||e.documentMode>=8,u.boxModel=!qo||"CSS1Compat"===e.compatMode||u.stdMode,u.styleSheetLoader=function(e,t){var n,r=0,o={};n=(t=t||{}).maxLoadTime||5e3;var i=function(t){e.getElementsByTagName("head")[0].appendChild(t)},a=function(t,a,s){var u,c,l,f,d=function(){for(var e=f.passed,t=e.length;t--;)e[t]();f.status=2,f.passed=[],f.failed=[]},m=function(){for(var e=f.failed,t=e.length;t--;)e[t]();f.status=3,f.passed=[],f.failed=[]},p=function(e,t){e()||((new Date).getTime()-l<n?ye.setTimeout(t):m())},g=function(){p(function(){for(var t,n,r=e.styleSheets,o=r.length;o--;)if((n=(t=r[o]).ownerNode?t.ownerNode:t.owningElement)&&n.id===u.id)return d(),!0},g)},h=function(){p(function(){try{var e=c.sheet.cssRules;return d(),!!e}catch(t){}},h)};if(t=Ot._addCacheSuffix(t),o[t]?f=o[t]:(f={passed:[],failed:[]},o[t]=f),a&&f.passed.push(a),s&&f.failed.push(s),1!==f.status)if(2!==f.status)if(3!==f.status){if(f.status=1,(u=e.createElement("link")).rel="stylesheet",u.type="text/css",u.id="u"+r++,u.async=!1,u.defer=!1,l=(new Date).getTime(),"onload"in u&&!((v=navigator.userAgent.match(/WebKit\/(\d*)/))&&parseInt(v[1],10)<536))u.onload=g,u.onerror=m;else{if(navigator.userAgent.indexOf("Firefox")>0)return(c=e.createElement("style")).textContent='@import "'+t+'"',h(),void i(c);g()}var v;i(u),u.href=t}else m();else d()},s=function(e){return Xr.nu(function(t){a(e,y.compose(t,y.constant(eo.value(e))),y.compose(t,y.constant(eo.error(e))))})},u=function(e){return e.fold(y.identity,y.identity)};return{load:a,loadAll:function(e,t,n){Jr(M.map(e,s)).get(function(e){var r=M.partition(e,function(e){return e.isValue()});r.fail.length>0?n(r.fail.map(u)):t(r.pass.map(u))})}}}(e),u.boundEvents=[],u.settings=t=t||{},u.schema=t.schema?t.schema:Fo({}),u.styles=zo({url_converter:t.url_converter,url_converter_scope:t.url_converter_scope},t.schema),u.fixDoc(e),u.events=t.ownEvents?new Te(t.proxy):Te.Event,u.attrHooks=(r=u,a={},s=(o=t).keep_values,i={set:function(e,t,n){o.url_converter&&(t=o.url_converter.call(o.url_converter_scope||r,t,n,e[0])),e.attr("data-mce-"+n,t).attr(n,t)},get:function(e,t){return e.attr("data-mce-"+t)||e.attr(t)}},a={style:{set:function(e,t){null===t||"object"!=typeof t?(s&&e.attr("data-mce-style",t),e.attr("style",t)):e.css(t)},get:function(e){var t=e.attr("data-mce-style")||e.attr("style");return t=r.serializeStyle(r.parseStyle(t),e[0].nodeName)}}},s&&(a.href=a.src=i),a),n=u.schema.getBlockElements(),u.$=Qt.overrideDefaults(function(){return{context:e,element:u.getRoot()}}),u.isBlock=function(e){if(!e)return!1;var t=e.nodeType;return t?!(1!==t||!n[e.nodeName]):!!n[e]}};Xo.prototype={$$:function(e){return"string"==typeof e&&(e=this.get(e)),this.$(e)},root:null,fixDoc:function(e){},clone:function(e,t){var n,r,o=this;return!qo||1!==e.nodeType||t?e.cloneNode(t):(r=o.doc,t?n.firstChild:(n=r.createElement(e.nodeName),Uo(o.getAttribs(e),function(t){o.setAttrib(n,t.nodeName,o.getAttrib(e,t.nodeName))}),n))},getRoot:function(){return this.settings.root_element||this.doc.body},getViewPort:function(e){var t,n;return t=(e=e||this.win).document,n=this.boxModel?t.documentElement:t.body,{x:e.pageXOffset||n.scrollLeft,y:e.pageYOffset||n.scrollTop,w:e.innerWidth||n.clientWidth,h:e.innerHeight||n.clientHeight}},getRect:function(e){var t,n;return e=this.get(e),t=this.getPos(e),n=this.getSize(e),{x:t.x,y:t.y,w:n.w,h:n.h}},getSize:function(e){var t,n;return e=this.get(e),t=this.getStyle(e,"width"),n=this.getStyle(e,"height"),-1===t.indexOf("px")&&(t=0),-1===n.indexOf("px")&&(n=0),{w:parseInt(t,10)||e.offsetWidth||e.clientWidth,h:parseInt(n,10)||e.offsetHeight||e.clientHeight}},getParent:function(e,t,n){return this.getParents(e,t,n,!1)},getParents:function(e,t,n,r){var o,i=this,a=[];for(e=i.get(e),r=r===undefined,n=n||("BODY"!==i.getRoot().nodeName?i.getRoot().parentNode:null),Vo(t,"string")&&(o=t,t="*"===t?function(e){return 1===e.nodeType}:function(e){return i.is(e,o)});e&&e!==n&&e.nodeType&&9!==e.nodeType;){if(!t||t(e)){if(!r)return e;a.push(e)}e=e.parentNode}return r?a:null},get:function(e){var t;return e&&this.doc&&"string"==typeof e&&(t=e,(e=this.doc.getElementById(e))&&e.id!==t)?this.doc.getElementsByName(t)[1]:e},getNext:function(e,t){return this._findSib(e,t,"nextSibling")},getPrev:function(e,t){return this._findSib(e,t,"previousSibling")},select:function(e,t){return lt(e,this.get(t)||this.settings.root_element||this.doc,[])},is:function(e,t){var n;if(!e)return!1;if(e.length===undefined){if("*"===t)return 1===e.nodeType;if(jo.test(t)){for(t=t.toLowerCase().split(/,/),e=e.nodeName.toLowerCase(),n=t.length-1;n>=0;n--)if(t[n]===e)return!0;return!1}}if(e.nodeType&&1!==e.nodeType)return!1;var r=e.nodeType?[e]:e;return lt(t,r[0].ownerDocument||r[0],null,r).length>0},add:function(e,t,n,r,o){var i=this;return this.run(e,function(e){var a;return a=Vo(t,"string")?i.doc.createElement(t):t,i.setAttribs(a,n),r&&(r.nodeType?a.appendChild(r):i.setHTML(a,r)),o?a:e.appendChild(a)})},create:function(e,t,n){return this.add(this.doc.createElement(e),e,t,n,1)},createHTML:function(e,t,n){var r,o="";for(r in o+="<"+e,t)t.hasOwnProperty(r)&&null!==t[r]&&"undefined"!=typeof t[r]&&(o+=" "+r+'="'+this.encode(t[r])+'"');return void 0!==n?o+">"+n+"</"+e+">":o+" />"},createFragment:function(e){var t,n,r,o=this.doc;for(r=o.createElement("div"),t=o.createDocumentFragment(),e&&(r.innerHTML=e);n=r.firstChild;)t.appendChild(n);return t},remove:function(e,t){return e=this.$$(e),t?e.each(function(){for(var e;e=this.firstChild;)3===e.nodeType&&0===e.data.length?this.removeChild(e):this.parentNode.insertBefore(e,this)}).remove():e.remove(),e.length>1?e.toArray():e[0]},setStyle:function(e,t,n){e=this.$$(e).css(t,n),this.settings.update_styles&&Wo(this,e)},getStyle:function(e,t,n){return e=this.$$(e),n?e.css(t):("float"===(t=t.replace(/-(\D)/g,function(e,t){return t.toUpperCase()}))&&(t=me.ie&&me.ie<12?"styleFloat":"cssFloat"),e[0]&&e[0].style?e[0].style[t]:undefined)},setStyles:function(e,t){e=this.$$(e).css(t),this.settings.update_styles&&Wo(this,e)},removeAllAttribs:function(e){return this.run(e,function(e){var t,n=e.attributes;for(t=n.length-1;t>=0;t--)e.removeAttributeNode(n.item(t))})},setAttrib:function(e,t,n){var r,o,i=this.settings;""===n&&(n=null),r=(e=this.$$(e)).attr(t),e.length&&((o=this.attrHooks[t])&&o.set?o.set(e,n,t):e.attr(t,n),r!==n&&i.onSetAttrib&&i.onSetAttrib({attrElm:e,attrName:t,attrValue:n}))},setAttribs:function(e,t){var n=this;n.$$(e).each(function(e,r){Uo(t,function(e,t){n.setAttrib(r,t,e)})})},getAttrib:function(e,t,n){var r,o;return(e=this.$$(e)).length&&(o=(r=this.attrHooks[t])&&r.get?r.get(e,t):e.attr(t)),void 0===o&&(o=n||""),o},getPos:function(e,t){return qr(this.doc.body,this.get(e),t)},parseStyle:function(e){return this.styles.parse(e)},serializeStyle:function(e,t){return this.styles.serialize(e,t)},addStyle:function(e){var t,n,r=this.doc;if(this!==Xo.DOM&&r===document){var o=Xo.DOM.addedStyles;if((o=o||[])[e])return;o[e]=!0,Xo.DOM.addedStyles=o}(n=r.getElementById("mceDefaultStyles"))||((n=r.createElement("style")).id="mceDefaultStyles",n.type="text/css",(t=r.getElementsByTagName("head")[0]).firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n)),n.styleSheet?n.styleSheet.cssText+=e:n.appendChild(r.createTextNode(e))},loadCSS:function(e){var t,n=this,r=n.doc;n===Xo.DOM||r!==document?(e||(e=""),t=r.getElementsByTagName("head")[0],Uo(e.split(","),function(e){var o;e=Ot._addCacheSuffix(e),n.files[e]||(n.files[e]=!0,o=n.create("link",{rel:"stylesheet",href:e}),qo&&r.documentMode&&r.recalc&&(o.onload=function(){r.recalc&&r.recalc(),o.onload=null}),t.appendChild(o))})):Xo.DOM.loadCSS(e)},addClass:function(e,t){this.$$(e).addClass(t)},removeClass:function(e,t){this.toggleClass(e,t,!1)},hasClass:function(e,t){return this.$$(e).hasClass(t)},toggleClass:function(e,t,n){this.$$(e).toggleClass(t,n).each(function(){""===this.className&&Qt(this).attr("class",null)})},show:function(e){this.$$(e).show()},hide:function(e){this.$$(e).hide()},isHidden:function(e){return"none"===this.$$(e).css("display")},uniqueId:function(e){return(e||"mce_")+this.counter++},setHTML:function(e,t){e=this.$$(e),qo?e.each(function(e,n){if(!1!==n.canHaveHTML){for(;n.firstChild;)n.removeChild(n.firstChild);try{n.innerHTML="<br>"+t,n.removeChild(n.firstChild)}catch(r){Qt("<div></div>").html("<br>"+t).contents().slice(1).appendTo(n)}return t}}):e.html(t)},getOuterHTML:function(e){return 1===(e=this.get(e)).nodeType&&"outerHTML"in e?e.outerHTML:Qt("<div></div>").append(Qt(e).clone()).html()},setOuterHTML:function(e,t){var n=this;n.$$(e).each(function(){try{if("outerHTML"in this)return void(this.outerHTML=t)}catch(e){}n.remove(Qt(this).html(t),!0)})},decode:Ao.decode,encode:Ao.encodeAllRaw,insertAfter:function(e,t){return t=this.get(t),this.run(e,function(e){var n,r;return n=t.parentNode,(r=t.nextSibling)?n.insertBefore(e,r):n.appendChild(e),e})},replace:function(e,t,n){return this.run(t,function(t){return Vo(t,"array")&&(e=e.cloneNode(!0)),n&&Uo(Ho(t.childNodes),function(t){e.appendChild(t)}),t.parentNode.replaceChild(e,t)})},rename:function(e,t){var n,r=this;return e.nodeName!==t.toUpperCase()&&(n=r.create(t),Uo(r.getAttribs(e),function(t){r.setAttrib(n,t.nodeName,r.getAttrib(e,t.nodeName))}),r.replace(n,e,1)),n||e},findCommonAncestor:function(e,t){for(var n,r=e;r;){for(n=t;n&&r!==n;)n=n.parentNode;if(r===n)break;r=r.parentNode}return!r&&e.ownerDocument?e.ownerDocument.documentElement:r},toHex:function(e){return this.styles.toHex(Ot.trim(e))},run:function(e,t,n){var r,o=this;return"string"==typeof e&&(e=o.get(e)),!!e&&(n=n||this,e.nodeType||!e.length&&0!==e.length?t.call(n,e):(r=[],Uo(e,function(e,i){e&&("string"==typeof e&&(e=o.get(e)),r.push(t.call(n,e,i)))}),r))},getAttribs:function(e){var t;return(e=this.get(e))?qo?(t=[],"OBJECT"===e.nodeName?e.attributes:("OPTION"===e.nodeName&&this.getAttrib(e,"selected")&&t.push({specified:1,nodeName:"selected"}),e.cloneNode(!1).outerHTML.replace(/<\/?[\w:\-]+ ?|=[\"][^\"]+\"|=\'[^\']+\'|=[\w\-]+|>/gi,"").replace(/[\w:\-]+/gi,function(e){t.push({specified:1,nodeName:e})}),t)):e.attributes:[]},isEmpty:function(e,t){var n,r,o,i,a,s,u=0;if(e=e.firstChild){a=new to(e,e.parentNode),t=t||(this.schema?this.schema.getNonEmptyElements():null),i=this.schema?this.schema.getWhiteSpaceElements():{};do{if(1===(o=e.nodeType)){var c=e.getAttribute("data-mce-bogus");if(c){e=a.next("all"===c);continue}if(s=e.nodeName.toLowerCase(),t&&t[s]){if("br"===s){u++,e=a.next();continue}return!1}for(n=(r=this.getAttribs(e)).length;n--;)if("name"===(s=r[n].nodeName)||"data-mce-bookmark"===s)return!1}if(8===o)return!1;if(3===o&&!$o.test(e.nodeValue))return!1;if(3===o&&e.parentNode&&i[e.parentNode.nodeName]&&$o.test(e.nodeValue))return!1;e=a.next()}while(e)}return u<=1},createRng:function(){return this.doc.createRange()},nodeIndex:Ko,split:function(e,t,n){var r,o,i,a=this.createRng();if(e&&t)return a.setStart(e.parentNode,this.nodeIndex(e)),a.setEnd(t.parentNode,this.nodeIndex(t)),r=a.extractContents(),(a=this.createRng()).setStart(t.parentNode,this.nodeIndex(t)+1),a.setEnd(e.parentNode,this.nodeIndex(e)+1),o=a.extractContents(),(i=e.parentNode).insertBefore(Co.trimNode(this,r),e),n?i.insertBefore(n,e):i.insertBefore(t,e),i.insertBefore(Co.trimNode(this,o),e),this.remove(e),n||t},bind:function(e,t,n,r){if(Ot.isArray(e)){for(var o=e.length;o--;)e[o]=this.bind(e[o],t,n,r);return e}return!this.settings.collect||e!==this.doc&&e!==this.win||this.boundEvents.push([e,t,n,r]),this.events.bind(e,t,n,r||this)},unbind:function(e,t,n){var r;if(Ot.isArray(e)){for(r=e.length;r--;)e[r]=this.unbind(e[r],t,n);return e}if(this.boundEvents&&(e===this.doc||e===this.win))for(r=this.boundEvents.length;r--;){var o=this.boundEvents[r];e!==o[0]||t&&t!==o[1]||n&&n!==o[2]||this.events.unbind(o[0],o[1],o[2])}return this.events.unbind(e,t,n)},fire:function(e,t,n){return this.events.fire(e,t,n)},getContentEditable:function(e){var t;return e&&1===e.nodeType?(t=e.getAttribute("data-mce-contenteditable"))&&"inherit"!==t?t:"inherit"!==e.contentEditable?e.contentEditable:null:null},getContentEditableParent:function(e){for(var t=this.getRoot(),n=null;e&&e!==t&&null===(n=this.getContentEditable(e));e=e.parentNode);return n},destroy:function(){if(this.boundEvents){for(var e=this.boundEvents.length;e--;){var t=this.boundEvents[e];this.events.unbind(t[0],t[1],t[2])}this.boundEvents=null}lt.setDocument&&lt.setDocument(),this.win=this.doc=this.root=this.events=this.frag=null},isChildOf:function(e,t){for(;e;){if(t===e)return!0;e=e.parentNode}return!1},dumpRng:function(e){return"startContainer: "+e.startContainer.nodeName+", startOffset: "+e.startOffset+", endContainer: "+e.endContainer.nodeName+", endOffset: "+e.endOffset},_findSib:function(e,t,n){var r=this,o=t;if(e)for("string"==typeof o&&(o=function(e){return r.is(e,t)}),e=e[n];e;e=e[n])if(o(e))return e;return null}},Xo.DOM=new Xo(document),Xo.nodeIndex=Ko;var Yo=Xo.DOM,Go=Ot.each,Jo=Ot.grep,Qo=function(e){return"function"==typeof e},Zo=function(){var e={},t=[],n={},r=[],o=0;this.isDone=function(t){return 2===e[t]},this.markDone=function(t){e[t]=2},this.add=this.load=function(r,o,i,a){e[r]===undefined&&(t.push(r),e[r]=0),o&&(n[r]||(n[r]=[]),n[r].push({success:o,failure:a,scope:i||this}))},this.remove=function(t){delete e[t],delete n[t]},this.loadQueue=function(e,n,r){this.loadScripts(t,e,n,r)},this.loadScripts=function(t,i,a,s){var u,c=[],l=function(e,t){Go(n[t],function(t){Qo(t[e])&&t[e].call(t.scope)}),n[t]=undefined};r.push({success:i,failure:s,scope:a||this}),(u=function(){var n=Jo(t);if(t.length=0,Go(n,function(t){var n,r,i,a,s,f,d;2!==e[t]?3!==e[t]?1!==e[t]&&(e[t]=1,o++,n=t,r=function(){e[t]=2,o--,l("success",t),u()},i=function(){e[t]=3,o--,c.push(t),l("failure",t),u()},d=function(){f.remove(s),a&&(a.onreadystatechange=a.onload=a=null),r()},s=(f=Yo).uniqueId(),(a=document.createElement("script")).id=s,a.type="text/javascript",a.src=Ot._addCacheSuffix(n),"onreadystatechange"in a?a.onreadystatechange=function(){/loaded|complete/.test(a.readyState)&&d()}:a.onload=d,a.onerror=function(){Qo(i)?i():"undefined"!=typeof console&&console.log&&console.log("Failed to load script: "+n)},(document.getElementsByTagName("head")[0]||document.body).appendChild(a)):l("failure",t):l("success",t)}),!o){var i=r.slice(0);r.length=0,Go(i,function(e){0===c.length?Qo(e.success)&&e.success.call(e.scope):Qo(e.failure)&&e.failure.call(e.scope,c)})}})()}};Zo.ScriptLoader=new Zo;var ei=Ot.each,ti=function(){this.items=[],this.urls={},this.lookup={},this._listeners=[]};ti.prototype={get:function(e){return this.lookup[e]?this.lookup[e].instance:undefined},dependencies:function(e){var t;return this.lookup[e]&&(t=this.lookup[e].dependencies),t||[]},requireLangPack:function(e,t){var n=ti.language;if(n&&!1!==ti.languageLoad){if(t)if(-1!==(t=","+t+",").indexOf(","+n.substr(0,2)+","))n=n.substr(0,2);else if(-1===t.indexOf(","+n+","))return;Zo.ScriptLoader.add(this.urls[e]+"/langs/"+n+".js")}},add:function(e,t,n){this.items.push(t),this.lookup[e]={instance:t,dependencies:n};var r=M.partition(this._listeners,function(t){return t.name===e});return this._listeners=r.fail,ei(r.pass,function(e){e.callback()}),t},remove:function(e){delete this.urls[e],delete this.lookup[e]},createUrl:function(e,t){return"object"==typeof t?t:{prefix:e.prefix,resource:t,suffix:e.suffix}},addComponents:function(e,t){var n=this.urls[e];ei(t,function(e){Zo.ScriptLoader.add(n+"/"+e)})},load:function(e,t,n,r,o){var i=this,a=t,s=function(){var o=i.dependencies(e);ei(o,function(e){var n=i.createUrl(t,e);i.load(n.resource,n,undefined,undefined)}),n&&(r?n.call(r):n.call(Zo))};i.urls[e]||("object"==typeof t&&(a=t.prefix+t.resource+t.suffix),0!==a.indexOf("/")&&-1===a.indexOf("://")&&(a=ti.baseURL+"/"+a),i.urls[e]=a.substring(0,a.lastIndexOf("/")),i.lookup[e]?s():Zo.ScriptLoader.add(a,s,r,o))},waitFor:function(e,t){this.lookup.hasOwnProperty(e)?t():this._listeners.push({name:e,callback:t})}},ti.PluginManager=new ti,ti.ThemeManager=new ti;var ni="\ufeff",ri=function(e){return e===ni},oi=ni,ii=function(e){return e.replace(new RegExp(ni,"g"),"")},ai=vo.isElement,si=vo.isText,ui=function(e){return si(e)&&(e=e.parentNode),ai(e)&&e.hasAttribute("data-mce-caret")},ci=function(e){return si(e)&&ri(e.data)},li=function(e){return ui(e)||ci(e)},fi=function(e){return si(e)&&e.data[0]===oi},di=function(e){return si(e)&&e.data[e.data.length-1]===oi},mi={isCaretContainer:li,isCaretContainerBlock:ui,isCaretContainerInline:ci,showCaretContainerBlock:function(e){return e&&e.hasAttribute("data-mce-caret")?(t=e.getElementsByTagName("br"),n=t[t.length-1],vo.isBogus(n)&&n.parentNode.removeChild(n),e.removeAttribute("data-mce-caret"),e.removeAttribute("data-mce-bogus"),e.removeAttribute("style"),e.removeAttribute("_moz_abspos"),e):null;var t,n},insertInline:function(e,t){var n,r,o;if(r=e.ownerDocument.createTextNode(oi),o=e.parentNode,t){if(n=e.previousSibling,si(n)){if(li(n))return n;if(di(n))return n.splitText(n.data.length-1)}o.insertBefore(r,e)}else{if(n=e.nextSibling,si(n)){if(li(n))return n;if(fi(n))return n.splitText(1),n}e.nextSibling?o.insertBefore(r,e.nextSibling):o.appendChild(r)}return r},prependInline:function(e){if(vo.isText(e)){var t=e.data;return t.length>0&&t.charAt(0)!==oi&&e.insertData(0,oi),e}return null},appendInline:function(e){if(vo.isText(e)){var t=e.data;return t.length>0&&t.charAt(t.length-1)!==oi&&e.insertData(t.length,oi),e}return null},isBeforeInline:function(e){return e&&vo.isText(e.container())&&e.container().data.charAt(e.offset())===oi},isAfterInline:function(e){return e&&vo.isText(e.container())&&e.container().data.charAt(e.offset()-1)===oi},insertBlock:function(e,t,n){var r,o,i;return(r=t.ownerDocument.createElement(e)).setAttribute("data-mce-caret",n?"before":"after"),r.setAttribute("data-mce-bogus","all"),r.appendChild(((i=document.createElement("br")).setAttribute("data-mce-bogus","1"),i)),o=t.parentNode,n?o.insertBefore(r,t):t.nextSibling?o.insertBefore(r,t.nextSibling):o.appendChild(r),r},hasContent:function(e){return e.firstChild!==e.lastChild||!vo.isBr(e.firstChild)},startsWithCaretContainer:fi,endsWithCaretContainer:di},pi=vo.isContentEditableTrue,gi=vo.isContentEditableFalse,hi=vo.isBr,vi=vo.isText,yi=vo.matchNodeNames("script style textarea"),bi=vo.matchNodeNames("img input textarea hr iframe video audio object"),Ci=vo.matchNodeNames("table"),xi=mi.isCaretContainer,wi=function(e){return!xi(e)&&(vi(e)?!yi(e.parentNode):bi(e)||hi(e)||Ci(e)||gi(e))},Ni=function(e,t){for(e=e.parentNode;e&&e!==t;e=e.parentNode){if(gi(e))return!1;if(pi(e))return!0}return!0},Ei=wi,Si=function(e){return bi(e)||!!gi(t=e)&&!0!==At.reduce(t.getElementsByTagName("*"),function(e,t){return e||pi(t)},!1);var t},ki=function(e,t){return wi(e)&&Ni(e,t)},Ti=Math.round,Ai=function(e){return e?{left:Ti(e.left),top:Ti(e.top),bottom:Ti(e.bottom),right:Ti(e.right),width:Ti(e.width),height:Ti(e.height)}:{left:0,top:0,bottom:0,right:0,width:0,height:0}},_i=function(e,t,n){return e>=0&&e<=Math.min(t.height,n.height)/2},Bi=function(e,t){return e.bottom-e.height/2<t.top||!(e.top>t.bottom)&&_i(t.top-e.bottom,e,t)},Ri=function(e,t){return e.top>t.bottom||!(e.bottom<t.top)&&_i(t.bottom-e.top,e,t)},Di=Ai,Oi=function(e,t){return e=Ai(e),t?e.right=e.left:(e.left=e.left+e.width,e.right=e.left),e.width=0,e},Pi=function(e,t){return e.left===t.left&&e.top===t.top&&e.bottom===t.bottom&&e.right===t.right},Ii=Bi,Li=Ri,Mi=function(e,t,n){return t>=e.left&&t<=e.right&&n>=e.top&&n<=e.bottom},Fi=function(e){var t=e.startContainer,n=e.startOffset;return t.hasChildNodes()&&e.endOffset===n+1?t.childNodes[n]:null},zi=function(e,t){return 1===e.nodeType&&e.hasChildNodes()&&(t>=e.childNodes.length&&(t=e.childNodes.length-1),e=e.childNodes[t]),e},Ui=new RegExp("[\u0300-\u036f\u0483-\u0487\u0488-\u0489\u0591-\u05bd\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e3-\u0902\u093a\u093c\u0941-\u0948\u094d\u0951-\u0957\u0962-\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2-\u09e3\u0a01-\u0a02\u0a3c\u0a41-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a51\u0a70-\u0a71\u0a75\u0a81-\u0a82\u0abc\u0ac1-\u0ac5\u0ac7-\u0ac8\u0acd\u0ae2-\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62-\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c00\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c62-\u0c63\u0c81\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc-\u0ccd\u0cd5-\u0cd6\u0ce2-\u0ce3\u0d01\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62-\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039-\u103a\u103d-\u103e\u1058-\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085-\u1086\u108d\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17b4-\u17b5\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193b\u1a17-\u1a18\u1a1b\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1ab0-\u1abd\u1abe\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80-\u1b81\u1ba2-\u1ba5\u1ba8-\u1ba9\u1bab-\u1bad\u1be6\u1be8-\u1be9\u1bed\u1bef-\u1bf1\u1c2c-\u1c33\u1c36-\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1cf4\u1cf8-\u1cf9\u1dc0-\u1df5\u1dfc-\u1dff\u200c-\u200d\u20d0-\u20dc\u20dd-\u20e0\u20e1\u20e2-\u20e4\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302d\u302e-\u302f\u3099-\u309a\ua66f\ua670-\ua672\ua674-\ua67d\ua69e-\ua69f\ua6f0-\ua6f1\ua802\ua806\ua80b\ua825-\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\ua9e5\uaa29-\uaa2e\uaa31-\uaa32\uaa35-\uaa36\uaa43\uaa4c\uaa7c\uaab0\uaab2-\uaab4\uaab7-\uaab8\uaabe-\uaabf\uaac1\uaaec-\uaaed\uaaf6\uabe5\uabe8\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\uff9e-\uff9f]"),Vi=function(e){return"string"==typeof e&&e.charCodeAt(0)>=768&&Ui.test(e)},Hi=[].slice,qi=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=Hi.call(arguments);return r.length-1>=e.length?e.apply(this,r.slice(1)):function(){var e=r.concat([].slice.call(arguments));return qi.apply(this,e)}},ji={constant:function(e){return function(){return e}},negate:function(e){return function(t){return!e(t)}},and:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=Hi.call(arguments);return function(e){for(var t=0;t<n.length;t++)if(!n[t](e))return!1;return!0}},or:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=Hi.call(arguments);return function(e){for(var t=0;t<n.length;t++)if(n[t](e))return!0;return!1}},curry:qi,compose:function(e,t){return function(n){return e(t(n))}},noop:function(){}},$i=vo.isElement,Wi=Ei,Ki=vo.matchStyleValues("display","block table"),Xi=vo.matchStyleValues("float","left right"),Yi=ji.and($i,Wi,ji.negate(Xi)),Gi=ji.negate(vo.matchStyleValues("white-space","pre pre-line pre-wrap")),Ji=vo.isText,Qi=vo.isBr,Zi=Xo.nodeIndex,ea=zi,ta=function(e){return"createRange"in e?e.createRange():Xo.DOM.createRng()},na=function(e){return e&&/[\r\n\t ]/.test(e)},ra=function(e){var t,n=e.startContainer,r=e.startOffset;return!!(na(e.toString())&&Gi(n.parentNode)&&(t=n.data,na(t[r-1])||na(t[r+1])))},oa=function(e){var t,n,r=[],o=function(e){var t,n,r,o,i,a,s,u;return t=(n=e.getClientRects()).length>0?Di(n[0]):Di(e.getBoundingClientRect()),Qi(e)&&0===t.left?(i=(r=e).ownerDocument,a=ta(i),s=i.createTextNode("\xa0"),(u=r.parentNode).insertBefore(s,r),a.setStart(s,0),a.setEnd(s,1),o=Di(a.getBoundingClientRect()),u.removeChild(s),o):t},i=function(e,t){return(e=Oi(e,t)).width=1,e.right=e.left+1,e},a=function(e){0!==e.height&&(r.length>0&&Pi(e,r[r.length-1])||r.push(e))},s=function(e,t){var n=ta(e.ownerDocument);if(t<e.data.length){if(Vi(e.data[t]))return r;if(Vi(e.data[t-1])&&(n.setStart(e,t),n.setEnd(e,t+1),!ra(n)))return a(i(o(n),!1)),r}t>0&&(n.setStart(e,t-1),n.setEnd(e,t),ra(n)||a(i(o(n),!1))),t<e.data.length&&(n.setStart(e,t),n.setEnd(e,t+1),ra(n)||a(i(o(n),!0)))};if(Ji(e.container()))return s(e.container(),e.offset()),r;if($i(e.container()))if(e.isAtEnd())n=ea(e.container(),e.offset()),Ji(n)&&s(n,n.data.length),Yi(n)&&!Qi(n)&&a(i(o(n),!1));else{if(n=ea(e.container(),e.offset()),Ji(n)&&s(n,0),Yi(n)&&e.isAtEnd())return a(i(o(n),!1)),r;t=ea(e.container(),e.offset()-1),Yi(t)&&!Qi(t)&&(Ki(t)||Ki(n)||!Yi(n))&&a(i(o(t),!1)),Yi(n)&&a(i(o(n),!0))}return r},ia=function(e,t,n){var r=function(){return n||(n=oa(new ia(e,t))),n};return{container:ji.constant(e),offset:ji.constant(t),toRange:function(){var n;return(n=ta(e.ownerDocument)).setStart(e,t),n.setEnd(e,t),n},getClientRects:r,isVisible:function(){return r().length>0},isAtStart:function(){return Ji(e),0===t},isAtEnd:function(){return Ji(e)?t>=e.data.length:t>=e.childNodes.length},isEqual:function(n){return n&&e===n.container()&&t===n.offset()},getNode:function(n){return ea(e,n?t-1:t)}}};ia.fromRangeStart=function(e){return new ia(e.startContainer,e.startOffset)},ia.fromRangeEnd=function(e){return new ia(e.endContainer,e.endOffset)},ia.after=function(e){return new ia(e.parentNode,Zi(e)+1)},ia.before=function(e){return new ia(e.parentNode,Zi(e))},ia.isAtStart=function(e){return!!e&&e.isAtStart()},ia.isAtEnd=function(e){return!!e&&e.isAtEnd()},ia.isTextPosition=function(e){return!!e&&vo.isText(e.container())};var aa,sa,ua,ca,la,fa=vo.isContentEditableTrue,da=vo.isContentEditableFalse,ma=vo.matchStyleValues("display","block table table-cell table-caption list-item"),pa=mi.isCaretContainer,ga=mi.isCaretContainerBlock,ha=ji.curry,va=vo.isElement,ya=Ei,ba=function(e){return e>0},Ca=function(e){return e<0},xa=function(e,t){for(var n;n=e(t);)if(!ga(n))return n;return null},wa=function(e,t){for(e=e.parentNode;e&&e!==t;e=e.parentNode)if(fa(e))return e;return t},Na=function(e,t){for(;e&&e!==t;){if(ma(e))return e;e=e.parentNode}return null},Ea=function(e,t){var n=t.ownerDocument.createRange();return e?(n.setStartBefore(t),n.setEndBefore(t)):(n.setStartAfter(t),n.setEndAfter(t)),n},Sa=function(e,t,n){var r,o,i,a;for(o=e?"previousSibling":"nextSibling";n&&n!==t;){if(r=n[o],pa(r)&&(r=r[o]),da(r)){if(a=n,Na(r,i=t)===Na(a,i))return r;break}if(ya(r))break;n=n.parentNode}return null},ka=ha(Ea,!0),Ta=ha(Ea,!1),Aa=function(e,t){return da((n=e,(r=t)?(o=r.container(),i=r.offset(),va(o)?o.childNodes[i+n]:null):null));var n,r,o,i},_a={isForwards:ba,isBackwards:Ca,findNode:function(e,t,n,r,o){var i=new to(e,r);if(Ca(t)){if((da(e)||ga(e))&&n(e=xa(i.prev,!0)))return e;for(;e=xa(i.prev,o);)if(n(e))return e}if(ba(t)){if((da(e)||ga(e))&&n(e=xa(i.next,!0)))return e;for(;e=xa(i.next,o);)if(n(e))return e}return null},getEditingHost:wa,getParentBlock:Na,isInSameBlock:function(e,t,n){return Na(e.container(),n)===Na(t.container(),n)},isInSameEditingHost:function(e,t,n){return wa(e.container(),n)===wa(t.container(),n)},isBeforeContentEditableFalse:ha(Aa,0),isAfterContentEditableFalse:ha(Aa,-1),normalizeRange:function(e,t,n){var r,o,i,a,s=ha(Sa,!0,t),u=ha(Sa,!1,t);if(o=n.startContainer,i=n.startOffset,mi.isCaretContainerBlock(o)){if(va(o)||(o=o.parentNode),"before"===(a=o.getAttribute("data-mce-caret"))&&(r=o.nextSibling,da(r)))return ka(r);if("after"===a&&(r=o.previousSibling,da(r)))return Ta(r)}if(!n.collapsed)return n;if(vo.isText(o)){if(pa(o)){if(1===e){if(r=u(o))return ka(r);if(r=s(o))return Ta(r)}if(-1===e){if(r=s(o))return Ta(r);if(r=u(o))return ka(r)}return n}if(mi.endsWithCaretContainer(o)&&i>=o.data.length-1)return 1===e&&(r=u(o))?ka(r):n;if(mi.startsWithCaretContainer(o)&&i<=1)return-1===e&&(r=s(o))?Ta(r):n;if(i===o.data.length)return(r=u(o))?ka(r):n;if(0===i)return(r=s(o))?Ta(r):n}return n}},Ba=vo.isContentEditableFalse,Ra=vo.isText,Da=vo.isElement,Oa=vo.isBr,Pa=_a.isForwards,Ia=_a.isBackwards,La=Ei,Ma=Si,Fa=ki,za=function(e,t){return e.hasChildNodes()&&t<e.childNodes.length?e.childNodes[t]:null},Ua=function(e,t){if(Pa(e)){if(La(t.previousSibling)&&!Ra(t.previousSibling))return ia.before(t);if(Ra(t))return ia(t,0)}if(Ia(e)){if(La(t.nextSibling)&&!Ra(t.nextSibling))return ia.after(t);if(Ra(t))return ia(t,t.data.length)}return Ia(e)?Oa(t)?ia.before(t):ia.after(t):ia.before(t)},Va=function(e,t,n){var r,o,i,a,s,u,c,l,f,d;if(!Da(n)||!t)return null;if(t.isEqual(ia.after(n))&&n.lastChild){if(c=ia.after(n.lastChild),Ia(e)&&La(n.lastChild)&&Da(n.lastChild))return Oa(n.lastChild)?ia.before(n.lastChild):c}else c=t;if(r=c.container(),o=c.offset(),Ra(r)){if(Ia(e)&&o>0)return ia(r,--o);if(Pa(e)&&o<r.length)return ia(r,++o);i=r}else{if(Ia(e)&&o>0&&(a=za(r,o-1),La(a)))return!Ma(a)&&(s=_a.findNode(a,e,Fa,a))?Ra(s)?ia(s,s.data.length):ia.after(s):Ra(a)?ia(a,a.data.length):ia.before(a);if(Pa(e)&&o<r.childNodes.length&&(a=za(r,o),La(a)))return l=a,f=n,vo.isBr(l)&&(d=Va(1,ia.after(l),f))&&!_a.isInSameBlock(ia.before(l),ia.before(d),f)?Va(e,ia.after(a),n):!Ma(a)&&(s=_a.findNode(a,e,Fa,a))?Ra(s)?ia(s,0):ia.before(s):Ra(a)?ia(a,0):ia.after(a);i=c.getNode()}return(Pa(e)&&c.isAtEnd()||Ia(e)&&c.isAtStart())&&(i=_a.findNode(i,e,ji.constant(!0),n,!0),Fa(i,n))?Ua(e,i):(a=_a.findNode(i,e,Fa,n),!(u=At.last(At.filter(function(e,t){for(var n=[];e&&e!==t;)n.push(e),e=e.parentNode;return n}(r,n),Ba)))||a&&u.contains(a)?a?Ua(e,a):null:c=Pa(e)?ia.after(u):ia.before(u))},Ha=function(e){return{next:function(t){return Va(1,t,e)},prev:function(t){return Va(-1,t,e)}}},qa=function(e){return Ot.grep(e.childNodes,function(e){return"LI"===e.nodeName})},ja=function(e){return e&&e.firstChild&&e.firstChild===e.lastChild&&("\xa0"===(t=e.firstChild).data||vo.isBr(t));var t},$a=function(e){return e.length>0&&(!(t=e[e.length-1]).firstChild||ja(t))?e.slice(0,-1):e;var t},Wa=function(e,t){var n=e.getParent(t,e.isBlock);return n&&"LI"===n.nodeName?n:null},Ka=function(e,t){var n=ia.after(e),r=Ha(t).prev(n);return r?r.toRange():null},Xa=function(e,t,n){var r,o,i,a,s=e.parentNode;return Ot.each(t,function(t){s.insertBefore(t,e)}),r=e,o=n,i=ia.before(r),(a=Ha(o).next(i))?a.toRange():null},Ya=function(e,t){var n,r,o,i,a,s,u=t.firstChild,c=t.lastChild;return u&&"meta"===u.name&&(u=u.next),c&&"mce_marker"===c.attr("id")&&(c=c.prev),r=c,s=(n=e).getNonEmptyElements(),r&&(r.isEmpty(s)||(o=r,n.getBlockElements()[o.name]&&(a=o).firstChild&&a.firstChild===a.lastChild&&("br"===(i=o.firstChild).name||"\xa0"===i.value)))&&(c=c.prev),!(!u||u!==c||"ul"!==u.name&&"ol"!==u.name)},Ga=function(e,t,n,r){var o,i,a,s,u,c,l,f,d,m,p,g,h,v,y,b,C,x,w,N=(o=t,i=r,c=e.serialize(i),l=o.createFragment(c),s=(a=l).firstChild,u=a.lastChild,s&&"META"===s.nodeName&&s.parentNode.removeChild(s),u&&"mce_marker"===u.id&&u.parentNode.removeChild(u),a),E=Wa(t,n.startContainer),S=$a(qa(N.firstChild)),k=t.getRoot(),T=function(e){var r=ia.fromRangeStart(n),o=Ha(t.getRoot()),i=1===e?o.prev(r):o.next(r);return!i||Wa(t,i.getNode())!==E};return T(1)?Xa(E,S,k):T(2)?(f=E,d=S,m=k,t.insertAfter(d.reverse(),f),Ka(d[0],m)):(g=S,h=k,v=p=E,b=(y=n).cloneRange(),C=y.cloneRange(),b.setStartBefore(v),C.setEndAfter(v),x=[b.cloneContents(),C.cloneContents()],(w=p.parentNode).insertBefore(x[0],p),Ot.each(g,function(e){w.insertBefore(e,p)}),w.insertBefore(x[1],p),w.removeChild(p),Ka(g[g.length-1],h))},Ja=function(e,t){return!!Wa(e,t)},Qa=vo.isText,Za=vo.isBogus,es=Xo.nodeIndex,ts=function(e){var t=e.parentNode;return Za(t)?ts(t):t},ns=function(e){return e?At.reduce(e.childNodes,function(e,t){return Za(t)&&"BR"!==t.nodeName?e=e.concat(ns(t)):e.push(t),e},[]):[]},rs=function(e){return function(t){return e===t}},os=function(e){var t,n,r,o;return(Qa(e)?"text()":e.nodeName.toLowerCase())+"["+(n=ns(ts(t=e)),r=At.findIndex(n,rs(t),t),n=n.slice(0,r+1),o=At.reduce(n,function(e,t,r){return Qa(t)&&Qa(n[r-1])&&e++,e},0),n=At.filter(n,vo.matchNodeNames(t.nodeName)),(r=At.findIndex(n,rs(t),t))-o)+"]"},is=function(e,t){var n,r,o,i,a,s=[];return n=t.container(),r=t.offset(),Qa(n)?o=function(e,t){for(;(e=e.previousSibling)&&Qa(e);)t+=e.data.length;return t}(n,r):(r>=(i=n.childNodes).length?(o="after",r=i.length-1):o="before",n=i[r]),s.push(os(n)),a=function(e,t,n){var r=[];for(t=t.parentNode;!(t===e||n&&n(t));t=t.parentNode)r.push(t);return r}(e,n),a=At.filter(a,ji.negate(vo.isBogus)),(s=s.concat(At.map(a,function(e){return os(e)}))).reverse().join("/")+","+o},as=function(e,t){var n,r,o;return t?(t=(n=t.split(","))[0].split("/"),o=n.length>1?n[1]:"before",(r=At.reduce(t,function(e,t){return(t=/([\w\-\(\)]+)\[([0-9]+)\]/.exec(t))?("text()"===t[1]&&(t[1]="#text"),n=e,r=t[1],o=parseInt(t[2],10),i=ns(n),i=At.filter(i,function(e,t){return!Qa(e)||!Qa(i[t-1])}),(i=At.filter(i,vo.matchNodeNames(r)))[o]):null;var n,r,o,i},e))?Qa(r)?function(e,t){for(var n,r=e,o=0;Qa(r);){if(n=r.data.length,t>=o&&t<=o+n){e=r,t-=o;break}if(!Qa(r.nextSibling)){e=r,t=n;break}o+=n,r=r.nextSibling}return t>e.data.length&&(t=e.data.length),new ia(e,t)}(r,parseInt(o,10)):(o="after"===o?es(r)+1:es(r),new ia(r.parentNode,o)):null):null},ss=vo.isContentEditableFalse,us=function(e,t,n,r,o){var i,a=r[o?"startContainer":"endContainer"],s=r[o?"startOffset":"endOffset"],u=[],c=0,l=e.getRoot();for(vo.isText(a)?u.push(n?function(e,t,n){var r,o;for(o=e(t.data.slice(0,n)).length,r=t.previousSibling;r&&vo.isText(r);r=r.previousSibling)o+=e(r.data).length;return o}(t,a,s):s):(s>=(i=a.childNodes).length&&i.length&&(c=1,s=Math.max(0,i.length-1)),u.push(e.nodeIndex(i[s],n)+c));a&&a!==l;a=a.parentNode)u.push(e.nodeIndex(a,n));return u},cs=function(e){vo.isText(e)&&0===e.data.length&&e.parentNode.removeChild(e)},ls=function(e,t,n){var r=0;return Ot.each(e.select(t),function(e){if("all"!==e.getAttribute("data-mce-bogus"))return e!==n&&void r++}),r},fs=function(e,t){var n,r,o,i=t?"start":"end";n=e[i+"Container"],r=e[i+"Offset"],vo.isElement(n)&&"TR"===n.nodeName&&(n=(o=n.childNodes)[Math.min(t?r:r-1,o.length-1)])&&(r=t?0:n.childNodes.length,e["set"+(t?"Start":"End")](n,r))},ds=function(e){return fs(e,!0),fs(e,!1),e},ms=function(e,t){var n;if(vo.isElement(e)&&(e=zi(e,t),ss(e)))return e;if(mi.isCaretContainer(e)){if(vo.isText(e)&&mi.isCaretContainerBlock(e)&&(e=e.parentNode),n=e.previousSibling,ss(n))return n;if(n=e.nextSibling,ss(n))return n}},ps=function(e,t,n){var r,o,i,a,s,u,c,l=n.getNode(),f=l?l.nodeName:null,d=n.getRng();return ss(l)||"IMG"===f?{name:f,index:ls(n.dom,f,l)}:(l=ms((r=d).startContainer,r.startOffset)||ms(r.endContainer,r.endOffset))?{name:f=l.tagName,index:ls(n.dom,f,l)}:(o=e,a=t,s=d,u=(i=n).dom,(c={}).start=us(u,o,a,s,!0),i.isCollapsed()||(c.end=us(u,o,a,s,!1)),c)},gs={getBookmark:function(e,t,n){return 2===t?ps(ii,n,e):3===t?(o=(r=e).getRng(),{start:is(r.dom.getRoot(),ia.fromRangeStart(o)),end:is(r.dom.getRoot(),ia.fromRangeEnd(o))}):t?{rng:e.getRng()}:function(e){var t=e.dom,n=e.getRng(),r=t.uniqueId(),o=e.isCollapsed(),i="overflow:hidden;line-height:0px",a=e.getNode(),s=a.nodeName;if("IMG"===s)return{name:s,index:ls(t,s,a)};var u=ds(n.cloneRange());if(!o){u.collapse(!1);var c=t.create("span",{"data-mce-type":"bookmark",id:r+"_end",style:i},"&#xFEFF;");u.insertNode(c),cs(c.nextSibling)}(n=ds(n)).collapse(!0);var l=t.create("span",{"data-mce-type":"bookmark",id:r+"_start",style:i},"&#xFEFF;");return n.insertNode(l),cs(l.previousSibling),e.moveToBookmark({id:r,keep:1}),{id:r}}(e);var r,o},getUndoBookmark:y.curry(ps,y.identity,!0)},hs=function(e,t){for(var n=[],r=0;r<e.length;r++){var o=e[r];if(!o.isSome())return E.none();n.push(o.getOrDie())}return E.some(t.apply(null,n))},vs=function(e,t){return!e.isBlock(t)||t.innerHTML||me.ie||(t.innerHTML='<br data-mce-bogus="1" />'),t},ys=function(e,t,n,r){var o,i,a,s,u=n[t?"start":"end"],c=e.getRoot();if(u){for(a=u[0],i=c,o=u.length-1;o>=1;o--){if(s=i.childNodes,u[o]>s.length-1)return;i=s[u[o]]}3===i.nodeType&&(a=Math.min(u[0],i.nodeValue.length)),1===i.nodeType&&(a=Math.min(u[0],i.childNodes.length)),t?r.setStart(i,a):r.setEnd(i,a)}return!0},bs=function(e,t,n){var r,o,i,a,s,u,c=e.get(n.id+"_"+t),l=n.keep;if(c){if(r=c.parentNode,l?(r=c.firstChild,o=1):o=e.nodeIndex(c),s=r,u=o,!l){for(a=c.previousSibling,i=c.nextSibling,Ot.each(Ot.grep(c.childNodes),function(e){vo.isText(e)&&(e.nodeValue=e.nodeValue.replace(/\uFEFF/g,""))});c=e.get(n.id+"_"+t);)e.remove(c,1);a&&i&&a.nodeType===i.nodeType&&vo.isText(a)&&!me.opera&&(o=a.nodeValue.length,a.appendData(i.nodeValue),e.remove(i),s=a,u=o)}return E.some(ia(s,u))}return E.none()},Cs=function(e,t){var n,r,o,i,a,s,u,c,l,f,d,m,p,g,h,v=e.dom;if(t){if(Ot.isArray(t.start))return g=t,h=(p=v).createRng(),ys(p,!0,g,h)&&ys(p,!1,g,h)?E.some(h):E.none();if("string"==typeof t.start)return E.some((f=t,d=(l=v).createRng(),m=as(l.getRoot(),f.start),d.setStart(m.container(),m.offset()),m=as(l.getRoot(),f.end),d.setEnd(m.container(),m.offset()),d));if(t.id)return u=bs(o=v,"start",i=t),c=bs(o,"end",i),hs([u,(a=c,s=u,a.isSome()?a:s)],function(e,t){var n=o.createRng();return n.setStart(vs(o,e.container()),e.offset()),n.setEnd(vs(o,t.container()),t.offset()),n});if(t.name)return n=v,r=t,E.from(n.select(r.name)[r.index]).map(function(e){var t=n.createRng();return t.selectNode(e),t});if(t.rng)return E.some(t.rng)}return E.none()},xs={getBookmark:function(e,t,n){return gs.getBookmark(e,t,n)},moveToBookmark:function(e,t){Cs(e,t).each(function(t){e.setRng(t)})},isBookmarkNode:function(e){return vo.isElement(e)&&"SPAN"===e.tagName&&"bookmark"===e.getAttribute("data-mce-type")}},ws=Ot.each,Ns=function(e){this.compare=function(t,n){if(t.nodeName!==n.nodeName)return!1;var r=function(t){var n={};return ws(e.getAttribs(t),function(r){var o=r.nodeName.toLowerCase();0!==o.indexOf("_")&&"style"!==o&&0!==o.indexOf("data-")&&(n[o]=e.getAttrib(t,o))}),n},o=function(e,t){var n,r;for(r in e)if(e.hasOwnProperty(r)){if(void 0===(n=t[r]))return!1;if(e[r]!==n)return!1;delete t[r]}for(r in t)if(t.hasOwnProperty(r))return!1;return!0};return!(!o(r(t),r(n))||!o(e.parseStyle(e.getAttrib(t,"style")),e.parseStyle(e.getAttrib(n,"style")))||xs.isBookmarkNode(t)||xs.isBookmarkNode(n))}},Es=function(e,t){Ur.parent(e).each(function(n){n.dom().insertBefore(t.dom(),e.dom())})},Ss=function(e,t){e.dom().appendChild(t.dom())},ks={before:Es,after:function(e,t){Ur.nextSibling(e).fold(function(){Ur.parent(e).each(function(e){Ss(e,t)})},function(e){Es(e,t)})},prepend:function(e,t){Ur.firstChild(e).fold(function(){Ss(e,t)},function(n){e.dom().insertBefore(t.dom(),n.dom())})},append:Ss,appendAt:function(e,t,n){Ur.child(e,n).fold(function(){Ss(e,t)},function(e){Es(e,t)})},wrap:function(e,t){Es(e,t),Ss(t,e)}},Ts=function(e,t){M.each(t,function(t){ks.before(e,t)})},As=function(e,t){M.each(t,function(t){ks.append(e,t)})},_s=function(e){var t=e.dom();null!==t.parentNode&&t.parentNode.removeChild(t)},Bs={empty:function(e){e.dom().textContent="",M.each(Ur.children(e),function(e){_s(e)})},remove:_s,unwrap:function(e){var t=Ur.children(e);t.length>0&&Ts(e,t),_s(e)}},Rs=(aa=Zn.isText,sa="text",ua=function(e){return aa(e)?E.from(e.dom().nodeValue):E.none()},ca=Un.detect().browser,{get:function(e){if(!aa(e))throw new Error("Can only get "+sa+" value of a "+sa+" node");return la(e).getOr("")},getOption:la=ca.isIE()&&10===ca.version.major?function(e){try{return ua(e)}catch(yC){return E.none()}}:ua,set:function(e,t){if(!aa(e))throw new Error("Can only set raw "+sa+" value of a "+sa+" node");e.dom().nodeValue=t}}),Ds=function(e){return Rs.get(e)},Os=function(e,t){return _r.all(t,e)},Ps=function(e){var t=Os(e,"br"),n=M.filter(function(e){for(var t=[],n=e.dom();n;)t.push(Hn.fromDom(n)),n=n.lastChild;return t}(e).slice(-1),io.isBr);t.length===n.length&&M.each(n,Bs.remove)},Is=function(e){Bs.empty(e),ks.append(e,Hn.fromHtml('<br data-mce-bogus="1">'))},Ls=function(e){Ur.lastChild(e).each(function(t){Ur.prevSibling(t).each(function(n){io.isBlock(e)&&io.isBr(t)&&io.isBlock(n)&&Bs.remove(t)})})},Ms=Ot.makeMap,Fs=function(e){var t,n,r,o,i,a=[];return t=(e=e||{}).indent,n=Ms(e.indent_before||""),r=Ms(e.indent_after||""),o=Ao.getEncodeFunc(e.entity_encoding||"raw",e.entities),i="html"===e.element_format,{start:function(e,s,u){var c,l,f,d;if(t&&n[e]&&a.length>0&&(d=a[a.length-1]).length>0&&"\n"!==d&&a.push("\n"),a.push("<",e),s)for(c=0,l=s.length;c<l;c++)f=s[c],a.push(" ",f.name,'="',o(f.value,!0),'"');a[a.length]=!u||i?">":" />",u&&t&&r[e]&&a.length>0&&(d=a[a.length-1]).length>0&&"\n"!==d&&a.push("\n")},end:function(e){var n;a.push("</",e,">"),t&&r[e]&&a.length>0&&(n=a[a.length-1]).length>0&&"\n"!==n&&a.push("\n")},text:function(e,t){e.length>0&&(a[a.length]=t?e:o(e))},cdata:function(e){a.push("<![CDATA[",e,"]]>")},comment:function(e){a.push("\x3c!--",e,"--\x3e")},pi:function(e,n){n?a.push("<?",e," ",o(n),"?>"):a.push("<?",e,"?>"),t&&a.push("\n")},doctype:function(e){a.push("<!DOCTYPE",e,">",t?"\n":"")},reset:function(){a.length=0},getContent:function(){return a.join("").replace(/\n$/,"")}}},zs=function(e,t){var n={},r=Fs(e);return(e=e||{}).validate=!("validate"in e)||e.validate,n.schema=t=t||Fo(),n.writer=r,n.serialize=function(n){var o,i;i=e.validate,o={3:function(e){r.text(e.value,e.raw)},8:function(e){r.comment(e.value)},7:function(e){r.pi(e.name,e.value)},10:function(e){r.doctype(e.value)},4:function(e){r.cdata(e.value)},11:function(e){if(e=e.firstChild)do{a(e)}while(e=e.next)}},r.reset();var a=function(e){var n,s,u,c,l,f,d,m,p,g=o[e.type];if(g)g(e);else{if(n=e.name,s=e.shortEnded,u=e.attributes,i&&u&&u.length>1&&((f=[]).map={},p=t.getElementRule(e.name))){for(d=0,m=p.attributesOrder.length;d<m;d++)(c=p.attributesOrder[d])in u.map&&(l=u.map[c],f.map[c]=l,f.push({name:c,value:l}));for(d=0,m=u.length;d<m;d++)(c=u[d].name)in f.map||(l=u.map[c],f.map[c]=l,f.push({name:c,value:l}));u=f}if(r.start(e.name,u,s),!s){if(e=e.firstChild)do{a(e)}while(e=e.next);r.end(n)}}};return 1!==n.type||e.inner?o[11](n):a(n),r.getContent()},n},Us=function(e){return ia.isTextPosition(e)?0===e.offset():Ei(e.getNode())},Vs=function(e){return ia.isTextPosition(e)?e.offset()===e.container().data.length:Ei(e.getNode(!0))},Hs=function(e,t){return!ia.isTextPosition(e)&&!ia.isTextPosition(t)&&e.getNode()===t.getNode(!0)},qs=function(e,t,n){return e?!Hs(t,n)&&(r=t,!(!ia.isTextPosition(r)&&vo.isBr(r.getNode())))&&Vs(t)&&Us(n):!Hs(n,t)&&Us(t)&&Vs(n);var r},js=function(e,t,n){var r=Ha(t);return E.from(e?r.next(n):r.prev(n))},$s=function(e,t){var n,r,o,i,a,s=e?t.firstChild:t.lastChild;return vo.isText(s)?E.some(new ia(s,e?0:s.data.length)):s?Ei(s)?E.some(e?ia.before(s):(a=s,vo.isBr(a)?ia.before(a):ia.after(a))):(r=t,o=s,i=(n=e)?ia.before(o):ia.after(o),js(n,r,i)):E.none()},Ws={fromPosition:js,nextPosition:y.curry(js,!0),prevPosition:y.curry(js,!1),navigate:function(e,t,n){return js(e,t,n).bind(function(r){return _a.isInSameBlock(n,r,t)&&qs(e,n,r)?js(e,t,r):E.some(r)})},positionIn:$s,firstPositionIn:y.curry($s,!0),lastPositionIn:y.curry($s,!1)},Ks=function(e){var t=ia.fromRangeStart(e),n=ia.fromRangeEnd(e),r=e.commonAncestorContainer;return Ws.fromPosition(!1,r,n).map(function(o){return!_a.isInSameBlock(t,n,r)&&_a.isInSameBlock(t,o,r)?(i=t.container(),a=t.offset(),s=o.container(),u=o.offset(),(c=document.createRange()).setStart(i,a),c.setEnd(s,u),c):e;var i,a,s,u,c}).getOr(e)},Xs=function(e){return(t=e).collapsed?t:Ks(t);var t},Ys=vo.matchNodeNames("td th"),Gs=function(e,t,n){var r,o,i,a,s,u,c,l,f,d,m,p,g=e.schema.getTextInlineElements(),h=e.selection,v=e.dom;if(/^ | $/.test(t)&&(t=function(e){var t,n,r;t=h.getRng(),n=t.startContainer,r=t.startOffset;var o=function(e){return n[e]&&3===n[e].nodeType};return 3===n.nodeType&&(r>0?e=e.replace(/^&nbsp;/," "):o("previousSibling")||(e=e.replace(/^ /,"&nbsp;")),r<n.length?e=e.replace(/&nbsp;(<br>|)$/," "):o("nextSibling")||(e=e.replace(/(&nbsp;| )(<br>|)$/,"&nbsp;"))),e}(t)),r=e.parser,p=n.merge,o=zs({validate:e.settings.validate},e.schema),m='<span id="mce_marker" data-mce-type="bookmark">&#xFEFF;&#x200B;</span>',u={content:t,format:"html",selection:!0,paste:n.paste},(u=e.fire("BeforeSetContent",u)).isDefaultPrevented())e.fire("SetContent",{content:u.content,format:"html",selection:!0,paste:n.paste});else{-1===(t=u.content).indexOf("{$caret}")&&(t+="{$caret}"),t=t.replace(/\{\$caret\}/,m);var y,b,C,x,w=(l=h.getRng()).startContainer||(l.parentElement?l.parentElement():null),N=e.getBody();w===N&&h.isCollapsed()&&v.isBlock(N.firstChild)&&(y=N.firstChild)&&!e.schema.getShortEndedElements()[y.nodeName]&&v.isEmpty(N.firstChild)&&((l=v.createRng()).setStart(N.firstChild,0),l.setEnd(N.firstChild,0),h.setRng(l)),h.isCollapsed()||(e.selection.setRng(Xs(e.selection.getRng())),e.getDoc().execCommand("Delete",!1,null),C=(b=h.getRng()).startContainer,x=b.startOffset,3===C.nodeType&&b.collapsed&&("\xa0"===C.data[x]?(C.deleteData(x,1),/[\u00a0| ]$/.test(t)||(t+=" ")):"\xa0"===C.data[x-1]&&(C.deleteData(x-1,1),/[\u00a0| ]$/.test(t)||(t=" "+t))));var S,k,T,A={context:(i=h.getNode()).nodeName.toLowerCase(),data:n.data,insert:!0};if(s=r.parse(t,A),!0===n.paste&&Ya(e.schema,s)&&Ja(v,i))return l=Ga(o,v,e.selection.getRng(!0),s),e.selection.setRng(l),void e.fire("SetContent",u);if(function(e){for(var t=e;t=t.walk();)1===t.type&&t.attr("data-mce-fragment","1")}(s),"mce_marker"===(f=s.lastChild).attr("id"))for(c=f,f=f.prev;f;f=f.walk(!0))if(3===f.type||!v.isBlock(f.name)){e.schema.isValidChild(f.parent.name,"span")&&f.parent.insert(c,f,"br"===f.name);break}if(e._selectionOverrides.showBlockCaretContainer(i),A.invalid){for(h.setContent(m),i=h.getNode(),a=e.getBody(),9===i.nodeType?i=f=a:f=i;f!==a;)i=f,f=f.parentNode;t=i===a?a.innerHTML:v.getOuterHTML(i),t=o.serialize(r.parse(t.replace(/<span (id="mce_marker"|id=mce_marker).+?<\/span>/i,function(){return o.serialize(s)}))),i===a?v.setHTML(a,t):v.setOuterHTML(i,t)}else t=o.serialize(s),function(e,t,n){if("all"===n.getAttribute("data-mce-bogus"))n.parentNode.insertBefore(e.dom.createFragment(t),n);else{var r=n.firstChild,o=n.lastChild;!r||r===o&&"BR"===r.nodeName?e.dom.setHTML(n,t):e.selection.setContent(t)}}(e,t,i);!function(){if(p){var t=e.getBody(),n=new Ns(v);Ot.each(v.select("*[data-mce-fragment]"),function(e){for(var r=e.parentNode;r&&r!==t;r=r.parentNode)g[e.nodeName.toLowerCase()]&&n.compare(r,e)&&v.remove(e,!0)})}}(),function(t){var n,r,o;if(t){if(h.scrollIntoView(t),n=function(t){for(var n=e.getBody();t&&t!==n;t=t.parentNode)if("false"===e.dom.getContentEditable(t))return t;return null}(t))return v.remove(t),void h.select(n);l=v.createRng(),(f=t.previousSibling)&&3===f.nodeType?(l.setStart(f,f.nodeValue.length),me.ie||(d=t.nextSibling)&&3===d.nodeType&&(f.appendData(d.data),d.parentNode.removeChild(d))):(l.setStartBefore(t),l.setEndBefore(t)),r=v.getParent(t,v.isBlock),v.remove(t),r&&v.isEmpty(r)&&(e.$(r).empty(),l.setStart(r,0),l.setEnd(r,0),Ys(r)||r.getAttribute("data-mce-fragment")||!(o=function(t){var n=ia.fromRangeStart(t);if(n=Ha(e.getBody()).next(n))return n.toRange()}(l))?v.add(r,v.create("br",{"data-mce-bogus":"1"})):(l=o,v.remove(r))),h.setRng(l)}}(v.get("mce_marker")),S=e.getBody(),Ot.each(S.getElementsByTagName("*"),function(e){e.removeAttribute("data-mce-fragment")}),k=e.dom,T=e.selection.getStart(),E.from(k.getParent(T,"td,th")).map(Hn.fromDom).each(Ls),e.fire("SetContent",u),e.addVisual()}},Js=function(e,t){var n,r,o="string"!=typeof(n=t)?(r=Ot.extend({paste:n.paste,data:{paste:n.paste}},n),{content:n.content,details:r}):{content:n,details:{}};Gs(e,o.content,o.details)},Qs=function(e,t,n,r,o){return e(n,r)?E.some(n):tr.isFunction(o)&&o(n)?E.none():t(n,r,o)},Zs=function(e,t,n){for(var r=e.dom(),o=tr.isFunction(n)?n:y.constant(!1);r.parentNode;){r=r.parentNode;var i=Hn.fromDom(r);if(t(i))return E.some(i);if(o(i))break}return E.none()},eu=function(e,t){return M.find(e.dom().childNodes,y.compose(t,Hn.fromDom)).map(Hn.fromDom)},tu=function(e,t){var n=function(e){for(var r=0;r<e.childNodes.length;r++){if(t(Hn.fromDom(e.childNodes[r])))return E.some(Hn.fromDom(e.childNodes[r]));var o=n(e.childNodes[r]);if(o.isSome())return o}return E.none()};return n(e.dom())},nu={first:function(e){return tu(gr.body(),e)},ancestor:Zs,closest:function(e,t,n){return Qs(function(e){return t(e)},Zs,e,t,n)},sibling:function(e,t){var n=e.dom();return n.parentNode?eu(Hn.fromDom(n.parentNode),function(n){return!Dr.eq(e,n)&&t(n)}):E.none()},child:eu,descendant:tu},ru=xr("sections","settings"),ou=Un.detect().deviceType.isTouch(),iu=["lists","autolink","autosave"],au={theme:"mobile"},su=function(e){var t=tr.isArray(e)?e.join(" "):e,n=M.map(tr.isString(t)?t.split(" "):[],On);return M.filter(n,function(e){return e.length>0})},uu=function(e,t){return e.sections().hasOwnProperty(t)},cu=function(e,t,n,r){var o,i,a=su(n.forced_plugins),s=su(r.plugins),u=e&&uu(t,"mobile")?(o=s,M.filter(o,y.curry(M.contains,iu))):s,c=(i=u,[].concat(su(a)).concat(su(i)));return Ot.extend(r,{plugins:c.join(" ")})},lu=function(e,t,n,r){var o,i,a,s,u,c,l,f,d,m,p,g,h,v=(o=["mobile"],i=r,a=sr.bifilter(i,function(e,t){return M.contains(o,t)}),ru(a.t,a.f)),y=Ot.extend(t,n,v.settings(),(p=e,h=(g=v).settings().inline,p&&uu(g,"mobile")&&!h?(l="mobile",f=au,d=v.sections(),m=d.hasOwnProperty(l)?d[l]:{},Ot.extend({},f,m)):{}),{validate:!0,content_editable:v.settings().inline,external_plugins:(s=n,u=v.settings(),c=u.external_plugins?u.external_plugins:{},s&&s.external_plugins?Ot.extend({},s.external_plugins,c):c)});return cu(e,v,n,y)},fu=function(e,t,n){return E.from(t.settings[n]).filter(e)},du=y.curry(fu,tr.isString),mu=function(e,t,n,r){var o,i,a=t in e.settings?e.settings[t]:n;return"hash"===r?(i={},"string"==typeof(o=a)?M.each(o.indexOf("=")>0?o.split(/[;,](?![^=;,]*(?:[;,]|$))/):o.split(","),function(e){(e=e.split("=")).length>1?i[Ot.trim(e[0])]=Ot.trim(e[1]):i[Ot.trim(e[0])]=Ot.trim(e)}):i=o,i):"string"===r?fu(tr.isString,e,t).getOr(n):"number"===r?fu(tr.isNumber,e,t).getOr(n):"boolean"===r?fu(tr.isBoolean,e,t).getOr(n):"object"===r?fu(tr.isObject,e,t).getOr(n):"array"===r?fu(tr.isArray,e,t).getOr(n):"function"===r?fu(tr.isFunction,e,t).getOr(n):a},pu=/[\u0591-\u07FF\uFB1D-\uFDFF\uFE70-\uFEFC]/,gu=function(e){return pu.test(e)},hu=function(e,t){var n=t.container(),r=t.offset();return e?mi.isCaretContainerInline(n)?vo.isText(n.nextSibling)?new ia(n.nextSibling,0):ia.after(n):mi.isBeforeInline(t)?new ia(n,r+1):t:mi.isCaretContainerInline(n)?vo.isText(n.previousSibling)?new ia(n.previousSibling,n.previousSibling.data.length):ia.before(n):mi.isAfterInline(t)?new ia(n,r-1):t},vu={isInlineTarget:function(e,t){var n=du(e,"inline_boundaries_selector").getOr("a[href],code");return _r.is(Hn.fromDom(t),n)},findRootInline:function(e,t,n){var r,o,i,a=(r=e,o=t,i=n,M.filter(Xo.DOM.getParents(i.container(),"*",o),r));return E.from(a[a.length-1])},isRtl:function(e){return"rtl"===Xo.DOM.getStyle(e,"direction",!0)||gu(e.textContent)},isAtZwsp:function(e){return mi.isBeforeInline(e)||mi.isAfterInline(e)},normalizePosition:hu,normalizeForwards:y.curry(hu,!0),normalizeBackwards:y.curry(hu,!1),hasSameParentBlock:function(e,t,n){var r=_a.getParentBlock(t,e),o=_a.getParentBlock(n,e);return r&&r===o}},yu=function(e,t){return Dr.contains(e,t)?nu.closest(t,function(e){return io.isTextBlock(e)||io.isListItem(e)},(n=e,function(e){return Dr.eq(n,Hn.fromDom(e.dom().parentNode))})):E.none();var n},bu=function(e){var t,n,r;e.dom.isEmpty(e.getBody())&&(e.setContent(""),n=(t=e).getBody(),r=n.firstChild&&t.dom.isBlock(n.firstChild)?n.firstChild:n,t.selection.setCursorLocation(r,0))},Cu=function(e,t,n){return hs([Ws.firstPositionIn(n),Ws.lastPositionIn(n)],function(r,o){var i=vu.normalizePosition(!0,r),a=vu.normalizePosition(!1,o),s=vu.normalizePosition(!1,t);return e?Ws.nextPosition(n,s).map(function(e){return e.isEqual(a)&&t.isEqual(i)}).getOr(!1):Ws.prevPosition(n,s).map(function(e){return e.isEqual(i)&&t.isEqual(a)}).getOr(!1)}).getOr(!0)},xu=function(e,t,n){return nu.ancestor(e,function(e){return _r.is(e,t)},n)},wu=xu,Nu=function(e,t){return _r.one(t,e)},Eu=function(e,t,n){return Qs(_r.is,xu,e,t,n)},Su=function(e,t,n){return wu(e,t,n).isSome()},ku=function(e,t){return vo.isText(t)&&/^[ \t\r\n]*$/.test(t.data)&&!1===(n=e,r=t,o=Hn.fromDom(n),i=Hn.fromDom(r),Su(i,"pre,code",y.curry(Dr.eq,o)));var n,r,o,i},Tu=function(e,t){return Ei(t)&&!1===ku(e,t)||(n=t,vo.isElement(n)&&"A"===n.nodeName&&n.hasAttribute("name"))||Au(t);var n},Au=vo.hasAttribute("data-mce-bookmark"),_u=vo.hasAttribute("data-mce-bogus"),Bu=vo.hasAttributeValue("data-mce-bogus","all"),Ru=function(e){return function(e){var t,n,r=0;if(Tu(e,e))return!1;if(!(n=e.firstChild))return!0;t=new to(n,e);do{if(Bu(n))n=t.next(!0);else if(_u(n))n=t.next();else if(vo.isBr(n))r++,n=t.next();else{if(Tu(e,n))return!1;n=t.next()}}while(n);return r<=1}(e.dom())},Du=xr("block","position"),Ou=xr("from","to"),Pu=function(e,t){var n=Hn.fromDom(e),r=Hn.fromDom(t.container());return yu(n,r).map(function(e){return Du(e,t)})},Iu=function(e,t,n){var r=Pu(e,ia.fromRangeStart(n)),o=r.bind(function(n){return Ws.fromPosition(t,e,n.position()).bind(function(n){return Pu(e,n).map(function(n){return r=e,o=t,i=n,vo.isBr(i.position().getNode())&&!1===Ru(i.block())?Ws.positionIn(!1,i.block().dom()).bind(function(e){return e.isEqual(i.position())?Ws.fromPosition(o,r,e).bind(function(e){return Pu(r,e)}):E.some(i)}).getOr(i):i;var r,o,i})})});return hs([r,o],Ou).filter(function(e){return r=e,!1===Dr.eq(r.from().block(),r.to().block())&&(n=e,Ur.parent(n.from().block()).bind(function(e){return Ur.parent(n.to().block()).filter(function(t){return Dr.eq(e,t)})}).isSome())&&(t=e,!1===vo.isContentEditableFalse(t.from().block())&&!1===vo.isContentEditableFalse(t.to().block()));var t,n,r})},Lu=function(e,t,n){return n.collapsed?Iu(e,t,n):E.none()},Mu=function(e,t,n){return Dr.contains(t,e)?Ur.parents(e,function(e){return n(e)||Dr.eq(e,t)}).slice(0,-1):[]},Fu=function(e,t){return Mu(e,t,y.constant(!1))},zu=Fu,Uu=function(e,t){return[e].concat(Fu(e,t))},Vu=function(e){var t,n,r=(t=e,n=Ur.children(t),M.findIndex(n,io.isBlock).fold(function(){return n},function(e){return n.slice(0,e)}));return M.each(r,function(e){Bs.remove(e)}),r},Hu=function(e,t){Ws.positionIn(e,t.dom()).each(function(e){var t=e.getNode();vo.isBr(t)&&Bs.remove(Hn.fromDom(t))})},qu=function(e,t){var n=Uu(t,e);return M.find(n.reverse(),Ru).each(Bs.remove)},ju=function(e,t){return Dr.contains(t,e)?Ur.parent(e).bind(function(n){return Dr.eq(n,t)?E.some(e):(r=t,o=e,i=Ur.parents(o,function(e){return Dr.eq(e,r)}),E.from(i[i.length-2]));var r,o,i}):E.none()},$u=function(e,t,n){if(Ru(n))return Bs.remove(n),Ru(t)&&Is(t),Ws.firstPositionIn(t.dom());Hu(!0,t),Hu(!1,n);var r=Vu(t);return ju(t,n).fold(function(){qu(e,t);var o=Ws.lastPositionIn(n.dom());return M.each(r,function(e){ks.append(n,e)}),o},function(o){var i=Ws.prevPosition(n.dom(),ia.before(o.dom()));return M.each(r,function(e){ks.before(o,e)}),qu(e,t),i})},Wu=function(e,t,n,r){return t?$u(e,r,n):$u(e,n,r)},Ku=function(e,t){var n,r=Hn.fromDom(e.getBody());return(n=Lu(r.dom(),t,e.selection.getRng()).bind(function(e){return Wu(r,t,e.from().block(),e.to().block())})).each(function(t){e.selection.setRng(t.toRange())}),n.isSome()},Xu=function(e,t){var n=Hn.fromDom(t),r=y.curry(Dr.eq,e);return nu.ancestor(n,io.isTableCell,r).isSome()},Yu=function(e,t){var n,r,o=Ws.prevPosition(e.dom(),ia.fromRangeStart(t)).isNone(),i=Ws.nextPosition(e.dom(),ia.fromRangeEnd(t)).isNone();return!(Xu(n=e,(r=t).startContainer)||Xu(n,r.endContainer))&&o&&i},Gu=function(e){var t,n,r,o,i=Hn.fromDom(e.getBody()),a=e.selection.getRng();return Yu(i,a)?((o=e).setContent(""),o.selection.setCursorLocation(),!0):(t=i,n=e.selection,r=n.getRng(),hs([yu(t,Hn.fromDom(r.startContainer)),yu(t,Hn.fromDom(r.endContainer))],function(e,o){return!1===Dr.eq(e,o)&&(r.deleteContents(),Wu(t,!0,e,o).each(function(e){n.setRng(e.toRange())}),!0)}).getOr(!1))},Ju=function(e,t){return!e.selection.isCollapsed()&&Gu(e)},Qu=function(e){if(!tr.isArray(e))throw new Error("cases must be an array");if(0===e.length)throw new Error("there must be at least one case");var t=[],n={};return M.each(e,function(r,o){var i=sr.keys(r);if(1!==i.length)throw new Error("one and only one name per case");var a=i[0],s=r[a];if(n[a]!==undefined)throw new Error("duplicate key detected:"+a);if("cata"===a)throw new Error("cannot have a case named cata (sorry)");if(!tr.isArray(s))throw new Error("case arguments must be an array");t.push(a),n[a]=function(){var n=arguments.length;if(n!==s.length)throw new Error("Wrong number of arguments to case "+a+". Expected "+s.length+" ("+s+"), got "+n);for(var r=new Array(n),i=0;i<r.length;i++)r[i]=arguments[i];return{fold:function(){if(arguments.length!==e.length)throw new Error("Wrong number of arguments to fold. Expected "+e.length+", got "+arguments.length);return arguments[o].apply(null,r)},match:function(e){var n=sr.keys(e);if(t.length!==n.length)throw new Error("Wrong number of arguments to match. Expected: "+t.join(",")+"\nActual: "+n.join(","));if(!M.forall(t,function(e){return M.contains(n,e)}))throw new Error("Not all branches were specified when using match. Specified: "+n.join(", ")+"\nRequired: "+t.join(", "));return e[a].apply(null,r)},log:function(e){console.log(e,{constructors:t,constructor:a,params:r})}}}}),n},Zu=Qu([{remove:["element"]},{moveToElement:["element"]},{moveToPosition:["position"]}]),ec=function(e,t,n,r){var o=r.getNode(!1===t);return yu(Hn.fromDom(e),Hn.fromDom(n.getNode())).map(function(e){return Ru(e)?Zu.remove(e.dom()):Zu.moveToElement(o)}).orThunk(function(){return E.some(Zu.moveToElement(o))})},tc=function(e,t,n){return Ws.fromPosition(t,e,n).bind(function(r){return t&&vo.isContentEditableFalse(r.getNode())?ec(e,t,n,r):!1===t&&vo.isContentEditableFalse(r.getNode(!0))?ec(e,t,n,r):t&&_a.isAfterContentEditableFalse(n)?E.some(Zu.moveToPosition(r)):!1===t&&_a.isBeforeContentEditableFalse(n)?E.some(Zu.moveToPosition(r)):E.none()})},nc=function(e,t,n){return i=t,a=n.getNode(!1===i),s=i?"after":"before",vo.isElement(a)&&a.getAttribute("data-mce-caret")===s?(r=t,o=n.getNode(!1===t),r&&vo.isContentEditableFalse(o.nextSibling)?E.some(Zu.moveToElement(o.nextSibling)):!1===r&&vo.isContentEditableFalse(o.previousSibling)?E.some(Zu.moveToElement(o.previousSibling)):E.none()).fold(function(){return tc(e,t,n)},E.some):tc(e,t,n).bind(function(t){return r=e,o=n,t.fold(function(e){return E.some(Zu.remove(e))},function(e){return E.some(Zu.moveToElement(e))},function(e){return _a.isInSameBlock(o,e,r)?E.none():E.some(Zu.moveToPosition(e))});var r,o});var r,o,i,a,s},rc=function(e,t,n){var r=_a.normalizeRange(t?1:-1,e,n),o=ia.fromRangeStart(r);return!1===t&&_a.isAfterContentEditableFalse(o)?E.some(Zu.remove(o.getNode(!0))):t&&_a.isBeforeContentEditableFalse(o)?E.some(Zu.remove(o.getNode())):nc(e,t,o)},oc=function(e,t){return r=e,o=(n=t).container(),i=n.offset(),!1===ia.isTextPosition(n)&&o===r.parentNode&&i>ia.before(r).offset()?new ia(t.container(),t.offset()-1):t;var n,r,o,i},ic=function(e){return Ei(e.previousSibling)?E.some((t=e.previousSibling,vo.isText(t)?new ia(t,t.data.length):ia.after(t))):e.previousSibling?Ws.lastPositionIn(e.previousSibling):E.none();var t},ac=function(e){return Ei(e.nextSibling)?E.some((t=e.nextSibling,vo.isText(t)?new ia(t,0):ia.before(t))):e.nextSibling?Ws.firstPositionIn(e.nextSibling):E.none();var t},sc=function(e,t){return ic(t).orThunk(function(){return ac(t)}).orThunk(function(){return n=e,r=t,o=ia.before(r.previousSibling?r.previousSibling:r.parentNode),Ws.prevPosition(n,o).fold(function(){return Ws.nextPosition(n,ia.after(r))},E.some);var n,r,o})},uc=function(e,t){return ac(t).orThunk(function(){return ic(t)}).orThunk(function(){return n=e,r=t,Ws.nextPosition(n,ia.after(r)).fold(function(){return Ws.prevPosition(n,ia.before(r))},E.some);var n,r})},cc=function(e,t,n){return(r=e,o=t,i=n,r?uc(o,i):sc(o,i)).map(y.curry(oc,n));var r,o,i},lc=function(e,t,n){n.fold(function(){e.focus()},function(n){e.selection.setRng(n.toRange(),t)})},fc=function(e,t){return t&&e.schema.getBlockElements().hasOwnProperty(Zn.name(t))},dc=function(e){if(Ru(e)){var t=Hn.fromHtml('<br data-mce-bogus="1">');return Bs.empty(e),ks.append(e,t),E.some(ia.before(t.dom()))}return E.none()},mc=function(e,t,n){var r,o,i,a=cc(t,e.getBody(),n.dom()),s=nu.ancestor(n,y.curry(fc,e),(r=e.getBody(),function(e){return e.dom()===r})),u=(o=n,i=a,hs([Ur.prevSibling(o),Ur.nextSibling(o),i],function(e,t,n){var r,i=e.dom(),a=t.dom();return vo.isText(i)&&vo.isText(a)?(r=i.data.length,i.appendData(a.data),Bs.remove(t),Bs.remove(o),n.container()===a?new ia(i,r):n):(Bs.remove(o),n)}).orThunk(function(){return Bs.remove(o),i}));e.dom.isEmpty(e.getBody())?(e.setContent(""),e.selection.setCursorLocation()):s.bind(dc).fold(function(){lc(e,t,u)},function(n){lc(e,t,E.some(n))})},pc=function(e,t){return rc(e.getBody(),t,e.selection.getRng()).map(function(n){return n.fold((a=e,s=t,function(e){return a._selectionOverrides.hideFakeCaret(),mc(a,s,Hn.fromDom(e)),!0}),(o=e,i=t,function(e){var t=i?ia.before(e):ia.after(e);return o.selection.setRng(t.toRange()),!0}),(r=e,function(e){return r.selection.setRng(e.toRange()),!0}));var r,o,i,a,s}).getOr(!1)},gc=function(e,t){var n,r=e.selection.getNode();return!!vo.isContentEditableFalse(r)&&(n=Hn.fromDom(e.getBody()),M.each(Os(n,".mce-offscreen-selection"),Bs.remove),mc(e,t,Hn.fromDom(e.selection.getNode())),bu(e),!0)},hc=function(e,t){return e.selection.isCollapsed()?pc(e,t):gc(e,t)},vc=function(e){var t,n=function(e,t){for(;t&&t!==e;){if(vo.isContentEditableTrue(t)||vo.isContentEditableFalse(t))return t;t=t.parentNode}return null}(e.getBody(),e.selection.getNode());return vo.isContentEditableTrue(n)&&e.dom.isBlock(n)&&e.dom.isEmpty(n)&&(t=e.dom.create("br",{"data-mce-bogus":"1"}),e.dom.setHTML(n,""),n.appendChild(t),e.selection.setRng(ia.before(t).toRange())),!0},yc=vo.isText,bc=function(e){return yc(e)&&e.data[0]===oi},Cc=function(e){return yc(e)&&e.data[e.data.length-1]===oi},xc=function(e){return e.ownerDocument.createTextNode(oi)},wc=function(e,t){return e?function(e){if(yc(e.previousSibling))return Cc(e.previousSibling)?e.previousSibling:(e.previousSibling.appendData(oi),e.previousSibling);if(yc(e))return bc(e)?e:(e.insertData(0,oi),e);var t=xc(e);return e.parentNode.insertBefore(t,e),t}(t):function(e){if(yc(e.nextSibling))return bc(e.nextSibling)?e.nextSibling:(e.nextSibling.insertData(0,oi),e.nextSibling);if(yc(e))return Cc(e)?e:(e.appendData(oi),e);var t=xc(e);return e.nextSibling?e.parentNode.insertBefore(t,e.nextSibling):e.parentNode.appendChild(t),t}(t)},Nc={insertInline:wc,insertInlineBefore:y.curry(wc,!0),insertInlineAfter:y.curry(wc,!1)},Ec=vo.isElement,Sc=vo.isText,kc=function(e){var t=e.parentNode;t&&t.removeChild(e)},Tc=function(e,t){0===t.length?kc(e):e.nodeValue=t},Ac=function(e){var t=ii(e);return{count:e.length-t.length,text:t}},_c=function(e,t){return Dc(e),t},Bc=function(e,t){return t.container()===e?(r=t,o=Ac((n=e).data.substr(0,r.offset())),i=Ac(n.data.substr(r.offset())),(a=o.text+i.text).length>0?(Tc(n,a),new ia(n,r.offset()-o.count)):r):_c(e,t);var n,r,o,i,a},Rc=function(e,t){return t.container()===e.parentNode?(n=e,o=(r=t).container(),i=M.indexOf(o.childNodes,n).map(function(e){return e<r.offset()?new ia(o,r.offset()-1):r}).getOr(r),Dc(n),i):_c(e,t);var n,r,o,i},Dc=function(e){if(Ec(e)&&mi.isCaretContainer(e)&&(mi.hasContent(e)?e.removeAttribute("data-mce-caret"):kc(e)),Sc(e)){var t=ii(function(e){try{return e.nodeValue}catch(t){return""}}(e));Tc(e,t)}},Oc={removeAndReposition:function(e,t){return ia.isTextPosition(t)?Bc(e,t):Rc(e,t)},remove:Dc},Pc=function(e,t){return vo.isText(e.container())?Nc.insertInline(t,e.container()):Nc.insertInline(t,e.getNode())},Ic=function(e,t){var n=t.get();return n&&e.container()===n&&mi.isCaretContainerInline(n)},Lc=function(e,t){return t.fold(function(t){Oc.remove(e.get());var n=Nc.insertInlineBefore(t);return e.set(n),E.some(new ia(n,n.length-1))},function(t){return Ws.firstPositionIn(t).map(function(t){if(Ic(t,e))return new ia(e.get(),1);Oc.remove(e.get());var n=Pc(t,!0);return e.set(n),new ia(n,1)})},function(t){return Ws.lastPositionIn(t).map(function(t){if(Ic(t,e))return new ia(e.get(),e.get().length-1);Oc.remove(e.get());var n=Pc(t,!1);return e.set(n),new ia(n,n.length-1)})},function(t){Oc.remove(e.get());var n=Nc.insertInlineAfter(t);return e.set(n),E.some(new ia(n,1))})},Mc=function(e){return e&&/^(IMG)$/.test(e.nodeName)},Fc=function(e){return e&&3===e.nodeType&&/^([\t \r\n]+|)$/.test(e.nodeValue)},zc=function(e,t,n){return"color"!==n&&"backgroundColor"!==n||(t=e.toHex(t)),"fontWeight"===n&&700===t&&(t="bold"),"fontFamily"===n&&(t=t.replace(/[\'\"]/g,"").replace(/,\s+/g,",")),""+t},Uc={isInlineBlock:Mc,moveStart:function(e,t,n){var r,o,i,a=n.startContainer,s=n.startOffset;if((n.startContainer!==n.endContainer||!Mc(n.startContainer.childNodes[n.startOffset]))&&(3===a.nodeType&&s>=a.nodeValue.length&&(s=e.nodeIndex(a),a=a.parentNode),1===a.nodeType))for(s<(i=a.childNodes).length?(a=i[s],r=new to(a,e.getParent(a,e.isBlock))):(a=i[i.length-1],(r=new to(a,e.getParent(a,e.isBlock))).next(!0)),o=r.current();o;o=r.next())if(3===o.nodeType&&!Fc(o))return n.setStart(o,0),void t.setRng(n)},getNonWhiteSpaceSibling:function(e,t,n){if(e)for(t=t?"nextSibling":"previousSibling",e=n?e:e[t];e;e=e[t])if(1===e.nodeType||!Fc(e))return e},isTextBlock:function(e,t){return t.nodeType&&(t=t.nodeName),!!e.schema.getTextBlockElements()[t.toLowerCase()]},isValid:function(e,t,n){return e.schema.isValidChild(t,n)},isWhiteSpaceNode:Fc,replaceVars:function(e,t){return"string"!=typeof e?e=e(t):t&&(e=e.replace(/%(\w+)/g,function(e,n){return t[n]||e})),e},isEq:function(e,t){return e=e||"",t=t||"",e=""+(e.nodeName||e),t=""+(t.nodeName||t),e.toLowerCase()===t.toLowerCase()},normalizeStyleValue:zc,getStyle:function(e,t,n){return zc(e,e.getStyle(t,n),n)},getTextDecoration:function(e,t){var n;return e.getParent(t,function(t){return(n=e.getStyle(t,"text-decoration"))&&"none"!==n}),n},getParents:function(e,t,n){return e.getParents(t,n,e.getRoot())}},Vc=xs.isBookmarkNode,Hc=Uc.getParents,qc=Uc.isWhiteSpaceNode,jc=Uc.isTextBlock,$c=function(e,t){for(void 0===t&&(t=3===e.nodeType?e.length:e.childNodes.length);e&&e.hasChildNodes();)(e=e.childNodes[t])&&(t=3===e.nodeType?e.length:e.childNodes.length);return{node:e,offset:t}},Wc=function(e,t){for(var n=t;n;){if(1===n.nodeType&&e.getContentEditable(n))return"false"===e.getContentEditable(n)?n:t;n=n.parentNode}return t},Kc=function(e,t,n,r){var o,i,a=n.nodeValue;return void 0===r&&(r=e?a.length:0),e?-1===(o=(o=a.lastIndexOf(" ",r))>(i=a.lastIndexOf("\xa0",r))?o:i)||t||o++:(o=a.indexOf(" ",r),i=a.indexOf("\xa0",r),o=-1!==o&&(-1===i||o<i)?o:i),o},Xc=function(e,t,n,r,o,i){var a,s,u,c;if(3===n.nodeType){if(-1!==(u=Kc(o,i,n,r)))return{container:n,offset:u};c=n}for(a=new to(n,e.getParent(n,e.isBlock)||t);s=a[o?"prev":"next"]();)if(3===s.nodeType){if(c=s,-1!==(u=Kc(o,i,s)))return{container:s,offset:u}}else if(e.isBlock(s))break;if(c)return{container:c,offset:r=o?0:c.length}},Yc=function(e,t,n,r,o){var i,a,s,u;for(3===r.nodeType&&0===r.nodeValue.length&&r[o]&&(r=r[o]),i=Hc(e,r),a=0;a<i.length;a++)for(s=0;s<t.length;s++)if(!("collapsed"in(u=t[s])&&u.collapsed!==n.collapsed)&&e.is(i[a],u.selector))return i[a];return r},Gc=function(e,t,n,r){var o,i=e.dom,a=i.getRoot();if(t[0].wrapper||(o=i.getParent(n,t[0].block,a)),!o){var s=i.getParent(n,"LI,TD,TH");o=i.getParent(3===n.nodeType?n.parentNode:n,function(t){return t!==a&&jc(e,t)},s)}if(o&&t[0].wrapper&&(o=Hc(i,o,"ul,ol").reverse()[0]||o),!o)for(o=n;o[r]&&!i.isBlock(o[r])&&(o=o[r],!Uc.isEq(o,"br")););return o||n},Jc=function(e,t,n,r,o,i,a){var s,u,c,l,f,d;if(s=u=a?n:o,l=a?"previousSibling":"nextSibling",f=e.getRoot(),3===s.nodeType&&!qc(s)&&(a?r>0:i<s.nodeValue.length))return s;for(;;){if(!t[0].block_expand&&e.isBlock(u))return u;for(c=u[l];c;c=c[l])if(!Vc(c)&&!qc(c)&&("BR"!==(d=c).nodeName||!d.getAttribute("data-mce-bogus")||d.nextSibling))return u;if(u===f||u.parentNode===f){s=u;break}u=u.parentNode}return s},Qc=function(e,t,n,r){var o,i=t.startContainer,a=t.startOffset,s=t.endContainer,u=t.endOffset,c=e.dom;return 1===i.nodeType&&i.hasChildNodes()&&3===(i=zi(i,a)).nodeType&&(a=0),1===s.nodeType&&s.hasChildNodes()&&3===(s=zi(s,t.collapsed?u:u-1)).nodeType&&(u=s.nodeValue.length),i=Wc(c,i),s=Wc(c,s),(Vc(i.parentNode)||Vc(i))&&3===(i=(i=Vc(i)?i:i.parentNode).nextSibling||i).nodeType&&(a=0),(Vc(s.parentNode)||Vc(s))&&3===(s=(s=Vc(s)?s:s.parentNode).previousSibling||s).nodeType&&(u=s.length),n[0].inline&&(t.collapsed&&((o=Xc(c,e.getBody(),i,a,!0,r))&&(i=o.container,a=o.offset),(o=Xc(c,e.getBody(),s,u,!1,r))&&(s=o.container,u=o.offset)),s=r?s:function(e,t){var n=$c(e,t);if(n.node){for(;n.node&&0===n.offset&&n.node.previousSibling;)n=$c(n.node.previousSibling);n.node&&n.offset>0&&3===n.node.nodeType&&" "===n.node.nodeValue.charAt(n.offset-1)&&n.offset>1&&(e=n.node).splitText(n.offset-1)}return e}(s,u)),(n[0].inline||n[0].block_expand)&&(n[0].inline&&3===i.nodeType&&0!==a||(i=Jc(c,n,i,a,s,u,!0)),n[0].inline&&3===s.nodeType&&u!==s.nodeValue.length||(s=Jc(c,n,i,a,s,u,!1))),n[0].selector&&!1!==n[0].expand&&!n[0].inline&&(i=Yc(c,n,t,i,"previousSibling"),s=Yc(c,n,t,s,"nextSibling")),(n[0].block||n[0].selector)&&(i=Gc(e,n,i,"previousSibling"),s=Gc(e,n,s,"nextSibling"),n[0].block&&(c.isBlock(i)||(i=Jc(c,n,i,a,s,u,!0)),c.isBlock(s)||(s=Jc(c,n,i,a,s,u,!1)))),1===i.nodeType&&(a=c.nodeIndex(i),i=i.parentNode),1===s.nodeType&&(u=c.nodeIndex(s)+1,s=s.parentNode),{startContainer:i,startOffset:a,endContainer:s,endOffset:u}},Zc=Uc.isEq,el=function(e,t,n){var r=e.formatter.get(n);if(r)for(var o=0;o<r.length;o++)if(!1===r[o].inherit&&e.dom.is(t,r[o].selector))return!0;return!1},tl=function(e,t,n,r){var o=e.dom.getRoot();return t!==o&&(t=e.dom.getParent(t,function(t){return!!el(e,t,n)||t.parentNode===o||!!ol(e,t,n,r,!0)}),ol(e,t,n,r))},nl=function(e,t,n){return!!Zc(t,n.inline)||!!Zc(t,n.block)||(n.selector?1===t.nodeType&&e.is(t,n.selector):void 0)},rl=function(e,t,n,r,o,i){var a,s,u,c=n[r];if(n.onmatch)return n.onmatch(t,n,r);if(c)if("undefined"==typeof c.length){for(a in c)if(c.hasOwnProperty(a)){if(s="attributes"===r?e.getAttrib(t,a):Uc.getStyle(e,t,a),o&&!s&&!n.exact)return;if((!o||n.exact)&&!Zc(s,Uc.normalizeStyleValue(e,Uc.replaceVars(c[a],i),a)))return}}else for(u=0;u<c.length;u++)if("attributes"===r?e.getAttrib(t,c[u]):Uc.getStyle(e,t,c[u]))return n;return n},ol=function(e,t,n,r,o){var i,a,s,u,c=e.formatter.get(n),l=e.dom;if(c&&t)for(a=0;a<c.length;a++)if(i=c[a],nl(e.dom,t,i)&&rl(l,t,i,"attributes",o,r)&&rl(l,t,i,"styles",o,r)){if(u=i.classes)for(s=0;s<u.length;s++)if(!e.dom.hasClass(t,u[s]))return;return i}},il={matchNode:ol,matchName:nl,match:function(e,t,n,r){var o;return r?tl(e,r,t,n):(r=e.selection.getNode(),!!tl(e,r,t,n)||!((o=e.selection.getStart())===r||!tl(e,o,t,n)))},matchAll:function(e,t,n){var r,o=[],i={};return r=e.selection.getStart(),e.dom.getParent(r,function(r){var a,s;for(a=0;a<t.length;a++)s=t[a],!i[s]&&ol(e,r,s,n)&&(i[s]=!0,o.push(s))},e.dom.getRoot()),o},canApply:function(e,t){var n,r,o,i,a,s=e.formatter.get(t),u=e.dom;if(s)for(n=e.selection.getStart(),r=Uc.getParents(u,n),i=s.length-1;i>=0;i--){if(!(a=s[i].selector)||s[i].defaultBlock)return!0;for(o=r.length-1;o>=0;o--)if(u.is(r[o],a))return!0}return!1},matchesUnInheritedFormatSelector:el},al=function(e,t){return e.splitText(t)},sl={split:function(e){var t=e.startContainer,n=e.startOffset,r=e.endContainer,o=e.endOffset;return t===r&&vo.isText(t)?n>0&&n<t.nodeValue.length&&(t=(r=al(t,n)).previousSibling,o>n?(t=r=al(r,o-=n).previousSibling,o=r.nodeValue.length,n=0):o=0):(vo.isText(t)&&n>0&&n<t.nodeValue.length&&(t=al(t,n),n=0),vo.isText(r)&&o>0&&o<r.nodeValue.length&&(o=(r=al(r,o).previousSibling).nodeValue.length)),{startContainer:t,startOffset:n,endContainer:r,endOffset:o}}},ul=oi,cl="_mce_caret",ll=function(e){return 1===e.nodeType&&e.id===cl},fl=function(e){return function(e){for(var t=[];e;){if(3===e.nodeType&&e.nodeValue!==ul||e.childNodes.length>1)return[];1===e.nodeType&&t.push(e),e=e.firstChild}return t}(e).length>0},dl=function(e){var t;if(e)for(e=(t=new to(e,e)).current();e;e=t.next())if(3===e.nodeType)return e;return null},ml=function(e){var t=Hn.fromTag("span");return dr.setAll(t,{id:cl,"data-mce-bogus":"1","data-mce-type":"format-caret"}),e&&ks.append(t,Hn.fromText(ul)),t},pl=function(e,t){for(;t&&t!==e;){if(t.id===cl)return t;t=t.parentNode}return null},gl=function(e,t,n,r){var o,i,a,s;o=t.getRng(!0),i=e.getParent(n,e.isBlock),fl(n)?(!1!==r&&(o.setStartBefore(n),o.setEndBefore(n)),e.remove(n)):((s=dl(n))&&s.nodeValue.charAt(0)===ul&&s.deleteData(0,1),a=s,o.startContainer===a&&o.startOffset>0&&o.setStart(a,o.startOffset-1),o.endContainer===a&&o.endOffset>0&&o.setEnd(a,o.endOffset-1),e.remove(n,!0)),i&&e.isEmpty(i)&&Is(Hn.fromDom(i)),t.setRng(o)},hl=function(e,t,n,r,o){if(r)gl(t,n,r,o);else if(!(r=pl(e,n.getStart())))for(;r=t.get(cl);)gl(t,n,r,!1)},vl=function(e,t,n){var r=e.dom,o=r.getParent(n,ji.curry(Uc.isTextBlock,e));o&&r.isEmpty(o)?n.parentNode.replaceChild(t,n):(Ps(Hn.fromDom(n)),r.isEmpty(n)?n.parentNode.replaceChild(t,n):r.insertAfter(t,n))},yl=function(e,t){return e.appendChild(t),t},bl=function(e,t){var n=M.foldr(e,function(e,t){return yl(e,t.cloneNode(!1))},t);return yl(n,n.ownerDocument.createTextNode(ul))},Cl=function(e){var t=e.dom,n=e.selection,r=e.getBody();e.on("mouseup keydown",function(e){var o,i,a,s;o=r,i=t,a=n,s=e.keyCode,hl(o,i,a,null,!1),8===s&&a.isCollapsed()&&a.getStart().innerHTML===ul&&hl(o,i,a,pl(o,a.getStart())),37!==s&&39!==s||hl(o,i,a,pl(o,a.getStart()))})},xl=function(e,t,n){var r,o,i,a,s,u,c=e.selection;a=(r=c.getRng(!0)).startOffset,u=r.startContainer.nodeValue,(o=pl(e.getBody(),c.getStart()))&&(i=dl(o));var l,f,d=/[^\s\u00a0\u00ad\u200b\ufeff]/;u&&a>0&&a<u.length&&d.test(u.charAt(a))&&d.test(u.charAt(a-1))?(s=c.getBookmark(),r.collapse(!0),r=Qc(e,r,e.formatter.get(t)),r=sl.split(r),e.formatter.apply(t,n,r),c.moveToBookmark(s)):(o&&i.nodeValue===ul?e.formatter.apply(t,n,o):(l=e.getDoc(),f=ml(!0).dom(),i=(o=l.importNode(f,!0)).firstChild,r.insertNode(o),a=1,e.formatter.apply(t,n,o)),c.setCursorLocation(i,a))},wl=function(e,t,n,r){var o,i,a,s,u,c,l,f=e.dom,d=e.selection,m=[],p=d.getRng();for(o=p.startContainer,i=p.startOffset,u=o,3===o.nodeType&&(i!==o.nodeValue.length&&(s=!0),u=u.parentNode);u;){if(il.matchNode(e,u,t,n,r)){c=u;break}u.nextSibling&&(s=!0),m.push(u),u=u.parentNode}if(c)if(s){a=d.getBookmark(),p.collapse(!0);var g=Qc(e,p,e.formatter.get(t),!0);g=sl.split(g),e.formatter.remove(t,n,g),d.moveToBookmark(a)}else{l=pl(e.getBody(),c);var h=ml(!1).dom(),v=bl(m,h);vl(e,h,l||c),gl(f,d,l,!1),d.setCursorLocation(v,1),f.isEmpty(c)&&f.remove(c)}},Nl=ll,El=pl,Sl=function(e,t){var n=ml(!1),r=bl(t,n.dom());return ks.before(Hn.fromDom(e),n),Bs.remove(Hn.fromDom(e)),ia(r,0)},kl=function(e,t){return e.schema.getTextInlineElements().hasOwnProperty(Zn.name(t))&&!ll(t.dom())&&!vo.isBogus(t.dom())},Tl=function(e,t){for(var n=0;n<e.length;n++){var r=e[n].apply(null,t);if(r.isSome())return r}return E.none()},Al=Qu([{before:["element"]},{start:["element"]},{end:["element"]},{after:["element"]}]),_l=function(e,t){var n=_a.getParentBlock(t,e);return n||e},Bl=function(e,t,n){var r=vu.normalizeForwards(n),o=_l(t,r.container());return vu.findRootInline(e,o,r).fold(function(){return Ws.nextPosition(o,r).bind(y.curry(vu.findRootInline,e,o)).map(function(e){return Al.before(e)})},E.none)},Rl=function(e,t){return null===El(e,t)},Dl=function(e,t,n){return vu.findRootInline(e,t,n).filter(y.curry(Rl,t))},Ol=function(e,t,n){var r=vu.normalizeBackwards(n);return Dl(e,t,r).bind(function(e){return Ws.prevPosition(e,r).isNone()?E.some(Al.start(e)):E.none()})},Pl=function(e,t,n){var r=vu.normalizeForwards(n);return Dl(e,t,r).bind(function(e){return Ws.nextPosition(e,r).isNone()?E.some(Al.end(e)):E.none()})},Il=function(e,t,n){var r=vu.normalizeBackwards(n),o=_l(t,r.container());return vu.findRootInline(e,o,r).fold(function(){return Ws.prevPosition(o,r).bind(y.curry(vu.findRootInline,e,o)).map(function(e){return Al.after(e)})},E.none)},Ll=function(e){return!1===vu.isRtl(Fl(e))},Ml=function(e,t,n){return Tl([Bl,Ol,Pl,Il],[e,t,n]).filter(Ll)},Fl=function(e){return e.fold(y.identity,y.identity,y.identity,y.identity)},zl=function(e){return e.fold(y.constant("before"),y.constant("start"),y.constant("end"),y.constant("after"))},Ul=function(e){return e.fold(Al.before,Al.before,Al.after,Al.after)},Vl=function(e,t,n,r,o,i){return hs([vu.findRootInline(t,n,r),vu.findRootInline(t,n,o)],function(t,r){return t!==r&&vu.hasSameParentBlock(n,t,r)?Al.after(e?t:r):i}).getOr(i)},Hl=function(e,t){return e.fold(y.constant(!0),function(e){return r=t,!(zl(n=e)===zl(r)&&Fl(n)===Fl(r));var n,r})},ql=function(e,t){return e?t.fold(y.compose(E.some,Al.start),E.none,y.compose(E.some,Al.after),E.none):t.fold(E.none,y.compose(E.some,Al.before),E.none,y.compose(E.some,Al.end))},jl=function(e,t,n,r){var o=vu.normalizePosition(e,r),i=Ml(t,n,o);return Ml(t,n,o).bind(y.curry(ql,e)).orThunk(function(){return o=e,a=t,s=n,u=i,c=r,l=vu.normalizePosition(o,c),Ws.fromPosition(o,s,l).map(y.curry(vu.normalizePosition,o)).fold(function(){return u.map(Ul)},function(e){return Ml(a,s,e).map(y.curry(Vl,o,a,s,l,e)).filter(y.curry(Hl,u))}).filter(Ll);var o,a,s,u,c,l})},$l=Ml,Wl=jl,Kl=(y.curry(jl,!1),y.curry(jl,!0),Ul),Xl=function(e){return e.fold(Al.start,Al.start,Al.end,Al.end)},Yl=function(e){var t=e,n=function(){return t};return{get:n,set:function(e){t=e},clone:function(){return Yl(n())}}},Gl=function(e){return tr.isFunction(e.selection.getSel().modify)},Jl=function(e,t,n){var r=e?1:-1;return t.setRng(ia(n.container(),n.offset()+r).toRange()),t.getSel().modify("move",e?"forward":"backward","word"),!0},Ql=function(e,t){var n=t.selection.getRng(),r=e?ia.fromRangeEnd(n):ia.fromRangeStart(n);return!!Gl(t)&&(e&&mi.isBeforeInline(r)?Jl(!0,t.selection,r):!(e||!mi.isAfterInline(r))&&Jl(!1,t.selection,r))},Zl=function(e,t){var n=e.dom.createRng();n.setStart(t.container(),t.offset()),n.setEnd(t.container(),t.offset()),e.selection.setRng(n)},ef=function(e){return!1!==e.settings.inline_boundaries},tf=function(e,t){e?t.setAttribute("data-mce-selected","inline-boundary"):t.removeAttribute("data-mce-selected")},nf=function(e,t,n){return Lc(t,n).map(function(t){return Zl(e,t),n})},rf=function(e,t,n){return function(){return!!ef(t)&&Ql(e,t)}},of={move:function(e,t,n){return function(){return!!ef(e)&&(r=e,o=t,i=n,a=r.getBody(),s=ia.fromRangeStart(r.selection.getRng()),u=y.curry(vu.isInlineTarget,r),Wl(i,u,a,s).bind(function(e){return nf(r,o,e)})).isSome();var r,o,i,a,s,u}},moveNextWord:y.curry(rf,!0),movePrevWord:y.curry(rf,!1),setupSelectedState:function(e){var t=new Yl(null),n=y.curry(vu.isInlineTarget,e);return e.on("NodeChange",function(r){var o,i,a,s,u;ef(e)&&(o=n,i=e.dom,a=r.parents,s=M.filter(i.select('*[data-mce-selected="inline-boundary"]'),o),u=M.filter(a,o),M.each(M.difference(s,u),y.curry(tf,!1)),M.each(M.difference(u,s),y.curry(tf,!0)),function(e,t){if(e.selection.isCollapsed()&&!0!==e.composing&&t.get()){var n=ia.fromRangeStart(e.selection.getRng());ia.isTextPosition(n)&&!1===vu.isAtZwsp(n)&&(Zl(e,Oc.removeAndReposition(t.get(),n)),t.set(null))}}(e,t),function(e,t,n,r){if(t.selection.isCollapsed()){var o=M.filter(r,e);M.each(o,function(r){var o=ia.fromRangeStart(t.selection.getRng());$l(e,t.getBody(),o).bind(function(e){return nf(t,n,e)})})}}(n,e,t,r.parents))}),t},setCaretPosition:Zl},af=function(e,t){return function(n){return Lc(t,n).map(function(t){return of.setCaretPosition(e,t),!0}).getOr(!1)}},sf=function(e,t,n,r){var o=e.getBody(),i=y.curry(vu.isInlineTarget,e);e.undoManager.ignore(function(){var a,s,u;e.selection.setRng((a=n,s=r,(u=document.createRange()).setStart(a.container(),a.offset()),u.setEnd(s.container(),s.offset()),u)),e.execCommand("Delete"),$l(i,o,ia.fromRangeStart(e.selection.getRng())).map(Xl).map(af(e,t))}),e.nodeChanged()},uf=function(e,t,n,r){var o,i,a=(o=e.getBody(),i=r.container(),_a.getParentBlock(i,o)||o),s=y.curry(vu.isInlineTarget,e),u=$l(s,a,r);return u.bind(function(e){return n?e.fold(y.constant(E.some(Xl(e))),E.none,y.constant(E.some(Kl(e))),E.none):e.fold(E.none,y.constant(E.some(Kl(e))),E.none,y.constant(E.some(Xl(e))))}).map(af(e,t)).getOrThunk(function(){var o=Ws.navigate(n,a,r),i=o.bind(function(e){return $l(s,a,e)});return u.isSome()&&i.isSome()?vu.findRootInline(s,a,r).map(function(t){return r=t,!!hs([Ws.firstPositionIn(r),Ws.lastPositionIn(r)],function(e,t){var n=vu.normalizePosition(!0,e),o=vu.normalizePosition(!1,t);return Ws.nextPosition(r,n).map(function(e){return e.isEqual(o)}).getOr(!0)}).getOr(!0)&&(mc(e,n,Hn.fromDom(t)),!0);var r}).getOr(!1):i.bind(function(i){return o.map(function(o){return n?sf(e,t,r,o):sf(e,t,o,r),!0})}).getOr(!1)})},cf=function(e,t,n){if(e.selection.isCollapsed()&&!1!==e.settings.inline_boundaries){var r=ia.fromRangeStart(e.selection.getRng());return uf(e,t,n,r)}return!1},lf=xr("start","end"),ff=xr("rng","table","cells"),df=Qu([{removeTable:["element"]},{emptyCells:["cells"]}]),mf=function(e,t){return Eu(Hn.fromDom(e),"td,th",t)},pf=function(e,t){return wu(e,"table",t)},gf=function(e){return!1===Dr.eq(e.start(),e.end())},hf=function(e,t){return(n=e,r=t,pf(n.start(),r).bind(function(e){return pf(n.end(),r).bind(function(t){return Dr.eq(e,t)?E.some(e):E.none()})})).bind(function(t){var n=Os(t,"td,th");return ff(e,t,n)});var n,r},vf=function(e,t){var n,r,o=y.curry(Dr.eq,e);return(n=t,r=o,hs([mf(n.startContainer,r),mf(n.endContainer,r)],lf).filter(gf)).map(function(e){return hf(e,o)})},yf=function(e,t){return M.findIndex(e,function(e){return Dr.eq(e,t)})},bf=function(e){return(t=e,hs([yf(t.cells(),t.rng().start()),yf(t.cells(),t.rng().end())],function(e,n){return t.cells().slice(e,n+1)})).bind(function(t){var n=e.cells();return t.length===n.length?df.removeTable(e.table()):df.emptyCells(t)});var t},Cf=function(e,t){return vf(e,t).map(bf)},xf=function(e){var t=[];if(e)for(var n=0;n<e.rangeCount;n++)t.push(e.getRangeAt(n));return t},wf=xf,Nf=function(e){return M.bind(e,function(e){var t=Fi(e);return t?[Hn.fromDom(t)]:[]})},Ef=function(e){return xf(e).length>1},Sf=function(e){return M.filter(Nf(e),io.isTableCell)},kf=function(e){return Os(e,"td[data-mce-selected],th[data-mce-selected]")},Tf=function(e,t){var n=kf(t),r=Sf(e);return n.length>0?n:r},Af=Tf,_f=function(e){return Tf(wf(e.selection.getSel()),Hn.fromDom(e.getBody()))},Bf=function(e,t){return M.each(t,Is),e.selection.setCursorLocation(t[0].dom(),0),!0},Rf=function(e,t){return mc(e,!1,t),!0},Df=function(e,t,n,r){return Pf(t,r).fold(function(){return r=e,Cf(t,n).map(function(e){return e.fold(y.curry(Rf,r),y.curry(Bf,r))});var r},function(t){return If(e,t)}).getOr(!1)},Of=function(e,t){return M.find(Uu(t,e),io.isTableCell)},Pf=function(e,t){return M.find(Uu(t,e),function(e){return"caption"===Zn.name(e)})},If=function(e,t){return Is(t),e.selection.setCursorLocation(t.dom(),0),E.some(!0)},Lf=function(e,t,n,r,o){return Ws.navigate(n,e.getBody(),o).bind(function(i){return u=r,c=n,l=o,f=i,Ws.firstPositionIn(u.dom()).bind(function(e){return Ws.lastPositionIn(u.dom()).map(function(t){return c?l.isEqual(e)&&f.isEqual(t):l.isEqual(t)&&f.isEqual(e)})}).getOr(!0)?If(e,r):(a=r,s=i,Pf(t,Hn.fromDom(s.getNode())).map(function(e){return!1===Dr.eq(e,a)}));var a,s,u,c,l,f}).or(E.some(!0))},Mf=function(e,t,n,r){var o=ia.fromRangeStart(e.selection.getRng());return Of(n,r).bind(function(r){return Ru(r)?If(e,r):(i=e,a=n,s=t,u=r,c=o,Ws.navigate(s,i.getBody(),c).bind(function(e){return Of(a,Hn.fromDom(e.getNode())).map(function(e){return!1===Dr.eq(e,u)})}));var i,a,s,u,c})},Ff=function(e,t,n){var r=Hn.fromDom(e.getBody());return Pf(r,n).fold(function(){return Mf(e,t,r,n)},function(n){return o=e,i=t,a=r,s=n,u=ia.fromRangeStart(o.selection.getRng()),Ru(s)?If(o,s):Lf(o,a,i,s,u);var o,i,a,s,u}).getOr(!1)},zf=function(e,t){var n,r,o,i,a,s=Hn.fromDom(e.selection.getStart(!0));return e.selection.isCollapsed()?Ff(e,t,s):(n=e,r=s,o=Hn.fromDom(n.getBody()),i=n.selection.getRng(),0!==(a=_f(n)).length?Bf(n,a):Df(n,o,i,r))},Uf=function(e,t){e.getDoc().execCommand(t,!1,null)},Vf=function(e){hc(e,!1)||cf(e,!1)||Ku(e,!1)||zf(e)||Ju(e,!1)||(Uf(e,"Delete"),bu(e))},Hf=function(e){hc(e,!0)||cf(e,!0)||Ku(e,!0)||zf(e)||Ju(e,!0)||Uf(e,"ForwardDelete")},qf=function(e,t){return e&&t&&e.startContainer===t.startContainer&&e.startOffset===t.startOffset&&e.endContainer===t.endContainer&&e.endOffset===t.endOffset},jf=xr("container","offset"),$f=function(e,t,n){return null!==function(e,t,n){for(;e&&e!==t;){if(n(e))return e;e=e.parentNode}return null}(e,t,n)},Wf=function(e,t,n){return $f(e,t,function(e){return e.nodeName===n})},Kf=function(e){return e&&"TABLE"===e.nodeName},Xf=function(e,t,n){for(var r=new to(t,e.getParent(t.parentNode,e.isBlock)||e.getRoot());t=r[n?"prev":"next"]();)if(vo.isBr(t))return!0},Yf=function(e,t,n,r,o){var i,a,s,u,c,l,f=e.getRoot(),d=e.schema.getNonEmptyElements();if(s=e.getParent(o.parentNode,e.isBlock)||f,r&&vo.isBr(o)&&t&&e.isEmpty(s))return E.some(jf(o.parentNode,e.nodeIndex(o)));for(i=new to(o,s);u=i[r?"prev":"next"]();){if("false"===e.getContentEditableParent(u)||(c=u,l=f,mi.isCaretContainer(c)&&!1===$f(c,l,Nl)))return E.none();if(vo.isText(u)&&u.nodeValue.length>0)return!1===Wf(u,f,"A")?E.some(jf(u,r?u.nodeValue.length:0)):E.none();if(e.isBlock(u)||d[u.nodeName.toLowerCase()])return E.none();a=u}return n&&a?E.some(jf(a,0)):E.none()},Gf=function(e,t,n,r){var o,i,a,s,u,c,l,f,d,m,p=e.getRoot(),g=!1;if(o=r[(n?"start":"end")+"Container"],i=r[(n?"start":"end")+"Offset"],l=vo.isElement(o)&&i===o.childNodes.length,u=e.schema.getNonEmptyElements(),c=n,mi.isCaretContainer(o))return E.none();if(vo.isElement(o)&&i>o.childNodes.length-1&&(c=!1),vo.isDocument(o)&&(o=p,i=0),o===p){if(c&&(s=o.childNodes[i>0?i-1:0])){if(mi.isCaretContainer(s))return E.none();if(u[s.nodeName]||Kf(s))return E.none()}if(o.hasChildNodes()){if(i=Math.min(!c&&i>0?i-1:i,o.childNodes.length-1),o=o.childNodes[i],i=vo.isText(o)&&l?o.data.length:0,!t&&o===p.lastChild&&Kf(o))return E.none();if(function(e,t){for(;t&&t!==e;){if(vo.isContentEditableFalse(t))return!0;t=t.parentNode}return!1}(p,o)||mi.isCaretContainer(o))return E.none();if(o.hasChildNodes()&&!1===Kf(o)){s=o,a=new to(o,p);do{if(vo.isContentEditableFalse(s)||mi.isCaretContainer(s)){g=!1;break}if(vo.isText(s)&&s.nodeValue.length>0){i=c?0:s.nodeValue.length,o=s,g=!0;break}if(u[s.nodeName.toLowerCase()]&&(!(f=s)||!/^(TD|TH|CAPTION)$/.test(f.nodeName))){i=e.nodeIndex(s),o=s.parentNode,"IMG"!==s.nodeName&&"PRE"!==s.nodeName||c||i++,g=!0;break}}while(s=c?a.next():a.prev())}}}return t&&(vo.isText(o)&&0===i&&Yf(e,l,t,!0,o).each(function(e){o=e.container(),i=e.offset(),g=!0}),vo.isElement(o)&&((s=o.childNodes[i])||(s=o.childNodes[i-1]),!s||!vo.isBr(s)||(m="A",(d=s).previousSibling&&d.previousSibling.nodeName===m)||Xf(e,s,!1)||Xf(e,s,!0)||Yf(e,l,t,!0,s).each(function(e){o=e.container(),i=e.offset(),g=!0}))),c&&!t&&vo.isText(o)&&i===o.nodeValue.length&&Yf(e,l,t,!1,o).each(function(e){o=e.container(),i=e.offset(),g=!0}),g?E.some(jf(o,i)):E.none()},Jf={normalize:function(e,t){var n=t.collapsed,r=t.cloneRange();return Gf(e,n,!0,r).each(function(e){r.setStart(e.container(),e.offset())}),n||Gf(e,n,!1,r).each(function(e){r.setEnd(e.container(),e.offset())}),n&&r.collapse(!0),qf(t,r)?E.none():E.some(r)}},Qf=function(e,t,n){var r=e.create("span",{},"&nbsp;");n.parentNode.insertBefore(r,n),t.scrollIntoView(r),e.remove(r)},Zf=function(e,t,n,r){var o=e.createRng();r?(o.setStartBefore(n),o.setEndBefore(n)):(o.setStartAfter(n),o.setEndAfter(n)),t.setRng(o)},ed=function(e,t){var n,r,o=e.selection,i=e.dom,a=o.getRng();Jf.normalize(i,a).each(function(e){a.setStart(e.startContainer,e.startOffset),a.setEnd(e.endContainer,e.endOffset)});var s=a.startOffset,u=a.startContainer;if(1===u.nodeType&&u.hasChildNodes()){var c=s>u.childNodes.length-1;u=u.childNodes[Math.min(s,u.childNodes.length-1)]||u,s=c&&3===u.nodeType?u.nodeValue.length:0}var l=i.getParent(u,i.isBlock),f=l?i.getParent(l.parentNode,i.isBlock):null,d=f?f.nodeName.toUpperCase():"",m=t&&t.ctrlKey;"LI"!==d||m||(l=f),u&&3===u.nodeType&&s>=u.nodeValue.length&&(function(e,t,n){for(var r,o=new to(t,n),i=e.getNonEmptyElements();r=o.next();)if(i[r.nodeName.toLowerCase()]||r.length>0)return!0}(e.schema,u,l)||(n=i.create("br"),a.insertNode(n),a.setStartAfter(n),a.setEndAfter(n),r=!0)),n=i.create("br"),a.insertNode(n),Qf(i,o,n),Zf(i,o,n,r),e.undoManager.add()},td=function(e,t){var n=Hn.fromTag("br");ks.before(Hn.fromDom(t),n),e.undoManager.add()},nd=function(e,t){rd(e.getBody(),t)||ks.after(Hn.fromDom(t),Hn.fromTag("br"));var n=Hn.fromTag("br");ks.after(Hn.fromDom(t),n),Qf(e.dom,e.selection,n.dom()),Zf(e.dom,e.selection,n.dom(),!1),e.undoManager.add()},rd=function(e,t){return n=ia.after(t),!!vo.isBr(n.getNode())||Ws.nextPosition(e,ia.after(t)).map(function(e){return vo.isBr(e.getNode())}).getOr(!1);var n},od=function(e){return e&&"A"===e.nodeName&&"href"in e},id=function(e){return e.fold(y.constant(!1),od,od,y.constant(!1))},ad=function(e,t){t.fold(y.noop,y.curry(td,e),y.curry(nd,e),y.noop)},sd=function(e,t){var n,r,o,i=(n=e,r=y.curry(vu.isInlineTarget,n),o=ia.fromRangeStart(n.selection.getRng()),$l(r,n.getBody(),o).filter(id));i.isSome()?i.each(y.curry(ad,e)):ed(e,t)},ud=Qu([{before:["element"]},{on:["element","offset"]},{after:["element"]}]),cd=(ud.before,ud.on,ud.after,function(e){return e.fold(y.identity,y.identity,y.identity)}),ld=Qu([{domRange:["rng"]},{relative:["startSitu","finishSitu"]},{exact:["start","soffset","finish","foffset"]}]),fd=xr("start","soffset","finish","foffset"),dd={domRange:ld.domRange,relative:ld.relative,exact:ld.exact,exactFromRange:function(e){return ld.exact(e.start(),e.soffset(),e.finish(),e.foffset())},range:fd,getWin:function(e){var t=e.match({domRange:function(e){return Hn.fromDom(e.startContainer)},relative:function(e,t){return cd(e)},exact:function(e,t,n,r){return e}});return Ur.defaultView(t)}},md=Un.detect().browser,pd=function(e,t){var n=Zn.isText(t)?Ds(t).length:Ur.children(t).length+1;return e>n?n:e<0?0:e},gd=function(e){return dd.range(e.start(),pd(e.soffset(),e.start()),e.finish(),pd(e.foffset(),e.finish()))},hd=function(e,t){return Dr.contains(e,t)||Dr.eq(e,t)},vd=function(e){return function(t){return hd(e,t.start())&&hd(e,t.finish())}},yd=function(e){return!0===e.inline||md.isIE()},bd=function(e){return dd.range(Hn.fromDom(e.startContainer),e.startOffset,Hn.fromDom(e.endContainer),e.endOffset)},Cd=function(e){var t=e.getSelection();return(t&&0!==t.rangeCount?E.from(t.getRangeAt(0)):E.none()).map(bd)},xd=function(e){var t=Ur.defaultView(e);return Cd(t.dom()).filter(vd(e))},wd=function(e,t){return E.from(t).filter(vd(e)).map(gd)},Nd=function(e){var t=document.createRange();return t.setStart(e.start().dom(),e.soffset()),t.setEnd(e.finish().dom(),e.foffset()),E.some(t)},Ed=function(e){return(e.bookmark?e.bookmark:E.none()).bind(y.curry(wd,Hn.fromDom(e.getBody()))).bind(Nd)},Sd=function(e){var t=yd(e)?xd(Hn.fromDom(e.getBody())):E.none();e.bookmark=t.isSome()?t:e.bookmark},kd=function(e){Ed(e).each(function(t){e.selection.setRng(t)})},Td=Ed,Ad=Ot.each,_d=Ot.extend,Bd=Ot.map,Rd=Ot.inArray,Dd=Ot.explode,Od=function(e){var t,n,r,o,i={state:{},exec:{},value:{}},a=e.settings;e.on("PreInit",function(){t=e.dom,n=e.selection,a=e.settings,r=e.formatter});var s=function(t){var n;if(!e.quirks.isHidden()&&!e.removed){if(t=t.toLowerCase(),n=i.state[t])return n(t);try{return e.getDoc().queryCommandState(t)}catch(r){}return!1}},u=function(e,t){t=t||"exec",Ad(e,function(e,n){Ad(n.toLowerCase().split(","),function(n){i[t][n]=e})})};_d(this,{execCommand:function(t,n,r,o){var a,s,u=!1;if(!e.removed){if(/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint)$/.test(t)||o&&o.skip_focus?kd(e):e.focus(),(o=e.fire("BeforeExecCommand",{command:t,ui:n,value:r})).isDefaultPrevented())return!1;if(s=t.toLowerCase(),a=i.exec[s])return a(s,n,r),e.fire("ExecCommand",{command:t,ui:n,value:r}),!0;if(Ad(e.plugins,function(o){if(o.execCommand&&o.execCommand(t,n,r))return e.fire("ExecCommand",{command:t,ui:n,value:r}),u=!0,!1}),u)return u;if(e.theme&&e.theme.execCommand&&e.theme.execCommand(t,n,r))return e.fire("ExecCommand",{command:t,ui:n,value:r}),!0;try{u=e.getDoc().execCommand(t,n,r)}catch(c){}return!!u&&(e.fire("ExecCommand",{command:t,ui:n,value:r}),!0)}},queryCommandState:s,queryCommandValue:function(t){var n;if(!e.quirks.isHidden()&&!e.removed){if(t=t.toLowerCase(),n=i.value[t])return n(t);try{return e.getDoc().queryCommandValue(t)}catch(r){}}},queryCommandSupported:function(t){if(t=t.toLowerCase(),i.exec[t])return!0;try{return e.getDoc().queryCommandSupported(t)}catch(n){}return!1},addCommands:u,addCommand:function(t,n,r){t=t.toLowerCase(),i.exec[t]=function(t,o,i,a){return n.call(r||e,o,i,a)}},addQueryStateHandler:function(t,n,r){t=t.toLowerCase(),i.state[t]=function(){return n.call(r||e)}},addQueryValueHandler:function(t,n,r){t=t.toLowerCase(),i.value[t]=function(){return n.call(r||e)}},hasCustomCommand:function(e){return e=e.toLowerCase(),!!i.exec[e]}});var c=function(t,n,r){return n===undefined&&(n=!1),r===undefined&&(r=null),e.getDoc().execCommand(t,n,r)},l=function(e){return r.match(e)},f=function(t,n){r.toggle(t,n?{value:n}:undefined),e.nodeChanged()},d=function(e){o=n.getBookmark(e)},m=function(){n.moveToBookmark(o)};u({"mceResetDesignMode,mceBeginUndoLevel":function(){},"mceEndUndoLevel,mceAddUndoLevel":function(){e.undoManager.add()},"Cut,Copy,Paste":function(t){var n,r=e.getDoc();try{c(t)}catch(i){n=!0}if("paste"!==t||r.queryCommandEnabled(t)||(n=!0),n||!r.queryCommandSupported(t)){var o=e.translate("Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead.");me.mac&&(o=o.replace(/Ctrl\+/g,"\u2318+")),e.notificationManager.open({text:o,type:"error"})}},unlink:function(){if(n.isCollapsed()){var t=e.dom.getParent(e.selection.getStart(),"a");t&&e.dom.remove(t,!0)}else r.remove("link")},"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull,JustifyNone":function(e){var t=e.substring(7);"full"===t&&(t="justify"),Ad("left,center,right,justify".split(","),function(e){t!==e&&r.remove("align"+e)}),"none"!==t&&f("align"+t)},"InsertUnorderedList,InsertOrderedList":function(e){var r,o;c(e),(r=t.getParent(n.getNode(),"ol,ul"))&&(o=r.parentNode,/^(H[1-6]|P|ADDRESS|PRE)$/.test(o.nodeName)&&(d(),t.split(o,r),m()))},"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(e){f(e)},"ForeColor,HiliteColor,FontName":function(e,t,n){f(e,n)},FontSize:function(e,t,n){var r,o;n>=1&&n<=7&&(o=Dd(a.font_size_style_values),n=(r=Dd(a.font_size_classes))?r[n-1]||n:o[n-1]||n),f(e,n)},RemoveFormat:function(e){r.remove(e)},mceBlockQuote:function(){f("blockquote")},FormatBlock:function(e,t,n){return f(n||"p")},mceCleanup:function(){var t=n.getBookmark();e.setContent(e.getContent({cleanup:!0}),{cleanup:!0}),n.moveToBookmark(t)},mceRemoveNode:function(t,r,o){var i=o||n.getNode();i!==e.getBody()&&(d(),e.dom.remove(i,!0),m())},mceSelectNodeDepth:function(r,o,i){var a=0;t.getParent(n.getNode(),function(e){if(1===e.nodeType&&a++===i)return n.select(e),!1},e.getBody())},mceSelectNode:function(e,t,r){n.select(r)},mceInsertContent:function(t,n,r){Js(e,r)},mceInsertRawHTML:function(t,r,o){n.setContent("tiny_mce_marker"),e.setContent(e.getContent().replace(/tiny_mce_marker/g,function(){return o}))},mceToggleFormat:function(e,t,n){f(n)},mceSetContent:function(t,n,r){e.setContent(r)},"Indent,Outdent":function(o){var i,u,l;i=a.indentation,u=/[a-z%]+$/i.exec(i),i=parseInt(i,10),s("InsertUnorderedList")||s("InsertOrderedList")?c(o):(a.forced_root_block||t.getParent(n.getNode(),t.isBlock)||r.apply("div"),Ad(n.getSelectedBlocks(),function(n){if("false"!==t.getContentEditable(n)&&"LI"!==n.nodeName){var r=e.getParam("indent_use_margin",!1)?"margin":"padding";r="TABLE"===n.nodeName?"margin":r,r+="rtl"===t.getStyle(n,"direction",!0)?"Right":"Left","outdent"===o?(l=Math.max(0,parseInt(n.style[r]||0,10)-i),t.setStyle(n,r,l?l+u:"")):(l=parseInt(n.style[r]||0,10)+i+u,t.setStyle(n,r,l))}}))},mceRepaint:function(){},InsertHorizontalRule:function(){e.execCommand("mceInsertContent",!1,"<hr />")},mceToggleVisualAid:function(){e.hasVisual=!e.hasVisual,e.addVisual()},mceReplaceContent:function(t,r,o){e.execCommand("mceInsertContent",!1,o.replace(/\{\$selection\}/g,n.getContent({format:"text"})))},mceInsertLink:function(e,o,i){var a;"string"==typeof i&&(i={href:i}),a=t.getParent(n.getNode(),"a"),i.href=i.href.replace(" ","%20"),a&&i.href||r.remove("link"),i.href&&r.apply("link",i,a)},selectAll:function(){var e=t.getParent(n.getStart(),vo.isContentEditableTrue);if(e){var r=t.createRng();r.selectNodeContents(e),n.setRng(r)}},"delete":function(){Vf(e)},forwardDelete:function(){Hf(e)},mceNewDocument:function(){e.setContent("")},InsertLineBreak:function(t,n,r){return sd(e,r),!0}}),u({"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull":function(e){var o="align"+e.substring(7),i=n.isCollapsed()?[t.getParent(n.getNode(),t.isBlock)]:n.getSelectedBlocks(),a=Bd(i,function(e){return!!r.matchNode(e,o)});return-1!==Rd(a,!0)},"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(e){return l(e)},mceBlockQuote:function(){return l("blockquote")},Outdent:function(){var e;if(a.inline_styles){if((e=t.getParent(n.getStart(),t.isBlock))&&parseInt(e.style.paddingLeft,10)>0)return!0;if((e=t.getParent(n.getEnd(),t.isBlock))&&parseInt(e.style.paddingLeft,10)>0)return!0}return s("InsertUnorderedList")||s("InsertOrderedList")||!a.inline_styles&&!!t.getParent(n.getNode(),"BLOCKQUOTE")},"InsertUnorderedList,InsertOrderedList":function(e){var r=t.getParent(n.getNode(),"ul,ol");return r&&("insertunorderedlist"===e&&"UL"===r.tagName||"insertorderedlist"===e&&"OL"===r.tagName)}},"state"),u({"FontSize,FontName":function(e){var r,o=0;return(r=t.getParent(n.getNode(),"span"))&&(o="fontsize"===e?r.style.fontSize:r.style.fontFamily.replace(/, /g,",").replace(/[\'\"]/g,"").toLowerCase()),o}},"value"),u({Undo:function(){e.undoManager.undo()},Redo:function(){e.undoManager.redo()}})},Pd=Ot.makeMap("focus blur focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange mouseout mouseenter mouseleave wheel keydown keypress keyup input contextmenu dragstart dragend dragover draggesture dragdrop drop drag submit compositionstart compositionend compositionupdate touchstart touchmove touchend"," "),Id=function(e){var t,n,r=this,o={},i=function(){return!1},a=function(){return!0};t=(e=e||{}).scope||r,n=e.toggleEvent||i;var s=function(e,t,a,s){var u,c,l;if(!1===t&&(t=i),t)for(t={func:t},s&&Ot.extend(t,s),l=(c=e.toLowerCase().split(" ")).length;l--;)e=c[l],(u=o[e])||(u=o[e]=[],n(e,!0)),a?u.unshift(t):u.push(t);return r},u=function(e,t){var i,a,s,u,c;if(e)for(i=(u=e.toLowerCase().split(" ")).length;i--;){if(e=u[i],a=o[e],!e){for(s in o)n(s,!1),delete o[s];return r}if(a){if(t)for(c=a.length;c--;)a[c].func===t&&(a=a.slice(0,c).concat(a.slice(c+1)),o[e]=a);else a.length=0;a.length||(n(e,!1),delete o[e])}}else{for(e in o)n(e,!1);o={}}return r};r.fire=function(n,r){var s,c,l,f;if(n=n.toLowerCase(),(r=r||{}).type=n,r.target||(r.target=t),r.preventDefault||(r.preventDefault=function(){r.isDefaultPrevented=a},r.stopPropagation=function(){r.isPropagationStopped=a},r.stopImmediatePropagation=function(){r.isImmediatePropagationStopped=a},r.isDefaultPrevented=i,r.isPropagationStopped=i,r.isImmediatePropagationStopped=i),e.beforeFire&&e.beforeFire(r),s=o[n])for(c=0,l=s.length;c<l;c++){if((f=s[c]).once&&u(n,f.func),r.isImmediatePropagationStopped())return r.stopPropagation(),r;if(!1===f.func.call(t,r))return r.preventDefault(),r}return r},r.on=s,r.off=u,r.once=function(e,t,n){return s(e,t,n,{once:!0})},r.has=function(e){return e=e.toLowerCase(),!(!o[e]||0===o[e].length)}};Id.isNative=function(e){return!!Pd[e.toLowerCase()]};var Ld,Md=function(e){return e._eventDispatcher||(e._eventDispatcher=new Id({scope:e,toggleEvent:function(t,n){Id.isNative(t)&&e.toggleNativeEvent&&e.toggleNativeEvent(t,n)}})),e._eventDispatcher},Fd={fire:function(e,t,n){if(this.removed&&"remove"!==e)return t;if(t=Md(this).fire(e,t,n),!1!==n&&this.parent)for(var r=this.parent();r&&!t.isPropagationStopped();)r.fire(e,t,!1),r=r.parent();return t},on:function(e,t,n){return Md(this).on(e,t,n)},off:function(e,t){return Md(this).off(e,t)},once:function(e,t){return Md(this).once(e,t)},hasEventListeners:function(e){return Md(this).has(e)}},zd=Xo.DOM,Ud=function(e,t){return"selectionchange"===t?e.getDoc():!e.inline&&/^mouse|touch|click|contextmenu|drop|dragover|dragend/.test(t)?e.getDoc().documentElement:e.settings.event_root?(e.eventRoot||(e.eventRoot=zd.select(e.settings.event_root)[0]),e.eventRoot):e.getBody()},Vd=function(e,t){var n,r,o=function(e){return!e.hidden&&!e.readonly};if(e.delegates||(e.delegates={}),!e.delegates[t]&&!e.removed)if(n=Ud(e,t),e.settings.event_root){if(Ld||(Ld={},e.editorManager.on("removeEditor",function(){var t;if(!e.editorManager.activeEditor&&Ld){for(t in Ld)e.dom.unbind(Ud(e,t));Ld=null}})),Ld[t])return;r=function(n){for(var r=n.target,i=e.editorManager.get(),a=i.length;a--;){var s=i[a].getBody();(s===r||zd.isChildOf(r,s))&&o(i[a])&&i[a].fire(t,n)}},Ld[t]=r,zd.bind(n,t,r)}else r=function(n){o(e)&&e.fire(t,n)},zd.bind(n,t,r),e.delegates[t]=r},Hd={bindPendingEventDelegates:function(){var e=this;Ot.each(e._pendingNativeEvents,function(t){Vd(e,t)})},toggleNativeEvent:function(e,t){var n=this;"focus"!==e&&"blur"!==e&&(t?n.initialized?Vd(n,e):n._pendingNativeEvents?n._pendingNativeEvents.push(e):n._pendingNativeEvents=[e]:n.initialized&&(n.dom.unbind(Ud(n,e),e,n.delegates[e]),delete n.delegates[e]))},unbindAllNativeEvents:function(){var e,t=this;if(t.delegates){for(e in t.delegates)t.dom.unbind(Ud(t,e),e,t.delegates[e]);delete t.delegates}t.inline||(t.getBody().onload=null,t.dom.unbind(t.getWin()),t.dom.unbind(t.getDoc())),t.dom.unbind(t.getBody()),t.dom.unbind(t.getContainer())}},qd=Hd=Ot.extend({},Fd,Hd),jd=function(e,t,n){try{e.getDoc().execCommand(t,!1,n)}catch(r){}},$d=function(e,t){var n,r,o;e._clickBlocker&&(e._clickBlocker.unbind(),e._clickBlocker=null),t?(e._clickBlocker=(r=(n=e).getBody(),o=function(e){n.dom.getParents(e.target,"a").length>0&&e.preventDefault()},n.dom.bind(r,"click",o),{unbind:function(){n.dom.unbind(r,"click",o)}}),e.selection.controlSelection.hideResizeRect(),e.readonly=!0,e.getBody().contentEditable=!1):(e.readonly=!1,e.getBody().contentEditable=!0,jd(e,"StyleWithCSS",!1),jd(e,"enableInlineTableEditing",!1),jd(e,"enableObjectResizing",!1),e.focus(),e.nodeChanged())},Wd=function(e,t){var n=e.readonly?"readonly":"design";t!==n&&(e.initialized?$d(e,"readonly"===t):e.on("init",function(){$d(e,"readonly"===t)}),e.fire("SwitchMode",{mode:t}))},Kd=Ot.each,Xd=Ot.explode,Yd={f9:120,f10:121,f11:122},Gd=Ot.makeMap("alt,ctrl,shift,meta,access"),Jd=function(e){var t={},n=[],r=function(e){var t,n,r={};for(n in Kd(Xd(e,"+"),function(e){e in Gd?r[e]=!0:/^[0-9]{2,}$/.test(e)?r.keyCode=parseInt(e,10):(r.charCode=e.charCodeAt(0),r.keyCode=Yd[e]||e.toUpperCase().charCodeAt(0))}),t=[r.keyCode],Gd)r[n]?t.push(n):r[n]=!1;return r.id=t.join(","),r.access&&(r.alt=!0,me.mac?r.ctrl=!0:r.shift=!0),r.meta&&(me.mac?r.meta=!0:(r.ctrl=!0,r.meta=!1)),r},o=function(t,n,o,i){var a;return(a=Ot.map(Xd(t,">"),r))[a.length-1]=Ot.extend(a[a.length-1],{func:o,scope:i||e}),Ot.extend(a[0],{desc:e.translate(n),subpatterns:a.slice(1)})},i=function(e,t){return!!t&&t.ctrl===e.ctrlKey&&t.meta===e.metaKey&&t.alt===e.altKey&&t.shift===e.shiftKey&&!!(e.keyCode===t.keyCode||e.charCode&&e.charCode===t.charCode)&&(e.preventDefault(),!0)},a=function(e){return e.func?e.func.call(e.scope):null};e.on("keyup keypress keydown",function(e){var r,o;((o=e).altKey||o.ctrlKey||o.metaKey||"keydown"===(r=e).type&&r.keyCode>=112&&r.keyCode<=123)&&!e.isDefaultPrevented()&&(Kd(t,function(t){if(i(e,t))return n=t.subpatterns.slice(0),"keydown"===e.type&&a(t),!0}),i(e,n[0])&&(1===n.length&&"keydown"===e.type&&a(n[0]),n.shift()))}),this.add=function(n,r,i,a){var s;return s=i,"string"==typeof i?i=function(){e.execCommand(s,!1,null)}:Ot.isArray(s)&&(i=function(){e.execCommand(s[0],s[1],s[2])}),Kd(Xd(Ot.trim(n.toLowerCase())),function(e){var n=o(e,r,i,a);t[n.id]=n}),!0},this.remove=function(e){var n=o(e);return!!t[n.id]&&(delete t[n.id],!0)}},Qd=Ot.each,Zd=function(e,t,n){var r,o,i,a,s=1;for(a=e.getShortEndedElements(),(i=/<([!?\/])?([A-Za-z0-9\-_\:\.]+)((?:\s+[^"\'>]+(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>]*))*|\/|\s+)>/g).lastIndex=r=n;o=i.exec(t);){if(r=i.lastIndex,"/"===o[1])s--;else if(!o[1]){if(o[2]in a)continue;s++}if(0===s)break}return r},em=function(e,t){var n=this,r=function(){};e=e||{},n.schema=t=t||Fo(),!1!==e.fix_self_closing&&(e.fix_self_closing=!0),Qd("comment cdata text start end pi doctype".split(" "),function(t){t&&(n[t]=e[t]||r)}),n.parse=function(n){var r,o,i,a,s,u,c,l,f,d,m,p,g,h,v,y,b,C,x,w,N,E,S,k,T,A,_,B,R,D=this,O=0,P=[],I=0,L=Ao.decode,M=Ot.makeMap("src,href,data,background,formaction,poster"),F=/((java|vb)script|mhtml):/i,z=/^data:/i,U=function(e){var t,n;for(t=P.length;t--&&P[t].name!==e;);if(t>=0){for(n=P.length-1;n>=t;n--)(e=P[n]).valid&&D.end(e.name);P.length=t}},V=function(t,n,r,o,i){var s,u,c;if(r=(n=n.toLowerCase())in m?n:L(r||o||i||""),g&&!l&&0==(0===(c=n).indexOf("data-")||0===c.indexOf("aria-"))){if(!(s=C[n])&&x){for(u=x.length;u--&&!(s=x[u]).pattern.test(n););-1===u&&(s=null)}if(!s)return;if(s.validValues&&!(r in s.validValues))return}if(M[n]&&!e.allow_script_urls){var f=r.replace(/[\s\u0000-\u001F]+/g,"");try{f=decodeURIComponent(f)}catch(d){f=unescape(f)}if(F.test(f))return;if(!e.allow_html_data_urls&&z.test(f)&&!/^data:image\//i.test(f))return}l&&(n in M||0===n.indexOf("on"))||(a.map[n]=r,a.push({name:n,value:r}))};for(T=new RegExp("<(?:(?:!--([\\w\\W]*?)--\x3e)|(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|(?:!DOCTYPE([\\w\\W]*?)>)|(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|(?:\\/([A-Za-z][A-Za-z0-9\\-_\\:\\.]*)>)|(?:([A-Za-z][A-Za-z0-9\\-_\\:\\.]*)((?:\\s+[^\"'>]+(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>]*))*|\\/|\\s+)>))","g"),A=/([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:[^\"])*)\")|(?:\'((?:[^\'])*)\')|([^>\s]+)))?/g,d=t.getShortEndedElements(),k=e.self_closing_elements||t.getSelfClosingElements(),m=t.getBoolAttrs(),g=e.validate,f=e.remove_internals,R=e.fix_self_closing,_=t.getSpecialElements(),S=n+">";r=T.exec(S);){if(O<r.index&&D.text(L(n.substr(O,r.index-O))),o=r[6])":"===(o=o.toLowerCase()).charAt(0)&&(o=o.substr(1)),U(o);else if(o=r[7]){if(r.index+r[0].length>n.length){D.text(L(n.substr(r.index))),O=r.index+r[0].length;continue}if(":"===(o=o.toLowerCase()).charAt(0)&&(o=o.substr(1)),p=o in d,R&&k[o]&&P.length>0&&P[P.length-1].name===o&&U(o),!g||(h=t.getElementRule(o))){if(v=!0,g&&(C=h.attributes,x=h.attributePatterns),(b=r[8])?((l=-1!==b.indexOf("data-mce-type"))&&f&&(v=!1),(a=[]).map={},b.replace(A,V)):(a=[]).map={},g&&!l){if(w=h.attributesRequired,N=h.attributesDefault,E=h.attributesForced,h.removeEmptyAttrs&&!a.length&&(v=!1),E)for(s=E.length;s--;)c=(y=E[s]).name,"{$uid}"===(B=y.value)&&(B="mce_"+I++),a.map[c]=B,a.push({name:c,value:B});if(N)for(s=N.length;s--;)(c=(y=N[s]).name)in a.map||("{$uid}"===(B=y.value)&&(B="mce_"+I++),a.map[c]=B,a.push({name:c,value:B}));if(w){for(s=w.length;s--&&!(w[s]in a.map););-1===s&&(v=!1)}if(y=a.map["data-mce-bogus"]){if("all"===y){O=Zd(t,n,T.lastIndex),T.lastIndex=O;continue}v=!1}}v&&D.start(o,a,p)}else v=!1;if(i=_[o]){i.lastIndex=O=r.index+r[0].length,(r=i.exec(n))?(v&&(u=n.substr(O,r.index-O)),O=r.index+r[0].length):(u=n.substr(O),O=n.length),v&&(u.length>0&&D.text(u,!0),D.end(o)),T.lastIndex=O;continue}p||(b&&b.indexOf("/")===b.length-1?v&&D.end(o):P.push({name:o,valid:v}))}else(o=r[1])?(">"===o.charAt(0)&&(o=" "+o),e.allow_conditional_comments||"[if"!==o.substr(0,3).toLowerCase()||(o=" "+o),D.comment(o)):(o=r[2])?D.cdata(o.replace(/<!--|-->/g,"")):(o=r[3])?D.doctype(o):(o=r[4])&&D.pi(o,r[5]);O=r.index+r[0].length}for(O<n.length&&D.text(L(n.substr(O))),s=P.length-1;s>=0;s--)(o=P[s]).valid&&D.end(o.name)}};em.findEndTag=Zd;var tm,nm,rm=function(e,t){var n,r,o,i,a,s,u,c,l=t,f=/<(\w+) [^>]*data-mce-bogus="all"[^>]*>/g,d=e.schema;for(s=e.getTempAttrs(),u=l,c=new RegExp(["\\s?("+s.join("|")+')="[^"]+"'].join("|"),"gi"),l=u.replace(c,""),a=d.getShortEndedElements();i=f.exec(l);)r=f.lastIndex,o=i[0].length,n=a[i[1]]?r:em.findEndTag(d,l,r),l=l.substring(0,r-o)+l.substring(n),f.lastIndex=r-o;return l},om=function(e,t){return ii(rm(e,t))},im=rm,am=function(e){var t=e!==undefined?e.dom():document;return E.from(t.activeElement).map(Hn.fromDom)},sm=function(e){var t=Ur.owner(e).dom();return e.dom()===t.activeElement},um=function(e){return am(Ur.owner(e)).filter(function(t){return e.dom().contains(t.dom())})},cm=function(e,t){return(n=t,n.collapsed?E.from(zi(n.startContainer,n.startOffset)).map(Hn.fromDom):E.none()).bind(function(t){return io.isTableSection(t)?E.some(t):!1===Dr.contains(e,t)?E.some(e):E.none()});var n},lm=function(e,t){cm(Hn.fromDom(e.getBody()),t).bind(function(e){return Ws.firstPositionIn(e.dom())}).fold(function(){e.selection.normalize()},function(t){e.selection.setRng(t.toRange())})},fm=function(e){if(e.setActive)try{e.setActive()}catch(t){e.focus()}else e.focus()},dm=function(e){var t,n=e.getBody();return n&&(t=Hn.fromDom(n),sm(t)||um(t).isSome())},mm=function(e){return e.inline?dm(e):(t=e).iframeElement&&sm(Hn.fromDom(t.iframeElement));var t},pm=function(e){e.editorManager.setActive(e)},gm=function(e,t){e.removed||(t?pm(e):function(e){var t,n,r,o=e.selection,i=e.settings.content_editable,a=e.getBody(),s=o.getRng();if(e.quirks.refreshContentEditable(),n=e,r=o.getNode(),t=n.dom.getParent(r,function(e){return"true"===n.dom.getContentEditable(e)}),e.$.contains(a,t))return fm(t),lm(e,s),void pm(e);e.bookmark!==undefined&&!1===mm(e)&&Td(e).each(function(t){e.selection.setRng(t),s=t}),i||(me.opera||fm(a),e.getWin().focus()),(me.gecko||i)&&(fm(a),lm(e,s)),pm(e)}(e))},hm=mm,vm=function(e,t){return t.dom()[e]},ym=function(e,t){return parseInt(Cr(t,e),10)},bm=y.curry(vm,"clientWidth"),Cm=y.curry(vm,"clientHeight"),xm=y.curry(ym,"margin-top"),wm=y.curry(ym,"margin-left"),Nm=function(e,t,n){var r,o,i,a,s,u,c,l,f,d,m=Hn.fromDom(e.getBody()),p=e.inline?m:Ur.documentElement(m),g=(r=e.inline,i=t,a=n,s=(o=p).dom().getBoundingClientRect(),{x:i-(r?s.left+o.dom().clientLeft+wm(o):0),y:a-(r?s.top+o.dom().clientTop+xm(o):0)});return c=g.x,l=g.y,f=bm(u=p),d=Cm(u),c>=0&&l>=0&&c<=f&&l<=d},Em=function(e){var t,n=e.inline?e.getBody():e.getContentAreaContainer();return(t=n,E.from(t).map(Hn.fromDom)).map(function(e){return Dr.contains(Ur.owner(e),e)}).getOr(!1)},Sm=function(e){var t,n=[],r=function(){var t,n=e.theme;return n&&n.getNotificationManagerImpl?n.getNotificationManagerImpl():{open:t=function(){throw new Error("Theme did not provide a NotificationManager implementation.")},close:t,reposition:t,getArgs:t}},o=function(){n.length>0&&r().reposition(n)},i=function(e){M.findIndex(n,function(t){return t===e}).each(function(e){n.splice(e,1)})},a=function(t){if(!e.removed&&Em(e))return M.find(n,function(e){return n=r().getArgs(e),o=t,!(n.type!==o.type||n.text!==o.text||n.progressBar||n.timeout||o.progressBar||o.timeout);var n,o}).getOrThunk(function(){e.editorManager.setActive(e);var a,s=r().open(t,function(){i(s),o()});return a=s,n.push(a),o(),s})};return(t=e).on("SkinLoaded",function(){var e=t.settings.service_message;e&&a({text:e,type:"warning",timeout:0,icon:""})}),t.on("ResizeEditor ResizeWindow",function(){ye.requestAnimationFrame(o)}),t.on("remove",function(){M.each(n,function(e){r().close(e)})}),{open:a,close:function(){E.from(n[0]).each(function(e){r().close(e),i(e),o()})},getNotifications:function(){return n}}},km=function(e){var t=[],n=function(){var t,n=e.theme;return n&&n.getWindowManagerImpl?n.getWindowManagerImpl():{open:t=function(){throw new Error("Theme did not provide a WindowManager implementation.")},alert:t,confirm:t,close:t,getParams:t,setParams:t}},r=function(e,t){return function(){return t?t.apply(e,arguments):undefined}},o=function(n){var r;t.push(n),r=n,e.fire("OpenWindow",{win:r})},i=function(n){M.findIndex(t,function(e){return e===n}).each(function(r){var o;t.splice(r,1),o=n,e.fire("CloseWindow",{win:o}),0===t.length&&e.focus()})},a=function(){return E.from(t[t.length-1])};return e.on("remove",function(){M.each(t.slice(0),function(e){n().close(e)})}),{windows:t,open:function(t,r){e.editorManager.setActive(e),Sd(e);var a=n().open(t,r,i);return o(a),a},alert:function(e,t,a){var s=n().alert(e,r(a||this,t),i);o(s)},confirm:function(e,t,a){var s=n().confirm(e,r(a||this,t),i);o(s)},close:function(){a().each(function(e){n().close(e),i(e)})},getParams:function(){return a().map(n().getParams).getOr(null)},setParams:function(e){a().each(function(t){n().setParams(t,e)})},getWindows:function(){return t}}},Tm=ti.PluginManager,Am=function(e,t){var n=function(e,t){for(var n in Tm.urls)if(Tm.urls[n]+"/plugin"+t+".js"===e)return n;return null}(t,e.suffix);return n?"Failed to load plugin: "+n+" from url "+t:"Failed to load plugin url: "+t},_m=function(e,t){e.notificationManager.open({type:"error",text:t})},Bm=function(e,t){e._skinLoaded?_m(e,t):e.on("SkinLoaded",function(){_m(e,t)})},Rm=function(e,t){Bm(e,Am(e,t))},Dm=function(e,t){Bm(e,"Failed to upload image: "+t)},Om=Bm,Pm=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=window.console;r&&(r.error?r.error.apply(r,arguments):r.log.apply(r,arguments))},Im=ti.PluginManager,Lm=ti.ThemeManager,Mm=function(){return new(V("XMLHttpRequest"))},Fm=function(e,t){var n={},r=function(e,n,r,o){var i,a;(i=new Mm).open("POST",t.url),i.withCredentials=t.credentials,i.upload.onprogress=function(e){o(e.loaded/e.total*100)},i.onerror=function(){r("Image upload failed due to a XHR Transport error. Code: "+i.status)},i.onload=function(){var e,o,a;i.status<200||i.status>=300?r("HTTP Error: "+i.status):(e=JSON.parse(i.responseText))&&"string"==typeof e.location?n((o=t.basePath,a=e.location,o?o.replace(/\/$/,"")+"/"+a.replace(/^\//,""):a)):r("Invalid JSON: "+i.responseText)},(a=new FormData).append("file",e.blob(),e.filename()),i.send(a)},o=function(e,t){return{url:t,blobInfo:e,status:!0}},i=function(e,t){return{url:"",blobInfo:e,status:!1,error:t}},a=function(e,t){Ot.each(n[e],function(e){e(t)}),delete n[e]},s=function(r,s){return r=Ot.grep(r,function(t){return!e.isUploaded(t.blobUri())}),pe.all(Ot.map(r,function(r){return e.isPending(r.blobUri())?(f=r.blobUri(),new pe(function(e){n[f]=n[f]||[],n[f].push(e)})):(u=r,c=t.handler,l=s,e.markPending(u.blobUri()),new pe(function(t){var n;try{var r=function(){n&&n.close()};c(u,function(n){r(),e.markUploaded(u.blobUri(),n),a(u.blobUri(),o(u,n)),t(o(u,n))},function(n){r(),e.removeFailed(u.blobUri()),a(u.blobUri(),i(u,n)),t(i(u,n))},function(e){e<0||e>100||(n||(n=l()),n.progressBar.value(e))})}catch(s){t(i(u,s.message))}}));var u,c,l,f}))};return t=Ot.extend({credentials:!1,handler:r},t),{upload:function(e,n){return t.url||t.handler!==r?s(e,n):new pe(function(e){e([])})}}},zm=function(e,t){return new(V("Blob"))(e,t)},Um=function(e){return V("atob")(e)},Vm=function(e){var t,n;return e=decodeURIComponent(e).split(","),(n=/data:([^;]+)/.exec(e[0]))&&(t=n[1]),{type:t,data:e[1]}},Hm=function(e){return new pe(function(t){var n,r,o;e=Vm(e);try{n=Um(e.data)}catch(yC){return void t(new zm([]))}for(r=new function(e){return new(V("Uint8Array"))(e)}(n.length),o=0;o<r.length;o++)r[o]=n.charCodeAt(o);t(new zm([r],{type:e.type}))})},qm=function(e){return 0===e.indexOf("blob:")?(t=e,new pe(function(e,n){var r=function(){n("Cannot convert "+t+" to Blob. Resource might not exist or is inaccessible.")};try{var o=new Mm;o.open("GET",t,!0),o.responseType="blob",o.onload=function(){200===this.status?e(this.response):r()},o.onerror=r,o.send()}catch(i){r()}})):0===e.indexOf("data:")?Hm(e):null;var t},jm=function(e){return new pe(function(t){var n=new function(){return new(V("FileReader"))};n.onloadend=function(){t(n.result)},n.readAsDataURL(e)})},$m=Vm,Wm=0,Km=function(e){return(e||"blobid")+Wm++},Xm=function(e,t){var n={};return{findAll:function(r,o){var i,a,s;return o||(o=ji.constant(!0)),i=At.filter((s=r)?s.getElementsByTagName("img"):[],function(t){var n=t.src;return!!me.fileApi&&!t.hasAttribute("data-mce-bogus")&&!t.hasAttribute("data-mce-placeholder")&&!(!n||n===me.transparentSrc)&&(0===n.indexOf("blob:")?!e.isUploaded(n):0===n.indexOf("data:")&&o(t))}),a=At.map(i,function(e){var r;return n[e.src]?new pe(function(t){n[e.src].then(function(n){if("string"==typeof n)return n;t({image:e,blobInfo:n.blobInfo})})}):(r=new pe(function(n,r){var o,i,a,s,u,c;o=t,a=n,s=r,0!==(i=e).src.indexOf("blob:")?(u=$m(i.src).data,(c=o.findFirst(function(e){return e.base64()===u}))?a({image:i,blobInfo:c}):qm(i.src).then(function(e){c=o.create(Km(),e,u),o.add(c),a({image:i,blobInfo:c})},function(e){s(e)})):(c=o.getByUri(i.src))?a({image:i,blobInfo:c}):qm(i.src).then(function(e){jm(e).then(function(t){u=$m(t).data,c=o.create(Km(),e,u),o.add(c),a({image:i,blobInfo:c})})},function(e){s(e)})}).then(function(e){return delete n[e.image.src],e})["catch"](function(t){return delete n[e.src],t}),n[e.src]=r,r)}),pe.all(a)}}},Ym=0,Gm=function(e){return e+Ym+++(t=function(){return Math.round(4294967295*Math.random()).toString(36)},"s"+(new Date).getTime().toString(36)+t()+t()+t());var t},Jm=function(e){var t,n,r,o,i,a,s,u,c,l,f=(t=[],n=ji.constant,r=function(e){var t,r,o;if(!e.blob||!e.base64)throw new Error("blob and base64 representations of the image are required for BlobInfo to be created");return t=e.id||Gm("blobid"),r=e.name||t,{id:n(t),name:n(r),filename:n(r+"."+(o=e.blob.type,{"image/jpeg":"jpg","image/jpg":"jpg","image/gif":"gif","image/png":"png"}[o.toLowerCase()]||"dat")),blob:n(e.blob),base64:n(e.base64),blobUri:n(e.blobUri||q(e.blob)),uri:n(e.uri)}},{create:function(e,t,n,o){return r("object"==typeof e?e:{id:e,name:o,blob:t,base64:n})},add:function(e){o(e.id())||t.push(e)},get:o=function(e){return i(function(t){return t.id()===e})},getByUri:function(e){return i(function(t){return t.blobUri()===e})},findFirst:i=function(e){return At.filter(t,e)[0]},removeByUri:function(e){t=At.filter(t,function(t){return t.blobUri()!==e||(j(t.blobUri()),!1)})},destroy:function(){At.each(t,function(e){j(e.blobUri())}),t=[]}}),d=e.settings,m=(u={},c=function(e,t){return{status:e,resultUri:t}},{hasBlobUri:l=function(e){return e in u},getResultUri:function(e){var t=u[e];return t?t.resultUri:null},isPending:function(e){return!!l(e)&&1===u[e].status},isUploaded:function(e){return!!l(e)&&2===u[e].status},markPending:function(e){u[e]=c(1,null)},markUploaded:function(e,t){u[e]=c(2,t)},removeFailed:function(e){delete u[e]},destroy:function(){u={}}}),p=function(t){return function(n){return e.selection?t(n):[]}},g=function(e,t,n){var r=0;do{-1!==(r=e.indexOf(t,r))&&(e=e.substring(0,r)+n+e.substr(r+t.length),r+=n.length-t.length+1)}while(-1!==r);return e},h=function(e,t,n){return e=g(e,'src="'+t+'"','src="'+n+'"'),e=g(e,'data-mce-src="'+t+'"','data-mce-src="'+n+'"')},v=function(t,n){At.each(e.undoManager.data,function(e){"fragmented"===e.type?e.fragments=At.map(e.fragments,function(e){return h(e,t,n)}):e.content=h(e.content,t,n)})},y=function(){return e.notificationManager.open({text:e.translate("Image uploading..."),type:"info",timeout:-1,progressBar:!0})},b=function(t,n){f.removeByUri(t.src),v(t.src,n),e.$(t).attr({src:d.images_reuse_filename?n+"?"+(new Date).getTime():n,"data-mce-src":e.convertURL(n,"src")})},C=function(t){return a||(a=Fm(m,{url:d.images_upload_url,basePath:d.images_upload_base_path,credentials:d.images_upload_credentials,handler:d.images_upload_handler})),N().then(p(function(n){var r;return r=At.map(n,function(e){return e.blobInfo}),a.upload(r,y).then(p(function(r){var o=At.map(r,function(t,r){var o=n[r].image;return t.status&&!1!==e.settings.images_replace_blob_uris?b(o,t.url):t.error&&Dm(e,t.error),{element:o,status:t.status}});return t&&t(o),o}))}))},x=function(e){if(!1!==d.automatic_uploads)return C(e)},w=function(e){return!d.images_dataimg_filter||d.images_dataimg_filter(e)},N=function(){return s||(s=Xm(m,f)),s.findAll(e.getBody(),w).then(p(function(t){return t=At.filter(t,function(t){return"string"!=typeof t||(Om(e,t),!1)}),At.each(t,function(e){v(e.image.src,e.blobInfo.blobUri()),e.image.src=e.blobInfo.blobUri(),e.image.removeAttribute("data-mce-src")}),t}))},E=function(t){return t.replace(/src="(blob:[^"]+)"/g,function(t,n){var r=m.getResultUri(n);if(r)return'src="'+r+'"';var o=f.getByUri(n);return o||(o=At.reduce(e.editorManager.get(),function(e,t){return e||t.editorUpload&&t.editorUpload.blobCache.getByUri(n)},null)),o?'src="data:'+o.blob().type+";base64,"+o.base64()+'"':t})};return e.on("setContent",function(){!1!==e.settings.automatic_uploads?x():N()}),e.on("RawSaveContent",function(e){e.content=E(e.content)}),e.on("getContent",function(e){e.source_view||"raw"===e.format||(e.content=E(e.content))}),e.on("PostRender",function(){e.parser.addNodeFilter("img",function(e){At.each(e,function(e){var t=e.attr("src");if(!f.getByUri(t)){var n=m.getResultUri(t);n&&e.attr("src",n)}})})}),{blobCache:f,uploadImages:C,uploadImagesAuto:x,scanForImages:N,destroy:function(){f.destroy(),m.destroy(),s=a=null}}},Qm=function(e,t){return e.hasOwnProperty(t.nodeName)},Zm=function(e){var t,n,r,o,i,a,s,u,c,l,f,d=e.settings,m=e.dom,p=e.selection,g=e.schema,h=g.getBlockElements(),v=p.getStart(),y=e.getBody();if(f=d.forced_root_block,v&&vo.isElement(v)&&f&&(l=y.nodeName.toLowerCase(),g.isValidChild(l,f.toLowerCase())&&(b=h,C=y,x=v,!M.exists(zu(Hn.fromDom(x),Hn.fromDom(C)),function(e){return Qm(b,e.dom())})))){var b,C,x,w,N;for(n=(t=p.getRng()).startContainer,r=t.startOffset,o=t.endContainer,i=t.endOffset,c=hm(e),v=y.firstChild;v;)if(w=h,N=v,vo.isText(N)||vo.isElement(N)&&!Qm(w,N)&&!xs.isBookmarkNode(N)){if(vo.isText(v)&&0===v.nodeValue.length){s=v,v=v.nextSibling,m.remove(s);continue}a||(a=m.create(f,e.settings.forced_root_block_attrs),v.parentNode.insertBefore(a,v),u=!0),s=v,v=v.nextSibling,a.appendChild(s)}else a=null,v=v.nextSibling;u&&c&&(t.setStart(n,r),t.setEnd(o,i),p.setRng(t),e.nodeChanged())}},ep=function(e){e.settings.forced_root_block&&e.on("NodeChange",y.curry(Zm,e))},tp=function(e){var t,n=[];"onselectionchange"in e.getDoc()||e.on("NodeChange Click MouseUp KeyUp Focus",function(n){var r,o;o={startContainer:(r=e.selection.getRng()).startContainer,startOffset:r.startOffset,endContainer:r.endContainer,endOffset:r.endOffset},"nodechange"!==n.type&&qf(o,t)||e.fire("SelectionChange"),t=o}),e.on("contextmenu",function(){e.fire("SelectionChange")}),e.on("SelectionChange",function(){var t=e.selection.getStart(!0);!t||!me.range&&e.selection.isCollapsed()||!function(t){var r,o;if((o=e.$(t).parentsUntil(e.getBody()).add(t)).length===n.length){for(r=o.length;r>=0&&o[r]===n[r];r--);if(-1===r)return n=o,!0}return n=o,!1}(t)&&e.dom.isChildOf(t,e.getBody())&&e.nodeChanged({selectionChange:!0})}),e.on("MouseUp",function(t){t.isDefaultPrevented()||("IMG"===e.selection.getNode().nodeName?ye.setEditorTimeout(e,function(){e.nodeChanged()}):e.nodeChanged())}),this.nodeChanged=function(t){var n,r,o,i=e.selection;e.initialized&&i&&!e.settings.disable_nodechange&&!e.readonly&&(o=e.getBody(),(n=i.getStart(!0)||o).ownerDocument===e.getDoc()&&e.dom.isChildOf(n,o)||(n=o),r=[],e.dom.getParent(n,function(e){if(e===o)return!0;r.push(e)}),(t=t||{}).element=n,t.parents=r,e.fire("NodeChange",t))}},np=function(e){var t,n,r,o;return o=e.getBoundingClientRect(),n=(t=e.ownerDocument).documentElement,r=t.defaultView,{top:o.top+r.pageYOffset-n.clientTop,left:o.left+r.pageXOffset-n.clientLeft}},rp=function(e,t){return n=(s=e).inline?np(s.getBody()):{left:0,top:0},a=(i=e).getBody(),r=i.inline?{left:a.scrollLeft,top:a.scrollTop}:{left:0,top:0},{pageX:(o=function(e,t){if(t.target.ownerDocument!==e.getDoc()){var n=np(e.getContentAreaContainer()),r=(i=(o=e).getBody(),a=o.getDoc().documentElement,s={left:i.scrollLeft,top:i.scrollTop},u={left:i.scrollLeft||a.scrollLeft,top:i.scrollTop||a.scrollTop},o.inline?s:u);return{left:t.pageX-n.left+r.left,top:t.pageY-n.top+r.top}}var o,i,a,s,u;return{left:t.pageX,top:t.pageY}}(e,t)).left-n.left+r.left,pageY:o.top-n.top+r.top};var n,r,o,i,a,s},op=vo.isContentEditableFalse,ip=vo.isContentEditableTrue,ap=function(e){e&&e.parentNode&&e.parentNode.removeChild(e)},sp=function(e,t){return function(n){if(0===n.button){var r=At.find(t.dom.getParents(n.target),ji.or(op,ip));if(s=t.getBody(),op(u=r)&&u!==s){var o=t.dom.getPos(r),i=t.getBody(),a=t.getDoc().documentElement;e.element=r,e.screenX=n.screenX,e.screenY=n.screenY,e.maxX=(t.inline?i.scrollWidth:a.offsetWidth)-2,e.maxY=(t.inline?i.scrollHeight:a.offsetHeight)-2,e.relX=n.pageX-o.x,e.relY=n.pageY-o.y,e.width=r.offsetWidth,e.height=r.offsetHeight,e.ghost=function(e,t,n,r){var o=t.cloneNode(!0);e.dom.setStyles(o,{width:n,height:r}),e.dom.setAttrib(o,"data-mce-selected",null);var i=e.dom.create("div",{"class":"mce-drag-container","data-mce-bogus":"all",unselectable:"on",contenteditable:"false"});return e.dom.setStyles(i,{position:"absolute",opacity:.5,overflow:"hidden",border:0,padding:0,margin:0,width:n,height:r}),e.dom.setStyles(o,{margin:0,boxSizing:"border-box"}),i.appendChild(o),i}(t,r,e.width,e.height)}}var s,u}},up=function(e,t){return function(n){if(e.dragging&&(s=t,l=t.selection,f=l.getSel().getRangeAt(0).startContainer,u=3===f.nodeType?f.parentNode:f,c=e.element,u!==c&&!s.dom.isChildOf(u,c)&&!op(u))){var r=(i=e.element,(a=i.cloneNode(!0)).removeAttribute("data-mce-selected"),a),o=t.fire("drop",{targetClone:r,clientX:n.clientX,clientY:n.clientY});o.isDefaultPrevented()||(r=o.targetClone,t.undoManager.transact(function(){ap(e.element),t.insertContent(t.dom.getOuterHTML(r)),t._selectionOverrides.hideFakeCaret()}))}var i,a,s,u,c,l,f;cp(e)}},cp=function(e){e.dragging=!1,e.element=null,ap(e.ghost)},lp=function(e){var t,n,r,o,i,a,s,u,c,l,f,d={};t=Xo.DOM,a=document,n=sp(d,e),s=d,u=e,c=ye.throttle(function(e,t){u._selectionOverrides.hideFakeCaret(),u.selection.placeCaretAt(e,t)},0),r=function(e){var t,n,r,o,i,a,l,f,d,m,p,g,h=Math.max(Math.abs(e.screenX-s.screenX),Math.abs(e.screenY-s.screenY));if(s.element&&!s.dragging&&h>10){if(u.fire("dragstart",{target:s.element}).isDefaultPrevented())return;s.dragging=!0,u.focus()}if(s.dragging){var v=(p=s,{pageX:(g=rp(u,e)).pageX-p.relX,pageY:g.pageY+5});d=s.ghost,m=u.getBody(),d.parentNode!==m&&m.appendChild(d),t=s.ghost,n=v,r=s.width,o=s.height,i=s.maxX,a=s.maxY,l=0,f=0,t.style.left=n.pageX+"px",t.style.top=n.pageY+"px",n.pageX+r>i&&(l=n.pageX+r-i),n.pageY+o>a&&(f=n.pageY+o-a),t.style.width=r-l+"px",t.style.height=o-f+"px",c(e.clientX,e.clientY)}},o=up(d,e),l=d,f=e,i=function(){cp(l),l.dragging&&f.fire("dragend")},e.on("mousedown",n),e.on("mousemove",r),e.on("mouseup",o),t.bind(a,"mousemove",r),t.bind(a,"mouseup",i),e.on("remove",function(){t.unbind(a,"mousemove",r),t.unbind(a,"mouseup",i)})},fp=function(e){var t;lp(e),(t=e).on("drop",function(e){var n="undefined"!=typeof e.clientX?t.getDoc().elementFromPoint(e.clientX,e.clientY):null;(op(n)||op(t.dom.getContentEditableParent(n)))&&e.preventDefault()})},dp=vo.isContentEditableFalse,mp=function(e,t){var n,r,o=null,i=function(){!function(){var t,n,r,o,i;for(t=Qt("*[contentEditable=false]",e),o=0;o<t.length;o++)r=(n=t[o]).previousSibling,mi.endsWithCaretContainer(r)&&(1===(i=r.data).length?r.parentNode.removeChild(r):r.deleteData(i.length-1,1)),r=n.nextSibling,mi.startsWithCaretContainer(r)&&(1===(i=r.data).length?r.parentNode.removeChild(r):r.deleteData(0,1))}(),r&&(Oc.remove(r),r=null),o&&(o.remove(),o=null),clearInterval(n)},a=function(){n=ye.setInterval(function(){e.ownerDocument.activeElement===e?Qt("div.mce-visual-caret",e).toggleClass("mce-visual-caret-hidden"):Qt("div.mce-visual-caret",e).addClass("mce-visual-caret-hidden")},500)};return{show:function(n,s){var u,c,l,f,d,m,p,g,h,v,y;return i(),(l=s)&&/^(TD|TH)$/i.test(l.nodeName)?null:t(s)?(r=mi.insertBlock("p",s,n),d=n,y=Oi((f=s).getBoundingClientRect(),d),"BODY"===e.tagName?(m=e.ownerDocument.documentElement,p=e.scrollLeft||m.scrollLeft,g=e.scrollTop||m.scrollTop):(v=e.getBoundingClientRect(),p=e.scrollLeft-v.left,g=e.scrollTop-v.top),y.left+=p,y.right+=p,y.top+=g,y.bottom+=g,y.width=1,(h=f.offsetWidth-f.clientWidth)>0&&(d&&(h*=-1),y.left+=h,y.right+=h),u=y,Qt(r).css("top",u.top),o=Qt('<div class="mce-visual-caret" data-mce-bogus="all"></div>').css(u).appendTo(e),n&&o.addClass("mce-visual-caret-before"),a(),(c=s.ownerDocument.createRange()).setStart(r,0),c.setEnd(r,0),c):(r=mi.insertInline(s,n),c=s.ownerDocument.createRange(),dp(r.nextSibling)?(c.setStart(r,0),c.setEnd(r,0)):(c.setStart(r,1),c.setEnd(r,1)),c)},hide:i,getCss:function(){return".mce-visual-caret {position: absolute;background-color: black;background-color: currentcolor;}.mce-visual-caret-hidden {display: none;}*[data-mce-caret] {position: absolute;left: -1000px;right: auto;top: 0;margin: 0;padding: 0;}"},destroy:function(){ye.clearInterval(n)}}},pp=function(e){var t=function(t){return At.map(t,function(t){return(t=Di(t)).node=e,t})};if(At.isArray(e))return At.reduce(e,function(e,t){return e.concat(pp(t))},[]);if(vo.isElement(e))return t(e.getClientRects());if(vo.isText(e)){var n=e.ownerDocument.createRange();return n.setStart(e,0),n.setEnd(e,e.data.length),t(n.getClientRects())}},gp={getClientRects:pp},hp=vo.isContentEditableFalse,vp=_a.findNode,yp=ji.curry,bp=function(e,t){return Math.abs(e.left-t)},Cp=function(e,t){return Math.abs(e.right-t)},xp=function(e,t){var n=function(e,t){return e>=t.left&&e<=t.right};return At.reduce(e,function(e,r){var o,i;return o=Math.min(bp(e,t),Cp(e,t)),i=Math.min(bp(r,t),Cp(r,t)),n(t,r)?r:n(t,e)?e:i===o&&hp(r.node)?r:i<o?r:e})},wp=function(e,t,n,r){for(;r=vp(r,e,ki,t);)if(n(r))return},Np=function(e,t){var n=[],r=function(e,r){var o;return o=At.filter(gp.getClientRects(r),function(n){return!e(n,t)}),n=n.concat(o),0===o.length};return n.push(t),wp(-1,e,yp(r,Ii),t.node),wp(1,e,yp(r,Li),t.node),n},Ep=xp,Sp=function(e,t,n){var r,o,i,a,s;return r=gp.getClientRects((i=e,At.filter(At.toArray(i.getElementsByTagName("*")),hp))),r=At.filter(r,function(e){return n>=e.top&&n<=e.bottom}),(o=xp(r,t))&&(o=xp(Np(e,o),t))&&hp(o.node)?(s=t,{node:(a=o).node,before:bp(a,s)<Cp(a,s)}):null},kp=function(e,t,n){return!n.collapsed&&M.foldl(n.getClientRects(),function(n,r){return n||Mi(r,e,t)},!1)},Tp=function(e,t){var n=null;return{cancel:function(){null!==n&&(clearTimeout(n),n=null)},throttle:function(){var r=arguments;null===n&&(n=setTimeout(function(){e.apply(null,r),n=null,r=null},t))}}},Ap=vo.isContentEditableTrue,_p=vo.isContentEditableFalse,Bp=function(e,t,n,r){return t._selectionOverrides.showCaret(e,n,r)},Rp=function(e,t){var n,r;return t=_a.normalizeRange(1,e.getBody(),t),n=ia.fromRangeStart(t),_p(n.getNode())?Bp(1,e,n.getNode(),!n.isAtEnd()):_p(n.getNode(!0))?Bp(1,e,n.getNode(!0),!1):(r=e.dom.getParent(n.getNode(),ji.or(_p,Ap)),_p(r)?Bp(1,e,r,!1):null)},Dp=Bp,Op=function(e,t){var n,r;return e.fire("BeforeObjectSelected",{target:t}).isDefaultPrevented()?null:((r=(n=t).ownerDocument.createRange()).selectNode(n),r)},Pp=Rp,Ip=function(e,t){return t&&t.collapsed&&Rp(e,t)||t},Lp=function(e){var t=Tp(function(){if(!e.removed){var t=Ip(e,e.selection.getRng());e.selection.setRng(t)}},0);e.on("focus",function(){t.throttle()}),e.on("blur",function(){t.cancel()})},Mp={BACKSPACE:8,DELETE:46,DOWN:40,ENTER:13,LEFT:37,RIGHT:39,SPACEBAR:32,TAB:9,UP:38,modifierPressed:function(e){return e.shiftKey||e.ctrlKey||e.altKey||this.metaKeyPressed(e)},metaKeyPressed:function(e){return me.mac?e.metaKey:e.ctrlKey&&!e.altKey}},Fp=vo.isContentEditableTrue,zp=vo.isContentEditableFalse,Up=_a.isAfterContentEditableFalse,Vp=_a.isBeforeContentEditableFalse,Hp=function(e){var t,n,r,o=e.getBody(),i=mp(e.getBody(),function(t){return e.dom.isBlock(t)}),a="sel-"+e.dom.uniqueId(),s=function(t){t&&e.selection.setRng(t)},u=function(){return e.selection.getRng()},c=function(t,n){e.selection.scrollIntoView(t,n)},l=function(t,n,r){return e.fire("ShowCaret",{target:n,direction:t,before:r}).isDefaultPrevented()?null:(c(n,-1===t),i.show(r,n))},f=function(e,t){return t=_a.normalizeRange(e,o,t),-1===e?ia.fromRangeStart(t):ia.fromRangeEnd(t)},d=function(e){return mi.isCaretContainer(e)||mi.startsWithCaretContainer(e)||mi.endsWithCaretContainer(e)},m=function(e){return d(e.startContainer)||d(e.endContainer)},p=function(n,r){var o,i,s,u,c,d,p,g,v,y,b=e.$,C=e.dom;if(!n)return null;if(n.collapsed){if(!m(n))if(!1===r){if(g=f(-1,n),zp(g.getNode(!0)))return l(-1,g.getNode(!0),!1);if(zp(g.getNode()))return l(-1,g.getNode(),!g.isAtEnd())}else{if(g=f(1,n),zp(g.getNode()))return l(1,g.getNode(),!g.isAtEnd());if(zp(g.getNode(!0)))return l(1,g.getNode(!0),!1)}return null}return u=n.startContainer,c=n.startOffset,d=n.endOffset,3===u.nodeType&&0===c&&zp(u.parentNode)&&(u=u.parentNode,c=C.nodeIndex(u),u=u.parentNode),1!==u.nodeType?null:(d===c+1&&(o=u.childNodes[c]),zp(o)?(v=y=o.cloneNode(!0),(p=e.fire("ObjectSelected",{target:o,targetClone:v})).isDefaultPrevented()?null:(i=Nu(Hn.fromDom(e.getBody()),"#"+a).fold(function(){return b([])},function(e){return b([e.dom()])}),v=p.targetClone,0===i.length&&(i=b('<div data-mce-bogus="all" class="mce-offscreen-selection"></div>').attr("id",a)).appendTo(e.getBody()),n=e.dom.createRng(),v===y&&me.ie?(i.empty().append('<p style="font-size: 0" data-mce-bogus="all">\xa0</p>').append(v),n.setStartAfter(i[0].firstChild.firstChild),n.setEndAfter(v)):(i.empty().append("\xa0").append(v).append("\xa0"),n.setStart(i[0].firstChild,1),n.setEnd(i[0].lastChild,0)),i.css({top:C.getPos(o,e.getBody()).y}),i[0].focus(),(s=e.selection.getSel()).removeAllRanges(),s.addRange(n),M.each(Os(Hn.fromDom(e.getBody()),"*[data-mce-selected]"),function(e){dr.remove(e,"data-mce-selected")}),o.setAttribute("data-mce-selected","1"),t=o,h(),n)):null)},g=function(){t&&(t.removeAttribute("data-mce-selected"),Nu(Hn.fromDom(e.getBody()),"#"+a).each(Bs.remove),t=null)},h=function(){i.hide()};return me.ceFalse&&(function(){var n=function(t){for(var n=e.getBody();t&&t!==n;){if(Fp(t)||zp(t))return t;t=t.parentNode}return null};e.on("mouseup",function(t){var n=u();n.collapsed&&Nm(e,t.clientX,t.clientY)&&s(Pp(e,n))}),e.on("click",function(t){var r;(r=n(t.target))&&(zp(r)&&(t.preventDefault(),e.focus()),Fp(r)&&e.dom.isChildOf(r,e.selection.getNode())&&g())}),e.on("blur NewBlock",function(){g()});var r,i,c=function(t,n){var r,o,i=e.dom.getParent(t,e.dom.isBlock),a=e.dom.getParent(n,e.dom.isBlock);return i&&(r=i,o=a,!(e.dom.getParent(r,e.dom.isBlock)===e.dom.getParent(o,e.dom.isBlock)))&&function(e){var t=Ha(e);if(!e.firstChild)return!1;var n=ia.before(e.firstChild),r=t.next(n);return r&&!Vp(r)&&!Up(r)}(i)};i=!1,(r=e).on("touchstart",function(){i=!1}),r.on("touchmove",function(){i=!0}),r.on("touchend",function(e){var t=n(e.target);zp(t)&&(i||(e.preventDefault(),p(Op(r,t))))}),e.on("mousedown",function(t){var r;if(!1!==Nm(e,t.clientX,t.clientY))if(r=n(t.target))zp(r)?(t.preventDefault(),p(Op(e,r))):(g(),Fp(r)&&t.shiftKey||kp(t.clientX,t.clientY,e.selection.getRng())||e.selection.placeCaretAt(t.clientX,t.clientY));else{g(),h();var i=Sp(o,t.clientX,t.clientY);i&&(c(t.target,i.node)||(t.preventDefault(),e.getBody().focus(),s(l(1,i.node,i.before))))}}),e.on("keypress",function(t){Mp.modifierPressed(t)||(t.keyCode,zp(e.selection.getNode())&&t.preventDefault())}),e.on("getSelectionRange",function(e){var n=e.range;if(t){if(!t.parentNode)return void(t=null);(n=n.cloneRange()).selectNode(t),e.range=n}}),e.on("setSelectionRange",function(e){var t;(t=p(e.range,e.forward))&&(e.range=t)}),e.on("AfterSetSelectionRange",function(t){var n,r=t.range;m(r)||h(),n=r.startContainer.parentNode,e.dom.hasClass(n,"mce-offscreen-selection")||g()}),e.on("copy",function(t){var n,r=t.clipboardData;if(!t.isDefaultPrevented()&&t.clipboardData&&!me.ie){var o=(n=e.dom.get(a))?n.getElementsByTagName("*")[0]:n;o&&(t.preventDefault(),r.clearData(),r.setData("text/html",o.outerHTML),r.setData("text/plain",o.outerText))}}),fp(e),Lp(e)}(),n=e.contentStyles,r=".mce-content-body",n.push(i.getCss()),n.push(r+" .mce-offscreen-selection {position: absolute;left: -9999999999px;max-width: 1000000px;}"+r+" *[contentEditable=false] {cursor: default;}"+r+" *[contentEditable=true] {cursor: text;}")),{showCaret:l,showBlockCaretContainer:function(e){e.hasAttribute("data-mce-caret")&&(mi.showCaretContainerBlock(e),s(u()),c(e[0]))},hideFakeCaret:h,destroy:function(){i.destroy(),t=null}}},qp=0,jp=2,$p=1,Wp=function(e,t){var n=e.length+t.length+2,r=new Array(n),o=new Array(n),i=function(n,r,o,a,u){var c=s(n,r,o,a);if(null===c||c.start===r&&c.diag===r-a||c.end===n&&c.diag===n-o)for(var l=n,f=o;l<r||f<a;)l<r&&f<a&&e[l]===t[f]?(u.push([0,e[l]]),++l,++f):r-n>a-o?(u.push([2,e[l]]),++l):(u.push([1,t[f]]),++f);else{i(n,c.start,o,c.start-c.diag,u);for(var d=c.start;d<c.end;++d)u.push([0,e[d]]);i(c.end,r,c.end-c.diag,a,u)}},a=function(n,r,o,i){for(var a=n;a-r<i&&a<o&&e[a]===t[a-r];)++a;return{start:n,end:a,diag:r}},s=function(n,i,s,u){var c=i-n,l=u-s;if(0===c||0===l)return null;var f,d,m,p,g,h=c-l,v=l+c,y=(v%2==0?v:v+1)/2;for(r[1+y]=n,o[1+y]=i+1,f=0;f<=y;++f){for(d=-f;d<=f;d+=2){for(m=d+y,d===-f||d!==f&&r[m-1]<r[m+1]?r[m]=r[m+1]:r[m]=r[m-1]+1,g=(p=r[m])-n+s-d;p<i&&g<u&&e[p]===t[g];)r[m]=++p,++g;if(h%2!=0&&h-f<=d&&d<=h+f&&o[m-h]<=r[m])return a(o[m-h],d+n-s,i,u)}for(d=h-f;d<=h+f;d+=2){for(m=d+y-h,d===h-f||d!==h+f&&o[m+1]<=o[m-1]?o[m]=o[m+1]-1:o[m]=o[m-1],g=(p=o[m]-1)-n+s-d;p>=n&&g>=s&&e[p]===t[g];)o[m]=p--,g--;if(h%2==0&&-f<=d&&d<=f&&o[m]<=r[m+h])return a(o[m],d+n-s,i,u)}}},u=[];return i(0,e.length,0,t.length,u),u},Kp=function(e){return 1===e.nodeType?e.outerHTML:3===e.nodeType?Ao.encodeRaw(e.data,!1):8===e.nodeType?"\x3c!--"+e.data+"--\x3e":""},Xp=function(e,t,n){var r=function(e){var t,n,r;for(r=document.createElement("div"),t=document.createDocumentFragment(),e&&(r.innerHTML=e);n=r.firstChild;)t.appendChild(n);return t}(t);if(e.hasChildNodes()&&n<e.childNodes.length){var o=e.childNodes[n];o.parentNode.insertBefore(r,o)}else e.appendChild(r)},Yp=function(e){return At.filter(At.map(e.childNodes,Kp),function(e){return e.length>0})},Gp=function(e,t){var n,r,o,i=At.map(t.childNodes,Kp);return n=Wp(i,e),r=t,o=0,At.each(n,function(e){e[0]===qp?o++:e[0]===$p?(Xp(r,e[1],o),o++):e[0]===jp&&function(e,t){if(e.hasChildNodes()&&t<e.childNodes.length){var n=e.childNodes[t];n.parentNode.removeChild(n)}}(r,o)}),t},Jp=function(e){return{type:"fragmented",fragments:e,content:"",bookmark:null,beforeBookmark:null}},Qp=function(e){return{type:"complete",fragments:null,content:e,bookmark:null,beforeBookmark:null}},Zp=function(e){return"fragmented"===e.type?e.fragments.join(""):e.content},eg=function(e){var t,n,r;return t=Yp(e.getBody()),-1!==(n=(r=M.bind(t,function(t){var n=im(e.serializer,t);return n.length>0?[n]:[]})).join("")).indexOf("</iframe>")?Jp(r):Qp(n)},tg=function(e,t,n){"fragmented"===t.type?Gp(t.fragments,e.getBody()):e.setContent(t.content,{format:"raw"}),e.selection.moveToBookmark(n?t.beforeBookmark:t.bookmark)},ng=function(e,t){return!!e&&!!t&&Zp(e)===Zp(t)},rg=function(e){var t,n,r=this,o=0,i=[],a=0,s=function(){return 0===a},u=function(e){s()&&(r.typing=e)},c=function(t){e.setDirty(t)},l=function(e){u(!1),r.add({},e)},f=function(){r.typing&&(u(!1),r.add())};return e.on("init",function(){r.add()}),e.on("BeforeExecCommand",function(e){var t=e.command;"Undo"!==t&&"Redo"!==t&&"mceRepaint"!==t&&(f(),r.beforeChange())}),e.on("ExecCommand",function(e){var t=e.command;"Undo"!==t&&"Redo"!==t&&"mceRepaint"!==t&&l(e)}),e.on("ObjectResizeStart Cut",function(){r.beforeChange()}),e.on("SaveContent ObjectResized blur",l),e.on("DragEnd",l),e.on("KeyUp",function(t){var o=t.keyCode;t.isDefaultPrevented()||((o>=33&&o<=36||o>=37&&o<=40||45===o||t.ctrlKey)&&(l(),e.nodeChanged()),46!==o&&8!==o||e.nodeChanged(),n&&r.typing&&!1===ng(eg(e),i[0])&&(!1===e.isDirty()&&(c(!0),e.fire("change",{level:i[0],lastLevel:null})),e.fire("TypingUndo"),n=!1,e.nodeChanged()))}),e.on("KeyDown",function(e){var t=e.keyCode;if(!e.isDefaultPrevented())if(t>=33&&t<=36||t>=37&&t<=40||45===t)r.typing&&l(e);else{var o=e.ctrlKey&&!e.altKey||e.metaKey;!(t<16||t>20)||224===t||91===t||r.typing||o||(r.beforeChange(),u(!0),r.add({},e),n=!0)}}),e.on("MouseDown",function(e){r.typing&&l(e)}),e.addShortcut("meta+z","","Undo"),e.addShortcut("meta+y,meta+shift+z","","Redo"),e.on("AddUndo Undo Redo ClearUndos",function(t){t.isDefaultPrevented()||e.nodeChanged()}),r={data:i,typing:!1,beforeChange:function(){s()&&(t=gs.getUndoBookmark(e.selection))},add:function(n,r){var a,u,l,f=e.settings;if(l=eg(e),n=n||{},n=Ot.extend(n,l),!1===s()||e.removed)return null;if(u=i[o],e.fire("BeforeAddUndo",{level:n,lastLevel:u,originalEvent:r}).isDefaultPrevented())return null;if(u&&ng(u,n))return null;if(i[o]&&(i[o].beforeBookmark=t),f.custom_undo_redo_levels&&i.length>f.custom_undo_redo_levels){for(a=0;a<i.length-1;a++)i[a]=i[a+1];i.length--,o=i.length}n.bookmark=gs.getUndoBookmark(e.selection),o<i.length-1&&(i.length=o+1),i.push(n),o=i.length-1;var d={level:n,lastLevel:u,originalEvent:r};return e.fire("AddUndo",d),o>0&&(c(!0),e.fire("change",d)),n},undo:function(){var t;return r.typing&&(r.add(),r.typing=!1,u(!1)),o>0&&(t=i[--o],tg(e,t,!0),c(!0),e.fire("undo",{level:t})),t},redo:function(){var t;return o<i.length-1&&(t=i[++o],tg(e,t,!1),c(!0),e.fire("redo",{level:t})),t},clear:function(){i=[],o=0,r.typing=!1,r.data=i,e.fire("ClearUndos")},hasUndo:function(){return o>0||r.typing&&i[0]&&!ng(eg(e),i[0])},hasRedo:function(){return o<i.length-1&&!r.typing},transact:function(e){return f(),r.beforeChange(),r.ignore(e),r.add()},ignore:function(e){try{a++,e()}finally{a--}},extra:function(t,n){var a,s;r.transact(t)&&(s=i[o].bookmark,a=i[o-1],tg(e,a,!0),r.transact(n)&&(i[o-1].beforeBookmark=s))}}},og={},ig=At.filter,ag=At.each;nm=function(e){var t,n,r=e.selection.getRng();t=vo.matchNodeNames("pre"),r.collapsed||(n=e.selection.getSelectedBlocks(),ag(ig(ig(n,t),function(e){return t(e.previousSibling)&&-1!==At.indexOf(n,e.previousSibling)}),function(e){var t,n;t=e.previousSibling,Qt(n=e).remove(),Qt(t).append("<br><br>").append(n.childNodes)}))},og[tm="pre"]||(og[tm]=[]),og[tm].push(nm);var sg=function(e,t){ag(og[e],function(e){e(t)})},ug=Ot.each,cg={walk:function(e,t,n){var r,o,i,a,s,u,c,l=t.startContainer,f=t.startOffset,d=t.endContainer,m=t.endOffset;if((c=e.select("td[data-mce-selected],th[data-mce-selected]")).length>0)ug(c,function(e){n([e])});else{var p,g,h,v=function(e){var t;return 3===(t=e[0]).nodeType&&t===l&&f>=t.nodeValue.length&&e.splice(0,1),t=e[e.length-1],0===m&&e.length>0&&t===d&&3===t.nodeType&&e.splice(e.length-1,1),e},y=function(e,t,n){for(var r=[];e&&e!==n;e=e[t])r.push(e);return r},b=function(e,t){do{if(e.parentNode===t)return e;e=e.parentNode}while(e)},C=function(e,t,r){var o=r?"nextSibling":"previousSibling";for(s=(a=e).parentNode;a&&a!==t;a=s)s=a.parentNode,(u=y(a===e?a:a[o],o)).length&&(r||u.reverse(),n(v(u)))};if(1===l.nodeType&&l.hasChildNodes()&&(l=l.childNodes[f]),1===d.nodeType&&d.hasChildNodes()&&(g=m,h=(p=d).childNodes,--g>h.length-1?g=h.length-1:g<0&&(g=0),d=h[g]||p),l===d)return n(v([l]));for(r=e.findCommonAncestor(l,d),a=l;a;a=a.parentNode){if(a===d)return C(l,r,!0);if(a===r)break}for(a=d;a;a=a.parentNode){if(a===l)return C(d,r);if(a===r)break}o=b(l,r)||l,i=b(d,r)||d,C(l,o,!0),(u=y(o===l?o:o.nextSibling,"nextSibling",i===d?i.nextSibling:i)).length&&n(v(u)),C(d,i)}}},lg=/^(src|href|style)$/,fg=Ot.each,dg=Uc.isEq,mg=function(e){return/^(TH|TD)$/.test(e.nodeName)},pg=function(e,t,n){var r,o,i;return r=t[n?"startContainer":"endContainer"],o=t[n?"startOffset":"endOffset"],vo.isElement(r)&&(i=r.childNodes.length-1,!n&&o&&o--,r=r.childNodes[o>i?i:o]),vo.isText(r)&&n&&o>=r.nodeValue.length&&(r=new to(r,e.getBody()).next()||r),vo.isText(r)&&!n&&0===o&&(r=new to(r,e.getBody()).prev()||r),r},gg=function(e,t,n,r){var o=e.create(n,r);return t.parentNode.insertBefore(o,t),o.appendChild(t),o},hg=function(e,t,n,r){return!(t=Uc.getNonWhiteSpaceSibling(t,n,r))||"BR"===t.nodeName||e.isBlock(t)},vg=function(e,t,n,r,o){var i,a,s,u,c,l,f,d,m,p,g,h,v,y,b,C=e.dom;if(l=C,!(dg(f=r,(d=t).inline)||dg(f,d.block)||(d.selector?vo.isElement(f)&&l.is(f,d.selector):void 0)||(u=r,c=t,c.links&&"A"===u.tagName)))return!1;if("all"!==t.remove)for(fg(t.styles,function(e,i){e=Uc.normalizeStyleValue(C,Uc.replaceVars(e,n),i),"number"==typeof i&&(i=e,o=0),(t.remove_similar||!o||dg(Uc.getStyle(C,o,i),e))&&C.setStyle(r,i,""),s=1}),s&&""===C.getAttrib(r,"style")&&(r.removeAttribute("style"),r.removeAttribute("data-mce-style")),fg(t.attributes,function(e,t){var i;if(e=Uc.replaceVars(e,n),"number"==typeof t&&(t=e,o=0),!o||dg(C.getAttrib(o,t),e)){if("class"===t&&(e=C.getAttrib(r,t))&&(i="",fg(e.split(/\s+/),function(e){/mce\-\w+/.test(e)&&(i+=(i?" ":"")+e)}),i))return void C.setAttrib(r,t,i);"class"===t&&r.removeAttribute("className"),lg.test(t)&&r.removeAttribute("data-mce-"+t),r.removeAttribute(t)}}),fg(t.classes,function(e){e=Uc.replaceVars(e,n),o&&!C.hasClass(o,e)||C.removeClass(r,e)}),a=C.getAttribs(r),i=0;i<a.length;i++){var x=a[i].nodeName;if(0!==x.indexOf("_")&&0!==x.indexOf("data-"))return!1}return"none"!==t.remove?(m=e,g=t,v=(p=r).parentNode,y=m.dom,b=m.settings.forced_root_block,g.block&&(b?v===y.getRoot()&&(g.list_block&&dg(p,g.list_block)||fg(Ot.grep(p.childNodes),function(e){Uc.isValid(m,b,e.nodeName.toLowerCase())?h?h.appendChild(e):(h=gg(y,e,b),y.setAttribs(h,m.settings.forced_root_block_attrs)):h=0})):y.isBlock(p)&&!y.isBlock(v)&&(hg(y,p,!1)||hg(y,p.firstChild,!0,1)||p.insertBefore(y.create("br"),p.firstChild),hg(y,p,!0)||hg(y,p.lastChild,!1,1)||p.appendChild(y.create("br")))),g.selector&&g.inline&&!dg(g.inline,p)||y.remove(p,1),!0):void 0},yg=vg,bg=function(e,t,n,r,o){var i,a,s=e.formatter.get(t),u=s[0],c=!0,l=e.dom,f=e.selection,d=function(r){var i,a,c,l,f,d,m=(i=e,a=r,c=t,l=n,f=o,fg(Uc.getParents(i.dom,a.parentNode).reverse(),function(e){var t;d||"_start"===e.id||"_end"===e.id||(t=il.matchNode(i,e,c,l,f))&&!1!==t.split&&(d=e)}),d);return function(e,t,n,r,o,i,a,s){var u,c,l,f,d,m,p=e.dom;if(n){for(m=n.parentNode,u=r.parentNode;u&&u!==m;u=u.parentNode){for(c=p.clone(u,!1),d=0;d<t.length;d++)if(vg(e,t[d],s,c,c)){c=0;break}c&&(l&&c.appendChild(l),f||(f=c),l=c)}!i||a.mixed&&p.isBlock(n)||(r=p.split(n,r)),l&&(o.parentNode.insertBefore(l,o),f.appendChild(o))}return r}(e,s,m,r,r,!0,u,n)},m=function(t){var r,o,i,a,f;if(vo.isElement(t)&&l.getContentEditable(t)&&(a=c,c="true"===l.getContentEditable(t),f=!0),r=Ot.grep(t.childNodes),c&&!f)for(o=0,i=s.length;o<i&&!vg(e,s[o],n,t,t);o++);if(u.deep&&r.length){for(o=0,i=r.length;o<i;o++)m(r[o]);f&&(c=a)}},p=function(e){var t=l.get(e?"_start":"_end"),n=t[e?"firstChild":"lastChild"];return xs.isBookmarkNode(n)&&(n=n[e?"firstChild":"lastChild"]),vo.isText(n)&&0===n.data.length&&(n=e?t.previousSibling||t.nextSibling:t.nextSibling||t.previousSibling),l.remove(t,!0),n},g=function(t){var n,r,o=t.commonAncestorContainer;if(t=Qc(e,t,s,!0),u.split){if((n=pg(e,t,!0))!==(r=pg(e,t))){if(/^(TR|TH|TD)$/.test(n.nodeName)&&n.firstChild&&(n="TR"===n.nodeName?n.firstChild.firstChild||n:n.firstChild||n),o&&/^T(HEAD|BODY|FOOT|R)$/.test(o.nodeName)&&mg(r)&&r.firstChild&&(r=r.firstChild||r),l.isChildOf(n,r)&&n!==r&&!l.isBlock(r)&&!mg(n)&&!mg(r))return n=gg(l,n,"span",{id:"_start","data-mce-type":"bookmark"}),d(n),void(n=p(!0));n=gg(l,n,"span",{id:"_start","data-mce-type":"bookmark"}),r=gg(l,r,"span",{id:"_end","data-mce-type":"bookmark"}),d(n),d(r),n=p(!0),r=p()}else n=r=d(n);t.startContainer=n.parentNode?n.parentNode:n,t.startOffset=l.nodeIndex(n),t.endContainer=r.parentNode?r.parentNode:r,t.endOffset=l.nodeIndex(r)+1}cg.walk(l,t,function(t){fg(t,function(t){m(t),vo.isElement(t)&&"underline"===e.dom.getStyle(t,"text-decoration")&&t.parentNode&&"underline"===Uc.getTextDecoration(l,t.parentNode)&&vg(e,{deep:!1,exact:!0,inline:"span",styles:{textDecoration:"underline"}},null,t)})})};if(r)r.nodeType?((a=l.createRng()).setStartBefore(r),a.setEndAfter(r),g(a)):g(r);else if("false"!==l.getContentEditable(f.getNode()))f.isCollapsed()&&u.inline&&!l.select("td[data-mce-selected],th[data-mce-selected]").length?wl(e,t,n,o):(i=f.getBookmark(),g(f.getRng()),f.moveToBookmark(i),u.inline&&il.match(e,t,n,f.getStart())&&Uc.moveStart(l,f,f.getRng()),e.nodeChanged());else{r=f.getNode();for(var h=0,v=s.length;h<v&&(!s[h].ceFalseOverride||!vg(e,s[h],n,r,r));h++);}},Cg=Ot.each,xg=function(e){return e&&1===e.nodeType&&!xs.isBookmarkNode(e)&&!Nl(e)&&!vo.isBogus(e)},wg=function(e,t){var n;for(n=e;n;n=n[t]){if(3===n.nodeType&&0!==n.nodeValue.length)return e;if(1===n.nodeType&&!xs.isBookmarkNode(n))return n}return e},Ng=function(e,t,n){var r,o,i=new Ns(e);if(t&&n&&(t=wg(t,"previousSibling"),n=wg(n,"nextSibling"),i.compare(t,n))){for(r=t.nextSibling;r&&r!==n;)o=r,r=r.nextSibling,t.appendChild(o);return e.remove(n),Ot.each(Ot.grep(n.childNodes),function(e){t.appendChild(e)}),t}return n},Eg=function(e,t,n){Cg(e.childNodes,function(e){xg(e)&&(t(e)&&n(e),e.hasChildNodes()&&Eg(e,t,n))})},Sg=function(e,t){return y.curry(function(t,n){return!(!n||!Uc.getStyle(e,n,t))},t)},kg=function(e,t,n){return y.curry(function(t,n,r){e.setStyle(r,t,n),""===r.getAttribute("style")&&r.removeAttribute("style"),Tg(e,r)},t,n)},Tg=function(e,t){"SPAN"===t.nodeName&&0===e.getAttribs(t).length&&e.remove(t,!0)},Ag=function(e,t){var n;1===t.nodeType&&t.parentNode&&1===t.parentNode.nodeType&&(n=Uc.getTextDecoration(e,t.parentNode),e.getStyle(t,"color")&&n?e.setStyle(t,"text-decoration",n):e.getStyle(t,"text-decoration")===n&&e.setStyle(t,"text-decoration",null))},_g=function(e,t,n,r){Cg(t,function(t){Cg(e.dom.select(t.inline,r),function(r){xg(r)&&yg(e,t,n,r,t.exact?r:null)}),function(e,t,n){if(t.clear_child_styles){var r=t.links?"*:not(a)":"*";Cg(e.select(r,n),function(n){xg(n)&&Cg(t.styles,function(t,r){e.setStyle(n,r,"")})})}}(e.dom,t,r)})},Bg=function(e,t,n,r){(t.styles.color||t.styles.textDecoration)&&(Ot.walk(r,y.curry(Ag,e),"childNodes"),Ag(e,r))},Rg=function(e,t,n,r){t.styles&&t.styles.backgroundColor&&Eg(r,Sg(e,"fontSize"),kg(e,"backgroundColor",Uc.replaceVars(t.styles.backgroundColor,n)))},Dg=function(e,t,n,r){"sub"!==t.inline&&"sup"!==t.inline||(Eg(r,Sg(e,"fontSize"),kg(e,"fontSize","")),e.remove(e.select("sup"===t.inline?"sub":"sup",r),!0))},Og=function(e,t,n,r){r&&!1!==t.merge_siblings&&(r=Ng(e,Uc.getNonWhiteSpaceSibling(r),r),r=Ng(e,r,Uc.getNonWhiteSpaceSibling(r,!0)))},Pg=function(e,t,n,r,o){il.matchNode(e,o.parentNode,n,r)&&yg(e,t,r,o)||t.merge_with_parents&&e.dom.getParent(o.parentNode,function(i){if(il.matchNode(e,i,n,r))return yg(e,t,r,o),!0})},Ig=Ot.each,Lg=function(e,t,n,r){var o,i,a=e.formatter.get(t),s=a[0],u=!r&&e.selection.isCollapsed(),c=e.dom,l=e.selection,f=function(e,t){if(t=t||s,e){if(t.onformat&&t.onformat(e,t,n,r),Ig(t.styles,function(t,r){c.setStyle(e,r,Uc.replaceVars(t,n))}),t.styles){var o=c.getAttrib(e,"style");o&&e.setAttribute("data-mce-style",o)}Ig(t.attributes,function(t,r){c.setAttrib(e,r,Uc.replaceVars(t,n))}),Ig(t.classes,function(t){t=Uc.replaceVars(t,n),c.hasClass(e,t)||c.addClass(e,t)})}},d=function(e,t){var n=!1;return!!s.selector&&(Ig(e,function(e){if(!("collapsed"in e&&e.collapsed!==u))return c.is(t,e.selector)&&!Nl(t)?(f(t,e),n=!0,!1):void 0}),n)},m=function(r,o,i,u){var c,l,m=[],p=!0;c=s.inline||s.block,l=r.create(c),f(l),cg.walk(r,o,function(o){var i,g=function(o){var h,v,y,b;if(b=p,h=o.nodeName.toLowerCase(),v=o.parentNode.nodeName.toLowerCase(),1===o.nodeType&&r.getContentEditable(o)&&(b=p,p="true"===r.getContentEditable(o),y=!0),Uc.isEq(h,"br"))return i=0,void(s.block&&r.remove(o));if(s.wrapper&&il.matchNode(e,o,t,n))i=0;else{if(p&&!y&&s.block&&!s.wrapper&&Uc.isTextBlock(e,h)&&Uc.isValid(e,v,c))return o=r.rename(o,c),f(o),m.push(o),void(i=0);if(s.selector){var C=d(a,o);if(!s.inline||C)return void(i=0)}!p||y||!Uc.isValid(e,c,h)||!Uc.isValid(e,v,c)||!u&&3===o.nodeType&&1===o.nodeValue.length&&65279===o.nodeValue.charCodeAt(0)||Nl(o)||s.inline&&r.isBlock(o)?(i=0,Ig(Ot.grep(o.childNodes),g),y&&(p=b),i=0):(i||(i=r.clone(l,!1),o.parentNode.insertBefore(i,o),m.push(i)),i.appendChild(o))}};Ig(o,g)}),!0===s.links&&Ig(m,function(e){var t=function(e){"A"===e.nodeName&&f(e,s),Ig(Ot.grep(e.childNodes),t)};t(e)}),Ig(m,function(o){var i,u,c,l,d,p=function(e){var t=!1;return Ig(e.childNodes,function(e){if((n=e)&&1===n.nodeType&&!xs.isBookmarkNode(n)&&!Nl(n)&&!vo.isBogus(n))return t=e,!1;var n}),t};u=0,Ig(o.childNodes,function(e){Uc.isWhiteSpaceNode(e)||xs.isBookmarkNode(e)||u++}),i=u,!(m.length>1)&&r.isBlock(o)||0!==i?(s.inline||s.wrapper)&&(s.exact||1!==i||((l=p(c=o))&&!xs.isBookmarkNode(l)&&il.matchName(r,l,s)&&(d=r.clone(l,!1),f(d),r.replace(d,c,!0),r.remove(l,1)),o=d||c),_g(e,a,n,o),Pg(e,s,t,n,o),Rg(r,s,n,o),Dg(r,s,n,o),Og(r,s,n,o)):r.remove(o,1)})};if("false"!==c.getContentEditable(l.getNode())){if(s){if(r)r.nodeType?d(a,r)||((i=c.createRng()).setStartBefore(r),i.setEndAfter(r),m(c,Qc(e,i,a),0,!0)):m(c,r,0,!0);else if(u&&s.inline&&!c.select("td[data-mce-selected],th[data-mce-selected]").length)xl(e,t,n);else{var p=e.selection.getNode();e.settings.forced_root_block||!a[0].defaultBlock||c.getParent(p,c.isBlock)||Lg(e,a[0].defaultBlock),e.selection.setRng(Xs(e.selection.getRng())),o=l.getBookmark(),m(c,Qc(e,l.getRng(),a)),s.styles&&Bg(c,s,n,p),l.moveToBookmark(o),Uc.moveStart(c,l,l.getRng()),e.nodeChanged()}sg(t,e)}}else{r=l.getNode();for(var g=0,h=a.length;g<h;g++)if(a[g].ceFalseOverride&&c.is(r,a[g].selector))return void f(r,a[g])}},Mg={applyFormat:Lg},Fg=Ot.each,zg=function(e,t,n,r,o){var i,a,s,u,c,l,f,d;null===t.get()&&(a=e,s={},(i=t).set({}),a.on("NodeChange",function(e){var t=Uc.getParents(a.dom,e.element),n={};t=Ot.grep(t,function(e){return 1===e.nodeType&&!e.getAttribute("data-mce-bogus")}),Fg(i.get(),function(e,r){Fg(t,function(o){return a.formatter.matchNode(o,r,{},e.similar)?(s[r]||(Fg(e,function(e){e(!0,{node:o,format:r,parents:t})}),s[r]=e),n[r]=e,!1):!il.matchesUnInheritedFormatSelector(a,o,r)&&void 0})}),Fg(s,function(r,o){n[o]||(delete s[o],Fg(r,function(n){n(!1,{node:e.element,format:o,parents:t})}))})})),c=n,l=r,f=o,d=(u=t).get(),Fg(c.split(","),function(e){d[e]||(d[e]=[],d[e].similar=f),d[e].push(l)}),u.set(d)},Ug=function(e){var t={valigntop:[{selector:"td,th",styles:{verticalAlign:"top"}}],valignmiddle:[{selector:"td,th",styles:{verticalAlign:"middle"}}],valignbottom:[{selector:"td,th",styles:{verticalAlign:"bottom"}}],alignleft:[{selector:"figure.image",collapsed:!1,classes:"align-left",ceFalseOverride:!0,preview:"font-family font-size"},{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"left"},inherit:!1,preview:!1,defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"left"},preview:"font-family font-size"}],aligncenter:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"center"},inherit:!1,preview:"font-family font-size",defaultBlock:"div"},{selector:"figure.image",collapsed:!1,classes:"align-center",ceFalseOverride:!0,preview:"font-family font-size"},{selector:"img",collapsed:!1,styles:{display:"block",marginLeft:"auto",marginRight:"auto"},preview:!1},{selector:"table",collapsed:!1,styles:{marginLeft:"auto",marginRight:"auto"},preview:"font-family font-size"}],alignright:[{selector:"figure.image",collapsed:!1,classes:"align-right",ceFalseOverride:!0,preview:"font-family font-size"},{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"right"},inherit:!1,preview:"font-family font-size",defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"right"},preview:"font-family font-size"}],alignjustify:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"justify"},inherit:!1,defaultBlock:"div",preview:"font-family font-size"}],bold:[{inline:"strong",remove:"all"},{inline:"span",styles:{fontWeight:"bold"}},{inline:"b",remove:"all"}],italic:[{inline:"em",remove:"all"},{inline:"span",styles:{fontStyle:"italic"}},{inline:"i",remove:"all"}],underline:[{inline:"span",styles:{textDecoration:"underline"},exact:!0},{inline:"u",remove:"all"}],strikethrough:[{inline:"span",styles:{textDecoration:"line-through"},exact:!0},{inline:"strike",remove:"all"}],forecolor:{inline:"span",styles:{color:"%value"},links:!0,remove_similar:!0,clear_child_styles:!0},hilitecolor:{inline:"span",styles:{backgroundColor:"%value"},links:!0,remove_similar:!0,clear_child_styles:!0},fontname:{inline:"span",styles:{fontFamily:"%value"},clear_child_styles:!0},fontsize:{inline:"span",styles:{fontSize:"%value"},clear_child_styles:!0},fontsize_class:{inline:"span",attributes:{"class":"%value"}},blockquote:{block:"blockquote",wrapper:1,remove:"all"},subscript:{inline:"sub"},superscript:{inline:"sup"},code:{inline:"code"},link:{inline:"a",selector:"a",remove:"all",split:!0,deep:!0,onmatch:function(){return!0},onformat:function(t,n,r){Ot.each(r,function(n,r){e.setAttrib(t,r,n)})}},removeformat:[{selector:"b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins",remove:"all",split:!0,expand:!1,block_expand:!0,deep:!0},{selector:"span",attributes:["style","class"],remove:"empty",split:!0,expand:!1,deep:!0},{selector:"*",attributes:["style","class"],split:!1,expand:!1,deep:!0}]};return Ot.each("p h1 h2 h3 h4 h5 h6 div address pre div dt dd samp".split(/\s/),function(e){t[e]={block:e,remove:"all"}}),t},Vg=Ot.each,Hg=Xo.DOM,qg=function(e,t){var n,r,o,i=t&&t.schema||Fo({}),a=function(e){var t,n,o;return r="string"==typeof e?{name:e,classes:[],attrs:{}}:e,t=Hg.create(r.name),n=t,(o=r).classes.length&&Hg.addClass(n,o.classes.join(" ")),Hg.setAttribs(n,o.attrs),t},s=function(e,t,n){var r,o,u,c,l,f,d,m,p=t.length>0&&t[0],g=p&&p.name;if(l=g,f="string"!=typeof(c=e)?c.nodeName.toLowerCase():c,d=i.getElementRule(f),u=!(!(m=d&&d.parentsRequired)||!m.length)&&(l&&-1!==Ot.inArray(m,l)?l:m[0]))g===u?(o=t[0],t=t.slice(1)):o=u;else if(p)o=t[0],t=t.slice(1);else if(!n)return e;return o&&(r=a(o)).appendChild(e),n&&(r||(r=Hg.create("div")).appendChild(e),Ot.each(n,function(t){var n=a(t);r.insertBefore(n,e)})),s(r,t,o&&o.siblings)};return e&&e.length?(r=e[0],n=a(r),(o=Hg.create("div")).appendChild(s(n,e.slice(1),r.siblings)),o):""},jg=function(e){var t,n={classes:[],attrs:{}};return"*"!==(e=n.selector=Ot.trim(e))&&(t=e.replace(/(?:([#\.]|::?)([\w\-]+)|(\[)([^\]]+)\]?)/g,function(e,t,r,o,i){switch(t){case"#":n.attrs.id=r;break;case".":n.classes.push(r);break;case":":-1!==Ot.inArray("checked disabled enabled read-only required".split(" "),r)&&(n.attrs[r]=r)}if("["===o){var a=i.match(/([\w\-]+)(?:\=\"([^\"]+))?/);a&&(n.attrs[a[1]]=a[2])}return""})),n.name=t||"div",n},$g=function(e){return e&&"string"==typeof e?(e=(e=e.split(/\s*,\s*/)[0]).replace(/\s*(~\+|~|\+|>)\s*/g,"$1"),Ot.map(e.split(/(?:>|\s+(?![^\[\]]+\]))/),function(e){var t=Ot.map(e.split(/(?:~\+|~|\+)/),jg),n=t.pop();return t.length&&(n.siblings=t),n}).reverse()):[]},Wg=function(e,t){var n,r,o,i,a,s,u="";if(!1===(s=e.settings.preview_styles))return"";"string"!=typeof s&&(s="font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius outline text-shadow");var c=function(e){return e.replace(/%(\w+)/g,"")};if("string"==typeof t){if(!(t=e.formatter.get(t)))return;t=t[0]}return"preview"in t&&!1===(s=t.preview)?"":(n=t.block||t.inline||"span",(i=$g(t.selector)).length?(i[0].name||(i[0].name=n),n=t.selector,r=qg(i,e)):r=qg([n],e),o=Hg.select(n,r)[0]||r.firstChild,Vg(t.styles,function(e,t){(e=c(e))&&Hg.setStyle(o,t,e)}),Vg(t.attributes,function(e,t){(e=c(e))&&Hg.setAttrib(o,t,e)}),Vg(t.classes,function(e){e=c(e),Hg.hasClass(o,e)||Hg.addClass(o,e)}),e.fire("PreviewFormats"),Hg.setStyles(r,{position:"absolute",left:-65535}),e.getBody().appendChild(r),a=Hg.getStyle(e.getBody(),"fontSize",!0),a=/px$/.test(a)?parseInt(a,10):0,Vg(s.split(" "),function(t){var n=Hg.getStyle(o,t,!0);if(!("background-color"===t&&/transparent|rgba\s*\([^)]+,\s*0\)/.test(n)&&(n=Hg.getStyle(e.getBody(),t,!0),"#ffffff"===Hg.toHex(n).toLowerCase())||"color"===t&&"#000000"===Hg.toHex(n).toLowerCase())){if("font-size"===t&&/em|%$/.test(n)){if(0===a)return;n=(n=parseFloat(n)/(/%$/.test(n)?100:1))*a+"px"}"border"===t&&n&&(u+="padding:0 2px;"),u+=t+":"+n+";"}}),e.fire("AfterPreviewFormats"),Hg.remove(r),u)},Kg=function(e,t,n,r,o){var i=t.get(n);!il.match(e,n,r,o)||"toggle"in i[0]&&!i[0].toggle?Mg.applyFormat(e,n,r,o):bg(e,n,r,o)},Xg=function(e){e.addShortcut("meta+b","","Bold"),e.addShortcut("meta+i","","Italic"),e.addShortcut("meta+u","","Underline");for(var t=1;t<=6;t++)e.addShortcut("access+"+t,"",["FormatBlock",!1,"h"+t]);e.addShortcut("access+7","",["FormatBlock",!1,"p"]),e.addShortcut("access+8","",["FormatBlock",!1,"div"]),e.addShortcut("access+9","",["FormatBlock",!1,"address"])},Yg=function(e){var t,n,r,o=(n={},(r=function(e,t){e&&("string"!=typeof e?Ot.each(e,function(e,t){r(t,e)}):(t=t.length?t:[t],Ot.each(t,function(e){"undefined"==typeof e.deep&&(e.deep=!e.selector),"undefined"==typeof e.split&&(e.split=!e.selector||e.inline),"undefined"==typeof e.remove&&e.selector&&!e.inline&&(e.remove="none"),e.selector&&e.inline&&(e.mixed=!0,e.block_expand=!0),"string"==typeof e.classes&&(e.classes=e.classes.split(/\s+/))}),n[e]=t))})(Ug((t=e).dom)),r(t.settings.formats),{get:function(e){return e?n[e]:n},register:r,unregister:function(e){return e&&n[e]&&delete n[e],n}}),i=Yl(null);return Xg(e),Cl(e),{get:o.get,register:o.register,unregister:o.unregister,apply:y.curry(Mg.applyFormat,e),remove:y.curry(bg,e),toggle:y.curry(Kg,e,o),match:y.curry(il.match,e),matchAll:y.curry(il.matchAll,e),matchNode:y.curry(il.matchNode,e),canApply:y.curry(il.canApply,e),formatChanged:y.curry(zg,e,i),getCssText:y.curry(Wg,e)}},Gg=function(e){return function(){for(var t=new Array(arguments.length),n=0;n<t.length;n++)t[n]=arguments[n];if(0===t.length)throw new Error("Can't merge zero objects");for(var r={},o=0;o<t.length;o++){var i=t[o];for(var a in i)i.hasOwnProperty(a)&&(r[a]=e(r[a],i[a]))}return r}},Jg=Gg(function(e,t){return tr.isObject(e)&&tr.isObject(t)?Jg(e,t):t}),Qg=Gg(function(e,t){return t}),Zg={deepMerge:Jg,merge:Qg},eh=function(e,t){return e.fire("PreProcess",t)},th=function(e,t){return e.fire("PostProcess",t)},nh=function(e,t,n){e.addAttributeFilter("data-mce-tabindex",function(e,t){for(var n,r=e.length;r--;)(n=e[r]).attr("tabindex",n.attributes.map["data-mce-tabindex"]),n.attr(t,null)}),e.addAttributeFilter("src,href,style",function(e,r){for(var o,i,a=e.length,s="data-mce-"+r,u=t.url_converter,c=t.url_converter_scope;a--;)(i=(o=e[a]).attributes.map[s])!==undefined?(o.attr(r,i.length>0?i:null),o.attr(s,null)):(i=o.attributes.map[r],"style"===r?i=n.serializeStyle(n.parseStyle(i),o.name):u&&(i=u.call(c,i,r,o.name)),o.attr(r,i.length>0?i:null))}),e.addAttributeFilter("class",function(e){for(var t,n,r=e.length;r--;)(n=(t=e[r]).attr("class"))&&(n=t.attr("class").replace(/(?:^|\s)mce-item-\w+(?!\S)/g,""),t.attr("class",n.length>0?n:null))}),e.addAttributeFilter("data-mce-type",function(e,t,n){for(var r,o=e.length;o--;)"bookmark"!==(r=e[o]).attributes.map["data-mce-type"]||n.cleanup||r.remove()}),e.addNodeFilter("noscript",function(e){for(var t,n=e.length;n--;)(t=e[n].firstChild)&&(t.value=Ao.decode(t.value))}),e.addNodeFilter("script,style",function(e,n){for(var r,o,i,a=e.length,s=function(e){return e.replace(/(<!--\[CDATA\[|\]\]-->)/g,"\n").replace(/^[\r\n]*|[\r\n]*$/g,"").replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi,"").replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g,"")};a--;)o=(r=e[a]).firstChild?r.firstChild.value:"","script"===n?((i=r.attr("type"))&&r.attr("type","mce-no/type"===i?null:i.replace(/^mce\-/,"")),"xhtml"===t.element_format&&o.length>0&&(r.firstChild.value="// <![CDATA[\n"+s(o)+"\n// ]]>")):"xhtml"===t.element_format&&o.length>0&&(r.firstChild.value="\x3c!--\n"+s(o)+"\n--\x3e")}),e.addNodeFilter("#comment",function(e){for(var t,n=e.length;n--;)0===(t=e[n]).value.indexOf("[CDATA[")?(t.name="#cdata",t.type=4,t.value=t.value.replace(/^\[CDATA\[|\]\]$/g,"")):0===t.value.indexOf("mce:protected ")&&(t.name="#text",t.type=3,t.raw=!0,t.value=unescape(t.value).substr(14))}),e.addNodeFilter("xml:namespace,input",function(e,t){for(var n,r=e.length;r--;)7===(n=e[r]).type?n.remove():1===n.type&&("input"!==t||"type"in n.attributes.map||n.attr("type","text"))}),e.addAttributeFilter("data-mce-type",function(t){M.each(t,function(t){"format-caret"===t.attr("data-mce-type")&&(t.isEmpty(e.schema.getNonEmptyElements())?t.remove():t.unwrap())})}),e.addAttributeFilter("data-mce-src,data-mce-href,data-mce-style,data-mce-selected,data-mce-expando,data-mce-type,data-mce-resize",function(e,t){for(var n=e.length;n--;)e[n].attr(t,null)})},rh=function(e){var t,n,r=function(e){return e&&"br"===e.name};r(t=e.lastChild)&&r(n=t.prev)&&(t.remove(),n.remove())},oh=function(e,t,n){return f=n,(l=e)&&l.hasEventListeners("PreProcess")&&!f.no_events?(o=t,i=n,c=(r=e).dom,o=o.cloneNode(!0),(a=document.implementation).createHTMLDocument&&(s=a.createHTMLDocument(""),Ot.each("BODY"===o.nodeName?o.childNodes:[o],function(e){s.body.appendChild(s.importNode(e,!0))}),o="BODY"!==o.nodeName?s.body.firstChild:s.body,u=c.doc,c.doc=s),eh(r,Zg.merge(i,{node:o})),u&&(c.doc=u),o):t;var r,o,i,a,s,u,c,l,f},ih=function(e,t,n){e.addNodeFilter("font",function(e){M.each(e,function(e){var r,o,i=t.parse(e.attr("style")),a=e.attr("color"),s=e.attr("face"),u=e.attr("size");a&&(i.color=a),s&&(i["font-family"]=s),u&&(i["font-size"]=n[parseInt(e.attr("size"),10)-1]),e.name="span",e.attr("style",t.serialize(i)),r=e,o=["color","face","size"],M.each(o,function(e){r.attr(e,null)})})})},ah=function(e,t){var n,r=zo();t.convert_fonts_to_spans&&ih(e,r,Ot.explode(t.font_size_legacy_values)),n=r,e.addNodeFilter("strike",function(e){M.each(e,function(e){var t=n.parse(e.attr("style"));t["text-decoration"]="line-through",e.name="span",e.attr("style",n.serialize(t))})})},sh=function(e,t){t.inline_styles&&ah(e,t)},uh=/^[ \t\r\n]*$/,ch={"#text":3,"#comment":8,"#cdata":4,"#pi":7,"#doctype":10,"#document-fragment":11},lh=function(e,t,n){var r,o,i=n?"lastChild":"firstChild",a=n?"prev":"next";if(e[i])return e[i];if(e!==t){if(r=e[a])return r;for(o=e.parent;o&&o!==t;o=o.parent)if(r=o[a])return r}},fh=function(e,t){this.name=e,this.type=t,1===t&&(this.attributes=[],this.attributes.map={})};fh.prototype={replace:function(e){return e.parent&&e.remove(),this.insert(e,this),this.remove(),this},attr:function(e,t){var n,r;if("string"!=typeof e){for(r in e)this.attr(r,e[r]);return this}if(n=this.attributes){if(t!==undefined){if(null===t){if(e in n.map)for(delete n.map[e],r=n.length;r--;)if(n[r].name===e)return n=n.splice(r,1),this;return this}if(e in n.map){for(r=n.length;r--;)if(n[r].name===e){n[r].value=t;break}}else n.push({name:e,value:t});return n.map[e]=t,this}return n.map[e]}},clone:function(){var e,t,n,r,o,i=new fh(this.name,this.type);if(n=this.attributes){for((o=[]).map={},e=0,t=n.length;e<t;e++)"id"!==(r=n[e]).name&&(o[o.length]={name:r.name,value:r.value},o.map[r.name]=r.value);i.attributes=o}return i.value=this.value,i.shortEnded=this.shortEnded,i},wrap:function(e){return this.parent.insert(e,this),e.append(this),this},unwrap:function(){var e,t;for(e=this.firstChild;e;)t=e.next,this.insert(e,this,!0),e=t;this.remove()},remove:function(){var e=this.parent,t=this.next,n=this.prev;return e&&(e.firstChild===this?(e.firstChild=t,t&&(t.prev=null)):n.next=t,e.lastChild===this?(e.lastChild=n,n&&(n.next=null)):t.prev=n,this.parent=this.next=this.prev=null),this},append:function(e){var t;return e.parent&&e.remove(),(t=this.lastChild)?(t.next=e,e.prev=t,this.lastChild=e):this.lastChild=this.firstChild=e,e.parent=this,e},insert:function(e,t,n){var r;return e.parent&&e.remove(),r=t.parent||this,n?(t===r.firstChild?r.firstChild=e:t.prev.next=e,e.prev=t.prev,e.next=t,t.prev=e):(t===r.lastChild?r.lastChild=e:t.next.prev=e,e.next=t.next,e.prev=t,t.next=e),e.parent=r,e},getAll:function(e){var t,n=[];for(t=this.firstChild;t;t=lh(t,this))t.name===e&&n.push(t);return n},empty:function(){var e,t,n;if(this.firstChild){for(e=[],n=this.firstChild;n;n=lh(n,this))e.push(n);for(t=e.length;t--;)(n=e[t]).parent=n.firstChild=n.lastChild=n.next=n.prev=null}return this.firstChild=this.lastChild=null,this},isEmpty:function(e,t,n){var r,o,i=this.firstChild;if(t=t||{},i)do{if(1===i.type){if(i.attributes.map["data-mce-bogus"])continue;if(e[i.name])return!1;for(r=i.attributes.length;r--;)if("name"===(o=i.attributes[r].name)||0===o.indexOf("data-mce-bookmark"))return!1}if(8===i.type)return!1;if(3===i.type&&!uh.test(i.value))return!1;if(3===i.type&&i.parent&&t[i.parent.name]&&uh.test(i.value))return!1;if(n&&n(i))return!1}while(i=lh(i,this));return!0},walk:function(e){return lh(this,null,e)}},fh.create=function(e,t){var n,r;if(n=new fh(e,ch[e]||1),t)for(r in t)n.attr(r,t[r]);return n};var dh=Ot.makeMap,mh=Ot.each,ph=Ot.explode,gh=Ot.extend,hh=function(e,t,n,r){(e.padd_empty_with_br||t.insert)&&n[r.name]?r.empty().append(new fh("br","1")).shortEnded=!0:r.empty().append(new fh("#text","3")).value="\xa0"},vh=function(e,t){return e&&e.firstChild&&e.firstChild===e.lastChild&&e.firstChild.name===t},yh=function(e,t,n,r){return r.isEmpty(t,n,function(t){return n=t,(r=e.getElementRule(n.name))&&r.paddEmpty;var n,r})},bh=function(e,t){var n={},r={},o=[],i={},a={};return(e=e||{}).validate=!("validate"in e)||e.validate,e.root_name=e.root_name||"body",n.schema=t=t||Fo(),n.filterNode=function(e){var t,n,s;n in r&&((s=i[n])?s.push(e):i[n]=[e]),t=o.length;for(;t--;)(n=o[t].name)in e.attributes.map&&((s=a[n])?s.push(e):a[n]=[e]);return e},n.addNodeFilter=function(e,t){mh(ph(e),function(e){var n=r[e];n||(r[e]=n=[]),n.push(t)})},n.addAttributeFilter=function(e,t){mh(ph(e),function(e){var n;for(n=0;n<o.length;n++)if(o[n].name===e)return void o[n].callbacks.push(t);o.push({name:e,callbacks:[t]})})},n.parse=function(s,u){var c,l,f,d,m,p,g,h,v,y,b,C,x,w,N,E,S,k,T,A,_,B=[];u=u||{},i={},a={},C=gh(dh("script,style,head,html,body,title,meta,param"),t.getBlockElements()),A=t.getNonEmptyElements(),T=t.children,b=e.validate,_="forced_root_block"in u?u.forced_root_block:e.forced_root_block,k=t.getWhiteSpaceElements(),x=/^[ \t\r\n]+/,N=/[ \t\r\n]+$/,E=/[ \t\r\n]+/g,S=/^[ \t\r\n]+$/;var R=function(e,t){var n,o=new fh(e,t);return e in r&&((n=i[e])?n.push(o):i[e]=[o]),o},D=function(e){var n,r,o,i,a=t.getBlockElements();for(n=e.prev;n&&3===n.type;){if((o=n.value.replace(N,"")).length>0)return void(n.value=o);if(r=n.next){if(3===r.type&&r.value.length){n=n.prev;continue}if(!a[r.name]&&"script"!==r.name&&"style"!==r.name){n=n.prev;continue}}i=n.prev,n.remove(),n=i}};if(c=new em({validate:b,allow_script_urls:e.allow_script_urls,allow_conditional_comments:e.allow_conditional_comments,self_closing_elements:function(e){var t,n={};for(t in e)"li"!==t&&"p"!==t&&(n[t]=e[t]);return n}(t.getSelfClosingElements()),cdata:function(e){f.append(R("#cdata",4)).value=e},text:function(e,t){var n;w||(e=e.replace(E," "),f.lastChild&&C[f.lastChild.name]&&(e=e.replace(x,""))),0!==e.length&&((n=R("#text",3)).raw=!!t,f.append(n).value=e)},comment:function(e){f.append(R("#comment",8)).value=e},pi:function(e,t){f.append(R(e,7)).value=t,D(f)},doctype:function(e){f.append(R("#doctype",10)).value=e,D(f)},start:function(e,n,r){var i,s,u,c,l;if(u=b?t.getElementRule(e):{}){for((i=R(u.outputName||e,1)).attributes=n,i.shortEnded=r,f.append(i),(l=T[f.name])&&T[i.name]&&!l[i.name]&&B.push(i),s=o.length;s--;)(c=o[s].name)in n.map&&((v=a[c])?v.push(i):a[c]=[i]);C[e]&&D(i),r||(f=i),!w&&k[e]&&(w=!0)}},end:function(n){var r,o,i,a,s,c;if(o=b?t.getElementRule(n):{}){if(C[n]&&!w){if((r=f.firstChild)&&3===r.type)if((i=r.value.replace(x,"")).length>0)r.value=i,r=r.next;else for(a=r.next,r.remove(),r=a;r&&3===r.type;)i=r.value,a=r.next,(0===i.length||S.test(i))&&(r.remove(),r=a),r=a;if((r=f.lastChild)&&3===r.type)if((i=r.value.replace(N,"")).length>0)r.value=i,r=r.prev;else for(a=r.prev,r.remove(),r=a;r&&3===r.type;)i=r.value,a=r.prev,(0===i.length||S.test(i))&&(r.remove(),r=a),r=a}if(w&&k[n]&&(w=!1),o.removeEmpty&&yh(t,A,k,f)&&!f.attributes.map.name&&!f.attributes.map.id)return s=f.parent,C[f.name]?f.empty().remove():f.unwrap(),void(f=s);o.paddEmpty&&(vh(c=f,"#text")&&"\xa0"===c.firstChild.value||yh(t,A,k,f))&&hh(e,u,C,f),f=f.parent}}},t),l=f=new fh(u.context||e.root_name,11),c.parse(s),b&&B.length&&(u.context?u.invalid=!0:function(e){var r,o,i,a,s,u,c,l,f,d,m,p,g,h,v,y;for(p=dh("tr,td,th,tbody,thead,tfoot,table"),d=t.getNonEmptyElements(),m=t.getWhiteSpaceElements(),g=t.getTextBlockElements(),h=t.getSpecialElements(),r=0;r<e.length;r++)if((o=e[r]).parent&&!o.fixed)if(g[o.name]&&"li"===o.parent.name){for(v=o.next;v&&g[v.name];)v.name="li",v.fixed=!0,o.parent.insert(v,o.parent),v=v.next;o.unwrap(o)}else{for(a=[o],i=o.parent;i&&!t.isValidChild(i.name,o.name)&&!p[i.name];i=i.parent)a.push(i);if(i&&a.length>1){for(a.reverse(),s=u=n.filterNode(a[0].clone()),f=0;f<a.length-1;f++){for(t.isValidChild(u.name,a[f].name)?(c=n.filterNode(a[f].clone()),u.append(c)):c=u,l=a[f].firstChild;l&&l!==a[f+1];)y=l.next,c.append(l),l=y;u=c}yh(t,d,m,s)?i.insert(o,a[0],!0):(i.insert(s,a[0],!0),i.insert(o,s)),i=a[0],(yh(t,d,m,i)||vh(i,"br"))&&i.empty().remove()}else if(o.parent){if("li"===o.name){if((v=o.prev)&&("ul"===v.name||"ul"===v.name)){v.append(o);continue}if((v=o.next)&&("ul"===v.name||"ul"===v.name)){v.insert(o,v.firstChild,!0);continue}o.wrap(n.filterNode(new fh("ul",1)));continue}t.isValidChild(o.parent.name,"div")&&t.isValidChild("div",o.name)?o.wrap(n.filterNode(new fh("div",1))):h[o.name]?o.empty().remove():o.unwrap()}}}(B)),_&&("body"===l.name||u.isRootContent)&&function(){var n,r,o=l.firstChild,i=function(e){e&&((o=e.firstChild)&&3===o.type&&(o.value=o.value.replace(x,"")),(o=e.lastChild)&&3===o.type&&(o.value=o.value.replace(N,"")))};if(t.isValidChild(l.name,_.toLowerCase())){for(;o;)n=o.next,3===o.type||1===o.type&&"p"!==o.name&&!C[o.name]&&!o.attr("data-mce-type")?r?r.append(o):((r=R(_,1)).attr(e.forced_root_block_attrs),l.insert(r,o),r.append(o)):(i(r),r=null),o=n;i(r)}}(),!u.invalid){for(y in i){for(v=r[y],g=(d=i[y]).length;g--;)d[g].parent||d.splice(g,1);for(m=0,p=v.length;m<p;m++)v[m](d,y,u)}for(m=0,p=o.length;m<p;m++)if((v=o[m]).name in a){for(g=(d=a[v.name]).length;g--;)d[g].parent||d.splice(g,1);for(g=0,h=v.callbacks.length;g<h;g++)v.callbacks[g](d,v.name,u)}}return l},e.remove_trailing_brs&&n.addNodeFilter("br",function(n,r,o){var i,a,s,u,c,l,f,d,m=n.length,p=gh({},t.getBlockElements()),g=t.getNonEmptyElements(),h=t.getNonEmptyElements();for(p.body=1,i=0;i<m;i++)if(s=(a=n[i]).parent,p[a.parent.name]&&a===s.lastChild){for(c=a.prev;c;){if("span"!==(l=c.name)||"bookmark"!==c.attr("data-mce-type")){if("br"!==l)break;if("br"===l){a=null;break}}c=c.prev}a&&(a.remove(),yh(t,g,h,s)&&(f=t.getElementRule(s.name))&&(f.removeEmpty?s.remove():f.paddEmpty&&hh(e,o,p,s)))}else{for(u=a;s&&s.firstChild===u&&s.lastChild===u&&(u=s,!p[s.name]);)s=s.parent;u===s&&!0!==e.padd_empty_with_br&&((d=new fh("#text",3)).value="\xa0",a.replace(d))}}),n.addAttributeFilter("href",function(t){var n,r,o,i=t.length;if(!e.allow_unsafe_link_target)for(;i--;)"a"===(n=t[i]).name&&"_blank"===n.attr("target")&&n.attr("rel",(r=n.attr("rel"),o=r?Ot.trim(r):"",/\b(noopener)\b/g.test(o)?o:o.split(" ").filter(function(e){return e.length>0}).concat(["noopener"]).sort().join(" ")))}),e.allow_html_in_named_anchor||n.addAttributeFilter("id,name",function(e){for(var t,n,r,o,i=e.length;i--;)if("a"===(o=e[i]).name&&o.firstChild&&!o.attr("href")){r=o.parent,t=o.lastChild;do{n=t.prev,r.insert(t,o),t=n}while(t)}}),e.fix_list_elements&&n.addNodeFilter("ul,ol",function(e){for(var t,n,r=e.length;r--;)if("ul"===(n=(t=e[r]).parent).name||"ol"===n.name)if(t.prev&&"li"===t.prev.name)t.prev.append(t);else{var o=new fh("li",1);o.attr("style","list-style-type: none"),t.wrap(o)}}),e.validate&&t.getValidClasses()&&n.addAttributeFilter("class",function(e){for(var n,r,o,i,a,s,u,c=e.length,l=t.getValidClasses();c--;){for(r=(n=e[c]).attr("class").split(" "),a="",o=0;o<r.length;o++)i=r[o],u=!1,(s=l["*"])&&s[i]&&(u=!0),s=l[n.name],!u&&s&&s[i]&&(u=!0),u&&(a&&(a+=" "),a+=i);a.length||(a=null),n.attr("class",a)}}),sh(n,e),n},Ch=function(e,t,n){-1===Ot.inArray(t,n)&&(e.addAttributeFilter(n,function(e,t){for(var n=e.length;n--;)e[n].attr(t,null)}),t.push(n))},xh=function(e,t,n,r,o){var i,a,s,u,c=(i=r,zs(t,n).serialize(i));return a=e,u=c,!(s=o).no_events&&a?th(a,Zg.merge(s,{content:u})).content:u},wh=function(e,t){var n,r,o,i=["data-mce-selected"];return n=t&&t.dom?t.dom:Xo.DOM,r=t&&t.schema?t.schema:Fo(e),e.entity_encoding=e.entity_encoding||"named",e.remove_trailing_brs=!("remove_trailing_brs"in e)||e.remove_trailing_brs,o=bh(e,r),nh(o,e,n),{schema:r,addNodeFilter:o.addNodeFilter,addAttributeFilter:o.addAttributeFilter,serialize:function(i,a){var s,u,c,l,f,d,m,p,g,h=Zg.merge({format:"html"},a||{}),v=oh(t,i,h),y=(s=n,u=v,l=ii((c=h).getInner?u.innerHTML:s.getOuterHTML(u)),c.selection?l:Ot.trim(l)),b=(f=o,d=y,p=(m=h).selection?Zg.merge({forced_root_block:!1},m):m,g=f.parse(d,p),rh(g),g);return"tree"===h.format?b:xh(t,e,r,b,h)},addRules:function(e){r.addValidElements(e)},setRules:function(e){r.setValidElements(e)},addTempAttr:y.curry(Ch,o,i),getTempAttrs:function(){return i}}},Nh=function(e,t){var n=wh(e,t);return{schema:n.schema,addNodeFilter:n.addNodeFilter,addAttributeFilter:n.addAttributeFilter,serialize:n.serialize,addRules:n.addRules,setRules:n.setRules,addTempAttr:n.addTempAttr,getTempAttrs:n.getTempAttrs}},Eh=function(e,t){var n;t.hasAttribute("data-mce-caret")&&(mi.showCaretContainerBlock(t),(n=e).selection.setRng(n.selection.getRng()),e.selection.scrollIntoView(t))},Sh=function(e,t){var n,r=(n=e,Nu(Hn.fromDom(n.getBody()),"*[data-mce-caret]").fold(y.constant(null),function(e){return e.dom()}));if(r)return"compositionstart"===t.type?(t.preventDefault(),t.stopPropagation(),void Eh(e,r)):void(mi.hasContent(r)&&Eh(e,r))},kh=function(e){e.on("keyup compositionstart",y.curry(Sh,e))};function Th(e){return{getBookmark:y.curry(xs.getBookmark,e),moveToBookmark:y.curry(xs.moveToBookmark,e)}}(Th||(Th={})).isBookmarkNode=xs.isBookmarkNode;var Ah=Th,_h=vo.isContentEditableFalse,Bh=vo.isContentEditableTrue,Rh=function(e,t){var n,r,o,i,a,s,u,c,l,f,d,m,p,g,h,v,y,b=t.dom,C=Ot.each,x=t.getDoc(),w=document,N=Math.abs,E=Math.round,S=t.getBody();i={nw:[0,0,-1,-1],ne:[1,0,1,-1],se:[1,1,1,1],sw:[0,1,-1,1]};var k=".mce-content-body";t.contentStyles.push(k+" div.mce-resizehandle {position: absolute;border: 1px solid black;box-sizing: content-box;background: #FFF;width: 7px;height: 7px;z-index: 10000}"+k+" .mce-resizehandle:hover {background: #000}"+k+" img[data-mce-selected],"+k+" hr[data-mce-selected] {outline: 1px solid black;resize: none}"+k+" .mce-clonedresizable {position: absolute;"+(me.gecko?"":"outline: 1px dashed black;")+"opacity: .5;filter: alpha(opacity=50);z-index: 10000}"+k+" .mce-resize-helper {background: #555;background: rgba(0,0,0,0.75);border-radius: 3px;border: 1px;color: white;display: none;font-family: sans-serif;font-size: 12px;white-space: nowrap;line-height: 14px;margin: 5px 10px;padding: 5px;position: absolute;z-index: 10001}");var T=function(e){return e&&("IMG"===e.nodeName||t.dom.is(e,"figure.image"))},A=function(e){var n,r,o=e.target;n=e,r=t.selection.getRng(),!T(n.target)||kp(n.clientX,n.clientY,r)||e.isDefaultPrevented()||(e.preventDefault(),t.selection.select(o))},_=function(e){return t.dom.is(e,"figure.image")?e.querySelector("img"):e},B=function(e){var n=t.settings.object_resizing;return!1!==n&&!me.iOS&&("string"!=typeof n&&(n="table,img,figure.image,div"),"false"!==e.getAttribute("data-mce-resize")&&e!==t.getBody()&&_r.is(Hn.fromDom(e),n))},R=function(e){var i,C,x,w;i=e.screenX-s,C=e.screenY-u,g=i*a[2]+f,h=C*a[3]+d,g=g<5?5:g,h=h<5?5:h,(T(n)&&!1!==t.settings.resize_img_proportional?!Mp.modifierPressed(e):Mp.modifierPressed(e)||T(n)&&a[2]*a[3]!=0)&&(N(i)>N(C)?(h=E(g*m),g=E(h/m)):(g=E(h/m),h=E(g*m))),b.setStyles(_(r),{width:g,height:h}),x=a.startPos.x+i,w=a.startPos.y+C,x=x>0?x:0,w=w>0?w:0,b.setStyles(o,{left:x,top:w,display:"block"}),o.innerHTML=g+" &times; "+h,a[2]<0&&r.clientWidth<=g&&b.setStyle(r,"left",c+(f-g)),a[3]<0&&r.clientHeight<=h&&b.setStyle(r,"top",l+(d-h)),(i=S.scrollWidth-v)+(C=S.scrollHeight-y)!=0&&b.setStyles(o,{left:x-i,top:w-C}),p||(t.fire("ObjectResizeStart",{target:n,width:f,height:d}),p=!0)},D=function(){p=!1;var e=function(e,r){r&&(n.style[e]||!t.schema.isValid(n.nodeName.toLowerCase(),e)?b.setStyle(_(n),e,r):b.setAttrib(_(n),e,r))};e("width",g),e("height",h),b.unbind(x,"mousemove",R),b.unbind(x,"mouseup",D),w!==x&&(b.unbind(w,"mousemove",R),b.unbind(w,"mouseup",D)),b.remove(r),b.remove(o),O(n),t.fire("ObjectResized",{target:n,width:g,height:h}),b.setAttrib(n,"style",b.getAttrib(n,"style")),t.nodeChanged()},O=function(e){var p,N,E,k,T;P(),M(),p=b.getPos(e,S),c=p.x,l=p.y,T=e.getBoundingClientRect(),N=T.width||T.right-T.left,E=T.height||T.bottom-T.top,n!==e&&(n=e,g=h=0),k=t.fire("ObjectSelected",{target:e}),B(e)&&!k.isDefaultPrevented()?C(i,function(e,t){var i;(i=b.get("mceResizeHandle"+t))&&b.remove(i),i=b.add(S,"div",{id:"mceResizeHandle"+t,"data-mce-bogus":"all","class":"mce-resizehandle",unselectable:!0,style:"cursor:"+t+"-resize; margin:0; padding:0"}),me.ie&&(i.contentEditable=!1),b.bind(i,"mousedown",function(t){var i;t.stopImmediatePropagation(),t.preventDefault(),s=(i=t).screenX,u=i.screenY,f=_(n).clientWidth,d=_(n).clientHeight,m=d/f,a=e,e.startPos={x:N*e[0]+c,y:E*e[1]+l},v=S.scrollWidth,y=S.scrollHeight,r=n.cloneNode(!0),b.addClass(r,"mce-clonedresizable"),b.setAttrib(r,"data-mce-bogus","all"),r.contentEditable=!1,r.unSelectabe=!0,b.setStyles(r,{left:c,top:l,margin:0}),r.removeAttribute("data-mce-selected"),S.appendChild(r),b.bind(x,"mousemove",R),b.bind(x,"mouseup",D),w!==x&&(b.bind(w,"mousemove",R),b.bind(w,"mouseup",D)),o=b.add(S,"div",{"class":"mce-resize-helper","data-mce-bogus":"all"},f+" &times; "+d)}),e.elm=i,b.setStyles(i,{left:N*e[0]+c-i.offsetWidth/2,top:E*e[1]+l-i.offsetHeight/2})}):P(),n.setAttribute("data-mce-selected","1")},P=function(){var e,t;for(e in M(),n&&n.removeAttribute("data-mce-selected"),i)(t=b.get("mceResizeHandle"+e))&&(b.unbind(t),b.remove(t))},I=function(n){var r,o=function(e,t){if(e)do{if(e===t)return!0}while(e=e.parentNode)};p||t.removed||(C(b.select("img[data-mce-selected],hr[data-mce-selected]"),function(e){e.removeAttribute("data-mce-selected")}),r="mousedown"===n.type?n.target:e.getNode(),o(r=b.$(r).closest("table,img,figure.image,hr")[0],S)&&(F(),o(e.getStart(!0),r)&&o(e.getEnd(!0),r))?O(r):P())},L=function(e){return _h(function(e,t){for(;t&&t!==e;){if(Bh(t)||_h(t))return t;t=t.parentNode}return null}(t.getBody(),e))},M=function(){for(var e in i){var t=i[e];t.elm&&(b.unbind(t.elm),delete t.elm)}},F=function(){try{t.getDoc().execCommand("enableObjectResizing",!1,!1)}catch(e){}};return t.on("init",function(){F(),me.ie&&me.ie>=11&&(t.on("mousedown click",function(e){var n=e.target,r=n.nodeName;p||!/^(TABLE|IMG|HR)$/.test(r)||L(n)||(2!==e.button&&t.selection.select(n,"TABLE"===r),"mousedown"===e.type&&t.nodeChanged())}),t.dom.bind(S,"mscontrolselect",function(e){var n=function(e){ye.setEditorTimeout(t,function(){t.selection.select(e)})};if(L(e.target))return e.preventDefault(),void n(e.target);/^(TABLE|IMG|HR)$/.test(e.target.nodeName)&&(e.preventDefault(),"IMG"===e.target.tagName&&n(e.target))}));var e=ye.throttle(function(e){t.composing||I(e)});t.on("nodechange ResizeEditor ResizeWindow drop",e),t.on("keyup compositionend",function(t){n&&"TABLE"===n.nodeName&&e(t)}),t.on("hide blur",P),t.on("contextmenu",A)}),t.on("remove",M),{isResizable:B,showResizeRect:O,hideResizeRect:P,updateResizeRect:I,destroy:function(){n=r=null}}},Dh=function(e){for(var t=0,n=0,r=e;r&&r.nodeType;)t+=r.offsetLeft||0,n+=r.offsetTop||0,r=r.offsetParent;return{x:t,y:n}},Oh=function(e,t,n){var r,o,i,a,s,u=e.dom,c=u.getRoot(),l=0;if(s={elm:t,alignToTop:n},e.fire("scrollIntoView",s),!s.isDefaultPrevented()&&vo.isElement(t)){if(!1===n&&(l=t.offsetHeight),"BODY"!==c.nodeName){var f=e.selection.getScrollContainer();if(f)return r=Dh(t).y-Dh(f).y+l,a=f.clientHeight,void((r<(i=f.scrollTop)||r+25>i+a)&&(f.scrollTop=r<i?r:r-a+25))}o=u.getViewPort(e.getWin()),r=u.getPos(t).y+l,i=o.y,a=o.h,(r<o.y||r+25>i+a)&&e.getWin().scrollTo(0,r<i?r:r-a+25)}},Ph=function(e){return vo.isContentEditableTrue(e)||vo.isContentEditableFalse(e)},Ih=function(e,t,n){var r,o,i,a,s,u=n;if(u.caretPositionFromPoint)(o=u.caretPositionFromPoint(e,t))&&((r=n.createRange()).setStart(o.offsetNode,o.offset),r.collapse(!0));else if(n.caretRangeFromPoint)r=n.caretRangeFromPoint(e,t);else if(u.body.createTextRange){r=u.body.createTextRange();try{r.moveToPoint(e,t),r.collapse(!0)}catch(c){r=function(e,t,n){var r,o,i;if(r=n.elementFromPoint(e,t),o=n.body.createTextRange(),r&&"HTML"!==r.tagName||(r=n.body),o.moveToElementText(r),(i=(i=Ot.toArray(o.getClientRects())).sort(function(e,n){return(e=Math.abs(Math.max(e.top-t,e.bottom-t)))-(n=Math.abs(Math.max(n.top-t,n.bottom-t)))})).length>0){t=(i[0].bottom+i[0].top)/2;try{return o.moveToPoint(e,t),o.collapse(!0),o}catch(a){}}return null}(e,t,n)}return i=r,a=n.body,s=i&&i.parentElement?i.parentElement():null,vo.isContentEditableFalse(function(e,t,n){for(;e&&e!==t;){if(n(e))return e;e=e.parentNode}return null}(s,a,Ph))?null:i}return r},Lh=function(e,t){return M.map(t,function(t){var n=e.fire("GetSelectionRange",{range:t});return n.range!==t?n.range:t})},Mh=function(e,t){return Hn.fromDom(e.dom().cloneNode(t))},Fh=function(e){return Mh(e,!0)},zh=function(e){return Mh(e,!1)},Uh=Fh,Vh=function(e,t){var n=(t||document).createDocumentFragment();return M.each(e,function(e){n.appendChild(e.dom())}),Hn.fromDom(n)},Hh=function(e){return Ur.firstChild(e).fold(y.constant([e]),function(t){return[e].concat(Hh(t))})},qh=function(e){return Ur.lastChild(e).fold(y.constant([e]),function(t){return"br"===Zn.name(t)?Ur.prevSibling(t).map(function(t){return[e].concat(qh(t))}).getOr([]):[e].concat(qh(t))})},jh=function(e,t){return hs([(i=t,a=i.startContainer,s=i.startOffset,vo.isText(a)?0===s?E.some(Hn.fromDom(a)):E.none():E.from(a.childNodes[s]).map(Hn.fromDom)),(n=t,r=n.endContainer,o=n.endOffset,vo.isText(r)?o===r.data.length?E.some(Hn.fromDom(r)):E.none():E.from(r.childNodes[o-1]).map(Hn.fromDom))],function(t,n){var r=M.find(Hh(e),y.curry(Dr.eq,t)),o=M.find(qh(e),y.curry(Dr.eq,n));return r.isSome()&&o.isSome()}).getOr(!1);var n,r,o,i,a,s},$h=function(e,t,n,r){var o=n,i=new to(n,o),a=e.schema.getNonEmptyElements();do{if(3===n.nodeType&&0!==Ot.trim(n.nodeValue).length)return void(r?t.setStart(n,0):t.setEnd(n,n.nodeValue.length));if(a[n.nodeName]&&!/^(TD|TH)$/.test(n.nodeName))return void(r?t.setStartBefore(n):"BR"===n.nodeName?t.setEndBefore(n):t.setEndAfter(n));if(me.ie&&me.ie<11&&e.isBlock(n)&&e.isEmpty(n))return void(r?t.setStart(n,0):t.setEnd(n,0))}while(n=r?i.next():i.prev());"BODY"===o.nodeName&&(r?t.setStart(o,0):t.setEnd(o,o.childNodes.length))},Wh=xr("element","width","rows"),Kh=xr("element","cells"),Xh=xr("x","y"),Yh=function(e,t){var n=parseInt(dr.get(e,t),10);return isNaN(n)?1:n},Gh=function(e){return M.foldl(e,function(e,t){return t.cells().length>e?t.cells().length:e},0)},Jh=function(e,t){for(var n=e.rows(),r=0;r<n.length;r++)for(var o=n[r].cells(),i=0;i<o.length;i++)if(Dr.eq(o[i],t))return E.some(Xh(i,r));return E.none()},Qh=function(e,t,n,r,o){for(var i=[],a=e.rows(),s=n;s<=o;s++){var u=a[s].cells(),c=t<r?u.slice(t,r+1):u.slice(r,t+1);i.push(Kh(a[s].element(),c))}return i},Zh=function(e){var t=Wh(zh(e),0,[]);return M.each(Os(e,"tr"),function(e,n){M.each(Os(e,"td,th"),function(r,o){!function(e,t,n,r,o){for(var i=Yh(o,"rowspan"),a=Yh(o,"colspan"),s=e.rows(),u=n;u<n+i;u++){s[u]||(s[u]=Kh(Uh(r),[]));for(var c=t;c<t+a;c++)s[u].cells()[c]=u===n&&c===t?o:zh(o)}}(t,function(e,t,n){for(;r=t,o=n,i=void 0,((i=e.rows())[o]?i[o].cells():[])[r];)t++;var r,o,i;return t}(t,o,n),n,e,r)})}),Wh(t.element(),Gh(t.rows()),t.rows())},ev=function(e){return t=e,i=e,n=M.map(i.rows(),function(e){var t=M.map(e.cells(),function(e){var t=Uh(e);return dr.remove(t,"colspan"),dr.remove(t,"rowspan"),t}),n=zh(e.element());return As(n,t),n}),r=zh(t.element()),o=Hn.fromTag("tbody"),As(o,n),ks.append(r,o),r;var t,n,r,o,i},tv=function(e,t,n){return Jh(e,t).bind(function(t){return Jh(e,n).map(function(n){return r=e,i=n,a=(o=t).x(),s=o.y(),u=i.x(),c=i.y(),l=s<c?Qh(r,a,s,u,c):Qh(r,a,c,u,s),Wh(r.element(),Gh(l),l);var r,o,i,a,s,u,c,l})})},nv=function(e,t){return M.find(e,function(e){return"li"===Zn.name(e)&&jh(e,t)}).fold(y.constant([]),function(t){return(n=e,M.find(n,function(e){return"ul"===Zn.name(e)||"ol"===Zn.name(e)})).map(function(e){return[Hn.fromTag("li"),Hn.fromTag(Zn.name(e))]}).getOr([]);var n})},rv=function(e,t){var n,r=Hn.fromDom(t.commonAncestorContainer),o=Uu(r,e),i=M.filter(o,function(e){return io.isInline(e)||io.isHeading(e)}),a=nv(o,t),s=i.concat(a.length?a:(n=r,io.isListItem(n)?Ur.parent(n).filter(io.isList).fold(y.constant([]),function(e){return[n,e]}):io.isList(n)?[n]:[]));return M.map(s,zh)},ov=function(){return Vh([])},iv=function(e,t){return n=Hn.fromDom(t.cloneContents()),r=rv(e,t),o=M.foldl(r,function(e,t){return ks.append(t,e),t},n),r.length>0?Vh([o]):o;var n,r,o},av=function(e,t){return(n=e,r=t[0],wu(r,"table",y.curry(Dr.eq,n))).bind(function(e){var n=t[0],r=t[t.length-1],o=Zh(e);return tv(o,n,r).map(function(e){return Vh([ev(e)])})}).getOrThunk(ov);var n,r},sv=function(e,t){var n,r,o=Af(t,e);return o.length>0?av(e,o):(n=e,(r=t).length>0&&r[0].collapsed?ov():iv(n,r[0]))},uv=function(e,t){var n,r=e.selection.getRng(),o=e.dom.create("body"),i=e.selection.getSel(),a=Lh(e,wf(i));if((t=t||{}).get=!0,t.format=t.format||"html",t.selection=!0,(t=e.fire("BeforeGetContent",t)).isDefaultPrevented())return e.fire("GetContent",t),t.content;if("text"===t.format)return e.selection.isCollapsed()?"":ii(r.text||(i.toString?i.toString():""));r.cloneContents?(n=t.contextual?sv(Hn.fromDom(e.getBody()),a).dom():r.cloneContents())&&o.appendChild(n):r.item!==undefined||r.htmlText!==undefined?(o.innerHTML="<br>"+(r.item?r.item(0).outerHTML:r.htmlText),o.removeChild(o.firstChild)):o.innerHTML=r.toString(),t.getInner=!0;var s=e.selection.serializer.serialize(o,t);return"tree"===t.format?s:(t.content=e.selection.isCollapsed()?"":s,e.fire("GetContent",t),t.content)},cv=function(e,t,n){var r,o,i,a=e.selection.getRng(),s=e.getDoc();if((n=n||{format:"html"}).set=!0,n.selection=!0,n.content=t,n.no_events||!(n=e.fire("BeforeSetContent",n)).isDefaultPrevented()){if(t=n.content,a.insertNode){t+='<span id="__caret">_</span>',a.startContainer===s&&a.endContainer===s?s.body.innerHTML=t:(a.deleteContents(),0===s.body.childNodes.length?s.body.innerHTML=t:a.createContextualFragment?a.insertNode(a.createContextualFragment(t)):(o=s.createDocumentFragment(),i=s.createElement("div"),o.appendChild(i),i.outerHTML=t,a.insertNode(o))),r=e.dom.get("__caret"),(a=s.createRange()).setStartBefore(r),a.setEndBefore(r),e.selection.setRng(a),e.dom.remove("__caret");try{e.selection.setRng(a)}catch(u){}}else a.item&&(s.execCommand("Delete",!1,null),a=e.getRng()),/^\s+/.test(t)?(a.pasteHTML('<span id="__mce_tmp">_</span>'+t),e.dom.remove("__mce_tmp")):a.pasteHTML(t);n.no_events||e.fire("SetContent",n)}else e.fire("SetContent",n)},lv=function(e,t,n,r,o){var i=n?t.startContainer:t.endContainer,a=n?t.startOffset:t.endOffset;return E.from(i).map(Hn.fromDom).map(function(e){return r&&t.collapsed?e:Ur.child(e,o(e,a)).getOr(e)}).bind(function(e){return Zn.isElement(e)?E.some(e):Ur.parent(e)}).map(function(e){return e.dom()}).getOr(e)},fv=function(e,t,n){return lv(e,t,!0,n,function(e,t){return Math.min(Ur.childNodesCount(e),t)})},dv=function(e,t,n){return lv(e,t,!1,n,function(e,t){return t>0?t-1:t})},mv=function(e,t){for(var n=e;e&&vo.isText(e)&&0===e.length;)e=t?e.nextSibling:e.previousSibling;return e||n},pv=Ot.each,gv=function(e){return!!e.select},hv=function(e){return!(!e||!e.ownerDocument)&&Dr.contains(Hn.fromDom(e.ownerDocument),Hn.fromDom(e))},vv=function(e,t,n,r){var o,i,a,s,u,c=function(e,t){return cv(r,e,t)},l=function(e){var t=d();t.collapse(!!e),m(t)},f=function(){return t.getSelection?t.getSelection():t.document.selection},d=function(){var n,o,i,u,c=function(e,t,n){try{return t.compareBoundaryPoints(e,n)}catch(r){return-1}};if(!t)return null;if(void 0===(u=t.document)||null===u)return null;if(r.bookmark!==undefined&&!1===hm(r)){var l=Td(r);if(l.isSome())return l.map(function(e){return Lh(r,[e])[0]}).getOr(u.createRange())}try{(n=f())&&(o=n.rangeCount>0?n.getRangeAt(0):n.createRange?n.createRange():u.createRange())}catch(d){}return(o=Lh(r,[o])[0])||(o=u.createRange?u.createRange():u.body.createTextRange()),o.setStart&&9===o.startContainer.nodeType&&o.collapsed&&(i=e.getRoot(),o.setStart(i,0),o.setEnd(i,0)),a&&s&&(0===c(o.START_TO_START,o,a)&&0===c(o.END_TO_END,o,a)?o=s:(a=null,s=null)),o},m=function(e,t){var n,o;if((i=e)&&(gv(i)||hv(i.startContainer)&&hv(i.endContainer))){var i,u=gv(e)?e:null;if(u){s=null;try{u.select()}catch(c){}}else{if(n=f(),e=r.fire("SetSelectionRange",{range:e,forward:t}).range,n){s=e;try{n.removeAllRanges(),n.addRange(e)}catch(c){}!1===t&&n.extend&&(n.collapse(e.endContainer,e.endOffset),n.extend(e.startContainer,e.startOffset)),a=n.rangeCount>0?n.getRangeAt(0):null}e.collapsed||e.startContainer!==e.endContainer||!n.setBaseAndExtent||me.ie||e.endOffset-e.startOffset<2&&e.startContainer.hasChildNodes()&&(o=e.startContainer.childNodes[e.startOffset])&&"IMG"===o.tagName&&(n.setBaseAndExtent(e.startContainer,e.startOffset,e.endContainer,e.endOffset),n.anchorNode===e.startContainer&&n.focusNode===e.endContainer||n.setBaseAndExtent(o,0,o,1)),r.fire("AfterSetSelectionRange",{range:e,forward:t})}}},p=function(){var t,n,r=f();return!(r&&r.anchorNode&&r.focusNode)||((t=e.createRng()).setStart(r.anchorNode,r.anchorOffset),t.collapse(!0),(n=e.createRng()).setStart(r.focusNode,r.focusOffset),n.collapse(!0),t.compareBoundaryPoints(t.START_TO_START,n)<=0)},g={bookmarkManager:null,controlSelection:null,dom:e,win:t,serializer:n,editor:r,collapse:l,setCursorLocation:function(t,n){var o=e.createRng();t?(o.setStart(t,n),o.setEnd(t,n),m(o),l(!1)):($h(e,o,r.getBody(),!0),m(o))},getContent:function(e){return uv(r,e)},setContent:c,getBookmark:function(e,t){return o.getBookmark(e,t)},moveToBookmark:function(e){return o.moveToBookmark(e)},select:function(t,n){var r,o,i;return(r=e,o=t,i=n,E.from(o).map(function(e){var t=r.nodeIndex(e),n=r.createRng();return n.setStart(e.parentNode,t),n.setEnd(e.parentNode,t+1),i&&($h(r,n,e,!0),$h(r,n,e,!1)),n})).each(m),t},isCollapsed:function(){var e=d(),t=f();return!(!e||e.item)&&(e.compareEndPoints?0===e.compareEndPoints("StartToEnd",e):!t||e.collapsed)},isForward:p,setNode:function(t){return c(e.getOuterHTML(t)),t},getNode:function(){return e=r.getBody(),(t=d())?(o=t.startContainer,i=t.endContainer,a=t.startOffset,s=t.endOffset,n=t.commonAncestorContainer,!t.collapsed&&(o===i&&s-a<2&&o.hasChildNodes()&&(n=o.childNodes[a]),3===o.nodeType&&3===i.nodeType&&(o=o.length===a?mv(o.nextSibling,!0):o.parentNode,i=0===s?mv(i.previousSibling,!1):i.parentNode,o&&o===i))?o:n&&3===n.nodeType?n.parentNode:n):e;var e,t,n,o,i,a,s},getSel:f,setRng:m,getRng:d,getStart:function(e){return fv(r.getBody(),d(),e)},getEnd:function(e){return dv(r.getBody(),d(),e)},getSelectedBlocks:function(t,n){return function(e,t,n,r){var o,i,a=[];if(i=e.getRoot(),n=e.getParent(n||fv(i,t,!1),e.isBlock),r=e.getParent(r||dv(i,t,!1),e.isBlock),n&&n!==i&&a.push(n),n&&r&&n!==r){o=n;for(var s=new to(n,i);(o=s.next())&&o!==r;)e.isBlock(o)&&a.push(o)}return r&&n!==r&&r!==i&&a.push(r),a}(e,d(),t,n)},normalize:function(){var t=d();if(!Ef(f())){var n=Jf.normalize(e,t);return n.each(function(e){m(e,p())}),n.getOr(t)}return t},selectorChanged:function(t,n){var o;return u||(u={},o={},r.on("NodeChange",function(t){var n=t.element,r=e.getParents(n,null,e.getRoot()),i={};pv(u,function(t,n){pv(r,function(a){if(e.is(a,n))return o[n]||(pv(t,function(e){e(!0,{node:a,selector:n,parents:r})}),o[n]=t),i[n]=t,!1})}),pv(o,function(e,t){i[t]||(delete o[t],pv(e,function(e){e(!1,{node:n,selector:t,parents:r})}))})})),u[t]||(u[t]=[]),u[t].push(n),g},getScrollContainer:function(){for(var t,n=e.getRoot();n&&"BODY"!==n.nodeName;){if(n.scrollHeight>n.clientHeight){t=n;break}n=n.parentNode}return t},scrollIntoView:function(e,t){return Oh(r,e,t)},placeCaretAt:function(e,t){return m(Ih(e,t,r.getDoc()))},getBoundingClientRect:function(){var e=d();return e.collapsed?ia.fromRangeStart(e).getClientRects()[0]:e.getBoundingClientRect()},destroy:function(){t=null,i.destroy()}};return o=Ah(g),i=Rh(g,r),g.bookmarkManager=o,g.controlSelection=i,g},yv=ji.curry,bv=function(e,t,n,r,o,i){var a,s,u=0,c=[],l=function(r){var i,a,l;for(l=gp.getClientRects(r),-1===e&&(l=l.reverse()),i=0;i<l.length;i++)if(a=l[i],!n(a,s)){if(c.length>0&&t(a,At.last(c))&&u++,a.line=u,o(a))return!0;c.push(a)}};return(s=At.last(i.getClientRects()))?(l(a=i.getNode()),function(e,t,n,r){for(;r=_a.findNode(r,e,ki,t);)if(n(r))return}(e,r,l,a),c):c},Cv={upUntil:yv(bv,-1,Ii,Li),downUntil:yv(bv,1,Li,Ii),positionsUntil:function(e,t,n,r){var o,i,a,s,u,c,l=Ha(t),f=[],d=0,m=function(e){return At.last(e.getClientRects())};1===e?(o=l.next,i=Li,a=Ii,s=ia.after(r)):(o=l.prev,i=Ii,a=Li,s=ia.before(r)),c=m(s);do{if(s.isVisible()&&!a(u=m(s),c)){if(f.length>0&&i(u,At.last(f))&&d++,(u=Di(u)).position=s,u.line=d,n(u))return f;f.push(u)}}while(s=o(s));return f},isAboveLine:yv(function(e,t){return t.line>e}),isLine:yv(function(e,t){return t.line===e})},xv=vo.isContentEditableFalse,wv=Fi,Nv=_a.isAfterContentEditableFalse,Ev=_a.isBeforeContentEditableFalse,Sv=function(e,t){for(;t=e(t);)if(t.isVisible())return t;return t},kv=function(e,t,n){return n=_a.normalizeRange(e,t,n),-1===e?ia.fromRangeStart(n):ia.fromRangeEnd(n)},Tv=function(e,t,n,r,o){var i,a,s,u,c,l,f,d;return!o.collapsed&&(i=wv(o),xv(i))?Dp(e,t,i,-1===e):(c=o,u=mi.isCaretContainerBlock(c.startContainer),r(a=kv(e,t.getBody(),o))?Op(t,a.getNode(-1===e)):(a=n(a))?r(a)?Dp(e,t,a.getNode(-1===e),1===e):r(s=n(a))&&(l=a,f=s,!(d=_a.isInSameBlock(l,f))&&vo.isBr(l.getNode())||d)?Dp(e,t,s.getNode(-1===e),1===e):u?Ip(t,a.toRange()):null:u?o:null)},Av=function(e,t,n){var r,o,i,a,s=Ha(e.getBody()),u=ji.curry(Sv,s.next),c=ji.curry(Sv,s.prev);if(n.collapsed&&e.settings.forced_root_block){if(!(r=e.dom.getParent(n.startContainer,"PRE")))return;(1===t?u(ia.fromRangeStart(n)):c(ia.fromRangeStart(n)))||(a=(i=e).dom.create(i.settings.forced_root_block),(!me.ie||me.ie>=11)&&(a.innerHTML='<br data-mce-bogus="1">'),o=a,1===t?e.$(r).after(o):e.$(r).before(o),e.selection.select(o,!0),e.selection.collapse())}},_v=function(e,t){var n,r=t?1:-1,o=t?Cv.downUntil:Cv.upUntil,i=e.selection.getRng();return(n=function(e,t,n,r){var o,i,a,s,u,c,l,f,d;if(d=wv(r),o=kv(e,t.getBody(),r),i=n(t.getBody(),Cv.isAboveLine(1),o),a=At.filter(i,Cv.isLine(1)),u=At.last(o.getClientRects()),Ev(o)&&(d=o.getNode()),Nv(o)&&(d=o.getNode(!0)),!u)return null;if(c=u.left,(s=Ep(a,c))&&xv(s.node))return l=Math.abs(c-s.left),f=Math.abs(c-s.right),Dp(e,t,s.node,l<f);if(d){var m=Cv.positionsUntil(e,t.getBody(),Cv.isAboveLine(1),d);if(s=Ep(At.filter(m,Cv.isLine(1)),c))return Ip(t,s.position.toRange());if(s=At.last(At.filter(m,Cv.isLine(0))))return Ip(t,s.position.toRange())}}(r,e,o,i))?n:(n=Av(e,r,i))||null},Bv=function(e,t){return function(){var n,r,o,i,a,s,u,c,l,f,d=(r=t,i=Ha((n=e).getBody()),a=ji.curry(Sv,i.next),s=ji.curry(Sv,i.prev),u=r?1:-1,c=r?a:s,l=r?Ev:Nv,f=n.selection.getRng(),(o=Tv(u,n,c,l,f))?o:(o=Av(n,u,f))||null);return!!d&&(e.selection.setRng(d),!0)}},Rv=function(e,t){return function(){var n=_v(e,t);return!!n&&(e.selection.setRng(n),!0)}},Dv=function(e,t){return M.bind((n=e,M.map(n,function(e){return Zg.merge({shiftKey:!1,altKey:!1,ctrlKey:!1,metaKey:!1,keyCode:0,action:y.noop},e)})),function(e){return n=e,(r=t).keyCode===n.keyCode&&r.shiftKey===n.shiftKey&&r.altKey===n.altKey&&r.ctrlKey===n.ctrlKey&&r.metaKey===n.metaKey?[e]:[];var n,r});var n},Ov=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=Array.prototype.slice.call(arguments,1);return function(){return e.apply(null,r)}},Pv=function(e,t){return M.find(Dv(e,t),function(e){return e.action()})},Iv=function(e,t){e.on("keydown",function(n){var r,o,i,a;!1===n.isDefaultPrevented()&&(r=e,o=t,i=n,a=Un.detect().os,Pv([{keyCode:Mp.RIGHT,action:Bv(r,!0)},{keyCode:Mp.LEFT,action:Bv(r,!1)},{keyCode:Mp.UP,action:Rv(r,!1)},{keyCode:Mp.DOWN,action:Rv(r,!0)},{keyCode:Mp.RIGHT,action:of.move(r,o,!0)},{keyCode:Mp.LEFT,action:of.move(r,o,!1)},{keyCode:Mp.RIGHT,ctrlKey:!a.isOSX(),altKey:a.isOSX(),action:of.moveNextWord(r,o)},{keyCode:Mp.LEFT,ctrlKey:!a.isOSX(),altKey:a.isOSX(),action:of.movePrevWord(r,o)}],i).each(function(e){i.preventDefault()}))})},Lv=function(e){return 1===Ur.children(e).length},Mv=function(e,t){var n,r=Hn.fromDom(e.getBody()),o=Hn.fromDom(e.selection.getStart()),i=M.filter((n=Uu(o,r),M.findIndex(n,io.isBlock).fold(y.constant(n),function(e){return n.slice(0,e)})),Lv);return M.last(i).map(function(n){var r=ia.fromRangeStart(e.selection.getRng());return!!Cu(t,r,n.dom())&&(function(e,t,n,r){var o=y.curry(kl,t),i=M.map(M.filter(r,o),function(e){return e.dom()});if(0===i.length)mc(t,e,n);else{var a=Sl(n.dom(),i);t.selection.setRng(a.toRange())}}(t,e,n,i),!0)}).getOr(!1)},Fv=function(e,t){return!!e.selection.isCollapsed()&&Mv(e,t)},zv=function(e,t){e.on("keydown",function(n){var r,o,i;!1===n.isDefaultPrevented()&&(r=e,o=t,i=n,Pv([{keyCode:Mp.BACKSPACE,action:Ov(hc,r,!1)},{keyCode:Mp.DELETE,action:Ov(hc,r,!0)},{keyCode:Mp.BACKSPACE,action:Ov(cf,r,o,!1)},{keyCode:Mp.DELETE,action:Ov(cf,r,o,!0)},{keyCode:Mp.BACKSPACE,action:Ov(Ju,r,!1)},{keyCode:Mp.DELETE,action:Ov(Ju,r,!0)},{keyCode:Mp.BACKSPACE,action:Ov(Ku,r,!1)},{keyCode:Mp.DELETE,action:Ov(Ku,r,!0)},{keyCode:Mp.BACKSPACE,action:Ov(zf,r,!1)},{keyCode:Mp.DELETE,action:Ov(zf,r,!0)},{keyCode:Mp.BACKSPACE,action:Ov(Fv,r,!1)},{keyCode:Mp.DELETE,action:Ov(Fv,r,!0)}],i).each(function(e){i.preventDefault()}))}),e.on("keyup",function(t){var n,r;!1===t.isDefaultPrevented()&&(n=e,r=t,Pv([{keyCode:Mp.BACKSPACE,action:Ov(vc,n)},{keyCode:Mp.DELETE,action:Ov(vc,n)}],r))})},Uv=function(e,t,n){var r=e.getParam(t,n);if(-1!==r.indexOf("=")){var o=e.getParam(t,"","hash");return o.hasOwnProperty(e.id)?o[e.id]:n}return r},Vv=function(e){return e.getParam("iframe_attrs",{})},Hv=function(e){return e.getParam("doctype","<!DOCTYPE html>")},qv=function(e){return e.getParam("document_base_url","")},jv=function(e){return Uv(e,"body_id","tinymce")},$v=function(e){return Uv(e,"body_class","")},Wv=function(e){return e.getParam("content_security_policy","")},Kv=function(e){return e.getParam("br_in_pre",!0)},Xv=function(e){if(e.getParam("force_p_newlines",!1))return"p";var t=e.getParam("forced_root_block","p");return!1===t?"":t},Yv=function(e){return e.getParam("forced_root_block_attrs",{})},Gv=function(e){return e.getParam("br_newline_selector",".mce-toc h2,figcaption,caption")},Jv=function(e){return e.getParam("no_newline_selector","")},Qv=function(e){return e.getParam("keep_styles",!0)},Zv=function(e){return e.getParam("end_container_on_empty_block",!1)},ey=function(e){return E.from(e.dom.getParent(e.selection.getStart(!0),e.dom.isBlock))},ty=function(e,t){var n,r,o,i=t,a=e.dom,s=e.schema.getMoveCaretBeforeOnEnterElements();if(t){if(/^(LI|DT|DD)$/.test(t.nodeName)){var u=function(e){for(;e;){if(1===e.nodeType||3===e.nodeType&&e.data&&/[\r\n\s]/.test(e.data))return e;e=e.nextSibling}}(t.firstChild);u&&/^(UL|OL|DL)$/.test(u.nodeName)&&t.insertBefore(a.doc.createTextNode("\xa0"),t.firstChild)}if(o=a.createRng(),t.normalize(),t.hasChildNodes()){for(n=new to(t,t);r=n.current();){if(vo.isText(r)){o.setStart(r,0),o.setEnd(r,0);break}if(s[r.nodeName.toLowerCase()]){o.setStartBefore(r),o.setEndBefore(r);break}i=r,r=n.next()}r||(o.setStart(i,0),o.setEnd(i,0))}else vo.isBr(t)?t.nextSibling&&a.isBlock(t.nextSibling)?(o.setStartBefore(t),o.setEndBefore(t)):(o.setStartAfter(t),o.setEndAfter(t)):(o.setStart(t,0),o.setEnd(t,0));e.selection.setRng(o),a.remove(void 0),e.selection.scrollIntoView(t)}},ny=function(e,t){var n,r,o=e.getRoot();for(n=t;n!==o&&"false"!==e.getContentEditable(n);)"true"===e.getContentEditable(n)&&(r=n),n=n.parentNode;return n!==o?r:o},ry=ey,oy=function(e){return ey(e).fold(y.constant(""),function(e){return e.nodeName.toUpperCase()})},iy=function(e){return ey(e).filter(function(e){return io.isListItem(Hn.fromDom(e))}).isSome()},ay=function(e,t){return e&&e.parentNode&&e.parentNode.nodeName===t},sy=function(e){return e&&/^(OL|UL|LI)$/.test(e.nodeName)},uy=function(e){var t=e.parentNode;return/^(LI|DT|DD)$/.test(t.nodeName)?t:e},cy=function(e,t,n){for(var r=e[n?"firstChild":"lastChild"];r&&!vo.isElement(r);)r=r[n?"nextSibling":"previousSibling"];return r===t},ly=function(e,t,n,r,o){var i=e.dom,a=e.selection.getRng();if(n!==e.getBody()){var s;sy(s=n)&&sy(s.parentNode)&&(o="LI");var u,c,l=o?t(o):i.create("BR");if(cy(n,r,!0)&&cy(n,r,!1))ay(n,"LI")?i.insertAfter(l,uy(n)):i.replace(l,n);else if(cy(n,r,!0))ay(n,"LI")?(i.insertAfter(l,uy(n)),l.appendChild(i.doc.createTextNode(" ")),l.appendChild(n)):n.parentNode.insertBefore(l,n);else if(cy(n,r,!1))i.insertAfter(l,uy(n));else{n=uy(n);var f=a.cloneRange();f.setStartAfter(r),f.setEndAfter(n);var d=f.extractContents();"LI"===o&&(c="LI",(u=d).firstChild&&u.firstChild.nodeName===c)?(l=d.firstChild,i.insertAfter(d,n)):(i.insertAfter(d,n),i.insertAfter(l,n))}i.remove(r),ty(e,l)}},fy=function(e){e.innerHTML='<br data-mce-bogus="1">'},dy=function(e,t){return e.nodeName===t||e.previousSibling&&e.previousSibling.nodeName===t},my=function(e,t){return t&&e.isBlock(t)&&!/^(TD|TH|CAPTION|FORM)$/.test(t.nodeName)&&!/^(fixed|absolute)/i.test(t.style.position)&&"true"!==e.getContentEditable(t)},py=function(e,t,n){return!1===vo.isText(t)?n:e?1===n&&t.data.charAt(n-1)===oi?0:n:n===t.data.length-1&&t.data.charAt(n)===oi?t.data.length:n},gy=function(e,t){var n,r,o=e.getRoot();for(n=t;n!==o&&"false"!==e.getContentEditable(n);)"true"===e.getContentEditable(n)&&(r=n),n=n.parentNode;return n!==o?r:o},hy=function(e,t){var n=Xv(e);n&&n.toLowerCase()===t.tagName.toLowerCase()&&e.dom.setAttribs(t,Yv(e))},vy=function(e,t){var n,r,o,i,a,s,u,c,l,f,d,m,p,g,h,v,y,b,C=e.dom,x=e.schema,w=x.getNonEmptyElements(),N=e.selection.getRng(),E=function(t){var n,i,s,u=o,c=x.getTextInlineElements();if(t||"TABLE"===f||"HR"===f?(n=C.create(t||m),hy(e,n)):n=a.cloneNode(!1),s=n,!1===Qv(e))C.setAttrib(n,"style",null),C.setAttrib(n,"class",null);else do{if(c[u.nodeName]){if(Nl(u))continue;i=u.cloneNode(!1),C.setAttrib(i,"id",""),n.hasChildNodes()?(i.appendChild(n.firstChild),n.appendChild(i)):(s=i,n.appendChild(i))}}while((u=u.parentNode)&&u!==r);return fy(s),n},S=function(e){var t,n,r,s;if(s=py(e,o,i),vo.isText(o)&&(e?s>0:s<o.nodeValue.length))return!1;if(o.parentNode===a&&p&&!e)return!0;if(e&&vo.isElement(o)&&o===a.firstChild)return!0;if(dy(o,"TABLE")||dy(o,"HR"))return p&&!e||!p&&e;for(t=new to(o,a),vo.isText(o)&&(e&&0===s?t.prev():e||s!==o.nodeValue.length||t.next());n=t.current();){if(vo.isElement(n)){if(!n.getAttribute("data-mce-bogus")&&(r=n.nodeName.toLowerCase(),w[r]&&"br"!==r))return!1}else if(vo.isText(n)&&!/^[ \t\r\n]*$/.test(n.nodeValue))return!1;e?t.prev():t.next()}return!0},k=function(){u=/^(H[1-6]|PRE|FIGURE)$/.test(f)&&"HGROUP"!==d?E(m):E(),Zv(e)&&my(C,l)&&C.isEmpty(a)?u=C.split(l,a):C.insertAfter(u,a),ty(e,u)};Jf.normalize(C,N).each(function(e){N.setStart(e.startContainer,e.startOffset),N.setEnd(e.endContainer,e.endOffset)}),o=N.startContainer,i=N.startOffset,m=Xv(e),s=t.shiftKey,vo.isElement(o)&&o.hasChildNodes()&&(p=i>o.childNodes.length-1,o=o.childNodes[Math.min(i,o.childNodes.length-1)]||o,i=p&&vo.isText(o)?o.nodeValue.length:0),(r=gy(C,o))&&((m&&!s||!m&&s)&&(o=function(e,t,n,r,o){var i,a,s,u,c,l,f,d=t||"P",m=e.dom,p=gy(m,r);if(!(a=m.getParent(r,m.isBlock))||!my(m,a)){if(l=(a=a||p)===e.getBody()||(f=a)&&/^(TD|TH|CAPTION)$/.test(f.nodeName)?a.nodeName.toLowerCase():a.parentNode.nodeName.toLowerCase(),!a.hasChildNodes())return i=m.create(d),hy(e,i),a.appendChild(i),n.setStart(i,0),n.setEnd(i,0),i;for(u=r;u.parentNode!==a;)u=u.parentNode;for(;u&&!m.isBlock(u);)s=u,u=u.previousSibling;if(s&&e.schema.isValidChild(l,d.toLowerCase())){for(i=m.create(d),hy(e,i),s.parentNode.insertBefore(i,s),u=s;u&&!m.isBlock(u);)c=u.nextSibling,i.appendChild(u),u=c;n.setStart(r,o),n.setEnd(r,o)}}return r}(e,m,N,o,i)),a=C.getParent(o,C.isBlock),l=a?C.getParent(a.parentNode,C.isBlock):null,f=a?a.nodeName.toUpperCase():"","LI"!==(d=l?l.nodeName.toUpperCase():"")||t.ctrlKey||(a=l,l=l.parentNode,f=d),/^(LI|DT|DD)$/.test(f)&&C.isEmpty(a)?ly(e,E,l,a,m):m&&a===e.getBody()||(m=m||"P",mi.isCaretContainerBlock(a)?(u=mi.showCaretContainerBlock(a),C.isEmpty(a)&&fy(a),ty(e,u)):S()?k():S(!0)?(u=a.parentNode.insertBefore(E(),a),ty(e,dy(a,"HR")?u:a)):((n=(y=N,b=y.cloneRange(),b.setStart(y.startContainer,py(!0,y.startContainer,y.startOffset)),b.setEnd(y.endContainer,py(!1,y.endContainer,y.endOffset)),b).cloneRange()).setEndAfter(a),function(e){do{vo.isText(e)&&(e.nodeValue=e.nodeValue.replace(/^[\r\n]+/,"")),e=e.firstChild}while(e)}(c=n.extractContents()),u=c.firstChild,C.insertAfter(c,a),function(e,t,n){var r,o=n,i=[];if(o){for(;o=o.firstChild;){if(e.isBlock(o))return;vo.isElement(o)&&!t[o.nodeName.toLowerCase()]&&i.push(o)}for(r=i.length;r--;)!(o=i[r]).hasChildNodes()||o.firstChild===o.lastChild&&""===o.firstChild.nodeValue?e.remove(o):(a=o)&&"A"===a.nodeName&&0===Ot.trim(ii(a.innerText||a.textContent)).length&&e.remove(o);var a}}(C,w,u),g=C,(h=a).normalize(),(v=h.lastChild)&&!/^(left|right)$/gi.test(g.getStyle(v,"float",!0))||g.add(h,"br"),C.isEmpty(a)&&fy(a),u.normalize(),C.isEmpty(u)?(C.remove(u),k()):ty(e,u)),C.setAttrib(u,"id",""),e.fire("NewBlock",{newBlock:u})))},yy=function(e,t){return ry(e).filter(function(e){return t.length>0&&_r.is(Hn.fromDom(e),t)}).isSome()},by=function(e){return yy(e,Gv(e))},Cy=function(e){return yy(e,Jv(e))},xy=Qu([{br:[]},{block:[]},{none:[]}]),wy=function(e,t){return Cy(e)},Ny=function(e){return function(t,n){return""===Xv(t)===e}},Ey=function(e){return function(t,n){return iy(t)===e}},Sy=function(e){return function(t,n){return"PRE"===oy(t)===e}},ky=function(e){return function(t,n){return Kv(t)===e}},Ty=function(e,t){return by(e)},Ay=function(e,t){return t},_y=function(e){var t=Xv(e),n=ny(e.dom,e.selection.getStart());return n&&e.schema.isValidChild(n.nodeName,t||"P")},By=function(e,t){return function(n,r){return M.foldl(e,function(e,t){return e&&t(n,r)},!0)?E.some(t):E.none()}},Ry=function(e,t){return Tl([By([wy],xy.none()),By([Sy(!0),ky(!1),Ay],xy.br()),By([Sy(!0),ky(!1)],xy.block()),By([Sy(!0),ky(!0),Ay],xy.block()),By([Sy(!0),ky(!0)],xy.br()),By([Ey(!0),Ay],xy.br()),By([Ey(!0)],xy.block()),By([Ny(!0),Ay,_y],xy.block()),By([Ny(!0)],xy.br()),By([Ty],xy.br()),By([Ny(!1),Ay],xy.br()),By([_y],xy.block())],[e,t.shiftKey]).getOr(xy.none())},Dy=function(e,t){Ry(e,t).fold(function(){sd(e,t)},function(){vy(e,t)},y.noop)},Oy=function(e){e.on("keydown",function(t){var n,r,o;t.keyCode===Mp.ENTER&&(n=e,(r=t).isDefaultPrevented()||(r.preventDefault(),(o=n.undoManager).typing&&(o.typing=!1,o.add()),n.undoManager.transact(function(){!1===n.selection.isCollapsed()&&n.execCommand("Delete"),Dy(n,r)})))})},Py=function(e,t,n){return s=t,!(!Iy(n)||!vo.isText(s.container())||(r=e,i=(o=t).container(),a=o.offset(),i.insertData(a,"\xa0"),r.selection.setCursorLocation(i,a+1),0));var r,o,i,a,s},Iy=function(e){return e.fold(y.constant(!1),y.constant(!0),y.constant(!0),y.constant(!1))},Ly=function(e){return!!e.selection.isCollapsed()&&(t=e,n=y.curry(vu.isInlineTarget,t),r=ia.fromRangeStart(t.selection.getRng()),$l(n,t.getBody(),r).map(y.curry(Py,t,r)).getOr(!1));var t,n,r},My=function(e){e.on("keydown",function(t){var n,r;!1===t.isDefaultPrevented()&&(n=e,r=t,Pv([{keyCode:Mp.SPACEBAR,action:Ov(Ly,n)}],r).each(function(e){r.preventDefault()}))})},Fy=function(e){var t=of.setupSelectedState(e);Iv(e,t),zv(e,t),Oy(e),My(e)},zy=function(e){var t,n,r,o=Ot.each,i=Mp.BACKSPACE,a=Mp.DELETE,s=e.dom,u=e.selection,c=e.settings,l=e.parser,f=me.gecko,d=me.ie,m=me.webkit,p="data:text/mce-internal,",g=d?"Text":"URL",h=function(t,n){try{e.getDoc().execCommand(t,!1,n)}catch(r){}},v=function(e){return e.isDefaultPrevented()},y=function(){e.shortcuts.add("meta+a",null,"SelectAll")},b=function(){e.on("keydown",function(e){if(!v(e)&&e.keyCode===i&&u.isCollapsed()&&0===u.getRng().startOffset){var t=u.getNode().previousSibling;if(t&&t.nodeName&&"table"===t.nodeName.toLowerCase())return e.preventDefault(),!1}})},C=function(){e.inline||(e.contentStyles.push("body {min-height: 150px}"),e.on("click",function(t){var n;if("HTML"===t.target.nodeName){if(me.ie>11)return void e.getBody().focus();n=e.selection.getRng(),e.getBody().focus(),e.selection.setRng(n),e.selection.normalize(),e.nodeChanged()}}))};return e.on("keydown",function(t){var n,r,o,i,a;if(!v(t)&&t.keyCode===Mp.BACKSPACE&&(r=(n=u.getRng()).startContainer,o=n.startOffset,i=s.getRoot(),a=r,n.collapsed&&0===o)){for(;a&&a.parentNode&&a.parentNode.firstChild===a&&a.parentNode!==i;)a=a.parentNode;"BLOCKQUOTE"===a.tagName&&(e.formatter.toggle("blockquote",null,a),(n=s.createRng()).setStart(r,0),n.setEnd(r,0),u.setRng(n))}}),t=function(e){var t=s.create("body"),n=e.cloneContents();return t.appendChild(n),u.serializer.serialize(t,{format:"html"})},e.on("keydown",function(n){var r,o,u,c,l,f=n.keyCode;if(!v(n)&&(f===a||f===i)){if(r=e.selection.isCollapsed(),o=e.getBody(),r&&!s.isEmpty(o))return;if(!r&&(u=e.selection.getRng(),c=t(u),(l=s.createRng()).selectNode(e.getBody()),c!==t(l)))return;n.preventDefault(),e.setContent(""),o.firstChild&&s.isBlock(o.firstChild)?e.selection.setCursorLocation(o.firstChild,0):e.selection.setCursorLocation(o,0),e.nodeChanged()}}),me.windowsPhone||e.on("keyup focusin mouseup",function(e){Mp.modifierPressed(e)||u.normalize()},!0),m&&(e.settings.content_editable||s.bind(e.getDoc(),"mousedown mouseup",function(t){var n;if(t.target===e.getDoc().documentElement)if(n=u.getRng(),e.getBody().focus(),"mousedown"===t.type){if(mi.isCaretContainer(n.startContainer))return;u.placeCaretAt(t.clientX,t.clientY)}else u.setRng(n)}),e.on("click",function(t){var n=t.target;/^(IMG|HR)$/.test(n.nodeName)&&"false"!==s.getContentEditableParent(n)&&(t.preventDefault(),e.selection.select(n),e.nodeChanged()),"A"===n.nodeName&&s.hasClass(n,"mce-item-anchor")&&(t.preventDefault(),u.select(n))}),c.forced_root_block&&e.on("init",function(){h("DefaultParagraphSeparator",c.forced_root_block)}),e.on("init",function(){e.dom.bind(e.getBody(),"submit",function(e){e.preventDefault()})}),b(),l.addNodeFilter("br",function(e){for(var t=e.length;t--;)"Apple-interchange-newline"===e[t].attr("class")&&e[t].remove()}),me.iOS?(e.inline||e.on("keydown",function(){document.activeElement===document.body&&e.getWin().focus()}),C(),e.on("click",function(e){var t=e.target;do{if("A"===t.tagName)return void e.preventDefault()}while(t=t.parentNode)}),e.contentStyles.push(".mce-content-body {-webkit-touch-callout: none}")):y()),me.ie>=11&&(C(),b()),me.ie&&(y(),h("AutoUrlDetect",!1),e.on("dragstart",function(t){var n,r,o;(n=t).dataTransfer&&(e.selection.isCollapsed()&&"IMG"===n.target.tagName&&u.select(n.target),(r=e.selection.getContent()).length>0&&(o=p+escape(e.id)+","+escape(r),n.dataTransfer.setData(g,o)))}),e.on("drop",function(t){if(!v(t)){var n=(a=t).dataTransfer&&(s=a.dataTransfer.getData(g))&&s.indexOf(p)>=0?(s=s.substr(p.length).split(","),{id:unescape(s[0]),html:unescape(s[1])}):null;if(n&&n.id!==e.id){t.preventDefault();var r=Ih(t.x,t.y,e.getDoc());u.setRng(r),o=n.html,i=!0,e.queryCommandSupported("mceInsertClipboardContent")?e.execCommand("mceInsertClipboardContent",!1,{content:o,internal:i}):e.execCommand("mceInsertContent",!1,o)}}var o,i,a,s})),f&&(e.on("keydown",function(t){if(!v(t)&&t.keyCode===i){if(!e.getBody().getElementsByTagName("hr").length)return;if(u.isCollapsed()&&0===u.getRng().startOffset){var n=u.getNode(),r=n.previousSibling;if("HR"===n.nodeName)return s.remove(n),void t.preventDefault();r&&r.nodeName&&"hr"===r.nodeName.toLowerCase()&&(s.remove(r),t.preventDefault())}}}),Range.prototype.getClientRects||e.on("mousedown",function(t){if(!v(t)&&"HTML"===t.target.nodeName){var n=e.getBody();n.blur(),ye.setEditorTimeout(e,function(){n.focus()})}}),n=function(){var t=s.getAttribs(u.getStart().cloneNode(!1));return function(){var n=u.getStart();n!==e.getBody()&&(s.setAttrib(n,"style",null),o(t,function(e){n.setAttributeNode(e.cloneNode(!0))}))}},r=function(){return!u.isCollapsed()&&s.getParent(u.getStart(),s.isBlock)!==s.getParent(u.getEnd(),s.isBlock)},e.on("keypress",function(t){var o;if(!v(t)&&(8===t.keyCode||46===t.keyCode)&&r())return o=n(),e.getDoc().execCommand("delete",!1,null),o(),t.preventDefault(),!1}),s.bind(e.getDoc(),"cut",function(t){var o;!v(t)&&r()&&(o=n(),ye.setEditorTimeout(e,function(){o()}))}),c.readonly||e.on("BeforeExecCommand MouseDown",function(){h("StyleWithCSS",!1),h("enableInlineTableEditing",!1),c.object_resizing||h("enableObjectResizing",!1)}),e.on("SetContent ExecCommand",function(e){"setcontent"!==e.type&&"mceInsertLink"!==e.command||o(s.select("a"),function(e){var t=e.parentNode,n=s.getRoot();if(t.lastChild===e){for(;t&&!s.isBlock(t);){if(t.parentNode.lastChild!==t||t===n)return;t=t.parentNode}s.add(t,"br",{"data-mce-bogus":1})}})}),e.contentStyles.push("img:-moz-broken {-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"),me.mac&&e.on("keydown",function(t){!Mp.metaKeyPressed(t)||t.shiftKey||37!==t.keyCode&&39!==t.keyCode||(t.preventDefault(),e.selection.getSel().modify("move",37===t.keyCode?"backward":"forward","lineboundary"))}),b()),{refreshContentEditable:function(){},isHidden:function(){var t;return!f||e.removed?0:!(t=e.selection.getSel())||!t.rangeCount||0===t.rangeCount}}},Uy=Xo.DOM,Vy=function(e){var t;e.bindPendingEventDelegates(),e.initialized=!0,e.fire("init"),e.focus(!0),e.nodeChanged({initial:!0}),e.execCallback("init_instance_callback",e),(t=e).settings.auto_focus&&ye.setEditorTimeout(t,function(){var e;(e=!0===t.settings.auto_focus?t:t.editorManager.get(t.settings.auto_focus)).destroyed||e.focus()},100)},Hy=function(e,t){var n,r,o,i,a,s,u,c,l,f=e.settings,d=e.getElement(),m=e.getDoc();f.inline||(e.getElement().style.visibility=e.orgVisibility),t||f.content_editable||(m.open(),m.write(e.iframeHTML),m.close()),f.content_editable&&(e.on("remove",function(){var e=this.getBody();Uy.removeClass(e,"mce-content-body"),Uy.removeClass(e,"mce-edit-focus"),Uy.setAttrib(e,"contentEditable",null)}),Uy.addClass(d,"mce-content-body"),e.contentDocument=m=f.content_document||document,e.contentWindow=f.content_window||window,e.bodyElement=d,f.content_document=f.content_window=null,f.root_name=d.nodeName.toLowerCase()),(n=e.getBody()).disabled=!0,e.readonly=f.readonly,e.readonly||(e.inline&&"static"===Uy.getStyle(n,"position",!0)&&(n.style.position="relative"),n.contentEditable=e.getParam("content_editable_state",!0)),n.disabled=!1,e.editorUpload=Jm(e),e.schema=Fo(f),e.dom=new Xo(m,{keep_values:!0,url_converter:e.convertURL,url_converter_scope:e,hex_colors:f.force_hex_style_colors,class_filter:f.class_filter,update_styles:!0,root_element:e.inline?e.getBody():null,collect:f.content_editable,schema:e.schema,onSetAttrib:function(t){e.fire("SetAttrib",t)}}),e.parser=((i=bh((o=e).settings,o.schema)).addAttributeFilter("src,href,style,tabindex",function(e,t){for(var n,r,i,a=e.length,s=o.dom;a--;)if(r=(n=e[a]).attr(t),i="data-mce-"+t,!n.attributes.map[i]){if(0===r.indexOf("data:")||0===r.indexOf("blob:"))continue;"style"===t?((r=s.serializeStyle(s.parseStyle(r),n.name)).length||(r=null),n.attr(i,r),n.attr(t,r)):"tabindex"===t?(n.attr(i,r),n.attr(t,null)):n.attr(i,o.convertURL(r,t,n.name))}}),i.addNodeFilter("script",function(e){for(var t,n,r=e.length;r--;)0!==(n=(t=e[r]).attr("type")||"no/type").indexOf("mce-")&&t.attr("type","mce-"+n)}),i.addNodeFilter("#cdata",function(e){for(var t,n=e.length;n--;)(t=e[n]).type=8,t.name="#comment",t.value="[CDATA["+t.value+"]]"}),i.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div",function(e){for(var t,n=e.length,r=o.schema.getNonEmptyElements();n--;)(t=e[n]).isEmpty(r)&&0===t.getAll("br").length&&(t.append(new fh("br",1)).shortEnded=!0)}),i),e.serializer=Nh(f,e),e.selection=vv(e.dom,e.getWin(),e.serializer,e),e.formatter=Yg(e),e.undoManager=rg(e),e._nodeChangeDispatcher=new tp(e),e._selectionOverrides=Hp(e),kh(e),Fy(e),ep(e),e.fire("PreInit"),f.browser_spellcheck||f.gecko_spellcheck||(m.body.spellcheck=!1,Uy.setAttrib(n,"spellcheck","false")),e.quirks=zy(e),e.fire("PostRender"),f.directionality&&(n.dir=f.directionality),f.nowrap&&(n.style.whiteSpace="nowrap"),f.protect&&e.on("BeforeSetContent",function(e){Ot.each(f.protect,function(t){e.content=e.content.replace(t,function(e){return"\x3c!--mce:protected "+escape(e)+"--\x3e"})})}),e.on("SetContent",function(){e.addVisual(e.getBody())}),f.padd_empty_editor&&e.on("PostProcess",function(e){e.content=e.content.replace(/^(<p[^>]*>(&nbsp;|&#160;|\s|\u00a0|<br \/>|)<\/p>[\r\n]*|<br \/>[\r\n]*)$/,"")}),e.load({initial:!0,format:"html"}),e.startContent=e.getContent({format:"raw"}),e.on("compositionstart compositionend",function(t){e.composing="compositionstart"===t.type}),e.contentStyles.length>0&&(r="",Ot.each(e.contentStyles,function(e){r+=e+"\r\n"}),e.dom.addStyle(r)),(a=e,a.inline?Uy.styleSheetLoader:a.dom.styleSheetLoader).loadAll(e.contentCSS,function(t){Vy(e)},function(t){Vy(e)}),f.content_style&&(s=e,u=f.content_style,c=Hn.fromDom(s.getDoc().head),l=Hn.fromTag("style"),dr.set(l,"type","text/css"),ks.append(l,Hn.fromText(u)),ks.append(c,l))},qy=Xo.DOM,jy=function(e,t){var n,r,o,i,a,s,u,c=e.editorManager.translate("Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"),l=(n=e.id,r=c,o=t.height,i=Vv(e),u=Hn.fromTag("iframe"),dr.setAll(u,i),dr.setAll(u,{id:n+"_ifr",frameBorder:"0",allowTransparency:"true",title:r}),br(u,{width:"100%",height:(a=o,s="number"==typeof a?a+"px":a,s||""),display:"block"}),u).dom();l.onload=function(){l.onload=null,e.fire("load")};var f,d,m,p,g=function(e,t){if(document.domain!==window.location.hostname&&me.ie&&me.ie<12){var n=Gm("mce");e[n]=function(){Hy(e)};var r='javascript:(function(){document.open();document.domain="'+document.domain+'";var ed = window.parent.tinymce.get("'+e.id+'");document.write(ed.iframeHTML);document.close();ed.'+n+"(true);})()";return qy.setAttrib(t,"src",r),!0}return!1}(e,l);return e.contentAreaContainer=t.iframeContainer,e.iframeElement=l,e.iframeHTML=(p=Hv(f=e)+"<html><head>",qv(f)!==f.documentBaseUrl&&(p+='<base href="'+f.documentBaseURI.getURI()+'" />'),p+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',d=jv(f),m=$v(f),Wv(f)&&(p+='<meta http-equiv="Content-Security-Policy" content="'+Wv(f)+'" />'),p+='</head><body id="'+d+'" class="mce-content-body '+m+'" data-id="'+f.id+'"><br></body></html>'),qy.add(t.iframeContainer,l),g},$y=function(e,t){var n=jy(e,t);t.editorContainer&&(qy.get(t.editorContainer).style.display=e.orgDisplay,e.hidden=qy.isHidden(t.editorContainer)),e.getElement().style.display="none",qy.setAttrib(e.id,"aria-hidden",!0),n||Hy(e)},Wy=Xo.DOM,Ky=function(e,t,n){var r,o,i=Im.get(n);if(r=Im.urls[n]||e.documentBaseUrl.replace(/\/$/,""),n=Ot.trim(n),i&&-1===Ot.inArray(t,n)){if(Ot.each(Im.dependencies(n),function(n){Ky(e,t,n)}),e.plugins[n])return;o=new i(e,r,e.$),e.plugins[n]=o,o.init&&(o.init(e,r),t.push(n))}},Xy=function(e){return e.replace(/^\-/,"")},Yy=function(e){return{editorContainer:e,iframeContainer:e}},Gy=function(e){var t,n,r=e.getElement();return e.inline?Yy(null):(t=r,n=Wy.create("div"),Wy.insertAfter(n,t),Yy(n))},Jy=function(e){var t,n,r,o,i,a,s,u,c,l,f,d=e.settings,m=e.getElement();return e.orgDisplay=m.style.display,tr.isString(d.theme)?(l=(o=e).settings,f=o.getElement(),i=l.width||Wy.getStyle(f,"width")||"100%",a=l.height||Wy.getStyle(f,"height")||f.offsetHeight,s=l.min_height||100,(u=/^[0-9\.]+(|px)$/i).test(""+i)&&(i=Math.max(parseInt(i,10),100)),u.test(""+a)&&(a=Math.max(parseInt(a,10),s)),c=o.theme.renderUI({targetNode:f,width:i,height:a,deltaWidth:l.delta_width,deltaHeight:l.delta_height}),l.content_editable||(a=(c.iframeHeight||a)+("number"==typeof a?c.deltaHeight||0:""))<s&&(a=s),c.height=a,c):tr.isFunction(d.theme)?(r=(t=e).getElement(),(n=t.settings.theme(t,r)).editorContainer.nodeType&&(n.editorContainer.id=n.editorContainer.id||t.id+"_parent"),n.iframeContainer&&n.iframeContainer.nodeType&&(n.iframeContainer.id=n.iframeContainer.id||t.id+"_iframecontainer"),n.height=n.iframeHeight?n.iframeHeight:r.offsetHeight,n):Gy(e)},Qy=function(e){var t,n,r,o,i,a,s=e.settings,u=e.getElement();return e.rtl=s.rtl_ui||e.editorManager.i18n.rtl,e.editorManager.i18n.setCode(s.language),s.aria_label=s.aria_label||Wy.getAttrib(u,"aria-label",e.getLang("aria.rich_text_area")),e.fire("ScriptsLoaded"),o=(n=e).settings.theme,tr.isString(o)?(n.settings.theme=Xy(o),r=Lm.get(o),n.theme=new r(n,Lm.urls[o]),n.theme.init&&n.theme.init(n,Lm.urls[o]||n.documentBaseUrl.replace(/\/$/,""),n.$)):n.theme={},i=e,a=[],Ot.each(i.settings.plugins.split(/[ ,]/),function(e){Ky(i,a,Xy(e))}),t=Jy(e),e.editorContainer=t.editorContainer?t.editorContainer:null,s.content_css&&Ot.each(Ot.explode(s.content_css),function(t){e.contentCSS.push(e.documentBaseURI.toAbsolute(t))}),s.content_editable?Hy(e):$y(e,t)},Zy=Xo.DOM,eb=function(e){return"-"===e.charAt(0)},tb=function(e,t){var n=Zo.ScriptLoader;!function(e,t,n,r){var o=t.settings,i=o.theme;if(tr.isString(i)){if(!eb(i)&&!Lm.urls.hasOwnProperty(i)){var a=o.theme_url;a?Lm.load(i,t.documentBaseURI.toAbsolute(a)):Lm.load(i,"themes/"+i+"/theme"+n+".js")}e.loadQueue(function(){Lm.waitFor(i,r)})}else r()}(n,e,t,function(){var r,o,i,a,s;r=n,(i=(o=e).settings).language&&"en"!==i.language&&!i.language_url&&(i.language_url=o.editorManager.baseURL+"/langs/"+i.language+".js"),i.language_url&&!o.editorManager.i18n.data[i.language]&&r.add(i.language_url),a=e.settings,s=t,Ot.isArray(a.plugins)&&(a.plugins=a.plugins.join(" ")),Ot.each(a.external_plugins,function(e,t){Im.load(t,e),a.plugins+=" "+t}),Ot.each(a.plugins.split(/[ ,]/),function(e){if((e=Ot.trim(e))&&!Im.urls[e])if(eb(e)){e=e.substr(1,e.length);var t=Im.dependencies(e);Ot.each(t,function(e){var t={prefix:"plugins/",resource:e,suffix:"/plugin"+s+".js"};e=Im.createUrl(t,e),Im.load(e.resource,e)})}else Im.load(e,{prefix:"plugins/",resource:e,suffix:"/plugin"+s+".js"})}),n.loadQueue(function(){e.removed||Qy(e)},e,function(t){Rm(e,t[0]),e.removed||Qy(e)})})},nb=function(e){var t=e.settings,n=e.id,r=function(){Zy.unbind(window,"ready",r),e.render()};if(Te.Event.domLoaded){if(e.getElement()&&me.contentEditable){t.inline?e.inline=!0:(e.orgVisibility=e.getElement().style.visibility,e.getElement().style.visibility="hidden");var o=e.getElement().form||Zy.getParent(n,"form");o&&(e.formElement=o,t.hidden_input&&!/TEXTAREA|INPUT/i.test(e.getElement().nodeName)&&(Zy.insertAfter(Zy.create("input",{type:"hidden",name:n}),n),e.hasHiddenInput=!0),e.formEventDelegate=function(t){e.fire(t.type,t)},Zy.bind(o,"submit reset",e.formEventDelegate),e.on("reset",function(){e.setContent(e.startContent,{format:"raw"})}),!t.submit_patch||o.submit.nodeType||o.submit.length||o._mceOldSubmit||(o._mceOldSubmit=o.submit,o.submit=function(){return e.editorManager.triggerSave(),e.setDirty(!1),o._mceOldSubmit(o)})),e.windowManager=km(e),e.notificationManager=Sm(e),"xml"===t.encoding&&e.on("GetContent",function(e){e.save&&(e.content=Zy.encode(e.content))}),t.add_form_submit_trigger&&e.on("submit",function(){e.initialized&&e.save()}),t.add_unload_trigger&&(e._beforeUnload=function(){!e.initialized||e.destroyed||e.isHidden()||e.save({format:"raw",no_events:!0,set_dirty:!1})},e.editorManager.on("BeforeUnload",e._beforeUnload)),e.editorManager.add(e),tb(e,e.suffix)}}else Zy.bind(window,"ready",r)},rb=function(e,t,n){var r=e.sidebars?e.sidebars:[];r.push({name:t,settings:n}),e.sidebars=r},ob=Ot.each,ib=Ot.trim,ab="source protocol authority userInfo user password host port relative path directory file query anchor".split(" "),sb={ftp:21,http:80,https:443,mailto:25},ub=function(e,t){var n,r,o=this;if(e=ib(e),n=(t=o.settings=t||{}).base_uri,/^([\w\-]+):([^\/]{2})/i.test(e)||/^\s*#/.test(e))o.source=e;else{var i=0===e.indexOf("//");0!==e.indexOf("/")||i||(e=(n&&n.protocol||"http")+"://mce_host"+e),/^[\w\-]*:?\/\//.test(e)||(r=t.base_uri?t.base_uri.path:new ub(document.location.href).directory,""==t.base_uri.protocol?e="//mce_host"+o.toAbsPath(r,e):(e=/([^#?]*)([#?]?.*)/.exec(e),e=(n&&n.protocol||"http")+"://mce_host"+o.toAbsPath(r,e[1])+e[2])),e=e.replace(/@@/g,"(mce_at)"),e=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(e),ob(ab,function(t,n){var r=e[n];r&&(r=r.replace(/\(mce_at\)/g,"@@")),o[t]=r}),n&&(o.protocol||(o.protocol=n.protocol),o.userInfo||(o.userInfo=n.userInfo),o.port||"mce_host"!==o.host||(o.port=n.port),o.host&&"mce_host"!==o.host||(o.host=n.host),o.source=""),i&&(o.protocol="")}};ub.prototype={setPath:function(e){e=/^(.*?)\/?(\w+)?$/.exec(e),this.path=e[0],this.directory=e[1],this.file=e[2],this.source="",this.getURI()},toRelative:function(e){var t;if("./"===e)return e;if("mce_host"!==(e=new ub(e,{base_uri:this})).host&&this.host!==e.host&&e.host||this.port!==e.port||this.protocol!==e.protocol&&""!==e.protocol)return e.getURI();var n=this.getURI(),r=e.getURI();return n===r||"/"===n.charAt(n.length-1)&&n.substr(0,n.length-1)===r?n:(t=this.toRelPath(this.path,e.path),e.query&&(t+="?"+e.query),e.anchor&&(t+="#"+e.anchor),t)},toAbsolute:function(e,t){return(e=new ub(e,{base_uri:this})).getURI(t&&this.isSameOrigin(e))},isSameOrigin:function(e){if(this.host==e.host&&this.protocol==e.protocol){if(this.port==e.port)return!0;var t=sb[this.protocol];if(t&&(this.port||t)==(e.port||t))return!0}return!1},toRelPath:function(e,t){var n,r,o,i=0,a="";if(e=(e=e.substring(0,e.lastIndexOf("/"))).split("/"),n=t.split("/"),e.length>=n.length)for(r=0,o=e.length;r<o;r++)if(r>=n.length||e[r]!==n[r]){i=r+1;break}if(e.length<n.length)for(r=0,o=n.length;r<o;r++)if(r>=e.length||e[r]!==n[r]){i=r+1;break}if(1===i)return t;for(r=0,o=e.length-(i-1);r<o;r++)a+="../";for(r=i-1,o=n.length;r<o;r++)a+=r!==i-1?"/"+n[r]:n[r];return a},toAbsPath:function(e,t){var n,r,o,i=0,a=[];for(r=/\/$/.test(t)?"/":"",e=e.split("/"),t=t.split("/"),ob(e,function(e){e&&a.push(e)}),e=a,n=t.length-1,a=[];n>=0;n--)0!==t[n].length&&"."!==t[n]&&(".."!==t[n]?i>0?i--:a.push(t[n]):i++);return 0!==(o=(n=e.length-i)<=0?a.reverse().join("/"):e.slice(0,n).join("/")+"/"+a.reverse().join("/")).indexOf("/")&&(o="/"+o),r&&o.lastIndexOf("/")!==o.length-1&&(o+=r),o},getURI:function(e){var t,n=this;return n.source&&!e||(t="",e||(n.protocol?t+=n.protocol+"://":t+="//",n.userInfo&&(t+=n.userInfo+"@"),n.host&&(t+=n.host),n.port&&(t+=":"+n.port)),n.path&&(t+=n.path),n.query&&(t+="?"+n.query),n.anchor&&(t+="#"+n.anchor),n.source=t),n.source}},ub.parseDataUri=function(e){var t,n;return e=decodeURIComponent(e).split(","),(n=/data:([^;]+)/.exec(e[0]))&&(t=n[1]),{type:t,data:e[1]}},ub.getDocumentBaseUrl=function(e){var t;return t=0!==e.protocol.indexOf("http")&&"file:"!==e.protocol?e.href:e.protocol+"//"+e.host+e.pathname,/^[^:]+:\/\/\/?[^\/]+\//.test(t)&&(t=t.replace(/[\?#].*$/,"").replace(/[\/\\][^\/]+$/,""),/[\/\\]$/.test(t)||(t+="/")),t};var cb=Xo.DOM,lb=Ot.extend,fb=Ot.each,db=Ot.trim,mb=Ot.resolve,pb=me.ie,gb=function(e,t,n){var r,o,i,a,s,u,c,l,f,d=this;r=d.documentBaseUrl=n.documentBaseURL,o=n.baseURI,i=d,a=e,s=r,u=n.defaultSettings,c=t,f={id:a,theme:"modern",delta_width:0,delta_height:0,popup_css:"",plugins:"",document_base_url:s,add_form_submit_trigger:!0,submit_patch:!0,add_unload_trigger:!0,convert_urls:!0,relative_urls:!0,remove_script_host:!0,object_resizing:!0,doctype:"<!DOCTYPE html>",visual:!0,font_size_style_values:"xx-small,x-small,small,medium,large,x-large,xx-large",font_size_legacy_values:"xx-small,small,medium,large,x-large,xx-large,300%",forced_root_block:"p",hidden_input:!0,padd_empty_editor:!0,render_ui:!0,indentation:"30px",inline_styles:!0,convert_fonts_to_spans:!0,indent:"simple",indent_before:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",indent_after:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",entity_encoding:"named",url_converter:(l=i).convertURL,url_converter_scope:l,ie7_compat:!0},t=lu(ou,f,u,c),d.settings=t,ti.language=t.language||"en",ti.languageLoad=t.language_load,ti.baseURL=n.baseURL,d.id=e,d.setDirty(!1),d.plugins={},d.documentBaseURI=new ub(t.document_base_url,{base_uri:o}),d.baseURI=o,d.contentCSS=[],d.contentStyles=[],d.shortcuts=new Jd(d),d.loadedCSS={},d.editorCommands=new Od(d),d.suffix=n.suffix,d.editorManager=n,d.inline=t.inline,d.buttons={},d.menuItems={},t.cache_suffix&&(me.cacheSuffix=t.cache_suffix.replace(/^[\?\&]+/,"")),!1===t.override_viewport&&(me.overrideViewPort=!1),n.fire("SetupEditor",d),d.execCallback("setup",d),d.$=Qt.overrideDefaults(function(){return{context:d.inline?d.getBody():d.getDoc(),element:d.getBody()}})};lb(gb.prototype={render:function(){nb(this)},focus:function(e){gm(this,e)},execCallback:function(e){var t,n=this.settings[e];if(n)return this.callbackLookup&&(t=this.callbackLookup[e])&&(n=t.func,t=t.scope),"string"==typeof n&&(t=(t=n.replace(/\.\w+$/,""))?mb(t):0,n=mb(n),this.callbackLookup=this.callbackLookup||{},this.callbackLookup[e]={func:n,scope:t}),n.apply(t||this,Array.prototype.slice.call(arguments,1))},translate:function(e){if(e&&Ot.is(e,"string")){var t=this.settings.language||"en",n=this.editorManager.i18n;e=n.data[t+"."+e]||e.replace(/\{\#([^\}]+)\}/g,function(e,r){return n.data[t+"."+r]||"{#"+r+"}"})}return this.editorManager.translate(e)},getLang:function(e,t){return this.editorManager.i18n.data[(this.settings.language||"en")+"."+e]||(t!==undefined?t:"{#"+e+"}")},getParam:function(e,t,n){return mu(this,e,t,n)},nodeChanged:function(e){this._nodeChangeDispatcher.nodeChanged(e)},addButton:function(e,t){var n=this;t.cmd&&(t.onclick=function(){n.execCommand(t.cmd)}),t.stateSelector&&"undefined"==typeof t.active&&(t.active=!1),t.text||t.icon||(t.icon=e),n.buttons=n.buttons,t.tooltip=t.tooltip||t.title,n.buttons[e]=t},addSidebar:function(e,t){return rb(this,e,t)},addMenuItem:function(e,t){var n=this;t.cmd&&(t.onclick=function(){n.execCommand(t.cmd)}),n.menuItems=n.menuItems,n.menuItems[e]=t},addContextToolbar:function(e,t){var n,r=this;r.contextToolbars=r.contextToolbars||[],"string"==typeof e&&(n=e,e=function(e){return r.dom.is(e,n)}),r.contextToolbars.push({id:Gm("mcet"),predicate:e,items:t})},addCommand:function(e,t,n){this.editorCommands.addCommand(e,t,n)},addQueryStateHandler:function(e,t,n){this.editorCommands.addQueryStateHandler(e,t,n)},addQueryValueHandler:function(e,t,n){this.editorCommands.addQueryValueHandler(e,t,n)},addShortcut:function(e,t,n,r){this.shortcuts.add(e,t,n,r)},execCommand:function(e,t,n,r){return this.editorCommands.execCommand(e,t,n,r)},queryCommandState:function(e){return this.editorCommands.queryCommandState(e)},queryCommandValue:function(e){return this.editorCommands.queryCommandValue(e)},queryCommandSupported:function(e){return this.editorCommands.queryCommandSupported(e)},show:function(){this.hidden&&(this.hidden=!1,this.inline?this.getBody().contentEditable=!0:(cb.show(this.getContainer()),cb.hide(this.id)),this.load(),this.fire("show"))},hide:function(){var e=this,t=e.getDoc();e.hidden||(pb&&t&&!e.inline&&t.execCommand("SelectAll"),e.save(),e.inline?(e.getBody().contentEditable=!1,e===e.editorManager.focusedEditor&&(e.editorManager.focusedEditor=null)):(cb.hide(e.getContainer()),cb.setStyle(e.id,"display",e.orgDisplay)),e.hidden=!0,e.fire("hide"))},isHidden:function(){return!!this.hidden},setProgressState:function(e,t){this.fire("ProgressState",{state:e,time:t})},load:function(e){var t,n=this.getElement();return this.removed?"":n?((e=e||{}).load=!0,t=this.setContent(n.value!==undefined?n.value:n.innerHTML,e),e.element=n,e.no_events||this.fire("LoadContent",e),e.element=n=null,t):void 0},save:function(e){var t,n,r=this,o=r.getElement();if(o&&r.initialized&&!r.removed)return(e=e||{}).save=!0,e.element=o,e.content=r.getContent(e),e.no_events||r.fire("SaveContent",e),"raw"===e.format&&r.fire("RawSaveContent",e),t=e.content,/TEXTAREA|INPUT/i.test(o.nodeName)?o.value=t:(r.inline||(o.innerHTML=t),(n=cb.getParent(r.id,"form"))&&fb(n.elements,function(e){if(e.name===r.id)return e.value=t,!1})),e.element=o=null,!1!==e.set_dirty&&r.setDirty(!1),t},setContent:function(e,t){var n,r,o=this,i=o.getBody();return(t=t||{}).format=t.format||"html",t.set=!0,t.content=e,t.no_events||o.fire("BeforeSetContent",t),0===(e=t.content).length||/^\s+$/.test(e)?(r=pb&&pb<11?"":'<br data-mce-bogus="1">',"TABLE"===i.nodeName?e="<tr><td>"+r+"</td></tr>":/^(UL|OL)$/.test(i.nodeName)&&(e="<li>"+r+"</li>"),(n=o.settings.forced_root_block)&&o.schema.isValidChild(i.nodeName.toLowerCase(),n.toLowerCase())?(e=r,e=o.dom.createHTML(n,o.settings.forced_root_block_attrs,e)):pb||e||(e='<br data-mce-bogus="1">'),o.dom.setHTML(i,e),o.fire("SetContent",t)):("raw"!==t.format&&(e=zs({validate:o.validate},o.schema).serialize(o.parser.parse(e,{isRootContent:!0,insert:!0}))),t.content=db(e),o.dom.setHTML(i,t.content),t.no_events||o.fire("SetContent",t)),t.content},getContent:function(e){var t,n=this.getBody();if(this.removed)return"";if((e=e||{}).format=e.format||"html",e.get=!0,e.getInner=!0,e.no_events||this.fire("BeforeGetContent",e),"raw"===e.format)t=Ot.trim(om(this.serializer,n.innerHTML));else if("text"===e.format)t=n.innerText||n.textContent;else{if("tree"===e.format)return this.serializer.serialize(n,e);t=this.serializer.serialize(n,e)}return"text"!==e.format?e.content=db(t):e.content=t,e.no_events||this.fire("GetContent",e),e.content},insertContent:function(e,t){t&&(e=lb({content:e},t)),this.execCommand("mceInsertContent",!1,e)},isDirty:function(){return!this.isNotDirty},setDirty:function(e){var t=!this.isNotDirty;this.isNotDirty=!e,e&&e!==t&&this.fire("dirty")},setMode:function(e){Wd(this,e)},getContainer:function(){return this.container||(this.container=cb.get(this.editorContainer||this.id+"_parent")),this.container},getContentAreaContainer:function(){return this.contentAreaContainer},getElement:function(){return this.targetElm||(this.targetElm=cb.get(this.id)),this.targetElm},getWin:function(){var e;return this.contentWindow||(e=this.iframeElement)&&(this.contentWindow=e.contentWindow),this.contentWindow},getDoc:function(){var e;return this.contentDocument||(e=this.getWin())&&(this.contentDocument=e.document),this.contentDocument},getBody:function(){var e=this.getDoc();return this.bodyElement||(e?e.body:null)},convertURL:function(e,t,n){var r=this.settings;return r.urlconverter_callback?this.execCallback("urlconverter_callback",e,n,!0,t):!r.convert_urls||n&&"LINK"===n.nodeName||0===e.indexOf("file:")||0===e.length?e:r.relative_urls?this.documentBaseURI.toRelative(e):e=this.documentBaseURI.toAbsolute(e,r.remove_script_host)},addVisual:function(e){var t,n=this,r=n.settings,o=n.dom;e=e||n.getBody(),n.hasVisual===undefined&&(n.hasVisual=r.visual),fb(o.select("table,a",e),function(e){var i;switch(e.nodeName){case"TABLE":return t=r.visual_table_class||"mce-item-table",void((i=o.getAttrib(e,"border"))&&"0"!==i||!n.hasVisual?o.removeClass(e,t):o.addClass(e,t));case"A":return void(o.getAttrib(e,"href",!1)||(i=o.getAttrib(e,"name")||e.id,t=r.visual_anchor_class||"mce-item-anchor",i&&n.hasVisual?o.addClass(e,t):o.removeClass(e,t)))}}),n.fire("VisualAid",{element:e,hasVisual:n.hasVisual})},remove:function(){var e=this;e.removed||(e.save(),e.removed=1,e.unbindAllNativeEvents(),e.hasHiddenInput&&cb.remove(e.getElement().nextSibling),e.inline||(pb&&pb<10&&e.getDoc().execCommand("SelectAll",!1,null),cb.setStyle(e.id,"display",e.orgDisplay),e.getBody().onload=null),e.fire("remove"),e.editorManager.remove(e),cb.remove(e.getContainer()),e._selectionOverrides.destroy(),e.editorUpload.destroy(),e.destroy())},destroy:function(e){var t,n=this;n.destroyed||(e||n.removed?(e||(n.editorManager.off("beforeunload",n._beforeUnload),n.theme&&n.theme.destroy&&n.theme.destroy(),n.selection.destroy(),n.dom.destroy()),(t=n.formElement)&&(t._mceOldSubmit&&(t.submit=t._mceOldSubmit,t._mceOldSubmit=null),cb.unbind(t,"submit reset",n.formEventDelegate)),n.contentAreaContainer=n.formElement=n.container=n.editorContainer=null,n.bodyElement=n.contentDocument=n.contentWindow=null,n.iframeElement=n.targetElm=null,n.selection&&(n.selection=n.selection.win=n.selection.dom=n.selection.dom.doc=null),n.destroyed=1):n.remove())},uploadImages:function(e){return this.editorUpload.uploadImages(e)},_scanForImages:function(){return this.editorUpload.scanForImages()}},qd);var hb,vb,yb,bb={isEditorUIElement:function(e){return-1!==e.className.toString().indexOf("mce-")}},Cb=function(e,t){var n,r,o=Un.detect().browser;o.isIE()||o.isEdge()?(r=e).on("focusout",function(){Sd(r)}):(n=t,e.on("mouseup touchend",function(e){n.throttle()})),e.on("keyup nodechange",function(t){var n;"nodechange"===(n=t).type&&n.selectionChange||Sd(e)})},xb=function(e){var t,n,r,o=Tp(function(){Sd(e)},0);e.inline&&(t=e,n=o,r=function(){n.throttle()},Xo.DOM.bind(document,"mouseup",r),t.on("remove",function(){Xo.DOM.unbind(document,"mouseup",r)})),e.on("init",function(){Cb(e,o)}),e.on("remove",function(){o.cancel()})},wb=Xo.DOM,Nb=function(e){return bb.isEditorUIElement(e)},Eb=function(e,t){var n=e?e.settings.custom_ui_selector:"";return null!==wb.getParent(t,function(t){return Nb(t)||!!n&&e.dom.is(t,n)})},Sb=function(e,t){var n=t.editor;xb(n),n.on("focusin",function(){var t=e.focusedEditor;t!==this&&(t&&t.fire("blur",{focusedEditor:this}),e.setActive(this),e.focusedEditor=this,this.fire("focus",{blurredEditor:t}),this.focus(!0))}),n.on("focusout",function(){var t=this;ye.setEditorTimeout(t,function(){var n=e.focusedEditor;Eb(t,function(){try{return document.activeElement}catch(e){return document.body}}())||n!==t||(t.fire("blur",{focusedEditor:null}),e.focusedEditor=null)})}),hb||(hb=function(t){var n,r=e.activeEditor;n=t.target,r&&n.ownerDocument===document&&(n===document.body||Eb(r,n)||e.focusedEditor!==r||(r.fire("blur",{focusedEditor:null}),e.focusedEditor=null))},wb.bind(document,"focusin",hb))},kb=function(e,t){e.focusedEditor===t.editor&&(e.focusedEditor=null),e.activeEditor||(wb.unbind(document,"focusin",hb),hb=null)},Tb=function(e){e.on("AddEditor",y.curry(Sb,e)),e.on("RemoveEditor",y.curry(kb,e))},Ab={},_b="en",Bb={setCode:function(e){e&&(_b=e,this.rtl=!!this.data[e]&&"rtl"===this.data[e]._dir)},getCode:function(){return _b},rtl:!1,add:function(e,t){var n=Ab[e];for(var r in n||(Ab[e]=n={}),t)n[r]=t[r];this.setCode(e)},translate:function(e){var t=Ab[_b]||{},n=function(e){return Ot.is(e,"function")?Object.prototype.toString.call(e):r(e)?"":""+e},r=function(e){return""===e||null===e||Ot.is(e,"undefined")},o=function(e){return e=n(e),Ot.hasOwn(t,e)?n(t[e]):e};if(r(e))return"";if(Ot.is(e,"object")&&Ot.hasOwn(e,"raw"))return n(e.raw);if(Ot.is(e,"array")){var i=e.slice(1);e=o(e[0]).replace(/\{([0-9]+)\}/g,function(e,t){return Ot.hasOwn(i,t)?n(i[t]):e})}return o(e).replace(/{context:\w+}$/,"")},data:Ab},Rb=Xo.DOM,Db=Ot.explode,Ob=Ot.each,Pb=Ot.extend,Ib=0,Lb=!1,Mb=[],Fb=[],zb=function(e){Ob(yb.get(),function(t){"scroll"===e.type?t.fire("ScrollWindow",e):t.fire("ResizeWindow",e)})},Ub=function(e){e!==Lb&&(e?Qt(window).on("resize scroll",zb):Qt(window).off("resize scroll",zb),Lb=e)},Vb=function(e){var t=Fb;delete Mb[e.id];for(var n=0;n<Mb.length;n++)if(Mb[n]===e){Mb.splice(n,1);break}return Fb=M.filter(Fb,function(t){return e!==t}),yb.activeEditor===e&&(yb.activeEditor=Fb.length>0?Fb[0]:null),yb.focusedEditor===e&&(yb.focusedEditor=null),t.length!==Fb.length};Pb(yb={defaultSettings:{},$:Qt,majorVersion:"4",minorVersion:"7.5",releaseDate:"2018-01-22",editors:Mb,i18n:Bb,activeEditor:null,settings:{},setup:function(){var e,t,n,r,o="";if(t=ub.getDocumentBaseUrl(document.location),/^[^:]+:\/\/\/?[^\/]+\//.test(t)&&(t=t.replace(/[\?#].*$/,"").replace(/[\/\\][^\/]+$/,""),/[\/\\]$/.test(t)||(t+="/")),n=window.tinymce||window.tinyMCEPreInit)e=n.base||n.baseURL,o=n.suffix;else{for(var i=document.getElementsByTagName("script"),a=0;a<i.length;a++){var s=(r=i[a].src).substring(r.lastIndexOf("/"));if(/tinymce(\.full|\.jquery|)(\.min|\.dev|)\.js/.test(r)){-1!==s.indexOf(".min")&&(o=".min"),e=r.substring(0,r.lastIndexOf("/"));break}}!e&&document.currentScript&&(-1!==(r=document.currentScript.src).indexOf(".min")&&(o=".min"),e=r.substring(0,r.lastIndexOf("/")))}this.baseURL=new ub(t).toAbsolute(e),this.documentBaseURL=t,this.baseURI=new ub(this.baseURL),this.suffix=o,Tb(this)},overrideDefaults:function(e){var t,n;(t=e.base_url)&&(this.baseURL=new ub(this.documentBaseURL).toAbsolute(t.replace(/\/+$/,"")),this.baseURI=new ub(this.baseURL)),n=e.suffix,e.suffix&&(this.suffix=n),this.defaultSettings=e;var r=e.plugin_base_urls;for(var o in r)ti.PluginManager.urls[o]=r[o]},init:function(e){var t,n,r=this;n=Ot.makeMap("area base basefont br col frame hr img input isindex link meta param embed source wbr track colgroup option tbody tfoot thead tr script noscript style textarea video audio iframe object menu"," ");var o=function(e){var t=e.id;return t||(t=(t=e.name)&&!Rb.get(t)?e.name:Rb.uniqueId(),e.setAttribute("id",t)),t},i=function(e,t){return t.constructor===RegExp?t.test(e.className):Rb.hasClass(e,t)},a=function(e){t=e},s=function(){var t,u=0,c=[],l=function(e,n,o){var i=new gb(e,n,r);c.push(i),i.on("init",function(){++u===t.length&&a(c)}),i.targetElm=i.targetElm||o,i.render()};Rb.unbind(window,"ready",s),function(t){var n=e[t];n&&n.apply(r,Array.prototype.slice.call(arguments,2))}("onpageload"),t=Qt.unique(function(e){var t,n=[];if(me.ie&&me.ie<11)return Pm("TinyMCE does not support the browser you are using. For a list of supported browsers please see: https://www.tinymce.com/docs/get-started/system-requirements/"),[];if(e.types)return Ob(e.types,function(e){n=n.concat(Rb.select(e.selector))}),n;if(e.selector)return Rb.select(e.selector);if(e.target)return[e.target];switch(e.mode){case"exact":(t=e.elements||"").length>0&&Ob(Db(t),function(e){var t;(t=Rb.get(e))?n.push(t):Ob(document.forms,function(t){Ob(t.elements,function(t){t.name===e&&(e="mce_editor_"+Ib++,Rb.setAttrib(t,"id",e),n.push(t))})})});break;case"textareas":case"specific_textareas":Ob(Rb.select("textarea"),function(t){e.editor_deselector&&i(t,e.editor_deselector)||e.editor_selector&&!i(t,e.editor_selector)||n.push(t)})}return n}(e)),e.types?Ob(e.types,function(n){Ot.each(t,function(t){return!Rb.is(t,n.selector)||(l(o(t),Pb({},e,n),t),!1)})}):(Ot.each(t,function(e){var t;(t=r.get(e.id))&&t.initialized&&!(t.getContainer()||t.getBody()).parentNode&&(Vb(t),t.unbindAllNativeEvents(),t.destroy(!0),t.removed=!0,t=null)}),0===(t=Ot.grep(t,function(e){return!r.get(e.id)})).length?a([]):Ob(t,function(t){var r;r=t,e.inline&&r.tagName.toLowerCase()in n?Pm("Could not initialize inline editor on invalid inline target element",t):l(o(t),e,t)}))};return r.settings=e,Rb.bind(window,"ready",s),new pe(function(e){t?e(t):a=function(t){e(t)}})},get:function(e){return 0===arguments.length?Fb.slice(0):tr.isString(e)?M.find(Fb,function(t){return t.id===e}).getOr(null):tr.isNumber(e)&&Fb[e]?Fb[e]:null},add:function(e){var t=this;return Mb[e.id]===e?e:(null===t.get(e.id)&&("length"!==e.id&&(Mb[e.id]=e),Mb.push(e),Fb.push(e)),Ub(!0),t.activeEditor=e,t.fire("AddEditor",{editor:e}),vb||(vb=function(){t.fire("BeforeUnload")},Rb.bind(window,"beforeunload",vb)),e)},createEditor:function(e,t){return this.add(new gb(e,t,this))},remove:function(e){var t,n,r=this;if(e)return tr.isString(e)?(e=e.selector||e,void Ob(Rb.select(e),function(e){(n=r.get(e.id))&&r.remove(n)})):(n=e,tr.isNull(r.get(n.id))?null:(Vb(n)&&r.fire("RemoveEditor",{editor:n}),0===Fb.length&&Rb.unbind(window,"beforeunload",vb),n.remove(),Ub(Fb.length>0),n));for(t=Fb.length-1;t>=0;t--)r.remove(Fb[t])},execCommand:function(e,t,n){var r=this.get(n);switch(e){case"mceAddEditor":return this.get(n)||new gb(n,this.settings,this).render(),!0;case"mceRemoveEditor":return r&&r.remove(),!0;case"mceToggleEditor":return r?(r.isHidden()?r.show():r.hide(),!0):(this.execCommand("mceAddEditor",0,n),!0)}return!!this.activeEditor&&this.activeEditor.execCommand(e,t,n)},triggerSave:function(){Ob(Fb,function(e){e.save()})},addI18n:function(e,t){Bb.add(e,t)},translate:function(e){return Bb.translate(e)},setActive:function(e){var t=this.activeEditor;this.activeEditor!==e&&(t&&t.fire("deactivate",{relatedTarget:e}),e.fire("activate",{relatedTarget:t})),this.activeEditor=e}},Fd),yb.setup();var Hb,qb=yb;function jb(e){return{walk:function(t,n){return cg.walk(e,t,n)},split:sl.split,normalize:function(t){return Jf.normalize(e,t).fold(y.constant(!1),function(e){return t.setStart(e.startContainer,e.startOffset),t.setEnd(e.endContainer,e.endOffset),!0})}}}(Hb=jb||(jb={})).compareRanges=qf,Hb.getCaretRangeFromPoint=Ih,Hb.getSelectedNode=Fi,Hb.getNode=zi;var $b,Wb,Kb=jb,Xb=Math.min,Yb=Math.max,Gb=Math.round,Jb=function(e,t,n){var r,o,i,a,s,u;return r=t.x,o=t.y,i=e.w,a=e.h,s=t.w,u=t.h,"b"===(n=(n||"").split(""))[0]&&(o+=u),"r"===n[1]&&(r+=s),"c"===n[0]&&(o+=Gb(u/2)),"c"===n[1]&&(r+=Gb(s/2)),"b"===n[3]&&(o-=a),"r"===n[4]&&(r-=i),"c"===n[3]&&(o-=Gb(a/2)),"c"===n[4]&&(r-=Gb(i/2)),Qb(r,o,i,a)},Qb=function(e,t,n,r){return{x:e,y:t,w:n,h:r}},Zb={inflate:function(e,t,n){return Qb(e.x-t,e.y-n,e.w+2*t,e.h+2*n)},relativePosition:Jb,findBestRelativePosition:function(e,t,n,r){var o,i;for(i=0;i<r.length;i++)if((o=Jb(e,t,r[i])).x>=n.x&&o.x+o.w<=n.w+n.x&&o.y>=n.y&&o.y+o.h<=n.h+n.y)return r[i];return null},intersect:function(e,t){var n,r,o,i;return n=Yb(e.x,t.x),r=Yb(e.y,t.y),o=Xb(e.x+e.w,t.x+t.w),i=Xb(e.y+e.h,t.y+t.h),o-n<0||i-r<0?null:Qb(n,r,o-n,i-r)},clamp:function(e,t,n){var r,o,i,a,s,u,c,l,f,d;return s=e.x,u=e.y,c=e.x+e.w,l=e.y+e.h,f=t.x+t.w,d=t.y+t.h,r=Yb(0,t.x-s),o=Yb(0,t.y-u),i=Yb(0,c-f),a=Yb(0,l-d),s+=r,u+=o,n&&(c+=r,l+=o,s-=i,u-=a),Qb(s,u,(c-=i)-s,(l-=a)-u)},create:Qb,fromClientRect:function(e){return Qb(e.left,e.top,e.width,e.height)}},eC={},tC={add:function(e,t){eC[e.toLowerCase()]=t},has:function(e){return!!eC[e.toLowerCase()]},get:function(e){var t=e.toLowerCase(),n=eC.hasOwnProperty(t)?eC[t]:null;if(null===n)throw new Error("Could not find module for type: "+e);return n},create:function(e,t){var n;if("string"==typeof e?(t=t||{}).type=e:e=(t=e).type,e=e.toLowerCase(),!(n=eC[e]))throw new Error("Could not find control by type: "+e);return(n=new n(t)).type=e,n}},nC=Ot.each,rC=Ot.extend,oC=function(){};oC.extend=$b=function(e){var t,n,r,o=this.prototype,i=function(){var e,t,n;if(!Wb&&(this.init&&this.init.apply(this,arguments),t=this.Mixins))for(e=t.length;e--;)(n=t[e]).init&&n.init.apply(this,arguments)},a=function(){return this},s=function(e,t){return function(){var n,r=this._super;return this._super=o[e],n=t.apply(this,arguments),this._super=r,n}};for(n in Wb=!0,t=new this,Wb=!1,e.Mixins&&(nC(e.Mixins,function(t){for(var n in t)"init"!==n&&(e[n]=t[n])}),o.Mixins&&(e.Mixins=o.Mixins.concat(e.Mixins))),e.Methods&&nC(e.Methods.split(","),function(t){e[t]=a}),e.Properties&&nC(e.Properties.split(","),function(t){var n="_"+t;e[t]=function(e){return e!==undefined?(this[n]=e,this):this[n]}}),e.Statics&&nC(e.Statics,function(e,t){i[t]=e}),e.Defaults&&o.Defaults&&(e.Defaults=rC({},o.Defaults,e.Defaults)),e)"function"==typeof(r=e[n])&&o[n]?t[n]=s(n,r):t[n]=r;return i.prototype=t,i.constructor=i,i.extend=$b,i};var iC=Math.min,aC=Math.max,sC=Math.round,uC=function(e,t){var n,r,o,i;if(t=t||'"',null===e)return"null";if("string"==(o=typeof e))return r="\bb\tt\nn\ff\rr\"\"''\\\\",t+e.replace(/([\u0080-\uFFFF\x00-\x1f\"\'\\])/g,function(e,o){return'"'===t&&"'"===e?e:(n=r.indexOf(o))+1?"\\"+r.charAt(n+1):(e=o.charCodeAt().toString(16),"\\u"+"0000".substring(e.length)+e)})+t;if("object"===o){if(e.hasOwnProperty&&"[object Array]"===Object.prototype.toString.call(e)){for(n=0,r="[";n<e.length;n++)r+=(n>0?",":"")+uC(e[n],t);return r+"]"}for(i in r="{",e)e.hasOwnProperty(i)&&(r+="function"!=typeof e[i]?(r.length>1?","+t:t)+i+t+":"+uC(e[i],t):"");return r+"}"}return""+e},cC={serialize:uC,parse:function(e){try{return window[String.fromCharCode(101)+"val"]("("+e+")")}catch(t){}}},lC={callbacks:{},count:0,send:function(e){var t=this,n=Xo.DOM,r=e.count!==undefined?e.count:t.count,o="tinymce_jsonp_"+r;t.callbacks[r]=function(i){n.remove(o),delete t.callbacks[r],e.callback(i)},n.add(n.doc.body,"script",{id:o,src:e.url,type:"text/javascript"}),t.count++}},fC={send:function(e){var t,n=0,r=function(){!e.async||4===t.readyState||n++>1e4?(e.success&&n<1e4&&200===t.status?e.success.call(e.success_scope,""+t.responseText,t,e):e.error&&e.error.call(e.error_scope,n>1e4?"TIMED_OUT":"GENERAL",t,e),t=null):setTimeout(r,10)};if(e.scope=e.scope||this,e.success_scope=e.success_scope||e.scope,e.error_scope=e.error_scope||e.scope,e.async=!1!==e.async,e.data=e.data||"",fC.fire("beforeInitialize",{settings:e}),t=new Mm){if(t.overrideMimeType&&t.overrideMimeType(e.content_type),t.open(e.type||(e.data?"POST":"GET"),e.url,e.async),e.crossDomain&&(t.withCredentials=!0),e.content_type&&t.setRequestHeader("Content-Type",e.content_type),e.requestheaders&&Ot.each(e.requestheaders,function(e){t.setRequestHeader(e.key,e.value)}),t.setRequestHeader("X-Requested-With","XMLHttpRequest"),(t=fC.fire("beforeSend",{xhr:t,settings:e}).xhr).send(e.data),!e.async)return r();setTimeout(r,10)}}};Ot.extend(fC,Fd);var dC=Ot.extend,mC=function(e){this.settings=dC({},e),this.count=0};mC.sendRPC=function(e){return(new mC).send(e)},mC.prototype={send:function(e){var t=e.error,n=e.success;(e=dC(this.settings,e)).success=function(r,o){void 0===(r=cC.parse(r))&&(r={error:"JSON Parse error."}),r.error?t.call(e.error_scope||e.scope,r.error,o):n.call(e.success_scope||e.scope,r.result)},e.error=function(n,r){t&&t.call(e.error_scope||e.scope,n,r)},e.data=cC.serialize({id:e.id||"c"+this.count++,method:e.method,params:e.params}),e.content_type="application/json",fC.send(e)}};var pC,gC=window.localStorage,hC=qb,vC={geom:{Rect:Zb},util:{Promise:pe,Delay:ye,Tools:Ot,VK:Mp,URI:ub,Class:oC,EventDispatcher:Id,Observable:Fd,I18n:Bb,XHR:fC,JSON:cC,JSONRequest:mC,JSONP:lC,LocalStorage:gC,Color:function(e){var t={},n=0,r=0,o=0,i=function(e){var i;return"object"==typeof e?"r"in e?(n=e.r,r=e.g,o=e.b):"v"in e&&function(e,t,i){var a,s,u,c;if(e=(parseInt(e,10)||0)%360,t=parseInt(t,10)/100,i=parseInt(i,10)/100,t=aC(0,iC(t,1)),i=aC(0,iC(i,1)),0!==t){switch(a=e/60,u=(s=i*t)*(1-Math.abs(a%2-1)),c=i-s,Math.floor(a)){case 0:n=s,r=u,o=0;break;case 1:n=u,r=s,o=0;break;case 2:n=0,r=s,o=u;break;case 3:n=0,r=u,o=s;break;case 4:n=u,r=0,o=s;break;case 5:n=s,r=0,o=u;break;default:n=r=o=0}n=sC(255*(n+c)),r=sC(255*(r+c)),o=sC(255*(o+c))}else n=r=o=sC(255*i)}(e.h,e.s,e.v):(i=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)[^\)]*\)/gi.exec(e))?(n=parseInt(i[1],10),r=parseInt(i[2],10),o=parseInt(i[3],10)):(i=/#([0-F]{2})([0-F]{2})([0-F]{2})/gi.exec(e))?(n=parseInt(i[1],16),r=parseInt(i[2],16),o=parseInt(i[3],16)):(i=/#([0-F])([0-F])([0-F])/gi.exec(e))&&(n=parseInt(i[1]+i[1],16),r=parseInt(i[2]+i[2],16),o=parseInt(i[3]+i[3],16)),n=n<0?0:n>255?255:n,r=r<0?0:r>255?255:r,o=o<0?0:o>255?255:o,t};return e&&i(e),t.toRgb=function(){return{r:n,g:r,b:o}},t.toHsv=function(){return e=n,t=r,i=o,s=0,(u=iC(e/=255,iC(t/=255,i/=255)))===(c=aC(e,aC(t,i)))?{h:0,s:0,v:100*(s=u)}:(a=(c-u)/c,s=c,{h:sC(60*((e===u?3:i===u?1:5)-(e===u?t-i:i===u?e-t:i-e)/(c-u))),s:sC(100*a),v:sC(100*s)});var e,t,i,a,s,u,c},t.toHex=function(){var e=function(e){return(e=parseInt(e,10).toString(16)).length>1?e:"0"+e};return"#"+e(n)+e(r)+e(o)},t.parse=i,t}},dom:{EventUtils:Te,Sizzle:lt,DomQuery:Qt,TreeWalker:to,DOMUtils:Xo,ScriptLoader:Zo,RangeUtils:Kb,Serializer:Nh,ControlSelection:Rh,BookmarkManager:Ah,Selection:vv,Event:Te.Event},html:{Styles:zo,Entities:Ao,Node:fh,Schema:Fo,SaxParser:em,DomParser:bh,Writer:Fs,Serializer:zs},ui:{Factory:tC},Env:me,AddOnManager:ti,Formatter:Yg,UndoManager:rg,EditorCommands:Od,WindowManager:km,NotificationManager:Sm,EditorObservable:qd,Shortcuts:Jd,Editor:gb,FocusManager:bb,EditorManager:qb,DOM:Xo.DOM,ScriptLoader:Zo.ScriptLoader,PluginManager:ti.PluginManager,ThemeManager:ti.ThemeManager,trim:Ot.trim,isArray:Ot.isArray,is:Ot.is,toArray:Ot.toArray,makeMap:Ot.makeMap,each:Ot.each,map:Ot.map,grep:Ot.grep,inArray:Ot.inArray,extend:Ot.extend,create:Ot.create,walk:Ot.walk,createNS:Ot.createNS,resolve:Ot.resolve,explode:Ot.explode,_addCacheSuffix:Ot._addCacheSuffix,isOpera:me.opera,isWebKit:me.webkit,isIE:me.ie,isGecko:me.gecko,isMac:me.mac};hC=Ot.extend(hC,vC),pC=hC,window.tinymce=pC,window.tinyMCE=pC}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/faTinyMce.js":
/*!*****************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/faTinyMce.js ***!
  \*****************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

FA.TinyMce = function () {
    /* EVENTS START */
    var Events = function Events() {};

    Events.prototype.tinyMceInit = function () {
        singleton.tinyMceInitHandler();
    };

    Events.prototype.bind = function () {
        Events.prototype.tinyMceInit();
    };

    var events = new Events();
    /* EVENTS END */

    /* PROPERTEIS START */
    var Properties = function Properties() {
        this.arr = {
            'menubar': null,
            'plugins': null,
            'toolbar1': null,
            'toolbar2': null,
            'table_toolbar': null,
            'statusbar': null,
            'not_posting': null,
            'roxyFileman': null,
            'styleFormats': null
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

    var tinymce = function tinymce() {};

    tinymce.prototype.getProperty = function (key) {
        _properties = properties.get();
        return _properties[key];
    };

    tinymce.prototype.init = function (options) {
        options = options || {};
        properties.set(options);
        events.bind();
    };

    tinymce.prototype.tinyMceInitHandler = function (that) {

        if ($('textarea.tinymce').length) {
            var _tinyMCE$init;

            tinyMCE.remove();
            tinyMCE.init((_tinyMCE$init = {
                relative_urls: false,
                /*remove_script_host : false,*/
                /*convert_urls : true,*/
                selector: 'textarea.tinymce',
                menubar: properties.get().menubar,
                plugins: properties.get().plugins,
                toolbar1: properties.get().toolbar1,
                toolbar2: properties.get().toolbar2,
                force_br_newlines: false,
                force_p_newlines: false,
                forced_root_block: false,
                style_formats: [{
                    title: 'Header 2', block: 'h2'
                }, {
                    title: 'Paragraph', block: 'p'
                }, {
                    title: 'Line Height',
                    items: [{ title: '20px', inline: 'span', styles: { "line-height": '20px' } }, { title: '22px', inline: 'span', styles: { "line-height": '22px' } }]
                }],

                // image_advtab: true,
                statusbar: properties.get().statusbar,
                setup: function setup(ed) {

                    ed.on('keyup', function (e) {
                        singleton.updateTinyMiceCharCounter($(this).attr('id'), ed);
                    });
                    ed.on('loadContent', function (e) {
                        singleton.updateTinyMiceCharCounter($(this).attr('id'), ed);
                    });
                    ed.on('focus', function (e) {

                        $('#' + $(e.target.id).selector).siblings('small.error').remove();
                        $('#' + $(e.target.id).selector).siblings(".mce-tinymce").removeClass("error-bdr");
                    });
                    ed.on('blur', function (e) {
                        if (!properties.get().not_posting) {
                            singleton.trimTinyMceContent($(this).attr('id'));
                        }
                    });
                },
                browser_spellcheck: true,
                paste_auto_cleanup_on_paste: true,
                paste_block_drop: true,
                paste_remove_spans: true,
                paste_remove_styles: true,
                paste_remove_styles_if_webkit: true,
                paste_strip_class_attributes: true
            }, _defineProperty(_tinyMCE$init, 'paste_block_drop', true), _defineProperty(_tinyMCE$init, 'paste_preprocess', function paste_preprocess(pl, o) {
                $("<div></div>").attr('id', 'tmp_paste').appendTo('body');
                $("#tmp_paste").html(o.content);
                $("#tmp_paste").find("*").removeAttr("data-mce-style");
                $("#tmp_paste").find("*").removeAttr("style");
                $("#tmp_paste").find("*").not("br,p,b").each(function () {
                    $(this).replaceWith(this.innerHTML);
                });
                o.content = $("#tmp_paste").html();
                $("#tmp_paste").remove();
                o.content = o.content.replace(/<(?!\s*\/?(br|p)\b)[^>]+>/ig, '');
            }), _defineProperty(_tinyMCE$init, 'entity_encoding', "raw"), _tinyMCE$init));
        }
    };

    tinymce.prototype.updateTinyMiceCharCounter = function (fieldId, ed) {
        var textCounterId = fieldId + '_textcounter';
        var maxlimit = $('#' + fieldId).attr('maxlength') ? parseInt($('#' + fieldId).attr('maxlength')) : 0;
        var value = tinyMCE.get(fieldId).getContent();
        value = value.replace(/(<p>(&nbsp;)+<\/p>)/g, '');
        value = value.replace(/(<([^>]+)>)/ig, '');
        value = value.replace(/(\r\n|\n|\r)/igm, '');
        if (maxlimit) {
            if (value.length > maxlimit) {
                var val = value.substring(0, maxlimit);
                /*tinyMCE.activeEditor.setContent(tinyMCE.activeEditor.getContent());*/
                tinyMCE.get(fieldId).setContent(val);
                ed.selection.select(ed.getBody(), true);
                ed.selection.collapse(false);
                $('#' + textCounterId).html('(0 characters left)');
                return false;
            } else {
                $('#' + textCounterId).html('(' + (maxlimit - value.length) + ' characters left)');
            }
        }
    };

    tinymce.prototype.trimTinyMceContent = function (fieldId) {
        /*var body = tinyMCE.get(fieldId).getBody();*/
        /*var text = tinyMCE.trim(body.innerText || body.textContent);*/
        var content = tinyMCE.get(fieldId).getContent();
        var text = tinyMCE.trim(content);

        if (text.length == 0) {
            tinyMCE.get(fieldId).setContent('');
        }
    };

    var singleton = new tinymce();

    return {
        getInstance: function getInstance() {
            return singleton;
        },
        my_prototype: tinymce
    };
}();

if (true) {
    module.exports = FA.TinyMce;
}

/***/ }),

/***/ "./vendor/fads/frontend/src/Faf/Bundle/FrontendBundle/Resources/public/js/faTinyMce.js":
/*!*********************************************************************************************!*\
  !*** ./vendor/fads/frontend/src/Faf/Bundle/FrontendBundle/Resources/public/js/faTinyMce.js ***!
  \*********************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

window.tinymce = __webpack_require__(/*! tinymce/tinymce.min.js */ "./node_modules/tinymce/tinymce.min.js");
window.FA.faTinyMce = __webpack_require__(/*! Faf/CoreBundle/Resources/public/js/faTinyMce.js */ "./vendor/fads/frontend/src/Faf/Bundle/CoreBundle/Resources/public/js/faTinyMce.js");

// Import TinyMCE
//window.tinymce = require('tinymce/tinymce.min.js');

// A theme is also required
__webpack_require__(/*! tinymce/themes/modern/theme */ "./node_modules/tinymce/themes/modern/theme.js");

// Skin
__webpack_require__(/*! tinymce/skins/lightgray/content.min.css */ "./node_modules/tinymce/skins/lightgray/content.min.css");
__webpack_require__(/*! tinymce/skins/lightgray/skin.min.css */ "./node_modules/tinymce/skins/lightgray/skin.min.css");

// Any plugins you want to use has to be imported
__webpack_require__(/*! tinymce/plugins/paste */ "./node_modules/tinymce/plugins/paste/index.js");
__webpack_require__(/*! tinymce/plugins/link */ "./node_modules/tinymce/plugins/link/index.js");
__webpack_require__(/*! tinymce/plugins/code */ "./node_modules/tinymce/plugins/code/index.js");
__webpack_require__(/*! tinymce/plugins/lists */ "./node_modules/tinymce/plugins/lists/index.js");
__webpack_require__(/*! tinymce/plugins/advlist */ "./node_modules/tinymce/plugins/advlist/index.js");

// window.APP.CustomTinyMce = require('Appf/CoreBundle/Resources/public/js/faTinyMce.js');

/***/ })

/******/ });