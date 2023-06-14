import React from 'react';
import { Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons/dist';
import { useHistory, useLocation } from 'react-router';
import { isActiveParthname } from '../../helpers/global';
import useAuth from '../../hooks/useAuth';

const logout = history => {
  localStorage.clear();
  history.push('/login');
};

const DropDownItems = ({ history, user, onUserLogout }) => {
  return (
    <>
      <Dropdown.Toggle size="sm" variant="outline-dark rounded">
        <PersonCircle size={18} className="mr-2 align-text-center" />
        {user?.firstName}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => history.push('/profile')}>View Profile</Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            logout(history);
            onUserLogout();
          }}
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
};

const PrimaryHeader = () => {
  const history = useHistory();
  const location = useLocation();
  const { user, onUserLogout } = useAuth();

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
            <DropDownItems history={history} user={user} onUserLogout={onUserLogout} />
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default PrimaryHeader;
