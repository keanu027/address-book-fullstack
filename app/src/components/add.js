import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  title: {
    backgroundColor: '#55D134',
    color: 'white',
    flexGrow: 1,
    '@media (max-width:320px)':{
      textAlign:'center',
      fontSize: '18px',
    }
  },
  menuButton: {
    marginRight: theme.spacing(),
  },
  textField:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
 
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [userId, setUserId] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [fname, setFname] = React.useState('');
  const [lname, setLname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [postal_code, setPostal] = React.useState('');
  const [city, setCity] = React.useState('');
  const [province, setProvince] = React.useState('');
  const [country, setCountry] = React.useState('');

  const [home_phone, setHomePhone] = React.useState('');
  const [mobile_phone, setMobilePhone] = React.useState('');
  const [work_phone, setWorkPhone] = React.useState('');

  const [errorfname, setErrorFname] = React.useState(false);
  const [errorlname, setErrorLname] = React.useState(false);
  const [erroremail, setErrorEmail] = React.useState(false);
  const [errorpostal, setErrorPostal] = React.useState(false);
  const [errorcity, setErrorCity] = React.useState(false);
  const [errorprovince, setErrorProvince] = React.useState(false);
  const [errorcountry, setErrorCountry] = React.useState(false);

  const [errorhome_phone, setErrorHomePhone] = React.useState(false);
  const [errormobile_phone, setErrorMobilePhone] = React.useState(false);
  const [errorwork_phone, setErrorWorkPhone] = React.useState(false);

  useEffect(()=>{
    if(localStorage.getItem('usernameId')){
      setUserId(localStorage.getItem('usernameId'))
    }
  })

  function handleClose() {
    props.close(false);
  } 
  function   handleCreate() {
   if(fname.length === 0 || lname.length === 0 || email.length === 0 || postal_code.length === 0 || city.length === 0 || province.length === 0 ||
    country.length === 0 || home_phone.length === 0 || mobile_phone.length === 0 || work_phone.length === 0 ){
      if(fname.length === 0){
        setErrorFname(true)
      } if(lname.length === 0){
        setErrorLname(true)
      } if(email.length === 0){
        setErrorEmail(true)
      } if(postal_code.length === 0){
        setErrorPostal(true)
      } if(city.length === 0){
        setErrorCity(true)
      } if(province.length === 0){
        setErrorProvince(true)
      } if(country.length === 0){
        setErrorCountry(true)
      } if(home_phone.length === 0){
        setErrorHomePhone(true)
      } if(mobile_phone.length === 0){
        setErrorMobilePhone(true)
      } if(work_phone.length === 0){
        setErrorWorkPhone(true)
      }

   } else {
          axios.post('http://localhost:3001/home',{
            userId,fname,lname,email,postal_code,city,
            province,country, home_phone, mobile_phone, work_phone
          }).then(res =>{
            //window.location.reload();
            //console.log(res)
            props.update(res);
            props.close(false); 
          })
   }
  }
  
  function handleLname(data){
    if(data.length === 0){
      setErrorLname(true)
      setLname('')
    } else{
      setErrorLname(false)
      setLname(data)
    }
  }
  function handleFname(data){
    if(data.length === 0){
      setErrorFname(true)
      setFname('')
    } else{
      setErrorFname(false)
      setFname(data)
    }
  }
  function handleEmail(data){
    if(data.length === 0){
      setErrorEmail(true)
      setEmail('')
    } else{
      setErrorEmail(false)
      setEmail(data)
    }
  }
  function handlePostalCode(data){
    if(data.length === 0){
      setErrorPostal(true)
      setPostal('')
    } else{
      setErrorPostal(false)
      setPostal(data)
    }
  }
  function handleCity(data){
    if(data.length === 0){
      setErrorCity(true)
      setCity('')
    } else{
      setErrorCity(false)
      setCity(data)
    }
  }
  function handleProvince(data){
    if(data.length === 0){
      setErrorProvince(true)
      setProvince('')
    } else{
      setErrorProvince(false)
      setProvince(data)
    }
  }
  function handleCountry(data){
    if(data.length === 0){
      setErrorCountry(true)
      setCountry('')
    } else{
      setErrorCountry(false)
      setCountry(data)
    }
  }
  function handleHome(data){
    if(data.length === 0){
      setErrorHomePhone(true)
      setHomePhone('')
    } else{
      setErrorHomePhone(false)
      setHomePhone(data)
    }
  }
  function handleMobile(data){
    if(data.length === 0){
      setErrorMobilePhone(true)
      setMobilePhone('')
    } else{
      setErrorMobilePhone(false)
      setMobilePhone(data)
    }
  }
  function handleWork(data){
    if(data.length === 0){
      setErrorWorkPhone(true)
      setWorkPhone('')
    } else{
      setErrorWorkPhone(false)
      setWorkPhone(data)
    }
  }



  return (
      <React.Fragment>
        <DialogTitle id="form-dialog-title"  className={classes.title} >
        <Box fontWeight="fontWeightBold" className={classes.title}>
            Add New Contacts
        </Box>
       </DialogTitle>
        <DialogContent dividers>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        > 
              <TextField
                className={classes.textField}
                variant="outlined"
                autoComplete="fname"
                margin="dense"
                id="fname"
                name="fname"
                label={errorfname? 'Enter First Name': 'First Name'}
                type="text"
                fullWidth
                required
                value={fname}
                error={errorfname}
                onChange={e =>handleFname(e.target.value)}
                onBlur={e =>handleFname(e.target.value) }
              />

              <TextField
                className={classes.textField}
                variant="outlined"
                autoComplete="lname"
                margin="dense"
                id="lname"
                name="lname"
                label={errorlname? 'Enter Last Name': 'Last Name'}
                type="text"
                fullWidth
                required
                value={lname}
                error={errorlname}
                onChange={e => handleLname(e.target.value)}
                onBlur={e => handleLname(e.target.value)}
              />

              <TextField
                className={classes.textField}
                variant="outlined"
                autoComplete="email"
                margin="dense"
                id="email"
                name="email"
                label={erroremail? 'Enter Email Address': 'Email Address'}
                type="email"
                fullWidth
                required
                value={email}
                error={erroremail}
                onChange={e =>handleEmail(e.target.value)}
                onBlur={e =>handleEmail(e.target.value) }
              />

              <TextField
                className={classes.textField}
                variant="outlined"
                autoComplete="postalcode"
                margin="dense"
                id="postalcode"
                name="postalcode"
                label={errorpostal? 'Enter Postal Code': 'Postal Code'}
                type="number"
                required
                value={postal_code}
                error={errorpostal}
                onChange={e =>handlePostalCode(e.target.value)}
                onBlur={e =>handlePostalCode(e.target.value) }
              />
              
              <TextField
                className={classes.textField}
                variant="outlined"
                autoComplete="city"
                margin="dense"
                id="city"
                name="city"
                label={errorcity? 'Enter City': 'City'}
                type="text"
                required
                value={city}
                error={errorcity}
                onChange={e =>handleCity(e.target.value)}
                onBlur={e =>handleCity(e.target.value) }
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                autoComplete="province"
                margin="dense"
                id="province"
                name="province"
                label={errorprovince? 'Enter Province': 'Province'}
                type="text"
                required
                value={province}
                error={errorprovince}
                onChange={e =>handleProvince(e.target.value)}
                onBlur={e =>handleProvince(e.target.value) }
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                autoComplete="country"
                margin="dense"
                id="country"
                name="country"
                label={errorcountry? 'Enter Country': 'Country'}
                type="text"
                required
                value={country}
                error={errorcountry}
                onChange={e =>handleCountry(e.target.value)}
                onBlur={e =>handleCountry(e.target.value) }
              />


              <TextField
                className={classes.textField}
                variant="outlined"
                autoComplete="home_phone"
                margin="dense"
                id="home_phone"
                name="home_phone"
                label={errorhome_phone? 'Enter Home Phone': 'Home Phone'}
                type="text"
                fullWidth
                required
                value={home_phone}
                error={errorhome_phone}
                onChange={e =>handleHome(e.target.value)}
                onBlur={e =>handleHome(e.target.value) }
                inputProps={{ maxLength: 11 }}
              />

              <TextField
                className={classes.textField}
                variant="outlined"
                autoComplete="mobile_phone"
                margin="dense"
                id="mobile_phone"
                name="mobile_phone"
                label={errormobile_phone? 'Enter Mobile Phone': 'Mobile Phone'}
                type="text"
                fullWidth
                required
                value={mobile_phone}
                error={errormobile_phone}
                onChange={e =>handleMobile(e.target.value)}
                onBlur={e =>handleMobile(e.target.value) }
                inputProps={{ maxLength: 11 }}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                autoComplete="work_phone"
                margin="dense"
                id="work_phone"
                name="work_phone"
                label={errorwork_phone? 'Enter Work Phone': 'Work Phone'}
                type="text"
                fullWidth
                required
                value={work_phone}
                error={errorwork_phone}
                onChange={e =>handleWork(e.target.value)}
                onBlur={e =>handleWork(e.target.value) }
                inputProps={{ maxLength: 11 }}
              />
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Submit
          </Button>
        </DialogActions>
      </React.Fragment>
  );
}