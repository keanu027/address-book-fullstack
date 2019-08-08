import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import GroupForm from './group'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '5%',
    margin: '0 auto',
    width: '95%',
    backgroundColor: '#85C1CC',
    '@media (max-width:320px)':{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between', 
    }

  },  
  paper: {
    width: '95%',
    overflowX: 'auto',
    margin: '0 auto',
    backgroundColor: '#f4f4f4',//E8AD6D

  },
  header:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width:320px)':{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
     }
  },
  headertitle:{
    fontWeight: 'bold',
    marginTop: '1%',
    color: 'white',
    '@media (max-width:320px)':{
      color: 'white',
      fontSize: '25px',
      marginTop: '5%',
      width: '70%',
      textAlign: 'center',

     }
  },
  headersearch:{
  width: '30%',
  '@media (max-width:320px)':{
    width: '80%',
   },
  },
  headersort:{
  marginLeft: '3%', marginRight: '3%',
  width: '30%',
  '@media (max-width:320px)':{
    width: '80%',
   },
  },
  headeradd:{
  '@media (max-width:320px)':{
    width: '30%',
    fontSize: '10px',
    textAlign:'center',
   },
  },

  }));


export default function TableGroupForm(props) {
  const classes = useStyles();
  const [userId, setUserId] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [grouplist, setGroupList] = React.useState([]);
  const [groupopen, setGroupOpen] = React.useState(false);


  useEffect(()=>{
    if(localStorage.getItem('usernameId')){
      setUserId(localStorage.getItem('usernameId'))
    }
  });

  useEffect(()=>{
    axios.get(`http://localhost:3001/getgroup/${localStorage.getItem('usernameId')}`)
    .then(res=> {    
      console.log(res.data)
    setGroupList(res.data); 
    });
  },[setGroupList]);

  function handleClose(){
    setGroupOpen(false)
  }



  
  let datalist;
   const sort = [
     {
       value: 'fnameAsc',
       label: 'First Name Asc',
     },
     {
       value: 'fnameDesc',
       label: 'First Name Desc',
     },
     {
       value: 'lnameAsc',
       label: 'Last Name Asc',
     },
     {
       value: 'lnameDesc',
       label: 'Last Name Desc',
     }
   ];
     if(grouplist.length !== 0){
       datalist =(
        grouplist.map(data =>(
       <List dense={true} key={data.contact_id} component="nav" className={classes.list}>
                   <ListItem button divider >
                     <ListItemAvatar >
                           <Avatar sizes="large" style={{backgroundColor: '#3F51B5'}} >                    
                             <GroupIcon />
                           </Avatar>
                     </ListItemAvatar>
                   <ListItemText
                       style={{color: 'black'}}
                       primary={data.name}
                       secondary={true ? data.fname+" "+data.lname : null}
                   />
                     <ListItemSecondaryAction>

                           <Tooltip title="Add">
                             <IconButton size="small" edge="end" style={{backgroundColor:'transparent'}} >
                               <GroupAddIcon color="primary" />
                             </IconButton>
                         </Tooltip>
   
                         <Tooltip title="Delete">
                             <IconButton size="small" edge="end" style={{backgroundColor:'transparent'}} >
                               <DeleteIcon color="error" />
                             </IconButton> 
                         </Tooltip>
                     </ListItemSecondaryAction>
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

  <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-end"
      
  >
  <Paper className={classes.root}>
  <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-end"
      style={{padding: '0 20px'}}
  >
      <Typography variant="h5" className={classes.headertitle}  >
        Group List
      </Typography>

        <IconButton size="small" edge="end" style={{backgroundColor:'transparent'}} className={classes.headeradd}  onClick={()=> setGroupOpen(true)}>
                    <Tooltip title="Add Contact">
                        <GroupAddIcon color="primary" fontSize="large" />
                    </Tooltip>
        </IconButton>


  </Grid>
  </Paper>
  </Grid>

  <Paper className={classes.paper}>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-end"
      className={classes.header}
    >   
          <Grid className={classes.headersearch}>
              <TextField
                  variant="outlined"
                  id="standard-search"
                  label="Search"
                  type="search"
                  margin="normal"
                  fullWidth
                  //onChange={(e)=>this.handleSearch(e.target.value)}
              />
          </Grid>
          <Grid className={classes.headersort}>
              <TextField
                  id="standard-select"
                  variant="outlined"
                  select
                  label="Sort By"
                  //value={this.state.sortval}
                  //onChange={(e)=> this.handleSort(e.target.value) }
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  fullWidth
                  margin="normal"
                >
                  {sort.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
          </Grid>
    </Grid>
    <Divider />
    {
      datalist
    }
    </Paper>


  <Dialog open={groupopen} onClose={handleClose}   aria-labelledby="form-dialog-title">
        <GroupForm close={handleClose} list={grouplist}/>
    </Dialog>

  </React.Fragment>
  )
}