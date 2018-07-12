 import {
   StyleSheet,
   Dimensions,
   Platform,
   PixelRatio
 } from 'react-native';

 const {height,width} = Dimensions.get('window');

 const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25);
 const CONTENT_HEIGHT = height-STATUS_BAR_HEIGHT-(100/(750/width));
 export const StyleConfig = {
   screen_width:width,
   screen_height:height,
   status:STATUS_BAR_HEIGHT,
   status_height:STATUS_BAR_HEIGHT+100/(750/width),
   NAV_BAR_HEIGHT:100/(750/width),
   borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
   oPx:750/width,
   borderColor:'#e0e0e0',
   content_height:CONTENT_HEIGHT
 }
