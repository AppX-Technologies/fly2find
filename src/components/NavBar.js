import React from 'react';
import { Navbar } from 'react-bootstrap';
import Logo from './Logo';

const NavBar = () => {
  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg" className="px-3 bg-opacity-50">
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default NavBar;
