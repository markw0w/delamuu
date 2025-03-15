import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './views/HomeView';
import OrderView from './views/OrderView';
import ScrollToTop from "./utils/ScrollToTop";
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <Router className="router">
      <ScrollToTop/>
      <HeaderComponent />
        <main>
          <Routes id="routes">
            <Route id="route" path="/" element={<HomeView/>}/>
            <Route path="/order/:product" element={<OrderView />} />
          </Routes>
        </main>
      <FooterComponent />
    </Router>
  );
}

export default App;