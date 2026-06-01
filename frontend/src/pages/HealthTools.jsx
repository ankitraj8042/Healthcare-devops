import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './HealthTools.css';

function getBmiCategory(bmi, t) {
  if (bmi < 18.5) return { label: t('healthTools.underweight'), color: '#3b82f6', tip: t('healthTools.underweightTip') };
  if (bmi < 25) return { label: t('healthTools.normal'), color: '#10b981', tip: t('healthTools.normalTip') };
  if (bmi < 30) return { label: t('healthTools.overweight'), color: '#f59e0b', tip: t('healthTools.overweightTip') };
  return { label: t('healthTools.obese'), color: '#ef4444', tip: t('healthTools.obeseTip') };
}

function HealthTools() {
  const { t } = useLanguage();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return;
    const bmi = w / Math.pow(h / 100, 2);
    setResult(bmi);
  };

  const bmi = result ? result.toFixed(1) : null;
  const category = bmi ? getBmiCategory(parseFloat(bmi), t) : null;
  const gaugePercent = bmi ? Math.min((parseFloat(bmi) / 40) * 100, 100) : 0;

  return (
    <div className="health-tools-page">
      <section className="health-tools-hero">
        <div className="container">
          <span className="section-label">{t('healthTools.label')}</span>
          <h1 className="section-title">{t('healthTools.title')}</h1>
          <p className="section-subtitle">{t('healthTools.subtitle')}</p>
        </div>
      </section>

      <div className="container health-tools-content">
        <div className="card bmi-card">
          <form className="bmi-form" onSubmit={handleCalculate}>
            <div className="bmi-inputs">
              <div className="form-field">
                <label htmlFor="bmi-height">{t('healthTools.height')}</label>
                <input id="bmi-height" type="number" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} min="1" required />
              </div>
              <div className="form-field">
                <label htmlFor="bmi-weight">{t('healthTools.weight')}</label>
                <input id="bmi-weight" type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} min="1" required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">{t('healthTools.calculate')}</button>
          </form>

          {bmi && category && (
            <div className="bmi-result animate-scale-in">
              <div className="bmi-gauge-container">
                <div className="bmi-gauge-track">
                  <div className="bmi-gauge-fill" style={{ width: `${gaugePercent}%`, backgroundColor: category.color }} />
                </div>
                <div className="bmi-gauge-labels">
                  <span>0</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                </div>
              </div>
              <div className="bmi-value-display">
                <span className="bmi-number" style={{ color: category.color }}>{bmi}</span>
                <span className="bmi-label">{t('healthTools.yourBmi')}</span>
              </div>
              <div className="bmi-category" style={{ backgroundColor: `${category.color}15`, borderColor: category.color }}>
                <span className="bmi-category-label" style={{ color: category.color }}>{category.label}</span>
                <p className="bmi-tip">{category.tip}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HealthTools;
