import {
  StyleSheet,
  Platform
} from 'react-native';
import {StyleConfig} from './index';
const oPx = StyleConfig.oPx;
export default styles = StyleSheet.create({
  scrollable:{
    position:'relative',
    height:80/oPx,
    backgroundColor:'#f5f5f5',
  },
  scrollable2:{
    position:'absolute',
    top:200/oPx,
    left:0,
    height:80/oPx,
    backgroundColor:'#f5f5f5'
  },
  defaultBar:{
    borderWidth:0,
    height:80/oPx,
    backgroundColor:'#fff5e5',
  },
  tabStyle:{
    paddingBottom:0,
    height:80/oPx,
    borderWidth:0,
    backgroundColor:'#fff5e5',
    //alignSelf: 'center',
    justifyContent:'center',
  },
  tabStyle2:{
    width:220/oPx,
    paddingBottom:0,
    height:80/oPx,
    borderWidth:0,
    backgroundColor:'#fff',
    alignSelf: 'center',
  },
  tabBarUnderlineStyle:{
    backgroundColor:'#e5383e',
    height:0/oPx,
  },
  tabBarTextStyle:{
    fontSize:28/oPx,
    fontWeight:'200'
  },
});
