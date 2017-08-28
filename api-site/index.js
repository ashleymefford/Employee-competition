var restify = require('restify');



let employees = [];
currentId = 1;



let Employee = function(first,last) {
	this.id = currentId;
	this.firstname = first;
	this.lastname = last;
	currentId++;
}

function getEmployees(req, res, next) {
  res.send(employees);
  next();
}

function getEmployee(req, res, next) {
	let id = req.params.id;
	console.log(id);
	let found;
	for (let i=0; i < employees.length; i++) {
		if (employees[i].id == id) {
			found = employees[i];
			break;
		}
	}
  res.send(found);
  next();
}

function postEmployee(req, res, next) {
	let newEmployee = new Employee(req.body.firstname, req.body.lastname);
	console.log(newEmployee);
	employees.push(newEmployee);
  res.send('newEmployee');
  next();
}

var server = restify.createServer();

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/employees',getEmployees);
server.get('/employees/:id',getEmployee);
server.post('/employees',postEmployee);
//server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);

  let employee1 = new Employee('Kyle','Mefford');
  let employee2 = new Employee('Francine', 'Bray');
  employees.push(employee1);
  employees.push(employee2);
});