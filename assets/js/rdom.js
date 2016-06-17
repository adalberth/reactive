import ReactiveTextNode from 'rtextnode';
import ReactiveDomAttr from 'rdomattr';

function ReactiveDom(_obj, _stringElement){
 	var self = {};
 	var dom = createDOM(_stringElement);
 	var rDomAttrCollection = [];
 	var rTextNodeCollectio = [];
 
 	recur(dom);

 	function recur(_dom){
 		if(_dom.attributes.length != 0) createReactiveAttrDom(_dom);
 		var children = _dom.childNodes;
 		for (var i = 0; i < children.length; i++) {
 			var child = children[i];
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

module.exports = ReactiveDom;