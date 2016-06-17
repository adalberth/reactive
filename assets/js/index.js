// import data from 'data';
// import Ticket from 'ticket';
// import Template from 'template';
import ReactiveString from 'rstring';
import ReactiveDOM from 'rdom'; 

// window.data = data;
// document.addEventListener("DOMContentLoaded", function(_event) {
// 	var ticket = Ticket(data[0]);
// });


var obj = {
	a: 'World!',
	b: 'Sky',
	class: 'some-class',
	bgc: 'red',
	bdr: '1px solid blue',
};

var rdom = ReactiveDOM(obj, `
<div class="{{class}}" style="background-color:{{bgc}}; border: {{bdr}}">
	<span>Hello {{a}}, goodbye {{b}}</span>
</div>
`);


document.addEventListener("DOMContentLoaded", function(_event) {
	document.body.appendChild(rdom.getHTML());
});
window.obj = obj;

/*
<div class="{{a}} {{a1}} class2" style="background-color:{{b}}">
	Hello {{a2}} Goodbye {{a3}}
	<span>{{c}}</span>
</div>
 */



