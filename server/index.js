const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const employeeDBService = require('./services/employee-db.service');

require('dotenv').config();

const port = process.env.PORT

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Welcome to employee manager api' });
});

app.get('/employees', employeeDBService.getEmployees);
app.get('/employees/:id', employeeDBService.getEmployeeById);
app.post('/employees', employeeDBService.createEmployee);
app.put('/employees/:id', employeeDBService.updateEmployee);
app.delete('/employees/:id', employeeDBService.deleteEmployee);

app.listen(port, () => {
  employeeDBService.createEmployeeTable();
    console.log(`App running on port ${port}.`);
});