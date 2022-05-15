import React, { useState } from "react";
import { get, countBy, identity } from "lodash";
import TruncateMarkup from 'react-truncate-markup';
import Parser from 'html-react-parser';
import './Message.scss';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Avatar from '@mui/material/Avatar';
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { likeMessage } from "redux/reducers/chatReducer";
import { userSelector } from "redux/reducers/userReducer";
import classNames from "classnames";

interface MessageProps {
  msg: any,
  isPreview?: boolean,
}

const Message = (props: MessageProps) => {
  const dispatch = useAppDispatch()

  const { msg, isPreview, } = props;
  console.log({ msg })
  const [truncate, setTruncate] = useState(!isPreview);
  const { id: userId } = useAppSelector(userSelector);
  const userLike = get(msg, ['likes', userId]);
  // todo - memoize this:
  const { true: upvotes = 0, false: downvotes = 0 } = countBy(msg.likes, identity);

  const displayName = get(msg, "creator.displayName", "");
  if (displayName.length === 0) {
    console.warn(`message ${msg._id} has no creator`);
    console.log(JSON.stringify(msg));
  }

  function elapsedTime(date: any){
    //convert to unix the message timestamp
    const myDate = new Date(date)
    const timestamp = myDate.getTime()
    const secondsOld = Math.floor(timestamp / 1000)

    //get the time now
    const timeNow = new Date()
    const recentTimeTimestamp = timeNow.getTime()
    const secondsNow = Math.floor(recentTimeTimestamp / 1000)

    const difference = secondsNow - secondsOld

    if (difference < 60) {
      return `${difference} seconds ago`
    } if (difference < 3600) {
      // Less than an hour has passed:
      return `${Math.floor(difference / 60)} minutes ago`;
    } if (difference < 86400) {
      // Less than a day has passed:
      return `${Math.floor(difference / 3600)} hours ago`;
    } if (difference < 2620800) {
      // Less than a month has passed:
      return `${Math.floor(difference / 86400)} days ago`;
    } if (difference < 31449600) {
      // Less than a year has passed:
      return `${Math.floor(difference / 2620800)} months ago`;
    }
    // More than a year has passed:
    return `${Math.floor(difference / 31449600)} years ago`;
  }

  const like = (v: boolean) => dispatch(likeMessage(msg._id, userId, v));

  try {
    return (
      <div className="message">
        <div className="avatar">
          <Avatar sx={{ width: 28, height: 28 }} src="/static/images/avatar/1.jpg" />
        </div>
        <div className="message-container">
          <div className="creator">
            {displayName} - {msg.date ? elapsedTime(msg.date) : 'Sending'}
          </div>
          {truncate ? (
            <TruncateMarkup lines={6} ellipsis={<span onClick={() => setTruncate(!truncate)} className="message-truncate"> ... Read more</span>}>
              <div className="content">{Parser(msg.text)}</div>
            </TruncateMarkup>
          ) : (
            <div>
              {!isPreview && (
              <div className="content">{Parser(msg.text)}
                <span onClick={() => setTruncate(!truncate)} className="message-truncate"> Show less</span>
              </div>
              )}
            </div>
          )
          }
          <div className="bottom-nav-buttons">
            <div className="bottom-nav-btn">
              <ThumbUpIcon onClick={() => like(true)} className={classNames({ active: userLike === true })} />
              <div className="upvote">{upvotes}</div>
            </div>
            <div className="bottom-nav-btn">
              <ThumbDownIcon onClick={() => like(false)} className={classNames({ active: userLike === false })} />
              <div className="downvote">{`${downvotes > 0 ? '-' : ''}${downvotes}`}</div>
            </div>
            {/*<div className="bottom-buttons-left">*/}
            {/*  <div>*/}
            {/*    <ReplyIcon />*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className="bottom--buttons-right">*/}
            {/*  <MoreVertIcon />*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(msg);
    console.error(error);
    return null;
  }
};

export default Message;
