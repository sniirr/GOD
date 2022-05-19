import React, { FC, useEffect } from 'react';
import { includes, isEmpty } from 'lodash'
import VoteCard from 'components/QuestionCard/QuestionCard';
import Header from 'components/Header';
import './Questions.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getQuestionsByOrgIdThunk, questionsSelector } from 'redux/reducers/questionsReducers';
import ButtonAppBar from 'components/ButtonAppBar/ButtonAppBar';
import ApiData from 'components/ApiData/ApiData';
import Tabs from 'components/Tabs';
import { userSelector } from "../../redux/reducers/userReducer";
import { selectedOrgIdSelector } from "../../redux/reducers/mainReducer";

const Questions: FC = () => {
  const dispatch = useAppDispatch();

  const questions = useAppSelector(questionsSelector);
  const { id: userId } = useAppSelector(userSelector)
  const orgId = useAppSelector(selectedOrgIdSelector)

  useEffect(() => {
    if (!isEmpty(orgId)) {
      dispatch(getQuestionsByOrgIdThunk(orgId));
    }
  }, [orgId]);

  const renderList = (qs: any) => (
    <ApiData apiKey="questions/getQuestions">
      {qs.map((item: any) => (
        <VoteCard key={`question-${item._id}`} question={item} />
      ))}
    </ApiData>
  );

  return (
    <div className="page page-questions">
      <Header />
      <div className="page-content">
        <Tabs
          id="questions"
          tabs={[ // todo - memoize lists
            { title: 'Watchlist', component: () => renderList(questions.filter((q: any) => includes(q.members, userId))) },
            { title: 'Active', component: () => renderList(questions.filter((q: any) => includes(['active', 'suggestions', 'vote'], q.status))) },
            { title: 'Drafts', component: () => renderList(questions.filter((q: any) => q.status === 'draft')) },
            { title: 'Ended', component: () => renderList(questions.filter((q: any) => q.status === 'closed')) },
          ]}
        />
      </div>
      <ButtonAppBar />
    </div>
  );
};

export default Questions;
