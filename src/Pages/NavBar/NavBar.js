import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useAlert } from "react-alert";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import logo from "../../images/logo2.jpg";
// import logo1 from '../../images/logo/logo.jpg'
import logo2 from "../../images/logo/logo1.jpg";
import { logout } from "../../redux/actions/userAction";

const auth = getAuth();

const NavBar = ({ user }) => {
  const { role } = user || {};

  // const role = window.localStorage.getItem(`role`);

  const alert = useAlert();

  //    Handle Logout
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout("empty"));

    console.log("logout clicked");
    //
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert.success("Logged Out Successfully");
        localStorage.removeItem("role");
      })
      .catch((error) => {
        // An error happened.
        alert.error(error);
      });
  };

  return (
    <div>
      <Navbar style={{ backgroundColor: "white" }} expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo2} height="100" alt="" />
          </Navbar.Brand>
          <Navbar.Brand href="/">
            <h3 style={{ color: "lightpink", marginBottom: -30, fontSize: 23 }}>
              BANGLADESH{" "}
            </h3>{" "}
            <br />{" "}
            <h4 style={{ marginTop: 0, color: "lightpink", fontSize: 21 }}>
              {" "}
              STORE
            </h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="mx-auto">
              <Nav className="me-auto ">
                <Nav.Link className="px-3 text-black" href="/">
                  Home
                </Nav.Link>
                <NavDropdown
                  className="px-3  text-black"
                  title="Jwellery"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/gold">Gold</NavDropdown.Item>
                  <NavDropdown.Item href="/silver">Silver</NavDropdown.Item>
                  <NavDropdown.Item href="/diamonds">Diamond</NavDropdown.Item>
                </NavDropdown>

                {/* <NavDropdown
                  className="px-3  text-black"
                  title="Jwellery Accessories"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/JwelleryBox">
                    Jwellery Box
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/jwellerybag">
                    Jwellery Bag
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/jwellerymachine">
                    Jwellery Machines
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/menufactureitem">
                    Menufacturing Item
                  </NavDropdown.Item>
                </NavDropdown> */}
                <NavDropdown.Divider />
                <Nav.Link className="px-3  text-black" href="/jwellerybag">
                  Jwellery Accessories
                </Nav.Link>
                <Nav.Link className="px-3  text-black" href="/ourservice">
                  Our Service
                </Nav.Link>
                <Nav.Link className="px-3  text-black" href="/home#contact">
                  Contact
                </Nav.Link>
                <Nav.Link className="px-3  text-black" href="/home#aboutus">
                  About Us
                </Nav.Link>

                {/* <div>{user.role === "admin" && <Dashboard />}</div> */}

                {role === "admin" && (
                  <Nav.Link className="px-3  text-black" href="/home#aboutus">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/admin/dashboard"
                    >
                      Dashboard
                    </Link>
                  </Nav.Link>
                )}
                {role === "admin" ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <Nav.Link className="px-3  text-black" href="/home#aboutus">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/login"
                    >
                      Login
                    </Link>
                  </Nav.Link>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
