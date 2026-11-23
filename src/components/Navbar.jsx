import { useState } from 'react';
import { LogoIcon, MapPinIcon, UserIcon, MenuIcon, CloseIcon } from './Icons';

export default function Navbar({ activeView, setActiveView, onOpenLogin, currentUser, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (viewName) => {
    setActiveView(viewName);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <div className="nav-brand" onClick={() => handleNavClick('home')}>
            <LogoIcon size={34} />
            <div className="brand-text">
              <span className="brand-title">
                Pharma<span>Star</span>
              </span>
              <span className="brand-subtitle">Medicine & Pharmacy Finder</span>
            </div>
            <div className="nav-location-pill" title="Current Search Radius">
              <MapPinIcon size={14} />
              <span>Metro Central (within 10 km)</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-links">
            <button
              type="button"
              className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
            <button
              type="button"
              className={`nav-link ${activeView === 'medicines' ? 'active' : ''}`}
              onClick={() => handleNavClick('medicines')}
            >
              Find Medicines
            </button>
            <button
              type="button"
              className={`nav-link ${activeView === 'pharmacies' || activeView === 'pharmacy-details' ? 'active' : ''}`}
              onClick={() => handleNavClick('pharmacies')}
            >
              Pharmacies
            </button>
          </nav>

          {/* User Auth / Action */}
          <div className="nav-actions">
            {currentUser ? (
              <div className="user-badge" onClick={onLogout} title="Click to log out">
                <div className="user-avatar">{currentUser.name.charAt(0)}</div>
                <span>{currentUser.name}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.7, marginLeft: '0.25rem' }}>({currentUser.role})</span>
              </div>
            ) : (
              <button type="button" className="btn-login" onClick={onOpenLogin}>
                <UserIcon size={16} />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="nav-location-pill" style={{ margin: '0 0 0.5rem 0', width: 'fit-content' }}>
            <MapPinIcon size={14} />
            <span>Metro Central (within 10 km)</span>
          </div>
          <button
            type="button"
            className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-link ${activeView === 'medicines' ? 'active' : ''}`}
            onClick={() => handleNavClick('medicines')}
          >
            Find Medicines
          </button>
          <button
            type="button"
            className={`nav-link ${activeView === 'pharmacies' ? 'active' : ''}`}
            onClick={() => handleNavClick('pharmacies')}
          >
            Pharmacies
          </button>
          {currentUser ? (
            <button
              type="button"
              className="nav-link"
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              style={{ color: 'var(--danger-accent)' }}
            >
              Logout ({currentUser.name})
            </button>
          ) : (
            <button
              type="button"
              className="btn-login"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
            >
              <UserIcon size={16} />
              <span>Login / Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
