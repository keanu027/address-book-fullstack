import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import GroupIcon from '@material-ui/icons/Group';
import Tooltip from '@material-ui/core/Tooltip';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles(theme => ({
  title: {
    backgroundColor: '#55D134',
    color: 'white',
    flexGrow: 1,
    '@media (max-width:320px)':{
      textAlign:'center',
      fontSize: '18px',
    }
  },
  menuButton: {
    marginRight: theme.spacing(),
  },
  textField:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
 
}));

export default function GroupForm(props) {
  const classes = useStyles();
  const [userId, setUserId] = React.useState(localStorage.getItem('usernameId'));
  const [open, setOpen] = React.useState(false);
  const [gname, setGname] = React.useState('');
  const [checked, setChecked] = React.useState([]);
  const [templist, setTemplist] = React.useState([]);

  const [errorgname, setErrorGname] = React.useState(false);
  

  function handleClose() {
    props.close(false);
  } 
 
  let datalist;
  if(props.datalist.length !== 0){
    datalist =(
      props.datalist.map(data =>(
    <List dense={true} key={data.id} component="nav" className={classes.list}>
                <ListItem button divider >
                  <ListItemAvatar >
                        <Avatar sizes="large" style={{backgroundColor: '#3F51B5'}} >                    
                          <GroupIcon />
                        </Avatar>
                  </ListItemAvatar>
                <ListItemText
                    style={{color: 'black'}}
                    primary={data.fname+" "+data.lname}
                />
                 
                </ListItem>
      </List>  
      ))
      
      )
  } else {
    datalist =(
      <List dense={true}>
      <ListItem button divider>
        <ListItemAvatar >
              <Avatar sizes="large" style={{backgroundColor: '#3F51B5'}}>                    
                <AccountBoxIcon />
              </Avatar>
        </ListItemAvatar>
      <ListItemText
          style={{color: 'black'}}
          primary="No Data Found"
          secondary={false ? '': null}
      />
      </ListItem>
    </List>   
    )
  }

  return (
      <React.Fragment>
        <DialogTitle id="form-dialog-title"  className={classes.title} >
        <Box fontWeight="fontWeightBold" className={classes.title}>
            Group Info
        </Box>
        
       </DialogTitle>
        <DialogContent dividers>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        > 
        {
          datalist
        }
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </React.Fragment>
  );
}