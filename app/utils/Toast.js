/**
 * Created by wsl on 2017/01/13.
 */

 import Toast from 'react-native-root-toast';

 let toast;

 export const toastShort = (content,position) => {
   if (toast !== undefined) {
     Toast.hide(toast);
   }
   toast = Toast.show(content.toString(), {
     duration: Toast.durations.SHORT,
     position: !position?Toast.positions.BOTTOM:position,
     shadow: true,
     animation: true,
     hideOnPress: true,
     delay: 50
   });
 };

 export const toastLong = (content,position) => {
   if (toast !== undefined) {
     Toast.hide(toast);
   }
   toast = Toast.show(content.toString(), {
     duration: Toast.durations.LONG,
     position: !position?Toast.positions.BOTTOM:position,
     shadow: true,
     animation: true,
     hideOnPress: true,
     delay: 50
   });
 };
