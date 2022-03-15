import React, { FC, useEffect } from 'react';
import VoteCard from 'components/QuestionCard/QuestionCard';
import Header from 'components/Header';
import './Questions.scss';
// redux
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  getQuestionsThunk,
  allQuestionsArray,
} from 'redux/reducers/questionsReducers';
// components
import ButtonAppBar from 'components/ButtonAppBar/ButtonAppBar';
import ApiData from 'components/ApiData/ApiData';
import Tabs from 'components/Tabs';

const Questions: FC = () => {
  const dispatch = useAppDispatch();

  const questions = useAppSelector(allQuestionsArray);

  useEffect(() => {
    dispatch(getQuestionsThunk());
  }, []);

  const renderList = (qs: any) => (
    <ApiData apiKey="questions/getQuestions">
      {qs.map((item: any) => (
        <VoteCard key={`question-${item._id}`} info={item} />
      ))}
    </ApiData>
  );

  return (
    <div className="page page-questions">
      <Header />
      <div className="page-content">
        <Tabs
          id="questions"
          tabs={[
            { title: 'Watchlist', component: () => renderList(questions) },
            { title: 'Ongoing', component: () => renderList(questions.filter((item: any) => item.active)) },
            { title: 'Pending', component: () => renderList([]) },
            { title: 'Past', component: () => renderList(questions.filter((item: any) => !item.active)) },
          ]}
        />
      </div>
      <ButtonAppBar />
    </div>
  );
};

export default Questions;
