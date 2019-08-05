import React from 'react';
import { withStyles } from '@material-ui/core/styles'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import FormDialogView from './view'

const styles={
  root: {
    width: '95%',
    marginTop: '5%',
    overflowX: 'auto',
    margin: '0 auto'
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
    fontWeight: '600'
  }
}

class TableForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            usernameId: localStorage.getItem('usernameId'),
            personaldata: [] ,
            contactlist: [],
            fname: '',
            open: false,
            list: [],
        }
        this.handleDestroy =this.handleDestroy.bind(this);
        this.handleView =this.handleView.bind(this);
        this.handleClose =this.handleClose.bind(this);
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
        props.datalist.map(data =>{
          axios.get(`http://localhost:3001/getlist/${data.contactId}`)
          .then(res=>{
            //console.log(res)
            this.setState({
              contactlist:this.state.contactlist.concat(res.data)
            })
          })
        })
    }
    handleView(event){
      axios.get(`http://localhost:3001/data/${event}`)
      .then(res=>{
        //console.log(res.data[0].fname)
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
      })
    }

    render(){
     const {classes} = this.props;

    return (
  <React.Fragment>
    <Paper className={classes.root}>
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
        <TableBody>
            {
              /* 
              this.props.datalist.map(data => (
                <TableRow key={data.id}>
                  <TableCell  > {data.fname} </TableCell>
                  <TableCell align="right">{data.lname}</TableCell>
                  <TableCell align="right">{data.home_phone}</TableCell>
                  <TableCell align="right">{data.mobile_phone}</TableCell>
                  <TableCell align="right">{data.work_phone}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" style={{backgroundColor:'transparent'}} onClick={()=> this.handleView(data.id)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                    <IconButton size="small" style={{backgroundColor:'transparent'}} onClick={()=> this.handleDestroy(data.id)}  >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
              */
             this.state.contactlist.map(data => (
              <TableRow key={data.id}>
                <TableCell  > {data.fname} </TableCell>
                <TableCell align="right">{data.lname}</TableCell>
                <TableCell align="right">{data.home_phone}</TableCell>
                <TableCell align="right">{data.mobile_phone}</TableCell>
                <TableCell align="right">{data.work_phone}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" style={{backgroundColor:'transparent'}} onClick={()=> this.handleView(data.id)}>
                    <VisibilityIcon color="primary" />
                  </IconButton>
                  <IconButton size="small" style={{backgroundColor:'transparent'}} onClick={()=> this.handleDestroy(data.id)}  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
            }
          </TableBody>

      </Table>
    </Paper>
  <Dialog open={this.state.open} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
      <FormDialogView 
      personinfo={this.state.personaldata} 

      close={this.handleClose}/>
  </Dialog>
  </React.Fragment>
  );
    }

}
export default  withStyles(styles)(TableForm);