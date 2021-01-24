import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/Home';
import App from '../components/App';

import TabBar from '../components/TabBar';


const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name='Home'
        component={Home}
        initialParams={{ icon: 'home' }}
      />
      <Tab.Screen
        name='Ubicacón'
        component={App}
        initialParams={{ icon: 'plus' }}
      />
      
    </Tab.Navigator>
  );
};

export default TabNavigator;
