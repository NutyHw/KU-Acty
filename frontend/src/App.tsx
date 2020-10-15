import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './pages/login/login'
import { Register } from './pages/register/register';
import { RegisterCont } from './pages/register/registercont'
import { NisitFeed } from './pages/feed/nisitfeed'
import { OrgFeed } from './pages/feed/orgfeed';
import { CreateEvent } from './pages/createevent/createevent'
import { OrgEventDetail } from './pages/eventdetail/eventdetail.org'
import { NisitEventDetail } from './pages/eventdetail/eventdetail.nisit'
import history from './util/history';

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
    </Switch>
  );
};

export default App;
