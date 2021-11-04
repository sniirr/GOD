import React, { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../style/ButtonAppBar.scss";

//material-ui styles
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled } from "@mui/styles";

const MyButton = styled(Button)({
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  color: "grey",
  textTransform: "capitalize",
  padding: "0",
  margin: "0.5em auto 0",
  fontSize: "0.7em",
  alignItems: "baseline",
  fontWeight: 400,
  "&:active": {
    color: "#34aef0",
  },
  "&:hover": {
    color: "#34aef0",
  },
  "&:visited": {
    color: "#34aef0",
  },
});

const ButtonAppBar: FC = () => {
  return (
    <div className="button-app-bar">
      <NavLink to="/" className="nav-links" exact>
        <MyButton>
          <HomeIcon style={{ margin: "0 auto" }} /> Home
        </MyButton>
      </NavLink>

      <NavLink to="/vote" className="nav-links">
        <MyButton>
          <HowToVoteIcon style={{ margin: "0 auto" }} /> Vote
        </MyButton>
      </NavLink>

      <NavLink to="/notifications" className="nav-links">
        <MyButton>
          <NotificationsIcon style={{ margin: "0 auto" }} />
          Notifications
        </MyButton>
      </NavLink>
    </div>
  );
};
export default ButtonAppBar;
