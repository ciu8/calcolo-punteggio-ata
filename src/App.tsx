import React from 'react';
import { RecoilRoot } from 'recoil';
import './App.css';
import Navbar from './components/Navbar';
import FormCalcolatore from './components/FormCalcolatore';

function App() {
  return (
    <div className="container is-fluid">
      <RecoilRoot>
        <Navbar />
        <FormCalcolatore />
      </RecoilRoot>
    </div>
  );
}

export default App;
