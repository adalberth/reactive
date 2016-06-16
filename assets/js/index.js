import data from 'data';
import Ticket from 'ticket';
import Template from 'template';

window.data = data;
document.addEventListener("DOMContentLoaded", function(_event) {
	var ticket = Ticket(data[0]);
});


var obj = {
	b: "test",
	a: "test2",
};
var string = 'This is {{a}} with something {{b}}';

var template = Template(obj, string);
console.log(template.render());



