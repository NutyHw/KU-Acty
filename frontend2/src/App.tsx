import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register'

const App = () => {
    return(
        <div>
        <Route exact path="/" component={Login} />
        <Route path="/reg" component={Register} />
        </div>
    );
};

export default App;

