import Template from 'template';
import Bind from 'bind';

function ReactiveTextNode(_obj, _text){
	var self = {};
	var template = Template(_obj, _text.textContent);
	var keys = template.getKeys();

	if(keys){
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			createBinding(key);
		}
		updateDom();
	}

	function createBinding(_key){
		var bind = Bind(_obj, _key)
		bind.on('changed', function(){
			updateDom();
		});
	}

	function updateDom(){
		_text.textContent = template.render();	
	}
	
	return self;
}

module.exports = ReactiveTextNode;