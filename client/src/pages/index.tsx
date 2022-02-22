import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import About from "./About";
import Questions from "./Questions";
import Question from "./Question";
import CreateQuestion from "./CreateQuestion";
import Notifications from "./Notifications";
import Login from "./Login";
import React from "react";

const Fail = () => {
    return(
        <h1>Login failed</h1>
    )
}

const AppRoutes = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path='/questions'>
                        <Questions/>
                    </Route>
                    <Route path='/question/:questionId'>
                        <Question/>
                    </Route>
                    <Route path='/fail'>
                        <Fail/>
                    </Route>
                    <Route path='/create_question'>
                        <CreateQuestion/>
                    </Route>
                    <Route path="/notifications">
                        <Notifications/>
                    </Route>
                    <Route path="/">
                        <Login/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default AppRoutes