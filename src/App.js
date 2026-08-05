import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from './screens/ProductListScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import { handleDeepLink } from './services/deepLinking';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Handle incoming deep links
    handleDeepLink();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Ladies Fashion' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
