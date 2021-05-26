import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Home';
import India from './src/India'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ModalPortal } from 'react-native-modals';
import graph from './src/graph'
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();



export default function App() {
  return (

    <NavigationContainer>
<ModalPortal/>
      <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="World" component={Home} />

      <Tab.Screen name="India" component={India}/>
      <Tab.Screen name="Graph" component={graph}/>
    </Tab.Navigator>
    
    </NavigationContainer>
    
  );
}