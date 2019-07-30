import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const styles={
    title:{
      fontSize: '28px',
      fontWeight: '500',
      margin: '0 auto',
      marginBottom: '15px'
    },
    containerTitle: {
      marginTop: '15%',
      width: '25%',  
      padding: '20px',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
    },
    textHelper:{
      color: 'red',
      marginTop:'-1%',
    },
    btnSubmit:{        
      textTransform: 'capitalize',
      backgroundColor: '#54D134',
      fontWeight: 'bold',
      color: 'white',
      fontSize: '18px',
      marginTop: '3%',
      marginBottom: '3%',
      '&:hover': {
          backgroundColor: '#3DA822',
          color: 'white',
      },
    },
    img:{
      margin: '10px auto',
      backgroundColor: '#3F51B5'
    },
    textHelperName:{
      color: 'red',
      textAlign: 'center'
    }
  }

class Signup extends React.Component {
    constructor(props){
      super(props);
      this.state={
          username:'',
          password: '',
          fname:'',
          lname: '',
          errorusername: false,
          errorpassword: false,
          required: true,
          errorfname: false,
          errorlname: false,
      }
      this.handleUsername = this.handleUsername.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      this.handleFname = this.handleFname.bind(this);
      this.handleLname = this.handleLname.bind(this);
    }
    handleCreate(){
      //console.log(this.state.username,this.state.password,this.state.fname,this.state.lname)
      axios.post('http://localhost:3001/api/registration',{
        username: this.state.username,
        password: this.state.password,
        fname: this.state.fname,
        lname: this.state.lname
      }).then(res =>{
        console.log(res)
        return <Redirect to='/api/login' />
      })

    }
    handleLname = key => event =>{
      if(event.target.value.length === 0){
        this.setState({
          errorlname: true,
          [key]: event.target.value 
        })
      } else {
        this.setState({
          errorlname: false,
          [key]: event.target.value 
        })
      }
    }
    handleFname = key => event =>{
      if(event.target.value.length === 0){
        this.setState({
          errorfname: true,
          [key]: event.target.value 
        })
      } else {
        this.setState({
          errorfname: false,
          [key]: event.target.value 
        })
      }
    }
    
    handleUsername = key => event =>{
        if(event.target.value.length === 0){
          this.setState({
            errorusername: true,
            [key]: event.target.value 
          })
        } else {
          this.setState({
            errorusername: false,
            [key]: event.target.value 
          })
        }
      }
    handlePassword = key => event =>{
        if(event.target.value.length === 0){
          this.setState({
            errorpassword: true,
            [key]: event.target.value 
          })
        } else {
          this.setState({
            errorpassword: false,
            [key]: event.target.value 
          })
        }
    }
    render(){
        const { classes } = this.props;
        return(
        <React.Fragment>
        <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      >
        <Paper className={classes.containerTitle}>
          <Grid container justify="center" alignItems="center"  >
            <Avatar className={classes.img}>
                <LockOutlinedIcon  />
            </Avatar>
                
          </Grid>
            <Grid container justify="center" alignItems="center"  >
                <Typography variant="h1" className={classes.title} >Create Account</Typography>
            </Grid>
            <Grid container direction="row" justify="center"  alignItems="center"  >
            <Grid item xs={12} sm={6}>
              <TextField
                  style={{marginRight:'1%'}}
                  autoComplete="fname"
                  name="fname"
                  variant="outlined"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  
                  error={this.state.errorfname}
                  onChange={this.handleFname('fname')}
                  onBlur={this.handleFname('fname')}
                />
                  <Grid item xs={12} sm={9}>
                  <FormHelperText
                  className={classes.textHelperName}
                  style={{display: this.state.errorfname ? 'block': 'none'}}
                  >First Name is required</FormHelperText>
                  </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{margin:'1%'}}
                  variant="outlined"
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="lname"
                  error={this.state.errorlname}
                  onChange={this.handleLname('lname')}
                  onBlur={this.handleLname('lname')}
                />
                  <Grid item xs={12} sm={9}>
                  <FormHelperText
                  className={classes.textHelperName}
                  style={{display: this.state.errorlname ? 'block': 'none'}}
                  >Last Name is required</FormHelperText>
                  </Grid>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center"  alignItems="center"  >
            <TextField
                id="standard-name"
                label="Username"
                margin="normal"
                variant="outlined"
                fullWidth 
                required={this.state.required}
                error={this.state.errorusername}
                value={this.state.username}
                onChange={this.handleUsername('username')}
                onBlur={this.handleUsername('username')}
            />
            <FormHelperText
                className={classes.textHelper}
                style={{display: this.state.errorusername ? 'block': 'none'}}
            >Username is required</FormHelperText>
            </Grid>

            <Grid container direction="row" justify="center"  alignItems="center"  >
            <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                fullWidth 
                required={this.state.required}
                error={this.state.errorpassword}
                value={this.state.password}
                onChange={this.handlePassword('password')}
                onBlur={this.handlePassword('password')}
            />
            <FormHelperText
                className={classes.textHelper}
                style={{display: this.state.errorpassword ? 'block': 'none'}}
            >Password is required</FormHelperText>
            </Grid>
            <Grid container direction="row" justify="center"  alignItems="center"  >
            <Button variant="contained" fullWidth className={classes.btnSubmit}
                onClick={this.handleCreate}
            >
                Create
            </Button>
            </Grid>
        </Paper>
        </Grid>
        </React.Fragment>
        )
    }

}
export default withStyles(styles)(Signup);