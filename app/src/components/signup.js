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
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import axios from 'axios';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning';
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
      backgroundColor: '#4CAF50',//#54D134
      fontWeight: 'bold',
      color: 'white',
      fontSize: '18px',
      marginTop: '3%',
      marginBottom: '3%',
      '&:hover': {
          backgroundColor: '#3e8e41',//#3DA822
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
  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};
function MySnackbarContentWrapper(props){
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];
  
  return (
    <SnackbarContent 
    aria-describedby="client-snackbar"
    message={
      <span id="client-snackbar" style={{display:'flex',alignItems:'center'}}>
        <Icon   />
        {message}
      </span>
    }

    />
  )
}

class Signup extends React.Component {
    constructor(props){
      super(props);
      this.state={
          username:'',
          password: '',
          fname:'',
          lname: '',
          errormessage: '',
          errorusername: false,
          errorpassword: false,
          required: true,
          errorfname: false,
          errorlname: false,
          openmessage: false,
          errorvalidusername: false,
          errorvalidpassword: false,
      }
      this.handleUsername = this.handleUsername.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      this.handleFname = this.handleFname.bind(this);
      this.handleLname = this.handleLname.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }
    componentDidMount(){
      if(localStorage.getItem('token')){
        this.props.history.push('/')
      }
    }
    handleClose(){
      this.setState({
        openmessage: false,
      })
    }
    handleCreate(){
      if(this.state.username.length === 0 || this.state.password.length === 0 || this.state.fname.length === 0 || this.state.lname.length === 0){
          if(this.state.username.length === 0 && this.state.password.length !== 0
            && this.state.fname.length !== 0 && this.state.lname.length !== 0 ){
            this.setState({
              errorusername:true
            })
          } else if (this.state.password.length === 0 && this.state.username.length !== 0 
                    && this.state.fname.length !== 0 && this.state.lname.length !== 0 ){
            this.setState({
              errorpassword:true
            })
          } else if(this.state.fname.length === 0 && this.state.lname.length !== 0
            && this.state.password.length !== 0 && this.state.username.length !== 0 ){
            this.setState({
              errorfname:true
            })
          } else if(this.state.lname.length === 0 && this.state.fname.length !== 0
            && this.state.password.length !== 0 && this.state.username.length !== 0 ){
            this.setState({
              errorlname:true
            })
          } else if(this.state.lname.length === 0 && this.state.fname.length === 0
            && this.state.password.length !== 0 && this.state.username.length !== 0 ){
            this.setState({
              errorfname:true,
              errorlname:true
            })
          } else {
            this.setState({
              errorfname:true,
              errorlname:true,
              errorusername:true,
              errorpassword:true
            })
          }
      } else{
              axios.post('http://localhost:3001/api/registration',{
                username: this.state.username,
                password: this.state.password,
                fname: this.state.fname,
                lname: this.state.lname
              }).then(res =>{
                if(res.data.error === "Already have Account"){
                console.log(res.data.error)
                  this.setState({
                    errormessage: res.data.error,
                    openmessage: true,
                    errorvalidusername: true,
                    errorvalidpassword: true,
                  })
                } else {
                  console.log(res)
                  this.props.history.push("/api/login")
                }
                
              })
      }

     
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
            errorvalidusername: false,
            [key]: event.target.value 
          })
        } else {
          this.setState({
            errorusername: false,
            errorvalidusername: false,
            [key]: event.target.value 
          })
        }
      }
    handlePassword = key => event =>{
        if(event.target.value.length === 0){
          this.setState({
            errorpassword: true,
            errorvalidpassword: false,
            [key]: event.target.value 
          })
        } else {
          this.setState({
            errorpassword: false,
            errorvalidpassword: false,
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
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.openmessage}
          autoHideDuration={5000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant="error"
          message={this.state.errormessage}
        />
        </Snackbar>

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
                  label={this.state.errorfname? 'Enter First Name': 'First Name'}
                  
                  error={this.state.errorfname}
                  onChange={this.handleFname('fname')}
                  onBlur={this.handleFname('fname')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{margin:'1%'}}
                  variant="outlined"
                  required
                  fullWidth
                  id="lname"
                  label={this.state.errorlname? 'Enter Last Name':'Last Name'}
                  name="lname"
                  autoComplete="lname"
                  error={this.state.errorlname}
                  onChange={this.handleLname('lname')}
                  onBlur={this.handleLname('lname')}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center"  alignItems="center"  >
            <TextField
                id="standard-name"
                label={this.state.errorusername? 'Enter Username':'Username'}
                margin="normal"
                variant="outlined"
                fullWidth 
                required={this.state.required}
                error={this.state.errorusername||this.state.errorvalidusername}
                value={this.state.username}
                onChange={this.handleUsername('username')}
                onBlur={this.handleUsername('username')}
            />
            <FormHelperText
                className={classes.textHelper}
                style={{display: this.state.errorvalidusername ? 'block': 'none'}}
            >Username is already exist</FormHelperText>
            </Grid>

            <Grid container direction="row" justify="center"  alignItems="center"  >
            <TextField
                id="standard-password-input"
                label={this.state.errorpassword? 'Enter Password':'Password'}
                type="password"
                margin="normal"
                variant="outlined"
                fullWidth 
                required={this.state.required}
                error={this.state.errorpassword||this.state.errorvalidpassword}
                value={this.state.password}
                onChange={this.handlePassword('password')}
                onBlur={this.handlePassword('password')}
            />
            <FormHelperText
                className={classes.textHelper}
                style={{display: this.state.errorvalidpassword ? 'block': 'none'}}
            >Password is already exist</FormHelperText>
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