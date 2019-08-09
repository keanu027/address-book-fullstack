import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import GroupForm from './group'
import GroupViewForm from './groupview'

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
  const sort = [
    {
      value: 'ascending',
      label: 'A-Z',
    },
    {
      value: 'descending',
      label: 'Z-A',
    },
  ];

export default function TableGroupForm(props) {
  const classes = useStyles();
  const [userId, setUserId] = React.useState(localStorage.getItem('usernameId'));
  const [open, setOpen] = React.useState(false);
  const [grouplist, setGroupList] = React.useState([]);
  const [filter, setFilter] = React.useState([]);
  const [groupopen, setGroupOpen] = React.useState(false);
  const [grouplistopen, setGroupListOpen] = React.useState(false);
 const [sortval, setSortval] = React.useState(null);
 const [templist, setTemplist] = React.useState([]);
 const [list, setList] = React.useState('');


  useEffect(()=>{
    axios.get(`http://localhost:3001/getgroup`)
    .then(res=> {    
      setGroupList(res.data); 
      setFilter(res.data); 
    });
  },[setGroupList]);
  
  useEffect(()=>{
      axios.get(`http://localhost:3001/create/${localStorage.getItem('usernameId')}`)
      .then(res=> {     
        setTemplist(res.data)
      });

  },[setTemplist])


  function handleClose(){
    setGroupOpen(false)
    setGroupListOpen(false)
  }
  function handleDelete(props){
    //console.log(props)
    /* */
    axios.get(`http://localhost:3001/deletegroupname/${props}`)
    .then(res=> {
      window.location.reload()
  }) 
 }
 function handleUpdate(props){
        console.log(props)
        setGroupList(prevState => [...prevState, props]);

 }
function handleSearch(props){
  if(props.length !== 0){
    var filtered = filter.filter(data =>{
       return data.name.toLowerCase().match(props.toLowerCase()) 
     });
     setGroupList( filtered )
     
   } else {
    setGroupList( filter )
   }
}
function handleSort(props){
    setSortval(props)
    if(props === 'ascending'){
      axios.get(`http://localhost:3001/sortascgroupasc/${localStorage.getItem('usernameId')}`)
      .then(res =>{
        setGroupList(res.data)
        setFilter(res.data)
      })
    } else {
      axios.get(`http://localhost:3001/sortascgroupdesc/${localStorage.getItem('usernameId')}`)
      .then(res =>{
        setGroupList(res.data)
        setFilter(res.data)
      })
    }
}
function handleView(props){
  setGroupListOpen(true)
  axios.post(`http://localhost:3001/grouplist/`,{
    props,userId
  })
  .then(res =>{
    setList(res.data)
  })
}

  let datalist;
     if(grouplist.length !== 0){
       datalist =(
        grouplist.map(data =>(
       <List dense={true} key={data.name} component="nav" className={classes.list}>
                   <ListItem button divider onClick={()=> handleView(data.name)}>
                     <ListItemAvatar >
                           <Avatar sizes="large" style={{backgroundColor: '#3F51B5'}} >                    
                             <GroupIcon />
                           </Avatar>
                     </ListItemAvatar>
                   <ListItemText
                       style={{color: 'black'}}
                       primary={data.name}
                       //secondary={true ? data.fname+" "+data.lname : null}
                   />
                     <ListItemSecondaryAction>

                           <Tooltip title="Add">
                             <IconButton size="small" edge="end" style={{backgroundColor:'transparent'}} >
                               <GroupAddIcon color="primary" />
                             </IconButton>
                         </Tooltip>
   
                         <Tooltip title="Delete">
                             <IconButton size="small" edge="end" style={{backgroundColor:'transparent'}} onClick={()=> handleDelete(data.name)} >
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
                    <Tooltip title="Add Group">
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
                  onChange={(e)=> handleSearch(e.target.value)}
              />
          </Grid>
          <Grid className={classes.headersort}>
              <TextField
                  id="standard-select"
                  variant="outlined"
                  select
                  label="Sort By"
                  value={sortval}
                  onChange={(e)=> handleSort(e.target.value) }
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
        <GroupForm close={handleClose} list={templist}  update={(props)=> handleUpdate(props.data)} 
        />
    </Dialog>

    <Dialog open={grouplistopen} onClose={handleClose}   aria-labelledby="form-dialog-title">
      <GroupViewForm close={handleClose} datalist={list}/>
    </Dialog>

  </React.Fragment>
  )
}