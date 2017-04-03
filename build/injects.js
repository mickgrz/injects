(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tag::import[]
const assert = __webpack_require__(0);
// end::import[]
// tag::injectables[]
/**
 * All injectables.
 */
exports.injectables = {};
// end::injectables[]
// tag::Injectable[]
/**
 * Register an injectable.
 * Can be used as a class decorator or as a function.
 *
 * @param constructorOrKey class constructor or custom string key
 * @param instance custom instance to register (optional with class constructor, mandatory with string key)
 */
function Injectable(constructorOrKey, instance) {
    let key, injectable;
    if (typeof constructorOrKey === 'string') {
        assert.equal(true, !!(instance), 'can\'t define injectable without instance');
        key = constructorOrKey;
        injectable = instance;
    }
    else {
        const constructor = constructorOrKey;
        key = constructor.name;
        injectable = instance ? instance : new (Object.create(constructor.prototype)).constructor();
    }
    exports.injectables[key] = injectable;
}
exports.Injectable = Injectable;
// end::Injectable[]
// tag::inject[]
/**
 * Inject unique instance associated with class name or with custom string key.
 * Create unique class instance if it doesn't exist.
 *
 * @param constructorOrKey class constructor or custom string key
 * @return the unique instance associated with class name or with custom string key
 */
function inject(constructorOrKey) {
    let key;
    if (typeof constructorOrKey === 'string') {
        key = constructorOrKey; // <1>
    }
    else {
        const constructor = constructorOrKey;
        key = constructor.name; // <2>
        if (!exists(key)) {
            Injectable(constructor); // <3>
        }
    }
    return exports.injectables[key]; // <4>
}
exports.inject = inject;
// end::inject[]
// tag::exists[]
/**
 * In order to know if a dependency exists or not.
 *
 * @param name dependency name
 * @returns true if dependency exist, false otherwise
 */
function exists(name) {
    return Object.keys(exports.injectables).some(k => k === name);
}
exports.exists = exists;
// end::exists[]
// Only for tests
// tag::resetInjectables[]
/**
 * Only for tests : delete all injectables
 */
function resetInjectables() {
    exports.injectables = {};
}
exports.resetInjectables = resetInjectables;
// end::resetInjectables[]
// tag::resetInjectable[]
/**
 * Only for tests : delete an injectable
 */
function resetInjectable(name) {
    delete exports.injectables[name];
}
exports.resetInjectable = resetInjectable;
// end::resetInjectable[] 


/***/ })
/******/ ])));
//# sourceMappingURL=injects.js.map