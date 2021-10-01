import React, { FC, ReactElement, useState } from 'react';
<<<<<<< HEAD
=======
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { PageTransition } from '@steveeeie/react-page-transition'
>>>>>>> dev2

import CreateQuestion1 from './CreateQuestion1';
import CreateQuestion2 from './CreateQuestion2';
import CreateQuestion3 from './CreateQuestion3';
import CreateQuestion4 from './CreateQuestion4';

export interface createQuestionProps {
    position: number;
    setPosition:React.Dispatch<React.SetStateAction<number>>;
}


const CreateQuestion: FC = () => {
    const [position, setPosition] = useState(1);

    return (
        <div>
            {setPage(position, setPosition)}
        </div>
    );
}

// eslint-disable-next-line
function setPage (position:number, setPosition:React.Dispatch<React.SetStateAction<number>>):ReactElement {
    console.log(position);

    switch(position){
        case 1: return <CreateQuestion1 position={position} setPosition={setPosition}/>;
        case 2: return <CreateQuestion2 position={position} setPosition={setPosition}/>;
        case 3: return <CreateQuestion3 position={position} setPosition={setPosition}/>;
        case 4: return <CreateQuestion4 position={position} setPosition={setPosition}/>;
        default: return <CreateQuestion1 position={position} setPosition={setPosition} />;
    }
}


export default CreateQuestion;
