import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

import {windowWidth} from '../utils/utils';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Platform} from 'react-native';

const ApplyFormInput = ({
  heading,
  iconName,
  long,
  labelValue,
  placeholderText,
  darkPlaceholder,
  required = false,
  noOfLines,
  isNumeric,
  capatalize,
  ...rest
}) => {
  return long ? (
    <View>
      <Text style={styles.heading}>
        {heading}
        {required === true && (
          <Text style={{...styles.heading, color: '#FF0000'}}>{'  '}*</Text>
        )}
      </Text>{' '}
      <View
        style={[
          styles.inputContainer,
          {
            height: 100,
            alignItems: 'flex-start',
          },
        ]}
        removeClippedSubviews={true}>
        <TextInput
          style={[styles.inputLong, {paddingTop: 8}]}
          numberOfLines={3}
          width={'100%'}
          maxLength={250}
          defaultValue={labelValue}
          autoCapitalize={capatalize ? 'characters' : 'none'}
          multiline={true}
          placeholder={placeholderText}
          placeholderTextColor={'#8e9aa0'}
          color={'#000'}
          {...rest}
        />
        <FontAwesome5Icon name={iconName} style={styles.iconStyle} size={15} />
      </View>
    </View>
  ) : (
    <View>
      <Text style={styles.heading}>
        {heading}
        {required == true && (
          <Text style={{...styles.heading, color: '#FF0000'}}>{'  '}*</Text>
        )}
      </Text>

      <View style={styles.inputContainer} removeClippedSubviews={true}>
        {isNumeric ? (
          <TextInput
            style={styles.input}
            numberOfLines={1}
            placeholder={placeholderText}
            defaultValue={labelValue}
            autoCapitalize={capatalize ? 'characters' : 'none'}
            keyboardType={'numeric'}
            color={'#000'}
            placeholderTextColor={darkPlaceholder ? '#000' : '#8e9aa0'}
            {...rest}
          />
        ) : (
          <TextInput
            style={styles.input}
            numberOfLines={1}
            placeholder={placeholderText}
            color={'#000'}
            defaultValue={labelValue}
            autoCapitalize={capatalize ? 'characters' : 'none'}
            placeholderTextColor="#8e9aa0"
            {...rest}
          />
        )}
        <FontAwesome5Icon name={iconName} style={styles.iconStyle} size={15} />
      </View>
    </View>
  );
};

export default ApplyFormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginHorizontal: 20,
    marginBottom: 15,
    width: '90%',
    height: 42,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  iconStyle: {
    color: '#8e9aa0',
    marginBottom: 5,
    marginHorizontal: 10,
  },
  inputLong: {
    paddingHorizontal: 10,
    marginTop: Platform.OS === 'ios' ? 12 : -6,
    fontSize: 12,
    color: '#999999',
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 12,
    color: '#999999',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: 42,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  heading: {
    marginTop: 0,
    marginLeft: 20,
    fontSize: 12,
    color: '#000',
  },
});
