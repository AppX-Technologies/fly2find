import React from 'react';
import { Navbar } from 'react-bootstrap';

import Logo from './Logo';

const NavBar = () => {
  return (
    <>
      <Navbar sticky="top" bg="white" expand="lg" className="bg-opacity-50 px-3">
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default NavBar;
