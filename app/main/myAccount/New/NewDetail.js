'use strict';
 import React, {Component} from 'react';
 import {
   StyleSheet,
   View,
   Text,
   Image,
   WebView,
   ScrollView,
   Dimensions,
   TouchableOpacity
 } from 'react-native';
 import TitleBar from '../../../components/TitleBar';
 import {goBack} from '../../../utils/NavigatorBack';
 import {StyleConfig} from '../../../style/index';
 import Service from '../../../utils/service';
 import {Navigator} from 'react-native-deprecated-custom-components';
 import TabNavigator from 'react-native-tab-navigator';

 const oPx = StyleConfig.oPx;
  var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');
 export default class NewDetail extends Component {
   constructor(props) {
     super(props);
     this.state = {};
   }

   _goBack(){
     goBack(this.props.navigator);
   }

   componentDidMount(){
    this._getData();
     this.setState({  
          afficheId:this.props.afficheId,  
      });
  }

  _getData(){
    let newData = new FormData();
    newData.append("OPT","117");
    newData.append("afficheId",this.props.afficheId);
    Service.post(newData,(data)=>{
      console.log(data);
      this.setState({
        title:data.result.title,// 标题
        date:data.result.date,//  时间   
        content:data.result.content,//内容
      });  
    })
  }
   render(){
     return(
       <View style={{flex:1}}>
         <TitleBar title='新闻详情' leftBtnFunc={this._goBack.bind(this)}/>
         <View style={styles.top_box}>
           <Text style={styles.title}>{this.state.title}</Text>
           <Text style={styles.time}>{this.state.date}</Text>
         </View>
         <ScrollView>
           <View style={styles.text_box}>
             <WebView style={styles.text}
             source={{html:this.state.content}}
             />
           </View>
         </ScrollView>
       </View>
     );
   }
 }
 const styles = StyleSheet.create({
  top_box:{
    borderColor:'#f5f5f5',
    borderBottomWidth:StyleConfig.borderWidth,
    justifyContent:'center',
    alignItems:'center',
    height:160/oPx,
    width:750/oPx,
  },
   title:{
     fontSize:28/oPx,
     color:'#333',
     fontWeight:'500',
     marginTop:50/oPx,
   },
   time:{
     fontSize:22/oPx,
     color:'#999',
     marginTop:10/oPx,
     marginBottom:50/oPx,
   },
   text_box:{
     paddingLeft:24/oPx,
     paddingRight:24/oPx,
     paddingTop:24/oPx,
     paddingBottom:24/oPx,
   },
   text:{
     width:750/oPx-48/oPx,
     height:deviceHeight,
   }
 });
