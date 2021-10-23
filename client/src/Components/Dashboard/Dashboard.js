import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Loader from "react-loader-spinner";
import { Container, Row, Col, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { loading, profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    >
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={80}
        timeout={1000}
      />
    </div>
  ) : (
    <Container fluid>
      <Row sm={7}>
        <Col>
          <h1>Dashboard</h1>
        </Col>
      </Row>
      {profile !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Container>
          <Row>
            <Col>
              <h4>You don't have a profile yet</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="priamry"> Create</Button>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
