import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {
  const [mortgage, setMortgage] = useState('');
  const [tenure, setTenure] = useState('');
  const [interest, setInterest] = useState('');
  const [emi, setEMI] = useState<string | null>(null);

  const calculateEMI = () => {
    const P = parseFloat(mortgage);
    const R = parseFloat(interest) / 12 / 100;
    const N = parseFloat(tenure) * 12;
    if (!isNaN(P) && !isNaN(R) && !isNaN(N) && R > 0 && N > 0) {
      const calculatedEMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      setEMI(calculatedEMI.toFixed(2));
    } else {
      setEMI('Invalid Input');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mortgage Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Mortgage Amount"
        keyboardType="numeric"
        value={mortgage}
        onChangeText={setMortgage}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Tenure (Years)"
        keyboardType="numeric"
        value={tenure}
        onChangeText={setTenure}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Interest Rate (%)"
        keyboardType="numeric"
        value={interest}
        onChangeText={setInterest}
      />
      <Button title="Calculate EMI" onPress={calculateEMI} />
      {emi && (
        <Text style={styles.result}>
          {emi === 'Invalid Input' ? 'Invalid Input. Please try again.' : `Your EMI is $${emi}`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
  },
});

export default App;
