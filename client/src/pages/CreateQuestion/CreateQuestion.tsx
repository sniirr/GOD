import React, { FC } from 'react';
import {
  Switch,
  Route,
  useLocation,
  useRouteMatch, useHistory
} from 'react-router-dom';
import { useAppDispatch } from "redux/hooks";
import { saveDraft } from "redux/reducers/createQuestionReducer";
import InternalHeader from "components/InternalHeader";
import { WizardSteps } from "components/Wizard";
import CreateQuestion0 from './CreateQuestion0';
import CreateQuestion1 from './CreateQuestion1';
import CreateQuestion2 from './CreateQuestion2';
import CreateQuestion3 from './CreateQuestion3';
import CreateQuestion4 from './CreateQuestion4';
import CreateQuestion5 from './CreateQuestion5';

const CreateQuestion: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch()
  const { path } = useRouteMatch();
  const { pathname } = useLocation()
  const routeNames = ['1', '2', '3', '4', '5'];

  const hasStarted = pathname !== '/create_question'

  const saveAndExit = async () => {
    await dispatch(saveDraft())
    history.push("/questions");
  }

  return (
    <div className="page create-question">
      <InternalHeader title="Create Question" backUrl="/questions">
        {hasStarted && (<span onClick={saveAndExit}>Save & Exit</span>)}
      </InternalHeader>
      <WizardSteps routeNames={routeNames} isVisible={hasStarted} />
      <Switch>
        <Route exact path={path}>
          <CreateQuestion0 path={path} />
        </Route>
        <Route exact path={`${path}/1`}>
          <CreateQuestion1 path={path} />
        </Route>
        <Route exact path={`${path}/2`}>
          <CreateQuestion2 path={path} />
        </Route>
        <Route exact path={`${path}/3`}>
          <CreateQuestion3 path={path} />
        </Route>
        <Route exact path={`${path}/4`}>
          <CreateQuestion4 path={path} />
        </Route>
        <Route exact path={`${path}/5`}>
          <CreateQuestion5 path={path} />
        </Route>
      </Switch>
    </div>
  );
};

export default CreateQuestion;
