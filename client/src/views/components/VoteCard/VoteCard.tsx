import React, { FC } from "react";
import './VoteCard.scss';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
//models
import { Group } from '../../pages/Vote/Vote'

export interface VoteCardProps {
  info: Group
}

function VoteCard (props: VoteCardProps) {
 const {info} = props;
  if (info.status == "Draft") {
    return (

      <div className="card">
        <div className="card__image">
          <div className="card__title"> {info.status}The Place for The Title </div>
          <div className="card__status"> {info.status} Draft  </div>
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
          <div className="card__title"> {info.status}The Place for Title </div>
          <div className="card__status"> {info.status} Published  </div>
          <img src={process.env.PUBLIC_URL + "https://picsum.photos/350/200"}></img>
        </div>
        <div className="card__info">

          <div className="card__info__votes">

            <i className="card__info__voteCount__icon">
              <HowToVoteIcon style={{ margin: "0 auto" }} />
            </i>

            <div className="card__info__voteCount__number">
              {info.votes}
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
