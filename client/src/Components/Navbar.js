import { memo } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
const NavbarUpper = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Navbar
        // data-bs-theme="dark"
        style={{ backgroundColor: "rgb(59, 142, 77)" }}
      >
        <Container>
          <Navbar.Brand href="/" className="textColor">
            LEAD MVP
          </Navbar.Brand>
          <Nav className="navDisplay">
            <NavDropdown title="Services">
              <NavDropdown.Item href="#action/3.1">TASK 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">TASK 2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">TASK 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                ANOTHER LINK
              </NavDropdown.Item>
            </NavDropdown>
            {pathname != "/LogIn" ? (
              <Nav.Link href="/calling">Calling</Nav.Link>
            ) : null}
            {pathname != "/SignUpPage" ? (
              <Nav.Link href="/SignUpPage">SignUp</Nav.Link>
            ) : null}
            {pathname != "/LogIn" ? (
              <Nav.Link href="/LogIn">LogIn</Nav.Link>
            ) : null}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default memo(NavbarUpper);
