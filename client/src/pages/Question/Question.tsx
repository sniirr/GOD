import React, { FC, useEffect } from "react";
import { get, isEmpty, isNil } from "lodash";
import classNames from "classnames";
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Tabs from "components/Tabs";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { joinRoom, leaveRoom } from "utils/socket";
import { addMessage, replaceMessage, clearChat } from "redux/reducers/chatReducer";
import { questionByIdSelector, toggleWatch } from "redux/reducers/questionsReducers";
import { User, userSelector } from "redux/reducers/userReducer";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import InternalHeader from "components/InternalHeader";
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

  let questionId = "";
  if ("questionId" in params) {
    questionId = params.questionId;
  }

  const dispatch = useAppDispatch();
  const question = useAppSelector(questionByIdSelector(questionId));

  useEffect(() => {
    joinRoom(questionId, (messageObj: any) => {
      const isThisUser = messageObj.creator._id === user._id
      console.log({ messageObj, isThisUser, user })
      dispatch(isThisUser ? replaceMessage(messageObj) : addMessage(messageObj));
    });

    return () => {
      dispatch(clearChat())
      leaveRoom(questionId);
    };
  }, []);

  if (isNil(question)) return null

  const isWatching = get(question, ['watchlist', user._id], false)
  const imageUrl = question.image?.secure_url;

  return (
    <div className="page page-question">
      <InternalHeader backUrl="/questions">
        <ShareIcon />
        <VisibilityIcon
          onClick={() => dispatch(toggleWatch(questionId, user._id))}
          className={classNames({ on: isWatching, off: !isWatching })} />
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
    </div>
  );
};
export default Question;
