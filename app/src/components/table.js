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
    constructor(){
        super();
        this.state={
            usernameId: localStorage.getItem('usernameId'),
            personaldata: [] ,
            contactlist: [],
        }
        this.handleDestroy =this.handleDestroy.bind(this);
        this.handleView =this.handleView.bind(this);
    }
    componentDidMount(){
      setInterval((
        axios.get(`http://localhost:3001/create/${this.state.usernameId}`)
        .then(res=>
           {
             //console.log(res)
            this.setState({
              contactlist: res.data
            })
           }
          )    
      ),1000)
       
    }
    handleView(props){
      
    }
    
    handleDestroy(props){
      
      axios.delete(`http://localhost:3001/delete/${props}`)
      .then(res =>{
        console.log(res)
      })
    }


    render(){
     const {classes} = this.props;
      //this.state.contactlist.map(data => console.log(data))
     //console.log(this.state.contactlist,)

    return (
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
              this.state.contactlist.map(data => (
                <TableRow key={data.id}>
                  <TableCell  > {data.fname} </TableCell>
                  <TableCell align="right">{data.lname}</TableCell>
                  <TableCell align="right">{data.home_phone}</TableCell>
                  <TableCell align="right">{data.mobile_phone}</TableCell>
                  <TableCell align="right">{data.work_phone}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" style={{backgroundColor:'transparent'}} onClick={this.handleView(data.id)}>
                      <VisibilityIcon color="primary"/>
                    </IconButton>
                    <IconButton size="small" style={{backgroundColor:'transparent'}} onClick={this.handleDestroy(data.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>

      </Table>
    </Paper>
  );
    }

}
export default  withStyles(styles)(TableForm);