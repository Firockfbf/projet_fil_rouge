// mobile-app/src/pages/PurchasePage.jsx
import React, { useContext, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { SubscriptionContext } from '../contexts/SubscriptionContext';

export default function PurchasePage({ route, navigation }) {
  const { service } = route.params;
  const { addSubscription } = useContext(SubscriptionContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      await addSubscription(service.id, 1);
      navigation.navigate('MySubscriptions');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.name}</Text>
      <Text>{service.description}</Text>
      <Text style={styles.price}>{service.price} € / mois</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Confirmer l’abonnement" onPress={handleConfirm} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 8 },
  price: { fontSize: 18, marginVertical: 16 },
  error: { color: 'red', marginBottom: 8 },
});
