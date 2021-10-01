import {FC}  from 'react';
import Button from '@mui/material/Button';

import {createQuestionProps} from './CreateQuestion';

const CreateQuestion2:FC<createQuestionProps> = (props: createQuestionProps)=> {
    const {position, setPosition} = props;

  return (
    <div>
      <h1>CreateQuestion 2</h1>
      
      <Button onClick={()=>{setPosition(position+1)}}>Next</Button>
    </div>
  );
}

export default CreateQuestion2;