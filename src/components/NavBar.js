import React from 'react';
import { Navbar } from 'react-bootstrap';

import Logo from './Logo';

const NavBar = () => {
  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg" className="border-bottom border-dark px-3">
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default NavBar;
