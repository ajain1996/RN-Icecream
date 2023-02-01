import Icon from 'react-native-vector-icons/Ionicons';
import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import moment from 'moment';
import {COLORS} from '../../component/Constant/Color';
import ChatHeader from '../../component/Header/ChatHeader';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import RenderMessageBlock from './renderMessageComponent';
import RenderMessageImgComponent from './renderMessageImgComponent';
import {commonStyles} from '../../utils/Styles';
import TextStrings from '../../utils/TextStrings';
import {getMessage, SendMessage} from '../../utils/API';
import {color} from 'react-native-reanimated';
import {useState} from 'react';
// import { Icon } from 'react-native-elements';

const SingleChatScreen = props => {
  const {userData} = useSelector(state => state.User);

  const {data} = props.route.params;

  const [msg, setMsg] = React.useState('');
  const [disabled, setdisabled] = React.useState(false);
  const [allChat, setallChat] = React.useState([]);
  const [toggleChat, setToggleChat] = useState(false);

  const [formData, setFormData] = React.useState({
    user1: 2,
    user2: 3,
    message: 'message',
  });

  useEffect(() => {
    getMessage(formData, res => {
      console.log(res, '<<<getmessage');
      setallChat(res.data.reverse());
    });
  }, [toggleChat]);
  useEffect(() => {
    setInterval(() => {
      getMessage(formData, res => {
        console.log(res, '<<<getmessage');
        setallChat(res.data.reverse());
      });
    }, 15000);
  }, []);

  const msgValid = txt => txt && txt.replace(/\s/g, '').length;

  const sendMsg = dataVal => {
    if (formData.message === '' || msgValid(formData.message) === 0) {
      Toast.show('Enter something....');
      return false;
    }
    console.log(formData);
    SendMessage(formData, res => {
      console.log('res', res);
      if (res.Status) {
        console.log(res, '<<<<< thisis');
        setToggleChat(!toggleChat);
        setFormData({...formData, message: ''});
      }
    });
    // setdisabled(true);

    let msgData = {};
  };

  const picImage = () => {
    launchImageLibrary('photo', async response => {
      ImgToBase64.getBase64String(response.assets[0].uri)
        .then(async base64String => {
          let source = 'data:image/jpeg;base64,' + base64String;
          sendMsg(source);
        })
        .catch(err => {});
    });
  };

  return (
    <View style={commonStyles.flex1}>
      <ChatHeader data={data} />
      <ImageBackground
        source={require('../../assets/Background.jpg')}
        style={commonStyles.flex1}>
        <FlatList
          style={commonStyles.flex1}
          data={allChat}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          inverted
          renderItem={({item}) => {
            return (
              <View
                style={{
                  backgroundColor: item.sender == 2 ? 'white' : 'green',
                  alignSelf: item.sender == 2 ? 'flex-end' : 'flex-start',
                  //   width: 200,
                  padding: 5,
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  marginTop: 10,
                  color: '#000',
                }}>
                <Text style={{color: '#000'}}>{item?.messages}</Text>
              </View>
            );

            // if (item.image === '') {
            //   return (
            //   <Text>
            //     {}
            //   </Text>
            //   );
            // } else {
            //   return (
            //     <RenderMessageImgComponent
            //       item={item}
            //       sender={item.from === userData.id}
            //     />
            //   );
            // }
          }}
        />
      </ImageBackground>

      <View style={styles.inputWrapper}>
        <View style={{width: 5}} />
        <TextInput
          style={styles.inputStyle}
          placeholder={TextStrings.TYPE_A_MESSAGE}
          placeholderTextColor={COLORS.black}
          multiline={true}
          value={formData.message}
          onChangeText={val => {
            setFormData({...formData, message: val});
          }}
        />
        <View style={{width: 8}} />

        {/* <View style={{width: 8}} /> */}

        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            sendMsg(msg);
          }}>
          <Text
            style={{
              backgroundColor: 'white',
              padding: 3,
              paddingHorizontal: 8,
              borderRadius: 10,
              color: 'black',
            }}>
            Send
          </Text>
        </TouchableOpacity>
        <View style={{width: 5}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: COLORS.theme,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    justifyContent: 'space-evenly',
  },
  inputStyle: {
    backgroundColor: COLORS.white,
    width: '72%',
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: COLORS.white,
    paddingHorizontal: 15,
    color: COLORS.black,
  },
});

export default SingleChatScreen;
