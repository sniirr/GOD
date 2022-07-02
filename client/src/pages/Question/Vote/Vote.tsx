import React, { useEffect, useState, Fragment } from "react";
import "./Vote.scss";
import { map, get, size } from "lodash";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getQuestionsVotes, vote } from "redux/reducers/questionsReducers";
import Button from "components/Button";
import { User, userSelector } from "redux/reducers/userReducer";
import classNames from "classnames";
import Parser from 'html-react-parser';
import { apiSelector } from "redux/modules/api";
import { SuggestButton } from "components/Buttons";

export interface QuestionInfoProps {
  question: any;
}

function Vote(props: QuestionInfoProps) {
  const { question } = props;
  const dispatch = useAppDispatch()

  const { voteCounters, votes } = question
  const user: User = useAppSelector(userSelector)
  const { status } = useAppSelector(apiSelector('questions/getQuestions'));

  const [expandedOptions, setExpandedOptions] = useState({})

  useEffect(() => {
    dispatch(getQuestionsVotes(question._id))
  }, [])

  const voteForSolution = (solution: any, value: number) => {
    dispatch(vote(question._id, solution._id, user._id, value))
  }

  const setExpanded = (sid: string, isExpanded: boolean) => setExpandedOptions({
    ...expandedOptions,
    [sid]: isExpanded,
  })

  try {
    return (
      <div className="vote-tab">
        {status !== 'fulfilled' || size(question.solutions) > 0
          ? map(question.solutions, (solution, i: number) => {
            const optionVotes = get(voteCounters, [solution._id, 'options'], [0, 0])
            const solutionUserVote = get(votes, [user._id, solution._id])
            // @ts-ignore
            const isExpanded = expandedOptions[solution._id]
            return (
              <Fragment key={`solution-${solution._id}`}>
                <div className="vote-option">
                  <Button className={classNames({ secondary: solutionUserVote !== -1, error: solutionUserVote === -1 })} onClick={() => voteForSolution(solution, -1)}>
                    <ThumbDownIcon />
                  </Button>
                  <div className="option-votes">
                    <div>{optionVotes[0] ? '-' : ''}{optionVotes[0]}</div>
                  </div>
                  <div className="option-bar" onClick={() => setExpanded(solution._id, !isExpanded)}>
                    <div className="option-title">{`${i > -1 ? `#${i + 1} ` : ''} ${solution.title}`}</div>
                  </div>
                  <div className="option-votes">
                    <div>{optionVotes[1]}</div>
                  </div>
                  <Button className={classNames({ secondary: solutionUserVote !== 1 })} onClick={() => voteForSolution(solution, 1)}>
                    <ThumbUpIcon />
                  </Button>
                </div>
                {isExpanded && (
                  <div className="expanded">{Parser(solution.description)}</div>
                )}
              </Fragment>
            )
          })
          : (
            <>
              <div className="no-suggestions-text">No one suggested a solution yet</div>
              <SuggestButton questionId={question._id} />
            </>
          )}
      </div>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default Vote;
