import React, { useState, useEffect } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import {
  Card,
  Grid,
  Input,
  Button,
  GridColumn,
  Modal,
  Header
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { compose, setDisplayName } from "recompose";
import {
  getCoursesForUser,
  getCourseByID,
  addCourseToUser,
  deleteCourseFromUser
} from "./apiWrapper.js";
import { getAllCourses } from "./apiWrapper.js";
import Room from "./Room.js";
import Select from "react-select";

function Profile() {
  // STATE VARIABLES
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([]);
  const [activeRooms, setActiveRooms] = useState([]);
  const [coursesToAdd, setAddCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCourseObj, setSelectedCourseObj] = useState({});
  const [addButton, setAddButton] = useState(true);
  const [todeleteCourse, setDelete] = useState("");

  const user = "5ea415a068eace209a632c3b";

  // USE EFFECTS
  useEffect(() => {
    getCourses();
    const getOptions = async () => {
      let newCourses = await getAllCourses();
      let data = newCourses.data.data;
      let options = [];
      for (let course of data) {
        let jsonObj = {
          label: course.subject + " " + course.number,
          value: course._id
        };
        options.push(jsonObj);
      }
      setAddCourses(options);
    };
    getOptions();
  }, []);

  const getCourses = async () => {
    let tempCourses = await getCoursesForUser(user);
    let arraycourses = [];
    for (let course_id of tempCourses.data.data) {
      let courseObj = await getCourseByID(course_id);
      if (courseObj) {
        arraycourses.push(courseObj.data.data);
      }
    }
    setCourses(arraycourses);
  };

  useEffect(() => {
    const getSelectedCourse = async () => {
      const courseResp = await getCourseByID(selectedCourse);
      setSelectedCourseObj(courseResp.data.data);
    };
    getSelectedCourse();
  }, [selectedCourseObj]);

  const addCourse = async () => {
    const resp = await addCourseToUser(user, selectedCourse);
    if (resp.status === 200) {
      setAddButton(false);
    }
    await getCourses();
  };

  const deleteCourse = async () => {
    console.log("ur mom");
    console.log(todeleteCourse);
    const resp = await deleteCourseFromUser(user, todeleteCourse);
      
      console.log(resp);
      if (resp.status === 200) {
        setDelete("");
      }
      await getCourses();
      
  }

  const renderModal = () => (
    <Modal
      trigger={
        <Button
          style={{
            boxShadow: "2.5px 2.5px 5px 5px #ECECEC",
            height: "50px",
            width: "150px",
            borderRadius: "10px",
            color: "#0275D8",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "25px",
            background: "white"
          }}
          onClick={() => setSelectedCourse("")}
        >
          + Add Courses
        </Button>
      }
      closeIcon
    >
      <Modal.Content>
        <Modal.Description>
          <Header>Add Courses</Header>
          <Select
            options={coursesToAdd}
            placeholder="Search for a course..."
            onChange={e => {
              setSelectedCourse(e.value);
              setAddButton(true);
            }}
          />
          {selectedCourse && (
            <Card
              style={{
                background: "#0275D8",
                color: " white",
                width: "100%",
                borderRadius: "25px",
                boxShadow: "2.5px 2.5px 10px 10px #ECECEC",
                borderWidth: "0px",
                paddingTop: "2.5%",
                paddingBottom: "2.5%",
                paddingLeft: "5%",
                paddingRight: "5%"
              }}
            >
              <Card.Content>
                <Grid>
                  <GridColumn width={10}>
                    <div style={{ fontSize: "2rem", marginBottom: "5%" }}>
                      <strong>{selectedCourseObj.name}</strong>
                    </div>
                    <div style={{ fontSize: "1.5rem" }}>
                      {selectedCourseObj.subject +
                        " " +
                        selectedCourseObj.number}
                    </div>
                  </GridColumn>
                  <GridColumn justify="center" align="middle" width={6}>
                    {addButton ? (
                      <Button
                        style={{
                          background: "white",
                          height: "50px",
                          width: "150px",
                          borderRadius: "10px",
                          color: "#0275D8",
                          marginLeft: "auto",
                          marginRight: "auto"
                        }}
                        onClick={addCourse}
                      >
                        <h3>Add</h3>
                      </Button>
                    ) : (
                      <Button
                        style={{
                          background: "white",
                          height: "50px",
                          width: "150px",
                          borderRadius: "10px",
                          color: "#0275D8",
                          marginLeft: "auto",
                          marginRight: "auto"
                        }}
                        onClick={addCourse}
                        disabled
                      >
                        <h3>Added</h3>
                      </Button>
                    )}
                  </GridColumn>
                </Grid>
              </Card.Content>
            </Card>
          )}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "1%" }}>
      <h1 style={{ fontSize: "3.5rem", marginBottom: "5%" }}>
        <strong>openrooms</strong>
        <hr />
      </h1>
      <Grid>
        <GridColumn width={4}>
          <Card
            style={{
              width: "100%",
              borderRadius: "25px",
              boxShadow: "2.5px 2.5px 10px 10px #ECECEC",
              borderWidth: "0px",
              paddingTop: "5%",
              paddingBottom: "2.5%",
              paddingLeft: "5%",
              paddingRight: "5%",
              marginTop: "22%"
            }}
          >
            <Card.Content>
              <div
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "7%",
                  marginTop: "5%"
                }}
              >
                <strong> Ashank Behara </strong>
              </div>
              <div style={{ fontSize: "1.5rem", marginBottom: "4%" }}>
                abehara2@illinois.edu
              </div>
              <div style={{ fontSize: "1.5rem", marginBottom: "7%" }}>
                University of Illinois
              </div>
            </Card.Content>
          </Card>
          {renderModal()}
        </GridColumn>

        {/* CLASSES DIV */}
        <GridColumn width={7}>
          <div
            justify="center"
            align="middle"
            style={{ fontSize: "2.5rem", marginBottom: "5%", marginTop: "5%" }}
          >
            <strong> My Courses </strong>
          </div>
          {courses &&
            courses[0] &&
            courses.map(course => (
              <Card
                style={{
                  background: "#0275D8",
                  color: " white",
                  width: "100%",
                  borderRadius: "25px",
                  boxShadow: "2.5px 2.5px 10px 10px #ECECEC",
                  borderWidth: "0px",
                  paddingTop: "2.5%",
                  paddingBottom: "2.5%",
                  paddingLeft: "5%",
                  paddingRight: "5%"
                }}
              >
                <Card.Content>
                  <Grid>
                  
                    <Grid.Column width={8}>
                      <div style={{ fontSize: "2rem", marginBottom: "5%" }}>
                        <strong>{course.name}</strong>
                      </div>
                      <div style={{ fontSize: "1.5rem" }}>
                        {course.subject + " " + course.number}
                      </div>
                    </Grid.Column>
                    <Grid.Column justify="center" align="middle" width={6}>
                      <Button
                        style={{
                          background: "white",
                          height: "50px",
                          width: "150px",
                          borderRadius: "10px",
                          color: "#0275D8",
                          marginLeft: "auto",
                          marginRight: "auto"
                        }}
                        onClick={() => {
                          setActiveRooms(course.rooms);
                          setName(
                            course.subject + " " + course.number + " Rooms"
                          );
                        }}
                      >
                          
                        <h3>View Rooms</h3>
                      </Button>
                    </Grid.Column>
                    <Grid.Column  width={2}>
                        <Grid.Column width={13}> </Grid.Column>
                        <Grid.Column justify="center" align="middle" width={3}>
                            <Button  onClick = {() => {setDelete(course._id); deleteCourse()}}
                            style={{marginTop: "12%",marginRight: "10%", 
                                width: "50px", height: "25px", background:
                                 "#0275D8", color:"white" }}>
                                     delete
                            </Button>
                        </Grid.Column>
                    </Grid.Column>
                  </Grid>
                </Card.Content>
              </Card>
            ))}
        </GridColumn>

        {/* ROOMS */}

        <GridColumn width={5}>
          <div
            justify="center"
            align="middle"
            style={{
              fontSize: "2.5rem",
              marginBottom: "5%",
              marginTop: "9.2%"
            }}
          >
            <strong> {name} </strong>
          </div>
          {activeRooms &&
            activeRooms[0] &&
            activeRooms.map(room => <Room props={room} />)}
        </GridColumn>
      </Grid>
    </div>
  );
}
export default compose(withRouter)(Profile);
