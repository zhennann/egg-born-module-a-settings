module.exports =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /Users/wind/Documents/data/cabloy/egg-born-demo/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/wind/Documents/data/cabloy/egg-born-demo/node_modules/vue-loader/lib??vue-loader-options!./front/src/pages/edit.vue?vue&type=template&id=82dcae7a&scoped=true
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('f7-page',[_c('eb-navbar',{attrs:{"title":_vm.title,"eb-back-link":"Back"}},[_c('f7-nav-right',[(_vm.ready)?_c('eb-link',{attrs:{"iconMaterial":"save","onPerform":_vm.onSave}}):_vm._e()],1)],1),_vm._v(" "),_c('eb-validate',{ref:"validate",attrs:{"auto":"","data":_vm.data,"params":_vm.validateParams,"onPerform":_vm.onPerformValidate}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./front/src/pages/edit.vue?vue&type=template&id=82dcae7a&scoped=true

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(2);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: /Users/wind/Documents/data/cabloy/egg-born-demo/node_modules/babel-loader/lib!/Users/wind/Documents/data/cabloy/egg-born-demo/node_modules/vue-loader/lib??vue-loader-options!./front/src/pages/edit.vue?vue&type=script&lang=js



var ebModules = external_vue_default.a.prototype.$meta.module.get('a-components').options.components.ebModules;
/* harmony default export */ var editvue_type_script_lang_js = ({
  mixins: [ebModules],
  data: function data() {
    return {
      scene: this.$f7Route.params.scene,
      module: this.$f7Route.query.module,
      data: null,
      validateParams: null
    };
  },

  computed: {
    ready: function ready() {
      return this.data && this.validateParams;
    },
    title: function title() {
      var module = this.getModule(this.module);
      return module ? module.titleLocale : '';
    }
  },
  methods: {
    onPerformValidate: function onPerformValidate(event, context) {
      return this.$api.post('settings/' + this.scene + '/save', {
        module: this.module,
        data: this.data
      }).then(function () {
        return true;
      });
    },
    onSave: function onSave(event) {
      return this.$refs.validate.perform(event, 'save');
    }
  },
  created: function created() {
    var _this = this;

    this.$api.post('settings/' + this.scene + '/load', {
      module: this.module
    }).then(function (data) {
      _this.data = data.data;
      _this.validateParams = {
        module: data.module,
        validator: data.validator
      };
    });
  }
});
// CONCATENATED MODULE: ./front/src/pages/edit.vue?vue&type=script&lang=js
 /* harmony default export */ var pages_editvue_type_script_lang_js = (editvue_type_script_lang_js); 
// EXTERNAL MODULE: ./front/src/pages/edit.vue?vue&type=style&index=0&id=82dcae7a&scoped=true&lang=css
var editvue_type_style_index_0_id_82dcae7a_scoped_true_lang_css = __webpack_require__(10);

// EXTERNAL MODULE: /Users/wind/Documents/data/cabloy/egg-born-demo/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./front/src/pages/edit.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_editvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  "82dcae7a",
  null
  
)

/* harmony default export */ var edit = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /Users/wind/Documents/data/cabloy/egg-born-demo/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/wind/Documents/data/cabloy/egg-born-demo/node_modules/vue-loader/lib??vue-loader-options!./front/src/pages/list.vue?vue&type=template&id=550f65d4
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('f7-page',[_c('eb-navbar',{attrs:{"title":_vm.$text('Settings'),"eb-back-link":"Back"}}),_vm._v(" "),(_vm.ready)?_c('f7-list',_vm._l((_vm.items),function(item){return _c('eb-list-item',{key:item.module,staticClass:"item",attrs:{"title":_vm.getModule(item.module).titleLocale,"eb-href":(_vm.scene + "/edit?module=" + (item.module))}})})):_vm._e(),_vm._v(" "),_c('eb-load-more',{ref:"loadMore",attrs:{"onLoadClear":_vm.onLoadClear,"onLoadMore":_vm.onLoadMore,"autoInit":true}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./front/src/pages/list.vue?vue&type=template&id=550f65d4

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(2);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: /Users/wind/Documents/data/cabloy/egg-born-demo/node_modules/babel-loader/lib!/Users/wind/Documents/data/cabloy/egg-born-demo/node_modules/vue-loader/lib??vue-loader-options!./front/src/pages/list.vue?vue&type=script&lang=js



var ebModules = external_vue_default.a.prototype.$meta.module.get('a-components').options.components.ebModules;
/* harmony default export */ var listvue_type_script_lang_js = ({
  mixins: [ebModules],
  data: function data() {
    return {
      scene: this.$f7Route.params.scene,
      items: null
    };
  },

  computed: {
    ready: function ready() {
      return this.modulesAll && this.items;
    }
  },
  methods: {
    onLoadClear: function onLoadClear(done) {
      this.items = [];
      done();
    },
    onLoadMore: function onLoadMore(_ref) {
      var _this = this;

      var index = _ref.index;

      return this.$api.post('settings/' + this.scene + '/list').then(function (data) {
        _this.items = data.list;
        return data;
      });
    }
  }
});
// CONCATENATED MODULE: ./front/src/pages/list.vue?vue&type=script&lang=js
 /* harmony default export */ var pages_listvue_type_script_lang_js = (listvue_type_script_lang_js); 
// EXTERNAL MODULE: /Users/wind/Documents/data/cabloy/egg-born-demo/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./front/src/pages/list.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_listvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var list = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  Settings: '设置',
  'Info Group': '信息组',
  'Extra Group': '额外组',
  Extra: '额外',
  Male: '男',
  Female: '女'
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  'zh-cn': __webpack_require__(5).default
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/* harmony default export */ __webpack_exports__["default"] = (function (Vue) {

  return {
    state: {},
    getters: {},
    mutations: {},
    actions: {}
  };
});

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_id_82dcae7a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_id_82dcae7a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_id_82dcae7a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_id_82dcae7a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./edit.vue": 3,
	"./list.vue": 4
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 11;

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function load(name) {
  return __webpack_require__(11)("./" + name + '.vue').default;
}

/* harmony default export */ __webpack_exports__["default"] = ([{ path: ':scene/list', component: load('list') }, { path: ':scene/edit', component: load('edit') }]);

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_css_module_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _assets_css_module_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_module_css__WEBPACK_IMPORTED_MODULE_0__);
var Vue = void 0;



function install(_Vue, cb) {
  if (Vue) return console.error('already installed.');

  Vue = _Vue;

  return cb({
    routes: __webpack_require__(12).default,
    store: __webpack_require__(8).default(Vue),
    config: __webpack_require__(7).default,
    locales: __webpack_require__(6).default
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  install: install
});

/***/ })
/******/ ]);
//# sourceMappingURL=front.js.map