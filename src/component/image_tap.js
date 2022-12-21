import {TouchableHighlight, Image, StyleSheet} from 'react-native';
import React from 'react';
import {commonStyles} from '../utils/Styles';

export function image_tap(image, width, onPress) {
  return (
    <TouchableHighlight
      underlayColor="#eee"
      onPress={() => {
        console.log('Open drawer');
        onPress();
        // setModalVisible(true);
      }}
      style={styles.img_container}>
      <Image source={image} style={{width: width, height: width}} />
    </TouchableHighlight>
  );
}

export function image_tap2(image, width, onPress) {
  return (
    <TouchableHighlight
      underlayColor="#eee"
      onPress={onPress}
      style={styles.img_container}>
      <Image
        source={{uri: image}}
        style={{width: width, height: width, borderRadius: 100}}
      />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  img_container: {
    width: 50,
    height: 50,
    borderRadius: 100,
    ...commonStyles.centerStyles,
  },
});
