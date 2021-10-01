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
import TopIndecator from '../../components/TopIndicator/TopIndecator';

export interface createQuestionProps {

}


const CreateQuestion: FC = () => {

    let { path } = useRouteMatch();
    const pages = ['1', '2', '3', '4'];

    return (
        <div>


            <Switch >
                <Route exact path={path}>

                    <CreateQuestion0 />
                </Route>
                <Route exact path={`${path}/1`}>
                    <TopIndecator pages={pages} path={path} />
                    <CreateQuestion1 />
                </Route>
                <Route exact path={`${path}/2`}>
                    <TopIndecator pages={pages}  path={path} />
                    <CreateQuestion2 />
                </Route>
                <Route exact path={`${path}/3`}>
                    <TopIndecator pages={pages}  path={path} />
                    <CreateQuestion3 />
                </Route>
                <Route exact path={`${path}/4`}>
                    <TopIndecator pages={pages}  path={path} />
                    <CreateQuestion4 />
                </Route>
            </Switch>

        </div >
    );
}

export default CreateQuestion;
