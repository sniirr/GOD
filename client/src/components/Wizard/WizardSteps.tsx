import React, { FC } from 'react';
import {
  useLocation,
  // useRouteMatch
} from 'react-router-dom';
import classNames from "classnames";

export interface WizardStepsProps {
  routeNames: Array<string>;
  isVisible?: boolean;
}

export const WizardSteps: FC<WizardStepsProps> = (props:WizardStepsProps) => {
  const { routeNames, isVisible } = props;
  // const { path: basePath } = useRouteMatch();
  const { pathname } = useLocation()
  const urlSplit = pathname.split('/');
  const pageFromUrl = urlSplit[urlSplit.length - 1];

  return isVisible ? (
    <div className="indicator">
      <div className="indicator-internal">
        <hr />
        {routeNames.map((routeName, i) => {
          const classes = {
            'indicator--complete': parseInt(routeName, 10) < parseInt(pageFromUrl, 10),
            'indicator--current': routeName === pageFromUrl,
            'indicator--disabled': parseInt(routeName, 10) > parseInt(pageFromUrl, 10),
          }
          return (
            <div className={classNames('indicator-step', classes)}>{i + 1}</div>
          )
          // return (
          //   <Link key={`page-${routeName}`} to={`${basePath}/${routeName}`}>
          //     <div className={classNames(classes)}>{i + 1}</div>
          //   </Link>
          // )
        })}
      </div>
    </div>
  ) : null;
};

export default WizardSteps;
