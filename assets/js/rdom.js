import Template from 'template';
import Bind from 'bind';
import ReactiveString from 'rstring';

function ReactiveDom(_obj, _stringElement){
 	var self = {};
 	var dom = createDOM(_stringElement);
 	var rDomAttrCollection = [];
 	var rTextNodeCollectio = [];
 	
 	recur(dom);

 	function recur(_dom){
 		if(_dom.attributes.length != 0) createReactiveAttrDom(_dom);
 		var children = _dom.childNodes;
 		for(let child of children){
 			if(child.nodeType === 3){
 				var rTextNode = ReactiveTextNode(_obj, child);
 			}else if(child.nodeType === 1){
 				recur(child);
 			}
 		}
 	}

 	function createReactiveAttrDom(_dom){
 		var attributes = _dom.attributes;
	 	for (var i = 0; i < _dom.attributes.length; i++) {
	 		var rDomAttr = ReactiveDomAttr(_obj, _dom.attributes[i], _dom);
	 		rDomAttrCollection.push(rDomAttr);
	 	}	
 	}

 	function createDOM(){
 		var divHTML = document.createElement('div');
 		divHTML.innerHTML = _stringElement;
 		return divHTML.children[0]; 
 	}

 	function getHTML(){
 		return dom;
 	}

	/*
	* Public
	*/
	self.getHTML = getHTML; 

	return self;
}

function ReactiveTextNode(_obj, _text){
	var self = {};
	var template = Template(_obj, _text.textContent);
	var keys = template.getKeys();

	if(keys){
		for(let key of keys){
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

function ReactiveDomAttr(_obj, _item, _dom){
	var self = {};
	var name = _item.name;
	var template = Template(_obj, _item.value);
	var keys = template.getKeys();
	for(let key of keys){
		createBinding(key);
	}

	updateDom();

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

module.exports = ReactiveDom;