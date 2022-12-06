import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLORS, SIZES } from '../component/Constant/Color';
import NewsScreen from '../screen/news/NewsScreen';
import BlogsScreen from '../screen/blogs/BlogsScreen';
import ChatScreen from '../screen/ChatScreen';
import HomeScreen from '../screen/home/HomeScreen';
import { commonStyles } from '../utils/Styles';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const { userData } = useSelector(state => state.User);
    console.log('\n\n userData?.userProfile: ', userData);

    return (
        <Tab.Navigator
            screenOptions={{
                showLabel: false,
                tabBarLabel: '',
                tabBarStyle: {
                    position: 'absolute',
                    borderRadius: 0,
                    height: 64,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopStartRadius: 8,
                    borderTopEndRadius: 8,
                    elevation: 20,
                    shadowColor: '#000',
                    width: SIZES.width,
                    backgroundColor: '#fff',
                },
            }}>
            <Tab.Screen
                name="FeedsTab"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <BuildTabComponent
                                image={require('../assets/feeds.png')}
                                text="Feeds"
                                focused={focused}
                                userData={userData}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="NewsTab"
                component={NewsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <BuildTabComponent
                                image={require('../assets/news.png')}
                                text="News"
                                focused={focused}
                                userData={userData}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="BlogsTab"
                component={BlogsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <BuildTabComponent
                                image={require('../assets/blogs.png')}
                                text={`Blogs`}
                                focused={focused}
                                userData={userData}
                            />
                        );
                    },
                }}
            />
            {Object.keys(userData)?.length !== 0 ? (
                <Tab.Screen
                    name="ChatsTab"
                    component={ChatScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            return (
                                <BuildTabComponent
                                    image={require('../assets/chat.png')}
                                    text="Chat"
                                    focused={focused}
                                    userData={userData}
                                />
                            );
                        },
                    }}
                />
            ) : (
                <></>
            )}
        </Tab.Navigator>
    );
};

const BuildTabComponent = ({ image, text, focused, userData }) => {
    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: focused ? '#999' : '#fff',
                width: Object.keys(userData)?.length === 0 ? SIZES.width / 3 : SIZES.width / 4,
            }}>
            <View style={{ width: 60, alignItems: 'center', paddingTop: 2 }}>
                <Image
                    source={image}
                    resizeMode="contain"
                    style={{
                        width: 23,
                        height: 23,
                        tintColor: focused ? COLORS.white : '#000',
                    }}
                />
                <Text
                    style={{
                        fontSize: 10.5,
                        fontWeight: '400',
                        color: focused ? COLORS.white : '#000',
                        lineHeight: 11,
                        textAlign: 'center',
                        marginTop: 8,
                    }}>
                    {text}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: SIZES.width / 6,
        width: SIZES.width / 4,
        marginBottom: -15,
        backgroundColor: '#dcdcdc',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BottomTabs;
