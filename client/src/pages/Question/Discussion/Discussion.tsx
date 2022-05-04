import React, { FC, useEffect } from "react";
import "./Discussion.scss";
import { map } from "lodash";
import SendIcon from "@mui/icons-material/Send";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  Message,
  allMessages,
  getDiscussionThunk, addMessage,
} from "redux/reducers/chatReducer";
import { uid } from "utils/helpers";
import { sendMessage } from "utils/socket";
import { User, userSelector } from "redux/reducers/userReducer";

// components
import MessageComp from "./Discussion/Message";

interface DiscussionProps {
  questionId: string;
}

const Discussion: FC<DiscussionProps> = (props: DiscussionProps) => {
  const { questionId } = props;

  const dispatch = useAppDispatch();

  const user: User = useAppSelector(userSelector);
  const messages: Message[] = useAppSelector(allMessages);

  useEffect(() => {
    dispatch(getDiscussionThunk(questionId));
  }, []);

  const formatMessage = (message: string): Message | null => {
    try {
      return {
        id: uid(),
        text: message,
        creator: { creatorId: user.id, displayName: user.displayName },
        parentId: questionId,
        parentType: "question",
        error: false,
        isPending: true,
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleSendMessage = (ev: any) => {
    ev.preventDefault();
    const message: string = ev.target.elements.message.value;

    if (message) {
      const msg = formatMessage(message);
      if (msg) {
        dispatch(addMessage(msg));
        sendMessage(msg);
      }
    }
    ev.target.reset()
  };

  try {
    return (
      <>
        <div className="chat">
          <div className="guideline">
            <p>Remember to keep the discussion respectful and to follow the <a href="https://">Community Guidelines</a></p>
          </div>
          <div className="messages">
            {map(messages, (msg: any, i: number) => (
              <MessageComp key={`${i}-message`} msg={msg} />
            ))}
          </div>
        </div>
        <div className="bottom-bar">
          <form onSubmit={handleSendMessage} className="bottom-bar__input">
            <input
              type="text"
              name="message"
              autoComplete="off"
              placeholder="add message"
            />
            <button type="submit">
              <SendIcon />
            </button>
          </form>
        </div>
      </>
    );
  } catch (err) {
    console.error(err);
    return <h1>Discussion page error</h1>;
  }
};

export default Discussion;
