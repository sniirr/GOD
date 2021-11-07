import React, { FC } from "react";


//material-ui styles
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

const Vote: FC = () => {
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

      <div className="vote-list">


        <div className="card">
          <div className="card__image">
            <div className="card__status"></div>
            <img src={process.env.PUBLIC_URL + "https://picsum.photos/350/200"}></img>

            <div className="card__title">



            </div>
          </div>
          <div className="card__info">



          </div>

        </div>

      </div>
    </>
  );
};
export default Vote;
