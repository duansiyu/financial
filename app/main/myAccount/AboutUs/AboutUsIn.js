import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import {StyleConfig} from '../../../style/index';
import {goBack} from '../../../utils/NavigatorBack';
import TitileBar from '../../../components/TitleBar';
const oPx = StyleConfig.oPx;
export default class  AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  _goBack(){
    goBack(this.props.navigator);
  }

  render(){
    return(
      <View style={styles.container}>
        <TitileBar title='关于我们' leftBtnFunc={this._goBack.bind(this)}/>
        <ScrollView>
            <View style={styles.top}>
              <Image style={styles.image} source={require('../../../imgs/myAccount/icon.png')}/>
              <Text style={{fontSize:30/oPx,color:'#333',marginTop:10/oPx}}>
                中仁财富
              </Text>
            </View>
            <Text style={styles.text}>
              中仁财富是一个专注于石油供应链的互联网金融理财平台，为了给用户最好的服务和最好的体验，
              它始终追求专业、讲究安全、追求稳定、讲究高效。中仁财富隶属隶属于深圳中仁资本投资集团
              （以下简称”中仁集团”），集团旗下企业历史可追溯至1993年，其“久隆石化”（内蒙古 注册号：
              152303000006626）更是在2008年获得国家商务部批准的成品油批发牌照，成为全国首批3家
              拥有此牌照的民营企业。
            </Text>
            <Text style={styles.text}>
              中仁财富秉承“双赢”原则，坚持“真实”的经营理念，只为您提供低门槛、高增值的优质理财产品。
            </Text>
            <View style={styles.box}>
              <View style={styles.line}>
                <View style={{width:200/oPx}}>
                  <Text style={styles.left_text}>
                  客服电话
                  </Text>
                </View>
                <View style={{width:502/oPx,justifyContent:'flex-end'}}>
                  <Text style={styles.right_text}>400-1800-550</Text>
                </View>
              </View>
              <View style={styles.line}>
                <View style={{width:200/oPx}}>
                  <Text style={styles.left_text}>
                  客服邮箱
                  </Text>
                </View>
                <View style={{width:502/oPx,justifyContent:'flex-end'}}>
                  <Text style={styles.right_text}>service@zhongren168.com</Text>
                </View>
              </View>
              <View style={styles.line}>
                <View style={{width:200/oPx}}>
                  <Text style={styles.left_text}>
                  公司地址
                  </Text>
                </View>
                <View style={{width:502/oPx,justifyContent:'flex-end'}}>
                  <Text style={styles.right_text}>深圳市南山区高新园大冲商务中心A座1006</Text>
                </View>
              </View>
            </View>
          </ScrollView>
      </View>
    )
  }
}
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#f5f5f5',
    },
    top:{
      height:260/oPx,
      width:750/oPx,
      justifyContent:'center',
      alignItems:'center',
    },
    image:{
      width:120/oPx,
      height:120/oPx,
    },
    text:{
      fontSize:24/oPx,
      color:'#333',
      width:750/oPx,
      paddingLeft:24/oPx,
      paddingRight:24/oPx,
      lineHeight:20,
    },
    box:{
      backgroundColor:'#fff',
      width:StyleConfig.screen_width-48/oPx,
      marginTop:20/oPx,
      marginLeft:24/oPx,
      marginRight:24/oPx,
      borderRadius:8/oPx,
    },
    line:{
      height:70/oPx,
      flexDirection:'row',
      alignItems:'center',
      borderBottomWidth:StyleConfig.borderWidth,
      borderColor:'#f5f5f5',
    },
    left_text:{
      fontSize:24/oPx,
      color:'#999',
      paddingLeft:20/oPx,
    },
    right_text:{
      fontSize:24/oPx,
      color:'#333',
      //paddingLeft:20/oPx,
      textAlign:'right',
      paddingRight:20/oPx,
    },
  });
