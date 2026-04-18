import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login({ mode = 'login' }) {
  const [isLogin, setIsLogin] = useState(mode !== 'register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLogin(mode !== 'register');
  }, [mode]);

  useEffect(() => {
    if (user) {
      navigate(localStorage.getItem('selectedSchool') ? '/shop' : '/select-school', { replace: true });
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Welcome back to ScholarKit.');
      } else {
        await register(name, email, password);
        toast.success('Your account is ready.');
      }
      const redirectPath = location.state?.from?.pathname || (localStorage.getItem('selectedSchool') ? '/shop' : '/select-school');
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-slate-50 px-4 py-12">
      <div className="glass-card w-full max-w-md p-10 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <p className="mb-3 text-center text-xs font-black uppercase tracking-widest text-primary relative z-10">ScholarKit</p>
        <h2 className="mb-2 text-center text-3xl font-black text-slate-900 tracking-tight relative z-10">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="mb-8 text-center text-sm font-medium text-slate-500 relative z-10">
          {isLogin ? 'Sign in to manage your cart, orders, and school selections.' : 'Create an account to start shopping and tracking orders.'}
        </p>

        {error && (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {!isLogin && (
            <div>
              <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-slate-400">Name</label>
              <input
                type="text"
                required
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
            <input
              type="email"
              required
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
            <input
              type="password"
              required
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full"
          >
            {submitting ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link
              to={isLogin ? '/register' : '/login'}
              className="font-semibold text-primary hover:text-indigo-500"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </Link>
          </p>
          <p className="mt-4">
            <Link to="/select-school" className="font-semibold text-slate-500 hover:text-slate-700">
              Browse schools first
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
