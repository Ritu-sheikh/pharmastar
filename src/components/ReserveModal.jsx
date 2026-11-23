import { useState } from 'react';
import { CloseIcon, ShieldCheckIcon, CheckCircleIcon, MapPinIcon } from './Icons';
import { formatINR } from '../data/inventoryData';

export default function ReserveModal({ isOpen, onClose, medicine, pharmacy, stockItem, onConfirmReservation }) {
  const [quantity, setQuantity] = useState(1);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  if (!isOpen || !medicine || !pharmacy) return null;

  const unitPrice = stockItem ? stockItem.price : medicine.price;
  const totalPrice = unitPrice * quantity;
  const maxAvailable = stockItem ? stockItem.quantity : 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    const code = `RES-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservationCode(code);
    setConfirmed(true);

    if (onConfirmReservation) {
      onConfirmReservation({
        code,
        medicineName: medicine.name,
        pharmacyName: pharmacy.name,
        quantity,
        totalPrice: formatINR(totalPrice),
        patientName
      });
    }
  };

  const handleClose = () => {
    setConfirmed(false);
    setQuantity(1);
    setPatientName('');
    setPatientPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {confirmed ? 'Reservation Confirmed!' : 'Hold / Reserve Medicine'}
          </h3>
          <button type="button" onClick={handleClose} style={{ color: 'var(--neutral-500)' }}>
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          {confirmed ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <CheckCircleIcon size={32} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neutral-900)', marginBottom: '0.5rem' }}>
                Hold Request Placed Successfully
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', marginBottom: '1.25rem' }}>
                Your medicine has been placed on hold at <strong>{pharmacy.name}</strong> for up to <strong>3 hours</strong>.
              </p>

              <div style={{ background: 'var(--primary-50)', border: '1px dashed var(--primary-300)', padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-700)', letterSpacing: '0.05em' }}>
                  Pickup Reservation Code
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--primary-800)', letterSpacing: '0.05em', margin: '0.25rem 0' }}>
                  {reservationCode}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>
                  Show this code and doctor's prescription (if required) at the counter.
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--neutral-600)', textAlign: 'left', background: 'var(--neutral-50)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                <div><strong>Medicine:</strong> {medicine.name} ({quantity} units)</div>
                <div><strong>Total Amount to Pay:</strong> {formatINR(totalPrice)} (Pay at store counter)</div>
                <div><strong>Store Address:</strong> {pharmacy.address}</div>
                <div><strong>Contact:</strong> {pharmacy.phone}</div>
              </div>

              <button
                type="button"
                className="btn-primary-action"
                style={{ marginTop: '1.5rem' }}
                onClick={handleClose}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Medicine & Store Summary Header */}
              <div style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-200)', borderRadius: 'var(--radius-lg)', padding: '0.85rem 1rem', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: 'var(--neutral-900)', fontSize: '1.05rem' }}>
                  {medicine.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--neutral-600)', margin: '0.15rem 0 0.4rem' }}>
                  {medicine.genericName} • {medicine.strength}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--primary-800)' }}>
                  <MapPinIcon size={14} />
                  <span><strong>{pharmacy.name}</strong> ({pharmacy.distanceKm} km away)</span>
                </div>
              </div>

              {medicine.prescriptionRequired && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--rx-bg)', border: '1px solid var(--rx-border)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--rx-text)', marginBottom: '1rem' }}>
                  <ShieldCheckIcon size={18} />
                  <span><strong>Prescription Required:</strong> Please bring a valid medical prescription when picking up this medication.</span>
                </div>
              )}

              {/* Quantity Picker & Pricing */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '1.15rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Quantity (Units / Strips)</label>
                  <select
                    className="form-input"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[...Array(Math.min(maxAvailable || 1, 5)).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'pack' : 'packs'}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ flex: 1, background: 'var(--neutral-50)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>Estimated Total</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
                    {formatINR(totalPrice)}
                  </div>
                </div>
              </div>

              {/* Patient Name */}
              <div className="form-group">
                <label className="form-label">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Rajesh Sharma"
                  className="form-input"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>

              {/* Contact Phone */}
              <div className="form-group">
                <label className="form-label">Mobile Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g., +91 98765 43210"
                  className="form-input"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                  Reservation SMS confirmation will be sent here.
                </span>
              </div>

              {/* Optional prescription note */}
              <div className="form-group">
                <label className="form-label">Doctor's Name / Special Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Dr. R. K. Sharma, Apollo Clinic"
                  className="form-input"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                * Store holds items for up to 3 hours from booking time. Payment is made at the pharmacy counter during pickup.
              </div>

              <button type="submit" className="btn-primary-action">
                Confirm & Place Hold (Free)
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
