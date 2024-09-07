import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CityTable from './Components/CityTable';
import WeatherPage from './pages/WeatherPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CityTable />} />
        <Route path="/weather/:city" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
};

export default App;

