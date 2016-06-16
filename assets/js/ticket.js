import Row from 'row';

function Ticket(_data){
 	var self = {};
	var opts = opts || {};
	var collection = [];
	
	/*
	* Private
	*/

	function init(){
		var rows = _data['rows'];
		for(let item of rows){
			var row = Row(item);
			collection.push(row);
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

export default Ticket;