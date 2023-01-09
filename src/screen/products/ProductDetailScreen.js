import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomHeader from '../../component/Header/CustomHeader';
import {commonStyles} from '../../utils/Styles';
import {COLORS, SIZES} from '../../component/Constant/Color';
import {menuItems} from './ProductSubCategoryScreen';
import {ScrollView} from 'react-native';
import {imageBase} from '../auth/UpdateUserScreenIn';
import {width} from '../../utils/utils';

export default function ProductDetailScreen({navigation, route}) {
  console.log(route.params.product);
  const {product, ProductsData} = route?.params;
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <CustomHeader title="Product Detail" />
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
                marginTop: 20,
                marginBottom: 30,
              }}>
              Enquire for Product
            </Text>
            {/* <TextInput
              placeholder="Contact Number"
              placeholderTextColor="#999"
              onChangeText={text => {
                console.log(text);
              }}
              style={styles.searchInput}
            />
            <View style={{height: 10}} />
            <TextInput
              placeholder="Topic of Discussion"
              placeholderTextColor="#999"
              onChangeText={text => {
                console.log(text);
              }}
              style={styles.searchInput}
            /> */}
            <TextInput
              placeholder="Describe your requirement"
              placeholderTextColor="#999"
              onChangeText={text => {
                console.log(text);
              }}
              style={styles.searchInput}
            />
            <TouchableOpacity style={styles.btnModal}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
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
      <ScrollView style={{padding: 24}}>
        <View style={{...commonStyles.rowStart, marginBottom: 16}}>
          <Image
            source={{
              uri: imageBase + product?.image1,
            }}
            style={{width: 130, height: 130, borderRadius: 8}}
          />
          <View style={{marginLeft: 16}}>
            <Text style={{...commonStyles.fs16_700}}>{product?.name}</Text>
            <Text style={{...commonStyles.fs12_400}}>
              {product?.description}
            </Text>
            <View style={{height: 10}} />
            <Text style={{...commonStyles.fs12_400}}>MRP - {product?.mrp}</Text>
            <Text style={{...commonStyles.fs12_400}}>
              HSN Code - {product?.hsn_code}
            </Text>
            <Text style={{...commonStyles.fs12_400}}>
              GST Code - {product?.gst_code}
            </Text>
            <Text style={{...commonStyles.fs12_400}}>
              Purchase Price -{' '}
              {product?.purchase_price == null
                ? 'No Data Entered'
                : product?.purchase_price}
            </Text>
            <Text style={{...commonStyles.fs12_400}}>
              Sales Price -{' '}
              {product?.sale_price == null
                ? 'No Data Entered'
                : product?.sale_price}
            </Text>
            <Text style={{...commonStyles.fs12_400}}>
              Tax on Sales Price -{' '}
              {product?.tax_on_sale_price == null
                ? 'No Data Entered'
                : product?.tax_on_sale_price}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={{
            alignSelf: 'center',
            borderRadius: 8,
            borderColor: 'grey',
            borderWidth: 1,
            paddingHorizontal: 11,
            paddingVertical: 3,
          }}>
          <Text style={{color: '#333', fontWeight: '600', fontSize: 14}}>
            Enquire Now
          </Text>
        </TouchableOpacity>
        {/* 
        {coneTypes.map((item, index) => {
          return (
            <View
              style={{...commonStyles.rowBetween, marginVertical: 5}}
              key={index}>
              <View
                style={{width: SIZES.width / 2.8, alignItems: 'flex-start'}}>
                <Text style={{...commonStyles.fs12_500}}>{item.name}</Text>
              </View>
              <View style={{width: SIZES.width / 3, alignItems: 'flex-start'}}>
                <Text style={{...commonStyles.fs12_500}}>Rs. {item.price}</Text>
              </View>
              <View style={{width: SIZES.width / 3, alignItems: 'flex-start'}}>
                <Text style={{...commonStyles.fs12_500}}>{item.gm} GM</Text>
              </View>
            </View>
          );
        })} */}

        {ProductsData.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.productItem}
              key={index}
              onPress={() => {
                navigation.navigate('ProductDetailScreen', {
                  product: item,
                  ProductsData,
                });
              }}>
              <Image
                source={{uri: imageBase + item?.image1}}
                resizeMode="stretch"
                style={{width: 74, height: 74, borderRadius: 16}}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{...commonStyles.fs15_600, color: '#000'}}>
                  {item?.name}
                </Text>
                <Text style={{...commonStyles.fs12_400, color: '#000'}}>
                  {'Icecream sweet icecream'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={{height: 24}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  productItem: {
    ...commonStyles.rowStart,
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  btnModal: {
    backgroundColor: COLORS.theme,
    width: width / 5,
    height: 42,
    marginTop: 30,
    borderRadius: 9,
    elevation: 1,
    shadowColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#999',
    width: width / 1.5,
    // marginLeft: 20,
    height: 45,
    borderRadius: 6,
    paddingHorizontal: 14,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
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
});
