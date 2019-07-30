
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Signup from './components/signup'
import Login from './components/login'


class App extends React.Component {

  render(){
    const App = ()=>(
      <div>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/api/registration' component={Signup}/>
          <Route path='/api/login' component={Login}/>
        </Switch>
      </div>
    )

  return (
    <Switch>
      <App />
    </Switch>
  )
}
}

export default App;