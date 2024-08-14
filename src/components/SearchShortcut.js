import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import { TextInput } from '../form-generator/components';

const SearchShortcut = () => {
  const history = useHistory();
  const [query, setQuery] = useState('');

  const handleReturn = e => {
    if (e.key === 'Enter') {
      goToSearch();
    }
  };

  const goToSearch = () => {
    history.push(`/services/search?q=${query}`);
  };

  return (
    <Row>
      <Col xs={12}>
        <div className="input-group">
          <TextInput
            size="sm"
            id="seachText"
            hint="Search more services..."
            onChange={e => {
              setQuery(e.target.value);
            }}
            onKeyPress={handleReturn}
          />
          <div className="input-group-append">
            <Button size="sm" variant="outline-info" onClick={goToSearch} disabled={query.length === 0}>
              <Search className="align-text-top me-2" size={16} />
              Search
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SearchShortcut;
