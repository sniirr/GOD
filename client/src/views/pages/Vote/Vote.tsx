import React, { FC, useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Tabs, Tab } from "@mui/material";
import VoteCard from "../../components/VoteCard/VoteCard";


//redux
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getQuestionsThunk,allQuestions} from '../../../redux/reducers/questionsReducers';

// const useStyles = makeStyles({
//   div: {
//     color: "blue",

//   }
// });


export interface Group {
  status: string;
  votes: number;
  title: string;
  questionId: string;
}

const Vote: FC = () => {
  const dispatch = useAppDispatch();

  const [selectedTab, setSelectedTab] = useState(0);
  const questions = useAppSelector(allQuestions)
  const hendelTapTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
   
    dispatch(getQuestionsThunk());
  }, [])// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <div className="buttons">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="logo"

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

        {questions.map((item, i) => <VoteCard key={i} info={item} />)}
        {/* {selectedTab === 1>Ongoing Page</div>}
        {selectedTab === 2 && <div className="inProgress">Pending Page</div>}
         {selectedTab === 3 && <div className="inProgress">Past Pages</div>} */}
      </div>

    </>
  );
};
export default Vote;
