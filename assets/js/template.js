function Template(_obj, _string){
 	var self = {};
	var regexCurly = /{{[^}}]+?}}/g;
	var regexObj = /[\w\d_]+/g;
	var splitted = _string.split(regexCurly);
	var match = _string.match(regexCurly);
	if(match != null) match = match.map((v) => v.match(regexObj)[0]); 

	function render(){
		var str = '';
		for (var i = 0; i < splitted.length; i++) {
			str += splitted[i] + (match[i] && _obj[match[i]] ? _obj[match[i]] : '');
		}
		return str;
	}

	function getKeys(){
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