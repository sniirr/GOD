import {FC}  from 'react';

import {createQuestionProps} from './CreateQuestion';

import Button from '@mui/material/Button';

const CreateQuestion1:FC<createQuestionProps> = (props: createQuestionProps)=> {
    const {position, setPosition} = props;
   

  return (
    <div>
      <h1>CreateQuestion 1 :{position}</h1>
      <Button onClick={()=>{setPosition(position+1)}}>Next</Button>
    </div>
  );
}

export default CreateQuestion1;