import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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
      fontWeight: '550',
      margin: '0 auto',
      color: 'white,',
      '@media (max-width:425px)':{
        color:'white',
        fontSize: '23px',
        fontWeight: '550',
      },
      '@media (min-width:425px ) and (max-width: 1024px)':{
        color:'white',
        fontSize: '25px',
        fontWeight: '550',
      }
    },
    containerTitle: {
      marginTop: '15%',
      width: '20%',  
      padding: '20px',
      backgroundColor: '#AAD1E2',// 63A8C7
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
      '@media (max-width:425px)':{
        width: '100%',
        margin: '0 auto',
        height: '640px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0)',
      },
      '@media (min-width:426px ) and (max-width: 1024px)':{
        width: '100%',
        margin: '0 auto',
        height: '1366px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0)',

      }
    },
    container:{
      '@media (max-width:425px)':{
        margin: '25% auto',
      },
      '@media (min-width:426px ) and (max-width: 768px)':{
        margin: '25% auto',

      }
    },
    textHelper:{
      color: 'red',
      marginTop:'-1%',
    },
    btnSubmit:{        
      textTransform: 'capitalize',
      backgroundColor: '#4C69BA',//#094EB5
      fontWeight: 'bold',
      color: 'white',
      fontSize: '18px',
      marginTop: '3%',
      marginBottom: '3%',
      '&:hover': {
          backgroundColor: '#5B7BD5',//#5B7BD5
          color: 'white',
      },
    },
    btnCreateAcc:{
      textTransform: 'capitalize',
      margin: '30px auto',
      fontSize: '16px',
      textDecoration: 'none'
    },
    img:{
      width: '25%', margin: '10px auto',
      '@media (max-width:425px)':{
        width: '30%'
      },
      '@media (min-width:426px ) and (max-width: 768px)':{
        width: '30%'

      }
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

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      token: [],
      errormessage: '',
      errorusername: false,
      errorpassword: false,
      errorvalidusername: false,
      errorvalidpassword: false,
      openmessage: false,
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleBtnLogIn = this.handleBtnLogIn.bind(this);
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

  handleBtnLogIn(){
    if(this.state.username.length === 0 || this.state.password.length === 0){
      if(this.state.username.length === 0 && this.state.password.length !== 0){
        this.setState({
          errorusername: true
        })
      } else if(this.state.password.length === 0 && this.state.username.length !== 0){
        this.setState({
          errorpassword: true
        })
      } else{
        this.setState({
          errorusername: true,
          errorpassword: true
        })
      }
    } else {
        axios.post('http://localhost:3001/api/login',{
          username: this.state.username,
          password: this.state.password
        }).then(res =>{
          if(res.data.error === "Invalid username" || res.data.error === "Incorrect password"  ){
            console.log(res.data.error)
            if(res.data.error === "Invalid username" && res.data.error !== "Incorrect password"  ){
              this.setState({
                errormessage: res.data.error,
                openmessage: true,
                errorvalidusername: true,
                errorvalidpassword: true,
              })

            } else {
              this.setState({
                errormessage: res.data.error,
                openmessage: true,
                errorvalidusername: false,
                errorvalidpassword: true,
              })

            }

          } else {
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('username',res.data.username)
            localStorage.setItem('usernameId',res.data.id)
            //console.log(res.data.username)
            this.props.history.push('/home')

          }

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
        <Paper className={classes.containerTitle}
        >
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
        <Grid className={classes.container}>
            <Grid container justify="center" alignItems="center"  >
                <img alt="" className={classes.img} src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png"/>
            </Grid>
            <Grid container justify="center" alignItems="center"  >
                <Typography variant="h1" className={classes.title} >Address Book Application</Typography>
            </Grid>

            <Grid container direction="row" justify="center"  alignItems="center"  >
            <TextField
                id="standard-name"
                label={this.state.errorusername? 'Enter Username': 'Username'}
                margin="normal"
                fullWidth required
                error={this.state.errorusername||this.state.errorvalidusername}
                value={this.state.username}
                onChange={this.handleUsername('username')}
                onBlur={this.handleUsername('username')}
            />
            <FormHelperText
                className={classes.textHelper}
                style={{display: this.state.errorvalidusername ? 'block': 'none'}}
            >Incorrect Username</FormHelperText>
            </Grid>

            <Grid container direction="row" justify="center"  alignItems="center"  >
            <TextField
                id="standard-password-input"
                label={this.state.errorpassword? 'Enter Password': 'Password'}
                type="password"
                margin="normal"
                fullWidth required
                error={this.state.errorpassword||this.state.errorvalidpassword}
                value={this.state.password}
                onChange={this.handlePassword('password')}
                onBlur={this.handlePassword('password')}
            />
            <FormHelperText
                className={classes.textHelper}
                style={{display: this.state.errorvalidpassword ? 'block': 'none'}}
            >Incorrect Password</FormHelperText>
            </Grid>
            <Grid container direction="row" justify="center"  alignItems="center"  >
                <Button variant="contained" fullWidth className={classes.btnSubmit}
                onClick={this.handleBtnLogIn}
                >
                Log In
                </Button>
            </Grid>
          
            <Grid container direction="row" justify="center"  alignItems="center"  >
            <Link to={'/api/registration'} >
            <Typography variant="body2" className={classes.btnCreateAcc}>Don't have an account? Sign Up</Typography>
            
            </Link>
            </Grid>
          </Grid>
        </Paper>
        </Grid>
        </React.Fragment>
        )
    }

}
export default withStyles(styles)(Login);