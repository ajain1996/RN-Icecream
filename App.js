import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {COLORS} from './src/component/Constant/Color';
import {useDispatch, useSelector} from 'react-redux';
import Auth from './src/service/Auth';
import {setUser} from './src/redux/reducer/user';
import NavigationStack from './src/navigation/NavigationStack';
import AuthenticationStack from './src/navigation/AuthenticationStack';
import Navigation from './src/service/Navigation';
import {Alert} from 'react-native';
import {getUserById} from './src/utils/API';

const Stack = createStackNavigator();

export default function App() {
  const dispatch = useDispatch();

  const {userData, login} = useSelector(state => state.User);
  // const [login, setLogin] = useState(false);

  const [loginChk, setLoginChk] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let data = await Auth.getAccount();
    console.log('data fetched: ', data);
    console.log('User fetched: ', data);
    Alert.alert('splash');
    // console.log('\n\n\n\n\n\n\n\n', data, '<<<<\n\n\n\n\n\n this is data');
    // return null;
    if (data !== null) {
      getUserById(data.id, async res => {
        console.log(
          '\n\n\n\n new user data\n\n\n\n\n',
          {...res.data, business_category: res.business_category},
          '\n\n\n\n<<< thsi iiser user',
        );
        await Auth.setAccount({
          ...res.data,
          business_category: res.business_category,
        });

        dispatch(
          setUser({...res.data, business_category: res.business_category}),
        );
        setLoginChk(false);
      });
    } else {
      console.log('Need to login');

      setLoginChk(false);
    }
  };

  if (loginChk) {
    return null;
  }

  return (
    <NavigationContainer ref={r => Navigation.setTopLevelNavigator(r)}>
      <Stack.Navigator
        detachInactiveScreens={false}
        initialRouteName="Auth"
        screenOptions={{
          cardStyle: {backgroundColor: COLORS.white},
          gestureEnabled: true,
          backgroundColor: COLORS.button,
          gestureDirection: 'horizontal',
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        {!login ? (
          <Stack.Screen name="Auth" component={AuthenticationStack} />
        ) : (
          <Stack.Screen name="AppStack" component={NavigationStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
