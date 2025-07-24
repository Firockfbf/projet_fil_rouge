import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { TailwindProvider } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
      <Text className="text-2xl font-bold">Mon SaaS Mobile</Text>
      <Button title="Voir services" onPress={() => navigation.navigate('Products')} />
    </SafeAreaView>
  );
}

function ProductsScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
      <Text>Liste des services (à implémenter)</Text>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Products" component={ProductsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
