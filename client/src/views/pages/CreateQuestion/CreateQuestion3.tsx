import {FC}  from 'react';
import Button from '@mui/material/Button';
import {createQuestionProps} from './CreateQuestion';

const CreateQuestion3:FC<createQuestionProps> = (props: createQuestionProps)=> {
   

  return (
    <div>
      <h1>CreateQuestion 3</h1>
      <Button onClick={()=>{}}>Next</Button>
    </div>
  );
}

export default CreateQuestion3;