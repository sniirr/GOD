import React, { FC } from "react";



//material-ui styles
import AddIcon from "@mui/icons-material/Add";
import { Button, Tabs, Tab } from "@mui/material";


const Vote: FC = () => {
  const hendelTapTab = () => { }
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
        <Tabs value={0} onChange={hendelTapTab}>
          <Tab label="My Questions" />
          <Tab label="Ongoing" />
          <Tab label="Pending" />
          <Tab label="Past" />
        </Tabs>
      </div>

      <div className="vote-list">

        <div className="card">
          <div className="card__image">
            <div className="card__title">Rainforest global responsibility</div>
            <div className="card__status"> Draft </div>
            <img src={process.env.PUBLIC_URL + "https://picsum.photos/350/200"}></img>
          </div>
          <div className="card__info">Back to Edit</div>
        </div>
      </div>
    </>
  );
};
export default Vote;
