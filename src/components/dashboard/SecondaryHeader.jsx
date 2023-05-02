import React from 'react';
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import { DASHBOARD_SORT_BY_OPTIONS, SHOWING_OPTIONS } from '../../helpers/constants';
import { ArrowDown, ArrowUp, Funnel, Search } from 'react-bootstrap-icons/dist';

const SearchBar = ({ placeholder = 'Search...', value, onChange, disabled }) => {
  return (
    <div className="position-relative">
      <Form.Group className="mb-0">
        <Form.Control
          placeholder={placeholder}
          type="text"
          size="sm"
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <div className="bg-dark h-100 d-flex justify-content-center align-items-center search-icon">
          <Search className="text-light" />
        </div>
      </Form.Group>
    </div>
  );
};

const SecondaryHeader = ({ onFilterValueChange, onGlobalFilterValueChange, globalFilterValues, loading = false }) => {
  return (
    <>
      <Container className="my-3 px-5" fluid>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="my-1">
            <SearchBar
              value={globalFilterValues.query}
              onChange={e => onGlobalFilterValueChange('query', e.target.value)}
              disabled={loading}
            />
          </Col>
          {/* Showing */}
          <Col xs={4} md={2} className="my-1">
            <Dropdown className="mb-md-0">
              <Dropdown.Toggle size="sm" disabled={false} block variant="outline-dark" id="dropdown-basic">
                Showing
              </Dropdown.Toggle>

              <Dropdown.Menu value={globalFilterValues?.showing}>
                {SHOWING_OPTIONS.map(option => (
                  <Dropdown.Item value={option} onClick={() => onGlobalFilterValueChange('showing', option)}>
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          {/* Sort By */}
          <Col xs={4} md={2} className="my-1">
            <Dropdown className="mb-md-0">
              <Dropdown.Toggle size="sm" disabled={false} block variant="outline-dark" id="dropdown-basic">
                Sort By
              </Dropdown.Toggle>

              <Dropdown.Menu value={globalFilterValues?.sortBy}>
                {DASHBOARD_SORT_BY_OPTIONS.map(option => (
                  <Dropdown.Item value={option} onClick={() => onGlobalFilterValueChange('showing', option)}>
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          {/* Assessending Or Decending */}
          <Col xs={2} md={1} className="my-1">
            <Button
              size="sm"
              variant="dark"
              block
              onClick={() => {
                onGlobalFilterValueChange('isAssessending', !globalFilterValues?.isAssessending);
              }}
              disabled={loading}
            >
              {globalFilterValues?.isAssessending ? (
                <ArrowUp className="align-text-top mt-1" />
              ) : (
                <ArrowDown className="align-text-top mt-1" />
              )}
            </Button>
          </Col>

          {/* Filter */}
          <Col xs={2} md={1} className="my-1">
            <Button
              size="sm"
              variant="dark"
              block
              onClick={() => {
                onFilterValueChange(true);
              }}
              disabled={loading}
            >
              <Funnel className="align-text-top mt-1" />
            </Button>
          </Col>
        </Row>
      </Container>
      <hr className="p-0 m-0" />
    </>
  );
};

export default SecondaryHeader;
