import Field from 'field';

function Row(_data){
 	var self = {};
	var opts = opts || {};
	var collection = [];
	
	/*
	* Private
	*/

	function init(){
		var fields = _data['fields'];
		for(let item of fields){
			var field = Field(item, self);
			collection.push(field);
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

module.exports = Row;