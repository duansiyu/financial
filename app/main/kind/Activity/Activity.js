import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import ViewHtml from '../../../components/ViewHtml';
import TitleBar from '../../../components/TitleBar';
import {StyleConfig} from '../../../style';
const oPx = StyleConfig.oPx;
export default class Activity extends Component{
  constructor(props){
    super(props);
  }

  activeState(data){
    let type = this.props.data.activeState;
    let state = type ==1?
    <Image source={require('../../../imgs/index/activity/ongoing.png')} style={styles.state}/>:
    <Image source={require('../../../imgs/index/activity/end.png')}style={styles.state}/>
    return state;
   }

    _openUrl= (url_,title_) =>{
        this.props.navigator.push({
            component:ViewHtml,
            name:'openViewHtml',
            params:{
                url:url_,
                title:title_
            }
        });
    }

    _appendEvent= (eventName) => {
        console.log(eventName+'|');
    }

  render(){
    let data = this.props.data;
    return(
      <TouchableOpacity style={styles.one} onPressOut={() =>this._openUrl(data.url,data.pictureName)}>
        <Image source={{uri:data.imgUrl}}
               style={styles.img}/>
        <View style={{height:120/oPx}}>
          <Text style={styles.title}>{data.pictureName}</Text>
          <Text style={styles.time}>{data.startTime}~{data.endTime}</Text>
          {/*<Image source={require('../../../imgs/index/activity/ongoing.png')}
                 style={styles.state}/>*/}
                 {this.activeState(data)}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  one:{
    borderRadius:10/oPx,
    marginLeft:36/oPx,
    marginRight:36/oPx,
    marginTop:20/oPx,
    marginBottom:20/oPx,
    shadowColor:'green',
   shadowOffset:{h:10,w:10},
   shadowRadius:3,
   shadowOpacity:0.8,
   backgroundColor:'#fff'
  },
  img:{
    width:StyleConfig.screen_width-72/oPx,
    height:300/oPx,
  },
  title:{
    fontSize:32/oPx,
    color:'#333',
    paddingLeft:20/oPx,
    marginTop:10/oPx,
  },
  time:{
    color:'#999',
    fontSize:28/oPx,
    paddingLeft:20/oPx,
    marginTop:10/oPx,
  },
  state:{
    width:120/oPx,
    height:120/oPx,
    position:'absolute',
    bottom:0,
    right:0,
  },
})
