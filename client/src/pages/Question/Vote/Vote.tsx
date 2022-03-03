import React from "react";
import './Vote.scss'
import _ from "lodash";
import SolutionCard from "components/SolutionCard";

export interface QuestionInfoProps {
    question?: any;
}

const Vote = (props: QuestionInfoProps) => {
    const {question} = props

    return (
        <div className="vote-tab">
            {_.map(question.solutions, (solution, i: number) => {
                return (<SolutionCard key={`solution-${i}`} solution={solution} number={i + 1}/>)
            })}
        </div>
    );
};

export default Vote
