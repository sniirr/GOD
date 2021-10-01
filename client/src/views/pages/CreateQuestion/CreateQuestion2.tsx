import { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  selectCount,
  selectDescription,
  setDescription
} from '../../../redux/reducers/createQuestionReducer';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { createQuestionProps } from './CreateQuestion';

const CreateQuestion2: FC<createQuestionProps> = (props: createQuestionProps) => {

  const description = useAppSelector(selectDescription);
  const dispatch = useAppDispatch();
  let { path } = props;

  return (
    <div>
      <div className="wrapper">
        <h1>Why is this important?</h1>
        <p>This is your call to action, the place to describe the issue and emphasize the importance of participating and voting in this discussion. This is your opportunity to interest the group and pull them in. </p>
        < TextField
          id="standard-basic"
          defaultValue={description}
          label="Description"
          multiline rows={7}
          variant="outlined"
          fullWidth
          type="text"
          name='username'
          onChange={e => dispatch(setDescription(e.target.value))} />
      </div>
      <div className="bottomNavButtons">
        <Link to={`${path}/2`}>
          <Button variant="contained">Next</Button>
        </Link>
        <Link to={`${path}/1`}>
          <Button variant="outlined">Back</Button>
        </Link>
      </div>
    </div>
  );
}

export default CreateQuestion2;