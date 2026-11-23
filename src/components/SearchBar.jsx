import { useState } from 'react';
import { SearchIcon, MapPinIcon, ArrowRightIcon } from './Icons';

export default function SearchBar({ onSearch, initialQuery = '', initialRadius = '10' }) {
  const [query, setQuery] = useState(initialQuery);
  const [radius, setRadius] = useState(initialRadius);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim(), radius);
  };

  const handleQuickTag = (tagText) => {
    setQuery(tagText);
    onSearch(tagText, radius);
  };

  return (
    <div className="hero-search-wrapper">
      <form onSubmit={handleSubmit} className="search-box">
        {/* Medicine Name or Generic Input */}
        <div className="search-field">
          <SearchIcon size={20} />
          <input
            type="text"
            placeholder="Search medicine name, salt, or symptom (e.g., Augmentin, Paracetamol, Metformin)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Location / Radius Selector */}
        <div className="search-location-field">
          <MapPinIcon size={18} />
          <select value={radius} onChange={(e) => setRadius(e.target.value)}>
            <option value="2">Within 2 km (Walking)</option>
            <option value="5">Within 5 km (Nearby)</option>
            <option value="10">Within 10 km (Metro Central)</option>
            <option value="25">Within 25 km (Greater Area)</option>
          </select>
        </div>

        {/* Search CTA */}
        <button type="submit" className="search-btn">
          <span>Find Medicine</span>
          <ArrowRightIcon size={18} />
        </button>
      </form>

      {/* Popular quick tags */}
      <div className="quick-search-tags">
        <span className="quick-tag-label">Popular Searches:</span>
        <button type="button" className="quick-tag-pill" onClick={() => handleQuickTag('Augmentin 625')}>
          Augmentin 625
        </button>
        <button type="button" className="quick-tag-pill" onClick={() => handleQuickTag('Dolo 650')}>
          Dolo 650
        </button>
        <button type="button" className="quick-tag-pill" onClick={() => handleQuickTag('Metformin')}>
          Metformin SR
        </button>
        <button type="button" className="quick-tag-pill" onClick={() => handleQuickTag('Ventolin')}>
          Ventolin Inhaler
        </button>
        <button type="button" className="quick-tag-pill" onClick={() => handleQuickTag('Lantus')}>
          Lantus Insulin
        </button>
        <button type="button" className="quick-tag-pill" onClick={() => handleQuickTag('Allegra')}>
          Allegra 120
        </button>
      </div>
    </div>
  );
}
