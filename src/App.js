import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './views/HomeView';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <Router className="router">
      <HeaderComponent />
        <main>
          <Routes id="routes">
            <Route id="route" path="/" element={<HomeView/>}/>
          </Routes>
        </main>
      <FooterComponent />
    </Router>
  );
}

export default App;