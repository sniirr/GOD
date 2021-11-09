import React, { FC, useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Tabs, Tab, makeStyles } from "@mui/material";
import VoteCard from "../../components/VoteCard/VoteCard";
import axios from 'axios';

// const useStyles = makeStyles({
//   div: {
//     color: "blue",

//   }
// });


export interface Group{
  status: string;
  votes: number;
  title: string;
  questionId: string;
}

const mockGroups:Array<Group> = [{
  status: "Draft",
  votes: 0,
  title: "Rainforest global responsibility",
  questionId: '1'
}, {
  status: "Draft",
  votes: 0,
  title: "Rainforest global responsibility",
  questionId: '2'
}, {
  status: "Published",
  votes: 55,
  title: "Inequality During Pandemic",
  questionId: '3'
}]


const Vote: FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [questions, setQuestions] =useState([]);
  const hendelTapTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const myColor = () => {
    let myColor = "";
    if (selectedTab === 0) {
      myColor = "blue";
    } else if (selectedTab === 1) {
      myColor = "red";
    } else {
      myColor = "green";
    }
    return myColor;
  }


  useEffect(()=>{
    axios.post('/questions/get-all',{})
    .then(({data})=>{
      console.log(data.result);
      setQuestions(data.result);
    }).catch(e=>{
      console.error(e)
    })
  },[])


  return (
    <>
      <div className="buttons">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "/logo.png"}

        ></img>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            style={{
              borderRadius: 10,
              backgroundColor: "rgb(204 146 58)",
              textTransform: "capitalize",
              fontFamily: "sans-serif",
              height: "1.5em",
              marginRight: "1em",
              fontSize: "0.8em",
              paddingTop: "0.7em",
              letterSpacing: "0",
              width: "6em",
            }}
            startIcon={
              <AddIcon
                style={{ fontSize: "1.2em", padding: "0 0 0.1em 0.5em" }}
              />
            }
          >
            Create
          </Button>
        </div>
      </div>

      <div className="TabsWrapper">
        <Tabs  value={selectedTab} onChange={hendelTapTab} TabIndicatorProps={{
          style: {
            backgroundColor: "#21DCA2",
          }
        }} >
          <Tab label={<span style={{ color: 'rgb(15,52,79)', textTransform: "none" }}>My Questions</span>} />
          <Tab label={<span style={{ color: 'rgb(15,52,79)', textTransform: "none" }}>Ongoing</span>} />
          <Tab label={<span style={{ color: 'rgb(15,52,79)', textTransform: "none" }}>Pending</span>} />
          <Tab label={<span style={{ color: 'rgb(15,52,79)', textTransform: "none" }}>Past</span>} />

        </Tabs>

      </div >
      <div className="voteListWrapper">
        {selectedTab === 0 && <div className="voteList">
          {questions.map((item, i) => <VoteCard key={i} info={item} />)}

        </div>}
        {selectedTab === 1 && <div className="inProgress">Ongoing Page</div>}
        {selectedTab === 2 && <div className="inProgress">Pending Page</div>}
        {selectedTab === 3 && <div className="inProgress">Past Pages</div>}
      </div>

    </>
  );
};
export default Vote;
