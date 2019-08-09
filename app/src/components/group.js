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

export default function GroupViewForm(props) {
  const classes = useStyles();
  const [userId, setUserId] = React.useState(localStorage.getItem('usernameId'));
  const [open, setOpen] = React.useState(false);
  const [gname, setGname] = React.useState('');
  const [checked, setChecked] = React.useState([]);
  const [templist, setTemplist] = React.useState([]);

  const [errorgname, setErrorGname] = React.useState(false);
  
  useEffect(()=>{
        props.list.map (data =>{
          axios.get(`http://localhost:3001/getlist/${data.contact_id}`)
          .then(res =>{ 
            //console.log(res.data)
            setTemplist(prevState => [...prevState, res.data[0]])
          })
        })
  },[setTemplist])

  function handleClose() {
    props.close(false);
  } 
  function   handleCreate() {
   if(gname.length === 0){
    setErrorGname(true)
   } else {
         checked.map( data =>{
          // console.log(data)
          axios.post('http://localhost:3001/creategroup',{
            gname,data,userId
          })
          .then(res =>{
            window.location.reload()
            //console.log(res)
            props.update(res);
            props.close(false);
          })
         })
   }
  }

  function handleGname(data){
    if(data.length === 0){
      setErrorGname(true)
      setGname('')
    } else{
      setErrorGname(false)
      setGname(data)
    }
  }
  function handleCheck(props){

      const currentId = checked.indexOf(props);
      const newChecked = [...checked];
      if (currentId === -1) {
        newChecked.push(props);
      } else {
        newChecked.splice(currentId, 1);
      }
  
      setChecked(newChecked);
  }

    let DataList;

    if(templist.length !== 0){
      DataList=(
       
        templist.map(data => {
          const labelId = `${data.fname+" "+data.lname}`;

          return (
          <ListItem key={data.id} role={undefined} dense button onChange={()=>handleCheck(data.id)}>
              <ListItemIcon>
              <Checkbox
                  edge="start"
                  checked={checked.indexOf(data.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
              />
              </ListItemIcon>
              <ListItemText id={labelId} primary={labelId} />
          </ListItem>
          );
      })  
      )
    } else{
      
      DataList=(

        <ListItem role={undefined} dense button >
        <ListItemIcon>
        </ListItemIcon>
        <ListItemText  primary='No Data Found' />
       </ListItem>   
      ) 
    } 

  return (
      <React.Fragment>
        <DialogTitle id="form-dialog-title"  className={classes.title} >
        <Box fontWeight="fontWeightBold" className={classes.title}>
            Add New Group
        </Box>
       </DialogTitle>
        <DialogContent dividers>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        > 
              <TextField
                className={classes.textField}
                variant="outlined"
                autoComplete="gname"
                margin="dense"
                id="gname"
                name="gname"
                label={errorgname? 'Enter Group Name': 'Group Name'}
                type="text"
                fullWidth
                required
                value={gname}
                error={errorgname}
                onChange={e =>handleGname(e.target.value)}
                onBlur={e =>handleGname(e.target.value) }
              />
            <List >
            {
              DataList
            }
            </List>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Submit
          </Button>
        </DialogActions>
      </React.Fragment>
  );
}