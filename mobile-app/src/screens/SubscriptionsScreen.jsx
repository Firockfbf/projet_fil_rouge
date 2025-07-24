// mobile-app/screens/SubscriptionsScreen.jsx
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SubscriptionContext } from '../contexts/SubscriptionContext';

export default function SubscriptionsScreen() {
  const { subscriptions } = useContext(SubscriptionContext);

  if (!subscriptions) return <Text>Chargement...</Text>;

  if (subscriptions.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Vous n’avez aucun abonnement.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.service.name}</Text>
      <Text>Quantité : {item.quantity}</Text>
    </View>
  );

  return (
    <FlatList
      data={subscriptions}
      keyExtractor={i => i.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  item: { padding: 12, backgroundColor: '#eef', borderRadius: 6, marginBottom: 12 },
  name: { fontWeight: 'bold', marginBottom: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
