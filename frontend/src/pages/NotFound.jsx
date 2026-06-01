import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './NotFound.css';

function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="not-found-page">
      <div className="not-found-content animate-fade-in-up">
        <span className="not-found-emoji">🔍</span>
        <h1 className="not-found-title">{t('notFound.title')}</h1>
        <h2 className="not-found-subtitle">{t('notFound.subtitle')}</h2>
        <p className="not-found-desc">{t('notFound.desc')}</p>
        <Link to="/" className="btn btn-primary btn-lg">{t('notFound.goHome')}</Link>
      </div>
    </div>
  );
}

export default NotFound;
