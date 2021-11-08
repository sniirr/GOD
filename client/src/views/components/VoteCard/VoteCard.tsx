import React, { FC } from "react";
import './VoteCard.scss';


const VoteCard: FC = () => {
  return (

    <div className="card">
      <div className="card__image">
        <div className="card__title">Rainforest global responsibility</div>
        <div className="card__status"> Draft </div>
        <img src={process.env.PUBLIC_URL + "https://picsum.photos/350/200"}></img>
      </div>
      <div className="card__info">Back to Edit</div>
    </div>


  );
};
export default VoteCard;
