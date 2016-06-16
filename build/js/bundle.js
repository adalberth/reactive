(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stupidEvent = require('stupid-event');

var _stupidEvent2 = _interopRequireDefault(_stupidEvent);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

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

exports.default = Bind;

},{"stupid-event":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = [{
    type: 'tickets',
    filled: false,
    rows: [{
        type: 'row',
        filled: false,
        fields: [{
            type: 'field',
            filled: false,
            value: 1
        }, {
            type: 'field',
            filled: false,
            value: 2
        }, {
            type: 'field',
            filled: false,
            value: 2
        }]
    }, {
        type: 'row',
        filled: false,
        fields: [{
            type: 'field',
            filled: false,
            value: 4
        }, {
            type: 'field',
            filled: false,
            value: 5
        }, {
            type: 'field',
            filled: false,
            value: 6
        }]
    }]
}];

},{}],3:[function(require,module,exports){
'use strict';

var _bind = require('bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function Field(_data, _parent) {
	var self = {};
	var opts = opts || {};
	var valueBinded = (0, _bind2.default)(_data, 'value');
	var filledBinded = (0, _bind2.default)(_data, 'filled');
	var fieldHTML = document.createElement('div');

	/*
 * Private
 */

	function init() {
		setupHTML();
		setupEvents();
		render();
	}

	function setupHTML() {
		fieldHTML.classList.add('field');
		document.body.appendChild(fieldHTML);
	}

	function setupEvents() {
		valueBinded.on('changed', function () {
			updateHTML();
		});
		filledBinded.on('changed', function () {
			updateStatus();
		});
	}

	function render() {
		updateHTML();
		updateStatus();
	}

	function updateHTML() {
		fieldHTML.innerHTML = _data.value;
	}

	function updateStatus() {
		if (_data.filled) {
			fieldHTML.classList.add('filled');
		} else {
			fieldHTML.classList.remove('filled');
		}
	}

	/*
 * Public
 */
	self.render = render;

	/*
 * Init
 */

	init();

	return self;
}

module.exports = Field;

},{"bind":1}],4:[function(require,module,exports){
'use strict';

var _data = require('data');

var _data2 = _interopRequireDefault(_data);

var _ticket = require('ticket');

var _ticket2 = _interopRequireDefault(_ticket);

var _template = require('template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

window.data = _data2.default;
document.addEventListener("DOMContentLoaded", function (_event) {
	var ticket = (0, _ticket2.default)(_data2.default[0]);
});

var obj = {
	b: "test",
	a: "test2"
};
var string = 'This is {{a}} with something {{b}}';

var template = (0, _template2.default)(obj, string);
console.log(template.render());

},{"data":2,"template":6,"ticket":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _field = require('field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function Row(_data) {
	var self = {};
	var opts = opts || {};
	var collection = [];

	/*
 * Private
 */

	function init() {
		var fields = _data['fields'];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var item = _step.value;

				var field = (0, _field2.default)(item, self);
				collection.push(field);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}

	/*
 * Public
 */

	/*
 * Init
 */

	init();

	return self;
}

exports.default = Row;

},{"field":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function Template(_obj, _string) {
	var self = {};
	var regexCurly = /{{\w\d*}}/g;
	var regexObj = /\w\d*/g;
	var splitted = _string.split(regexCurly);
	var match = _string.match(regexCurly).map(function (v) {
		return v.match(regexObj)[0];
	});

	function render() {
		var str = '';
		for (var i = 0; i < splitted.length; i++) {
			str += splitted[i] + (match[i] ? _obj[match[i]] : '');
		}
		return str;
	}

	/*
 * Public
 */
	self.render = render;

	return self;
}

exports.default = Template;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _row = require('row');

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function Ticket(_data) {
	var self = {};
	var opts = opts || {};
	var collection = [];

	/*
 * Private
 */

	function init() {
		var rows = _data['rows'];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var item = _step.value;

				var row = (0, _row2.default)(item);
				collection.push(row);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}

	/*
 * Public
 */

	/*
 * Init
 */

	init();

	return self;
}

exports.default = Ticket;

},{"row":5}],8:[function(require,module,exports){
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
},{}]},{},[4]);
