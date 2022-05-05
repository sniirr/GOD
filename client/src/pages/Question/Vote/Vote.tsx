import React, { useEffect, useState } from "react";
import "./Vote.scss";
import _, { map, get } from "lodash";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
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
  console.log({ expandedOptions })

  useEffect(() => {
    dispatch(getQuestionsVotes(question._id))
  }, [])

  const voteForSolution = (solution: any) => {
    dispatch(vote(question._id, solution._id, user.id))
  }

  const setExpanded = (sid: string, isExpanded: boolean) => setExpandedOptions({
    ...expandedOptions,
    [sid]: isExpanded,
  })

  try {
    return (
      <div className="vote-tab">
        {status !== 'fulfilled' || _.size(question.solutions) > 0
          ? map(question.solutions, (solution, i: number) => {
            const { count, percent } = get(voteCounters, solution._id, { count: 0, percent: 0 })
            const isUserVote = get(votes, user.id) === solution._id
            // @ts-ignore
            const isExpanded = expandedOptions[solution._id]
            return (
              <>
                <div className="vote-option">
                  <div className="option-bar" onClick={() => setExpanded(solution._id, !isExpanded)}>
                    <div className="fill" style={{ width: `${percent.toString()}%` }} />
                    <div className="option-title">{`${i > -1 ? `#${i + 1} ` : ''} ${solution.title}`}</div>
                  </div>
                  <div className="option-votes">
                    <div>{count} ({percent}%)</div>
                  </div>
                  <Button className={classNames({ secondary: !isUserVote })} onClick={() => voteForSolution(solution)}>
                    <ThumbUpIcon />
                  </Button>
                </div>
                {isExpanded && (
                  <div className="expanded">{Parser(solution.description)}</div>
                )}
              </>
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
