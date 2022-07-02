import React, { FC, useEffect, useState } from "react";
import { isEmpty, isNil, size } from "lodash";
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Tabs from "components/Tabs";
import GroupIcon from '@mui/icons-material/Group';
import { joinRoom, leaveRoom } from "utils/socket";
import { addMessage, replaceMessage, clearChat } from "redux/reducers/chatReducer";
import { onQuestionVote, questionByIdSelector } from "redux/reducers/questionsReducers";
import { User, userSelector } from "redux/reducers/userReducer";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import InternalHeader from "components/InternalHeader";
import QuestionMembers from "popups/QuestionMembers/QuestionMembers";
import Discussion from "./Discussion";
import QuestionInfo from "./Information";
import Vote from "./Vote/Vote";
import "./Question.scss";

interface QuestionParams {
  questionId: string;
}

const Question: FC = () => {
  const params = useParams<QuestionParams>();
  const { path, url } = useRouteMatch();
  const user: User = useAppSelector(userSelector);
  const [showMembers, setShowMembers] = useState(false)

  let questionId = "";
  if ("questionId" in params) {
    questionId = params.questionId;
  }

  const dispatch = useAppDispatch();
  const question = useAppSelector(questionByIdSelector(questionId));

  const onMessage = (messageObj: any) => {
    const isThisUser = messageObj.creator._id === user._id
    console.log({ messageObj, isThisUser, user })
    dispatch(isThisUser ? replaceMessage(messageObj) : addMessage(messageObj));
  }

  useEffect(() => {
    joinRoom(questionId, {
      onMessage,
      onVote: (userVotes: any) => dispatch(onQuestionVote(questionId, user._id, userVotes))
    });

    return () => {
      dispatch(clearChat())
      leaveRoom(questionId);
    };
  }, []);

  if (isNil(question)) return null

  const imageUrl = question.image?.secure_url;

  return (
    <div className="page page-question">
      <InternalHeader backUrl="/questions">
        <div className="center-aligned-row members-icon" onClick={() => setShowMembers(!showMembers)}>
          <span>{size(question.members)}</span>
          <GroupIcon />
        </div>
      </InternalHeader>
      {!isEmpty(imageUrl) && (
        <div className="question-header" style={{ backgroundImage: `url(${imageUrl}` }} />
      )}
      <Tabs
        id="questions"
        isMenu
        tabs={[
          { title: "Solutions", link: `${url}` },
          { title: "Discussion", link: `${url}/discussion` },
          { title: "Vote", link: `${url}/vote` },
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
      <QuestionMembers isOpen={showMembers} close={() => setShowMembers(false)} questionId={questionId} />
    </div>
  );
};
export default Question;
