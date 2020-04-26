import React, { useState } from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Card, Grid, Input, Button } from 'semantic-ui-react';
import colleges from "./colleges.js"
import Select from "react-select";
import { withRouter } from "react-router-dom";
import {compose} from "recompose";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


function Register() {
  const [country, setCountry] = useState("");
return(
  <div style={{overflowY: "hidden"}}>
    <Grid.Row style={{fontFamily: "Avenir Next",marginLeft: "32.5%", marginRight: "32.5%", marginTop: "10%", marginBottom: "12.5%"}}>
    <h1 justify="center" align="middle" style={{fontSize: "3.5rem", marginBottom: "5%"}}>
            <strong>open:Rooms</strong>
          </h1>
      <Card style={{background: "#94b8d1", width: "100%" ,borderRadius: "25px", boxShadow: "2.5px 2.5px 10px 10px #ECECEC", borderWidth: "0px", paddingTop: "5%", paddingBottom: "2.5%", paddingLeft: "5%", paddingRight: "5%"}}>
        <Card.Content >
          
          <Grid>
          {/* Email */}
          <Grid.Row>
            <Grid.Column align="right" width={6} style={{ color: "white" }}>
             <h3> <strong>email</strong></h3>
            </Grid.Column>
            <Grid.Column width={10}>
            <Input style={{width: "100%"}}/>
            </Grid.Column>
          </Grid.Row>
          {/* Email */}
          <Grid.Row>
            <Grid.Column align="right"width={6} style={{ color: "white"}}>
             <h3> <strong>password</strong></h3>
            </Grid.Column>
            <Grid.Column width={10}>
            <Input style={{width: "100%"}}/>
            </Grid.Column>
          </Grid.Row>
          {/* Email */}
          <Grid.Row>
            <Grid.Column align="right"width={6} style={{ color: "white"}}>
             <h3> <strong>confirm password</strong></h3>
            </Grid.Column>
            <Grid.Column width={10}>
            <Input style={{width: "100%"}}/>
            </Grid.Column>
          </Grid.Row>
          {/* Email */}
          <Grid.Row>
            <Grid.Column align="right"width={6} style={{ color: "white"}}>
             <h3> <strong>institution</strong></h3>
            </Grid.Column>
            <Grid.Column width={10}>
            <Select
              style={{width: "100%",  borderRadius: "25px"}}
              options={colleges}
              placeholder=""
              isClearable
              onChange={setCountry}
              value={country}
            />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row justify="center" align="middle">
            <Link justify="center" align="middle" to="/profile" style={{marginLeft: "auto", marginRight: "auto"}} >
              <Button style={{background: "#0275D8", height: "50px",width: "150px",  borderRadius: "10px", color: "white", marginLeft: "auto", marginRight:"auto"}}><h3>Sign Me Up!</h3></Button>
            </Link>
          </Grid.Row>
          </Grid>
          

        </Card.Content>
      </Card>
    </Grid.Row>
  </div>
);
} 
export default compose(withRouter)(Register);

