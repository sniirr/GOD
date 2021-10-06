import { FC } from 'react';
import { Link } from 'react-router-dom';

//controls
import {uploadAsset} from '../../../controlers/assets';

//material UI components
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ImageIcon from '@mui/icons-material/Image';

import { createQuestionProps } from './CreateQuestion';

//Cloudaniry
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";

// https://www.youtube.com/watch?v=Y-VgaRwWS3o

const CreateQuestion3: FC<createQuestionProps> = (props: createQuestionProps) => {
  const { path } = props;

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'god-delib'
    }
  });

  const myImage = cld.image('sample'); 

  myImage.resize(fill().width(250).height(250));




  return (
    <div>
      <div className="wrapper">
        <h1>Cover photo</h1>
        <p>Upload cover photo</p>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="uploadImageCover"
          multiple
          type="file"
          onChange={uploadAsset}
        />
        <label htmlFor="uploadImageCover">
          <div className="uploadPanel">
            <ImageIcon className='accent' />
            <p>UPLOAD HERE</p>
          </div>
        </label >
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