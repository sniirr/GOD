import React, { FC } from "react";


//material-ui styles
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

const Home: FC = () => {
  return (
    <div className="home-page">
      <div className="buttons">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "/logo.png"}
          width="15%"
          alt="no image"
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
            {" "}
            Create
          </Button>
        </div>
      </div>

      <>
        <h3 className="home-title">Ask. Discuss. Vote. Agree.</h3>
        <div className="para-home">Learn About The Decision-Making Tool</div>
        <div className="para-home">How It Works And How Your Vote</div>
        <div className="para-home">Can Make A Difference</div>

        <img
          className="home-img"
          src={process.env.PUBLIC_URL + "/home-image.png"}
          width="100%"
          alt="no image"
        ></img>

        <div className="learn-more-btn">
          <Button
            variant="outlined"
            style={{
              color: "#34aef0",
              textTransform: "capitalize",
              fontWeight: "bold",
              border: "1px solid",
              fontSize: "0.7em",
              marginTop: "3em",
              padding: "0.2em 1.5em",
            }}
          >
            Learn More
          </Button>
        </div>
      </>
    </div>
  );
};
export default Home;
