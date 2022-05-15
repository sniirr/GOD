import React from 'react';
import './Information.scss';
import { size, map } from 'lodash';
import SolutionCard from 'components/SolutionCard';
import { useAppSelector } from "redux/hooks";
import { apiSelector } from "redux/modules/api";
import { SuggestButton } from "components/Buttons";

export interface QuestionInfoProps {
  question: any;
}

function QuestionInfo(props: QuestionInfoProps) {
  const { status } = useAppSelector(apiSelector('questions/getQuestions'));

  const { question } = props;

  const { title, description } = question;

  return (
    <div className="question-info">
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="section-title">Suggested solutions</div>
      {status !== 'fulfilled' || size(question.solutions) > 0
        ? (
          <>
            <SuggestButton questionId={question._id} />
            {map(question.solutions, (solution, i: number) => (<SolutionCard key={`solution-${i}`} solution={solution} number={i + 1} questionId={question._id} />))}
          </>
        )
        : (<div className="no-suggestions-text">No one suggested a solution yet</div>)
      }
      <SuggestButton questionId={question._id} />
    </div>
  );
}

export default QuestionInfo;
