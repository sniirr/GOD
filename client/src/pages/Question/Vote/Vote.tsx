import React from 'react';
import './Vote.scss';
import _ from 'lodash';
import SolutionCard from 'components/SolutionCard';

export interface QuestionInfoProps {
  question: any;
}

function Vote(props: QuestionInfoProps) {
  const { question } = props;

  return (
    <div className="vote-tab">
      {_.map(question.solutions, (solution, i: number) => (<SolutionCard key={`solution-${i}`} solution={solution} number={i + 1} questionId={question.id} />))}
    </div>
  );
}

export default Vote;
