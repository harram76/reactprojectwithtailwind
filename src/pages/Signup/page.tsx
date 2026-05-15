import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const { signup, user, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!name || !email || !password) { setError('Please fill in all fields.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    signup(name, email, password);
    setSuccess('Account created! Redirecting...');
    setTimeout(() => navigate('/dashboard'), 1200);
  };

  if (user) {
    return (
      <>
        <h1 className="text-center text-3xl font-semibold my-6 dark:text-white">Create an Account</h1>
        <div className="max-w-[1100px] mx-auto px-6 pb-16">
          <div className="bg-white dark:bg-gray-800 p-7 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-sm mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-bold text-black mx-auto mb-4">
              {user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <p className="text-gray-700 dark:text-gray-200 mb-1">Already signed in as</p>
            <p className="font-bold text-gray-800 dark:text-white mb-5">{user.name}</p>
            <div className="flex gap-3 justify-center">
              <Link to="/profile" className="px-5 py-2.5 bg-[#111] dark:bg-yellow-400 text-white dark:text-black rounded-xl font-semibold no-underline hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500 transition-colors text-sm">
                My Profile
              </Link>
              <button onClick={logout} className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm border-none cursor-pointer">
                Logout
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-center text-3xl font-semibold my-6 dark:text-white">Create an Account</h1>
      <div className="max-w-[1100px] mx-auto px-6 pb-16">
        <div className="bg-white dark:bg-gray-800 p-7 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-sm mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error   && <p className="text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-4 py-3 rounded-xl text-sm">{error}</p>}
            {success && <p className="text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-4 py-3 rounded-xl text-sm">{success}</p>}

            {[
              { label: 'Full Name',  type: 'text',     placeholder: 'Enter your full name',        value: name,     setter: setName     },
              { label: 'Email',      type: 'email',    placeholder: 'Enter your email',            value: email,    setter: setEmail    },
              { label: 'Password',   type: 'password', placeholder: 'Create a password (min 6)',   value: password, setter: setPassword },
            ].map(({ label, type, placeholder, value, setter }) => (
              <div key={label}>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5">{label}</label>
                <input type={type} placeholder={placeholder} value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-sm outline-none focus:border-yellow-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 transition-colors" />
              </div>
            ))}

            <button type="submit" className="px-6 py-3 border-none text-sm font-semibold bg-[#111] dark:bg-yellow-400 text-white dark:text-black rounded-xl cursor-pointer hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500 transition-colors mt-1">
              Create Account →
            </button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-yellow-500 hover:text-yellow-600 no-underline font-semibold">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
