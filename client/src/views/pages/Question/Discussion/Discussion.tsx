import React, { FC, useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import axios from "axios";
import io from "socket.io-client";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";

//redux
import { addMessage } from "../../../../redux/reducers/chatReducer";

//interfaces
import { Message } from "../../../../redux/reducers/chatReducer";
const socket = io();

const Discussion: FC = () => {
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
    // axios
    //   .post("/questions/get-all", {})
    //   .then(({ data }) => {
    //     console.log(data.result);
    //     setQuestions(data.result);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });

    // socket.on("chat", (data) => {
    //   socket.send("message");
    // });

    // socket.on("connect", () => {
    //   // either with send()
    //   // socket.send("first comment !");
    //   // socket.send("second comment !");
    //   // // or with emit() and custom event names
    //   socket.emit(
    //     "salutations",
    //     "chat!",
    //     { mr: "jzzohn" },
    //     Uint8Array.from([1, 2, 3, 4])
    //   );
    // });

    // handle the event sent with socket.send()

    // handle the event sent with socket.emit()
    socket.on("message", (msg:Message) => {
      console.log("message", msg);
      if (msg) {
        dispatch(addMessage(msg));
      }
    });
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
  // const sendMessage = (message:string)=>{
  //   setQuestion(message);
  //  socket.send(question);
  // };

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
      const parentId = "parentId2";
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
