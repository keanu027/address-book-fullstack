import React from 'react';
import axios from 'axios';
import GroupForm from './group'
import FormDialogView from './view'
import DailogForm from './add'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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

const styles={
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
}

class TableForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            usernameId: localStorage.getItem('usernameId'),
            personaldata: [] ,
            contactlist: [],
            open: false,
            list: [],
            sortval: '',
            stopper: true,
            filter: [],
            sortasc: [],
            addopen: false,
            groupopen: false,
            data : 'Contact List',
            loadingdata: true,
        }
        this.handleDestroy =this.handleDestroy.bind(this);
        this.handleView =this.handleView.bind(this);
        this.handleClose =this.handleClose.bind(this);
        this.handleSearch =this.handleSearch.bind(this);
        this.handleSort =this.handleSort.bind(this);
        this.handleUpdate =this.handleUpdate.bind(this);
        this.handleReload =this.handleReload.bind(this);
    }
    componentWillReceiveProps(props){
      if(this.state.stopper){
          if(props.datalist.length !== 0){
          props.datalist.map(data =>{
            axios.get(`http://localhost:3001/getlist/${data.contact_id}`)
            .then(res=>{
              //console.log(res)
              this.setState({
                stopper:false,
                contactlist:this.state.contactlist.concat(res.data),
                filter:this.state.contactlist.concat(res.data)
              })
            })
          })
          }
      } 


    }
    handleReload(props){
/* 
    this.setState({ 
      loadingdata:false
    })
      axios.get(`http://localhost:3001/create/${localStorage.getItem('usernameId')}`)     
      .then(res =>{
        this.setState({ 
          contactlist: ''
        })
          res.data.map(data =>{
           // console.log(data.contact_id)
            axios.get(`http://localhost:3001/getlist/${data.contact_id}`)
            .then(res =>{
                //console.log(res.data[0])
                this.setState({
                  contactlist:this.state.contactlist.concat( res.data[0]),
                })
            })
          })
      })
*/
    }
    handleView(event){
      axios.get(`http://localhost:3001/data/${event}`)
      .then(res=>{
        /* */
        this.setState({
          personaldata: res.data,
          open: true,
        })
      })

      
    }
    
    handleDestroy(event){
      axios.delete(`http://localhost:3001/delete/${event}`)
      .then(res =>{
        window.location.reload();
        //console.log(res)
      }) 
    }
    handleClose(){
      this.setState({
        open: false,
        addopen:false,
        groupopen:false,
      })
    }
    handleSearch(props){
      if(props.length !== 0){
       var filter = this.state.filter.filter(data =>{
          return data.fname.toLowerCase().match(props.toLowerCase()) || data.lname.toLowerCase().match(props.toLowerCase())
        });
          this.setState({
            contactlist: filter
          })
        
      } else {
        this.setState({
          contactlist:this.state.filter
        })

      }
    }

    handleSort(props){
      this.setState({
        sortval:props
      });
      if(props === 'fnameAsc'){
        axios.get(`http://localhost:3001/sortascfname/${localStorage.getItem('usernameId')}`)
        .then(res =>{
          /* */
          this.setState({
            sortasc: this.state.sortasc.concat(res.data),
            contactlist: res.data,
            filter: res.data,
          })
          //console.log(res)
        })

      } else if(props === 'fnameDesc'){
        axios.get(`http://localhost:3001/sortdescfname/${localStorage.getItem('usernameId')}`)
        .then(res =>{
          /* */
          this.setState({
            sortasc: this.state.sortasc.concat(res.data),
            contactlist: res.data,
            filter: res.data,
          })
          //console.log(res)
        })

      } else if(props === 'lnameAsc'){
        axios.get(`http://localhost:3001/sortasclname/${localStorage.getItem('usernameId')}`)
        .then(res =>{
          this.setState({
            sortasc: this.state.sortasc.concat(res.data),
            contactlist: res.data,
            filter: res.data,
          })
        })
      } else if(props === 'lnameDesc'){
        axios.get(`http://localhost:3001/sortdesclname/${localStorage.getItem('usernameId')}`)
        .then(res =>{
          this.setState({
            sortasc: this.state.sortasc.concat(res.data),
            contactlist: res.data,
            filter: res.data,
          })
        })
      }
    }
    handleUpdate(props){
      this.setState({
        contactlist:this.state.contactlist.concat(props),
        filter:this.state.contactlist.concat(props)
      })
      
    }

    render(){
     const {classes} = this.props;
     const list =this.state.contactlist;
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
        if(list.length !== 0){
          datalist =(
            this.state.contactlist.map(data =>(
          <List dense={true} key={data.id} component="nav" className={classes.list}>
                      <ListItem button divider onClick={()=> this.handleView(data.id)}>
                        <ListItemAvatar >
                              <Avatar sizes="large" style={{backgroundColor: '#3F51B5'}} >                    
                                <AccountBoxIcon />
                              </Avatar>
                        </ListItemAvatar>
                      <ListItemText
                          style={{color: 'black'}}
                          primary={data.fname+" "+data.lname}
                          secondary={true ? data.mobile_phone : null}
                      />
                        <ListItemSecondaryAction>
                            <Tooltip title="Delete">
                                <IconButton size="small" edge="end" style={{backgroundColor:'transparent'}} onClick={()=> this.handleDestroy(data.id)}  >
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
      

      /*
          <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="flex-end"
      wrap="warp"
      className={classes.header}
    >
      */
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
      <Typography variant="h5"  className={classes.headertitle}  >
           {this.state.data}
      </Typography>

        <IconButton size="small" edge="end" style={{backgroundColor:'transparent'}}  className={classes.headeradd}  onClick={()=>{ this.setState({addopen:true})} }>
                    <Tooltip title="Add Contact">
                        <PersonAddIcon color="primary" fontSize="large" />
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
                  onChange={(e)=>this.handleSearch(e.target.value)}
              />
          </Grid>
          <Grid className={classes.headersort}>
              <TextField
                  id="standard-select"
                  variant="outlined"
                  select
                  label="Sort By"
                  value={this.state.sortval}
                  onChange={(e)=> this.handleSort(e.target.value) }
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

    
    <Dialog open={this.state.addopen} onClose={this.handleClose}   aria-labelledby="form-dialog-title">
        <DailogForm close={this.handleClose} update={(props)=> this.handleUpdate(props.data)}/>
    </Dialog>
    
  <Dialog open={this.state.open} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
      <FormDialogView 
      personinfo={this.state.personaldata} 
      reload={(props)=> this.handleReload(props.data) }
      close={this.handleClose}/>
  </Dialog>
  
  </React.Fragment>
  );
    }

}
export default  withStyles(styles)(TableForm);