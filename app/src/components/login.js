import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles={
    title:{
      fontSize: '28px',
      fontWeight: '550',
      margin: '0 auto'
    },
    containerTitle: {
      marginTop: '15%',
      width: '20%',  
      padding: '20px',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
    },
    textHelper:{
      color: 'red',
      marginTop:'-1%',
    },
    btnSubmit:{        
      textTransform: 'capitalize',
      backgroundColor: '#094EB5',
      fontWeight: 'bold',
      color: 'white',
      fontSize: '18px',
      marginTop: '3%',
      marginBottom: '3%',
      '&:hover': {
          backgroundColor: 'darkblue',
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
      width: '25%', margin: '10px auto'
    }
  }

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      errorusername: false,
      errorpassword: false,
      viewlogin: true,
      viewcreate: false,
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleBtnLogIn = this.handleBtnLogIn.bind(this);
    this.handleBtnCreate = this.handleBtnCreate.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  handleSignup(viewloginvalue,viewcreatevalue){
    this.setState({
      viewlogin: viewloginvalue,
      viewcreate: viewcreatevalue,
    })
  }
  handleBtnCreate(){
    this.setState({
      viewlogin: false,
      viewcreate: true,
    })
  }
  handleBtnLogIn(){
    this.setState({
      viewlogin: true,
      viewcreate: false,
    })
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
        <Paper className={classes.containerTitle}
        >
            <Grid container justify="center" alignItems="center"  >
                <img alt="" className={classes.img} src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png"/>
            </Grid>
            <Grid container justify="center" alignItems="center"  >
                <Typography variant="h1" className={classes.title} >Address Book Application</Typography>
            </Grid>

            <Grid container direction="row" justify="center"  alignItems="center"  >
            <TextField
                id="standard-name"
                label="Username"
                margin="normal"
                fullWidth required
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
                fullWidth required
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
                onClick={this.handleBtnLogIn}
                >
                Log In
                </Button>
            </Grid>
          
            <Grid container direction="row" justify="center"  alignItems="center"  >
            <Link to={'./api/registration'} >
            <Typography variant="body2" className={classes.btnCreateAcc}>Don't have an account? Sign Up</Typography>
            
            </Link>
            </Grid>
        </Paper>
        </Grid>
        </React.Fragment>
        )
    }

}
export default withStyles(styles)(Login);