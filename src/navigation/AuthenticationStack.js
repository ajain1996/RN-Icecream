import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { COLORS } from '../component/Constant/Color';
import Login from '../screen/auth/Login';
import Register from '../screen/auth/Register';
import { VerifyOTP } from '../screen/auth/VerifyOTP';
import SplashUserScreen from '../screen/auth/SplashUserScreen';
import UpdateUserScreen from '../screen/auth/UpdateUserScreen';
import CreateProductScreen from '../screen/products/CreateProductScreen';
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
            initialRouteName="SplashUserScreen"
        >
            <Stack.Screen name="SplashUserScreen" component={SplashUserScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
            <Stack.Screen name="UpdateUserScreen" component={UpdateUserScreen} />
            {/* <Stack.Screen name="ProductSubCategoryScreen" component={ProductSubCategoryScreen} /> */}
        </Stack.Navigator>
    );
}
