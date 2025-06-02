import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { VEHICLE_BRANDS } from "../../../constants/vehicle_brands"; // Adjust path as needed

const initialVehicles = [
  { id: '1', name: 'Honda Grace', type: 'Car', no: 'ABC-1234', model: 'Grace', brand: 'Honda', fuel: 'Petrol', year: '2020' },
  { id: '2', name: 'Toyota Prius', type: 'Car', no: 'XYZ-5678', model: 'Prius', brand: 'Toyota', fuel: 'Hybrid', year: '2022' },
];

const VEHICLE_TYPES = [
  "Car",
  "Van",
  "Motor Cycle",
  "SUV",
  "Pickup",
  "Bus",
  "Lorry",
  "Three Wheel",
  "Other"
];

const FUEL_TYPES = [
  "Petrol",
  "Diesel",
  "Electric",
  "Hybrid",
  "Gas"
];

const MANUFACTURE_YEARS = Array.from({ length: 2025 - 1980 + 1 }, (_, i) => (1980 + i).toString());

export default function VehicleDetails() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState(initialVehicles[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addingNew, setAddingNew] = useState(true);

  // New vehicle form state
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleTypeDropdown, setVehicleTypeDropdown] = useState(false);
  const [vehicleNo, setVehicleNo] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [brandDropdown, setBrandDropdown] = useState(false);
  const [fuelType, setFuelType] = useState("");
  const [fuelTypeDropdown, setFuelTypeDropdown] = useState(false);
  const [year, setYear] = useState("");
  const [yearDropdown, setYearDropdown] = useState(false);

  const handleSelectVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setDropdownOpen(false);
    setAddingNew(false);
  };

  const handleAddVehicle = () => {
    if (!vehicleType || !vehicleNo || !model || !brand || !fuelType || !year) return;
    const newVehicle = {
      id: Date.now().toString(),
      name: `${brand} ${model}`,
      type: vehicleType,
      no: vehicleNo,
      model,
      brand,
      fuel: fuelType,
      year,
    };
    setVehicles([...vehicles, newVehicle]);
    setSelectedVehicle(newVehicle);
    setAddingNew(false);
    setVehicleType("");
    setVehicleNo("");
    setModel("");
    setBrand("");
    setFuelType("");
    setYear("");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Vehicle Details</Text>
      <View style={styles.contentContainer}>
        {/* Vehicle Selector */}
        <View style={styles.selectorRow}>
          <TouchableOpacity style={styles.selectorBtn}>
            <Text style={styles.selectorBtnText}>Vehicle</Text>
          </TouchableOpacity>
          <View style={styles.selectedVehicleBox}>
            <Text style={styles.selectedVehicleText}>{selectedVehicle ? selectedVehicle.name : 'Select Vehicle'}</Text>
            <View style={styles.statusDot} />
          </View>
          <TouchableOpacity onPress={() => setAddingNew(true)}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        {/* Add New Vehicle Form */}
        {addingNew && (
          <View style={styles.formBox}>
            <Text style={styles.formTitle}>Add New Vehicle</Text>
            {/* Vehicle Type Dropdown */}
            <Text style={styles.label}>Vehicle Type</Text>
            <View style={styles.dropdownWrap}>
              <TouchableOpacity style={styles.input} onPress={() => setVehicleTypeDropdown(!vehicleTypeDropdown)}>
                <Text style={styles.inputText}>{vehicleType || 'Select Vehicle Type'}</Text>
              </TouchableOpacity>
              {vehicleTypeDropdown && (
                <ScrollView style={styles.dropdownList}>
                  {VEHICLE_TYPES.map((type) => (
                    <TouchableOpacity key={type} onPress={() => { setVehicleType(type); setVehicleTypeDropdown(false); }}>
                      <Text style={styles.dropdownItem}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
            {/* Vehicle No */}
            <Text style={styles.label}>Vehicle No</Text>
            <TextInput style={styles.input} value={vehicleNo} onChangeText={setVehicleNo} placeholder="" placeholderTextColor="#222" />
            {/* Model */}
            <Text style={styles.label}>Model</Text>
            <TextInput style={styles.input} value={model} onChangeText={setModel} placeholder="" placeholderTextColor="#222" />
            {/* Brand Dropdown */}
            <Text style={styles.label}>Brand</Text>
            <View style={styles.dropdownWrap}>
              <TouchableOpacity style={styles.input} onPress={() => setBrandDropdown(!brandDropdown)}>
                <Text style={styles.inputText}>{brand || 'Select Brand'}</Text>
              </TouchableOpacity>
              {brandDropdown && (
                <ScrollView style={styles.dropdownList}>
                  {VEHICLE_BRANDS.map((b) => (
                    <TouchableOpacity key={b} onPress={() => { setBrand(b); setBrandDropdown(false); }}>
                      <Text style={styles.dropdownItem}>{b}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
            {/* Fuel Type Dropdown */}
            <Text style={styles.label}>Fuel Type</Text>
            <View style={styles.dropdownWrap}>
              <TouchableOpacity style={styles.input} onPress={() => setFuelTypeDropdown(!fuelTypeDropdown)}>
                <Text style={styles.inputText}>{fuelType || 'Select Fuel Type'}</Text>
              </TouchableOpacity>
              {fuelTypeDropdown && (
                <ScrollView style={styles.dropdownList}>
                  {FUEL_TYPES.map((f) => (
                    <TouchableOpacity key={f} onPress={() => { setFuelType(f); setFuelTypeDropdown(false); }}>
                      <Text style={styles.dropdownItem}>{f}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
            {/* Manufacture Year Dropdown */}
            <Text style={styles.label}>Manufacture year</Text>
            <View style={styles.dropdownWrap}>
              <TouchableOpacity style={styles.input} onPress={() => setYearDropdown(!yearDropdown)}>
                <Text style={styles.inputText}>{year || 'Select Year'}</Text>
              </TouchableOpacity>
              {yearDropdown && (
                <ScrollView style={styles.dropdownList}>
                  {MANUFACTURE_YEARS.map((y) => (
                    <TouchableOpacity key={y} onPress={() => { setYear(y); setYearDropdown(false); }}>
                      <Text style={styles.dropdownItem}>{y}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={handleAddVehicle}>
              <Text style={styles.addBtnText}>Add New Vehicle</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center' as const,
    paddingTop: 20,
    paddingHorizontal: 18,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center' as const,
  },
  header: {
    fontSize: 32,
    color: '#e53935',
    fontWeight: 'bold' as const,
    fontFamily: 'monospace',
    textAlign: 'center' as const,
    marginBottom: 12,
  },
  selectorRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 8,
  },
  selectorBtn: {
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 18,
    marginRight: 6,
  },
  selectorBtnText: {
    color: '#e53935',
    fontFamily: 'monospace',
    fontSize: 18,
  },
  selectedVehicleBox: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 6,
    backgroundColor: '#fff',
  },
  selectedVehicleText: {
    color: '#222',
    fontFamily: 'monospace',
    fontSize: 18,
    marginRight: 8,
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2ecc40',
  },
  editText: {
    color: '#e53935',
    fontFamily: 'monospace',
    fontSize: 16,
    marginLeft: 6,
  },
  formBox: {
    borderWidth: 2,
    borderColor: '#2196f3',
    borderRadius: 8,
    padding: 10,
    width: 340,
    marginTop: 8,
    backgroundColor: '#fff',
  },
  formTitle: {
    color: '#1976d2',
    fontFamily: 'monospace',
    fontSize: 20,
    marginBottom: 8,
  },
  label: {
    color: '#222',
    fontFamily: 'monospace',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 2,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 10,
    fontFamily: 'monospace',
    fontSize: 16,
    color: '#222',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 3,
  },
  inputText: {
    color: '#222',
    fontFamily: 'monospace',
    fontSize: 16,
  },
  dropdownWrap: {
    marginBottom: 10,
  },
  dropdownList: {
    maxHeight: 120,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 10,
    marginTop: 2,
    zIndex: 1000,
    position: 'absolute',
    width: '100%',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#222',
  },
  addBtn: {
    backgroundColor: '#b3e5fc',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center' as const,
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  addBtnText: {
    color: '#222',
    fontWeight: 'bold' as const,
    fontSize: 18,
    fontFamily: 'monospace',
    textAlign: 'center' as const,
  },
});
