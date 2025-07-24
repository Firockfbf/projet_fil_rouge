// mobile-app/screens/HomeScreen.jsx
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import api from '../utils/api';
import { SubscriptionContext } from '../contexts/SubscriptionContext';

export default function HomeScreen() {
  const [services, setServices] = useState([]);
  const { addSubscription } = useContext(SubscriptionContext);

  useEffect(() => {
    api.get('/api/services')
      .then(res => setServices(res.data))
      .catch(console.error);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.price}>{item.price} €</Text>
      <Button title="S’abonner" onPress={() => addSubscription(item.id)} />
    </View>
  );

  return (
    <FlatList
      data={services}
      keyExtractor={i => i.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.empty}>Chargement...</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: { marginBottom: 20, padding: 16, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  image: { width: '100%', height: 150, borderRadius: 6, marginBottom: 8 },
  title: { fontSize: 18, fontWeight: 'bold' },
  price: { marginVertical: 8, fontSize: 16, color: '#007AFF' },
  empty: { textAlign: 'center', marginTop: 50 },
});
