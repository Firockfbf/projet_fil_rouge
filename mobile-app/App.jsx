// mobile-app/App.jsx
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import SubscriptionsScreen from './screens/SubscriptionsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mes abonnements" component={SubscriptionsScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user } = useContext(AuthContext);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user
        ? <Stack.Screen name="App" component={AppTabs} />
        : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )
      }
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SubscriptionProvider>
    </AuthProvider>
  );
}
