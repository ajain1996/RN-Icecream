import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import CustomHeader from '../../component/Header/CustomHeader';
import {ScrollView} from 'react-native';
import {COLORS, SIZES} from '../../component/Constant/Color';
import {commonStyles} from '../../utils/Styles';
import {useSelector} from 'react-redux';
import ApplyFormInput from '../../component/ApplyFormInput';
import PersonalLeaveDatePicker from '../../component/CustomDatePicker';
import ApplyFormPicker from '../../component/ApplyFormPicker';

export default function CreateProductEnquiryScreen() {
  const {userType} = useSelector(state => state.UserType);
  const [selectedDate, setselectedDate] = React.useState('');
  const [selectedDateError, setselectedDateError] = React.useState(false);
  const [filter, setFilter] = useState([]);

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <CustomHeader title="Product Management" />
      <ScrollView>
        <Text />
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 8,
            backgroundColor: COLORS.theme,
            padding: 8,
          }}>
          <Text style={{...commonStyles.fs12_400, color: '#fff'}}>
            {'Type of enquiry'}
          </Text>
          <Text style={{...commonStyles.fs12_500, color: '#fff'}}>{'Buy'}</Text>
        </View>

        <ApplyFormInput
          heading="Location"
          placeholderText="Location"
          labelValue={''}
          onChangeText={val => {}}
        />

        <PersonalLeaveDatePicker
          heading="Posting date"
          placeholderText="Posting Date"
          minimumDate="24-Dec-1900"
          maximumDate="24-Dec-2200"
          initialDate={selectedDate}
          isStart="yes"
          error={selectedDateError}
          onDateSelected={function (selectedStartDate) {
            // setStartDate(moment(selectedStartDate).format('DD-MMM-YYYY'));
            // setStartDateError(false);
          }}
        />

        <ApplyFormInput
          heading="Valid till"
          placeholderText="Valid till"
          labelValue={''}
          onChangeText={val => {}}
        />

        <ApplyFormInput
          heading="Status of enquiry"
          placeholderText="Status of enquiry"
          labelValue={''}
          onChangeText={val => {}}
        />

        <ApplyFormPicker
          heading="Product category"
          placeholderText="Select category"
          required={true}
          dropDownValue={''}
          width={SIZES.width - 120}
          height={300}
          onDateSelected={function (val) {
            console.log('\n\n Selected val :::: ', val);
          }}
          data={filter}
        />
      </ScrollView>
    </View>
  );
}
