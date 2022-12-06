import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { COLORS } from '../component/Constant/Color';
import Login from '../screen/auth/Login';
import Register from '../screen/auth/Register';
import { VerifyOTP } from '../screen/auth/VerifyOTP';
import SplashUserScreen from '../screen/auth/SplashUserScreen';
import UpdateUserScreen from '../screen/auth/UpdateUserScreen';
import HomeScreen from '../screen/home/HomeScreen';
import BottomTabs from '../bottom_tabs/bottom_tabs';
import BlogsDetailScreen from '../screen/blogs/BlogsDetailScreen';
import MembersScreen from '../screen/members/MembersScreen';
import MemberDetailScreen from '../screen/members/MemberDetailScreen';
import ProductDetailScreen from '../screen/products/ProductDetailScreen';
import ProductSubCategoryScreen from '../screen/products/ProductSubCategoryScreen';

const Stack = createStackNavigator();

export default function AuthenticationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "#fff" },
        gestureEnabled: true,
        backgroundColor: COLORS.button,
        gestureDirection: 'horizontal',
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="Root"
    >
      <Stack.Screen name="Root" component={BottomTabs} />
      <Stack.Screen name="SplashUserScreen" component={SplashUserScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="UpdateUserScreen" component={UpdateUserScreen} />
      <Stack.Screen name="BlogsDetailScreen" component={BlogsDetailScreen} />
      <Stack.Screen name="MembersScreen" component={MembersScreen} />
      <Stack.Screen name="MemberDetailScreen" component={MemberDetailScreen} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      <Stack.Screen name="ProductSubCategoryScreen" component={ProductSubCategoryScreen} />
    </Stack.Navigator>
  );
}
