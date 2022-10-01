(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Selectool = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var EventManager = /*#__PURE__*/function () {
    function EventManager() {
      _classCallCheck(this, EventManager);

      _defineProperty(this, "events", {});
    }

    _createClass(EventManager, [{
      key: "dispatch",
      value: function dispatch(evName, context) {
        var _this = this;

        if (!evName) {
          console.warn('[Selectool]: Error event name is required parameter');
        }

        if (this.events[evName]) {
          this.events[evName].forEach(function (ev) {
            ev.call(context, _this);
          });
        }

        return this;
      }
    }, {
      key: "on",
      value: function on(evName, cb) {
        if (!cb && typeof cb !== "function") {
          console.warn('[Selectool]: Error callback is required parameter');
          return this;
        }

        if (this.events.hasOwnProperty(evName)) {
          this.events[evName].push(cb);
        } else {
          this.events[evName] = [cb];
        }

        return this;
      }
    }, {
      key: "off",
      value: function off(evName, cb) {
        if (this.events[evName]) {
          delete this.events[evName];
        }

        return this;
      }
    }]);

    return EventManager;
  }();

  var Base = /*#__PURE__*/function () {
    function Base() {
      _classCallCheck(this, Base);

      _defineProperty(this, "em", new EventManager());
    }

    _createClass(Base, [{
      key: "on",
      value: function on(evName, cb) {
        this.em.on(evName, cb);
      }
    }, {
      key: "off",
      value: function off(evName, cb) {
        this.em.off(evName, cb);
      }
    }, {
      key: "dispatch",
      value: function dispatch(evName) {
        this.em.dispatch(evName, this);
      }
    }, {
      key: "getSelect",
      value: function getSelect(selector) {
        if (!selector) {
          throw new Error('[Selectool]: selector is required');
        }

        if (selector instanceof HTMLElement) {
          return selector;
        }

        var select = document.querySelector(selector);

        if (!select) {
          throw new Error('[Selectool]: selector is required');
        } else {
          return select;
        }
      }
    }]);

    return Base;
  }();

  var Renderer = /*#__PURE__*/function () {
    function Renderer() {
      _classCallCheck(this, Renderer);
    }

    _createClass(Renderer, null, [{
      key: "create",
      value: function create() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
        var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var events = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        var _element = document.createElement(element);

        if (typeof content === 'string') {
          _element.innerHTML = content;
        } else if (content instanceof HTMLElement) {
          _element.append(content);
        }

        if (Object.keys(attrs).length) {
          for (var attr in attrs) {
            _element.setAttribute(attr, attrs[attr]);
          }
        }

        if (Object.keys(events).length) {
          var _loop = function _loop(event) {
            events[event].forEach(function (ev) {
              _element.addEventListener(event, ev);
            });
          };

          for (var event in events) {
            _loop(event);
          }
        }

        return _element;
      }
    }]);

    return Renderer;
  }();

  var Selectool = /*#__PURE__*/function (_Base) {
    _inherits(Selectool, _Base);

    var _super = _createSuper(Selectool);

    function Selectool(params) {
      var _this;

      _classCallCheck(this, Selectool);

      _this = _super.call(this);

      _defineProperty(_assertThisInitialized(_this), "originalParams", {
        on: {
          init: null,
          open: null,
          close: null,
          destroy: null
        }
      });

      _this.params = _objectSpread2(_objectSpread2({}, _this.originalParams), params);
      _this.domselect = _this.getSelect(_this.params.select);
      _this.options = _this.domselect.options;

      _this.init();

      return _this;
    }

    _createClass(Selectool, [{
      key: "init",
      value: function init() {
        this.domselect.setAttribute('data-selectool', '');
        this.render();
        this.initEvents();
        this.dispatch('init');
      }
    }, {
      key: "initEvents",
      value: function initEvents() {
        for (var eventKey in this.params.on) {
          this.on(eventKey, this.params.on[eventKey]);
        }
      }
    }, {
      key: "destroyEvents",
      value: function destroyEvents() {
        for (var eventKey in this.params.on) {
          this.off(eventKey, this.params.on[eventKey]);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var wrap = Renderer.create('div', '', {
          'class': 'selectool'
        });
        var currentOption = this.getCurrentOption();
        wrap.insertAdjacentElement('afterbegin', this.getOptions());
        wrap.insertAdjacentElement('afterbegin', currentOption);
        this.currentOption = currentOption;
        this.select = wrap;
        this.domselect.insertAdjacentElement('afterend', wrap);
      }
    }, {
      key: "getCurrentOption",
      value: function getCurrentOption() {
        var _this2 = this;

        var option = Array.from(this.options).find(function (opt) {
          return opt.getAttribute('selected');
        });

        if (!option) {
          return Renderer.create('div', this.options[0].textContent, {
            'class': 'selectool__current',
            'data-selected': ''
          }, {
            'click': [function () {
              return _this2.toggle();
            }]
          });
        } else {
          return option;
        }
      }
    }, {
      key: "getOptions",
      value: function getOptions() {
        var _this3 = this;

        var wrap = Renderer.create('div', '', {
          'class': 'selectool__options'
        });
        var options = Array.from(this.options);
        options.forEach(function (option, index) {
          var opt = Renderer.create('div', option.textContent, {
            'class': 'selectool__option ' + (option.disabled ? "is-disabled" : "")
          }, {
            'click': [function () {
              _this3.setValue(index, option.textContent, option.disabled);

              if (!option.disabled) {
                _this3.close();
              }
            }]
          });
          wrap.append(opt);
        });
        return wrap;
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (this.select.classList.contains('_open')) {
          this.close();
        } else {
          this.open();
        }
      }
    }, {
      key: "close",
      value: function close() {
        this.select.classList.remove('_open');
        this.dispatch('close');
      }
    }, {
      key: "open",
      value: function open() {
        this.select.classList.add('_open');
        this.dispatch('open');
      }
    }, {
      key: "setValue",
      value: function setValue(index, text) {
        var disabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (disabled) {
          return;
        }

        this.domselect.selectedIndex = index;
        this.currentOption.textContent = text || '';
        this.dispatch('changeValue');
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (!this.domselect || !this.select) {
          return console.warn('[Selectool]: The instance has already been destroyed');
        }

        this.domselect.removeAttribute('data-selectool');
        this.destroyEvents();
        this.select.remove();
        this.domselect.remove();
        this.domselect = undefined;
        this.select = undefined;
        this.dispatch('destroy');
        return null;
      }
    }]);

    return Selectool;
  }(Base);

  return Selectool;

}));
