import Head from 'next/head';
import styles from '@/styles/Employee.addEdit.module.css'
import Button from '@mui/material/Button';
import { Link, Grid } from '@mui/material';
import EmployeeForm from '@/components/employee.form';

export const getStaticPaths = async () => {
  const res = await fetch(process.env.api_url+"/users");
  const data = await res.json();

  const paths = data.map( user => {
      return {
          params: {id: user.id.toString()}
      }
  })

  return {
      paths,
      fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(process.env.api_ur+"/users/"+id);
  const data = await res.json();
  return {
      props: {user: data}
  }
}

export default function EditEmployee({user}) {

  
  function editEmployee(employee){
        console.log(employee);
  }

  return (
    <>
      <Head>
        <title>Employee Manager | Edit</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Grid container spacing={2}>
          <Grid lg={10}>
          </Grid>
          <Grid lg={2}>
            <Link href="/employee/list">
                <Button variant="contained" className={styles.btnAddEmployee}>List View</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container columns={12} >
          <Grid lg={4} md={3}>
          </Grid>
          <Grid lg={4} md={6} className={styles.form}>
            <EmployeeForm action={"Save"} actionFunction={editEmployee} data={user}/>
          </Grid>
        </Grid>
      </main>
    </>
  )
}