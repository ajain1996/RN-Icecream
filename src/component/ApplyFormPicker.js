import React from 'react';
import {Image} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {commonStyles} from '../utils/Styles';
import {COLORS, SIZES} from './Constant/Color';
export default class ApplyFormPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerSelection: this.props.placeholderText || 'Tap to select..',
      selectedValue: this.props.placeholderText,
      pickerDisplayed: false,
      _placeholderColor: false,
      rippleColor: '#f7f8f9',
      rippleOverflow: '#eee',
      required: this.props.required,
      isPress: false,
      selectedIndex: -1,
      initialIndex: -1,
    };
  }

  setPickerValue(newValue) {
    this.setState({
      pickerSelection: newValue,
      _placeholderColor: true,
    });

    this.props.onDateSelected(newValue);

    this.togglePicker();
  }

  togglePicker() {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed,
    });
  }

  showString(newValue) {
    this.setState({
      selectedValue: newValue,
      _placeholderColor: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          {this.props.heading}
          {this.props.required == true && (
            <Text style={{...styles.heading, color: '#FF0000'}}>{'  '}*</Text>
          )}
        </Text>
        <TouchableOpacity
          underlayColor="none"
          style={{width: SIZES.width}}
          onPress={() => {
            this.togglePicker();
          }}>
          <View style={styles.inputContainer}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 12,
                color:
                  this?.props?.dropDownValue?.length === 0 ? '#999' : '#000',
              }}>
              {this?.props?.dropDownValue?.length === 0
                ? this.props.placeholderText
                : this?.props?.dropDownValue}
              {/* <Text style={{...styles.heading, color: '#FF0000'}}>{'  '}*</Text> */}
            </Text>
            <View style={{marginRight: 10}}>
              <Image
                source={require('../assets/caret-down.png')}
                style={{width: 12, height: 12, tintColor: '#999'}}
              />
            </View>
          </View>
        </TouchableOpacity>
        <Modal
          visible={this.state.pickerDisplayed}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => {
            this.setState({
              pickerSelection: !this.state.pickerDisplayed,
            });
          }}>
          <TouchableHighlight
            style={{
              justifyContentL: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
              height: SIZES.height,
            }}
            underlayColor="rgba(0,0,0,0.6)"
            onPress={() => this.togglePicker()}>
            <View
              style={[
                styles.modalStyle,
                {
                  height:
                    this?.props?.data?.length === 0
                      ? 250
                      : this.props.height
                      ? this.props.height
                      : 300,
                  width: this.props.width ? this.props.width : 220,
                },
              ]}>
              {this?.props?.data?.length === 0 ? (
                <View
                  style={{
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    width: this.props.width ? this.props.width : 220,
                  }}>
                  <Text style={{color: 'grey'}}>No Data Found</Text>
                </View>
              ) : (
                <></>
              )}
              <ScrollView
                vertical={true}
                persistentScrollbar={true}
                showsVerticalScrollIndicator={true}
                style={{width: '100%'}}>
                {this?.props?.data?.map((val, index) => {
                  return (
                    <TouchableHighlight
                      key={index}
                      underlayColor={COLORS.theme}
                      onHideUnderlay={() => {
                        this.setState({
                          isPress: false,
                        });
                      }}
                      onShowUnderlay={() => {
                        this.setState({
                          isPress: true,
                          selectedIndex: index,
                        });
                      }}
                      style={{
                        height: 45,
                        flex: 1,
                        paddingHorizontal: 12,
                        // paddingVertical: 10,
                        justifyContent: 'center',
                        backgroundColor:
                          this.state.initialIndex == index
                            ? COLORS.theme
                            : '#fff',
                      }}
                      onPress={() => {
                        this.setPickerValue(val?.value);
                        this.setState({
                          isPress: false,
                          initialIndex: this.state.selectedIndex,
                          selectedIndex: -1,
                        });
                      }}>
                      <Text
                        style={{
                          color:
                            (this.state.isPress &&
                              index == this.state.selectedIndex) ||
                            this.state.initialIndex == index
                              ? 'white'
                              : 'black',
                        }}>
                        {val.name}
                      </Text>
                    </TouchableHighlight>
                  );
                })}
              </ScrollView>

              <TouchableHighlight
                underlayColor={'#dcdcdc'}
                style={{
                  marginHorizontal: 5,
                  marginVertical: 0,
                  justifyContent: 'center',
                  padding: 8,
                }}
                onPress={() => this.togglePicker()}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 15,
                    alignItems: 'flex-end',
                    fontWeight: '700',
                    fontFamily: 'STCForward-Bold',
                  }}>
                  Cancel
                </Text>
              </TouchableHighlight>
            </View>
          </TouchableHighlight>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginTop: 5,
    marginHorizontal: 20,
    marginBottom: 15,
    width: '90%',
    height: 42,
    borderRadius: 3,
    backgroundColor: '#f0f0f0',
    ...commonStyles.rowBetween,
  },
  heading: {
    marginTop: 0,
    marginLeft: 20,
    fontSize: 12,
    color: '#000',
  },
  modalStyle: {
    // margin: 20,
    padding: 8,
    backgroundColor: '#fff',
    bottom: 25,
    top: SIZES.height / 4,
    borderRadius: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    elevation: 50,
    height: 300,
  },
});
