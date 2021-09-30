import {FC}  from 'react';
import Button from '@mui/material/Button';
import {createQuestionProps} from './CreateQuestion';

const CreateQuestion3:FC<createQuestionProps> = (props: createQuestionProps)=> {
    const {position, setPosition} = props;

  return (
    <div>
      <h1>CreateQuestion {position}</h1>
      <Button onClick={()=>{setPosition(position+1)}}>Next</Button>
    </div>
  );
}

export default CreateQuestion3;