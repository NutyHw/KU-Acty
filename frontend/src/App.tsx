import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/login/login'
import { Register } from './components/register/register';
import { RegisterCont } from './components/register/registercont'
import { NisitFeed } from './components/feed/nisitfeed'
import { OrgFeed } from './components/feed/orgfeed';
import { CreateEvent } from './components/createevent/createevent'
import { OrgEventDetail } from './components/eventdetail/eventdetail.org'
import { NisitEventDetail } from './components/eventdetail/eventdetail.nisit'

export const App = () => {
  return(
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/registercont/:id" component={RegisterCont}/>
      <Route path="/nisit/home" component={NisitFeed} />
      <Route path="/org/home" component={OrgFeed} />
      <Route path="/org/createevent" component={CreateEvent}/>
      <Route path="/org/eventdetail" component={OrgEventDetail}/>
      <Route path="/nisit/eventdetail" component={NisitEventDetail}/>
      <Redirect to="/login" />
    </Switch>
  );
};

export default App;
