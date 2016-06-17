import Template from 'template';
import Bind from 'bind';
import Event from 'stupid-event';

function ReactiveString(_obj, _string){
 	var self = {};
 	var event = Event();
 	var template = Template(_obj, _string);
 	var bindings = [];
 	for(let key in _obj){
 		var bind = Bind(_obj, key);
 		bind.on('changed', update);
 		bindings.push(bind)
 	}

 	function update(){
 		event.trigger('changed', template.render())
 	}

 	function tmpl(){
 		return template.render();
 	}

	/*
	* Public
	*/
	self.tmpl = tmpl;
	self.on = event.on;

	return self;
}

module.exports = ReactiveString;