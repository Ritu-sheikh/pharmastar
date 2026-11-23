import { useState } from 'react';
import { CloseIcon, ShieldCheckIcon } from './Icons';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [role, setRole] = useState('patient'); // 'patient' or 'pharmacy'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  // Quick Demo Accounts
  const fillDemoAccount = (selectedRole) => {
    if (selectedRole === 'patient') {
      setRole('patient');
      setEmail('patient.alex@example.com');
      setPassword('Patient@123');
    } else {
      setRole('pharmacy');
      setEmail('marcus@apexcarehealth.org');
      setPassword('Pharmacy@123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }

    const userName = role === 'patient' ? 'Alex Johnson' : 'Dr. Marcus Vance (Apex Care)';
    onLoginSuccess({
      email,
      name: userName,
      role: role === 'patient' ? 'Patient' : 'Pharmacist Partner'
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Sign in to Pharma Star</h3>
          <button type="button" onClick={onClose} style={{ color: 'var(--neutral-500)' }}>
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Role selector tabs */}
          <div className="role-tabs">
            <button
              type="button"
              className={`role-tab ${role === 'patient' ? 'active' : ''}`}
              onClick={() => setRole('patient')}
            >
              Patient / Customer
            </button>
            <button
              type="button"
              className={`role-tab ${role === 'pharmacy' ? 'active' : ''}`}
              onClick={() => setRole('pharmacy')}
            >
              Pharmacy Partner
            </button>
          </div>

          {/* 1-Click Demo Fill for College Evaluation */}
          <div className="demo-credentials-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginBottom: '0.2rem' }}>
              <ShieldCheckIcon size={16} />
              <span>Project Demo Accounts:</span>
            </div>
            <div>Click below to automatically autofill sample credentials:</div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
              <button
                type="button"
                className="demo-fill-btn"
                onClick={() => fillDemoAccount('patient')}
              >
                Autofill Patient Demo
              </button>
              <button
                type="button"
                className="demo-fill-btn"
                style={{ background: 'var(--primary-800)' }}
                onClick={() => fillDemoAccount('pharmacy')}
              >
                Autofill Pharmacy Partner
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder={role === 'patient' ? 'your.email@example.com' : 'dispensary@pharmacy.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('In this MVP demo, please use the sample demo fill above!'); }} style={{ fontSize: '0.75rem', color: 'var(--primary-600)' }}>
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                required
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--primary-600)' }}
              />
              <label htmlFor="rememberMe" style={{ color: 'var(--neutral-600)', cursor: 'pointer' }}>
                Keep me signed in on this device
              </label>
            </div>

            <button type="submit" className="btn-primary-action">
              Sign In as {role === 'patient' ? 'Patient' : 'Pharmacy Manager'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--neutral-500)' }}>
            New to Pharma Star?{' '}
            <a
              href="#signup"
              onClick={(e) => {
                e.preventDefault();
                alert('Account registration is pre-enabled for demonstration. You can sign in immediately using the demo accounts above!');
              }}
              style={{ color: 'var(--primary-600)', fontWeight: 700 }}
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
