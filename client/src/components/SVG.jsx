import React from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

export default function ({ src, className = '', ...props }) {
  return <ReactSVG src={src} wrapper="span" className={classNames('icon', className)} {...props} />;
}
