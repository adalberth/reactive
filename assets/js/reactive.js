import Template from 'template';
import Bind from 'bind';

function Reactive(_obj, _string){
 	var self = {};
 	var template = Template(_obj, _string);
 	var bindings = [];
 	for(let key in _obj){
 		var bind = Bind(_obj, key);
 		bind.on('changed', update);
 		bindings.push(bind)
 	}

 	function update(){
 		console.log(template.render());
 	}

 	function get(){
 		return template.render();
 	}

	/*
	* Public
	*/
	self.get = get;
	
	return self;
}

module.exports = Reactive;