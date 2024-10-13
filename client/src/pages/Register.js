import { useState } from 'react';
import axiosInstance from '../services/api.js'
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [credentials, setCredentials] = useState({ username: '', email: '', role: '', password: '' });
  const [adminField, setAdminField] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const Registerbtnclicked = async () => {
    const currentDate = new Date().toISOString().split('T')[0]; 
    if (!credentials.username || !credentials.email || !credentials.password) {
      alert('All fields are required');
      return;
    }
    if (credentials.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    if (adminField && adminField !== currentDate) {
      alert("Invalid Admin Key Entered");
      return;
    }


    const role = adminField === currentDate ? 'admin' : 'user';
    if (role === 'user') {
      const proceedAsUser = window.confirm('Are you sure to register as User?');
      if (!proceedAsUser) {
        return; 
      }
    }

    try {
      const response = await axiosInstance.post('/users/register', {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
        role
      });

      if (response.status === 201) {
        const confirmed = window.confirm('Account Created Successfully. Click OK to continue.');
        if (confirmed) {
          navigate('/login');
        }
      } else if (response.status === 400 && response.data.message === 'User already exists') {
        alert('User Already Exists');
      } else {
        alert('Invalid user data or some problem occurred.');
      }
    } catch (error) {
      const errorMessage = error.response?.data.message || 'An error occurred. Please try again later.';
      alert(`Error occurred: ${errorMessage}`);
    }
  };

  return (
    <>
      <h1 className="webrlheader">Event Management Platform</h1>
      <div className='Authpage'>
      <div className="login-container">
        <form className="login-form">
          <h2>Register</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Usermail"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Secret key for admin"
            value={adminField}
            onChange={(e) => setAdminField(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={Registerbtnclicked}>Register</button>
        </form>
        </div>
      </div>
    </>
  );
};

export default Register;
