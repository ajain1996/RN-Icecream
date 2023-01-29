import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');
export const isUserFreeAccess = created_at => {
  const createdDate = new Date(created_at);
  const createdStamp = createdDate.getTime();
  const currDate = new Date();
  const currStamp = currDate.getTime();
  const diff = currStamp - createdStamp;
  const calcDays = diff / (24 * 60 * 60 * 1000);
  // console.log(calcDays, '<<<this is days');
  console.log(currStamp, createdStamp, '<< currstamp', calcDays);
  if (calcDays > 7) {
    return false;
  } else return true;
};
