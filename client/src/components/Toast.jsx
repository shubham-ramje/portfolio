import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className={`toast ${type}`} role="alert">
      {type === 'success' ? (
        <CheckCircle2 size={20} color="#10b981" />
      ) : (
        <AlertCircle size={20} color="#ef4444" />
      )}
      <span style={{ fontSize: '0.9rem', fontWeight: 500, flexGrow: 1 }}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Toast;
