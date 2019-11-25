import React, { useState, useContext } from 'react';
import LogOut from './logOut';
import { Redirect } from 'react-router'
import Context from './Context';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const NavBar = () => {
  let [state] = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  console.log(state.user)
  return (
    <React.Fragment>
      {state.user.role === 'visitor' ? <Redirect to="/" /> :
        <div>
          <Navbar className="navbar" expand="md">
            <NavbarBrand href="/">Bling Swish</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/betalningar">Skicka Pengar</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/minasidor">Mina Sidor</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/betalningshistorik">Betalningshistorik</NavLink>
                </NavItem>
                <NavItem>
                  <LogOut />
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>}
    </React.Fragment>
  );
}

export default NavBar;

