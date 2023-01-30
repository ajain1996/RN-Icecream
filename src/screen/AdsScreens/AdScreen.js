import {View, Text, Modal, Button, Alert} from 'react-native';
import React from 'react';
import {commonStyles} from '../../utils/Styles';
import {StyleSheet} from 'react-native';
import {membersHeader} from './membersHeader';
import {COLORS} from '../../component/Constant/Color';
import {Image} from 'react-native';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {getAllUsersAPI} from '../../utils/API';
import {useEffect} from 'react';
import {TextInput, TouchableHighlight} from 'react-native-gesture-handler';
import {Settings} from 'react-native';
import {height, width} from '../../utils/utils';
import {imageBase} from '../auth/UpdateUserScreenIn';
import {color} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState} from 'react';
import {useRef} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
const initialValue = {
  image: '',
  userId: null,
  text: '',
};
export default function AdsScreen({navigation}) {
  const {userData, isFreeAccess} = useSelector(state => state.User);
  const [members, setMembers] = React.useState([]);
  const [tempMember, setTempMember] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState('');

  const [isSearching, setIsSearching] = useState(false);
  const [formData, setFormData] = useState({
    ...initialValue,
    userId: userData.id,
  });

  const [modalVisible, setModalVisible] = React.useState(false);
  const [count, setCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const scrollRef = useRef();
  React.useEffect(() => {
    getAllUsersAPI(response => {
      if (response !== null) {
        console.log('get response');
        if (response?.status?.toLocaleLowerCase() === 'sucess') {
          console.log('\n\n getAllUsersAPI response: ', response?.data);
          setMembers(response?.data);
          setTempMember(response.data.slice(0, 30));
        }
      }
    });
  }, []);
  // useEffect(() => {
  //   console.log(searchInput, '<<<sear');
  //   if (searchInput == '') {
  //     setTempMember(members.slice(0, 30));
  //   } else {
  //     filterIt(searchInput);
  //   }
  // }, [searchInput]);

  const PressNext = () => {
    console.log(count, '<<<this is count');
    if (count != members.length % 30) {
      let first = (count + 1) * 30;
      let sec = first + 30;
      setTempMember(members.slice(first, sec));
      setCount(count + 1);
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }
  };
  const PressPrev = () => {
    console.log(count, '<<<<<this is count');
    if (count > 0) {
      let first = (count - 1) * 30;
      let sec = first + 30;
      setTempMember(members.slice(first, sec));
      setCount(count - 1);
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }
  };
  const getImage = () => {
    launchImageLibrary(options, response => {
      if (response?.didCancel) {
      } else if (response?.error) {
      } else if (response?.customButton) {
      } else {
        console.log(response.assets[0].uri, '<<<<this is selected image');
        setFormData({...formData, image: response.assets[0].uri});
      }
    });
  };

  const onSubmit = () => {
    // if(formData.)
  };

  const handleChange = (name, value) => {
    if (errorMsg != '') {
      setErrorMsg('');
    }
    setFormData({...formData, [name]: value});
  };
  console.log(formData, '<<<formdata');
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      {/* {membersHeader(navigation, setSearchInput, searchInput)} */}

      <View style={styles.headerContainer}>
        <TouchableHighlight
          onPress={() => navigation.goBack()}
          underlayColor="#eee">
          <Image
            source={require('../../assets/left-arrow.png')}
            resizeMode="contain"
            style={{width: 25, height: 25}}
          />
        </TouchableHighlight>

        <View>
          <Text
            style={{
              marginLeft: 20,
              color: 'black',
              fontWeight: 'bold',
            }}>
            All Ads
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text
          onPress={() => {
            // navigation.navigate('CreateProductScreen');
            setModalVisible(true);
            return null;
            if (isFreeAccess) {
              // setModalVisible(true);
            } else {
              Alert.alert(
                'Free Plan Expired',
                'Your free (7) days plan has expired. Please buy membership',
                [
                  {
                    text: 'Cancel',
                    // onPress: async () => {
                    //   navigation.navigate('UpdateUserScreenIn');
                    // }
                  },
                  {
                    text: 'Go to buy',
                    onPress: async () => {
                      navigation.navigate('UpdateUserScreenIn');
                    },
                  },
                ],
              );
            }
          }}
          style={{
            color: '#000',
            width: 120,
            textAlign: 'center',
            fontWeight: 'bold',
            marginVertical: 5,
            paddingVertical: 8,
            backgroundColor: '#BDBDBD',
            borderRadius: 10,
          }}>
          Create Ad
        </Text>
      </View>
      <ScrollView ref={scrollRef}>
        {isSearching && (
          <>
            <ActivityIndicator />
          </>
        )}

        {!isSearching &&
          tempMember?.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.itemWrapper}
                key={index}
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('MemberDetailScreen', {
                    item: item,
                  });
                }}>
                <View
                  style={{
                    width: '100%',
                    padding: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.memberName}>
                    {item?.name == 'null' ? 'Member name' : item?.name}
                  </Text>
                </View>
                <View style={styles.itemContent}>
                  <Image
                    source={{
                      uri:
                        item.user_profile != null
                          ? imageBase + item.user_profile
                          : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
                    }}
                    style={styles.itemImg}
                  />
                  {/* {item?.user_profile?.includes('http') ? (
                    <Image
                      source={{
                        uri:
                          'https://icecream.drazs.com/api/storage/app/' +
                          item?.user_profile,
                      }}
                      style={styles.itemImg}
                    />
                  ) : (
                    <Image
                      source={{
                        uri:
                          item.user_profile != null
                            ? imageBase + item.user_profile
                            : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
                      }}
                      style={styles.itemImg}
                    />
                  )} */}
                  {/* <View style={styles.memberNameBlock}>
                    <Text style={[styles.memberName, {color: COLORS.theme}]}>
                      {item?.short_name == 'null' ? '' : item?.short_name}
                    </Text>
                    <Text style={styles.conpanyName}>
                      (
                      {item?.organization_name == 'null'
                        ? 'Organization Name'
                        : item?.organization_name}
                      )
                    </Text>
                    <Text style={{...commonStyles.fs10_400, color: '#000'}}>
                      ({item?.email == 'null' ? 'not provided' : item?.email})
                    </Text>

                    <Text style={styles.memberAddress}>
                      Address:{' '}
                      {item?.address_1 == 'null' ? '' : item?.address_1}
                    </Text>
                    <Text style={styles.companywebsite}>
                      Website: (
                      {item.address_3 == 'null' ||
                      item.address_3 == '' ||
                      item.address_3 == null
                        ? '(Not provided)'
                        : item.address_3}
                      )
                    </Text>
                  </View> */}
                </View>
              </TouchableOpacity>
            );
          })}

        <View style={{height: 20}} />
        <TouchableOpacity
          style={{
            // position: 'absolute',
            // backgroundColor: '#000',
            width: '100%',

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // marginHorizontal: 15,
            zIndex: 99,
            color: '#fff',
            borderRadius: 20,
          }}>
          <Text
            style={{
              width: 85,
              paddingVertical: 10,
              borderRadius: 20,
              // height: 25,
              marginLeft: 10,
              backgroundColor: count == 0 ? '#808080' : '#000',
              textAlign: 'center',
              color: '#fff',
              alignSelf: 'flex-start',
              // flexDirection: 'row',
              // alignItems: 'center',
            }}
            onPress={PressPrev}>
            Previous
          </Text>
          <Text
            style={{
              width: 85,
              paddingVertical: 10,
              alignSelf: 'flex-end',
              borderRadius: 20,
              // height: 25,
              color: '#fff',
              marginRight: 10,
              backgroundColor:
                count == members.length % 30 ? '#808080' : '#000',
              textAlign: 'center',
              // flexDirection: 'row',
              // alignItems: 'center',
            }}
            onPress={PressNext}>
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 19,

                // marginTop: 20,
                marginBottom: 10,
              }}>
              Create Ad
            </Text>
            <TouchableOpacity onPress={getImage}>
              <Text>Add Image</Text>
            </TouchableOpacity>
            <View style={{height: 10}} />

            <Image
              source={{uri: formData?.image}}
              style={{minWidth: 200, height: 150}}
            />
            <View style={{height: 10}} />

            <TouchableOpacity style={styles.btnModal}>
              <Text style={{...styles.btnText}} onPress={onSubmit}>
                Submit
              </Text>
            </TouchableOpacity>
            {errorMsg != '' && (
              <Text style={{color: '#FF0000'}}>{errorMsg}</Text>
            )}
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                padding: 15,
                borderRadius: 30,
              }}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{fontWeight: '800', fontSize: 18}}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{width: width / 1.5, height: height / 3}}
              source={require('../../assets/iicbs.jpeg')}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                padding: 15,
                borderRadius: 30,
              }}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{fontWeight: '800', fontSize: 18}}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    elevation: 9,
    shadowColor: '#999',
    backgroundColor: COLORS.theme,
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 14,
  },
  itemContent: {
    ...commonStyles.rowStart,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  itemImg: {
    width: '100%',
    height: 150,
    objectfit: 'cover',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  memberNameBlock: {
    width: '100%',
    padding: 16,
    paddingTop: 5,
    width: '80%',
  },
  memberName: {
    ...commonStyles.fs18_500,
    color: '#fff',
    fontSize: 15,
  },
  conpanyName: {
    ...commonStyles.fs12_400,
    color: COLORS.theme,
  },
  memberAddress: {
    ...commonStyles.fs18_500,
    marginTop: 5,
  },
  companywebsite: {
    ...commonStyles.fs12_400,
    color: COLORS.theme,
    marginTop: 5,
  },
  headerContainer: {
    ...commonStyles.rowStart,
    width: '100%',
    height: 62,
    ...commonStyles.elevation9,
    paddingHorizontal: 20,
  },
  // searchInput: {
  searchInput: {
    borderWidth: 1,
    borderColor: '#999',
    width: width / 1.5,
    // marginLeft: 20,
    height: 45,
    borderRadius: 6,
    paddingHorizontal: 14,
  },
  // },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnText: {
    ...commonStyles.fs16_500,
    // color: '#fff',
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
