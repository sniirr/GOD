import React, { FC } from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";

import CreateQuestion0 from './CreateQuestion0';
import CreateQuestion1 from './CreateQuestion1';
import CreateQuestion2 from './CreateQuestion2';
import CreateQuestion3 from './CreateQuestion3';
import CreateQuestion4 from './CreateQuestion4';

export interface createQuestionProps {
   
}


const CreateQuestion: FC = () => {
 
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

            <Switch >
                <Route exact path={path}>
                    <CreateQuestion0 />
                </Route>
                <Route exact path={`${path}/1`}>
                    <CreateQuestion1 />
                </Route>
                <Route exact path={`${path}/2`}>
                    <CreateQuestion2  />
                </Route>
                <Route exact path={`${path}/3`}>
                    <CreateQuestion3  />
                </Route>
                <Route exact path={`${path}/4`}>
                    <CreateQuestion4 />
                </Route>
            </Switch>

        </div >
    );
}

export default CreateQuestion;
