import React from "react";
import './Vote.scss'

export interface QuestionInfoProps {
    question?: any;
}

const Vote = (props: QuestionInfoProps) => {
    return (
        <div className="vote-panel">
            Vote
        </div>
    );
};

export default Vote
