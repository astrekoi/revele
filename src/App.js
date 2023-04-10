import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Homework1 from './pages/Homework1';
import Homework2 from './pages/Homework2';
import Homework3 from './pages/Homework3';
import Navbar from './Navbar';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/homework1" element={<Homework1 />} />
          <Route path="/homework2" element={<Homework2 />} />
          <Route path="/homework3" element={<Homework3 />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;