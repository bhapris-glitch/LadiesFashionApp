import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const products = [
  { id: '1', name: 'Elegant Ladies Dress', price: 500 },
  { id: '2', name: 'Stylish Saree', price: 1200 },
  { id: '3', name: 'Designer Kurtis', price: 800 },
];

const ProductListScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>₹{item.price}</Text>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => navigation.navigate('Checkout', { product: item })}
      >
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  list: { paddingBottom: 20 },
  itemContainer: { marginBottom: 20, padding: 15, backgroundColor: '#f8f8f8', borderRadius: 8 },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  itemPrice: { fontSize: 16, marginVertical: 5 },
  buyButton: { backgroundColor: '#FF3B2F', padding: 10, borderRadius: 5, alignItems: 'center' },
  buyButtonText: { color: '#fff', fontSize: 16 },
});

export default ProductListScreen;
