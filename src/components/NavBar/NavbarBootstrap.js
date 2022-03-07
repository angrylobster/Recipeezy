import { Navbar, Nav, Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import chefHat from "../../images/chef.png";

export default function NavbarBootstrap() {
  return (
    <Navbar sticky="top" fixed="top" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/Recipeezy">
          <img className="navbarimg" src={chefHat} alt="chefhat" />
          Recipeezy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/Recipeezy/about">How to Use</Nav.Link>
            <Nav.Link href="/Recipeezy/plannedmeals">Planned Meals</Nav.Link>
            <Nav.Link href="/Recipeezy/grocerylist">Grocery List</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}