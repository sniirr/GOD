import {FC}  from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  decrement,
  increment,
   selectCount,
} from '../../../redux/reducers/createQuestionReducer';
import {createQuestionProps} from './CreateQuestion';

import Button from '@mui/material/Button';

const CreateQuestion1:FC<createQuestionProps> = (props: createQuestionProps)=> {
      const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>CreateQuestion 1</h1>
      <Button onClick={()=>{dispatch(increment())}}>Next {count}</Button>
      <Button onClick={()=>{dispatch(decrement())}}>Back {count}</Button>
    </div>
  );
}

export default CreateQuestion1;