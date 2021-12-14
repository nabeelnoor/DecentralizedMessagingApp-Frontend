import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './main';
import Register from './register';
import {createBrowserHistory} from 'history';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Chat from './chat';
const history = createBrowserHistory({basename : `${process.env.PUBLIC_URL}`});

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={history}>
      <Routes>
        <Route path="register" caseSensitive={false} element={<Register />} />
        <Route path="/" caseSensitive={false} element={<Main />} />
        <Route path="chat" caseSensitive={false} element={<Chat />} />
      </Routes>
    </Router>
      )  
    }
};


ReactDOM.render(<App />, document.querySelector('#root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
