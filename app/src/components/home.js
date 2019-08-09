import React,{useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import DailogForm from './add'
import TableForm from './table'
import TableGroupForm from './tablegroup'

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(),
  },
  bgappbar:{
    backgroundColor:'#32717F '//AAB8C9
  }
}));

  function Home(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [contactlist, setContactList] = React.useState([]);
  const [username, setUsername]= React.useState('');
  const [namelist, setNameList]= React.useState(true);
  const [listopen, setListopen]= React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);

  useEffect(() => {
    if(!localStorage.getItem('token')){
      console.log(localStorage.getItem('token'))
      props.history.push('/api/login')
    }
    setUsername(localStorage.getItem('username'))
  });

  useEffect(()=>{
    axios.get(`http://localhost:3001/create/${localStorage.getItem('usernameId')}`)
    .then(res=> {     
      //console.log(res) 
      setContactList(res.data); 
    });
  },[setContactList]);



  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('usernameId');
    props.history.push('/api/login')
  }

  function handleClose(event) {
    //setOpenDialog(false);
    setOpen(false);
  }
  function handleList(){
    setListopen(!listopen)
    setNameList(!namelist)
  }
  return (
    <React.Fragment>
    <div className={classes.root}>
      <AppBar position="relative" className={classes.bgappbar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
              >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Button color="inherit" onClick={handleList}>{namelist? 'Group List': 'Contact List'}</Button>
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
      </AppBar>
      <Dialog open={openDialog} onClose={handleClose}  aria-labelledby="form-dialog-title">
        <DailogForm close={setOpenDialog}/>
      </Dialog>
      
    </div>
    <Grid style={{display: listopen? 'block': 'none'}}>
    <TableForm datalist={contactlist} />
    </Grid>

    <Grid style={{display: listopen? 'none': 'block'}}>
    <TableGroupForm  />
    </Grid>

  </React.Fragment>
  );
}
export default  withRouter(Home);