import React, { FC, useState, useEffect } from "react";
import io from "socket.io-client";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";

//redux
import { addMessage } from "../../../../redux/reducers/chatReducer";
import {allMessages} from '../../../../redux/reducers/chatReducer';

//interfaces
import { Message } from "../../../../redux/reducers/chatReducer";
const socket = io();

interface DisccusionProps{
  questionId:string;
  messages:Array<Message>;
}

const Discussion: FC<DisccusionProps> = (props:DisccusionProps) => {

  const {questionId} = props;
  const [selectedTab, setSelectedTab] = useState(0);
  // eslint-disable-next-line
  const [questions, setQuestions] = useState([]);
  const [questiontitle, setQuestiontitle] = useState("");
  const [question, setQuestion] = useState("");

  const dispatch = useAppDispatch();
 

  

  const hendelTapTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
   
    socket.on("message", (msg:Message) => {
      console.log("message", msg);
      if (msg) {
        dispatch(addMessage(msg));
      }
    });

    return ()=>{
      socket.removeAllListeners("message");
    }
  }, []);

  const handleChangetitle = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQuestiontitle(e.target.value);
  };
  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQuestion(e.target.value);
  };
  

  function handleSendMessage(ev: any) {
    ev.preventDefault();
    const message: string = ev.target.elements.message.value;

    if (message) {
      const msg:Message = formatMessage(message)
        dispatchMessage(message);
        socket.emit("message", msg);
     
    }
  }

  function formatMessage(message: string): Message {
    try {
      const creatorId = "123";
      const creatorDisplayName = "Tal";
      const parentId = questionId;
      const parentType = "question";

      return {
        message,
        creatorId,
        creatorDisplayName,
        parentId,
        parentType,
        error: false,
      };
    } catch (err) {
      console.error(err);
      return {
        message,
        creatorId: "",
        creatorDisplayName: "",
        parentId: "",
        parentType: "question",
        error: true,
      };
    }
  }

  function dispatchMessage(messageText: string) {
    if (messageText) {
      console.log("trying to dispatch message", messageText);
      const msg:Message = formatMessage(messageText);
      if (msg.error !== false) {
        dispatch(addMessage(msg));
      }
    }
  }

  return (
    <>
      <div>
        {" "}
        <ul id="messages"></ul>
        <form onSubmit={handleSendMessage}>
          <input name="message" autoComplete="off" placeholder="add message" />
          <input type="submit" value="Send" />
        </form>
      </div>
    </>
  );
};
export default Discussion;
