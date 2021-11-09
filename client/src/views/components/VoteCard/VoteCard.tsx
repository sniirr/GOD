import React, { FC } from "react";
import './VoteCard.scss';


const VoteCard: FC = (props: any) => {
  console.log(props.status + "child");
  if (props.status == "Draft") {
    return (

      <div className="card">
        <div className="card__image">
          <div className="card__title"> {props.status}The Place for Title </div>
          <div className="card__status"> {props.status} Draft  </div>
          <img src={process.env.PUBLIC_URL + "https://picsum.photos/350/200"}></img>
        </div>
        <div className="card__info">Back to Edit</div>
      </div>


    )
  } else {
    return (

      <div className="card">
        <div className="card__image">
          <div className="card__title"> {props.status}The Place for Title </div>
          <div className="card__status"> {props.status} status  </div>
          <img src={process.env.PUBLIC_URL + "https://picsum.photos/350/200"}></img>
        </div>
        <div className="card__info">Back to Edit</div>
      </div>


    )
  }
};
export default VoteCard;
