import * as React from 'react';
import styles from '@/styles/Grid.module.css'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';


export default function ImageGrid(props) {
  const itemData = props.data;

  return (
    <ImageList cols={5} gap={20}>
      {itemData.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={item.photo}
            srcSet={item.photo}
            alt={`${item.first_name} ${item.last_name}`}
            loading="lazy"
          />
          <ImageListItemBar
            title={`${item.first_name} ${item.last_name}`}
            subtitle={
                <>
                  <br/>
                  <p className={styles.imageCardEmpData}>{item.email}</p>
                  <br/>
                  <p className={styles.imageCardEmpData}>{item.number}</p>
                  <br/>
                  <p className={styles.imageCardEmpData}>{item.gender == "M" ? 'Male' : 'Female'}</p>
                  <IconButton  
                      variant="contained" 
                      className={styles.btnEditType} 
                      onClick={()=>props.editAction(item.id)}
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
                </>
            }
            position="below"
            className={styles.imageCard}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
