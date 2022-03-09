import React from 'react';
import { useAppSelector } from 'redux/hooks';
import { apiSelector } from 'redux/modules/api';
import GridLoader from 'react-spinners/GridLoader';

interface ApiDataProps {
  apiKey: string,
  children: any,
}

function ApiData({ apiKey, children }: ApiDataProps) {
  const { status, error } = useAppSelector(apiSelector(apiKey));

  console.log(apiKey, status);
  switch (status) {
    case 'failed':
      return (<div className="api-error">{error?.message}</div>);
    case 'pending':
      return (<div className="loader"><GridLoader /></div>);
    case 'fulfilled':
      return children;
    default:
      return null;
  }
}

export default ApiData;
