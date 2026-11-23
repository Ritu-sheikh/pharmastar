import { supabase } from './supabase';
import { medicinesData } from '../data/medicineData';

export async function importMedicines() {
  const medicines = medicinesData.map((medicine) => ({
    source_id: medicine.id,
    name: medicine.name,
    generic_name: medicine.genericName,
    strength: medicine.strength,
    dosage_form: medicine.dosageForm,
    package_size: medicine.packageSize,
    category: medicine.category,
    price: medicine.price,
    mrp: medicine.mrp,
    manufacturer: medicine.manufacturer,
    prescription_required: medicine.prescriptionRequired,
    description: medicine.description,
    indications: medicine.indications,
    storage: medicine.storage,
    dosage_note: medicine.dosageNote,
    popular: medicine.popular
  }));

  const { data, error } = await supabase
    .from('medicines')
    .upsert(medicines, { onConflict: 'source_id' })
    .select();

  if (error) {
    console.error('Medicine import failed:', error.message);
    return;
  }

  console.log('Medicines imported successfully:', data.length);
}