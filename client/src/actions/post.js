import axios from "axios";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "../actions/types";
import { toast } from "react-toastify";

//GET POSTS
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.data },
    });
  }
};

//LIKE A POST
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/like/${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.data },
    });
  }
};

//REMOVE A LIKE
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/posts/unlike/${postId}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.data },
    });
  }
};
