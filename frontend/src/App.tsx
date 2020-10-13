import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { RegisterCont } from './pages/register/registercont';
import { NisitFeed } from './pages/feed/nisitfeed';
import { OrgFeed } from './pages/feed/orgfeed';
const App = () => {
  return(
      <div>
      <Route exact path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/registercont" component={RegisterCont} />
      <Route path="/nisitfeed" component={NisitFeed} />
      <Route path="/orgfeed" component={OrgFeed} />
      </div>
  );
};

export default App;
