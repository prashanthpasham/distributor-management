import React from 'react';

import './App.css';
import { Route, Link, Switch } from 'react-router-dom'; 
import Login from './components/login/Login';
import Welcome from './components/welcome/Welcome';
import CompanyInfo from './components/Company/CompanyInfo';
function App() {
  return (
    <div>
     <Switch> 
              <Route exact path='/' component={Login}></Route> 
              <Route exact path='/app' component={Welcome}>
               
             </Route> 
            </Switch> 
    </div>
  );
}

export default App;
