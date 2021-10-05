import { FC } from 'react';
import { Link } from 'react-router-dom';

//material UI components
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ImageIcon from '@mui/icons-material/Image';

import { createQuestionProps } from './CreateQuestion';

const CreateQuestion3: FC<createQuestionProps> = (props: createQuestionProps) => {
  const { path } = props;

  return (
    <div>
      <div className="wrapper">
        <h1>Cover photo</h1>
        <p>Upload cover photo</p>
        <div className="uploadPanel">
          <ImageIcon className='accent'/>
          <p>UPLOAD HERE</p>
        </div>
        <div className="bottomNavButtons">
          <Link to={`${path}/2`}>
            <Button variant="outlined" startIcon={<ArrowBackIosIcon />}>Back</Button>
          </Link>
          <Link to={`${path}/4`}>
            <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>Next</Button>
          </Link>
        </div>
      </div>
    </div >
  );
}

export default CreateQuestion3;