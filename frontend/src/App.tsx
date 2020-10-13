import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import { Login } from './pages/login/login'
import { Register } from './pages/register/register';
import { RegisterCont } from './pages/register/registercont'
import { NisitFeed } from './pages/feed/nisitfeed'
import { OrgFeed } from './pages/feed/orgfeed';
import { CreateEvent } from './pages/createevent/createevent'
import { OrgEventDetail } from './pages/eventdetail/eventdetail.org'
import { NisitEventDetail } from './pages/eventdetail/eventdetail.nisit'
const App = () => {
  return(
      <div>
      <Route exact path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/registercont" component={RegisterCont} />
      <Route path="/nisit/home" component={NisitFeed} />
      <Route path="/org/home" component={OrgFeed} />
      <Route path="/org/createevent" component={CreateEvent}/>
      <Route path="/org/eventdetail" component={OrgEventDetail}/>
      <Route path="/nisit/eventdetail" component={NisitEventDetail}/>
      </div>
  );
};

export default App;
