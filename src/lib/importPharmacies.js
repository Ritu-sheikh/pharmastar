import { supabase } from './supabase';
import { pharmaciesData } from '../data/pharmaciesData';

export async function importPharmacies() {
  const pharmacies = pharmaciesData.map((pharmacy) => ({
    source_id: pharmacy.id,
    name: pharmacy.name,
    address: pharmacy.address,
    phone: pharmacy.phone,
    tagline: pharmacy.tagline,
    landmark: pharmacy.landmark,
    distance_km: pharmacy.distanceKm,
    rating: pharmacy.rating,
    review_count: pharmacy.reviewCount,
    alternate_phone: pharmacy.alternatePhone,
    email: pharmacy.email,
    is_open: pharmacy.isOpen,
    is_24_hours: pharmacy.is24Hours,
    opening_hours: pharmacy.openingHours,
    schedule: pharmacy.schedule,
    features: pharmacy.features,
    chief_pharmacist: pharmacy.chiefPharmacist,
    license_number: pharmacy.licenseNumber,
    verified: pharmacy.verified,
    accepts_insurance: pharmacy.acceptsInsurance,
    delivery_available: pharmacy.deliveryAvailable,
    delivery_fee: pharmacy.deliveryFee,
    stock_accuracy_rate: pharmacy.stockAccuracyRate
  }));

  const { data, error } = await supabase
    .from('pharmacies')
    .upsert(pharmacies, { onConflict: 'source_id' })
    .select();

  if (error) {
    console.error('Pharmacy import failed:', error.message);
    return;
  }

  console.log('Pharmacies imported successfully:', data.length);
}