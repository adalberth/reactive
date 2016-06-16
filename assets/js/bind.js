import Event from 'stupid-event';

function Bind(_obj, _val) {
    var self = {};
    var value = _obj[_val];
    var event = Event();
    Object.defineProperty(_obj, _val, {
        get: function() {
            return value;
        },
        set: function(_value) {
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

export default Bind;