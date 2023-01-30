import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import MsgComponent from '../../component/Chat/MsgComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../component/Constant/Color';

export default function RenderMessageBlock({item, data, userData}) {
  const [isEditCallback, setIsEditCallback] = React.useState(false);

  const handleDelete = () => {};

  return (
    <TouchableOpacity
      style={{
        backgroundColor: isEditCallback ? '#999' : 'transparent',
        justifyContent: 'center',
        opacity: isEditCallback ? 0.5 : 1,
      }}
      onLongPress={() => {
        setIsEditCallback(true);
      }}>
      <MsgComponent sender={item.from === userData.id} item={item} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  editWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  },
  editIcon: {
    marginHorizontal: 10,
    color: COLORS.black,
  },
  deleteIcon: {
    marginHorizontal: 10,
    color: COLORS.black,
  },
});
