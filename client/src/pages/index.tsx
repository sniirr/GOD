import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getUser, User, userSelector } from 'redux/reducers/userReducer';
import { getMemberQuestionsThunk } from 'redux/reducers/questionsReducers';
import About from './About';
import Questions from './Questions';
import Question from './Question';
import CreateQuestion from './CreateQuestion';
import Notifications from './Notifications';
import Login from './Login';
import JoinPage from './JoinPage';
import AddSolution from './Question/AddSolution';
import CreateQuestionSuccess from "./CreateQuestion/CreateQuestionSuccess";

function Fail() {
  return (
    <h1>Login failed</h1>
  );
}

function LoggedInRoutes() {
  const user: User = useAppSelector(userSelector);

  if (!user?._id) return null

  return (
    <Switch>
      <Route path="/questions">
        <Questions />
      </Route>
      <Route path="/question/:questionId/add-solution">
        <AddSolution />
      </Route>
      <Route path="/question/:questionId">
        <Question />
      </Route>
      <Route exact path="/create_question/success">
        <CreateQuestionSuccess />
      </Route>
      <Route path="/create_question">
        <CreateQuestion />
      </Route>
      <Route path="/notifications">
        <Notifications />
      </Route>
    </Switch>
  );
}

function AppRoutes() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    dispatch(getMemberQuestionsThunk());
  }, []);

  return (
    <Router>
      <LoggedInRoutes />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/fail">
          <Fail />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/join">
          <JoinPage />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRoutes;
