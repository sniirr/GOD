import React from 'react';
import logo from './logo.svg';
import './style/App.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Login from './views/pages/Login/Login'

function App() {
  return (
    <div className="App">
      <Login />
    </div >
  );
}

export default App;
