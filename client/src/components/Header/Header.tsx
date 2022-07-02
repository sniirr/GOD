import React, { FC } from 'react';
import './Header.scss';
import ShareIcon from '@mui/icons-material/Share';

const Header: FC = () => {
  return (
    <div className="header">
      <img
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="no one"
      />
      <ShareIcon />
    </div>
  );
};
export default Header;
