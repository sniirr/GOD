import React, { FC } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

export interface WizardStepsProps {
  routeNames: Array<string>;
  isVisible?: boolean;
}

export const WizardSteps: FC<WizardStepsProps> = (props:WizardStepsProps) => {
  const { routeNames, isVisible } = props;
  const { path: basePath } = useRouteMatch();
  const { pathname } = useLocation()
  const urlSplit = pathname.split('/');
  const pageFromUrl = urlSplit[urlSplit.length - 1];

  return isVisible ? (
    <div className="indicator">
      <div className="indicator-internal">
        <hr />
        {routeNames.map((routeName, i) => (
          <Link key={`page-${routeName}`} to={`${basePath}/${routeName}`}>
            <div className={routeName === pageFromUrl ? 'indicator--current' : undefined}>{i + 1}</div>
          </Link>
        ))}
      </div>
    </div>
  ) : null;
};

export default WizardSteps;
