import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import {commonStyles} from '../../utils/Styles';

export function membersHeader(navigation, setSearchInput, searchInput) {
  return (
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
        onChange={text => {
          setSearchInput(text);
        }}
        style={styles.searchInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
