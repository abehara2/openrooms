import axios from "axios";

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:4000/api";

export const getUserByID = User_ID => {
    const requestString = `${BASE_URL}/users/${User_ID}`;
    return axios
      .get(requestString, {
        headers: {
          "Content-Type": "application/JSON"
        }
      }).catch(error => {
        return ({
          type: "GET_MODEL_ID_FAIL",
          error
        });
      });
  };

  export const getCoursesForUser =  id => {
    const requestString = `${BASE_URL}/users/${id}/courses`;
    return axios
      .get(requestString, {
        headers: {
          "Content-Type": "application/JSON"
        }
      }).catch(error => {
        return ({
          type: "GET_MODEL_ID_FAIL",
          error
        });
      });
  };

  export const getCourseByID =  id => {
    const requestString = `${BASE_URL}/courses/${id}`;
    return axios
      .get(requestString, {
        headers: {
          "Content-Type": "application/JSON"
        }
      }).catch(error => {
        return ({
          type: "GET_MODEL_ID_FAIL",
          error
        });
      });
  };

  export const getAllCourses = () => {
    const requestString = `${BASE_URL}/courses`;
    return axios
    .get(requestString, {
        headers: {
          "Content-Type": "application/JSON"
        }
      }).catch(error => {
        return ({
          type: "GET_COURSES_FAIL",
          error
        });
      });
  };