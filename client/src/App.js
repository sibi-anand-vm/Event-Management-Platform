import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import EventPage from './pages/EventPage';
import EventDetailsPage from './pages/Eventdetailpage';
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute element={AdminDashboard} />} />
          <Route path="/events" element={<ProtectedRoute element={EventPage} />} />
          <Route path="/events/:id" element={<ProtectedRoute element={EventDetailsPage} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
