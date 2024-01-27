import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BaseNavbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

function Navbar() {
  return (
    <BaseNavbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        <LinkContainer to="/">
          <BaseNavbar.Brand>Launch X</BaseNavbar.Brand>
        </LinkContainer>
        <BaseNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BaseNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/explorers">
              <Nav.Link>Explorers</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/explorers/new">
              <Nav.Link>Agregar Explorer</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/commanders">
              <Nav.Link>Commanders</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/commanders/new">
              <Nav.Link>Agregar Commander</Nav.Link>
            </LinkContainer>
          </Nav>
        </BaseNavbar.Collapse>
      </Container>
    </BaseNavbar>
  );
}

export default Navbar;
