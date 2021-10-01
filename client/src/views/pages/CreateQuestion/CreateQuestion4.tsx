import { FC } from 'react';
import Button from '@mui/material/Button';

import { createQuestionProps } from './CreateQuestion';

const CreateQuestion4: FC<createQuestionProps> = (props: createQuestionProps) => {
    const { position, setPosition } = props;

    return (
        <div>
            <h1>CreateQuestion 4</h1>
            <Button onClick={()=>{setPosition(1)}}>Next</Button>
        </div>
    );
}

export default CreateQuestion4;