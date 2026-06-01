import { useState, useMemo } from 'react';
import './Doctors.css';

const DOCTORS = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    experience: '15 years',
    rating: 4.9,
    reviews: 124,
    available: true,
    initials: 'SM',
    color: '#3b82f6',
  },
  {
    id: 2,
    name: 'Dr. James Wilson',
    specialty: 'Neurologist',
    experience: '12 years',
    rating: 4.8,
    reviews: 98,
    available: true,
    initials: 'JW',
    color: '#8b5cf6',
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    specialty: 'Dermatologist',
    experience: '10 years',
    rating: 4.9,
    reviews: 156,
    available: false,
    initials: 'EC',
    color: '#ec4899',
  },
  {
    id: 4,
    name: 'Dr. Robert Garcia',
    specialty: 'Pediatrician',
    experience: '18 years',
    rating: 4.7,
    reviews: 203,
    available: true,
    initials: 'RG',
    color: '#10b981',
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialty: 'Orthopedic Surgeon',
    experience: '20 years',
    rating: 4.8,
    reviews: 87,
    available: true,
    initials: 'LT',
    color: '#f59e0b',
  },
  {
    id: 6,
    name: 'Dr. David Kim',
    specialty: 'General Physician',
    experience: '8 years',
    rating: 4.6,
    reviews: 210,
    available: true,
    initials: 'DK',
    color: '#06b6d4',
  },
  {
    id: 7,
    name: 'Dr. Maria Santos',
    specialty: 'Psychiatrist',
    experience: '14 years',
    rating: 4.9,
    reviews: 142,
    available: false,
    initials: 'MS',
    color: '#a855f7',
  },
  {
    id: 8,
    name: 'Dr. Andrew Patel',
    specialty: 'ENT Specialist',
    experience: '11 years',
    rating: 4.7,
    reviews: 76,
    available: true,
    initials: 'AP',
    color: '#ef4444',
  },
];

const SPECIALTIES = [
  'All',
  ...new Set(DOCTORS.map((d) => d.specialty)),
];

function Doctors() {
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const filtered = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(search.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [search, selectedSpecialty]);

  return (
    <div className="doctors-page">
      {/* Header */}
      <section className="doctors-hero">
        <div className="container">
          <span className="section-label">Our Team</span>
          <h1 className="section-title">Find Your Doctor</h1>
          <p className="section-subtitle">
            Browse our network of highly qualified specialists. Filter by name or specialty to find the perfect match.
          </p>
        </div>
      </section>

      <div className="container doctors-content">
        {/* Search & Filters */}
        <div className="doctors-filters">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-chips">
            {SPECIALTIES.map((spec) => (
              <button
                key={spec}
                type="button"
                className={`chip ${selectedSpecialty === spec ? 'active' : ''}`}
                onClick={() => setSelectedSpecialty(spec)}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="results-count">
          {filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Doctor Grid */}
        <div className="doctors-grid">
          {filtered.map((doc) => (
            <div key={doc.id} className="card doctor-card">
              <div className="doctor-header">
                <div
                  className="doctor-avatar"
                  style={{ backgroundColor: doc.color }}
                >
                  {doc.initials}
                </div>
                <span
                  className={`availability-badge ${doc.available ? 'available' : 'unavailable'}`}
                >
                  {doc.available ? 'Available' : 'Busy'}
                </span>
              </div>
              <h3 className="doctor-name">{doc.name}</h3>
              <p className="doctor-specialty">{doc.specialty}</p>
              <div className="doctor-meta">
                <span className="doctor-experience">🎓 {doc.experience}</span>
                <span className="doctor-rating">
                  ⭐ {doc.rating} ({doc.reviews})
                </span>
              </div>
              <button
                type="button"
                className={`btn ${doc.available ? 'btn-primary' : 'btn-secondary'} btn-book`}
                disabled={!doc.available}
              >
                {doc.available ? 'Book Appointment' : 'Not Available'}
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>No doctors found matching your criteria.</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSearch('');
                setSelectedSpecialty('All');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Doctors;
