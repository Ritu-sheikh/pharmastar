import { useState, useMemo } from 'react';
import MedicineCard from '../components/MedicineCard';
import {
  SearchIcon,
  MapPinIcon
} from '../components/Icons';
import { medicinesData, categoriesData } from '../data/medicinesData';
import { getMedicineAvailabilitySummary } from '../data/inventoryData';

export default function FindMedicinesPage({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onSelectPharmacy,
  onOpenReserve
}) {
  const [inStockOnly, setInStockOnly] = useState(false);
  const [rxFilter, setRxFilter] = useState('ALL'); // 'ALL' | 'RX' | 'OTC'
  const [sortOption, setSortOption] = useState('RELEVANCE'); // 'RELEVANCE' | 'PRICE_ASC' | 'PRICE_DESC' | 'NAME'
  const [radiusFilter, setRadiusFilter] = useState('10');

  // Filter and sort medicines
  const filteredMedicines = useMemo(() => {
    return medicinesData.filter((medicine) => {
      // Query filter (name, genericName, indications, manufacturer)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = medicine.name.toLowerCase().includes(q);
        const matchesGeneric = medicine.genericName.toLowerCase().includes(q);
        const matchesManufacturer = medicine.manufacturer.toLowerCase().includes(q);
        const matchesIndications = medicine.indications.some(ind => ind.toLowerCase().includes(q));
        if (!matchesName && !matchesGeneric && !matchesManufacturer && !matchesIndications) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory && selectedCategory !== 'All') {
        if (medicine.category !== selectedCategory) {
          return false;
        }
      }

      // Rx / OTC filter
      if (rxFilter === 'RX' && !medicine.prescriptionRequired) return false;
      if (rxFilter === 'OTC' && medicine.prescriptionRequired) return false;

      // In Stock only filter
      if (inStockOnly) {
        const avail = getMedicineAvailabilitySummary(medicine.id);
        if (avail.overallStatus === 'OUT_OF_STOCK') return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'PRICE_ASC') return a.price - b.price;
      if (sortOption === 'PRICE_DESC') return b.price - a.price;
      if (sortOption === 'NAME') return a.name.localeCompare(b.name);
      return 0; // relevance / default order
    });
  }, [searchQuery, selectedCategory, inStockOnly, rxFilter, sortOption]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setInStockOnly(false);
    setRxFilter('ALL');
    setSortOption('RELEVANCE');
  };

  const hasActiveFilters = searchQuery || (selectedCategory && selectedCategory !== 'All') || inStockOnly || rxFilter !== 'ALL';

  return (
    <div className="container" style={{ paddingTop: '2.5rem' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
          Find Medicines & Live Stock
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--neutral-600)' }}>
          Search by brand name or generic formulation to check price, strength, and store availability in Metro Central.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="filter-bar-wrapper">
        <div className="filter-search-row">
          <div className="filter-search-input">
            <SearchIcon size={18} />
            <input
              type="text"
              placeholder="Search by medicine name, generic salt (e.g., Paracetamol, Amoxicillin), or therapeutic use..."
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
            <option value="RELEVANCE">Sort: Recommended</option>
            <option value="PRICE_ASC">Price: Low to High</option>
            <option value="PRICE_DESC">Price: High to Low</option>
            <option value="NAME">Name: A to Z</option>
          </select>
        </div>

        {/* Category Pills Slider */}
        <div style={{ marginBottom: '1rem' }}>
          <div className="category-pills-scroll">
            {categoriesData.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-pill ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary filters row (In-Stock, Rx filter, Radius) */}
        <div className="filter-controls-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span>In Stock Only</span>
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--neutral-600)' }}>
              <span>Type:</span>
              <button
                type="button"
                className={`filter-pill ${rxFilter === 'ALL' ? 'active' : ''}`}
                style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                onClick={() => setRxFilter('ALL')}
              >
                All
              </button>
              <button
                type="button"
                className={`filter-pill ${rxFilter === 'RX' ? 'active' : ''}`}
                style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                onClick={() => setRxFilter('RX')}
              >
                Rx Required
              </button>
              <button
                type="button"
                className={`filter-pill ${rxFilter === 'OTC' ? 'active' : ''}`}
                style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                onClick={() => setRxFilter('OTC')}
              >
                OTC Only
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPinIcon size={16} style={{ color: 'var(--primary-600)' }} />
            <select
              className="sort-select"
              value={radiusFilter}
              onChange={(e) => setRadiusFilter(e.target.value)}
            >
              <option value="2">Within 2 km</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km (Metro)</option>
              <option value="25">Within 25 km</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                style={{ fontSize: '0.8rem', color: 'var(--danger-accent)', fontWeight: 600, padding: '0.35rem 0.65rem' }}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--neutral-700)' }}>
          Showing {filteredMedicines.length} {filteredMedicines.length === 1 ? 'medicine formulation' : 'medicines'}
          {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
          {selectedCategory && selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
        </div>
      </div>

      {/* Medicine Grid */}
      {filteredMedicines.length > 0 ? (
        <div className="grid-2">
          {filteredMedicines.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              onSelectPharmacy={onSelectPharmacy}
              onOpenReserve={onOpenReserve}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 1.5rem', background: '#ffffff', borderRadius: 'var(--radius-xl)', border: '1px solid var(--neutral-200)', margin: '2rem 0' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-50)', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <SearchIcon size={32} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
            No matching medicines found
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--neutral-600)', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            We could not find any medicine matching your criteria. Try adjusting your search keywords, switching categories, or clearing filters.
          </p>
          <button
            type="button"
            className="btn-primary-action"
            style={{ width: 'auto', display: 'inline-flex', padding: '0.65rem 1.5rem' }}
            onClick={clearAllFilters}
          >
            Clear All Filters & Show All
          </button>
        </div>
      )}
    </div>
  );
}
