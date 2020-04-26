import React, { useState } from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Card, Grid, Input, Button } from 'semantic-ui-react';
import colleges from "./colleges.js"
import Select from "react-select";
import { withRouter } from "react-router-dom";
import {compose, setDisplayName} from "recompose";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from "./Register.js";
import Profile from "./Profile.js";
import VideoTest from "./videotest.js";

 function home() {
  
return(
      <Grid style = {{marginLeft:"5%", marginRight:"5%", marginTop:"2.5%"}}>
        <Grid.Row style = {{marginBottom:"2.5%"}}>
            <Grid.Column width = {12} style = {{fontSize:"3rem"}}>
                <strong>openrooms</strong>
            </Grid.Column>
            <Grid.Column width = {2}>
                <Button style = {{width:"75%", color:"white",background:"#0275D8",borderRadius:"10px"}}>
                    login
                </Button>
            </Grid.Column>
            <Grid.Column width = {2}>
                <Link to="/register">
                    <Button style = {{width:"75%", color:"white",background:"#0275D8", borderRadius:"10px"}}>
                        signup
                    </Button>
                </Link>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row >
            <div style = {{marginLeft:"auto", marginRight:"auto", fontSize:"4rem"}}>
            office hours, meetings, and conferences
            </div>
        </Grid.Row>
        <Grid.Row style = {{marginTop:"2%"}}>
            <div style = {{marginLeft:"auto", marginRight:"auto", fontSize:"4rem"}}>
            <strong>reimagined.</strong>
            </div>
        </Grid.Row>
        <Grid.Row style = {{marginTop:"2%"}}>
            <img src="./snap.png"></img>
        </Grid.Row>
      </Grid>
 
);

}
export default compose(withRouter)(home);

