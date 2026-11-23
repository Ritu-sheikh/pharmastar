import { LogoIcon, PhoneIcon, ShieldCheckIcon } from './Icons';

export default function Footer({ setActiveView }) {
  const navigate = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Medical disclaimer note */}
        <div className="footer-disclaimer-box">
          <strong>Important Medical Notice:</strong> Pharma Star is an informational medicine availability aggregator and pharmacy directory for educational demonstration.
          Prescription drugs require a valid medical prescription from a registered healthcare professional before dispensing.
          In case of medical emergencies, please immediately call 112 / 108 (or local emergency medical line) or visit your nearest emergency room.
        </div>

        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div className="nav-brand" style={{ marginBottom: '1rem' }} onClick={() => navigate('home')}>
              <LogoIcon size={32} />
              <div className="brand-text">
                <span className="brand-title">Pharma<span>Star</span></span>
                <span className="brand-subtitle">Medicine & Pharmacy Finder</span>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--neutral-600)', marginBottom: '1.25rem' }}>
              Real-time medicine stock search and verified local pharmacy discovery platform. Helping patients locate essential treatments with transparent pricing.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-700)', fontSize: '0.85rem', fontWeight: 600 }}>
              <ShieldCheckIcon size={18} />
              <span>Verified Pharmacy Network</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
              <li><a href="#medicines" onClick={(e) => { e.preventDefault(); navigate('medicines'); }}>Find Medicines</a></li>
              <li><a href="#pharmacies" onClick={(e) => { e.preventDefault(); navigate('pharmacies'); }}>Nearby Pharmacies</a></li>
              <li><a href="#pharmacies" onClick={(e) => { e.preventDefault(); navigate('pharmacies'); }}>24/7 Stores</a></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="footer-col-title">Categories</h4>
            <ul className="footer-links">
              <li><a href="#medicines" onClick={(e) => { e.preventDefault(); navigate('medicines'); }}>Antibiotics</a></li>
              <li><a href="#medicines" onClick={(e) => { e.preventDefault(); navigate('medicines'); }}>Diabetes Care</a></li>
              <li><a href="#medicines" onClick={(e) => { e.preventDefault(); navigate('medicines'); }}>Pain Relief</a></li>
              <li><a href="#medicines" onClick={(e) => { e.preventDefault(); navigate('medicines'); }}>Cardiovascular</a></li>
              <li><a href="#medicines" onClick={(e) => { e.preventDefault(); navigate('medicines'); }}>Respiratory & Inhalers</a></li>
            </ul>
          </div>

          {/* Emergency & Support */}
          <div>
            <h4 className="footer-col-title">Emergency Helpline</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--neutral-600)', marginBottom: '0.75rem' }}>
              Have an urgent question regarding emergency pharmacy availability in your district?
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary-700)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
              <PhoneIcon size={20} />
              <span>1800-PHARMA-STAR</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--neutral-400)' }}>
              Operating 24/7 with on-call licensed pharmacists.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Pharma Star. All rights reserved. Built for College Project Demonstration.</div>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--neutral-500)', fontSize: '0.8rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Healthcare Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
