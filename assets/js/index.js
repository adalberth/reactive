import ReactiveDOM from 'rdom'; 

var obj = {
	a: 'World!',
	b: 'Sky',
	class: 'some-class',
	bgc: 'red',
	bdr: '1px solid blue',
	data: 'some-data'
};

document.addEventListener("DOMContentLoaded", function(_event) {
	var rdom = ReactiveDOM(obj, `
	<div class="{{class}}" style="background-color:{{bgc}}; border: {{bdr}}" data="{{data}}">
		<span>Hello {{a}}, goodbye {{b}}</span>
	</div>
	`);
	document.body.appendChild(rdom.getHTML());
});

window.obj = obj;


