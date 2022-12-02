import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { COLORS } from './src/component/Constant/Color';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './src/service/Auth';
import { setUser } from './src/redux/reducer/user';
import NavigationStack from './src/navigation/NavigationStack';
import AuthenticationStack from './src/navigation/AuthenticationStack';
import Navigation from './src/service/Navigation';

const Stack = createStackNavigator();

export default function App() {
  const dispatch = useDispatch();

  const { userData, login } = useSelector(state => state.User);
  // const [login, setLogin] = useState(false);

  const [loginChk, setLoginChk] = useState(true);

  useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    let data = await Auth.getAccount();
    console.log('data fetched: ', data);
    if (data !== null) {
      dispatch(setUser(data));
      setLoginChk(false);
    } else {
      setLoginChk(false);
    }
  }

  if (loginChk) {
    return null;
  }

  return (
    <NavigationContainer ref={r => Navigation.setTopLevelNavigator(r)}>
      <Stack.Navigator
        detachInactiveScreens={false}
        initialRouteName="Auth"
        screenOptions={{
          cardStyle: { backgroundColor: COLORS.white },
          gestureEnabled: true,
          backgroundColor: COLORS.button,
          gestureDirection: 'horizontal',
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        {!login
          ? <Stack.Screen name="Auth" component={AuthenticationStack} />
          : <Stack.Screen name="AppStack" component={NavigationStack} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}