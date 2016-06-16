function Template(_obj, _string){
 	var self = {};
	var regexCurly = /{{\w\d*}}/g;
	var regexObj = /\w\d*/g;
	var splitted = _string.split(regexCurly);
	var match = _string.match(regexCurly).map((v) => v.match(regexObj)[0]);

	function render(){
		var str = '';
		for (var i = 0; i < splitted.length; i++) {
			str += splitted[i] + (match[i] && _obj[match[i]] ? _obj[match[i]] : '');
		}
		return str;
	}

	/*
	* Public
	*/
	self.render = render;

	return self;
}

module.exports = Template;