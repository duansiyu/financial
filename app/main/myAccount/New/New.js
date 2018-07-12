import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity
} from 'react-native';
import {StyleConfig} from '../../../style/index';
const oPx = StyleConfig.oPx;
import NewDetail from './NewDetail';
import {Navigator} from 'react-native-deprecated-custom-components';
export default class NewList extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }


  render(){
    let data = this.props.data;
    let onPress = this.props.onPress;
    return(
      <TouchableOpacity style={styles.line} onPress={()=>onPress(data.afficheId)}>
        <View style={styles.top}>
          <View style={styles.point}></View>
          <View>
            <Text style={styles.title}>{data.title}</Text>
          </View>
        </View>
        <View style={styles.data_view}>
          <Text style={styles.date}>{data.date}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  line:{
    width:750/oPx,
    backgroundColor:'#fff',
    paddingBottom:10/oPx,
    borderBottomWidth:StyleConfig.borderWidth,
    borderColor:StyleConfig.borderColor,
  },
  top:{
    paddingTop:20/oPx,
    paddingLeft:24/oPx,
    paddingRight:24/oPx,
    flexDirection:'row',
  },
  point:{
    width:16/oPx,
    height:16/oPx,
    backgroundColor:'#ff6600',
    borderRadius:8/oPx,
    marginTop:10/oPx,
    marginRight:10/oPx,
  },
  title:{
    fontSize:26/oPx,
    color:'#333',
  },
  data_view:{
    width: 200/oPx,
    height: 50/oPx,
    alignSelf:'flex-end',
    marginTop:10/oPx,
    marginRight:24/oPx,
  },
  date:{
    fontSize:20/oPx,
    color:'#666',
    flex:1,
  },
});
