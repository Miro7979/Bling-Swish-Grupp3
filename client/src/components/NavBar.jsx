import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <React.Fragment>
      <Navbar color="faded" light>
        <NavbarBrand>Captain Bling Swish</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/minaSidor">Mina sidor</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/betalningshistorik">Betalningshistorik</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/loggaUt">Logga ut</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </React.Fragment>);
}

export default NavBar;
