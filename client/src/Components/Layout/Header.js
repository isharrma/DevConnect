import React, { useState, useContext } from "react";

import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  NavbarToggler,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand>Dev's Connect</NavbarBrand>
      {/* This is for the collapse form when the screen is shrinked. */}
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <NavLink to="/profile" className="text-white">
              Profiles
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signup" className="text-white">
              SignUp
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signin" className="text-white">
              SignIn
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
