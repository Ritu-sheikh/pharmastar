import { useState } from 'react';
import {
  MapPinIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon
} from './Icons';
import { getPharmaciesWithStockForMedicine, getMedicineAvailabilitySummary, formatINR } from '../data/inventoryData';

export default function MedicineCard({ medicine, onSelectPharmacy, onOpenReserve }) {
  const [expanded, setExpanded] = useState(false);

  const availability = getMedicineAvailabilitySummary(medicine.id);
  const pharmacyStockList = getPharmaciesWithStockForMedicine(medicine.id);

  // Status badge helper
  const renderStatusBadge = () => {
    if (availability.overallStatus === 'IN_STOCK') {
      return (
        <span className="badge-instock">
          <CheckCircleIcon size={14} />
          In Stock ({availability.storesWithStock} Stores)
        </span>
      );
    }
    if (availability.overallStatus === 'LOW_STOCK') {
      return (
        <span className="badge-lowstock">
          <AlertTriangleIcon size={14} />
          Limited Stock (1 Store)
        </span>
      );
    }
    return (
      <span className="badge-outofstock">
        <XCircleIcon size={14} />
        Out of Stock
      </span>
    );
  };

  return (
    <div className="medicine-card">
      <div className="medicine-card-header">
        <div className="med-info-left">
          <span className="med-category-pill">{medicine.category}</span>
          <h3 className="med-name">{medicine.name}</h3>
          <p className="med-generic">{medicine.genericName}</p>
          <span className="med-manufacturer">by {medicine.manufacturer}</span>
        </div>

        <div className="med-badges-right">
          {medicine.prescriptionRequired ? (
            <span className="badge-rx">Rx Required</span>
          ) : (
            <span className="badge-otc">OTC Medicine</span>
          )}
          {renderStatusBadge()}
        </div>
      </div>

      {/* Specifications Strip */}
      <div className="medicine-specs">
        <div className="spec-badge">
          <strong>Strength:</strong> {medicine.strength}
        </div>
        <div className="spec-badge">
          <strong>Form:</strong> {medicine.dosageForm}
        </div>
        <div className="spec-badge">
          <strong>Pack:</strong> {medicine.packageSize}
        </div>
      </div>

      {/* Pricing & Nearest Pharmacy Row */}
      <div className="medicine-price-row">
        <div className="price-box">
          <span className="price-main">{formatINR(medicine.price)}</span>
          {medicine.mrp && (
            <span className="price-mrp">{formatINR(medicine.mrp)}</span>
          )}
        </div>

        {availability.nearestPharmacyName && (
          <div className="nearest-store-callout">
            <MapPinIcon size={14} />
            <span>
              Nearest: <strong>{availability.nearestPharmacyName}</strong> ({availability.nearestInStockDistance} km)
            </span>
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="medicine-card-actions">
        <button
          type="button"
          className="btn-toggle-stores"
          onClick={() => setExpanded(!expanded)}
        >
          <span>
            {expanded ? 'Hide Available Pharmacies' : `Check Stock in ${pharmacyStockList.length} Pharmacies`}
          </span>
          {expanded ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
        </button>
      </div>

      {/* Expanded Store Inventory Drawer */}
      {expanded && (
        <div className="store-stock-drawer">
          <div className="drawer-header">Local Pharmacy Availability & Price</div>
          <div className="store-stock-list">
            {pharmacyStockList.map((item) => (
              <div key={item.pharmacy.id} className="store-stock-item">
                <div className="store-name-col">
                  <div className="store-item-name">
                    <span>{item.pharmacy.name}</span>
                    {item.pharmacy.is24Hours && <span className="badge-247" style={{ fontSize: '0.65rem' }}>24/7</span>}
                  </div>
                  <div className="store-item-dist">
                    <MapPinIcon size={12} />
                    <span>{item.pharmacy.distanceKm} km away • {item.pharmacy.address.split(',')[0]}</span>
                  </div>
                </div>

                <div className="store-item-stock-col">
                  <div className="store-item-price">{formatINR(item.price)}</div>
                  {item.status === 'IN_STOCK' ? (
                    <span className="badge-instock" style={{ fontSize: '0.7rem' }}>
                      {item.quantity} in stock
                    </span>
                  ) : item.status === 'LOW_STOCK' ? (
                    <span className="badge-lowstock" style={{ fontSize: '0.7rem' }}>
                      Only {item.quantity} left
                    </span>
                  ) : (
                    <span className="badge-outofstock" style={{ fontSize: '0.7rem' }}>
                      Out of stock
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <button
                    type="button"
                    className="btn-store-action"
                    onClick={() => onSelectPharmacy(item.pharmacy.id)}
                  >
                    View Store
                  </button>
                  {item.status !== 'OUT_OF_STOCK' && (
                    <button
                      type="button"
                      className="btn-store-action"
                      style={{ background: 'var(--primary-700)' }}
                      onClick={() => onOpenReserve(medicine, item.pharmacy, item)}
                    >
                      Hold / Reserve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
