import * as React from 'react';
import Card from '@material-ui/core/Card';
import './cards.css'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import DownloadIcon from '@material-ui/icons/GetApp';
import Box from '@material-ui/core/Box'
import axios from 'axios';


export default function Cards({details}) {

  const download = image_url => {

    axios({
      url:`${image_url}`,
      method: "GET",
      responseType:'blob',
      headers:{Authorization:process.env.REACT_APP_KEY}
    })
      .then(response => {
        
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.jpeg"); 
          document.body.appendChild(link);
          link.click();
        
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  return (
    <Box sx={{boxShadow:'0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',borderRadius:'2%'}}>
    <Card sx={{ maxWidth: 340}} style={{borderRadius:'2%'}}>
      <CardMedia
        component="img"
        height="194"
        image={details?.url}
        alt="Paella dish"
      />
      <CardActions >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} onClick={()=>window.open(details?.user_links,'_blank')} className='effect' aria-label="recipe">
            {details?.Name[0]}
          </Avatar>
        }
        title={details?.Name}
        subheader={`${details?.likes} Likes`}
      />
        <IconButton  aria-label="Download">
          <DownloadIcon onClick={()=>{download(details?.download)}}  />
        </IconButton>
  
      </CardActions>
    </Card>
    </Box>

  );
}
