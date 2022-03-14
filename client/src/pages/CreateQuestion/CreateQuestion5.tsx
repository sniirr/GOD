import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import PublishIcon from '@mui/icons-material/Publish';
// Cloudaniry
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
// functions
import {
  createUpdateQuestion,
  activateQuestion,
} from 'redux/reducers/createQuestionReducer';
import { NextButton, BackButton } from "components/Wizard";
import CreateQuestionProps from './CreateQuestionProps';
import {
  selectTitle,
  selectDescription,
  selectImage,
  setQuestionId,
  setActivate,
} from '../../redux/reducers/createQuestionReducer';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

const CreateQuestion5: FC<CreateQuestionProps> = (
  props: CreateQuestionProps,
) => {
  const { path } = props;

  const history = useHistory();
  const dispatch = useAppDispatch();
  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDescription);
  const image = useAppSelector(selectImage);

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
  }

  const submit = async () => {
    const qid = await createUpdateQuestion(title, description, image);
    dispatch(setQuestionId(qid));
    const activate = await activateQuestion(true, qid)
    dispatch(setActivate(activate));
    history.push('/create_question/success');
  }

  return (
    <div>
      <div className="wrapper">
        <h1>Preview</h1>
        <p className="warnings--text">Review all details and go back editing if needed.</p>
        <div className="preview">
          {myImage && <AdvancedImage cldImg={myImage} />}
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="bottomNavButtons">
        <BackButton linkTo={`${path}/4`} />
        {/* eslint-disable-next-line */}
        <NextButton onClick={submit} text="Publish" Icon={() => <PublishIcon />} />
      </div>
    </div>
  );
};

export default CreateQuestion5;
