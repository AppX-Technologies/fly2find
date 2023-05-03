import React, { useState } from 'react';
import { Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons/dist';
import { useHistory, useLocation } from 'react-router';

const DropDownItems = ({ history }) => (
  <>
    <Dropdown.Toggle size="sm" variant="outline-dark rounded">
      <PersonCircle size={18} className="mr-2 align-text-top" />
      Rajat
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => history.push('/profile')}>View Profile</Dropdown.Item>
      <Dropdown.Item>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </>
);

const PrimaryHeader = () => {
  const history = useHistory();
  const location = useLocation();
  const [role] = useState(localStorage.getItem('user-role'));

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

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
      <Navbar bg="light" expand="lg" className="px-2 py-0">
        <Navbar.Brand href="/">
          <h3 className="logo">
            F<span className="underline">ly2Find</span>
          </h3>{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-3 mr-auto">
            <LinkItem path="/" title="Home" />
          </Nav>

          <Dropdown className="d-none d-md-inline-block" drop="left">
            <DropDownItems history={history} />
          </Dropdown>
          <Dropdown className="d-inline-block d-md-none ml-3 mt-1">
            <DropDownItems history={history} />
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default PrimaryHeader;
