import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomHeader from '../../component/Header/CustomHeader';
import {commonStyles} from '../../utils/Styles';
import {SIZES} from '../../component/Constant/Color';
import {menuItems} from './ProductSubCategoryScreen';
import {ScrollView} from 'react-native';
import {imageBase} from '../auth/UpdateUserScreenIn';

export default function ProductDetailScreen({navigation, route}) {
  console.log(route.params.product);
  const {product, ProductsData} = route?.params;
  const [coneTypes, setConeTypes] = React.useState([
    {name: 'Large Cone', price: '120/-', gm: '150'},
    {name: 'Big Cone', price: '80/-', gm: '120'},
    {name: 'Medium Cone', price: '60/-', gm: '60'},
    {name: 'Small Cone', price: '30/-', gm: '30'},
  ]);

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <CustomHeader title="Product Detail" />

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
            <Text style={{...commonStyles.fs10_400}}>
              {product?.description}
            </Text>
            <View style={{height: 10}} />
            <Text style={{...commonStyles.fs10_400}}>MRP - {product?.mrp}</Text>
            <Text style={{...commonStyles.fs10_400}}>
              HSN Code - {product?.hsn_code}
            </Text>
            <Text style={{...commonStyles.fs10_400}}>
              GST Code - {product?.gst_code}
            </Text>
            <Text style={{...commonStyles.fs10_400}}>
              Purchase Price -{' '}
              {product?.purchase_price == null
                ? 'No Data Entered'
                : product?.purchase_price}
            </Text>
            <Text style={{...commonStyles.fs10_400}}>
              Sales Price -{' '}
              {product?.sale_price == null
                ? 'No Data Entered'
                : product?.sale_price}
            </Text>
            <Text style={{...commonStyles.fs10_400}}>
              Tax on Sales Price -{' '}
              {product?.tax_on_sale_price == null
                ? 'No Data Entered'
                : product?.tax_on_sale_price}
            </Text>
          </View>
        </View>
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
});
