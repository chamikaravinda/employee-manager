import { useState } from 'react';
import { Box,TextField, Button } from '@mui/material';
import styles from '@/styles/Employee.form.module.css'

const initialErrorState = {
    first_name :{
        invalid : false,
        message : ''
    },
    last_name :{
        invalid : false,
        message : ''
    },
    email :{
        invalid : false,
        message : ''
    },
    number :{
        invalid : false,
        message : ''
    },
    gender :{
        invalid : false,
        message : ''
    }
}

export default function EmployeeForm(props) {
  
  const [employee,setEmployee] =  useState(props.data || {gender:'M'});
  const [formError,setFormError] = useState(initialErrorState);


  function onChangeFiled(event) {
    const changedEmployee = {
        ...employee,
        [event.target.id]: event.target.value
    } 
    setEmployee(changedEmployee);
  }

  function onlyLetters(str) {
    return Boolean(str.match(/^[A-Za-z]*$/));
  }

  function onlyNumbers(str) {
    return Boolean(str.match(/^[0-9]*$/));
  }

  function validEmail(email){
    return Boolean(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
  }

  function validateForm(){
    let error = initialErrorState;
    let errorFlag = false;

    if(!employee.first_name || !onlyLetters(employee.first_name)){
        error = {
            ...error,
            first_name :{
                invalid : true,
                message : 'Enter a valid first name'
            }
        };
        errorFlag = true; 
    }

    if(!employee.last_name || !onlyLetters(employee.last_name)){
        error = {
            ...error,
            last_name :{
                invalid : true,
                message : 'Enter a valid last name'
            }
        } 
        errorFlag = true;

    }

    if(!employee.email 
        || !validEmail(employee.email)){
        error = {
            ...error,
            email :{
                invalid : true,
                message : 'Enter a valid email'
            }
        } 
        errorFlag = true;
    }

    if(!employee.number || employee.number.length != 10 || !onlyNumbers(employee.number)){
        error = {
            ...error,
            number :{
                invalid : true,
                message : 'Enter a valid phone number'
            }
        } 
        errorFlag = true;
    }

    if(!employee.gender || (employee.gender !== 'M' && employee.gender !== 'F')){
        error = {
            ...error,
            gender :{
                invalid : true,
                message : 'Select gender'
            }
        } 
        errorFlag = true;
    }

    if(errorFlag){
        setFormError(error);
        return false;
    }

    setFormError(initialErrorState);
    return true;
  }

  function submitForm(e){
    e.preventDefault();
    if(validateForm()){
        if(typeof(props.actionFunction) === 'function'){
            props.actionFunction(employee);
        }
    }
  }

  return (
    <Box
        component="form"
        justify="center"
        onSubmit={submitForm}
        onValidate
    >
        <TextField
            id="first_name"
            variant="outlined"
            defaultValue={employee.first_name || ''}
            label="First Name"
            onChange={onChangeFiled}
            required
            className={styles.input} 
            error={formError.first_name.invalid}
            helperText={formError.first_name.invalid && formError.first_name.message}
        />
        <TextField
            id="last_name"
            variant="outlined"
            defaultValue={employee.last_name  || ''}
            label="Last Name"
            onChange={onChangeFiled}
            required
            className={styles.input} 
            error={formError.last_name.invalid}
            helperText={formError.last_name.invalid && formError.last_name.message}
        />
        <TextField
            id="email"
            variant="outlined"
            defaultValue={employee.email  || ''}
            label="Email"
            onChange={onChangeFiled}
            required
            className={styles.input}
            error={formError.email.invalid}
            helperText={formError.email.invalid && formError.email.message} 
        />
        <TextField
            id="number"
            variant="outlined"
            type="number"
            defaultValue={employee.number  || ''}
            label="Phone"
            onChange={onChangeFiled}
            required
            className={styles.input} 
            error={formError.number.invalid}
            helperText={formError.number.invalid && formError.number.message}
        />
        <TextField
            id="gender"
            select
            label="Gender"
            defaultValue={employee.gender  || 'M'}
            SelectProps={{
                native: true,
            }}
            onChange={onChangeFiled}
            required
            className={styles.input}
            error={formError.gender.invalid}
            helperText={formError.gender.invalid && formError.gender.message} 
            >
                <option key={'male'} value={'M'}>
                    Male
                </option>
                <option key={'female'} value={'F'}>
                    Female
                </option>
        </TextField>
        <Box
            display="flex"
            justifyContent="center"
        >
            <Button 
                type='submit'
                variant="outlined" 
                className={styles.btn}
            >
                {props.action}
            </Button>
        </Box>
    </Box>
  );
}
