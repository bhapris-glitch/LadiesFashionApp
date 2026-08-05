import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform, Alert } from 'react-native';
import { getInitialURL, addEventListener } from '../services/deepLinking';

const CheckoutScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [isProcessing, setIsProcessing] = useState(false);

  const payeeVPA = 'yourbusiness@upi'; // Replace with your UPI ID
  const payeeName = 'LadiesFashion';

  const initiateUPIPayment = () => {
    const transactionRef = 'TXN' + Date.now();
    const callbackUrl = 'ladiesfashion://payment'; // Deep link scheme

    const upiUrl = `upi://pay?pa=${payeeVPA}&pn=${payeeName}&tn=${encodeURIComponent(product.name)}&am=${product.price}&cu=INR&tr=${transactionRef}&url=${encodeURIComponent(callbackUrl)}`;

    setIsProcessing(true);
    if (Platform.OS === 'android') {
      Linking.openURL(upiUrl).catch(() => {
        Alert.alert('Error', 'No UPI app found. Please install a UPI app.');
        setIsProcessing(false);
      });
    } else {
      Alert.alert('Unsupported', 'UPI payments are supported on Android devices only.');
      setIsProcessing(false);
    }
  };

  // Handle deep link for post-payment confirmation
  useEffect(() => {
    const handleUrl = ({ url }) => {
      if (url.includes('payment')) {
        // Show confirmation prompt
        Alert.alert(
          'Confirm Payment',
          'Did you complete the payment successfully?',
          [
            { text: 'No', onPress: () => { /* handle failure */ setIsProcessing(false); } },
            { text: 'Yes', onPress: () => verifyPayment() },
          ]
        );
      }
    };
    // Add event listener
    addEventListener(handleUrl);
    // Check if app was opened from a link
    getInitialURL().then((url) => {
      if (url) handleUrl({ url });
    });
  }, []);

  const verifyPayment = () => {
    // Here, you would verify with your backend if needed
    Alert.alert('Payment Verified', 'Thank you for your purchase!');
    setIsProcessing(false);
    // Navigate back or to order confirmation
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>Price: ₹{product.price}</Text>
      <TouchableOpacity
        style={styles.payButton}
        onPress={initiateUPIPayment}
        disabled={isProcessing}
      >
        <Text style={styles.payButtonText}>{isProcessing ? 'Processing...' : 'Pay with UPI'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 20, marginBottom: 30 },
  payButton: { backgroundColor: '#FF3B2F', padding: 15, borderRadius: 10, alignItems: 'center' },
  payButtonText: { color: '#fff', fontSize: 16 },
});

export default CheckoutScreen;
