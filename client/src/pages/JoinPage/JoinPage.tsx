import React, { FC, useEffect, useState } from "react";
import { isNil } from "lodash";
import classNames from "classnames";
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
// import { useAppSelector, useAppDispatch } from "redux/hooks";
import "./JoinPage.scss";
import { getQuestionsById } from "redux/reducers/questionsReducers";
import { QuestionSchema } from "../../redux/reducers/createQuestionReducer";

interface JoinParams {
  qid: string;
  email: string;
  inviter: string;
}

const JoinPage: FC = () => {
  const { qid, email, inviter } = useParams<JoinParams>();
  const [question, setQuestion] = useState<QuestionSchema>();

  // const dispatch = useAppDispatch();

  useEffect(() => {
    const getQuestion = async () => {
      setQuestion(await getQuestionsById(qid))
    }
    getQuestion()
  }, [])

  if (isNil(question)) return null

  return (
    <div className="page join-page">
      <div className="">
        <p>Welcome {email},</p>
        <p>You have been invited by {inviter} to take part of the decision of "{question.title}"</p>
      </div>
    </div>
  );
};

export default JoinPage;
