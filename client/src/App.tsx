import React, {useEffect} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
// import io from "socket.io-client";

import './style/App.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



//components
import Login from './pages/Login/Login';
import CreateQuestion from './pages/CreateQuestion/CreateQuestion';
import About from './pages/About/About';
import Notifications from './pages/Notifications/Notifications';
import { theme } from './style/Theme';
import Questions from './pages/Questions/Questions';
import Question from './pages/Question/Question';
// import { Message } from "redux/reducers/chatReducer";
// import {useAppDispatch} from "./redux/hooks";
import {disconnectSocket, initiateSocket} from "./utils/socket";

// let socket: any = null

function App() {

  // const dispatch = useAppDispatch();

  useEffect(() => {
    initiateSocket()
   //  debugger
   //  socket = io()
   // //listen to messges
   //    socket.on("message", (msg:Message) => {
   //      console.log("message", msg);
   //      // if (msg) {
   //      //   dispatch(addMessage(msg));
   //      // }
   //    });
   //
   //  socket.onAny((eventName: any, ...args: any) => {
   //    console.log("socket event", eventName);
   //    // if (msg) {
   //    //   dispatch(addMessage(msg));
   //    // }
   //  });

    return ()=>{
      disconnectSocket()
      // socket.offAny()
      // socket.removeAllListeners("message");
    }
  }, []);

  return (
      <Router>
        <div>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path='/questions'>
              <Questions />
            </Route>
            <Route path='/question/:questionId'>
              <Question />
            </Route>
            <Route path='/fail'>
              <Fail />
            </Route>
            <Route path='/create_question'>
              <CreateQuestion />
            </Route>
            <Route path="/notifications">
              <Notifications />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

const AppContainer = () => {
  return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App/>
        </ThemeProvider>
      </Provider>

  )
}

export default AppContainer;


function Fail(){
  return(
    <h1>Login failed</h1>
  )
}

