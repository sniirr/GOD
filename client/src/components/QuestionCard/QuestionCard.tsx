import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import './QuestionCard.scss';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

export interface VoteCardProps {
  info: any
}

const VoteCard: FC<VoteCardProps> = (props: VoteCardProps) => {
  const { info } = props;

  const history = useHistory();

  function handleRedirect() {
    history.push(`/question/${info._id}`);
  }

  const imageUrl = info?.image?.secure_url;

  return (
    <div className="card">
      <div
        className="card__image"
        style={{ backgroundImage: imageUrl ? `url(${imageUrl}` : 'none' }}
        onClick={handleRedirect}
      >
        <div className="card__title">{info.title}</div>
        <div className="card__status">{info.active ? 'Published' : 'Draft'}</div>
      </div>
      <div className="card__info">
        {info.active ? (
          <>
            <div className="card__info__votes">
              <i className="card__info__voteCount__icon">
                <HowToVoteIcon style={{ margin: '0 auto' }} />
              </i>
              {/* eslint-disable-next-line no-underscore-dangle */}
              <div>{info.__v}</div>
            </div>
            <div className="card__info__share">Share</div>
            <div className="card__info__views">View</div>
          </>
        ) : (
          <>
            <div className="card__info__votes">Edit</div>
            <div className="card__info__share">Ask for Review</div>
            <div className="card__info__views">Publish</div>
          </>
        )}
      </div>
    </div>
  );
};
export default VoteCard;
