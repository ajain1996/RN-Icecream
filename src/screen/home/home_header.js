import {View, StyleSheet} from 'react-native';
import React from 'react';
import {commonStyles} from '../../utils/Styles';
import {image_tap, image_tap2} from '../../component/image_tap';
import Auth from '../../service/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {removeUser} from '../../redux/reducer/user';
import {CustomDrawer} from '../../component/drawer/CustomDrawer';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {COLORS} from '../../component/Constant/Color';
import {TouchableHighlight} from 'react-native';

export function home_header(navigation) {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.User);
  console.log(userData, '<<<<<< \n\n\n\n this is uerData at header');

  const [modalVisible, setModalVisible] = React.useState(false);

  const handleLogout = () => {
    Auth.logout().then(() => {
      dispatch(removeUser([]));
    });
  };

  const showProfile = () => {
    if (userData?.userProfile === null || userData?.userProfile === undefined) {
      return image_tap(require('../../assets/user.png'), 28, () => {
        navigation.navigate('MyProfileScreen');
      });
    } else {
      return image_tap2(userData?.userProfile, 30, () => {
        navigation.navigate('MyProfileScreen');
      });
    }
  };

  return (
    <>
      <View style={styles.headerContainer}>
        {image_tap(require('../../assets/menu.png'), 22, () => {
          setModalVisible(true);
        })}

        {Object.keys(userData)?.length !== 0 ? (
          <View style={{...commonStyles.rowStart}}>
            {showProfile()}
            <View style={{width: 2}} />

            {image_tap(require('../../assets/logout.png'), 20, handleLogout)}
          </View>
        ) : (
          <TouchableHighlight
            style={styles.loginBtn}
            onPress={() => {
              navigation.navigate('SplashUserScreen');
            }}>
            <Text style={{color: '#fff', fontSize: 13}}>SignIn/SignUp</Text>
          </TouchableHighlight>
        )}
      </View>

      <CustomDrawer
        modalVisible={modalVisible}
        callback={() => {
          setModalVisible(false);
        }}
        navigation={navigation}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    ...commonStyles.rowBetween,
    width: '100%',
    height: 60,
    elevation: 9,
    shadowColor: '#999',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
  },
  loginBtn: {
    padding: 8,
    backgroundColor: COLORS.theme,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginRight: 10,
  },
});
