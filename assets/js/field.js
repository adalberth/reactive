import Bind from 'bind';

function Field(_data, _parent){
 	var self = {};
	var opts = opts || {};
	var valueBinded = Bind(_data, 'value');
	var filledBinded = Bind(_data, 'filled');
	var fieldHTML = document.createElement('div');

	/*
	* Private
	*/

	function init(){
		setupHTML();
		setupEvents();
		render();
	}

	function setupHTML(){
		fieldHTML.classList.add('field');
		document.body.appendChild(fieldHTML);
	}

	function setupEvents(){
		valueBinded.on('changed', function(){
			updateHTML();
		});
		filledBinded.on('changed', function(){
			updateStatus();
		});
	}

	function render(){
		updateHTML();
		updateStatus();
	}

	function updateHTML(){
		fieldHTML.innerHTML = _data.value;
	}

	function updateStatus(){
		if(_data.filled){
			fieldHTML.classList.add('filled');
		}else{
			fieldHTML.classList.remove('filled');
		}
	}

	/*
	* Public
	*/
	self.render = render;

	/*
	* Init
	*/

	init();

	return self;
}

module.exports = Field;