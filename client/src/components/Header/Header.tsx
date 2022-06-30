import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.scss';
import { useAppSelector } from "redux/hooks";
import { userSelector } from "redux/reducers/userReducer";

const Header: FC = () => {
  const history = useHistory();
  const { displayName } = useAppSelector(userSelector)

  return (
    <div className="header">
      <img
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="no one"
      />
      <div>{displayName}</div>
      <Button
        variant="contained"
        style={{
          backgroundColor: 'rgb(204 146 58)',
        }}
        startIcon={
          <AddIcon />
                    }
        onClick={() => {
          history.push('/create_question');
        }}
      >
        Create
      </Button>

    </div>
  );
};
export default Header;
