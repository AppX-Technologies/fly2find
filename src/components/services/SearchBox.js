import React, { useEffect, useState } from 'react';
import { Row, Col, Button, ProgressBar, Dropdown, Badge } from 'react-bootstrap';
import { Search, Funnel, ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import { CheckBoxInput, TextInput, CheckBoxGroup } from '../../form-generator/components';
import { isClient, isStaff } from '../../helpers/global';
import { getVariantFromStatus } from '../../helpers/ui';
import * as qs from 'qs';
import { useLocation } from 'react-router-dom';
import { makeApiRequests } from '../../helpers/api';
import { toast } from 'react-toastify';
import SlidingSideBar from '../SlidingSideBar/SlidingSideBar';
import DateRangePicker from '../DateRangePicker';

const sortByOptionsClient = ['Date Created', 'Last Updated Date', 'Alphabetical', 'Closing Date'];
const showingOptions = [5, 20, 50, 100, 'All'];

const SearchBox = ({
  organizationOptions = [],
  indStatusOptions = [],
  statusOptions = [],
  type,
  cancelled,
  onServiceFetch,
  onActiveStatusChange,
  onLoadingChange
}) => {
  const location = useLocation();

  const [role] = useState(localStorage.getItem('user-role'));
  const [loading, setLoading] = useState(false);
  const [maxLimit, setMaxLimit] = useState('All');
  const [organizationValues, setOrganizationValues] = useState(organizationOptions);
  const [urgencyOptions] = useState(['General', 'Rush']);
  const [urgencyValues, setUrgencyValues] = useState([false, true]);
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [dateRange, setDateRange] = useState();

  const { q, s } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const [activeStatus, setActiveStatus] = useState(
    indStatusOptions.includes(s) || statusOptions.includes(s) ? s : 'All'
  );
  const [sortBy, setSortBy] = useState(isStaff(role) ? 'Last Updated Date' : 'Date Created');
  const [descSort, setDescSort] = useState(true);

  const getServiceIncluded = () => {
    const serviceType = type;

    if (serviceType === 'lienSearch') {
      return ['Lien Search'];
    }

    if (serviceType === 'survey') {
      return ['Survey'];
    }

    if (serviceType === 'estoppel') {
      return ['Estoppel'];
    }

    return [];
  };

  const fetchServices = async () => {
    const filter = {
      query: getQuery(),
      sortBy,
      maxResults: maxLimit,
      sortDirection: descSort ? 'descending' : 'ascending'
    };

    if (isStaff(role)) {
      filter.filterBy = {
        Organization: organizationValues,
        'Services Included': getServiceIncluded(),
        Rush: urgencyValues
      };

      if (dateRange) {
        filter.dateRange = {
          'Date Created': { from: dateRange.startDate, to: dateRange.endDate }
        };
      }
    }

    if (type) {
      filter.individualStatus = {
        [type]: activeStatus === 'All' ? indStatusOptions : [activeStatus]
      };
    } else {
      filter.filterByColumn = {
        Status: activeStatus === 'All' ? statusOptions : [activeStatus]
      };
    }

    if (cancelled) {
      filter.cancelled = type;
    }

    setLoading(true);

    const { response, error } = await makeApiRequests({ requestType: 'searchServices', requestBody: { filter } });

    if (error) {
      toast(error, {
        type: 'error'
      });
      setLoading(false);
      return;
    }

    onServiceFetch && onServiceFetch(response['searchResults'], response['totalServices']);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, [sortBy, organizationValues, maxLimit, activeStatus, descSort]);

  useEffect(() => {
    onLoadingChange && onLoadingChange(loading);
  }, [loading]);

  useEffect(() => {
    onActiveStatusChange && onActiveStatusChange(activeStatus);
  }, [activeStatus]);

  const getQuery = () => {
    return document.getElementById('searchText').value;
  };

  const handleReturn = e => {
    if (loading) return;

    if (e.key === 'Enter') {
      fetchServices();
    }
  };

  const onDateChange = dateRange => {
    setDateRange(dateRange);
  };

  const handleSortDirectionChange = () => {
    setDescSort(!descSort);
  };

  const Filter = () => (
    <SlidingSideBar visible={sideBarVisible} onClose={() => setSideBarVisible(false)} title="Filters">
      {FilterGroup({
        groupName: 'org',
        title: 'Organization',
        onAllChangeFunction: () => handleAllCheck('org'),
        options: organizationOptions,
        values: organizationValues
      })}

      {FilterGroup({
        groupName: 'urgency',
        title: 'Urgency',
        onAllChangeFunction: () => handleAllCheck('urgency'),
        options: urgencyOptions,
        values: urgencyValues
      })}

      {DateRangePicker({ label: 'Creation Date', onDateChange, defaultDisabled: true })}

      <div className="text-right">
        <Button onClick={applyFilters}>Apply</Button>
      </div>
    </SlidingSideBar>
  );

  const handleAllCheck = group => {
    const checked = document.getElementById(`${group}All`).checked;

    [...document.getElementsByName(`${group}`)]
      .filter(input => input.type === 'checkbox')
      .forEach(input => (input.checked = checked));
  };

  const FilterGroup = ({ groupName, title, onAllChangeFunction, options, values, mapOptions = true }) => {
    return (
      <>
        <CheckBoxInput
          showLabel
          id={`${groupName}All`}
          className="ms-3"
          title={title}
          boldLabel={true}
          defaultChecked={true}
          onChangeFunction={onAllChangeFunction}
        />

        <hr className="mt-1 mb-2" />
        <CheckBoxGroup
          defaultValues={values}
          inline={false}
          options={
            mapOptions
              ? options.map(o => ({
                  option: o,
                  value: o
                }))
              : options
          }
          groupName={groupName}
          boxWidth={6}
        />
      </>
    );
  };

  const applyFilters = () => {
    if (dateRange && !(dateRange['startDate'] && dateRange['endDate'])) {
      toast.error('Please select both start and end date');
      return;
    }

    const orgFilter = [...document.getElementsByName('org')]
      .filter(input => input.type === 'checkbox' && input.checked)
      .map(input => input.value);
    const urgencyFilter = [...document.getElementsByName('urgency')]
      .filter(input => input.type === 'checkbox' && input.checked)
      .map(input => input.value)
      .map(value => value === 'Rush');

    setUrgencyValues(urgencyFilter);
    setOrganizationValues(orgFilter);

    setSideBarVisible(false);
  };

  return (
    <>
      <Row className="px-md-3 mt-1">
        <Col xs={12} md={12} lg={isStaff(role) ? 7 : 8}>
          <div className="input-group mb-1">
            <TextInput
              id="searchText"
              hint="Leave empty to view recent results"
              onKeyPress={handleReturn}
              preValue={q}
              size="sm"
            />
            <div className="input-group-append">
              <Button size="sm" variant="dark" disabled={loading} onClick={fetchServices}>
                <Search className="align-text-top me-2" size={16} />
                Search
              </Button>
            </div>
          </div>
        </Col>
        <Col
          xs={12}
          md={{ span: isStaff(role) ? 4 : 3, offset: isStaff(role) ? 2 : 4 }}
          lg={{ span: 2, offset: 0 }}
          className="ps-md-0"
        >
          <Dropdown className="mb-1 mb-md-0">
            <Dropdown.Toggle size="sm" disabled={loading} block variant="outline-dark" id="dropdown-basic">
              Showing
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {showingOptions.map(option => (
                <Dropdown.Item onClick={() => setMaxLimit(option)}>{option}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col
          xs={isStaff(role) ? 8 : 10}
          md={4}
          lg={{ span: 1, offset: 0 }}
          className={`${isStaff(role) ? 'pe-0 pe-md-0' : ''}  ps-md-0`}
        >
          <Dropdown className="mb-1 mb-md-0">
            <Dropdown.Toggle size="sm" disabled={loading} block variant="outline-dark" id="dropdown-basic">
              Sort By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {sortByOptionsClient.map(option => (
                <Dropdown.Item onClick={() => setSortBy(option)}>{option}</Dropdown.Item>
              ))}
              {isStaff(role) && !cancelled && type && (
                <Dropdown.Item onClick={() => setSortBy('Needed Date')}>Needed Date</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={2} md={1} lg={{ span: 1, offset: 0 }} className="ps-1">
          <Button variant="dark" block size="sm" disabled={loading} onClick={handleSortDirectionChange}>
            {descSort ? <ArrowDown className="text-align-top" /> : <ArrowUp className="text-align-top" />}
          </Button>
        </Col>
        {isStaff(role) && (
          <>
            <Col xs={2} md={1} lg={1}>
              <Button
                size="sm"
                variant="dark"
                block
                onClick={() => {
                  setSideBarVisible(true);
                }}
                disabled={loading}
              >
                <Funnel className="align-text-top" />
              </Button>
            </Col>
            {Filter()}
          </>
        )}
        <Col xs={12}>
          <p style={{ fontSize: '14px' }} className="text-right my-1">
            <b>Showing: </b>
            <span className="text-secondary me-3">{maxLimit} items</span>

            <b>Sorting by: </b>
            <span className="text-secondary">{sortBy}</span>
          </p>
        </Col>
        {!cancelled && !(isClient(role) && type) && (
          <Col xs={12} className="my-1 text-center">
            {['All', ...(type ? indStatusOptions : statusOptions)].map(status => (
              <Badge
                onClick={() => {
                  if (loading || activeStatus === status) return;

                  setActiveStatus(status);
                }}
                className={`mt-1 me-2 p-2 ${loading || activeStatus === status ? '' : 'hover-dark'}`}
                variant={activeStatus === status ? getVariantFromStatus(status) : 'dark'}
              >
                {status}
              </Badge>
            ))}
          </Col>
        )}
        {loading && (
          <Col xs={12} className="my-3">
            <ProgressBar variant="dark" now={100} animated label="Searching services..." />
          </Col>
        )}
      </Row>
      <hr />
    </>
  );
};

export default SearchBox;
