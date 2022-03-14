import React, { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { isNumber } from 'lodash'

export interface TopIndicatorProps {
  pages: Array<string>;
  path: string;
  isVisible?: boolean;
}

const TopIndicator: FC<TopIndicatorProps> = (props:TopIndicatorProps) => {
  const { pages, path, isVisible } = props;
  const { path: basePath } = useRouteMatch();
  const urlSplit = path.split('/');
  const pageFromUrl = urlSplit[urlSplit.length - 1];

  return isVisible ? (
    <div className="indicator">
      <div className="indicator-internal">
        <hr />
        {pages.map((page, i) => (
          <Link key={`page-${page}`} to={`${basePath}/${page}`}>
            <div className={page === pageFromUrl ? 'indicator--current' : undefined}>{i + 1}</div>
          </Link>
        ))}
      </div>
    </div>
  ) : null;
};

export default TopIndicator;
