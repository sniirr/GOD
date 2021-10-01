import React, { FC, ReactElement, useState } from 'react';
import {
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import { PageTransition } from '@steveeeie/react-page-transition';

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
            <Route
                render={({ location }) => {
                    return (
                        <PageTransition
                            preset="moveToLeftFromRight"
                            transitionKey={location.pathname}
                        >
                            <Switch location={location}>
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
                        </PageTransition>
                    );
                }}
           />
        </div >
    );
}

export default CreateQuestion;
