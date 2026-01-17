import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page Route */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Real Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;