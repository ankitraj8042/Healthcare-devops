import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './EmergencyBanner.css';

function EmergencyBanner() {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem('emergency_dismissed') === 'true'
  );

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('emergency_dismissed', 'true');
  };

  return (
    <div className="emergency-banner">
      <p className="emergency-text">{t('emergency.text')}</p>
      <button type="button" className="emergency-close" onClick={handleDismiss} aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}

export default EmergencyBanner;
