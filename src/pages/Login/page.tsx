import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login, user, logout } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const ok = login(email, password);
    if (ok) {
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1200);
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  /* Already logged in */
  if (user) {
    return (
      <>
        <h1 className="text-center text-3xl font-semibold my-6">Login</h1>
        <div className="w-full max-w-[1200px] mx-auto px-8 pb-10">
          <div className="bg-white p-6 rounded-lg shadow-[0_3px_7px_rgba(0,0,0,0.1)] max-w-sm mx-auto text-center">
            <p className="mb-4 text-base">
              You are logged in as <strong>{user.name}</strong> ({user.email})
            </p>
            <button
              onClick={logout}
              className="px-4 py-2.5 border-none text-base font-medium bg-[#111] text-white rounded-md cursor-pointer hover:bg-yellow-400 hover:text-black transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-center text-3xl font-semibold my-6">Login</h1>

      <div className="w-full max-w-[1200px] mx-auto px-8 pb-10">
        <div className="bg-white p-6 rounded-lg shadow-[0_3px_7px_rgba(0,0,0,0.1)] max-w-sm mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {error && (
              <p className="text-red-700 bg-red-50 px-3 py-2.5 rounded-md text-sm">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-700 bg-green-50 px-3 py-2.5 rounded-md text-sm">
                {success}
              </p>
            )}

            <div>
              <label className="block font-medium mb-1 text-sm">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-md border border-gray-300 text-sm outline-none focus:border-gray-800 transition-colors"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-md border border-gray-300 text-sm outline-none focus:border-gray-800 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2.5 border-none text-base font-medium bg-[#111] text-white rounded-md cursor-pointer hover:bg-yellow-400 hover:text-black transition-colors"
            >
              Login
            </button>

            <p className="text-center text-sm mt-1">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
