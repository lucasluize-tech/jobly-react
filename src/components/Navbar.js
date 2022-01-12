import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function NavBar({ isLoggedin, currentUser }) {
  const [collapsed, setCollapsed] = useState(false);

  function toggleNavbar() {
    setCollapsed(!collapsed);
  }

  function closeNavbar() {
    toggleNavbar();
  }

  return (
    <div>
      <Navbar light expand='md' className='shadow p-3 mb-5 bg-body rounded'>
        <NavbarBrand href='/'>Jobly</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={collapsed} navbar>
          <Nav className='me-auto' navbar>
            {isLoggedin ? (
              <>
                <NavItem>
                  <NavLink onClick={closeNavbar} href='/companies'>
                    Companies
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={closeNavbar} href='/jobs'>
                    Jobs
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink onClick={closeNavbar} href='/signup'>
                    Sign Up
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={closeNavbar} href='/login'>
                    Login
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
