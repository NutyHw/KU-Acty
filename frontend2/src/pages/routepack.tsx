import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Register } from './register/register'

const Home = () => <h1>Home</h1>
const About = () => <h1>About</h1>
const Post = () => <h1>Post</h1>
const Project = () => <h1>Project</h1>

const Routepack = () => {
    return (
      <div> 
        <Route path="/reg" component={Register} />
      </div>
    );
};
export default Routepack