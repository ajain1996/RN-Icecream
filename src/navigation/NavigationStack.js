import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { COLORS } from '../component/Constant/Color';
import HomeScreen from '../screen/home/HomeScreen';
import ChatScreen from '../screen/ChatScreen';
import SingleChat from '../screen/chat/SingleChat';
import AllProductsScreen from '../screen/products/AllProductsScreen';
import ProductDetailScreen from '../screen/products/ProductDetailScreen';
import ProductSubCategoryScreen from '../screen/products/ProductSubCategoryScreen';
import BottomTabs from '../bottom_tabs/bottom_tabs';
import NewsScreen from '../screen/news/NewsScreen';
import BlogsScreen from '../screen/blogs/BlogsScreen';
import BlogsDetailScreen from '../screen/blogs/BlogsDetailScreen';
import SingleChatScreen from '../screen/chat/SingleChatScreen';
import UpdateUserScreen from '../screen/auth/UpdateUserScreen';
import CreateProductScreen from '../screen/products/CreateProductScreen';
import MembersScreen from '../screen/members/MembersScreen';
import MyProfileScreen from '../screen/auth/MyProfileScreen';
const Stack = createStackNavigator();

export default function NavigationStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: COLORS.button },
                gestureEnabled: true,
                backgroundColor: COLORS.button,
                gestureDirection: 'horizontal',
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false
            }}
            initialRouteName="Root"
        >
            <Stack.Screen name="Root" component={BottomTabs} />
            <Stack.Screen name="NewsScreen" component={NewsScreen} />
            <Stack.Screen name="BlogsScreen" component={BlogsScreen} />
            <Stack.Screen name="BlogsDetailScreen" component={BlogsDetailScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SingleChat" component={SingleChat} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="AllProductsScreen" component={AllProductsScreen} />
            <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
            <Stack.Screen name="ProductSubCategoryScreen" component={ProductSubCategoryScreen} />
            <Stack.Screen name="SingleChatScreen" component={SingleChatScreen} />
            <Stack.Screen name="UpdateUserScreen" component={UpdateUserScreen} />
            <Stack.Screen name="CreateProductScreen" component={CreateProductScreen} />
            <Stack.Screen name="MembersScreen" component={MembersScreen} />
            <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
        </Stack.Navigator>
    );
}
