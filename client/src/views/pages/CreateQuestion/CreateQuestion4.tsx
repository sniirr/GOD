import { FC } from 'react';
import { Link } from 'react-router-dom';

//redux 
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectTitle, selectDescription, selectImage } from '../../../redux/reducers/createQuestionReducer';

//material UI components
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';
import WhatsappIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

//Cloudaniry
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

//components
import { createQuestionProps } from './CreateQuestion';

const CreateQuestion4: FC<createQuestionProps> = (props: createQuestionProps) => {
    const { path } = props;

    const title = useAppSelector(selectTitle);
    const description = useAppSelector(selectDescription);
    const image = useAppSelector(selectImage);

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'god-delib'
        }
    });
    let imagePublicId: string = '';
    let myImage;
    if (image.public_id) {
        imagePublicId = image.public_id;
        myImage = cld.image(imagePublicId);
        myImage.resize(fill().width(120));

    }

    return (
        <div>
            <div className="wrapper">
                <h1>Share it</h1>
                <p>This is the moment your idea is sent out to the world. Finish the process by Inviting the people relevant to solving this issue., Together you will reach a better solution.
                </p>
                <div className="share__wrapper">
                    <Button variant="outlined" startIcon={<MailOutlineIcon />}>Share using E-Mail</Button>
                    <Button variant="outlined" startIcon={<WhatsappIcon />}>share using Whatsapp</Button>
                    <div className="share__preview">
                        {myImage ?
                            <div className="share__preview__image">
                                <AdvancedImage cldImg={myImage} />
                            </div> : null
                        }
                        <div className="share__preview__main">
                            <h2>{title}</h2>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bottomNavButtons">
                <Link to={`${path}/3`}>
                    <Button variant="outlined" startIcon={<ArrowBackIosIcon />}>Back</Button>
                </Link>

                <Button variant="contained" endIcon={<CheckCircleIcon />}>finish</Button>


            </div>
        </div>

    );
}

export default CreateQuestion4;