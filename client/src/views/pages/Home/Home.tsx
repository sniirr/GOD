import React, { FC } from "react";
import { useHistory } from "react-router-dom";

//material-ui styles
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

const Home: FC = () => {
  const history = useHistory();


  return (
    <div className="home__page">
      <div className="home__header">
        <div className='home__header__logo'>
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="no image"
          ></img>
        </div>
        <div className="home__header__add">
          <Button
            variant="contained"
            style={{
              backgroundColor: "rgb(204 146 58)",
            }}
            startIcon={
              <AddIcon />
            }
            onClick={()=>{history.push('/create_question')}}
          >
            Create
          </Button>
        </div>
      </div>

      <div className="home__main">
        <h3 className="home__title">Ask. Discuss. Vote. Agree.</h3>
        <div className="home__para">Learn About The Decision-Making Tool</div>
        <div className="home__para">How It Works And How Your Vote</div>
        <div className="home__para">Can Make A Difference</div>

        <img
          className="home-img"
          src={process.env.PUBLIC_URL + "/home-image.png"}
          width="100%"
          alt="no image"
        ></img>

        <div className="home__learnMore">
          <Button
            variant="outlined"
            style={{color: "#34aef0"}}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Home;
