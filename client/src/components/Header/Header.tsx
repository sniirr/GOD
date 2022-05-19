import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.scss';
import OrganizationPicker from "../OrganizationPicker";

const Header: FC = () => {
  const history = useHistory();

  return (
    <div className="header">
      <img
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="no one"
      />
      <OrganizationPicker />
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
