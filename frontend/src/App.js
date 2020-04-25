import React, { useState } from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Card, Grid, Input, Button } from 'semantic-ui-react';
import colleges from "./colleges.js"
import Select from "react-select";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from "./Register.js";
import Profile from "./Profile.js";

export default function App() {
  
return(
  <Router>
    <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            
          </Switch>
  </Router>
);

}

