import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-ruby-darkest">
      <form onSubmit={submitHandler} className="p-8 bg-ruby-darkest rounded-lg shadow-lg w-96 border-2 border-ruby-primary">
        <h1 className="text-2xl font-bold mb-6 text-center text-ruby-bright">SIGN IN</h1>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-text-muted">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded-full bg-ruby-darkest border-2 border-ruby-primary focus:outline-none focus:ring-2 focus:ring-ruby-bright" required />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm text-text-muted">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded-full bg-ruby-darkest border-2 border-ruby-primary focus:outline-none focus:ring-2 focus:ring-ruby-bright" required />
        </div>
        <button type="submit" className="w-full p-3 bg-shining-diamond from-ruby-bright to-ruby-dark text-text-light font-bold rounded-full border-2 border-text-light shadow-diamond hover:shadow-diamond-hover hover:scale-105 transition-all duration-300">Login</button>
        <p className="text-center mt-4 text-sm text-text-muted">No account? <Link to="/register" className="text-ruby-bright hover:underline">Register here</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;