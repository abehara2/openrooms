
import React, { useState, useEffect } from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Card, Grid, Input, Button, GridColumn } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";
import {compose} from "recompose";
import {getUserByID, getCourseByName} from "./apiWrapper.js";

function Room(props) {
    const [hasUser, setCondition] = useState(false);
    const [user,setUser] = useState();
    const [courses, setCourses] = useState([]);
    const [parsed, setParsed] = useState(false);
    const [roomsParsed, setRoomParsed] = useState(false);
    let data = props;
    console.log(data);

    // useEffect(() => {
    //     getUser();
    //     parseCourses();
    // });
    // async function getUser() {
    //     if(!hasUser) {
    //         const userObj = await getUserByID("5ea415a068eace209a632c3b");
    //         setUser(userObj);
    //         console.log(user);
    //         setCondition(true);
    //     }
    // }
    // async function parseCourses() {
    //     if (hasUser && !parsed) {
    //         let coursenames = user.data.courses;
    //         if(typeof coursenames[0] === 'string') {
    //         for (let i = 0; i < coursenames.length; i++) {
    //              let split = coursenames[i].split(" ");
    //              let result = split[0] + "_" + split[1];
    //             coursenames[i] = await getCourseByName(result);
    //         }
    //         setCourses(coursenames);
    //         setParsed(true);
    //     }
            
    //     }
    // }
    
    
    return (
        <div>
            {(data.props && data.props[0]) && data.props.map(roomInfo =>(
            <Card style={{ background: "#F796FF", color: " white",width: "100%" ,
                            borderRadius: "25px", boxShadow: "2.5px 2.5px 10px 10px #ECECEC",
                             borderWidth: "0px", paddingTop: "2.5%", paddingBottom: "2.5%", paddingLeft: "5%",
                              paddingRight: "5%", marginBottom: "2.5%"}}>
                <Card.Content>
                    <Grid>
                        <GridColumn width={10}>
                            <div style={{fontSize:"1.5rem", marginTop: "2%", marginBottom: "2%"}}>
                                <strong>Capacity: </strong> 0/30
                            </div>  
                            <div style={{fontSize:"1.5rem"}}>
                                <strong>Course Staff: </strong> 0
                            </div>  
                            <div style={{fontSize:"0.75rem"}}>
                                <strong>Token: </strong> {roomInfo.token}
                            </div>  
                        </GridColumn>
                        <GridColumn justify="center" align="middle" width={6}>
                        <Button style={{background: "white", height: "50px",width: "100px",  borderRadius: "10px", color: "#F796FF", marginLeft: "auto", marginRight:"auto"}}><h3>Enter!</h3></Button>
                        </GridColumn>
                    </Grid>
                </Card.Content>
            </Card> ))}
        </div>
    );
} export default compose(withRouter)(Room);