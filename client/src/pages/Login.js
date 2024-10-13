import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/api';
import AuthContext from '../context/AuthContext';
import '../styles/Auth.css';
const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);  
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const Loginbtnclicked = async (e) => {
        e.preventDefault(); 

        if (!credentials.email || !credentials.password) {
            alert('All fields are required');
            return;
        }

        try {
          const response = await axiosInstance.post('/users/login', {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.status === 200) {
            const user = response.data;  
            login(user);  
            if (user.role === "admin") {
              navigate('/dashboard');
            } else {
              navigate('/events');
            }
          } else {
            alert('Invalid credentials or server error.');
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'An error occurred. Please try again later.';
          alert(`Error occurred: ${errorMessage}`);
        }
    };
  return (
        <>
            <h1 className="webrlheader">Event Management Platform</h1>
            <div className='Authpage'>
                <div className="login-container">
                    <form className="login-form" onSubmit={Loginbtnclicked}>
                        <h2>Login</h2>
                        <input
                            type="email"
                            name="email"
                            placeholder="Usermail"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Login;
