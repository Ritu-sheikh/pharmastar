import SearchBar from '../components/SearchBar';
import MedicineCard from '../components/MedicineCard';
import PharmacyCard from '../components/PharmacyCard';
import {
  ClockIcon,
  ShieldCheckIcon,
  PillIcon,
  BuildingIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '../components/Icons';
import { medicinesData } from '../data/medicinesData';
import { pharmaciesData } from '../data/pharmaciesData';

export default function HomePage({
  onSearchSubmit,
  onSelectCategory,
  onSelectPharmacy,
  onOpenReserve,
  setActiveView
}) {
  // Select 4 popular medicines for the home showcase
  const popularMedicines = medicinesData.filter(m => m.popular).slice(0, 4);

  // Select top 3 nearby pharmacies
  const nearbyPharmacies = pharmaciesData.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="hero-badge">
              <span className="hero-badge-pulse"></span>
              <span>Live Pharmacy Stock Network Active</span>
            </div>

            <h1 className="hero-headline">
              Find Available Medicines at <span className="highlight">Nearby Pharmacies</span>
            </h1>

            <p className="hero-subhead">
              Instantly search prescription and OTC medicines across verified local drugstores, check real-time stock levels, compare prices, and reserve for quick pickup.
            </p>
          </div>

          {/* Hero Medicine Search Bar */}
          <SearchBar onSearch={onSearchSubmit} />

          {/* Healthcare Trust Stats */}
          <div className="hero-stats-bar">
            <div className="stat-item">
              <div className="stat-icon">
                <PillIcon size={24} />
              </div>
              <div>
                <div className="stat-number">1,200+</div>
                <div className="stat-desc">Medicines Cataloged</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <BuildingIcon size={24} />
              </div>
              <div>
                <div className="stat-number">85+</div>
                <div className="stat-desc">Partner Pharmacies</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <CheckCircleIcon size={24} />
              </div>
              <div>
                <div className="stat-number">99.2%</div>
                <div className="stat-desc">Stock Accuracy Rate</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <ClockIcon size={24} />
              </div>
              <div>
                <div className="stat-number">&lt; 15 Mins</div>
                <div className="stat-desc">Avg. Hold & Pickup</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Emergency 24/7 Callout Banner */}
        <div className="urgent-banner">
          <div className="urgent-content">
            <div className="urgent-icon-wrap">
              <ClockIcon size={28} />
            </div>
            <div>
              <div className="urgent-title">Need Medicine Urgently or Late at Night?</div>
              <div className="urgent-desc">
                Locate 24/7 open licensed emergency pharmacies with active trauma and intensive stock availability in your vicinity.
              </div>
            </div>
          </div>
          <button
            type="button"
            className="urgent-btn"
            onClick={() => setActiveView('pharmacies')}
          >
            <span>View 24/7 Pharmacies</span>
            <ArrowRightIcon size={16} />
          </button>
        </div>

        {/* Essential Medicines Showcase */}
        <section style={{ margin: '3.5rem 0' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">Frequently Searched Medicines</h2>
              <p className="section-subtitle">
                Check current availability and prices at nearby certified dispensaries.
              </p>
            </div>
            <button
              type="button"
              className="section-link-btn"
              onClick={() => setActiveView('medicines')}
            >
              <span>View All 15+ Medicines</span>
              <ArrowRightIcon size={16} />
            </button>
          </div>

          <div className="grid-2">
            {popularMedicines.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onSelectPharmacy={onSelectPharmacy}
                onOpenReserve={onOpenReserve}
              />
            ))}
          </div>
        </section>

        {/* Featured Nearby Pharmacies */}
        <section style={{ margin: '3.5rem 0' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">Top Nearby Pharmacies</h2>
              <p className="section-subtitle">
                Verified dispensing partners within your immediate radius.
              </p>
            </div>
            <button
              type="button"
              className="section-link-btn"
              onClick={() => setActiveView('pharmacies')}
            >
              <span>Explore All Pharmacies</span>
              <ArrowRightIcon size={16} />
            </button>
          </div>

          <div className="grid-3">
            {nearbyPharmacies.map((pharmacy) => (
              <PharmacyCard
                key={pharmacy.id}
                pharmacy={pharmacy}
                onSelectPharmacy={onSelectPharmacy}
              />
            ))}
          </div>
        </section>

        {/* Browse by Therapeutic Category */}
        <section style={{ margin: '3.5rem 0' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">Browse by Health Category</h2>
              <p className="section-subtitle">
                Quickly locate formulations organized by therapeutic area.
              </p>
            </div>
          </div>

          <div className="grid-3">
            {[
              { name: 'Antibiotics', icon: '💊', count: '18 products', desc: 'Penicillins, Cephalosporins, Macrolides' },
              { name: 'Pain Relief & Fever', icon: '🩹', count: '24 products', desc: 'Paracetamol, NSAIDs, Anti-inflammatories' },
              { name: 'Diabetes Care', icon: '🩸', count: '15 products', desc: 'Metformin, Insulin pens, Glucometer strips' },
              { name: 'Cardiovascular & BP', icon: '❤️', count: '12 products', desc: 'Statins, ARBs, Beta-blockers' },
              { name: 'Respiratory & Allergy', icon: '🫁', count: '14 products', desc: 'Inhalers, Antihistamines, Cough syrups' },
              { name: 'Vitamins & Supplements', icon: '🌿', count: '30 products', desc: 'B-Complex, Calcium + D3, Multivitamins' }
            ].map((cat, idx) => (
              <div
                key={idx}
                className="category-card"
                onClick={() => onSelectCategory(cat.name)}
              >
                <div className="category-icon">{cat.icon}</div>
                <div>
                  <div className="category-name">{cat.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--neutral-500)', marginBottom: '0.2rem' }}>{cat.desc}</div>
                  <div className="category-count">{cat.count}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section" style={{ borderRadius: 'var(--radius-xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="section-title">How Pharma Star Works</h2>
            <p className="section-subtitle">
              Three simple steps to avoid pharmacy hopping when you need urgent medication.
            </p>
          </div>

          <div className="grid-3">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">
                <PillIcon size={26} />
              </div>
              <h3 className="step-title">Search Any Medicine</h3>
              <p className="step-desc">
                Type the brand name (e.g., Augmentin) or active salt (e.g., Amoxicillin). Our system matches strengths, generic alternatives, and dosages.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">
                <BuildingIcon size={26} />
              </div>
              <h3 className="step-title">Compare Nearby Stock</h3>
              <p className="step-desc">
                See exactly which neighborhood pharmacies have it in stock right now, sorted by shortest travel distance, store hours, and price.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">
                <ShieldCheckIcon size={26} />
              </div>
              <h3 className="step-title">Reserve or Navigate</h3>
              <p className="step-desc">
                Place a 3-hour hold code, call the on-duty pharmacist directly, or open turn-by-turn driving directions to complete pickup stress-free.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
