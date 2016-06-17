(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _stupidEvent = require('stupid-event');

var _stupidEvent2 = _interopRequireDefault(_stupidEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Bind(_obj, _val) {
    var self = {};
    var value = _obj[_val];
    var event = (0, _stupidEvent2.default)();
    Object.defineProperty(_obj, _val, {
        get: function get() {
            return value;
        },
        set: function set(_value) {
            value = _value;
            event.trigger('changed', value);
        }
    });

    /*
     * Public
     */
    self.on = event.on;

    return self;
}

module.exports = Bind;

},{"stupid-event":7}],2:[function(require,module,exports){
'use strict';

var _rdom = require('rdom');

var _rdom2 = _interopRequireDefault(_rdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = {
	a: 'World!',
	b: 'Sky',
	class: 'some-class',
	bgc: 'red',
	bdr: '1px solid blue',
	data: 'some-data'
};

document.addEventListener("DOMContentLoaded", function (_event) {
	var rdom = (0, _rdom2.default)(obj, '\n\t<div class="{{class}}" style="background-color:{{bgc}}; border: {{bdr}}" data="{{data}}">\n\t\t<span>Hello {{a}}, goodbye {{b}}</span>\n\t</div>\n\t');
	document.body.appendChild(rdom.getHTML());
});

window.obj = obj;

},{"rdom":3}],3:[function(require,module,exports){
'use strict';

var _rtextnode = require('rtextnode');

var _rtextnode2 = _interopRequireDefault(_rtextnode);

var _rdomattr = require('rdomattr');

var _rdomattr2 = _interopRequireDefault(_rdomattr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ReactiveDom(_obj, _stringElement) {
  var self = {};
  var dom = createDOM(_stringElement);
  var rDomAttrCollection = [];
  var rTextNodeCollectio = [];

  recur(dom);

  function recur(_dom) {
    if (_dom.attributes.length != 0) createReactiveAttrDom(_dom);
    var children = _dom.childNodes;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child.nodeType === 3) {
        var rTextNode = (0, _rtextnode2.default)(_obj, child);
      } else if (child.nodeType === 1) {
        recur(child);
      }
    }
  }

  function createReactiveAttrDom(_dom) {
    var attributes = _dom.attributes;
    for (var i = 0; i < _dom.attributes.length; i++) {
      var rDomAttr = (0, _rdomattr2.default)(_obj, _dom.attributes[i], _dom);
      rDomAttrCollection.push(rDomAttr);
    }
  }

  function createDOM() {
    var divHTML = document.createElement('div');
    divHTML.innerHTML = _stringElement;
    return divHTML.children[0];
  }

  function getHTML() {
    return dom;
  }

  /*
  * Public
  */
  self.getHTML = getHTML;

  return self;
}

module.exports = ReactiveDom;

},{"rdomattr":4,"rtextnode":5}],4:[function(require,module,exports){
'use strict';

var _template = require('template');

var _template2 = _interopRequireDefault(_template);

var _bind = require('bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ReactiveDomAttr(_obj, _item, _dom) {
	var self = {};
	var name = _item.name;
	var template = (0, _template2.default)(_obj, _item.value);
	var keys = template.getKeys();
	if (keys) {
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			createBinding(key);
		}
		updateDom();
	}

	function createBinding(_key) {
		var bind = (0, _bind2.default)(_obj, _key);
		bind.on('changed', function () {
			updateDom();
		});
	}

	function updateDom() {
		_dom.setAttribute(name, template.render());
	}

	return self;
}

module.exports = ReactiveDomAttr;

},{"bind":1,"template":6}],5:[function(require,module,exports){
'use strict';

var _template = require('template');

var _template2 = _interopRequireDefault(_template);

var _bind = require('bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ReactiveTextNode(_obj, _text) {
	var self = {};
	var template = (0, _template2.default)(_obj, _text.textContent);
	var keys = template.getKeys();

	if (keys) {
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			createBinding(key);
		}
		updateDom();
	}

	function createBinding(_key) {
		var bind = (0, _bind2.default)(_obj, _key);
		bind.on('changed', function () {
			updateDom();
		});
	}

	function updateDom() {
		_text.textContent = template.render();
	}

	return self;
}

module.exports = ReactiveTextNode;

},{"bind":1,"template":6}],6:[function(require,module,exports){
'use strict';

function Template(_obj, _string) {
	var self = {};
	var regexCurly = /{{[^}}]+?}}/g;
	var regexObj = /[\w\d_]+/g;
	var splitted = _string.split(regexCurly);
	var match = _string.match(regexCurly);
	if (match != null) match = match.map(function (v) {
		return v.match(regexObj)[0];
	});

	function render() {
		var str = '';
		for (var i = 0; i < splitted.length; i++) {
			str += splitted[i] + (match[i] && _obj[match[i]] ? _obj[match[i]] : '');
		}
		return str;
	}

	function getKeys() {
		return match;
	}

	/*
 * Public
 */
	self.render = render;
	self.getKeys = getKeys;

	return self;
}

module.exports = Template;

},{}],7:[function(require,module,exports){
/**
 * @fileoverview Simple event system.
 * @author david@stupid-studio.com (David Adalberth Andersen)
 */

/**
 * Event
 * @constructor
 */
function Event(opts){
	/**
	 * @define {object} Collection of public methods.
	 */
	var self = {};

	/**
	 * @define {object} options for the constructor 
	 */
	var opts = opts || {};

	/**
	 * @define {object} collection the event names as
	 * an identifyer for later calls
	 */
	var event = {};

	/**
	 * @define {object} collection of precalled events
	 */
	var queue = {};

	/**
	 * On method for collection the event calls
	 * @example event.on('custom-event', function(){ //do something });
	 * @param {string} key A string identifyer
	 * @param {function} call A callback for the identifyer
	 * @config {object} event[key] Set object[key] to array if not set
	 */
	function on(key, call){
		if(!event[key]) event[key] = [];

		/** add event */
		addEvent(key, call);
		
		/** if the event has been triggered before created, then trigger it now */
		if(queue[key]) call.apply(null, queue[key]);
	}

	/**
	 * Remove event from collection
	 * @example event.remove('custom-event', function)
	 * @param {string} key A string identifyer
	 * @param {function} call A callback for the identifyer	
	 * @config {object} event[key] If event[key] doesn't exist return.
	 */
	function remove(key, call){
		var events = event[key];
		if(!events) return;

		/** Remove call from event */
		var index = events.indexOf(call);
        if (index != -1) events.splice(index, 1);

        /** Check for anonymous function */
        for (var i = 0; i < events.length; i++) {
			if(call.toString() === events[i].toString()){
				events.splice(i, 1);
				break;
			}
		};
	}

	/**
	 * Add event to events and override if it is the same
	 * @param {string} key A string identifyer
	 * @param {function} call A callback for the identifyer
	 */
	function addEvent(key, call){
		var events = event[key];

		/** If forcepush, add to callstack */
		if(opts.forceEvents){
			events.push(call);
			return;
		}

		/**
		 * @define {boolean} if the function is the same,
		 * boolean will be set to true
		 */
		var same = false;

		/**
		 * Loop through the events on key
		 * This is for comparing two anonymous
		 */
		for (var i = 0; i < events.length; i++) {
			/** If anonymous function is the same set boolean to true */
			if(call.toString() === events[i].toString()){
				same = true;
				/** override the current callback */
				events[i] = call;
				break;
			}
		};
		
		/** Push to call stack */
		if(!same) events.push(call);
	}

	/**
	 * Trigger the event
	 * @example event.trigger(key, params)
	 * @param {string} key The key for event objet
	 */
	function trigger(key){
		var events = event[key];
		/**
		 * @define {array} takes the arguments and removes the first param
		 */
		var args = Array.prototype.slice.call(arguments).slice(1);

		/** If first argument is an array, pass it as argument */
		if(arguments.length === 2 && arguments[1].constructor == Array) args = arguments[1];
		
		if(events){
			/** Trigger the events by the current key */
			for (var i = 0; i < events.length; i++) {
				events[i].apply(null, args);
			};
		}else{
			/**
			 * If the trigger method is call before any key is added
			 * save the key and params for to be called later
			 */
			queue[key] = args;
		}
	}

	/**
	 * Public methods
	 * @public {function}
	 */
	self.on = on;
	self.remove = remove;
	self.trigger = trigger;

	/**
	 * @return {object} return public methods
	 */
	return self;
}

/** @export */
module.exports = Event;
},{}]},{},[2]);
