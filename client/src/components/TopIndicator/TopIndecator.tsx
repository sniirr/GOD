import React, { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export interface TopIndecatorProps {
  pages:Array<string>;
  path:string;
}

const TopIndecator: FC<TopIndecatorProps> = (props:TopIndecatorProps) => {
  const { pages, path } = props;
  const { url } = useRouteMatch();
  const urlSplit = url.split('/');
  const pageFromUrl = urlSplit[urlSplit.length - 1];

  return (
    <div className="indicator">
      <hr />
      {pages.map((page, i) => (
        <Link key={`page-${page}`} to={`${path}/${page}`}>
          <div className={page === pageFromUrl ? 'indicator--current' : undefined}>{i + 1}</div>
        </Link>
      ))}
    </div>
  );
};

export default TopIndecator;
