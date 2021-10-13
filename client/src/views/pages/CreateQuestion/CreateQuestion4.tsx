import { FC } from 'react';
import { Link } from 'react-router-dom';

//material UI components
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { createQuestionProps } from './CreateQuestion';

const CreateQuestion4: FC<createQuestionProps> = (props: createQuestionProps) => {
    const { path } = props;

    return (
        <div>
            <div className="wrapper">
                <h1>Share it</h1>
                <p>This is the moment your idea is sent out to the world. Finish the process by Inviting the people relevant to solving this issue., Together you will reach a better solution.
                </p>

            </div>
            <div className="bottomNavButtons">
                <Link to={`${path}/2`}>
                    <Button variant="outlined" startIcon={<ArrowBackIosIcon />}>Back</Button>
                </Link>
                
            </div>
        </div>
        
    );
}

export default CreateQuestion4;