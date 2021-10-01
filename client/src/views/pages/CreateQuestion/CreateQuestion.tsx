import React, { FC, ReactElement, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

import CreateQuestion1 from './CreateQuestion1';
import CreateQuestion2 from './CreateQuestion2';
import CreateQuestion3 from './CreateQuestion3';
import CreateQuestion4 from './CreateQuestion4';

export interface createQuestionProps {
    position: number;
    setPosition: React.Dispatch<React.SetStateAction<number>>;
}


const CreateQuestion: FC = () => {
    const [position, setPosition] = useState(1);
    let { path, url } = useRouteMatch();

    return (
        <div>
            <ul>
                <li>
                    <Link to={`${url}/1`}>1</Link>
                </li>
                <li>
                    <Link to={`${url}/2`}>2</Link>
                </li>
                <li>
                    <Link to={`${url}/3`}>3</Link>
                </li>
                <li>
                    <Link to={`${url}/4`}>4</Link>
                </li>
            </ul>
            <Switch>
                <Route exact path={path}>
                    <h3>Please select a topic.</h3>
                </Route>
                <Route exact path={`${path}/1`}>
                    <CreateQuestion1 position={position} setPosition={setPosition} />
                </Route>
                <Route exact path={`${path}/2`}>
                    <CreateQuestion2 position={position} setPosition={setPosition} />
                </Route>
                <Route exact path={`${path}/3`}>
                    <CreateQuestion3 position={position} setPosition={setPosition} />
                </Route>
                <Route exact path={`${path}/4`}>
                    <CreateQuestion4 position={position} setPosition={setPosition} />
                </Route>
            </Switch>
        </div>
    );
}

const Topic: FC = () => {
  
    let { topicId } = useParams<{ topicId: string }>();

    return (
        <div>
            <h3>{topicId}</h3>
        </div>
    );
}

// eslint-disable-next-line
function setPage(position: number, setPosition: React.Dispatch<React.SetStateAction<number>>): ReactElement {
    console.log(position);

    switch (position) {
        case 1: return <CreateQuestion1 position={position} setPosition={setPosition} />;
        case 2: return <CreateQuestion2 position={position} setPosition={setPosition} />;
        case 3: return <CreateQuestion3 position={position} setPosition={setPosition} />;
        case 4: return <CreateQuestion4 position={position} setPosition={setPosition} />;
        default: return <CreateQuestion1 position={position} setPosition={setPosition} />;
    }
}


export default CreateQuestion;
