import { useState, useMemo } from 'react';
import PharmacyCard from '../components/PharmacyCard';
import {
  SearchIcon,
  MapPinIcon,
  BuildingIcon,
  ClockIcon,
  TruckIcon
} from '../components/Icons';
import { pharmaciesData } from '../data/pharmaciesData';

export default function PharmaciesPage({ onSelectPharmacy }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL' | 'OPEN' | '24_HOURS' | 'DELIVERY'
  const [sortOption, setSortOption] = useState('DISTANCE'); // 'DISTANCE' | 'RATING' | 'NAME'

  const filteredPharmacies = useMemo(() => {
    return pharmaciesData.filter((pharmacy) => {
      // Query filter (name, address, landmark, tagline)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = pharmacy.name.toLowerCase().includes(q);
        const matchesAddress = pharmacy.address.toLowerCase().includes(q);
        const matchesLandmark = pharmacy.landmark.toLowerCase().includes(q);
        const matchesTagline = pharmacy.tagline.toLowerCase().includes(q);
        if (!matchesName && !matchesAddress && !matchesLandmark && !matchesTagline) {
          return false;
        }
      }

      // Quick filter tabs
      if (filterMode === 'OPEN' && !pharmacy.isOpen) return false;
      if (filterMode === '24_HOURS' && !pharmacy.is24Hours) return false;
      if (filterMode === 'DELIVERY' && !pharmacy.deliveryAvailable) return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === 'DISTANCE') return a.distanceKm - b.distanceKm;
      if (sortOption === 'RATING') return b.rating - a.rating;
      if (sortOption === 'NAME') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, filterMode, sortOption]);

  return (
    <div className="container" style={{ paddingTop: '2.5rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
          Nearby Certified Pharmacies
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--neutral-600)' }}>
          Locate verified pharmacies in your local area, check operating schedules, emergency facilities, and live stock catalogs.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar-wrapper">
        <div className="filter-search-row">
          <div className="filter-search-input">
            <SearchIcon size={18} />
            <input
              type="text"
              placeholder="Search pharmacy name, street address, or area (e.g. Apex Care, Green Avenue, Hospital Drive)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ padding: '0.75rem 1rem' }}
          >
            <option value="DISTANCE">Sort: Nearest First (km)</option>
            <option value="RATING">Sort: Highest Rated</option>
            <option value="NAME">Sort: Name (A-Z)</option>
          </select>
        </div>

        {/* Filter Badges & Quick Toggles */}
        <div className="filter-controls-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`filter-pill ${filterMode === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilterMode('ALL')}
            >
              All Pharmacies ({pharmaciesData.length})
            </button>
            <button
              type="button"
              className={`filter-pill ${filterMode === '24_HOURS' ? 'active' : ''}`}
              onClick={() => setFilterMode('24_HOURS')}
            >
              <ClockIcon size={14} style={{ display: 'inline', marginRight: '4px' }} />
              24/7 Emergency Stores
            </button>
            <button
              type="button"
              className={`filter-pill ${filterMode === 'OPEN' ? 'active' : ''}`}
              onClick={() => setFilterMode('OPEN')}
            >
              Open Right Now
            </button>
            <button
              type="button"
              className={`filter-pill ${filterMode === 'DELIVERY' ? 'active' : ''}`}
              onClick={() => setFilterMode('DELIVERY')}
            >
              <TruckIcon size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Home Delivery Available
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--neutral-600)' }}>
            <MapPinIcon size={16} style={{ color: 'var(--primary-600)' }} />
            <span>Sorted by GPS Proximity from Metro Central</span>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--neutral-700)' }}>
          Showing {filteredPharmacies.length} pharmacies in your network
          {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
        </div>
      </div>

      {/* Pharmacy Cards Grid */}
      {filteredPharmacies.length > 0 ? (
        <div className="grid-3">
          {filteredPharmacies.map((pharmacy) => (
            <PharmacyCard
              key={pharmacy.id}
              pharmacy={pharmacy}
              onSelectPharmacy={onSelectPharmacy}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 1.5rem', background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid var(--neutral-200)', margin: '2rem 0' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-50)', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <BuildingIcon size={32} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
            No pharmacies match your filter
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--neutral-600)', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            Try expanding your search query or switching off specific filter toggles like 24/7 or delivery.
          </p>
          <button
            type="button"
            className="btn-primary-action"
            style={{ width: 'auto', display: 'inline-flex', padding: '0.65rem 1.5rem' }}
            onClick={() => {
              setSearchQuery('');
              setFilterMode('ALL');
              setSortOption('DISTANCE');
            }}
          >
            Show All Pharmacies
          </button>
        </div>
      )}
    </div>
  );
}
