import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import DownloadIcon from '@material-ui/icons/GetApp';
import { saveAs } from 'file-saver'
import Box from '@material-ui/core/Box'

export default function Cards({details}) {

  const handleDown=(image_url)=>{
    saveAs(image_url, 'image.jpg') 
  }


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
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {details?.Name[0]}
          </Avatar>
        }
        title={details?.Name}
        subheader={`${details?.likes} Likes`}
      />
        <IconButton onClick={()=>{handleDown(details?.download)}}  aria-label="Download">
          <DownloadIcon />
        </IconButton>
      </CardActions>
    </Card>
    </Box>

  );
}
