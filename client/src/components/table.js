import * as React from 'react';
import styles from '@/styles/Table.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Typography from '@mui/material/Typography';

export default function CommonTable(props) {
  const item = props.data;
  const columns = props.columns;

  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}} aria-label="simple table">
            <TableHead>
            <TableRow>
            {columns.map((column) => (
                <TableCell key={column.key}>{column.Lable}</TableCell>
            ))}
            </TableRow>
            </TableHead>
            <TableBody>
            {item.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    {columns.map((column) => 
                        {
                            if(column.key == 'photo') {
                                return <TableCell 
                                key={`${row.id}${column.key}`}
                                >
                                    <img
                                        src={row.photo}
                                        srcSet={row.photo}
                                        alt={`${row.first_name} ${row.last_name}`}
                                        loading="lazy"
                                        height={50}
                                    />
                                </TableCell>
                            }

                            if(column.key == 'action') {
                                return <TableCell 
                                    key={`${row.id}${column.key}`}
                                >
                                    <IconButton  
                                        variant="contained" 
                                        className={styles.btnEditType} 
                                        onClick={()=>props.editAction(row.id)}
                                    >
                                        <EditIcon/>
                                    </IconButton >
                                    <IconButton  
                                        variant="contained" 
                                        className={styles.btnDeleteType} 
                                        onClick={props.deleteAction}
                                    >
                                        <DeleteForeverIcon/>
                                    </IconButton >
                                </TableCell>
                            }
                            return <TableCell key={`${row.id}${column.key}`}>
                                <Typography variant="body2" >{row[column.key]}</Typography>
                            </TableCell>
                        }
                    )}
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
  );
}