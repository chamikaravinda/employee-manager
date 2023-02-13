const Pool = require('pg').Pool;
const users = require('./employees.json')

require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const createEmployeeTable = () => {
    pool.query(`CREATE TABLE  IF NOT EXISTS employees ( 
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(20) NOT NULL,
            last_name VARCHAR(20) NOT NULL,
            email VARCHAR(32) NOT NULL UNIQUE,
            number VARCHAR(12)  NOT NULL,
            gender CHAR(1) NOT NULL,
            photo TEXT NOT NULL 
        )`, (error,results) => {
            if (error) {
                throw error;
            } else {
              console.log('Table created successfully');
              addEmployees();
            }
            
        }
    );
};

const addEmployees = () => {
    users.map((user)=>{
        pool.query(`INSERT INTO employees (first_name,last_name,email,number,gender,photo)
            SELECT $1, $2, $3, $4, $5, $6
            WHERE
            NOT EXISTS (
                SELECT email FROM employees WHERE email = $7
            );`,
            [user.first_name,user.last_name,user.email,user.number,user.gender,user.photo,user.email],
            (error,results) => {
                if (error) {
                    throw error;
                } else {
                  if(results.rowCount>0){
                    console.log(`Table data inserted successfully for email ${user.email}`);
                  } else{
                    console.log(`Data for the email ${user.email} was already on the database`)
                  }
                }
            }
        );
    });
};

const getEmployees = (request, response) => {
  pool.query('SELECT * FROM employees ORDER BY id ASC', (error, results) => {
    if (error) {
      handleError(error,response);
      return;
    }

    if(results.rowCount>0){
      console.log('Data retrived successfully');
      response.status(200).json(results.rows);
    } else {
      console.log('No data to retrive');
      response.status(403).json(results.rows);
    }  
  });
};

const getEmployeeById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM employees WHERE id = $1', [id], (error, results) => {
    if (error) {
      handleError(error,response);
      return;
    }

    if(results.rowCount>0){
      console.log('Data retrived successfully');
      response.status(200).json(results.rows);
    } else {
      console.log('No data to retrive');
      response.status(403).json(results.rows);
    }
  });
};

const createEmployee = (request, response) => {
  const { first_name,last_name, email, number, gender, photo } = request.body;

  pool.query(
    'INSERT INTO employees (first_name,last_name,email,number,gender,photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [first_name,last_name, email, number, gender, photo],
    (error, results) => {
      if (error) {
        handleError(error,response);
        return;
      }

      if(results.rowCount>0){
        console.log(`Employee created for ${email} successfully`);
        response.status(201).send(`Employee added with ID: ${results.rows[0].id}`);
      } else{
        console.log(`Employee not created for ${email}`);
        response.status(409).send(`Employee not created for ${email}`)
      }
    }
  );
};

const updateEmployee = (request, response) => {
  const id = parseInt(request.params.id);
  const { first_name,last_name, email, number, gender, photo } = request.body;

  pool.query(
    'UPDATE employees SET first_name = $1, last_name = $2, email = $3, number = $4, gender = $5 ,photo = $6 WHERE id = $7',
    [first_name,last_name, email, number, gender, photo,id],
    (error, results) => {
      if (error) {
        handleError(error,response);
        return;
      }

      if(results.rowCount>0){
        console.log(`Employee modified for ${email} successfully`);
        response.status(200).send(`Employee modified with ID: ${id}`);
      } else{
        console.log(`Employee not modified for ${email}`);
        response.status(409).send(`Employee not modified for ${email}`)
      }
    }
  );
};

const deleteEmployee = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM employees WHERE id = $1', [id], (error, results) => {
    if (error) {
      handleError(error,response);
      return;
    }      

    if(results.rowCount>0){
      console.log(`Employee deleted for ID: ${id} successfully`);
      response.status(200).send(`Employee deleted with ID: ${id}`);
    } else{
      console.log(`Employee not found for ID: ${id}`);
      response.status(409).send(`Employee not found for the ID: ${id}`)
    }
  });
};

const handleError = (error,response) =>{
  console.log(`Internal Server error`);
  console.log(`Error: ${error.detail}`);
  response.status(500).send(`${error}`)
}

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  createEmployeeTable,
};