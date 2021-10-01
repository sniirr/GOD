import { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  decrement,
  increment,
  selectCount,
} from '../../../redux/reducers/createQuestionReducer';
import { createQuestionProps } from './CreateQuestion';
//matrial UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



const CreateQuestion1: FC<createQuestionProps> = (props: createQuestionProps) => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  let { path } = useRouteMatch();

  return (
    <div>
      <div className="wrapper">
        <h1>What is the Issue/problem/question you would like to present?</h1>
        <p>This will be the header, which will appear at the top. Keep the description short and to the point.</p>
        < TextField id="standard-basic" label="User name" variant="standard" type="text" name='username' />
      </div>
      <div className="bottomNavButtons">
        <Link to={`${path}/2`}>
          <Button variant="contained">Next</Button>
        </Link>
      </div>
    </div>
  );
}

export default CreateQuestion1;