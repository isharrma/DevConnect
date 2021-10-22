import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand>
        <Link to="/" className="text-white" style={{ textDecoration: "none" }}>
          Dev's Connect
        </Link>
      </NavbarBrand>

      {/* This is for the collapse form when the screen is shrinked. */}
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <Link
              to="/profiles"
              className="text-white"
              style={{ textDecoration: "none", padding: "10px" }}
            >
              Profiles
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="/signup"
              className="text-white"
              style={{
                textDecoration: "none",
                padding: "10px",
              }}
            >
              Sign Up
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="/signin"
              className="text-white"
              style={{ textDecoration: "none", padding: "10px" }}
            >
              Sign In
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
