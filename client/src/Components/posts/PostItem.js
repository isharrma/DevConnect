import react, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import {
  AiFillLike,
  AiOutlineComment,
  AiFillDislike,
  AiFillDelete,
} from "react-icons/ai";

import { addLike, removeLike } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  auth,
  post: { _id, text, username, avatar, user, likes, comments, date },
}) => {
  return (
    <div class="posts">
      <div class="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img class="round-img" src={avatar} alt="" />
            <h4>{username}</h4>
          </a>
        </div>
        <div>
          <p class="my-1">{text}</p>
          <p class="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          <button
            type="button"
            class="btn btn-light"
            onClick={(e) => addLike(_id)}
          >
            <AiFillLike /> <span>{likes.length}</span>
          </button>
          <button
            type="button"
            class="btn btn-light"
            onClick={(e) => removeLike(_id)}
          >
            <AiFillDislike />{" "}
          </button>
          <Link to={`/post/${_id}`} class="btn btn-primary">
            <AiOutlineComment />
            <span class="comment-count">{comments.length}</span>
          </Link>
          {!auth.laoding && user === auth.user._id && (
            <button type="button" class="btn btn-danger">
              <AiFillDelete />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
