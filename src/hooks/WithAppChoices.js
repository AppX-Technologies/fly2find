import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { makeApiRequests } from '../helpers/api';

const WithAppChoices = ({ render }) => {
  const [appChoices, setAppChoices] = useState(null);
  const [appChoicesLoading, setAppChoicesLoading] = useState(true);

  const getAppChoices = () => {
    fetchRemoteAppChoices();
  };

  const fetchRemoteAppChoices = async () => {
    const { response, error } = await makeApiRequests({ requestType: 'appChoices' });
    if (error) {
      toast(error, {
        type: 'error'
      });
      setAppChoicesLoading(false);
      return;
    }

    setAppChoices(response['appChoices']);
    setAppChoicesLoading(false);
  };

  useEffect(() => {
    getAppChoices();
  }, []);

  if (appChoicesLoading) return <Loader />;

  return appChoices ? render(appChoices) : '';
};

export default WithAppChoices;
