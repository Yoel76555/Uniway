import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import Apply from '../screens/ApplyScreen';


export const AppTabNavigator = createBottomTabNavigator({
  HomeScreen : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon :   <Image source={require("../assets/home-icon.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "HomeScreen",
    }
  },
  ApplyRequest: {
    screen: Apply,
    navigationOptions :{
      tabBarIcon :<Image source={require("../assets/Apply-icon.png")} style={{width:20, height:20,}} />,
      tabBarLabel : "Apply",
    }
  }
});