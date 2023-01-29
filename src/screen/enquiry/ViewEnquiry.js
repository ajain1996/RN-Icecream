import {View, Text, Modal, Button, Alert} from 'react-native';
import React from 'react';
import {commonStyles} from '../../utils/Styles';
import {StyleSheet} from 'react-native';
import {membersHeader} from './membersHeader';
import {COLORS} from '../../component/Constant/Color';
import {Image} from 'react-native';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {getAllUsersAPI, getReceivedEnquiry} from '../../utils/API';
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

export default function ViewEnquiry({navigation}) {
  const [members, setMembers] = React.useState([]);
  const [tempMember, setTempMember] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [count, setCount] = useState(0);

  const scrollRef = useRef();
  React.useEffect(() => {
    getReceivedEnquiry(1, response => {
      if (response !== null) {
        console.log(response, '<<<allenquiries');
        // console.log('get response');
        if (response?.Status == true) {
          setMembers(response?.data);
          //   console.log('\n\n getAllUsersAPI response: ', response?.data);
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

  const filterIt = text => {
    console.log(text, '<<<this is text');
    // return null;
    if (text == '') {
      setTempMember(members);
      // return null;
    }
    setIsSearching(true);
    // const matchIt = members.filter(item => {

    const tempArr = members.slice(0, 200);
    const matchIt = tempArr.filter(item => {
      if (item.discussion != null) {
        const name = item.discussion.toLocaleLowerCase();
        const field = text.toLocaleLowerCase();
        if (name.match(field)) return true;
      }
      if (item.contact != null) {
        const name = item.contact;
        const field = text.toLocaleLowerCase();
        if (name.match(field)) return true;
      }
    });
    setTempMember(matchIt);
    setIsSearching(false);
  };
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

        <TextInput
          placeholder="Search Members"
          placeholderTextColor="#999"
          onChangeText={text => {
            console.log(text);
            // setSearchInput(text);
            filterIt(text);
          }}
          style={styles.searchInput}
        />
      </View>
      <ScrollView ref={scrollRef}>
        {isSearching && (
          <>
            <ActivityIndicator />
          </>
        )}

        {!isSearching &&
          tempMember?.map((item, index) => {
            const da = new Date(item.created_at);
            return (
              <TouchableOpacity
                style={styles.itemWrapper}
                key={index}
                activeOpacity={0.9}>
                <View
                  style={{
                    width: '100%',
                    padding: 7,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.memberName}>
                    {item?.discussion == 'null' ? 'Topic' : item?.discussion}
                  </Text>
                  <Text style={{...styles.memberName, fontSize: 12}}>
                    {da.getDate() +
                      '/' +
                      da.getMonth() +
                      1 +
                      '/' +
                      da.getUTCFullYear()}{' '}
                    - {da.getHours() + ':' + da.getMinutes()}
                  </Text>
                </View>
                <View style={styles.itemContent}>
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
                  <View style={styles.memberNameBlock}>
                    <Text style={{...styles.memberAddress, fontSize: 12}}>
                      Contact : {item.contact}{' '}
                    </Text>
                    <Text style={styles.memberAddress}>Description: </Text>
                    <Text style={styles.companywebsite}>
                      {item?.description == 'null'
                        ? 'Organization Name'
                        : item?.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        {tempMember.length == 0 && (
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              No Enquiry Found
            </Text>
          </View>
        )}

        <View style={{height: 20}} />
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </ScrollView>
      <Modal
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
      </Modal>
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
    width: 60,
    height: 60,
    borderRadius: 100,
    marginTop: 20,
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
    // height: '100%',
  },
  headerContainer: {
    ...commonStyles.rowStart,
    width: '100%',
    height: 62,
    ...commonStyles.elevation9,
    paddingHorizontal: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#999',
    width: '88%',
    marginLeft: 20,
    height: 45,
    borderRadius: 6,
    paddingHorizontal: 14,
  },
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
