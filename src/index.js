import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Login from './components/login/Login';
import Welcome from './components/welcome/Welcome';
import CompanyInfo from './components/Company/CompanyInfo';
import {HashRouter,Route} from 'react-router-dom';
import Switch from 'react-bootstrap/esm/Switch';
//import {createBrowserHistory} from 'history';
//let history = createBrowserHistory();
ReactDOM.render(
    <HashRouter>
    <Route exact path="/" component={Login}>
     
    </Route>

    <Route path="/app" component={Welcome}  />
    
    </HashRouter>
 ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
