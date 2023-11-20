// AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Multiple from './App';
import OutputPage from './outputpage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Multiple />} />
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
