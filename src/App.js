import React from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Navigation from './Navigation';
import Error from './Error';
import TeamMemberDetail from './[id]';
function App() {
  return (
    <Router>
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/est/about" element={<About />} />

        <Route path="/team/:id" element={<TeamMemberDetail/>} />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
