import React from 'react';
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import { ArrowDown, ArrowUp, Funnel, Search } from 'react-bootstrap-icons/dist';
import { DASHBOARD_SORT_BY_OPTIONS, SHOWING_OPTIONS } from '../../helpers/constants';

const SearchBar = ({ placeholder = 'Search...', value, onChange, disabled, executeGlobalSearch }) => {
  return (
    <div className="position-relative">
      <Form.Group className="mb-0">
        <Form.Control
          placeholder={placeholder}
          type="text"
          size="sm"
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
        />
        <div
          className={`h-100 d-flex justify-content-center align-items-center search-icon ${
            disabled ? 'disabled-content' : 'bg-gradient'
          }`}
          onClick={e => (!disabled ? executeGlobalSearch() : e.stopPropagation())}
        >
          <Search className="text-light" />
        </div>
      </Form.Group>
    </div>
  );
};

const SecondaryHeader = ({
  onFilterValueChange,
  onGlobalFilterValueChange,
  globalFilterValues,
  inProgress,
  executeGlobalSearch,
  onGlobalSearchQueryChange,
  globalSearchQuery
}) => {
  return (
    <>
      <Container className="my-3 px-5" fluid>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="my-1">
            <SearchBar
              value={globalSearchQuery}
              onChange={onGlobalSearchQueryChange}
              disabled={inProgress}
              executeGlobalSearch={executeGlobalSearch}
            />
          </Col>

          {/* Showing */}

          <Col xs={4} md={2} className="my-1">
            <Dropdown className="mb-md-0 ">
              <Dropdown.Toggle size="sm" disabled={inProgress} block variant="outline-primary" id="dropdown-basic">
                Showing
              </Dropdown.Toggle>

              <Dropdown.Menu value={globalFilterValues?.showing}>
                {SHOWING_OPTIONS.map(option => (
                  <Dropdown.Item
                    key={option}
                    value={option}
                    onClick={() => onGlobalFilterValueChange('showing', option)}
                    className={`${globalFilterValues?.showing === option && 'bg-primary text-light'}`}
                  >
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          {/* Sort By */}

          <Col xs={4} md={2} className="my-1">
            <Dropdown className="mb-md-0">
              <Dropdown.Toggle size="sm" disabled={inProgress} block variant="outline-primary" id="dropdown-basic">
                Sort By
              </Dropdown.Toggle>

              <Dropdown.Menu value={globalFilterValues?.sortBy}>
                {DASHBOARD_SORT_BY_OPTIONS.map(option => (
                  <Dropdown.Item
                    key={option}
                    value={option}
                    onClick={() => onGlobalFilterValueChange('sortBy', option)}
                    className={`${globalFilterValues?.sortBy === option && 'bg-primary text-light'}`}
                  >
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
              className="bg-gradient"
              block
              onClick={() => {
                onGlobalFilterValueChange('isAssessending', !globalFilterValues?.isAssessending);
              }}
              disabled={inProgress}
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
              className="bg-gradient"
              block
              onClick={() => {
                onFilterValueChange(true);
              }}
              disabled={inProgress}
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
