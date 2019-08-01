
import React from 'react';

class Redirect extends React.Component {

  componentDidMount(){
    if(!localStorage.getItem('token')){
      console.log(localStorage.getItem('token'))
      this.props.history.push('/api/login')
    } else {
      this.props.history.push('/home')
    }
  }

}
export default Redirect;