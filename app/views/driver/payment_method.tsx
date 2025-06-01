import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView
} from 'react-native';

const initialCards = [
  {
    id: '1',
    type: 'Visa',
    number: '46xx xxxx xxxx x353',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
  },
  {
    id: '2',
    type: 'Master',
    number: '43xx xxxx xxxx x990',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png',
  },
];

const PaymentMethod = () => {
  const [cards, setCards] = useState(initialCards);
  const [selectedCard, setSelectedCard] = useState(cards[0].id);
  const [newCardType, setNewCardType] = useState('Visa');
  const [holder, setHolder] = useState('');
  const [number, setNumber] = useState('');
  const [mm, setMM] = useState('');
  const [yy, setYY] = useState('');
  const [cvv, setCVV] = useState('');
  const [agree, setAgree] = useState(false);

  // Add new card
  const handleAddCard = () => {
    if (!holder || !number || !mm || !yy || !cvv || !agree) return;
    // Simulate verification (add your real logic here)
    const lastDigits = number.slice(-3);
    const masked = `${number.slice(0, 2)}xx xxxx xxxx x${lastDigits}`;
    const logo = newCardType === 'Visa'
      ? 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png'
      : 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png';
    const newCard = {
      id: Date.now().toString(),
      type: newCardType,
      number: masked,
      logo,
    };
    setCards([newCard, ...cards]);
    setSelectedCard(newCard.id);
    setHolder('');
    setNumber('');
    setMM('');
    setYY('');
    setCVV('');
    setAgree(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#222' }} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.backArrow}>↩</Text>
        <Text style={styles.title}>Payment Method</Text>
      </View>

      {/* Card List */}
      <View style={{ marginBottom: 30 }}>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.cardRow}
            onPress={() => setSelectedCard(card.id)}
            activeOpacity={0.8}
          >
            <View style={styles.radioOuter}>
              {selectedCard === card.id && <View style={styles.radioInner} />}
            </View>
            <Image source={{ uri: card.logo }} style={styles.cardLogo} />
            <Text style={styles.cardNumber}>{card.number}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add New Card */}
      <Text style={styles.addNewTitle}>Add New Card</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setNewCardType('Visa')}
        >
          <View style={styles.radioOuter}>
            {newCardType === 'Visa' && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioLabel}>Visa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setNewCardType('Master')}
        >
          <View style={styles.radioOuter}>
            {newCardType === 'Master' && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioLabel}>Master</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Card Holder Name"
        placeholderTextColor="#fff"
        value={holder}
        onChangeText={setHolder}
      />
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        placeholderTextColor="#fff"
        value={number}
        onChangeText={setNumber}
        keyboardType="number-pad"
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.inputSmall]}
          placeholder="MM"
          placeholderTextColor="#fff"
          value={mm}
          onChangeText={setMM}
          keyboardType="number-pad"
          maxLength={2}
        />
        <TextInput
          style={[styles.input, styles.inputSmall]}
          placeholder="YY"
          placeholderTextColor="#fff"
          value={yy}
          onChangeText={setYY}
          keyboardType="number-pad"
          maxLength={2}
        />
        <TextInput
          style={[styles.input, styles.inputSmall]}
          placeholder="CVV"
          placeholderTextColor="#fff"
          value={cvv}
          onChangeText={setCVV}
          keyboardType="number-pad"
          maxLength={3}
        />
      </View>
      <View style={styles.termsRow}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAgree(!agree)}
        >
          {agree && <View style={styles.checkboxChecked} />}
        </TouchableOpacity>
        <Text style={styles.termsText}>I agree to terms and conditions</Text>
      </View>
      <TouchableOpacity
        style={[styles.addCardBtn, !agree && { opacity: 0.5 }]}
        onPress={handleAddCard}
        disabled={!agree}
      >
        <Text style={styles.addCardText}>Add Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#222',
    minHeight: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    width: '100%',
  },
  backArrow: {
    color: '#fff',
    fontSize: 32,
    marginRight: 10,
  },
  title: {
    fontSize: 32,
    color: '#e53935',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textAlign: 'center',
    flex: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    borderRadius: 2,
    marginBottom: 18,
    padding: 10,
    width: 340,
  },
  radioOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 4,
    borderColor: '#1976d2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#1976d2',
  },
  cardLogo: {
    width: 54,
    height: 32,
    resizeMode: 'contain',
    marginRight: 16,
  },
  cardNumber: {
    fontSize: 16,
    color: '#222',
    fontFamily: 'monospace',
    flexShrink: 1,
  },
  addNewTitle: {
    color: '#e53935',
    fontSize: 26,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  radioLabel: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 20,
    marginLeft: 6,
  },
  input: {
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 4,
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    width: 340,
    backgroundColor: 'transparent',
  },
  inputSmall: {
    width: 100,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    width: 340,
    justifyContent: 'space-between',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 4,
    borderColor: '#e53935',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    width: 18,
    height: 18,
    backgroundColor: '#e53935',
    borderRadius: 2,
  },
  termsText: {
    color: '#e53935',
    fontFamily: 'monospace',
    fontSize: 16,
  },
  addCardBtn: {
    backgroundColor: '#b3e5fc',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginVertical: 10,
    width: 340,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  addCardText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 26,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
});

export default PaymentMethod;
