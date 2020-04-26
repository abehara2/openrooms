import React, { useState, useEffect } from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Card, Grid, Input, Button, GridColumn } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";
import {compose} from "recompose";
import {getUserByID, getCoursesForUser, getCourseByID} from "./apiWrapper.js";
import Room from "./Room.js";

function Profile() { 
    // STATE VARIABLES
    const [courses, setCourses] = useState([]);
    const [activeRooms, setActiveRooms] = useState([]);
    
    // USE EFFECTS
    useEffect(() => {
        async function getCourses() {
            let tempCourses = await getCoursesForUser("5ea415a068eace209a632c3b");
            let arraycourses = [];
            for (let course_id of tempCourses.data.data) {
                let courseObj = await getCourseByID(course_id);
                arraycourses.push(courseObj.data.data);
                console.log(courseObj.data.data);
            }
            setCourses(arraycourses);
        }
        getCourses();
    },[]);

    //GET COURSES FOR SPECIFIC USER
    


    
    
    
    return (
        <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "1%"}}>
            <h1  style={{fontSize: "3.5rem", marginBottom: "5%"}}>
                <strong>open:Rooms</strong>
            </h1>
            <Grid>
                <GridColumn width={4}>
                <Card style={{ width: "100%" ,borderRadius: "25px", boxShadow: "2.5px 2.5px 10px 10px #ECECEC", borderWidth: "0px", paddingTop: "5%", paddingBottom: "2.5%", paddingLeft: "5%", paddingRight: "5%"}}>
                    <Card.Content>
                    <div style={{fontSize: "2.5rem", marginBottom: "5%",  marginTop: "5%"}}>
                        <strong> Ashank Behara </strong>
                    </div>
                    <div style={{fontSize: "1.5rem", marginBottom: "3%"}}>abehara2@illinois.edu</div>
                    <div style={{fontSize: "1.5rem", marginBottom: "7%"}}>University of Illinois</div>
                    </Card.Content>
                </Card>
                </GridColumn>
                {/* CLASSES DIV */}
                    <GridColumn width={7}>
                    {(courses && courses[0]) && 
                        courses.map(course => (
                    <Card style={{ background: "#0275D8", color: " white",width: "100%" ,borderRadius: "25px", boxShadow: "2.5px 2.5px 10px 10px #ECECEC", borderWidth: "0px", paddingTop: "2.5%", paddingBottom: "2.5%", paddingLeft: "5%", paddingRight: "5%"}}>
                        <Card.Content>
                            <Grid>
                                <GridColumn width={10}>
                                    <div style={{fontSize:"2rem", marginBottom: "5%"}}>
                                        <strong>{course.name}</strong>
                                    </div>
                                    <div style={{fontSize:"1.5rem"}}>
                                        {course.subject + " " + course.number}
                                    </div>  
                                </GridColumn>
                                <GridColumn justify="center" align="middle" width={6}>
                                    <Button style={{background: "white", height: "50px",width: "150px",  
                                                    borderRadius: "10px", color: "#0275D8",
                                                    marginLeft: "auto", marginRight:"auto"}}
                                            onClick={setActiveRooms(
                                                course.rooms
                                                )}>
                                        <h3>View Rooms</h3>
                                    </Button>
                                </GridColumn>
                            </Grid>
                        </Card.Content>
                    </Card>
                    ))}
                    </GridColumn>
                
                {/* ROOMS */}
                <GridColumn width={5}>
                {(activeRooms && activeRooms[0]) && 
                        activeRooms.map(room => (
                            <Room props={room}/>
                        ))}
                </GridColumn>
            </Grid>
        </div>
    );
} export default compose(withRouter)(Profile);