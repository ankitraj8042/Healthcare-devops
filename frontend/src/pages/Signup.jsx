import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../api';
import { useLanguage } from '../context/LanguageContext';
import './Login.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Signup() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!name || !email || !password) {
      return 'Name, email, and password are required.';
    }

    if (!emailPattern.test(email)) {
      return 'Please enter a valid email address.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const data = await signupUser({ name, email, password });
      localStorage.setItem('token', data.token);
      setSuccess('Signup successful');
      setTimeout(() => {
        navigate('/dashboard', { state: { message: 'Signup successful' } });
      }, 500);
    } catch (err) {
      setError(err.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container auth-page">
      <div className="card auth-card">
        <h2>{t('signup.title')}</h2>
        <p className="auth-welcome">{t('signup.subtitle')}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t('signup.fullName')}</label>
            <input
              id="name"
              type="text"
              placeholder="Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-email">{t('signup.email')}</label>
            <input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-password">{t('signup.password')}</label>
            <input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary auth-btn"
            disabled={loading}
          >
            {loading ? t('signup.submitting') : t('signup.submit')}
          </button>
        </form>
        {error ? <p className="auth-message error">{error}</p> : null}
        {success ? <p className="auth-message success">{success}</p> : null}
        <p className="auth-hint">{t('signup.hint')}</p>
        <p className="auth-footer">
          {t('signup.hasAccount')} <Link to="/login">{t('signup.loginLink')}</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
