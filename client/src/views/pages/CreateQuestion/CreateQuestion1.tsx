import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  selectTitle,
  setTitle
} from '../../../redux/reducers/createQuestionReducer';

//matrial UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import {createQuestionProps} from './CreateQuestion';


const CreateQuestion1: FC<createQuestionProps> = (props: createQuestionProps) => {
 
  const title = useAppSelector(selectTitle);
  const dispatch = useAppDispatch();
  const { path } = props;

  return (
    <div>
      <div className="wrapper">
        <h1>What is the Issue / problem / question you would like to present?</h1>
        <p>This will be the title, which will appear at the top. Keep the description short and to the point.</p>
        < TextField id="standard-basic" defaultValue={title} label="Question Title" multiline rows={3} variant="outlined" fullWidth type="text" name='username' onChange={e => dispatch(setTitle(e.target.value))} />
      </div>
      <div className="bottomNavButtons">
        <Link to={`${path}/2`}>
          <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>Next</Button>
        </Link>
      </div>
    </div>
  );
}

export default CreateQuestion1;