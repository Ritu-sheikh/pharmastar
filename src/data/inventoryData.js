import { pharmaciesData } from './pharmaciesData';
import { medicinesData } from './medicinesData';

// Currency & Indian number format helper
export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  const num = Number(amount);
  return `₹${num.toLocaleString('en-IN', {
    maximumFractionDigits: 2
  })}`;
}

// Stock inventory records linking Pharmacies with Medicines (Prices in INR ₹)
export const inventoryData = [
  // Apex Care 24x7 (ph-1) - High stock emergency hub
  { pharmacyId: 'ph-1', medicineId: 'med-1', status: 'IN_STOCK', quantity: 48, price: 185.00, batchNo: 'AC-9921', expiry: '08/2028', lastUpdated: '8 mins ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-2', status: 'IN_STOCK', quantity: 120, price: 30.00, batchNo: 'AC-1044', expiry: '11/2028', lastUpdated: '5 mins ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-3', status: 'IN_STOCK', quantity: 35, price: 115.00, batchNo: 'AC-7782', expiry: '04/2027', lastUpdated: '15 mins ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-4', status: 'IN_STOCK', quantity: 24, price: 172.00, batchNo: 'AC-3310', expiry: '06/2027', lastUpdated: '22 mins ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-5', status: 'IN_STOCK', quantity: 40, price: 160.00, batchNo: 'AC-6641', expiry: '09/2027', lastUpdated: '12 mins ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-6', status: 'IN_STOCK', quantity: 18, price: 155.00, batchNo: 'AC-2299', expiry: '03/2027', lastUpdated: '10 mins ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-7', status: 'IN_STOCK', quantity: 26, price: 105.00, batchNo: 'AC-5511', expiry: '10/2027', lastUpdated: '35 mins ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-8', status: 'IN_STOCK', quantity: 50, price: 38.00, batchNo: 'AC-4420', expiry: '12/2028', lastUpdated: '1 hour ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-9', status: 'LOW_STOCK', quantity: 4, price: 185.00, batchNo: 'AC-8812', expiry: '05/2027', lastUpdated: '25 mins ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-10', status: 'IN_STOCK', quantity: 12, price: 1090.00, batchNo: 'AC-1190', expiry: '01/2027', lastUpdated: '3 mins ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-11', status: 'IN_STOCK', quantity: 30, price: 138.00, batchNo: 'AC-7734', expiry: '07/2027', lastUpdated: '40 mins ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-12', status: 'IN_STOCK', quantity: 15, price: 24.00, batchNo: 'AC-6622', expiry: '11/2026', lastUpdated: '18 mins ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-13', status: 'IN_STOCK', quantity: 95, price: 35.00, batchNo: 'AC-8841', expiry: '02/2029', lastUpdated: '5 mins ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-14', status: 'IN_STOCK', quantity: 22, price: 112.00, batchNo: 'AC-4455', expiry: '09/2027', lastUpdated: '1 hour ago' },
  { pharmacyId: 'ph-1', medicineId: 'med-15', status: 'IN_STOCK', quantity: 60, price: 102.00, batchNo: 'AC-9901', expiry: '06/2028', lastUpdated: '2 hours ago' },

  // MediPlus Chemist (ph-2) - High variety, popular local pharmacy
  { pharmacyId: 'ph-2', medicineId: 'med-1', status: 'IN_STOCK', quantity: 18, price: 180.00, batchNo: 'MP-4410', expiry: '05/2028', lastUpdated: '20 mins ago' },
  { pharmacyId: 'ph-2', medicineId: 'med-2', status: 'IN_STOCK', quantity: 85, price: 29.00, batchNo: 'MP-8822', expiry: '10/2028', lastUpdated: '14 mins ago' },
  { pharmacyId: 'ph-2', medicineId: 'med-3', status: 'IN_STOCK', quantity: 22, price: 112.00, batchNo: 'MP-3301', expiry: '02/2027', lastUpdated: '45 mins ago' },
  { pharmacyId: 'ph-2', medicineId: 'med-4', status: 'LOW_STOCK', quantity: 3, price: 175.00, batchNo: 'MP-7744', expiry: '08/2027', lastUpdated: '10 mins ago' },
  { pharmacyId: 'ph-2', medicineId: 'med-5', status: 'IN_STOCK', quantity: 28, price: 158.00, batchNo: 'MP-9912', expiry: '07/2027', lastUpdated: '30 mins ago' },
  { pharmacyId: 'ph-2', medicineId: 'med-6', status: 'OUT_OF_STOCK', quantity: 0, price: 155.00, batchNo: 'MP-1100', expiry: '-', lastUpdated: '2 hours ago' },
  { pharmacyId: 'ph-2', medicineId: 'med-7', status: 'IN_STOCK', quantity: 14, price: 102.00, batchNo: 'MP-6655', expiry: '09/2027', lastUpdated: '15 mins ago' },
  { pharmacyId: 'ph-2', medicineId: 'med-8', status: 'IN_STOCK', quantity: 40, price: 38.00, batchNo: 'MP-2233', expiry: '01/2029', lastUpdated: '1 hour ago' },
  { pharmacyId: 'ph-2', medicineId: 'med-9', status: 'IN_STOCK', quantity: 20, price: 182.00, batchNo: 'MP-5541', expiry: '04/2027', lastUpdated: '18 mins ago' },
  { pharmacyId: 'ph-2', medicineId: 'med-10', status: 'OUT_OF_STOCK', quantity: 0, price: 1095.00, batchNo: 'MP-0099', expiry: '-', lastUpdated: '3 hours ago' },
  { pharmacyId: 'ph-2', medicineId: 'med-11', status: 'IN_STOCK', quantity: 19, price: 136.00, batchNo: 'MP-3312', expiry: '06/2027', lastUpdated: '25 mins ago' },
  { pharmacyId: 'ph-2', medicineId: 'med-13', status: 'IN_STOCK', quantity: 65, price: 34.00, batchNo: 'MP-7788', expiry: '12/2028', lastUpdated: '10 mins ago' },
  { pharmacyId: 'ph-2', medicineId: 'med-15', status: 'IN_STOCK', quantity: 34, price: 100.00, batchNo: 'MP-4450', expiry: '05/2028', lastUpdated: '40 mins ago' },

  // HealthFirst Community Pharmacy (ph-3)
  { pharmacyId: 'ph-3', medicineId: 'med-1', status: 'LOW_STOCK', quantity: 5, price: 188.00, batchNo: 'HF-1092', expiry: '07/2028', lastUpdated: '12 mins ago' },
  { pharmacyId: 'ph-3', medicineId: 'med-2', status: 'IN_STOCK', quantity: 90, price: 31.00, batchNo: 'HF-2231', expiry: '09/2028', lastUpdated: '28 mins ago' },
  { pharmacyId: 'ph-3', medicineId: 'med-3', status: 'IN_STOCK', quantity: 40, price: 115.00, batchNo: 'HF-5512', expiry: '05/2027', lastUpdated: '50 mins ago' },
  { pharmacyId: 'ph-3', medicineId: 'med-4', status: 'IN_STOCK', quantity: 16, price: 178.00, batchNo: 'HF-8890', expiry: '11/2027', lastUpdated: '1 hour ago' },
  { pharmacyId: 'ph-3', medicineId: 'med-5', status: 'IN_STOCK', quantity: 22, price: 162.00, batchNo: 'HF-3341', expiry: '06/2027', lastUpdated: '15 mins ago' },
  { pharmacyId: 'ph-3', medicineId: 'med-6', status: 'IN_STOCK', quantity: 8, price: 158.00, batchNo: 'HF-4499', expiry: '02/2027', lastUpdated: '40 mins ago' },
  { pharmacyId: 'ph-3', medicineId: 'med-8', status: 'IN_STOCK', quantity: 38, price: 38.00, batchNo: 'HF-7761', expiry: '10/2028', lastUpdated: '2 hours ago' },
  { pharmacyId: 'ph-3', medicineId: 'med-9', status: 'IN_STOCK', quantity: 15, price: 185.00, batchNo: 'HF-6612', expiry: '08/2027', lastUpdated: '35 mins ago' },
  { pharmacyId: 'ph-3', medicineId: 'med-10', status: 'LOW_STOCK', quantity: 2, price: 1090.00, batchNo: 'HF-1104', expiry: '03/2027', lastUpdated: '10 mins ago' },
  { pharmacyId: 'ph-3', medicineId: 'med-12', status: 'IN_STOCK', quantity: 10, price: 25.00, batchNo: 'HF-9908', expiry: '09/2026', lastUpdated: '1 hour ago' },
  { pharmacyId: 'ph-3', medicineId: 'med-14', status: 'IN_STOCK', quantity: 18, price: 115.00, batchNo: 'HF-8821', expiry: '08/2027', lastUpdated: '1 hour ago' },
  { pharmacyId: 'ph-3', medicineId: 'med-15', status: 'IN_STOCK', quantity: 45, price: 102.00, batchNo: 'HF-5533', expiry: '04/2028', lastUpdated: '2 hours ago' },

  // Apollo Life Chemist 24/7 (ph-4) - Deep emergency & rare stock
  { pharmacyId: 'ph-4', medicineId: 'med-1', status: 'IN_STOCK', quantity: 32, price: 186.00, batchNo: 'AP-7711', expiry: '09/2028', lastUpdated: '18 mins ago' },
  { pharmacyId: 'ph-4', medicineId: 'med-2', status: 'IN_STOCK', quantity: 150, price: 30.00, batchNo: 'AP-9900', expiry: '12/2028', lastUpdated: '7 mins ago' },
  { pharmacyId: 'ph-4', medicineId: 'med-3', status: 'IN_STOCK', quantity: 50, price: 114.00, batchNo: 'AP-4432', expiry: '06/2027', lastUpdated: '19 mins ago' },
  { pharmacyId: 'ph-4', medicineId: 'med-4', status: 'IN_STOCK', quantity: 30, price: 174.00, batchNo: 'AP-5521', expiry: '07/2027', lastUpdated: '24 mins ago' },
  { pharmacyId: 'ph-4', medicineId: 'med-6', status: 'IN_STOCK', quantity: 25, price: 156.00, batchNo: 'AP-3390', expiry: '04/2027', lastUpdated: '11 mins ago' },
  { pharmacyId: 'ph-4', medicineId: 'med-7', status: 'IN_STOCK', quantity: 40, price: 106.00, batchNo: 'AP-8819', expiry: '11/2027', lastUpdated: '30 mins ago' },
  { pharmacyId: 'ph-4', medicineId: 'med-10', status: 'IN_STOCK', quantity: 18, price: 1080.00, batchNo: 'AP-2244', expiry: '02/2027', lastUpdated: '14 mins ago' },
  { pharmacyId: 'ph-4', medicineId: 'med-11', status: 'IN_STOCK', quantity: 28, price: 139.00, batchNo: 'AP-6677', expiry: '08/2027', lastUpdated: '45 mins ago' },
  { pharmacyId: 'ph-4', medicineId: 'med-12', status: 'IN_STOCK', quantity: 20, price: 24.00, batchNo: 'AP-1132', expiry: '12/2026', lastUpdated: '22 mins ago' },
  { pharmacyId: 'ph-4', medicineId: 'med-13', status: 'IN_STOCK', quantity: 110, price: 35.00, batchNo: 'AP-7755', expiry: '03/2029', lastUpdated: '6 mins ago' },
  { pharmacyId: 'ph-4', medicineId: 'med-14', status: 'IN_STOCK', quantity: 35, price: 110.00, batchNo: 'AP-9943', expiry: '10/2027', lastUpdated: '50 mins ago' },

  // WellCare Discount Pharmacy (ph-5) - Budget pricing
  { pharmacyId: 'ph-5', medicineId: 'med-1', status: 'OUT_OF_STOCK', quantity: 0, price: 175.00, batchNo: 'WC-0012', expiry: '-', lastUpdated: '4 hours ago' },
  { pharmacyId: 'ph-5', medicineId: 'med-2', status: 'IN_STOCK', quantity: 60, price: 28.00, batchNo: 'WC-4451', expiry: '08/2028', lastUpdated: '1 hour ago' },
  { pharmacyId: 'ph-5', medicineId: 'med-3', status: 'IN_STOCK', quantity: 45, price: 108.00, batchNo: 'WC-9923', expiry: '03/2027', lastUpdated: '35 mins ago' },
  { pharmacyId: 'ph-5', medicineId: 'med-4', status: 'IN_STOCK', quantity: 14, price: 168.00, batchNo: 'WC-2234', expiry: '05/2027', lastUpdated: '1 hour ago' },
  { pharmacyId: 'ph-5', medicineId: 'med-5', status: 'IN_STOCK', quantity: 19, price: 152.00, batchNo: 'WC-8843', expiry: '07/2027', lastUpdated: '45 mins ago' },
  { pharmacyId: 'ph-5', medicineId: 'med-8', status: 'IN_STOCK', quantity: 70, price: 36.00, batchNo: 'WC-3312', expiry: '02/2029', lastUpdated: '2 hours ago' },
  { pharmacyId: 'ph-5', medicineId: 'med-9', status: 'LOW_STOCK', quantity: 2, price: 178.00, batchNo: 'WC-7721', expiry: '06/2027', lastUpdated: '20 mins ago' },
  { pharmacyId: 'ph-5', medicineId: 'med-13', status: 'IN_STOCK', quantity: 80, price: 32.00, batchNo: 'WC-5544', expiry: '01/2029', lastUpdated: '30 mins ago' },
  { pharmacyId: 'ph-5', medicineId: 'med-15', status: 'IN_STOCK', quantity: 50, price: 95.00, batchNo: 'WC-6611', expiry: '05/2028', lastUpdated: '1 hour ago' },

  // St. Luke's Charitable Pharmacy (ph-6) - Subsidized
  { pharmacyId: 'ph-6', medicineId: 'med-1', status: 'IN_STOCK', quantity: 15, price: 170.00, batchNo: 'SL-8812', expiry: '06/2028', lastUpdated: '45 mins ago' },
  { pharmacyId: 'ph-6', medicineId: 'med-2', status: 'IN_STOCK', quantity: 140, price: 27.00, batchNo: 'SL-2290', expiry: '11/2028', lastUpdated: '15 mins ago' },
  { pharmacyId: 'ph-6', medicineId: 'med-3', status: 'IN_STOCK', quantity: 60, price: 105.00, batchNo: 'SL-1144', expiry: '04/2027', lastUpdated: '25 mins ago' },
  { pharmacyId: 'ph-6', medicineId: 'med-5', status: 'LOW_STOCK', quantity: 4, price: 150.00, batchNo: 'SL-7765', expiry: '08/2027', lastUpdated: '50 mins ago' },
  { pharmacyId: 'ph-6', medicineId: 'med-7', status: 'IN_STOCK', quantity: 18, price: 98.00, batchNo: 'SL-9932', expiry: '09/2027', lastUpdated: '30 mins ago' },
  { pharmacyId: 'ph-6', medicineId: 'med-11', status: 'IN_STOCK', quantity: 22, price: 130.00, batchNo: 'SL-3388', expiry: '05/2027', lastUpdated: '1 hour ago' },
  { pharmacyId: 'ph-6', medicineId: 'med-12', status: 'LOW_STOCK', quantity: 3, price: 22.00, batchNo: 'SL-4411', expiry: '08/2026', lastUpdated: '20 mins ago' },
  { pharmacyId: 'ph-6', medicineId: 'med-13', status: 'IN_STOCK', quantity: 100, price: 32.00, batchNo: 'SL-5577', expiry: '02/2029', lastUpdated: '12 mins ago' },
  { pharmacyId: 'ph-6', medicineId: 'med-15', status: 'IN_STOCK', quantity: 40, price: 96.00, batchNo: 'SL-6699', expiry: '07/2028', lastUpdated: '1 hour ago' }
];

// Helper: Get all medicines available at a specific pharmacy
export function getInventoryForPharmacy(pharmacyId) {
  const pharmacy = pharmaciesData.find(p => p.id === pharmacyId);
  if (!pharmacy) return [];

  const storeItems = inventoryData.filter(item => item.pharmacyId === pharmacyId);
  return storeItems.map(item => {
    const medicine = medicinesData.find(m => m.id === item.medicineId);
    return {
      ...item,
      medicine
    };
  }).filter(item => item.medicine !== undefined);
}

// Helper: Get all pharmacies carrying a specific medicine
export function getPharmaciesWithStockForMedicine(medicineId) {
  const medicine = medicinesData.find(m => m.id === medicineId);
  if (!medicine) return [];

  const records = inventoryData.filter(item => item.medicineId === medicineId);
  return records.map(record => {
    const pharmacy = pharmaciesData.find(p => p.id === record.pharmacyId);
    return {
      ...record,
      pharmacy
    };
  }).filter(r => r.pharmacy !== undefined).sort((a, b) => a.pharmacy.distanceKm - b.pharmacy.distanceKm);
}

// Helper: Get overall availability summary for a medicine
export function getMedicineAvailabilitySummary(medicineId) {
  const records = inventoryData.filter(item => item.medicineId === medicineId);
  const inStockStores = records.filter(r => r.status === 'IN_STOCK' || r.status === 'LOW_STOCK');
  const totalUnits = records.reduce((sum, r) => sum + r.quantity, 0);

  const prices = records.map(r => r.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  let overallStatus = 'OUT_OF_STOCK';
  if (inStockStores.length > 1) {
    overallStatus = 'IN_STOCK';
  } else if (inStockStores.length === 1) {
    overallStatus = inStockStores[0].quantity > 5 ? 'IN_STOCK' : 'LOW_STOCK';
  }

  // Nearest pharmacy with stock
  let nearestInStockDistance = null;
  let nearestPharmacyName = null;
  const inStockWithPharmacy = inStockStores.map(r => {
    const p = pharmaciesData.find(ph => ph.id === r.pharmacyId);
    return { ...r, pharmacy: p };
  }).filter(r => r.pharmacy !== undefined).sort((a, b) => a.pharmacy.distanceKm - b.pharmacy.distanceKm);

  if (inStockWithPharmacy.length > 0) {
    nearestInStockDistance = inStockWithPharmacy[0].pharmacy.distanceKm;
    nearestPharmacyName = inStockWithPharmacy[0].pharmacy.name;
  }

  return {
    overallStatus,
    storesWithStock: inStockStores.length,
    totalStoresCovered: records.length,
    totalUnits,
    minPrice,
    maxPrice,
    nearestInStockDistance,
    nearestPharmacyName
  };
}
