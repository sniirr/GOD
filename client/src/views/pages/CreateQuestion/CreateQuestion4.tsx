import { FC } from 'react';
import { Link } from 'react-router-dom';

//material UI components
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';
import WhatsappIcon from '@mui/icons-material/WhatsApp';
import GoogleIcon from '@mui/icons-material/Google';

import { createQuestionProps } from './CreateQuestion';

const CreateQuestion4: FC<createQuestionProps> = (props: createQuestionProps) => {
    const { path } = props;

    return (
        <div>
            <div className="wrapper">
                <h1>Share it</h1>
                <p>This is the moment your idea is sent out to the world. Finish the process by Inviting the people relevant to solving this issue., Together you will reach a better solution.
                </p>
                <div className="share__wrapper">
                    <Button variant="outlined" startIcon={<GoogleIcon />}>Share using Gmail</Button>
                    <Button variant="outlined" startIcon={<WhatsappIcon />}>share using Whatsapp</Button>
                </div>

            </div>
            <div className="bottomNavButtons">
                <Link to={`${path}/3`}>
                    <Button variant="outlined" startIcon={<ArrowBackIosIcon />}>Back</Button>
                </Link>

                <Button variant="contained" endIcon={<SaveIcon />}>Save & Close</Button>


            </div>
        </div>

    );
}

export default CreateQuestion4;