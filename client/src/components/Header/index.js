import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "../../stylesheets/body.css";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Navbar style={{ hight: "10px" }}  expand="lg">
      <Container className=" navbar">
        <Link  className="navbar_text" to="/">
          <h2 className="navbar navbar_text">The Cocktail</h2>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="navbar">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Row>
            {Auth.loggedIn() ? (
              <>
                <span>Hey there, {Auth.getProfile().data.username}!</span>
                <button className="m-2" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Col className="navbar">
                  <Link to="/login">
                    <button className="login" style={{ marginRight: "20px" }}>Login</button>
                  </Link>
                  <Link to="/signup">
                    <button className="signup">SignUp</button>
                  </Link>
                </Col>
              </>
            )}
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    
  );
};

export default Header;
