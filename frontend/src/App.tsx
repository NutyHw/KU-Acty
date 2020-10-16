import React from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/login/login'
import { Register } from './components/register/register';
import { RegisterCont } from './components/register/registercont'
import { NisitFeed } from './components/feed/nisitfeed'
import { OrgFeed } from './components/feed/orgfeed';
import { CreateEvent } from './components/createevent/createevent'
import { OrgEventDetail } from './components/eventdetail/eventdetail.org'
import { NisitEventDetail } from './components/eventdetail/eventdetail.nisit'
import { ChangePassword } from './components/password/changepassword'
import { ForgotPassword } from './components/password/forgotpassword';
import { NisitTranscript } from './components/activitytrans/transcript';
import { ResetPassword } from './components/password/resetpassword';
import { searchEvent } from './components/searchevent/searchevent';

const App = () => {
  return(
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/registercont/:id" component={RegisterCont}/>
      <Route path="/nisit/home" component={NisitFeed} />
      <Route path="/nisit/transcript" component={NisitTranscript}/>
      <Route path="/org/home" component={OrgFeed} />
      <Route path="/org/createevent" component={CreateEvent}/>
      <Route path="/org/eventdetail" component={OrgEventDetail}/>
      <Route path="/nisit/eventdetail" component={NisitEventDetail}/>
      <Route path="/org/changepassword" component={ChangePassword}/> 
      <Route path="/forgotpassword" component={ForgotPassword}/>
      <Route path="/resetpassword" component={ResetPassword}/>
      <Route path="/search" component={searchEvent}/>
      <Redirect to="/login" />
    </Switch>
  );
};

export default App;
