import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { VEHICLE_BRANDS } from "../../../constants/vehicle_brands"; 

const initialVehicles = [
  { id: '1', name: 'Honda Grace', type: 'Car', no: 'ABC-1234', model: 'Grace', Make: 'Honda', fuel: 'Petrol', year: '2020' },
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
  const [Make, setMake] = useState("");
  const [MakeDropdown, setMakeDropdown] = useState(false);
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
    if (!vehicleType || !vehicleNo || !model || !Make || !fuelType || !year) {
      alert('Please fill in all fields');
      return;
    }
    
    if (vehicles.length >= 3) {
      alert('Maximum limit of 3 vehicles reached');
      return;
    }
    
    const newVehicle = {
      id: Date.now().toString(),
      name: `${Make} ${model}`,
      type: vehicleType,
      no: vehicleNo,
      model,
      Make,
      fuel: fuelType,
      year,
    };
    setVehicles([...vehicles, newVehicle]);
    setSelectedVehicle(newVehicle);
    setAddingNew(false);
    setVehicleType("");
    setVehicleNo("");
    setModel("");
    setMake("");
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
          <View style={styles.dropdownWrap}>
            <TouchableOpacity style={styles.input} onPress={() => setDropdownOpen(!dropdownOpen)}>
              <Text style={styles.inputText}>{selectedVehicle ? selectedVehicle.name : 'Select Vehicle'}</Text>
            </TouchableOpacity>
            {dropdownOpen && (
              <ScrollView style={styles.dropdownList}>
                {vehicles.map((vehicle) => (
                  <TouchableOpacity key={vehicle.id} onPress={() => handleSelectVehicle(vehicle)}>
                    <Text style={styles.dropdownItem}>{vehicle.name}</Text>
                  </TouchableOpacity>
                ))}
                {vehicles.length < 3 && (
                  <TouchableOpacity onPress={() => { setAddingNew(true); setDropdownOpen(false); }}>
                    <Text style={[styles.dropdownItem, { color: '#e53935' }]}>+ Add New Vehicle</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            )}
          </View>
        </View>
        {/* Add New Vehicle Form */}
        {addingNew && (
          <View style={styles.formBox}>
            <Text style={styles.formTitle}>Add New Vehicle</Text>
            {/* <Text style={styles.vehicleCount}>: {vehicles.length}/3</Text> */}
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
            {/* Make Dropdown */}
            <Text style={styles.label}>Make</Text>
            <View style={styles.dropdownWrap}>
              <TouchableOpacity style={styles.input} onPress={() => setMakeDropdown(!MakeDropdown)}>
                <Text style={styles.inputText}>{Make || 'Select Make'}</Text>
              </TouchableOpacity>
              {MakeDropdown && (
                <ScrollView style={styles.dropdownList}>
                  {VEHICLE_BRANDS.map((b) => (
                    <TouchableOpacity key={b} onPress={() => { setMake(b); setMakeDropdown(false); }}>
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
    width: '100%',
    marginBottom: 8,
  },
  dropdownWrap: {
    marginBottom: 10,
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
  vehicleCount: {
    color: '#666',
    fontFamily: 'monospace',
    fontSize: 14,
    marginBottom: 0,
    textAlign: 'right',
  },
});
