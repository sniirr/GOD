import React, { FC } from 'react';
import { Link } from 'react-router-dom';

// redux

// controls

// componens

// material UI components
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ImageIcon from '@mui/icons-material/Image';

// Cloudaniry
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import CreateQuestionProps from './CreateQuestionProps';
import Loader from '../../components/Loader/Loader';
import { uploadFileThunk, selectLoader, selectImage } from '../../redux/reducers/createQuestionReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

// https://www.youtube.com/watch?v=Y-VgaRwWS3o

const CreateQuestion3: FC<CreateQuestionProps> = (props: CreateQuestionProps) => {
  const dispatch = useAppDispatch();
  const loader = useAppSelector(selectLoader);
  const image = useAppSelector(selectImage);
  const { path } = props;

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'god-delib',
    },
  });
  let imagePublicId: string = '';
  let myImage;
  if (image.public_id) {
    imagePublicId = image.public_id;
    myImage = cld.image(imagePublicId);
    myImage.resize(fill().height(250));
  }

  // helpers functions
  function uploadFile(ev: any) {
    const file = ev.target.files[0];
    dispatch(uploadFileThunk(file));
  }

  return (
    <div>
      <div className="wrapper">
        <h1>Cover photo (optional)</h1>
        <p>Upload cover photo</p>
        <div className="uploadPanel__wrapper">
          {myImage
            ? <AdvancedImage cldImg={myImage} />
            : (
              <>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="uploadImageCover"
                  multiple
                  type="file"
                  onChange={uploadFile}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="uploadImageCover">
                  <div className="uploadPanel">
                    <ImageIcon className="accent" />
                    <p>UPLOAD HERE</p>
                  </div>
                </label>
              </>
            )}
          {loader
            ? (
              <div className="uploadPanel__loader">
                <Loader />
              </div>
            )
            : null}
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
    </div>
  );
};

export default CreateQuestion3;
