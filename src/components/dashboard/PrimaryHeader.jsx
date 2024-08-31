import React from 'react';
import { Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const logout = navigate => {
  localStorage.clear();
  navigate('/');
};

const DropDownItems = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <>
      <Dropdown.Toggle size="sm" variant="outline-dark rounded">
        <PersonCircle size={18} className="me-2 align-text-top" /> {user?.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => navigate('/profile')}>View Profile</Dropdown.Item>
        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
};

const PrimaryHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const LinkItem = ({ dropdown = false, title, path }) => {
    return dropdown ? (
      <NavDropdown.Item as="span" style={{ color: 'black' }}>
        <Nav.Link as="span" onClick={() => navigate(path)} className={location.pathname === path ? 'active' : ''}>
          {title}
        </Nav.Link>
      </NavDropdown.Item>
    ) : (
      <Nav.Link
        as="span"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(path)}
        className={location.pathname === path ? 'active' : ''}
      >
        {title}
      </Nav.Link>
    );
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="px-2 py-0">
        <Navbar.Brand href="/">
          <h3 className="logo">
            R<span className="underline">atherFly</span>
          </h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-3 me-auto">
            <LinkItem path="/admin/users" title="Users" /> <LinkItem path="/admin/jaunts" title="Jaunts" />
          </Nav>

          <Dropdown className="d-none d-md-inline-block" drop="left">
            <DropDownItems />
          </Dropdown>
          <Dropdown className="d-inline-block d-md-none ms-3 mt-1" drop="left">
            <DropDownItems />
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default PrimaryHeader;
