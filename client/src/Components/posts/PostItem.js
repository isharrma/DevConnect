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

import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  showActions,
  post: { _id, text, username, avatar, user, likes, comments, date },
}) => {
  return (
    <div class="posts">
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img class="round-img" src={avatar} alt="" />
            <h4>{username}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1">{text}</p>
          <p class="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {showActions && (
            <Fragment>
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
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={(e) => deletePost(_id)}
                >
                  <AiFillDelete />
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
