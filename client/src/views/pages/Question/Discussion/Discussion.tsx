import React, { FC, useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import axios from 'axios';
import io from "socket.io-client";

const Discussion: FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questiontitle,setQuestiontitle] = useState("")
  const [question, setQuestion] = useState("");
  const hendelTapTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    axios.post('/questions/get-all', {})
      .then(({ data }) => {
        console.log(data.result);
        setQuestions(data.result);
      }).catch(e => {
        console.error(e)
      })
  }, [])

  const socket =io("ws://localhost:5000");
  socket.on("chat", data => {
    socket.send("message");
 
  });
  
  const handleChangetitle =(e: { target: { value: React.SetStateAction<string>; }; })=> {

    setQuestiontitle(e.target.value)
   
  }
  const handleChange =(e: { target: { value: React.SetStateAction<string>; }; })=> {

    setQuestion(e.target.value)
   
  }
  const sendMessage = (message:string)=>{
    setQuestion(message);
   socket.send(question);
  };
  socket.on("connect", () => {
    // either with send()
    // socket.send("first comment !");
    // socket.send("second comment !");
    // // or with emit() and custom event names
    socket.emit("salutations", "chat!", { "mr": "jzzohn" }, Uint8Array.from([1, 2, 3, 4]));
    
  });
  
  // handle the event sent with socket.send()
 
  
  // handle the event sent with socket.emit()
  socket.on("greetings", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });



  return (
    <>

      <div className="TabsWrapper">
        <Tabs variant="scrollable" scrollButtons="auto"
          value={selectedTab} onChange={hendelTapTab} TabIndicatorProps={{
            style: {
              backgroundColor: "#21DCA2",

            }
          }} >
          <Tab label={<span style={{ color: 'rgb(15,52,79)', textTransform: "none" }}>My Questions</span>} />
          <Tab label={<span style={{ color: 'rgb(15,52,79)', textTransform: "none" }}>Ongoing</span>} />
          <Tab label={<span style={{ color: 'rgb(15,52,79)', textTransform: "none" }}>Pending</span>} />

        </Tabs>


      </div >
      <div className="voteListWrapper">

        {selectedTab === 0 && <div className="voteList">
          
        </div>}

        {selectedTab === 1 && <div className="voteList">
      
        </div>}

        {selectedTab === 2 && <div className="inProgress">Pending Page</div>}

   

      </div>
<div > <ul id="messages"></ul>
    <form id="form" action="">
     <caption>title</caption> <input id="input" autoComplete="off" value={questiontitle} onChange={handleChangetitle} />
      
     <caption>description</caption> <textarea  id="textarea" autoComplete="off" value={question} onChange={handleChange} />
      
      
      <button onClick={(event) => { event.preventDefault();
         sendMessage(question)
}}>Send</button>
    </form></div>
    </>
  );
};
export default Discussion;


