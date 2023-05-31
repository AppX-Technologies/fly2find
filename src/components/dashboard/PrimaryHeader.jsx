import React, { useState } from 'react';
import { useContext } from 'react';
import { Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons/dist';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../context/userContext';
import { isActiveParthname } from '../../helpers/global';

const logout = history => {
  localStorage.clear();
  history.push('/login');
};

const DropDownItems = ({ history, onUserChange }) => (
  <>
    <Dropdown.Toggle size="sm" variant="outline-dark rounded">
      <PersonCircle size={18} className="mr-2 align-text-center" />
      Rajat
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => history.push('/profile')}>View Profile</Dropdown.Item>
      <Dropdown.Item
        onClick={() => {
          logout(history);
          onUserChange(null, true); // Clearing User State By Setting Clear Param To (true)
        }}
      >
        Logout
      </Dropdown.Item>
    </Dropdown.Menu>
  </>
);

const PrimaryHeader = () => {
  const { user, onUserChange } = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  const LinkItem = ({ dropdown = false, title, path, otherActivePaths = [] }) => {
    return dropdown ? (
      <NavDropdown.Item style={{ color: 'black' }} href={path} active={`${location.pathname}` === path}>
        {title}
      </NavDropdown.Item>
    ) : (
      <Nav.Link href={path} active={`${location.pathname}` === path}>
        {title}
      </Nav.Link>
    );
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="px-3 py-0">
        <Navbar.Brand href="/" className="mt-1">
          <h3 className="logo">
            R<span className="underline">atherFly</span>
          </h3>{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-3 mr-auto">
            <LinkItem
              path="/admin/jaunts"
              title={
                <span className={isActiveParthname(location, '/admin/jaunts') && 'gradient-underline font-weight-bold'}>
                  Jaunts
                </span>
              }
            />
          </Nav>

          <Dropdown className="d-none d-md-inline-block" drop="left">
            <DropDownItems history={history} onUserChange={onUserChange} />
          </Dropdown>
          <Dropdown className="d-inline-block d-md-none ml-3 mt-1">
            <DropDownItems history={history} onUserChange={onUserChange} />
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default PrimaryHeader;
