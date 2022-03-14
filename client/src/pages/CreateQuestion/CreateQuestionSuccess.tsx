import React, { FC, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
// material UI components
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import WhatsappIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// Cloudaniry
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
// functions
import {
  createUpdateQuestion,
  activateQuestion,
} from 'redux/reducers/createQuestionReducer';
import { EmailShareButton, WhatsappShareButton } from 'react-share';
import CreateQuestionProps from './CreateQuestionProps';
import {
  selectQuestionId,
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
  const questionId = useAppSelector(selectQuestionId);
  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDescription);
  const image = useAppSelector(selectImage);
  const domain = window.location.hostname;

  const saveDraft = useCallback(async () => {
    // save question as draft
    const qid = await createUpdateQuestion(title, description, image);
    dispatch(setQuestionId(qid));
    // eslint-disable-next-line
  }, [])

  const publishDraft = async () => {
    if (typeof questionId !== 'string') return

    const activate = await activateQuestion(true, questionId)
    dispatch(setActivate(activate));
    history.push('/create_question/success');
  }

  // useEffect(() => {
  //   // save question as draft
  //   saveDraft()
  // }, [saveDraft]);

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
    myImage.resize(fill().width(120));
  }

  return (
    <div>
      <div className="wrapper">
        <h1>Share it</h1>
        <p>
          This is the moment your idea is sent out to the world. Finish the
          process by Inviting the people relevant to solving this issue.,
          Together you will reach a better solution.
        </p>
        <div className="share__wrapper">
          <Button variant="outlined" startIcon={<MailOutlineIcon />}>
            <EmailShareButton url={`${domain}/question/${questionId}`} subject={`Please join me in answering the following question: ${title}`}>
              Share using E-Mail
            </EmailShareButton>
          </Button>
          <Button variant="outlined" startIcon={<WhatsappIcon />}>
            <WhatsappShareButton url={`${domain}/question/${questionId}`} title={`Please join me in answering the following question: ${title}`}>
              Share using Whatsapp
            </WhatsappShareButton>
          </Button>
          <div className="share__preview">
            {myImage ? (
              <div className="share__preview__image">
                <AdvancedImage cldImg={myImage} />
              </div>
            ) : null}
            <div className="share__preview__main">
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomNavButtons">
        <Link to={`${path}/3`}>
          <Button variant="outlined" startIcon={<ArrowBackIosIcon />}>
            Back
          </Button>
        </Link>

        <Button
          variant="contained"
          endIcon={<CheckCircleIcon />}
          onClick={publishDraft}
        >
          finish
        </Button>
      </div>
    </div>
  );
};

export default CreateQuestion5;
