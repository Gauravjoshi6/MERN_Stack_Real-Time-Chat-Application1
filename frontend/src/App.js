import React from 'react';
import './App.css';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import MainForm from "./components/MainForm"
import ChatForm from "./components/ChatForm"

function App() {
  return (
    <div>
       <div>
        <Router>
          <Routes>
          <Route index element={<MainForm/>}></Route>
          <Route path='/chat/:roomName' element={<ChatForm/>}></Route>
          <Route path='*' element={<h1>404 not found !</h1>}></Route>
          </Routes>
        </Router>
        
       </div>
    </div>
  );
}

export default App;
