import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import ApplyFormInput from '../../component/ApplyFormInput';
import {COLORS, SIZES} from '../../component/Constant/Color';
import {ScrollView} from 'react-native';
import {TouchableHighlight} from 'react-native';
import {StyleSheet} from 'react-native';
import {commonStyles} from '../../utils/Styles';
import CustomHeader from '../../component/Header/CustomHeader';
import {RenderUpload} from '../../component/RenderImageUpload';
import {
  addProductPostRequest,
  EditProduct,
  getAllProductsAPI,
  getProductCategories,
  getProductSubCategories,
} from '../../utils/API';
import Toast from 'react-native-simple-toast';
import {Alert} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {ActivityIndicator} from 'react-native';
import CustomLoader, {CustomPanel} from '../../component/CustomLoader';
import {useState} from 'react';
import ApplyFormPicker from '../../component/ApplyFormPicker';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {imageBase} from '../auth/UpdateUserScreenIn';
// import { ToastAndroid } from 'react-native';
const initialValue = {
  name: '',
  description: '',
  category: '',
  mrp: '',
  uom_id: '',
  sale_price: '',
  tax_on_sale_price: 'Included',
  hsn_code: '',
  gst_code: '',
  subcategory: '',
};
let productCategory = [
  {
    name: 'category 1',
    value: 'category 1',
  },
];

export default function EditProductScreen({navigation, route}) {
  console.log(route.params, '<<<<< thisisroutes');
  const [formData, setformData] = useState(initialValue);
  const [imageData, setImageData] = useState([]);
  const [imageError, setimageError] = useState('');
  const [AllCategories, setProductCategories] = useState([]);
  const [productApiCategory, setProductApiCategory] = useState([]);
  const [productApiSubcategory, setProductApiSubCategory] = useState([]);
  const [AllSubCategories, setProductSubCategory] = useState([]);
  const {userData} = useSelector(state => state.User);

  const handleChange = (name, value) => {
    setformData({...formData, [name]: value});
  };
  const getCategoryId = (arr, name) => {
    let id = 1;
    arr.map(item => {
      if (item.name == name) {
        id = item.id;
      }
    });
    return id;
  };
  const getCategoryNameFromId = (arr, id) => {
    let name = '';
    arr.map(item => {
      if (item.id == id) {
        name = item.name;
      }
    });
    return name;
  };
  console.log(formData, '<<<this is formData');

  const handleSubmit = () => {
    let allValid = true;
    // const validFields = ['name', 'description', 'category', 'mrp', 'gst_code'];
    // validFields.map(item => {
    //   if (formData[item].trim() == '') {
    //     if (allValid == true) {
    //       Alert.alert(item + ' is required !');
    //       allValid = false;
    //     }
    //   }
    // });
    // if (!allValid) {
    //   return null;
    // }

    EditProduct(
      {
        ...formData,
        product_id: formData.id,
        category: getCategoryId(productApiCategory, formData?.category),
        user_id: formData.user_id,
        subcategory: getCategoryId(
          productApiSubcategory,
          formData?.subcategory,
        ),
        imageData,
      },
      res => {
        console.log(res.message);
        Toast.show(res.message);
        if (res.Status == true) {
          navigation.navigate('Root');
        }
      },
    );
  };

  useEffect(() => {
    getProductCategories(res => {
      let category = [];
      console.log(res, '<<< these are product categories');
      setProductApiCategory(res.data);
      res.data.map(item => {
        category = [
          ...category,
          {
            name: item.name,
            value: item.name,
            id: item.id,
          },
        ];
      });
      setProductCategories(category);

      // -----------------
      getAllProductsAPI(response => {
        console.log('\n\n getAllPRoduct response', response);
        if (response !== null) {
          if (response?.Status?.toString() === 'true') {
            const data = response.data.filter(
              item => item.id == route.params.product.id,
            );

            setformData({
              ...data[0],
              category: getCategoryNameFromId(res.data, data[0].category_id),
            });
            setImageData([
              {
                uri: imageBase + data[0].image1,
              },
            ]);
            console.log(data, '<<<<< this isdata');
            // setProductsData(filterPro);
          }
        }
      });
    });

    getProductSubCategories(res => {
      console.log(res, '<<< these are product sub categories');
      let category = [];
      setProductApiSubCategory(res.data);
      console.log(res, '<<< these are product categories');
      res.data.map(item => {
        category = [
          ...category,
          {
            name: item.name,
            value: item.name,
            id: item.id,
          },
        ];
      });
      setProductSubCategory(category);
    });
  }, []);

  console.log(imageData);

  console.log(formData, '<<< formdatavalues');
  return (
    <>
      <CustomHeader title="Product Management" />
      <ScrollView
        style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
        <Text />
        <ApplyFormInput
          heading="Name of the product"
          placeholderText="Name of the product"
          labelValue={formData?.name}
          onChangeText={val => {
            handleChange('name', val);
          }}
        />

        <ApplyFormInput
          heading="Code Number of the product"
          placeholderText="Code Number of the product"
          labelValue={formData?.product_code}
          onChangeText={val => {
            handleChange('product_code', val);
          }}
        />

        <ApplyFormInput
          heading="Item Description / Specification"
          placeholderText="Item Description / Specification"
          labelValue={formData?.description}
          onChangeText={val => {
            handleChange('description', val);
          }}
        />

        <ApplyFormPicker
          heading="Product category"
          placeholderText="Select category"
          required={true}
          dropDownValue={formData.category}
          width={SIZES.width - 120}
          height={300}
          onDateSelected={function (val) {
            console.log('\n\n Selected val :::: ', val);
            handleChange('category', val);
          }}
          data={AllCategories}
        />
        <ApplyFormPicker
          heading="Product Subcategory"
          placeholderText="Select Subcategory"
          required={true}
          dropDownValue={formData?.subcategory}
          width={SIZES.width - 120}
          height={300}
          onDateSelected={function (val) {
            console.log('\n\n Selected val :::: ', val);
            handleChange('subcategory', val);
            // handleChange('subcategoryId', val);
          }}
          data={AllSubCategories}
        />

        {/* <ApplyFormInput
          heading="BAR CODE of the proudct"
          placeholderText="BAR CODE of the proudct"
          labelValue={formData?.barcode}
          onChangeText={val => {
            handleChange('barcode', val);
          }}
        /> */}

        {/* Reorder / Low Stock Warning */}

        {/* <ApplyFormInput
          heading="Category of the product"
          placeholderText="Category of the product"
          labelValue={formData?.category}
          onChangeText={val => {
            handleChange('category', val);
          }}
        /> */}

        {/* <ApplyFormInput
          heading="Sub Category of the product"
          placeholderText="Sub Category of the product"
          labelValue={formData?.sub_category}
          onChangeText={val => {
            handleChange('sub_category', val);
          }}
        /> */}

        <ApplyFormInput
          heading="UOM of the product"
          // heading={formData.uom_id}
          placeholderText="UOM of the product"
          labelValue={formData?.uom_id}
          onChangeText={val => {
            handleChange('uom_id', val);
          }}
        />

        {/* <ApplyFormInput
          heading="Alternate UOM of the product"
          placeholderText="Alternate UOM of the product"
          labelValue={formData?.uom_2}
          onChangeText={val => {
            handleChange('uom_2', val);
          }}
        /> */}

        {/* <ApplyFormInput
          heading="Purchase Price"
          placeholderText="Purchase Price"
          keyboardType="number-pad"
          labelValue={formData?.purchase_price}
          onChangeText={val => {
            handleChange('purchase_price', val);
          }}
        /> */}
        {/* 
        <ApplyFormInput
          heading="Tax On Purchase Price"
          placeholderText="Tax On Purchase Price"
          keyboardType="number-pad"
          labelValue={formData?.tax_on_purchase_price}
          onChangeText={val => {
            handleChange('tax_on_purchase_price', val);
          }}
        /> */}

        <ApplyFormInput
          heading="Sales Price"
          placeholderText="Sales Price"
          keyboardType="number-pad"
          labelValue={parseInt(formData?.sale_price)}
          onChangeText={val => {
            handleChange('sale_price', val);
          }}
        />

        <Text
          style={{marginTop: 0, marginLeft: 20, fontSize: 12, color: '#000'}}>
          Tax on Sales Price
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            marginBottom: 10,
          }}>
          <RadioButton
            value="Included"
            status={
              formData?.tax_on_sale_price == 'Included'
                ? 'checked'
                : 'unchecked'
            }
            onPress={() => handleChange('tax_on_sale_price', 'Included')}
          />
          <Text>Included</Text>
          <View style={{width: 25}} />
          <RadioButton
            value="Extra"
            status={
              formData?.tax_on_sale_price == 'Extra' ? 'checked' : 'unchecked'
            }
            onPress={() => handleChange('tax_on_sale_price', 'Extra')}
          />
          <Text>Extra</Text>
        </View>

        {/* <ApplyFormInput
          heading="Tax On Sales Price"
          placeholderText="Tax On Sales Price"
          keyboardType="number-pad"
          labelValue={formData?.tax_on_sale_price}
          onChangeText={val => {
            handleChange('tax_on_sale_price', val);
          }}
        /> */}

        <ApplyFormInput
          heading="MRP"
          placeholderText="MRP"
          // keyboardType="number-pad"
          labelValue={`${formData?.mrp}`}
          onChangeText={val => {
            handleChange('mrp', val);
            // setComments(val);
          }}
        />

        <ApplyFormInput
          heading="HSN Code"
          placeholderText="HSN Code"
          labelValue={formData?.hsn_code}
          onChangeText={val => {
            handleChange('hsn_code', val);
          }}
        />

        <ApplyFormInput
          heading="GST Rate"
          placeholderText="GST Rate"
          keyboardType="number-pad"
          labelValue={formData?.gst_code}
          onChangeText={val => {
            handleChange('gst_code', val);
          }}
        />

        {/* <ApplyFormInput
          heading="Enable Batch Monitoring"
          placeholderText="Enable Batch Monitoring "
          onChangeText={val => {
            // setComments(val);
          }}
        /> */}

        <RenderUpload
          image={imageData}
          imageError={imageError}
          setImageError={setimageError}
          setImageData={setImageData}
          title="Product Photo Upload - Max 5 Photo"
        />

        {/* <RenderCustomCheckBox
          title="Show this product on Online Sales Portal "
          list={['Yes', 'No']}
          selectedVal={formData?.on_portal}
          callback={item => {
            handleChange('on_portal', item.toLocaleLowerCase());
          }}
        /> */}

        <View style={{padding: 20}}>
          <TouchableHighlight style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>SUBMIT</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>

      {/* <CustomLoader loading={loading} /> */}
      {/* <CustomPanel loading={loading} /> */}
    </>
  );
}

const RenderCustomCheckBox = ({title, list, selectedVal, callback}) => {
  return (
    <View style={{paddingHorizontal: 20}}>
      <Text style={{...commonStyles.fs12_400}}>{title}</Text>
      <FlatList
        data={list}
        numColumns={3}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={[styles.checkboxWrapper]}
              activeOpacity={0.8}
              onPress={() => {
                callback(item);
              }}>
              <View style={[styles.checkbox]}>
                <View
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 100,
                    backgroundColor:
                      selectedVal === item.toLocaleLowerCase()
                        ? '#000'
                        : '#fff',
                  }}
                />
              </View>
              <Text style={{...commonStyles.fs12_500, marginLeft: 8}}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    ...commonStyles.fs12_400,
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  gstCertificate: {
    width: '90%',
    height: 67,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    ...commonStyles.centerStyles,
    margin: 6,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  checkbox: {
    width: 17,
    height: 17,
    borderRadius: 100,
    borderWidth: 1,
    ...commonStyles.centerStyles,
  },
  checkboxWrapper: {
    ...commonStyles.rowStart,
    alignItems: 'center',
    marginVertical: 8,
    width: SIZES.width / 3.4,
  },
  btn: {
    backgroundColor: COLORS.theme,
    width: '100%',
    height: 52,
    borderRadius: 8,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
  },
  btnText: {
    ...commonStyles.fs16_500,
    color: '#fff',
  },
});
