import axios from "axios";

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:4000/api";

export const getUserByID = User_ID => {
    const requestString = `${BASE_URL}/users/${User_ID}`;
    return axios
      .get(requestString, {
        headers: {
          "Content-Type": "application/JSON"
        }
      })
    //   .catch(error => {
    //     ({
    //       type: "GET_USER_BY_ID_FAIL",
    //       error
    //     });
    //   });
  };