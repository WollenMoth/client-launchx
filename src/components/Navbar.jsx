import React from "react";
import BaseNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

function Navbar(props) {
  return (
    <BaseNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <BaseNavbar.Brand>Launch X</BaseNavbar.Brand>
        </LinkContainer>
        <BaseNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BaseNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
        </BaseNavbar.Collapse>
      </Container>
    </BaseNavbar>
  );
}

export default Navbar;
