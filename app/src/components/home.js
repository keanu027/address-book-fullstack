import React,{useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import DailogForm from './add'
import TableForm from './table'
import axios from 'axios';

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
 
}));

  function Home(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [contactlist, setContactList] = React.useState([]);
  const [addressbook, setAddressBook] = React.useState([]);
  const [username, setUsername]= React.useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  const anchorRef = React.useRef(null);

  useEffect(() => {
    if(!localStorage.getItem('token')){
      console.log(localStorage.getItem('token'))
      props.history.push('/api/login')
    }
    setUsername(localStorage.getItem('username'))
  });

/* */
  useEffect(()=>{
    axios.get(`http://localhost:3001/create/${localStorage.getItem('usernameId')}`)
    .then(res=> {      
      //console.log(res.data)
      //console.log(res.data.data)
      setContactList(res.data); 
     // setAddressBook(res.data.data);
    });
  },[setContactList],[setAddressBook]);

  function handleAddForm(){
    setOpenDialog(true);
    setOpen(false);

  }
  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('usernameId');
    props.history.push('/api/login')
  }

  function handleToggle() {
   setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    //setOpenDialog(false);
    setOpen(false);
  }

  return (
    <React.Fragment>
    <div className={classes.root}>
      <AppBar position="relative">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
              ref={anchorRef}  aria-controls="menu-list-grow"  aria-haspopup="true"
              //onClick={handleToggle}
              >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
      </AppBar>
      <Dialog open={openDialog} onClose={handleClose}  aria-labelledby="form-dialog-title">
        <DailogForm close={setOpenDialog}/>
      </Dialog>
      
    </div>
    <TableForm datalist={contactlist} />
    <div>
        <Popper open={open} anchorEl={anchorRef.current} keepMounted transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <MenuItem onClick={handleAddForm}>Add Address Book</MenuItem>
                    <MenuItem onClick={handleClose}>Your Profile</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    
  </React.Fragment>
  );
}
export default  withRouter(Home);