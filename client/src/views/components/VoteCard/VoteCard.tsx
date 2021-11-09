import React, { FC } from "react";
import './VoteCard.scss';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
export interface VoteCardProps {
  status: string;
  votes: number;
  title: string;
  questionId: string;
}

const VoteCard: FC = (props: VoteCardProps) => {
  console.log(props.status + "child");
  if (props.status == "Draft") {
    return (

      <div className="card">
        <div className="card__image">
          <div className="card__title"> {props.status}The Place for The Title </div>
          <div className="card__status"> {props.status} Draft  </div>
          <img src={process.env.PUBLIC_URL + "https://picsum.photos/350/200"}></img>
        </div>

        <div className="card__edit">
          Back to Edit
        </div>
      </div>
    )
  } else {
    return (

      <div className="card">
        <div className="card__image">
          <div className="card__title"> {props.status}The Place for Title </div>
          <div className="card__status"> {props.status} Published  </div>
          <img src={process.env.PUBLIC_URL + "https://picsum.photos/350/200"}></img>
        </div>
        <div className="card__info">

          <div className="card__info__votes">

            <i className="card__info__voteCount__icon">
              <HowToVoteIcon style={{ margin: "0 auto" }} />
            </i>

            <div className="card__info__voteCount__number">
              {props.voteCount}  65 {props.votes}
            </div>

          </div>
          <div className="card__info__shere">Shere</div>
          <div className="card__info__views">View</div>

        </div>
      </div>


    )
  }
};
export default VoteCard;
