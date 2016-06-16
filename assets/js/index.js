import data from 'data';
import Ticket from 'ticket';
import Template from 'template';
import Reactive from 'reactive';

window.data = data;
document.addEventListener("DOMContentLoaded", function(_event) {
	var ticket = Ticket(data[0]);
});


var obj = {
	b: "test",
	a: "test2",
};
var reactive = Reactive(obj, 'This is {{a}} with something {{b}}');
console.log(reactive.get());
window.obj = obj;




