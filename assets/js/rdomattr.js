import Template from 'template';
import Bind from 'bind';

function ReactiveDomAttr(_obj, _item, _dom){
	var self = {};
	var name = _item.name;
	var template = Template(_obj, _item.value);
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
		_dom.setAttribute(name, template.render());	
	}

	return self;
}

module.exports = ReactiveDomAttr;