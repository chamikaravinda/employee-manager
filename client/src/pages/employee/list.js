import Head from 'next/head'
import styles from '@/styles/Employee.list.module.css'
import {Button,IconButton, Grid, Snackbar, Alert, Link} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AppsIcon from '@mui/icons-material/Apps';
import { useSelector } from "react-redux";
import React, { useState } from 'react';
import CommonTable from './../../components/table';
import ImageGrid from './../../components/grid';
import config from './../../config/index.config.json';
import { useRouter } from "next/router";
import { wrapper } from "../../store/store";
import { getEmployees } from '../../store/employeeSlice';
import axios from 'axios';


// export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {  
//   axios.get(`${process.env.NEXT_PUBLIC_API_URL}/employees`)
//   .then(function (response) {
//     store.dispatch(getEmployees(response.data))
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// });

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`);
  const data = await res.json();

  return {
      props : { employees: data }
  }
}

export default function EmployeeList({employees}) {
  
  const router = useRouter()
  // const { employees } = useSelector((state) => state.employees);

  const [state, setState] = useState({
    isOpenNotification: false,
    message: '',
    severity: 'info',
    isGrid: false,
  });

  const { message, severity, isOpenNotification, isGrid } = state;

  const handleClose = () => {
    setState({
      ...state,
      isOpenNotification: false,
      message: '',
      severity: '',
    });  
  };

  function toggleView () {
    setState({
      ...state,
      isGrid: !isGrid
    });
  }

  function EditEmployee(id){
    router.push('/employee/edit/'+id);
  }

  function deleteEmployee(id){
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`)
    .then(function (response) {
      setState({
        ...state,
        isOpenNotification: true,
        message: "Delete employee success",
        severity: "success",
      });
    })
    .catch(function (error) {
      console.log(error);
      setState({
        ...state,
        isOpenNotification: true,
        message: "Error in deleting the employee",
        severity: "error",
      });
    });
  }

  return (
    <>
      <Head>
        <title>Employee Manager | List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Grid container spacing={2}>
          <Grid lg={10}>
          </Grid>
          <Grid lg={2}>
          <Link href="/employee/add">
            <Button variant="contained" className={styles.btnAddEmployee}>Add Employee</Button>
          </Link>
          <IconButton  
            variant="contained" 
            className={styles.btnViewType} 
            onClick={toggleView}
          >
            {
              isGrid ? <FormatListBulletedIcon/>: <AppsIcon/>
            }
          </IconButton >
          </Grid>
          <Grid xs={12}>
            {isGrid ? <ImageGrid 
                        data={employees} 
                        editAction={EditEmployee} 
                        deleteAction={deleteEmployee}
                      /> : <CommonTable 
                          data={employees} 
                          columns = {config.table_columes}
                          editAction={EditEmployee} 
                          deleteAction={deleteEmployee} 
                      /> 
              }
          </Grid>
        </Grid>
        <Snackbar 
          open={isOpenNotification} 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          autoHideDuration={6000} 
          onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      </main>
    </>
  )
}
