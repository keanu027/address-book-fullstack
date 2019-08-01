
import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import './App.css';
import Signup from './components/signup'
import Login from './components/login'
import Home from './components/home'

class App extends React.Component {
/* 
<Route exact path='/api/login'
                render={(props)=> <Login {...props} user={users} setUser={setusers}/>
                }
            />
<Route  path='/api/login' component={Login} user={this.state.accountuser}/>
*/
  render(){
    const App = ()=>(
      <div>
        <Switch>
          <Route  path='/home' component={Home} />
          <Route exact path='/' component={Home} />

          <Route path='/api/registration'
          render={ props=>  <Signup  {...props} /> }/>

          <Route path='/api/login'
          render={ props=>  <Login  {...props} /> } />
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