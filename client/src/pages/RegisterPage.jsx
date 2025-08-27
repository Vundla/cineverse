import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      alert('Registration successful! Please log in.');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-ruby-darkest">
      <form onSubmit={submitHandler} className="p-8 bg-ruby-darkest rounded-lg shadow-lg w-96 border-2 border-ruby-primary">
        <h1 className="text-2xl font-bold mb-6 text-center text-ruby-bright">CREATE ACCOUNT</h1>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-text-muted">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded-full bg-ruby-darkest border-2 border-ruby-primary focus:outline-none focus:ring-2 focus:ring-ruby-bright" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-text-muted">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 rounded-full bg-ruby-darkest border-2 border-ruby-primary focus:outline-none focus:ring-2 focus:ring-ruby-bright" required />
        </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm text-text-muted">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded-full bg-ruby-darkest border-2 border-ruby-primary focus:outline-none focus:ring-2 focus:ring-ruby-bright" required />
                </div>
                <button type="submit" className="w-full bg-ruby-primary text-white py-2 rounded-full font-semibold hover:bg-ruby-bright transition-colors">Register</button>
                <p className="mt-4 text-center text-text-muted">
                  Already have an account? <Link to="/login" className="text-ruby-primary hover:underline">Log in</Link>
                </p>
              </form>
            </div>
          );
        };
        
        export default RegisterPage;