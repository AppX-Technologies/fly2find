import React from 'react';
import { Button, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../helpers/constants';
import Logo from './Logo';

const NavBar = () => {
  return (
    <>
      <Navbar sticky='top' bg="whiteTrans" expand="lg">
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default NavBar;
