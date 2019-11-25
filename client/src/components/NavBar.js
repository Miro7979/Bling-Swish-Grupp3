import React, { useState, useContext } from 'react';
import LogOut from './logOut';
import { Redirect, Link } from 'react-router-dom'
import Context from './Context';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

const NavBar = () => {
  let [state] = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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
                  <Link className="navlink ml-3" to="/betalningar">Skicka Pengar</Link>
                </NavItem>
                <NavItem>
                  <Link className="navlink ml-3" to="/minasidor">Mina Sidor</Link>
                </NavItem>
                <NavItem>
                  <Link className="navlink ml-3" to="/betalningshistorik">Betalningshistorik</Link>
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

