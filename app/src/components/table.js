import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import FormDialogView from './view'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import DailogForm from './add'
const styles={
  root: {
    width: '95%',
    marginTop: '5%',
    overflowX: 'auto',
    margin: '0 auto',

  },
  table: {
    maxWidth: 2000,
  },
  tablehead:{
    backgroundColor: '#e0e0e0'
  },
  tablecell:{
    color:'black', 
    fontSize: '16px',
    fontWeight: '600',
    '@media (max-width:600px)':{
      color: 'red'
     }
  }
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
        }
        this.handleDestroy =this.handleDestroy.bind(this);
        this.handleView =this.handleView.bind(this);
        this.handleClose =this.handleClose.bind(this);
        this.handleSearch =this.handleSearch.bind(this);
        this.handleSort =this.handleSort.bind(this);
        this.handleReload =this.handleReload.bind(this);
    }
    componentDidMount(){
      /*
        axios.get(`http://localhost:3001/create/${this.state.usernameId}`)
        .then(res=>
           {
            this.setState({
              contactlist: res.data
            })
           }
          ) 
       */
    }

    componentWillReceiveProps(props){
        //console.log(props.datalist)
        if(props.datalist.length !== 0){
        props.datalist.map(data =>{
          axios.get(`http://localhost:3001/getlist/${data.contact_id}`)
          .then(res=>{
            //console.log(res)
            this.setState({
              contactlist:this.state.contactlist.concat(res.data),
              filter:this.state.contactlist.concat(res.data)
            })
          })
        })
        }

    }
    handleReload(){
/*
      axios.get(`http://localhost:3001/create/${localStorage.getItem('usernameId')}`)
      .then(res =>{
          res.data.map(data =>{
            //console.log(data.contactId)
            axios.get(`http://localhost:3001/getlist/${data.contactId}`)
            .then(res =>{
              console.log(res)
              this.state.contactlist.map(list =>{
                  if(list.id !== res.id){
                    this.setState({
                      contactlist:this.state.contactlist.concat(res.data)
                    })
                  }
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
        console.log(res)
      }) 
    }
    handleClose(){
      this.setState({
        open: false,
        addopen:false,
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
      if(props === 'fname'){
        axios.get(`http://localhost:3001/sortasc/${localStorage.getItem('usernameId')}`)
        .then(res =>{
          this.setState({
            sortasc: this.state.sortasc.concat(res.data),
            contactlist: res.data
          })
        })

      } else if(props === 'lname'){
        axios.get(`http://localhost:3001/sortdesc/${localStorage.getItem('usernameId')}`)
        .then(res =>{
          this.setState({
            sortasc: this.state.sortasc.concat(res.data),
            contactlist: res.data
          })
        })
      }
    }
    render(){
     const {classes} = this.props;
     const list =this.state.contactlist;
     list.map(data => console.log(data))
     let TableData;
      if(list.length !== 0){
        TableData =(
        this.state.contactlist.map(data => (
          <TableRow key={data.id}>
            <TableCell  > {data.fname} </TableCell>
            <TableCell align="right">{data.lname}</TableCell>
            <TableCell align="right">{data.home_phone}</TableCell>
            <TableCell align="right">{data.mobile_phone}</TableCell>
            <TableCell align="right">{data.work_phone}</TableCell>
            <TableCell align="right">
            <Tooltip title="View">
              <IconButton size="small" style={{backgroundColor:'transparent'}} onClick={()=> this.handleView(data.id)}>
                <VisibilityIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" style={{backgroundColor:'transparent'}} onClick={()=> this.handleDestroy(data.id)}  >
                <DeleteIcon color="error" />
              </IconButton> 
            </Tooltip>
            </TableCell>
          </TableRow>
        ))
        )
      } else{
        TableData = (
        <TableRow>
        <TableCell  >No Data </TableCell>
        <TableCell align="right">No Data</TableCell>
        <TableCell align="right">No Data</TableCell>
        <TableCell align="right">No Data</TableCell>
        <TableCell align="right">No Data</TableCell>
      </TableRow>
      )
      }
      const sort = [
        {
          value: 'fname',
          label: 'First Name',
        },
        {
          value: 'lname',
          label: 'Last Name',
        }
      ];
    return (
  <React.Fragment>
    <Paper className={classes.root}>
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="flex-end"
    >
    <Grid item>
    <Typography variant="h4">
              Contact List
    </Typography>
    </Grid>
    <Grid item  xs={3}>
        <TextField
            id="standard-search"
            label="Search"
            type="search"
            margin="normal"
            fullWidth
            onChange={(e)=>this.handleSearch(e.target.value)}
        />
    </Grid>
    <Grid item  xs={3}>
        <TextField
            id="standard-select"
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
    <Grid item >
        <Tooltip title="Add Contact">
        <IconButton size="small" edge="end" style={{backgroundColor:'transparent'}}  onClick={()=> this.setState({addopen:true})}>
                    <PersonAddIcon color="primary" fontSize="large" />
        </IconButton>
        </Tooltip>
    </Grid>
    </Grid>

    <Dialog open={this.state.addopen} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
        <DailogForm close={this.handleClose}/>
      </Dialog>

      <Table className={classes.table}>
        <TableHead className={classes.tablehead}>
          <TableRow>
            <TableCell className={classes.tablecell} >First Name</TableCell>
            <TableCell className={classes.tablecell}  align="right">Last Name</TableCell>
            <TableCell className={classes.tablecell}  align="right">Home Phone</TableCell>
            <TableCell className={classes.tablecell} align="right">Mobile Phone</TableCell>
            <TableCell className={classes.tablecell} align="right">Work Phone</TableCell>
            <TableCell className={classes.tablecell} align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
            {
              /* 
             this.state.contactlist.map(data => (
              <TableRow key={data.id}>
                <TableCell  > {data.fname} </TableCell>
                <TableCell align="right">{data.lname}</TableCell>
                <TableCell align="right">{data.home_phone}</TableCell>
                <TableCell align="right">{data.mobile_phone}</TableCell>
                <TableCell align="right">{data.work_phone}</TableCell>
                <TableCell align="right">
                <Tooltip title="View">
                  <IconButton size="small" style={{backgroundColor:'transparent'}} onClick={()=> this.handleView(data.id)}>
                    <VisibilityIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small" style={{backgroundColor:'transparent'}} onClick={()=> this.handleDestroy(data.id)}  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
                </TableCell>
              </TableRow>
            ))   */
            TableData
            }
          </TableBody>

      </Table>
    </Paper>
  <Dialog open={this.state.open} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
      <FormDialogView 
      personinfo={this.state.personaldata} 
      reload={this.handleReload}
      close={this.handleClose}/>
  </Dialog>
  </React.Fragment>
  );
    }

}
export default  withStyles(styles)(TableForm);