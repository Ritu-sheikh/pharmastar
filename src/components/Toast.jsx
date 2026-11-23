import { useEffect } from 'react';
import { CheckCircleIcon, AlertTriangleIcon, CloseIcon } from './Icons';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className={`toast ${toast.type || 'info'}`}>
        {toast.type === 'success' ? (
          <CheckCircleIcon size={20} style={{ color: 'var(--success-accent)', flexShrink: 0 }} />
        ) : (
          <AlertTriangleIcon size={20} style={{ color: 'var(--primary-600)', flexShrink: 0 }} />
        )}
        <div style={{ flex: 1, fontSize: '0.875rem', color: 'var(--neutral-800)' }}>
          {toast.message}
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{ color: 'var(--neutral-400)', padding: '0.2rem' }}
        >
          <CloseIcon size={16} />
        </button>
      </div>
    </div>
  );
}
