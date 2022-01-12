import React, { useState, useContext } from "react";
import UserContext from "../userContext";
import { NavLink as RRDNavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function NavBar({ isLoggedin, logout }) {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser } = { currentUser: { username: "lucas" } };

  function toggleNavbar() {
    setCollapsed(!collapsed);
  }

  return (
    <div>
      <Navbar
        light
        expand='md'
        className='shadow p-3 mb-5 bg-body container-fluid'>
        <NavbarBrand tag={RRDNavLink} exact to='/' className='text-primary'>
          Jobly
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={collapsed} className='justify-content-end' navbar>
          <Nav className='mr-auto' navbar>
            {isLoggedin ? (
              <>
                <NavItem>
                  <NavLink
                    tag={RRDNavLink}
                    onClick={toggleNavbar}
                    activeClassName='active'
                    exact
                    to='/companies'>
                    Companies
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRDNavLink}
                    onClick={toggleNavbar}
                    activeClassName='active'
                    exact
                    to='/jobs'>
                    Jobs
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRDNavLink}
                    onClick={toggleNavbar}
                    activeClassName='active'
                    exact
                    to='/profile'>
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRDNavLink}
                    onClick={() => {
                      toggleNavbar();
                      logout();
                    }}
                    activeClassName='active'
                    exact
                    to='/'>
                    {`Logout, ${currentUser.username}`}
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink
                    tag={RRDNavLink}
                    onClick={toggleNavbar}
                    activeClassName='active'
                    exact
                    to='/signup'>
                    Sign Up
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRDNavLink}
                    onClick={toggleNavbar}
                    activeClassName='active'
                    exact
                    to='/login'>
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
