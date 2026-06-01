import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Doctors.css';

const DOCTORS = [
  { id: 1, name: 'Dr. Priya Sharma', specialty: 'Cardiologist', experience: '15 yrs', rating: 4.9, reviews: 124, available: true, initials: 'PS', color: '#3b82f6', fee: 800, hospital: 'Apollo Hospital, Mumbai' },
  { id: 2, name: 'Dr. Arjun Patel', specialty: 'Neurologist', experience: '12 yrs', rating: 4.8, reviews: 98, available: true, initials: 'AP', color: '#8b5cf6', fee: 1200, hospital: 'Fortis Hospital, Delhi' },
  { id: 3, name: 'Dr. Sneha Reddy', specialty: 'Dermatologist', experience: '10 yrs', rating: 4.9, reviews: 156, available: false, initials: 'SR', color: '#ec4899', fee: 600, hospital: 'Manipal Hospital, Bengaluru' },
  { id: 4, name: 'Dr. Vikram Singh', specialty: 'Pediatrician', experience: '18 yrs', rating: 4.7, reviews: 203, available: true, initials: 'VS', color: '#10b981', fee: 500, hospital: 'AIIMS, Delhi' },
  { id: 5, name: 'Dr. Kavita Joshi', specialty: 'Orthopedic Surgeon', experience: '20 yrs', rating: 4.8, reviews: 87, available: true, initials: 'KJ', color: '#f59e0b', fee: 1500, hospital: 'Kokilaben Hospital, Mumbai' },
  { id: 6, name: 'Dr. Rajesh Kumar', specialty: 'General Physician', experience: '8 yrs', rating: 4.6, reviews: 210, available: true, initials: 'RK', color: '#06b6d4', fee: 400, hospital: 'Max Hospital, Noida' },
  { id: 7, name: 'Dr. Meera Nair', specialty: 'Psychiatrist', experience: '14 yrs', rating: 4.9, reviews: 142, available: false, initials: 'MN', color: '#a855f7', fee: 1000, hospital: 'Narayana Health, Chennai' },
  { id: 8, name: 'Dr. Anil Deshmukh', specialty: 'Ayurveda', experience: '22 yrs', rating: 4.7, reviews: 176, available: true, initials: 'AD', color: '#ef4444', fee: 350, hospital: 'Patanjali Wellness, Pune' },
];

const SPECIALTIES = ['All', ...new Set(DOCTORS.map((d) => d.specialty))];

function Doctors() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const filtered = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || doc.specialty.toLowerCase().includes(search.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [search, selectedSpecialty]);

  return (
    <div className="doctors-page">
      <section className="doctors-hero">
        <div className="container">
          <span className="section-label">{t('doctors.label')}</span>
          <h1 className="section-title">{t('doctors.title')}</h1>
          <p className="section-subtitle">{t('doctors.subtitle')}</p>
        </div>
      </section>

      <div className="container doctors-content">
        <div className="doctors-filters">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input type="text" className="search-input" placeholder={t('doctors.searchPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="filter-chips">
            {SPECIALTIES.map((spec) => (
              <button key={spec} type="button" className={`chip ${selectedSpecialty === spec ? 'active' : ''}`} onClick={() => setSelectedSpecialty(spec)}>
                {spec === 'All' ? t('doctors.all') : spec}
              </button>
            ))}
          </div>
        </div>

        <p className="results-count">{filtered.length} {t('doctors.found')}</p>

        <div className="doctors-grid">
          {filtered.map((doc) => (
            <div key={doc.id} className="card doctor-card">
              <div className="doctor-header">
                <div className="doctor-avatar" style={{ backgroundColor: doc.color }}>{doc.initials}</div>
                <span className={`availability-badge ${doc.available ? 'available' : 'unavailable'}`}>
                  {doc.available ? t('doctors.available') : t('doctors.busy')}
                </span>
              </div>
              <h3 className="doctor-name">{doc.name}</h3>
              <p className="doctor-specialty">{doc.specialty}</p>
              <p className="doctor-hospital">🏥 {doc.hospital}</p>
              <div className="doctor-meta">
                <span className="doctor-experience">🎓 {doc.experience}</span>
                <span className="doctor-rating">⭐ {doc.rating} ({doc.reviews})</span>
              </div>
              <div className="doctor-fee">
                {t('doctors.consultation')}: <strong>₹{doc.fee}</strong>
              </div>
              <button type="button" className={`btn ${doc.available ? 'btn-primary' : 'btn-secondary'} btn-book`} disabled={!doc.available}>
                {doc.available ? t('doctors.bookAppointment') : t('doctors.notAvailable')}
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>{t('doctors.noResults')}</p>
            <button type="button" className="btn btn-secondary" onClick={() => { setSearch(''); setSelectedSpecialty('All'); }}>
              {t('doctors.clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Doctors;
