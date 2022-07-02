import React, { FC, useEffect } from 'react';
import { includes } from 'lodash'
import VoteCard from 'components/QuestionCard/QuestionCard';
import Header from 'components/Header';
import './Questions.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getMemberQuestionsThunk, questionsSelector } from 'redux/reducers/questionsReducers';
import ButtonAppBar from 'components/ButtonAppBar/ButtonAppBar';
import ApiData from 'components/ApiData/ApiData';
import Tabs from 'components/Tabs';
import { AddButton } from "../../components/Buttons";

const Questions: FC = () => {
  const dispatch = useAppDispatch();

  const questions = useAppSelector(questionsSelector);

  useEffect(() => {
    dispatch(getMemberQuestionsThunk());
  }, []);

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
            { title: 'All', component: () => renderList(questions) },
            { title: 'Active', component: () => renderList(questions.filter((q: any) => includes(['active', 'suggestions', 'vote'], q.status))) },
            { title: 'Drafts', component: () => renderList(questions.filter((q: any) => q.status === 'draft')) },
            { title: 'Ended', component: () => renderList(questions.filter((q: any) => q.status === 'closed')) },
          ]}
        />
      </div>
      <AddButton path="/create_question" itemName="Question" />
      <ButtonAppBar />
    </div>
  );
};

export default Questions;
