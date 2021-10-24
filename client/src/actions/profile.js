import axios from "axios";
import { toast } from "react-toastify";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

//Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.data },
    });
  }
};

// Create or update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    // history object maintains the history of state
    // Edit and create are in same function as they are quite similar
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        "http://localhost:5000/api/profile",
        formData,
        config
      );

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      if (edit) {
        toast.success("Profile Updated", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success("Profile Created", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      history.push("/dashboard");
    } catch (err) {
      console.log(err.response.data.error);
      const errors = err.response.data.error;
      if (errors) {
        errors.map((error) =>
          toast.error(error.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.data },
      });
    }
  };
