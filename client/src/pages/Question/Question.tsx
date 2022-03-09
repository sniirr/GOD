import React, { FC, useEffect } from 'react';
import {
  Redirect, Route, Switch, useParams, useRouteMatch, Link,
} from 'react-router-dom';
import Tabs from 'components/Tabs';
import './Question.scss';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
// redux
import { addMessage } from 'redux/reducers/chatReducer';
import { questionById } from 'redux/reducers/questionsReducers';
// components
import { joinRoom, leaveRoom } from 'utils/socket';
import Discussion from './Discussion';
import QuestionInfo from './Information';
import Vote from './Vote';

interface QuestionParams {
  questionId: string
}

const Question: FC = () => {
  const params = useParams<QuestionParams>();
  const { path, url } = useRouteMatch();

  let questionId = '';
  if ('questionId' in params) {
    questionId = params.questionId;
  }

  const dispatch = useAppDispatch();
  const question = useAppSelector(questionById(questionId));

  useEffect(() => {
    joinRoom(questionId, (messageObj: any) => {
      console.log('message received', messageObj.text);
      dispatch(addMessage(messageObj));
    });
    console.log('joined room', questionId);
    return () => {
      leaveRoom(questionId);
      console.log('left room', questionId);
    };
  }, []);

  const imageUrl = question.image?.secure_url;

  return (
    <div className="page page-question">
      <div className="question-header" style={{ backgroundImage: imageUrl ? `url(${imageUrl}` : 'none' }}>
        <div className="share-button"><ShareIcon /></div>
      </div>
      <Tabs
        id="questions"
        isMenu
        tabs={[
          { title: 'Solutions', link: `${url}` },
          { title: 'Discussion', link: `${url}/discussion` },
          { title: 'Vote', link: `${url}/vote` },
        ]}
      />
      <div className="internal-page">
        <Switch>
          <Route path={`${path}/discussion`}>
            <Discussion questionId={questionId} />
          </Route>
          <Route path={`${path}/vote`}>
            <Vote question={question} />
          </Route>
          <Route path={`${path}/info`}>
            <QuestionInfo question={question} />
          </Route>
          <Redirect to={`${path}/info`} />
        </Switch>
      </div>
      <div className="bottom-nav">
        <Link to="/questions" style={{ textDecoration: 'none' }}>
          <Button>
            <ArrowBackIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Question;
