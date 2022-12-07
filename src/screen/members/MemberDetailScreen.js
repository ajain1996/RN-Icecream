import {View, Text} from 'react-native';
import React from 'react';
import CustomHeader from '../../component/Header/CustomHeader';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../component/Constant/Color';
import {commonStyles} from '../../utils/Styles';
import {Image} from 'react-native';
import {image_tap} from '../../component/image_tap';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';

export default function MemberDetailScreen({navigation, route}) {
  const {item} = route?.params;

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <CustomHeader title="Member Details" />

      <ScrollView>
        <View
          style={styles.itemWrapper}
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate('MemberDetailScreen');
          }}>
          <View style={{width: '100%', padding: 14}}>
            <Text style={styles.memberName}>
              {item?.name === null ? 'Not available' : item?.name}
            </Text>
            <Text style={{...commonStyles.fs12_400, color: '#fff'}}>
              ({item?.email === null ? 'Not available' : item?.email})
            </Text>
          </View>
          <View style={styles.itemContent}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
              }}
              style={styles.itemImg}
            />
            <View style={styles.memberNameBlock}>
              <Text
                style={[
                  styles.memberName,
                  {color: COLORS.theme, marginTop: 8},
                ]}>
                {item?.short_name === null ? 'Not available' : item?.short_name}
              </Text>
              <Text style={styles.conpanyName}>
                (
                {item?.organization_name === null
                  ? 'organization name not provided'
                  : item?.organization_name}
                )
              </Text>
            </View>
          </View>

          <View
            style={{
              padding: 20,
              backgroundColor: '#fff',
              ...commonStyles.rowBetween,
              marginTop: -8,
            }}>
            <TouchableOpacity style={styles.btn} onPress={() => {}}>
              <Text style={styles.btnText}>Show Phone Number</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOutline} onPress={() => {}}>
              <Text style={styles.btnTextOutlined}>MAKE AN ENQUIRY</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemWrapper2}>
          <View
            style={{
              width: '100%',
              padding: 14,
              backgroundColor: COLORS.theme,
              borderTopRightRadius: 8,
              borderTopLeftRadius: 8,
            }}>
            <Text style={styles.memberName}>Address Compensation</Text>
          </View>

          <View style={{...commonStyles.rowStart}}>
            {image_tap(require('../../assets/home.png'), 20, () => {})}
            <Text style={[styles.memberAddress, {marginTop: 0}]}>
              {item?.address_1 === null ? '' : item?.address_1 + ','}{' '}
              {item?.address_2 === null ? '' : item?.address_2 + ','}{' '}
              {item?.address_3 === null ? '' : item?.address_3 + ','}{' '}
              {item?.state === null ? '' : item?.state + '.'}{' '}
              {item?.city === null ? '' : item?.city + ','}{' '}
              {item?.country === null ? '' : item?.country}
            </Text>
          </View>

          <View style={{...commonStyles.rowStart}}>
            {image_tap(require('../../assets/enquiry.png'), 20, () => {})}
            <Text style={styles.memberAddress}>
              {item?.mobile_2 === null ? 'Not available' : item?.mobile_2}
            </Text>
          </View>

          <View style={{...commonStyles.rowStart, marginTop: -8}}>
            {image_tap(require('../../assets/earth.png'), 20, () => {})}
            <Text style={styles.memberAddress}>memberwebsite.com</Text>
          </View>

          <View style={{...commonStyles.rowStart, marginTop: -8}}>
            {image_tap(require('../../assets/card.png'), 20, () => {})}
            <Text style={styles.memberAddress}>
              PAN:{' '}
              {item?.pan_number === null ? 'Not available' : item?.pan_number}
            </Text>
          </View>

          {/* <View style={{ ...commonStyles.rowStart, marginTop: -8 }}>
                        {image_tap(require('../../assets/members.png'), 20, () => { })}
                        <Text style={styles.memberAddress}>turnover: AADHARNUMBAR</Text>
                    </View> */}
          <View style={{...commonStyles.rowStart, marginTop: -8}}>
            {image_tap(require('../../assets/members.png'), 20, () => {})}
            <Text style={styles.memberAddress}>
              TURNOVER:{' '}
              {item?.turnover === null ? 'Not available' : item?.turnover}
            </Text>
          </View>

          <View style={{...commonStyles.rowStart, marginTop: -8}}>
            {image_tap(require('../../assets/tax.png'), 20, () => {})}
            <Text style={styles.memberAddress}>
              GST:{' '}
              {item?.gst_number === null ? 'Not available' : item?.gst_number}
            </Text>
          </View>
        </View>

        <View style={styles.itemWrapper2}>
          <View
            style={{
              width: '100%',
              padding: 14,
              backgroundColor: COLORS.theme,
              borderTopRightRadius: 8,
              borderTopLeftRadius: 8,
            }}>
            <Text style={styles.memberName}>Business Profile</Text>
          </View>
          <View
            style={{
              ...commonStyles.rowStart,
              paddingHorizontal: 16,
              paddingBottom: 12,
            }}>
            <Text
              style={[styles.memberAddress, {marginTop: 12, width: '100%'}]}>
              180 Local street, Member Address, Member address 2 180 Local
              street, Member Address, Member address 2 180 Local street, Member
              Address, Member address 2 street, Member Address, Member address 2
              street, Member Address, Member
            </Text>
          </View>
        </View>
        <View style={{height: 20}} />
      </ScrollView>
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
  itemWrapper2: {
    elevation: 9,
    shadowColor: '#999',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 14,
  },
  itemContent: {
    ...commonStyles.rowStart,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  itemImg: {
    width: 75,
    height: 75,
    borderRadius: 100,
    marginTop: 20,
  },
  memberNameBlock: {
    width: '100%',
    padding: 16,
    width: '80%',
  },
  memberName: {
    ...commonStyles.fs18_500,
    color: '#fff',
  },
  conpanyName: {
    ...commonStyles.fs12_400,
    color: COLORS.theme,
  },
  memberAddress: {
    ...commonStyles.fs13_600,
    width: '90%',
  },
  companywebsite: {
    ...commonStyles.fs12_400,
    color: COLORS.theme,
    marginTop: 5,
  },
  btn: {
    backgroundColor: COLORS.theme,
    width: '49%',
    height: 42,
    borderRadius: 9,
    elevation: 1,
    shadowColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOutline: {
    backgroundColor: '#fff',
    width: '49%',
    height: 42,
    borderRadius: 9,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  btnTextOutlined: {
    color: '#000',
    fontSize: 12,
    marginTop: 2,
  },
});
