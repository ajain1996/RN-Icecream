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
import {Button} from 'react-native-elements';
import {Image} from 'react-native';
import ViewEnquiry from './ViewEnquiry';
import {StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import moment from 'moment';
import {getProductCategories} from '../../utils/API';
import {useEffect} from 'react';
// import {Value} from 'react-native-reanimated';
const initialState = {
  location: '',
  valid_till: '',
  status_of_enquiry: '',
  product_category_id: '',
};

export default function CreateProductEnquiryScreen({navigation}) {
  const [formData, setFormData] = useState({
    ...initialState,
  });
  const [productEnquiry, setProductEnquiry] = useState({});
  const [selectedDate, setselectedDate] = React.useState('');
  const [selectedDateError, setselectedDateError] = React.useState(false);
  const [filter, setFilter] = useState([]);
  const [showError, setShowError] = useState('');
  const [productCategories, setproductCategories] = useState([]);
  useEffect(() => {
    getProductCategories(res => {
      console.log(res.data, '<<<<categories');
      // setproductCategories(res.data);
      // console.log(res.data, '<<<<<this is category');
      // id: item.id,

      setproductCategories(
        res.data.map((item, index) => {
          return {
            name: item.name,
            value: item.name,
            id: item.id,
          };
        }),
      );
    });
  }, []);

  const onSubmig = () => {
    const {location, valid_till, status_of_enquiry, product_category_id} =
      formData;
    if (location.trim() == '')
      return setShowError('Location field is required');
    if (status_of_enquiry.trim() == '')
      return setShowError('Status field is required');
    if (product_category_id.trim() == '')
      return setShowError('Product Category field is required');
    if (valid_till.trim() == '')
      return setShowError('Valid till date field is required');

    PostEnquiry(
      {
        to_user: 1,
        discussion: status_of_enquiry,
        description: product_category_id,
        valid_till,
      },
      res => {
        console.log('enquiry done', res);
      },
    );
  };
  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };
  console.log(formData, '<<< formdata');
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* <CustomHeader title="Enquiries" /> */}
      {/* 
      <ViewEnquiry
        navigation={navigation}
        setshowEnquiry={setshowEnquiry}
        showEnquiry={showEnquiry}
      /> */}

      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableHighlight
            onPress={() => {
              // setshowEnquiry(false);
              navigation.goBack();
            }}
            underlayColor="#eee">
            <Image
              source={require('../../assets/left-arrow.png')}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
          </TouchableHighlight>
        </View>
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
          onChangeText={val => {
            handleChange('location', val);
          }}
        />
        <PersonalLeaveDatePicker
          heading="Valid till"
          placeholderText="Posting Date"
          minimumDate="24-Dec-1900"
          maximumDate="24-Dec-2200"
          initialDate={selectedDate}
          isStart="yes"
          error={selectedDateError}
          onDateSelected={function (selectedStartDate) {
            handleChange(
              'valid_till',
              moment(selectedStartDate).format('YYYY-MM-DD'),
            );
            console.log(
              moment(selectedStartDate).format('YYYY-MM-DD'),
              '<<<< this is selected start date',
            );
            // setStartDate(moment(selectedStartDate).format('DD-MMM-YYYY'));
            // setStartDateError(false);
          }}
        />

        <ApplyFormInput
          heading="Status of enquiry"
          placeholderText="Status of enquiry"
          labelValue={''}
          onChangeText={val => {
            handleChange('status_of_enquiry', val);
          }}
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
            handleChange('product_category_id', val);
          }}
          data={productCategories}
        />
        <Text style={{color: '#ff0000', textAlign: 'center'}}>{showError}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            onPress={() => {
              onSubmig();
            }}
            style={{
              color: '#000',
              width: 200,
              textAlign: 'center',
              fontWeight: 'bold',
              marginVertical: 5,
              paddingVertical: 8,
              backgroundColor: '#BDBDBD',
              borderRadius: 10,
            }}>
            Create Enquiry
          </Text>
        </View>
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
