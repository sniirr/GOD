import React, { FC, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import "./Question.scss";

//components
import Discussion from "./Discussion/Discussion";

export interface QuestionProps {
  info?: any;
}

const Question: FC<QuestionProps> = (props: QuestionProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const hendelTapTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <div className="TabsWrapper">
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          style={{
            width: "100%",
          }}
          value={selectedTab}
          onChange={hendelTapTab}
          TabIndicatorProps={{
            style: { backgroundColor: "#21DCA2" },
          }}>
          <Tab
            style={{
              width: "33%",
            }}
            label={
              <span style={{ color: "rgb(15,52,79)", textTransform: "none" }}>
                Question & Solutions
              </span>
            }
          />
          <Tab
            style={{
              width: "33%",
            }}
            label={
              <span style={{ color: "rgb(15,52,79)", textTransform: "none" }}>
                Discussion
              </span>
            }
          />
          <Tab
            style={{
              width: "33%",
            }}
            label={
              <span style={{ color: "rgb(15,52,79)", textTransform: "none" }}>
                Vote
              </span>
            }
          />
        </Tabs>
      </div>
      <div className="voteListWrapper">
        {selectedTab === 0 && (
          <div>
            <h2>Question and solutions</h2>
          </div>
        )}

        {selectedTab === 1 && <div><Discussion/></div>}

        {selectedTab === 2 && 
        <div>
          <h2>Votes</h2>
          </div>}
      </div>
    </>
  );
};
export default Question;
