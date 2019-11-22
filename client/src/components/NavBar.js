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

const NavBar = (props) => {
  let [state] = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      {state.user ?
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
        </div> : <Redirect to="/" />}
    </React.Fragment>
  );
}

export default NavBar;

