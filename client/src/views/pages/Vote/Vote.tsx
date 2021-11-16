import React, { FC, useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import VoteCard from "../../components/VoteCard/VoteCard";
import axios from 'axios';
import Buttons from "../../components/Buttons/Buttons";

const Vote: FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [questions, setQuestions] = useState([]);
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


  return (
    <>
      <Buttons />

      <div className="TabsWrapper">
        <Tabs value={selectedTab} onChange={hendelTapTab} TabIndicatorProps={{
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

        {selectedTab === 1 && <div className="voteList">
          {questions.filter((item: any) => item.active).map((item, i) => <VoteCard key={i} info={item} />)}
        </div>}

        {selectedTab === 2 && <div className="inProgress">Pending Page</div>}

        {selectedTab === 3 && <div className="voteList">
          {questions.filter((item: any) => !item.active).map((item, i) => <VoteCard key={i} info={item} />)}
        </div>}

      </div>

    </>
  );
};
export default Vote;
