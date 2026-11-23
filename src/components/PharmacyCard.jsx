import {
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  ClockIcon,
  ShieldCheckIcon,
  TruckIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from './Icons';
import { getInventoryForPharmacy } from '../data/inventoryData';

export default function PharmacyCard({ pharmacy, onSelectPharmacy }) {
  const inventory = getInventoryForPharmacy(pharmacy.id);
  const inStockCount = inventory.filter(i => i.status === 'IN_STOCK').length;

  return (
    <div className="pharmacy-card">
      <div className="pharmacy-card-header">
        <div className="pharmacy-title-area">
          <div className="pharmacy-badges">
            {pharmacy.is24Hours ? (
              <span className="badge-247">24/7 Emergency</span>
            ) : pharmacy.isOpen ? (
              <span className="badge-open">Open Now</span>
            ) : (
              <span className="badge-outofstock">Closed</span>
            )}
            {pharmacy.verified && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', color: 'var(--primary-700)', fontWeight: 700 }}>
                <ShieldCheckIcon size={14} /> Verified
              </span>
            )}
          </div>

          <h3 className="pharmacy-card-name">{pharmacy.name}</h3>
          <p className="pharmacy-tagline">{pharmacy.tagline}</p>
        </div>

        <div className="pharmacy-rating-pill">
          <StarIcon size={14} />
          <span>{pharmacy.rating}</span>
          <span style={{ color: 'var(--neutral-400)', fontWeight: 500, fontSize: '0.75rem' }}>
            ({pharmacy.reviewCount})
          </span>
        </div>
      </div>

      {/* Address & Operational Info */}
      <div className="pharmacy-address-block">
        <div className="pharmacy-info-row">
          <MapPinIcon size={16} />
          <span><strong>{pharmacy.distanceKm} km away</strong> • {pharmacy.address}</span>
        </div>
        <div className="pharmacy-info-row" style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', paddingLeft: '1.4rem' }}>
          Near {pharmacy.landmark}
        </div>

        <div className="pharmacy-info-row" style={{ marginTop: '0.25rem' }}>
          <ClockIcon size={16} />
          <span>{pharmacy.openingHours}</span>
        </div>

        <div className="pharmacy-info-row">
          <PhoneIcon size={16} />
          <span>{pharmacy.phone}</span>
        </div>
      </div>

      {/* Feature chips */}
      <div className="pharmacy-feature-chips">
        <span className="pharmacy-chip" style={{ background: 'var(--success-bg)', color: 'var(--success-text)', borderColor: 'var(--success-border)', fontWeight: 700 }}>
          <CheckCircleIcon size={12} style={{ display: 'inline', marginRight: '3px' }} />
          {inStockCount} Essential Medicines In Stock
        </span>
        {pharmacy.deliveryAvailable && (
          <span className="pharmacy-chip">
            <TruckIcon size={12} style={{ display: 'inline', marginRight: '3px' }} />
            Delivery Available
          </span>
        )}
        <span className="pharmacy-chip">
          {pharmacy.stockAccuracyRate} Accuracy
        </span>
      </div>

      {/* Card Footer Actions */}
      <div className="pharmacy-card-footer">
        <button
          type="button"
          className="btn-view-pharmacy"
          onClick={() => onSelectPharmacy(pharmacy.id)}
        >
          <span>View Stock & Details</span>
          <ArrowRightIcon size={16} />
        </button>

        <a
          href={`tel:${pharmacy.phone}`}
          className="btn-call-pharmacy"
          title={`Call ${pharmacy.name}`}
        >
          <PhoneIcon size={18} />
        </a>
      </div>
    </div>
  );
}
