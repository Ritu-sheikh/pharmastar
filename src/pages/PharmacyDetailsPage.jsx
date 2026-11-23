import { useState, useMemo } from 'react';
import {
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  ClockIcon,
  ShieldCheckIcon,
  SearchIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
  DirectionsIcon,
  ShareIcon,
  CalendarIcon
} from '../components/Icons';
import { pharmaciesData } from '../data/pharmaciesData';
import { getInventoryForPharmacy, formatINR } from '../data/inventoryData';

export default function PharmacyDetailsPage({
  pharmacyId,
  onBackToPharmacies,
  onOpenReserve,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'services' | 'schedule'
  const [invSearchQuery, setInvSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockStatusFilter, setStockStatusFilter] = useState('ALL'); // 'ALL' | 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'

  // Look up pharmacy
  const pharmacy = useMemo(() => {
    return pharmaciesData.find(p => p.id === pharmacyId) || pharmaciesData[0];
  }, [pharmacyId]);

  const allInventory = useMemo(() => {
    return getInventoryForPharmacy(pharmacy.id);
  }, [pharmacy.id]);

  // Filter inventory
  const filteredInventory = useMemo(() => {
    return allInventory.filter(item => {
      // Query filter
      if (invSearchQuery.trim()) {
        const q = invSearchQuery.toLowerCase().trim();
        const matchName = item.medicine.name.toLowerCase().includes(q);
        const matchGeneric = item.medicine.genericName.toLowerCase().includes(q);
        const matchCategory = item.medicine.category.toLowerCase().includes(q);
        if (!matchName && !matchGeneric && !matchCategory) return false;
      }

      // Category
      if (selectedCategory !== 'All' && item.medicine.category !== selectedCategory) {
        return false;
      }

      // Status
      if (stockStatusFilter !== 'ALL' && item.status !== stockStatusFilter) {
        return false;
      }

      return true;
    });
  }, [allInventory, invSearchQuery, selectedCategory, stockStatusFilter]);

  // Inventory categories present in this pharmacy
  const pharmacyCategories = useMemo(() => {
    return ['All', ...new Set(allInventory.map(i => i.medicine.category))];
  }, [allInventory]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onShowToast({ message: `Share link copied for ${pharmacy.name}!`, type: 'info' });
    } else {
      onShowToast({ message: `Viewing ${pharmacy.name}`, type: 'info' });
    }
  };

  return (
    <div>
      {/* Pharmacy Details Hero Banner */}
      <section className="details-hero">
        <div className="container">
          {/* Breadcrumb Navigation */}
          <div className="breadcrumb-nav">
            <a href="#home" onClick={(e) => { e.preventDefault(); onBackToPharmacies('home'); }}>Home</a>
            <span>/</span>
            <a href="#pharmacies" onClick={(e) => { e.preventDefault(); onBackToPharmacies('pharmacies'); }}>Pharmacies</a>
            <span>/</span>
            <span style={{ color: 'var(--neutral-800)', fontWeight: 600 }}>{pharmacy.name}</span>
          </div>

          <div className="pharmacy-header-layout">
            <div className="details-main-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                {pharmacy.is24Hours ? (
                  <span className="badge-247">Open 24/7</span>
                ) : (
                  <span className="badge-open">Open Now</span>
                )}
                <span className="pharmacy-rating-pill">
                  <StarIcon size={14} />
                  <span>{pharmacy.rating}</span>
                  <span style={{ color: 'var(--neutral-500)', fontSize: '0.75rem' }}>({pharmacy.reviewCount} customer reviews)</span>
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-700)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700 }}>
                  <ShieldCheckIcon size={14} /> License: {pharmacy.licenseNumber}
                </span>
              </div>

              <h1 className="details-name">{pharmacy.name}</h1>
              <p className="details-tagline">{pharmacy.tagline}</p>

              {/* Meta Grid */}
              <div className="details-meta-grid">
                <div className="meta-item">
                  <MapPinIcon size={18} />
                  <span><strong>{pharmacy.distanceKm} km away</strong> • {pharmacy.address}</span>
                </div>
                <div className="meta-item">
                  <ClockIcon size={18} />
                  <span>{pharmacy.openingHours}</span>
                </div>
                <div className="meta-item">
                  <PhoneIcon size={18} />
                  <span>{pharmacy.phone} / {pharmacy.alternatePhone}</span>
                </div>
                <div className="meta-item">
                  <ShieldCheckIcon size={18} />
                  <span>Chief Pharmacist: <strong>{pharmacy.chiefPharmacist.name}</strong> ({pharmacy.chiefPharmacist.experience})</span>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="details-action-box">
              <div className="action-status-indicator">
                <span className="action-status-dot"></span>
                <span>Active Dispensing Counter</span>
              </div>

              <a href={`tel:${pharmacy.phone}`} className="btn-primary-action" style={{ textDecoration: 'none' }}>
                <PhoneIcon size={18} />
                <span>Call Counter: {pharmacy.phone}</span>
              </a>

              <button
                type="button"
                className="btn-secondary-action"
                onClick={() => {
                  setActiveTab('schedule');
                  const mapElement = document.getElementById('pharmacy-map-section');
                  if (mapElement) {
                    mapElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <DirectionsIcon size={18} />
                <span>Get Directions ({pharmacy.distanceKm} km)</span>
              </button>

              <button type="button" className="btn-secondary-action" onClick={handleCopyLink}>
                <ShareIcon size={16} />
                <span>Share Store Info</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabbed Content Area */}
      <div className="container">
        {/* Navigation Tabs */}
        <div className="details-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            Live Medicine Stock ({allInventory.length} Formulations)
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Clinical Services & About
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            Location & Weekly Hours
          </button>
        </div>

        {/* TAB 1: INVENTORY & STOCK LOOKUP */}
        {activeTab === 'inventory' && (
          <div>
            {/* Inventory Search & Filters */}
            <div className="filter-bar-wrapper" style={{ marginBottom: '1.5rem' }}>
              <div className="filter-search-row">
                <div className="filter-search-input">
                  <SearchIcon size={18} />
                  <input
                    type="text"
                    placeholder={`Search within ${pharmacy.name}'s inventory (e.g., Augmentin, Paracetamol)...`}
                    value={invSearchQuery}
                    onChange={(e) => setInvSearchQuery(e.target.value)}
                  />
                </div>

                <select
                  className="sort-select"
                  value={stockStatusFilter}
                  onChange={(e) => setStockStatusFilter(e.target.value)}
                  style={{ padding: '0.75rem 1rem' }}
                >
                  <option value="ALL">All Stock Statuses</option>
                  <option value="IN_STOCK">In Stock Only</option>
                  <option value="LOW_STOCK">Low Stock</option>
                  <option value="OUT_OF_STOCK">Out of Stock</option>
                </select>
              </div>

              {/* Category Filter Pills */}
              <div className="category-pills-scroll">
                {pharmacyCategories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Inventory Table Container */}
            <div className="inventory-table-card">
              <div className="inventory-table-header">
                <div style={{ fontWeight: 800, color: 'var(--neutral-900)', fontSize: '1.05rem' }}>
                  Current Real-Time Stock at {pharmacy.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>
                  Stock verification updated regular intervals • {pharmacy.stockAccuracyRate} audit score
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="inventory-table">
                  <thead>
                    <tr>
                      <th>Medicine Name & Generic</th>
                      <th>Strength & Form</th>
                      <th>Category</th>
                      <th>Unit Price</th>
                      <th>Availability Status</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map(item => (
                      <tr key={item.medicine.id}>
                        <td>
                          <div className="inventory-med-name">{item.medicine.name}</div>
                          <div className="inventory-generic">{item.medicine.genericName}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--neutral-400)', marginTop: '0.15rem' }}>
                            Batch #{item.batchNo} • Exp: {item.expiry}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--neutral-800)' }}>
                            {item.medicine.strength}
                          </div>
                          <div style={{ fontSize: '0.775rem', color: 'var(--neutral-500)' }}>
                            {item.medicine.dosageForm}
                          </div>
                        </td>
                        <td>
                          <span className="med-category-pill" style={{ margin: 0 }}>
                            {item.medicine.category}
                          </span>
                        </td>
                        <td>
                          <div className="inventory-price">{formatINR(item.price)}</div>
                          {item.medicine.mrp && item.medicine.mrp > item.price && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--success-text)', fontWeight: 600 }}>
                              Save {formatINR(item.medicine.mrp - item.price)}
                            </div>
                          )}
                        </td>
                        <td>
                          {item.status === 'IN_STOCK' ? (
                            <span className="badge-instock">
                              <CheckCircleIcon size={14} />
                              In Stock ({item.quantity} units)
                            </span>
                          ) : item.status === 'LOW_STOCK' ? (
                            <span className="badge-lowstock">
                              <AlertTriangleIcon size={14} />
                              Low Stock ({item.quantity} left)
                            </span>
                          ) : (
                            <span className="badge-outofstock">
                              <XCircleIcon size={14} />
                              Out of Stock
                            </span>
                          )}
                          <div style={{ fontSize: '0.7rem', color: 'var(--neutral-400)', marginTop: '0.2rem' }}>
                            Updated {item.lastUpdated}
                          </div>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {item.status !== 'OUT_OF_STOCK' ? (
                            <button
                              type="button"
                              className="btn-reserve-sm"
                              onClick={() => onOpenReserve(item.medicine, pharmacy, item)}
                            >
                              Hold / Reserve
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn-reserve-sm"
                              style={{ background: 'var(--neutral-300)', color: 'var(--neutral-600)', cursor: 'not-allowed' }}
                              disabled
                            >
                              Unavailable
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredInventory.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--neutral-500)' }}>
                  No medicines found in this pharmacy matching "{invSearchQuery}". Try clearing search or selecting "All" categories.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES & ABOUT */}
        {activeTab === 'services' && (
          <div className="grid-2" style={{ gap: '2rem' }}>
            <div style={{ background: '#ffffff', border: '1px solid var(--neutral-200)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '1.25rem' }}>
                Clinical Facilities & Services
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {pharmacy.features.map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--neutral-800)' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-50)', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircleIcon size={16} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--neutral-200)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--neutral-900)', marginBottom: '0.6rem' }}>
                  Delivery Policy
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', lineHeight: 1.6 }}>
                  {pharmacy.deliveryAvailable ? (
                    <span>
                      Home delivery is available within a 12 km radius. {pharmacy.deliveryFee}. Emergency life-saving supplies dispatched within 45 minutes of prescription verification.
                    </span>
                  ) : (
                    <span>This store specializes in in-store dispensary visits only. Instant walk-in pickups supported.</span>
                  )}
                </p>
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--neutral-200)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '1.25rem' }}>
                Quality & Verification Credentials
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--neutral-800)' }}>Chief Clinical Pharmacist</div>
                  <div style={{ color: 'var(--neutral-600)' }}>{pharmacy.chiefPharmacist.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>{pharmacy.chiefPharmacist.experience} • License #{pharmacy.chiefPharmacist.regNo}</div>
                </div>

                <div>
                  <div style={{ fontWeight: 700, color: 'var(--neutral-800)' }}>FDA Pharmacy Registration</div>
                  <div style={{ color: 'var(--neutral-600)' }}>{pharmacy.licenseNumber} (Certified Good Dispensing Practice)</div>
                </div>

                <div>
                  <div style={{ fontWeight: 700, color: 'var(--neutral-800)' }}>Insurance & Copay</div>
                  <div style={{ color: 'var(--neutral-600)' }}>
                    {pharmacy.acceptsInsurance ? 'Accepts major health insurances, CGHS / ECHS, and commercial prescription copay cards.' : 'Direct payment discount pharmacy with subsidized cash pricing.'}
                  </div>
                </div>

                <div>
                  <div style={{ fontWeight: 700, color: 'var(--neutral-800)' }}>Cold-Chain Storage Quality</div>
                  <div style={{ color: 'var(--neutral-600)' }}>
                    Maintains certified 2°C – 8°C continuous digital temperature monitoring for vaccines, biologics, and insulins.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LOCATION & SCHEDULE */}
        {activeTab === 'schedule' && (
          <div id="pharmacy-map-section" className="grid-2" style={{ gap: '2rem' }}>
            {/* Interactive Map Visual */}
            <div style={{ background: '#ffffff', border: '1px solid var(--neutral-200)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
                Pharmacy Location
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', marginBottom: '1.25rem' }}>
                {pharmacy.address} (Landmark: {pharmacy.landmark})
              </p>

              {/* Simulated Map Display */}
              <div className="map-simulated-card">
                <div className="map-pin-overlay">
                  <div className="map-pin-badge">
                    <MapPinIcon size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--neutral-900)' }}>
                      {pharmacy.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                      {pharmacy.distanceKm} km from your current spot
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(pharmacy.name + ' ' + pharmacy.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary-action"
                  style={{ textDecoration: 'none' }}
                >
                  <DirectionsIcon size={18} />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Operating Schedule */}
            <div style={{ background: '#ffffff', border: '1px solid var(--neutral-200)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <CalendarIcon size={22} style={{ color: 'var(--primary-600)' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
                  Weekly Operating Schedule
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {Object.entries(pharmacy.schedule).map(([day, hours]) => {
                  const dayName = day.charAt(0).toUpperCase() + day.slice(1);
                  const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() === day.toLowerCase();

                  return (
                    <div
                      key={day}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        background: isToday ? 'var(--primary-50)' : 'transparent',
                        border: isToday ? '1px solid var(--primary-200)' : '1px solid transparent',
                        fontWeight: isToday ? 700 : 500
                      }}
                    >
                      <span style={{ color: isToday ? 'var(--primary-800)' : 'var(--neutral-700)' }}>
                        {dayName} {isToday && <span style={{ fontSize: '0.7rem', color: 'var(--primary-600)', marginLeft: '0.25rem' }}>(Today)</span>}
                      </span>
                      <span style={{ color: isToday ? 'var(--primary-800)' : 'var(--neutral-600)' }}>
                        {hours}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '1.5rem', padding: '0.85rem', background: 'var(--neutral-50)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--neutral-500)' }}>
                * Prescription drops and telephone consultation available during all operating hours. Emergency counter open uninterrupted.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
