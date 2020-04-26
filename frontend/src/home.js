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
import Image from "./snap.png"

 function home() {
  
return(
      <Grid style = {{marginLeft:"5%", marginRight:"5%", marginTop:"2.5%"}}>
        <Grid.Row style = {{marginBottom:"2.5%"}}>
            <Grid.Column width = {12} style = {{fontSize:"3rem"}}>
                <strong>openrooms</strong>
            </Grid.Column>
            <Grid.Column width = {2}>
                <Button style = {{width:"100%", color:"white",background:"#0275D8",borderRadius:"15px",fontSize:"1.25rem"}}>
                    login
                </Button>
            </Grid.Column>
            <Grid.Column width = {2}>
                <Link to="/register">
                    <Button style = {{width:"100%", color:"white",background:"#0275D8",borderRadius:"15px",fontSize:"1.25rem"}}>
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
        
        <Grid.Row style = {{marginTop:"2%",}}>
            <img src={Image} style={{maxWidth:"50%", marginLeft:"auto",marginTop:"2.5%",marginRight:"auto",boxShadow:"10px 10px 50px 0px black"}}></img>
        </Grid.Row>
        <Grid.Row style = {{marginTop:"4%",}}>
            <div style = {{marginLeft:"auto", marginRight:"auto", marginTop:"0%", fontSize:"2rem"}}>
            Friends, managers, and teachers, only when you need them ;)
            </div>
        </Grid.Row>
      </Grid>
 
);

}
export default compose(withRouter)(home);

