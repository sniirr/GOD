import React, { FC, useState, useEffect } from "react";
import "./Discussion.scss";
import { map } from "lodash";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { uid } from "utils/helpers";
import {
  Message,
  addMessage,
  allMessages,
  getDiscussionThunk,
} from "redux/reducers/chatReducer";
import { sendMessage } from "utils/socket";
import { User, userSelector } from "redux/reducers/userReducer";
import SendIcon from "@mui/icons-material/Send";

//components
import MessageComp from "./Discussion/Message";

interface DiscussionProps {
  questionId: string;
}

// let tempMessageId: string | boolean = false;

const Discussion: FC<DiscussionProps> = (props: DiscussionProps) => {
  const { questionId } = props;

  const dispatch = useAppDispatch();

  const user: User = useAppSelector(userSelector);
  const messages: Message[] = useAppSelector(allMessages);

  useEffect(() => {
    dispatch(getDiscussionThunk(questionId));
  }, []);

  try {
    console.log(messages);

    const handleSendMessage = (ev: any) => {
      ev.preventDefault();
      const message: string = ev.target.elements.message.value;

      if (message) {
        const msg = formatMessage(message);
        if (!!msg) {
          // dispatch(addMessage(msg));
          sendMessage(msg);
          tempMessageId = msg.id;
        }
      }
    };

    const formatMessage = (message: string): Message | null => {
      try {
        console.log(user);
        return {
          // messageId,
          id: uid(),
          text: message,
          creatorId: user.id,
          creatorDisplayName: user.displayName,
          parentId: questionId,
          parentType: "question",
          error: false,
        };
      } catch (err) {
        console.error(err);
        return null;
      }
    };

    return (
      <div className="chat">
        <div className="messages">
          {map(messages, (msg: any, i: number) => (
            <MessageComp key={`${i}-message`} msg={msg} />
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <div className="chat-input">
            <input
              type="text"
              name="message"
              autoComplete="off"
              placeholder="add message"
            />
            <button type="submit">
              <SendIcon />
            </button>
          </div>
        ))}
      </div>
    );
  } catch (err) {
    console.error(err);
    return <h1>Discusion page error</h1>;
  }
};

export default Discussion;
